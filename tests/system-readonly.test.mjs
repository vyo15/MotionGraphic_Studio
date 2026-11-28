import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const snapshot=()=>{
 const files=['src/Root.tsx','library/catalog.json','library/.studio-generated-state.json'];
 return Object.fromEntries(files.map(f=>{
  const p=path.join(ROOT,f);return [f,fs.existsSync(p)?createHash('sha256').update(fs.readFileSync(p)).digest('hex'):null];
 }));
};
test('sync-state audit is read-only on isolated fixture',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-readonly-'));
 try{
  for(const d of ['tools','projects/sample','library','src'])fs.mkdirSync(path.join(root,d),{recursive:true});
  fs.copyFileSync(path.join(ROOT,'tools/check-sync-state.mjs'),path.join(root,'tools/check-sync-state.mjs'));
  fs.writeFileSync(path.join(root,'projects/sample/motiongraphic-video.json'),JSON.stringify({id:'SampleVideo',slug:'sample',width:1080,height:1920,fps:30,durationInFrames:30}));
  fs.writeFileSync(path.join(root,'library/catalog.json'),JSON.stringify({videos:[{id:'SampleVideo',slug:'sample',width:1080,height:1920,fps:30,durationInFrames:30}]}));
  fs.writeFileSync(path.join(root,'src/Root.tsx'),'// fixture');
  const before=['projects/sample/motiongraphic-video.json','library/catalog.json','src/Root.tsx'].map(f=>fs.readFileSync(path.join(root,f)));
  const r=spawnSync(process.execPath,[path.join(root,'tools/check-sync-state.mjs')],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr+r.stdout);
  ['projects/sample/motiongraphic-video.json','library/catalog.json','src/Root.tsx'].forEach((f,i)=>assert.deepEqual(fs.readFileSync(path.join(root,f)),before[i]));
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
test('studio-check no longer invokes project sync',()=>{
 const code=fs.readFileSync(path.join(ROOT,'tools/studio-check.mjs'),'utf8');
 assert.match(code,/staticGatePlan\(ROOT,\{full:true\}\)/);
 const preflight=fs.readFileSync(path.join(ROOT,'tools/studio-preflight.mjs'),'utf8');
 assert.match(preflight,/check-sync-state\.mjs/);
 assert.doesNotMatch(preflight,/sync-projects\.mjs/);
 assert.doesNotMatch(code,/step\('sync-projects\.mjs'\)/);
});
test('real Remotion smoke command requires CLI locally and reports absence as blocker',()=>{
 const script=fs.readFileSync(path.join(ROOT,'tools/smoke-remotion.mjs'),'utf8');
 assert.match(script,/node_modules/);assert.match(script,/compositions/);assert.match(script,/belum membuktikan keseluruhan MP4/i);
});
test('library validator uses project-local original assets, not absent generated mirrors',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-asset-mirror-'));
 try{
  for(const d of ['tools','projects/sample/src','projects/sample/public/audio','library','src'])fs.mkdirSync(path.join(root,d),{recursive:true});
  fs.copyFileSync(path.join(ROOT,'tools/validate-library.mjs'),path.join(root,'tools/validate-library.mjs'));
  fs.writeFileSync(path.join(root,'projects/sample/src/Video.tsx'),"const asset=staticFile('videos/sample/audio/test.wav');");
  fs.writeFileSync(path.join(root,'projects/sample/public/audio/test.wav'),'example audio');
  fs.writeFileSync(path.join(root,'library/catalog.json'),JSON.stringify({videos:[{id:'SampleVideo',slug:'sample',source:'projects/sample/src/Video.tsx',projectDir:'projects/sample',segments:[]}]}));
  fs.writeFileSync(path.join(root,'src/Root.tsx'),'<Composition id="SampleVideo" />');
  const run=()=>spawnSync(process.execPath,[path.join(root,'tools/validate-library.mjs')],{cwd:root,encoding:'utf8'});
  let r=run();assert.equal(r.status,0,r.stderr+r.stdout);assert.match(r.stderr,/MIRROR BELUM SYNC/);
  fs.rmSync(path.join(root,'projects/sample/public/audio/test.wav'));
  r=run();assert.notEqual(r.status,0);assert.match(r.stderr,/Aset sumber hilang/);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
