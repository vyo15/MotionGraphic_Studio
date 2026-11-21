import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {registrySignature} from '../tools/auto-sync-watch.mjs';

const mk=()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-watcher-test-'));
 const project=path.join(root,'projects','example');
 for(const rel of ['src/components','src/config','public/audio'])fs.mkdirSync(path.join(project,rel),{recursive:true});
 fs.mkdirSync(path.join(root,'src'),{recursive:true});
 fs.mkdirSync(path.join(root,'library','masuk'),{recursive:true});
 fs.writeFileSync(path.join(root,'src','Root.tsx'),'ROOT1');
 fs.writeFileSync(path.join(project,'motiongraphic-video.json'),'{}');
 fs.writeFileSync(path.join(project,'src','components','Title.tsx'),'INITIAL');
 fs.writeFileSync(path.join(project,'src','config','narration.json'),'BEAT0');
 fs.writeFileSync(path.join(project,'public','audio','click.wav'),'WAVE1');
 return {root,project};
};
test('Studio layer edits do not trigger registration sync while manifest/narration/Root changes do',()=>{
 const {root,project}=mk();try{
  const initial=registrySignature(root);
  const tsx=path.join(project,'src','components','Title.tsx');
  fs.writeFileSync(tsx,'DELETED Interactive.G then UNDO');
  assert.equal(registrySignature(root),initial,'Save-to-code TSX belongs to Remotion hot reload, not sync');
  const narr=path.join(project,'src','config','narration.json');
  fs.writeFileSync(narr,'BEAT00000000');
  const afterNarr=registrySignature(root);assert.notEqual(afterNarr,initial);
  fs.writeFileSync(path.join(root,'src','Root.tsx'),'ROOT changed by Props editor');
  assert.notEqual(registrySignature(root),afterNarr);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
test('asset edits and copied ZIPs still trigger sync; ignored TSX edits do not',()=>{
 const {root,project}=mk();try{
  const initial=registrySignature(root);
  fs.writeFileSync(path.join(project,'public','audio','click.wav'),'WAVE2-longer');
  assert.notEqual(registrySignature(root),initial);
  const snap=registrySignature(root);
  fs.writeFileSync(path.join(root,'library','masuk','new.zip'),'PK-fake');
  assert.notEqual(registrySignature(root),snap);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
