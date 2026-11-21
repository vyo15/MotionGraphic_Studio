import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const sourceRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function fixture(){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-retirement-fixture-'));
 const root=path.join(temp,'MotionGraphic-Studio'),out=path.join(temp,'Backups');
 fs.mkdirSync(path.join(root,'tools'),{recursive:true});
 fs.mkdirSync(path.join(root,'library'),{recursive:true});
 fs.mkdirSync(path.join(root,'projects','active'),{recursive:true});
 fs.mkdirSync(path.join(root,'projects','old'),{recursive:true});
 for(const name of ['menu-helper.mjs','export-paths.mjs','retire-unregistered.mjs'])fs.copyFileSync(path.join(sourceRoot,'tools',name),path.join(root,'tools',name));
 fs.writeFileSync(path.join(root,'library','catalog.json'),JSON.stringify({videos:[{id:'ActiveReels',slug:'active',projectDir:'projects/active'}]}));
 for(const slug of ['active','old'])fs.writeFileSync(path.join(root,'projects',slug,'motiongraphic-video.json'),JSON.stringify({id:slug==='active'?'ActiveReels':'OldReels',slug}));
 return {temp,root,out,run:(args=[])=>spawnSync(process.execPath,[path.join(root,'tools','retire-unregistered.mjs'),...args],{cwd:root,encoding:'utf8',env:{...process.env,MOTIONGRAPHIC_STUDIO_EXPORT_DIR:out}})};
}
test('preview does not move anything; --apply moves ONLY unregistered folders outside the Master',()=>{
 const f=fixture();try{
  const preview=f.run();assert.equal(preview.status,0,preview.stderr);assert.match(preview.stdout,/CANDIDATE projects\/old/);
  assert.ok(fs.existsSync(path.join(f.root,'projects','old')));
  const apply=f.run(['--apply']);assert.equal(apply.status,0,apply.stderr);
  assert.ok(fs.existsSync(path.join(f.root,'projects','active','motiongraphic-video.json')));
  assert.ok(!fs.existsSync(path.join(f.root,'projects','old')));
  const dirs=fs.readdirSync(path.join(f.out,'RetiredProjects'));
  assert.equal(dirs.length,1);assert.match(dirs[0],/^old-/);
  assert.ok(fs.existsSync(path.join(f.out,'RetiredProjects',dirs[0],'motiongraphic-video.json')));
 }finally{fs.rmSync(f.temp,{recursive:true,force:true})}
});
test('Remotion Studio launcher and typecheck use Node CLI directly, no shell:true',()=>{
 const start=fs.readFileSync(path.join(sourceRoot,'tools','start-studio.mjs'),'utf8');
 const check=fs.readFileSync(path.join(sourceRoot,'tools','studio-check.mjs'),'utf8');
 assert.match(start,/spawn\(process\.execPath/);
 assert.doesNotMatch(start,/shell:\s*process\.platform\s*===\s*['"]win32/);
 assert.match(check,/typescript/);
 assert.doesNotMatch(check,/shell:\s*process\.platform\s*===\s*['"]win32/);
});
