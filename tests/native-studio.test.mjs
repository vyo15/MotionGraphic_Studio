import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ROOT} from '../tools/menu-helper.mjs';
import {parseCompositions,captureStudioProps,saveGeneratedState} from '../tools/studio-props-bridge.mjs';
const read=f=>fs.readFileSync(f,'utf8');

test('one Remotion Studio and registrations match the active catalog, not old video examples',()=>{
 const start=read(path.join(ROOT,'tools','start-studio.mjs'));
 assert.match(start,/spawn\(process\.execPath/);
 assert.match(start,/--port/);
 assert.doesNotMatch(start,/easy-editor-server/);
 for(const f of ['tools/studio-hub-server.mjs','tools/easy-editor-server.mjs','tools/universal-visual-editor.mjs']){
  assert.ok(!fs.existsSync(path.join(ROOT,f)),f);
 }
 const registered=[...parseCompositions(read(path.join(ROOT,'src','Root.tsx'))).props.keys()];
 const catalog=JSON.parse(read(path.join(ROOT,'library/catalog.json')));
 const expected=catalog.videos.reduce((n,v)=>n+1+(v.segments||[]).length+(v.voiceGuideCompositionId?1:0),0);
 assert.equal(registered.length,expected);
 for(const v of catalog.videos){
  assert.ok(registered.includes(v.id),v.id);
  for(const seg of v.segments||[])assert.ok(registered.includes(seg.id),seg.id);
  if(v.voiceGuideCompositionId)assert.ok(registered.includes(v.voiceGuideCompositionId));
 }
});
function fixture(){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'remotion-studio-props-'));
 fs.mkdirSync(path.join(tmp,'src'),{recursive:true});
 fs.mkdirSync(path.join(tmp,'library'),{recursive:true});
 const mf=path.join(tmp,'projects','demo','motiongraphic-video.json');
 fs.mkdirSync(path.dirname(mf),{recursive:true});
 const props={title:'Original',enabled:false,volume:1,color:'#112233'};
 fs.writeFileSync(mf,JSON.stringify({id:'DemoReels',slug:'demo',title:'Demo',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:props}));
 const attrs=[['DemoReels',props],['DemoScene01',props],['DemoScene02',props]].map(([id,p])=>`<Composition id="${id}" component={Video} width={1080} height={1920} fps={30} durationInFrames={90} defaultProps={${JSON.stringify(p)}} />`).join('\n');
 const source=`import React from 'react';\nimport {Composition} from 'remotion';\nconst Video=()=>null;\nexport const Root=()=> <>{/* registrations */}\n${attrs}\n</>;`;
 const rootFile=path.join(tmp,'src','Root.tsx');
 fs.writeFileSync(rootFile,source);
 saveGeneratedState(tmp,source,['DemoReels','DemoScene01','DemoScene02'].map(id=>({id,ownerId:'DemoReels',defaultProps:props})));
 return {tmp,mf,rootFile,source,props};
}
function replaceProp(source,id,oldToken,newToken){
 const line=source.split('\n').find(l=>l.includes(`id="${id}"`));
 assert.ok(line,'Missing id '+id);
 const changed=line.replace(oldToken,newToken);
 assert.notEqual(changed,line);
 return source.replace(line,changed);
}
const withFixture=fn=>()=>{const x=fixture();try{fn(x)}finally{fs.rmSync(x.tmp,{recursive:true,force:true})}};
test('Studio Save Props is merged into the project manifest safely',withFixture(({tmp,mf,rootFile,source})=>{
 fs.writeFileSync(rootFile,replaceProp(source,'DemoReels','"title":"Original"','"title":"Edited"'));
 assert.equal(captureStudioProps(tmp),1);
 assert.equal(JSON.parse(read(mf)).defaultProps.title,'Edited');
 assert.equal(fs.readdirSync(path.join(tmp,'library','backups','studio-props')).length,1);
}));
test('conflicting edits in manifest and Studio are rejected',withFixture(({tmp,mf,rootFile,source})=>{
 fs.writeFileSync(rootFile,replaceProp(source,'DemoReels','"title":"Original"','"title":"Studio"'));
 const m=JSON.parse(read(mf));m.defaultProps.title='Local';fs.writeFileSync(mf,JSON.stringify(m));
 assert.throws(()=>captureStudioProps(tmp),/sama-sama diubah/);
 assert.equal(JSON.parse(read(mf)).defaultProps.title,'Local');
}));
test('Root structural edits are rejected without touching source',withFixture(({tmp,rootFile,source})=>{
 fs.writeFileSync(rootFile,source.replace('{/* registrations */}','{/* external changes */}'));
 assert.throws(()=>captureStudioProps(tmp),/berubah selain Props/);
 assert.match(read(rootFile),/external changes/);
}));
test('segment Save Props modifies the same project manifest',withFixture(({tmp,mf,rootFile,source})=>{
 fs.writeFileSync(rootFile,replaceProp(source,'DemoScene01','"enabled":false','"enabled":true'));
 assert.equal(captureStudioProps(tmp),1);
 assert.equal(JSON.parse(read(mf)).defaultProps.enabled,true);
}));
test('nonoverlapping edits from two scene compositions merge',withFixture(({tmp,mf,rootFile,source})=>{
 let changed=replaceProp(source,'DemoScene01','"enabled":false','"enabled":true');
 changed=replaceProp(changed,'DemoScene02','"volume":1','"volume":0.4');
 fs.writeFileSync(rootFile,changed);
 assert.equal(captureStudioProps(tmp),1);
 const m=JSON.parse(read(mf));assert.equal(m.defaultProps.enabled,true);assert.equal(m.defaultProps.volume,0.4);
}));
test('conflicting edits on the same prop in two scenes fail atomically',withFixture(({tmp,mf,rootFile,source})=>{
 let changed=replaceProp(source,'DemoScene01','"color":"#112233"','"color":"#FF0000"');
 changed=replaceProp(changed,'DemoScene02','"color":"#112233"','"color":"#00FF00"');
 fs.writeFileSync(rootFile,changed);
 assert.throws(()=>captureStudioProps(tmp),/mengubah Props yang sama/);
 assert.equal(JSON.parse(read(mf)).defaultProps.color,'#112233');
}));
