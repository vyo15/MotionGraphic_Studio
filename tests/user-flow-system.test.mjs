import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const tool=path.join(ROOT,'tools','project-flow.mjs');
const run=(args)=>spawnSync(process.execPath,[tool,...args],{cwd:ROOT,encoding:'utf8'});
test('ChatGPT user flow prints deterministic steps, no project modifications',()=>{
 const before=fs.readFileSync(path.join(ROOT,'library','catalog.json'));
 const p=run(['--steps']);assert.equal(p.status,0,p.stderr);
 assert.match(p.stdout,/VO Guide/);assert.match(p.stdout,/Arsip & ulangi/);
 assert.deepEqual(fs.readFileSync(path.join(ROOT,'library','catalog.json')),before);
});
test('ChatGPT user flow generates brief on stdout without files',()=>{
 const p=run(['--new','Cara Kerja DNS','--audience','Pemula','--cta','Tanya penonton','--stdout']);
 assert.equal(p.status,0,p.stderr);
 assert.match(p.stdout,/Slug usulan: cara-kerja-dns/);
 assert.match(p.stdout,/Pemula/);assert.match(p.stdout,/VO GUIDE/);
 assert.match(p.stdout,/Master/);
});
test('ChatGPT user flow rejects missing title and unknown flags',()=>{
 assert.equal(run(['--new']).status,2);
 assert.equal(run(['--delete-projects']).status,2);
});
test('cleanup --logs removes only system log files, preserves video and catalog',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-flow-clean-'));
 try{
  const root=path.join(tmp,'Studio'); fs.mkdirSync(path.join(root,'tools'),{recursive:true});
  fs.copyFileSync(path.join(ROOT,'tools','clean-master.mjs'),path.join(root,'tools','clean-master.mjs'));
  fs.mkdirSync(path.join(root,'projects','sample'),{recursive:true});
  fs.mkdirSync(path.join(root,'library'),{recursive:true});
  fs.mkdirSync(path.join(root,'logs'),{recursive:true});
  fs.writeFileSync(path.join(root,'projects','sample','keep.log'),'important');
  fs.writeFileSync(path.join(root,'library','catalog.json'),'keep');
  fs.writeFileSync(path.join(root,'one.log'),'delete');
  fs.writeFileSync(path.join(root,'logs','two.log'),'delete');
  fs.writeFileSync(path.join(root,'logs','notes.md'),'keep');
  const p=spawnSync(process.execPath,[path.join(root,'tools','clean-master.mjs'),'--apply','--logs'],{cwd:root,encoding:'utf8'});
  assert.equal(p.status,0,p.stderr);
  assert.ok(!fs.existsSync(path.join(root,'one.log')));
  assert.ok(!fs.existsSync(path.join(root,'logs','two.log')));
  assert.ok(fs.existsSync(path.join(root,'logs','notes.md')));
  assert.ok(fs.existsSync(path.join(root,'projects','sample','keep.log')));
  assert.ok(fs.existsSync(path.join(root,'library','catalog.json')));
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
