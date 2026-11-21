import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {validateAddon} from '../tools/validate-addon.mjs';
import {applyPatch} from '../tools/apply-addon-patch.mjs';
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const sandbox=fn=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-guardrails-'));try{return fn(dir)}finally{fs.rmSync(dir,{recursive:true,force:true})}};
function setup(root){
 const dir=path.join(root,'projects/guard-video');
 for(const p of ['src/scenes','src/config','src/components','src/animations','public/audio','library'])fs.mkdirSync(path.join(dir,p),{recursive:true});
 fs.writeFileSync(path.join(root,'package.json'),JSON.stringify({dependencies:{react:'19',remotion:'4.0.538'}}));
 const manifest={contractVersion:'1.0.0',id:'GuardVideo',slug:'guard-video',title:'Guard',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{}};
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(manifest));
 fs.writeFileSync(path.join(dir,'README.md'),'fixture');
 fs.writeFileSync(path.join(dir,'PANDUAN-EDIT-ASSET.md'),'fixture');
 fs.writeFileSync(path.join(dir,'src/Video.tsx'),"export const Video = () => null;\n");
 return {dir,manifest,source:path.join(dir,'src/Video.tsx')};
}
test('strict validator accepts complete add-on and rejects missing asset',()=>sandbox(root=>{
 const {dir,source}=setup(root);
 assert.equal(validateAddon(dir,{root,strict:true}).ok,true);
 fs.writeFileSync(source,"import {staticFile} from 'remotion'; export const Video=()=>staticFile('videos/guard-video/audio/missing.wav');");
 const v=validateAddon(dir,{root,strict:true});assert.equal(v.ok,false);assert.match(v.errors.join('|'),/Aset tidak ditemukan/);
}));
test('contract defaultProps is REQUIRED and must be an object',()=>sandbox(root=>{
 const {dir,manifest}=setup(root);delete manifest.defaultProps;
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(manifest));
 assert.match(validateAddon(dir,{root,strict:true}).errors.join('|'),/defaultProps/);
 manifest.defaultProps=null;fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(manifest));
 assert.match(validateAddon(dir,{root,strict:true}).errors.join('|'),/defaultProps/);
}));
test('strict validator rejects unresolved literal and variable dynamic imports',()=>sandbox(root=>{
 const {dir,source}=setup(root);
 fs.writeFileSync(source,"const Lazy = import('./missing'); export const Video=()=>null;");
 assert.match(validateAddon(dir,{root,strict:true}).errors.join('|'),/Import relatif tidak ditemukan/);
 fs.writeFileSync(source,"const name='missing'; const Lazy=import('./'+name); export const Video=()=>null;");
 assert.match(validateAddon(dir,{root,strict:true}).errors.join('|'),/Import dinamis tidak dapat diverifikasi/);
}));
test('patch dry-run catches invalid future source and does not mutate project',()=>sandbox(root=>{
 const {dir,source}=setup(root),before=hash(source);
 const patch=path.join(root,'patch');fs.mkdirSync(path.join(patch,'files/src'),{recursive:true});
 const payload=path.join(patch,'files/src/Video.tsx');fs.writeFileSync(payload,"import Nonexistent from './lost'; export const Video=()=>null;");
 fs.writeFileSync(path.join(patch,'addon-patch.json'),JSON.stringify({schemaVersion:1,id:'GuardVideo',slug:'guard-video',files:[{path:'src/Video.tsx',operation:'write',expectedSha256:before,sha256:hash(payload),source:'files/src/Video.tsx'}]}));
 assert.throws(()=>applyPatch(patch,{root,dryRun:true}),/Preflight hasil patch gagal/);
 assert.throws(()=>applyPatch(patch,{root}),/Preflight hasil patch gagal/);
 assert.equal(hash(source),before);
 assert.ok(!fs.existsSync(path.join(root,'library/backups/addon-patches')));
}));
test('patch rejects case-folded duplicate paths before writing',()=>sandbox(root=>{
 const {source}=setup(root),before=hash(source);
 const patch=path.join(root,'patch');fs.mkdirSync(patch);
 fs.writeFileSync(path.join(patch,'addon-patch.json'),JSON.stringify({schemaVersion:1,id:'GuardVideo',slug:'guard-video',files:[
  {path:'src/Video.tsx',operation:'delete',expectedSha256:before},
  {path:'src/video.tsx',operation:'delete',expectedSha256:before},
 ]}));
 assert.throws(()=>applyPatch(patch,{root}),/Duplikat\/case-collision/);assert.equal(hash(source),before);
}));
test('strict validator rejects non-contiguous segments',()=>sandbox(root=>{
 const {dir,manifest}=setup(root);
 manifest.segments=[{id:'SegmentOne',title:'A',startFrame:0,durationInFrames:20},{id:'SegmentTwo',title:'B',startFrame:30,durationInFrames:60}];
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(manifest));
 assert.match(validateAddon(dir,{root,strict:true}).errors.join('|'),/StartFrame segment/);
}));
