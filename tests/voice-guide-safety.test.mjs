import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,'projects/easy2boot-multiboot-reels/motiongraphic-video.json'),'utf8'));

test('VO Guide: Easy2Boot covers the entire video without empty or overlapping beats',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(ROOT,'projects/easy2boot-multiboot-reels/src/config/narration.json'),'utf8'));
 assert.equal(data.schemaVersion,1);
 assert.equal(data.beats[0].startFrame,0);
 assert.equal(data.beats.at(-1).endFrame,manifest.durationInFrames);
 data.beats.forEach((b,i)=>{
  assert.ok(b.text.trim());assert.ok(b.endFrame>b.startFrame);
  if(i)assert.equal(b.startFrame,data.beats[i-1].endFrame);
 });
 const root=fs.readFileSync(path.join(ROOT,'src/Root.tsx'),'utf8');
 assert.match(root,/id="Easy2BootMultibootReelsVOGuide"/);
 assert.match(root,/id="Easy2BootMultibootReels"/);
});

test('VO Init does not overwrite existing narration, and can scaffold missing config',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-vo-init-'));
 try{
  fs.mkdirSync(path.join(tmp,'tools'),{recursive:true});
  fs.mkdirSync(path.join(tmp,'projects','demo-guide'),{recursive:true});
  fs.copyFileSync(path.join(ROOT,'tools/vo-init.mjs'),path.join(tmp,'tools/vo-init.mjs'));
  const manifest={id:'DemoGuide',slug:'demo-guide',title:'Demo',fps:30,width:1080,height:1920,durationInFrames:90,segments:[{title:'A',startFrame:0,durationInFrames:40},{title:'B',startFrame:40,durationInFrames:50}]};
  const file=path.join(tmp,'projects/demo-guide/motiongraphic-video.json');
  fs.writeFileSync(file,JSON.stringify(manifest));
  const run=()=>spawnSync(process.execPath,[path.join(tmp,'tools/vo-init.mjs'),'demo-guide'],{cwd:tmp,encoding:'utf8'});
  assert.equal(run().status,0);
  const narr=path.join(tmp,'projects/demo-guide/src/config/narration.json');
  const j=JSON.parse(fs.readFileSync(narr,'utf8'));
  assert.deepEqual(j.beats.map(b=>[b.startFrame,b.endFrame]),[[0,40],[40,90]]);
  fs.writeFileSync(narr,'KEPT');
  assert.equal(run().status,0);assert.equal(fs.readFileSync(narr,'utf8'),'KEPT');
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

test('sync refuses to erase missing registered project BEFORE touching Root or catalog',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-sync-guard-'));
 try{
  for(const dir of ['tools','projects/only-one/src','src','library'])fs.mkdirSync(path.join(tmp,dir),{recursive:true});
  for(const name of ['sync-projects.mjs','studio-props-bridge.mjs','register-scene-segments.mjs','production-scope.mjs','validate-addon.mjs']){
   fs.copyFileSync(path.join(ROOT,'tools',name),path.join(tmp,'tools',name));
  }
  fs.writeFileSync(path.join(tmp,'package.json'),JSON.stringify({dependencies:{}}));
  const m={id:'OnlyOne',slug:'only-one',title:'Only',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90};
  fs.writeFileSync(path.join(tmp,'projects/only-one/motiongraphic-video.json'),JSON.stringify(m));
  fs.writeFileSync(path.join(tmp,'projects/only-one/src/Video.tsx'),'export const Video=()=>null;');
  const cat=JSON.stringify({schemaVersion:1,videos:[{id:'OnlyOne',slug:'only-one',projectDir:'projects/only-one'},{id:'LostVid',slug:'lost-video',projectDir:'projects/lost-video'}]});
  fs.writeFileSync(path.join(tmp,'library/catalog.json'),cat);
  fs.writeFileSync(path.join(tmp,'src/Root.tsx'),'ORIGINAL ROOT');
  const r=spawnSync(process.execPath,[path.join(tmp,'tools/sync-projects.mjs')],{encoding:'utf8',cwd:tmp});
  assert.equal(r.status,1);assert.match(r.stderr,/SYNC DIBATALKAN/);
  assert.equal(fs.readFileSync(path.join(tmp,'library/catalog.json'),'utf8'),cat);
  assert.equal(fs.readFileSync(path.join(tmp,'src/Root.tsx'),'utf8'),'ORIGINAL ROOT');
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

test('official archived project may be removed by sync; surviving project remains',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-archive-guard-'));
 try{
  for(const dir of ['tools','projects/active-one/src','src','library/sampah/2026-11-20-LostVid/project'])fs.mkdirSync(path.join(tmp,dir),{recursive:true});
  for(const name of ['sync-projects.mjs','studio-props-bridge.mjs','register-scene-segments.mjs','production-scope.mjs','validate-addon.mjs']){
   fs.copyFileSync(path.join(ROOT,'tools',name),path.join(tmp,'tools',name));
  }
  fs.writeFileSync(path.join(tmp,'package.json'),JSON.stringify({dependencies:{}}));
  const m={id:'ActiveOne',slug:'active-one',title:'Active',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90};
  fs.writeFileSync(path.join(tmp,'projects/active-one/motiongraphic-video.json'),JSON.stringify(m));
  fs.writeFileSync(path.join(tmp,'projects/active-one/src/Video.tsx'),'export const Video=()=>null;');
  const lost={id:'LostVid',slug:'lost-video',projectDir:'projects/lost-video'};
  fs.writeFileSync(path.join(tmp,'library/catalog.json'),JSON.stringify({schemaVersion:1,videos:[{...m,projectDir:'projects/active-one'},lost]}));
  const archive=path.join(tmp,'library/sampah/2026-11-20-LostVid');
  fs.writeFileSync(path.join(archive,'restore.json'),JSON.stringify({type:'folder',video:lost,projectDir:lost.projectDir}));
  fs.writeFileSync(path.join(archive,'project/motiongraphic-video.json'),JSON.stringify(lost));
  const r=spawnSync(process.execPath,[path.join(tmp,'tools/sync-projects.mjs')],{encoding:'utf8',cwd:tmp});
  assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
  const cat=JSON.parse(fs.readFileSync(path.join(tmp,'library/catalog.json'),'utf8'));
  assert.deepEqual(cat.videos.map(v=>v.id),['ActiveOne']);
  assert.ok(fs.existsSync(path.join(tmp,'projects/active-one/motiongraphic-video.json')));
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
