import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ensureProjectProductionDocs,initialProductionState,validateProjectProduction} from '../tools/production-scope.mjs';

const manifest={id:'ContohVideo',slug:'contoh-video',title:'Contoh Video',width:1080,height:1920,fps:30,durationInFrames:90,segments:[
 {id:'Contoh-00-Hook',title:'00 — Hook',startFrame:0,durationInFrames:30},
 {id:'Contoh-01-Demo',title:'01 — Demo',startFrame:30,durationInFrames:60},
]};
const temporary=()=>fs.mkdtempSync(path.join(os.tmpdir(),'mg-production-scope-'));

test('auto docs created for new project, exact scene IDs, no invented approvals',()=>{
 const dir=temporary();
 try{
  assert.equal(ensureProjectProductionDocs(dir,manifest).length,5);
  const state=JSON.parse(fs.readFileSync(path.join(dir,'PRODUCTION-STATE.json'),'utf8'));
  assert.equal(state.referenceSceneId,'Contoh-00-Hook');
  assert.equal(state.referenceSceneApproval,'pending');
  assert.equal(state.scriptApproval,'pending');
  assert.deepEqual(state.scenes.map(s=>s.id),manifest.segments.map(s=>s.id));
  assert.match(fs.readFileSync(path.join(dir,'STORYBOARD.md'),'utf8'),/Editable Assets/);
  assert.deepEqual(validateProjectProduction(dir,manifest).errors,[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('sync NEVER overwrites creative lock or written script, even on repeated runs',()=>{
 const dir=temporary();
 try{
  ensureProjectProductionDocs(dir,manifest);
  const script=path.join(dir,'SCRIPT.md'),statePath=path.join(dir,'PRODUCTION-STATE.json');
  fs.writeFileSync(script,'Hook user TERKUNCI\n');
  const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
  state.decisionLog.push({status:'locked',item:'hook',value:'TIDAK BOLEH BERUBAH'});
  fs.writeFileSync(statePath,JSON.stringify(state,null,2)+'\n');
  const original=fs.readFileSync(statePath,'utf8');
  assert.equal(ensureProjectProductionDocs(dir,manifest).length,0);
  assert.equal(fs.readFileSync(script,'utf8'),'Hook user TERKUNCI\n');
  assert.equal(fs.readFileSync(statePath,'utf8'),original);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('changed scene IDs only warn; locked state is not erased or regenerated',()=>{
 const dir=temporary();
 try{
  ensureProjectProductionDocs(dir,manifest);
  const changed={...manifest,segments:[{id:'New-00-Hook',title:'Baru',startFrame:0,durationInFrames:90}]};
  const result=validateProjectProduction(dir,changed);
  assert.ok(result.errors.some(x=>x.includes('referenceSceneId')));
  assert.ok(result.warnings.some(x=>x.includes('Segmen baru')));
  assert.ok(result.warnings.some(x=>x.includes('tidak ada di manifest')));
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('first scene approval gate warns against skipping script or storyboard',()=>{
 const dir=temporary();
 try{
  ensureProjectProductionDocs(dir,manifest);
  const file=path.join(dir,'PRODUCTION-STATE.json');
  const state=initialProductionState(manifest);
  state.phase='scene-build';
  fs.writeFileSync(file,JSON.stringify(state));
  assert.ok(validateProjectProduction(dir,manifest).warnings.some(x=>x.includes('gate approval scene pertama')));
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
