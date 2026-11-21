import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const TOOL=fs.readFileSync(path.join(ROOT,'tools','clean-master.mjs'));
function fixture(fn){
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-clean-test-'));
 try {
  const root=path.join(tmp,'MotionGraphic-Studio');
  fs.mkdirSync(path.join(root,'tools'),{recursive:true});
  fs.writeFileSync(path.join(root,'tools','clean-master.mjs'),TOOL);
  fs.mkdirSync(path.join(root,'projects','safe-video'),{recursive:true});
  fs.mkdirSync(path.join(root,'library','backups'),{recursive:true});
  fs.mkdirSync(path.join(root,'src'),{recursive:true});
  fs.writeFileSync(path.join(root,'projects','safe-video','Video.tsx'),'source penting');
  fs.writeFileSync(path.join(root,'library','catalog.json'),'katalog penting');
  fs.writeFileSync(path.join(root,'src','Root.tsx'),'root penting');
  fs.writeFileSync(path.join(root,'AUDIT-REMOTION-ONLY-20261104.md'),'log usang');
  fs.writeFileSync(path.join(root,'library','backups','catalog-old.json'),'backup lama');
  fn(root);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
}
function run(root,args=[]){return spawnSync(process.execPath,[path.join(root,'tools','clean-master.mjs'),...args],{cwd:root,encoding:'utf8'})}
test('cleanup is preview-only by default; apply removes exact legacy files, never projects/catalog/render',()=>fixture(root=>{
 const project=path.join(root,'projects','safe-video','Video.tsx');
 const legacy=path.join(root,'AUDIT-REMOTION-ONLY-20261104.md');
 const backup=path.join(root,'library','backups','catalog-old.json');
 assert.equal(run(root).status,0);
 assert.ok(fs.existsSync(legacy));
 assert.equal(run(root,['--apply']).status,0);
 assert.ok(!fs.existsSync(legacy));
 assert.ok(fs.existsSync(backup));
 assert.equal(run(root,['--apply','--history']).status,0);
 assert.ok(!fs.existsSync(backup));
 assert.equal(fs.readFileSync(project,'utf8'),'source penting');
 assert.equal(fs.readFileSync(path.join(root,'library','catalog.json'),'utf8'),'katalog penting');
 assert.equal(fs.readFileSync(path.join(root,'src','Root.tsx'),'utf8'),'root penting');
}));
test('cleanup rejects unexpected arguments; safe files remain',()=>fixture(root=>{
 const result=run(root,['--delete-projects']);
 assert.equal(result.status,2);
 assert.ok(fs.existsSync(path.join(root,'projects','safe-video','Video.tsx')));
}));
test('cleanup blocks symlink backup directories rather than following outside Master',()=>fixture(root=>{
 const backups=path.join(root,'library','backups');
 fs.rmSync(backups,{recursive:true});
 const elsewhere=fs.mkdtempSync(path.join(os.tmpdir(),'mg-outside-'));
 try{
  fs.writeFileSync(path.join(elsewhere,'outside.txt'),'DO NOT DELETE');
  try{fs.symlinkSync(elsewhere,backups,'dir')}catch{return} // Some Windows setups disallow symlinks.
  const result=run(root,['--apply','--history']);
  assert.notEqual(result.status,0);
  assert.ok(fs.existsSync(path.join(elsewhere,'outside.txt')));
 }finally{fs.rmSync(elsewhere,{recursive:true,force:true})}
}));
