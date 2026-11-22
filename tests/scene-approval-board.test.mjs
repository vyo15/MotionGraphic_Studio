import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {analyze,markdown,writeBoard} from '../tools/scene-approval-board.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function fixture(fn){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-board-'));
 const dir=path.join(root,'projects','test-board');fs.mkdirSync(path.join(dir,'src/config'),{recursive:true});
 fs.mkdirSync(path.join(dir,'production'),{recursive:true});
 const w=(p,obj)=>fs.writeFileSync(path.join(dir,p),JSON.stringify(obj,null,2)+'\n');
 w('motiongraphic-video.json',{id:'TestBoard',slug:'test-board',title:'Example',fps:30,durationInFrames:90,segments:[{id:'Scene01',title:'Intro',startFrame:0,durationInFrames:60},{id:'Scene02',title:'Cover',startFrame:60,durationInFrames:30}]});
 w('src/config/narration.json',{schemaVersion:1,status:'draft',beats:[{scene:'Scene01',text:'Exact VO. ',startFrame:0,endFrame:60},{scene:'Scene02',text:'',startFrame:60,endFrame:90}]});
 w('PRODUCTION-STATE.json',{schemaVersion:1,scriptApproval:'draft',voiceOverStatus:'not-recorded',fullVideoApproval:'pending',scenes:[{id:'Scene01',status:'approved-locked'},{id:'Scene02',status:'visual-selected'}],decisionLog:[]});
 try{return fn(dir,root,w)}finally{fs.rmSync(root,{recursive:true,force:true})}
}
test('board preserves exact VO and separates visual, VO and final approval',()=>fixture(dir=>{
 const b=analyze(dir),md=markdown(b);
 assert.equal(b.rows.length,2);
 assert.equal(b.rows[0].vo,'Exact VO.');
 assert.match(md,/\*\*VO asli:\*\* “Exact VO\.”/);
 assert.equal(b.rows[0].visual,'ACC / LOCKED');
 assert.equal(b.rows[0].voText,'DRAFT / BELUM TERBUKTI ACC');
 assert.equal(b.rows[1].visual,'DIPILIH / BELUM LOCKED');
 assert.match(md,/TANPA VO \/ COVER/);
 assert.match(md,/BELUM FINAL ACC/);
}));
test('write board is deterministic and does not edit single sources of truth',()=>fixture(dir=>{
 const source=path.join(dir,'PRODUCTION-STATE.json'),narr=path.join(dir,'src/config/narration.json');
 const before=[hash(source),hash(narr)];const text=markdown(analyze(dir));
 assert.equal(writeBoard(dir,text),true);
 assert.equal(writeBoard(dir,text),false);
 assert.deepEqual([hash(source),hash(narr)],before);
 const state=JSON.parse(fs.readFileSync(source,'utf8'));state.scenes[1].status='visual-approved';fs.writeFileSync(source,JSON.stringify(state));
 assert.notEqual(markdown(analyze(dir)),text);
}));
test('bridge beat is split for review without changing actual manifest duration',()=>fixture((dir,root,w)=>{
 w('motiongraphic-video.json',{id:'TestBoard',slug:'test-board',title:'Bridge',fps:30,durationInFrames:90,segments:[{id:'S01',title:'One scene including bridge',startFrame:0,durationInFrames:90}]});
 w('src/config/narration.json',{schemaVersion:1,status:'draft',beats:[{scene:'S01',text:'First.',startFrame:0,endFrame:60},{scene:'BRIDGE01TO02',text:'Next?',startFrame:60,endFrame:90}]});
 w('PRODUCTION-STATE.json',{schemaVersion:1,scriptApproval:'draft',voiceOverStatus:'not-recorded',fullVideoApproval:'pending',scenes:[{sceneId:'S01',status:'approved-locked'}]});
 const b=analyze(dir);assert.equal(b.rows.length,2);
 assert.equal(b.rows[1].id,'BRIDGE01TO02');assert.equal(b.rows[1].vo,'Next?');
 assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'motiongraphic-video.json'))).segments.length,1);
}));
test('CLI rejects traversal-like slug and supports read-only rendering',()=>{
 const r=spawnSync(process.execPath,[path.join(ROOT,'tools/scene-approval-board.mjs'),'../escape'],{cwd:ROOT,encoding:'utf8'});
 assert.notEqual(r.status,0);assert.match(r.stderr,/Slug tidak aman/);
 const show=spawnSync(process.execPath,[path.join(ROOT,'tools/scene-approval-board.mjs'),'easy2boot-multiboot-reels','--check'],{cwd:ROOT,encoding:'utf8'});
 assert.equal(show.status,0,show.stderr||show.stdout);
});
