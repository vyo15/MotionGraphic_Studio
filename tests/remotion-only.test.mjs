import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
test('Master only exposes Remotion workflows, no secondary editor scripts',()=>{
 const pkg=JSON.parse(read('package.json'));
 for(const [name,command] of Object.entries(pkg.scripts)){
  assert.doesNotMatch(name,/^concat|^handoff$|^logs$/i,name);
  assert.doesNotMatch(command,/concat|export-concat/i,name);
 }
 assert.ok(pkg.dependencies.remotion);
 assert.ok(pkg.dependencies['@remotion/cli']);
});
test('No Concat runtime, source, tests, bridge, or old handoff metadata',()=>{
 const forbidden=[
  'tools/concat-manager.ps1','tools/concat-bridge','tools/export-concat-segments.mjs',
  'tools/enable-concat-npm.mjs','projects/ip-address/concat-segments.json',
  'ALUR-KERJA-REMOTION-CONCAT.md','apps/concat'
 ];
 for(const item of forbidden) assert.ok(!fs.existsSync(path.join(root,item)),item);
 for(const dir of ['tools','tests']){
  assert.ok(fs.readdirSync(path.join(root,dir)).every(name=>!name.toLowerCase().includes('concat')&&!name.toLowerCase().includes('handoff')),dir);
 }
});
test('Two video IDs and all essential Remotion docs are preserved',()=>{
 const ip=JSON.parse(read('projects/ip-address/motiongraphic-video.json'));
 const win=JSON.parse(read('projects/windows-hacks-5-shortcut-lengkap/motiongraphic-video.json'));
 assert.equal(ip.id,'IPAddressReels');
 assert.equal(win.id,'WindowsHacks5ShortcutLengkap');
 for(const slug of [ip.slug,win.slug]){
  assert.ok(fs.existsSync(path.join(root,'projects',slug,'src/Video.tsx')));
  assert.ok(fs.existsSync(path.join(root,'projects',slug,'public')));
 }
 for(const doc of ['README.md','PANDUAN-REMOTION-STUDIO.md','PANDUAN-AUDIO-TIMELINE.md','PRODUCTION-RULES.md','AUDIT-REMOTION-ONLY-20261104.md']){
  assert.ok(fs.existsSync(path.join(root,doc)),doc);
  assert.ok(read('tools/zip-video.mjs').includes(doc),doc);
 }
});
test('Package lock agrees with Remotion dependencies',()=>{
 const pkg=JSON.parse(read('package.json'));
 const lock=JSON.parse(read('package-lock.json'));
 assert.deepEqual(lock.packages[''].dependencies,pkg.dependencies);
 assert.deepEqual(lock.packages[''].devDependencies,pkg.devDependencies);
});
test('Documentation has no broken relative Markdown links',()=>{
 function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
  const f=path.join(dir,ent.name);
  if(ent.isDirectory())walk(f);
  else if(ent.name.endsWith('.md')){
   const content=fs.readFileSync(f,'utf8');
   for(const m of content.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)){
    const target=m[1];
    if(/^(?:https?:|mailto:)/.test(target))continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(f),target)),`${f} -> ${target}`);
   }
  }
 }}
 for(const dir of ['projects','tools'])walk(path.join(root,dir));
 for(const f of fs.readdirSync(root).filter(x=>x.endsWith('.md'))){
  const content=read(f);
  for(const m of content.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)){
   const target=m[1];if(/^(?:https?:|mailto:)/.test(target))continue;
   assert.ok(fs.existsSync(path.resolve(root,target)),`${f} -> ${target}`);
  }
 }
});
