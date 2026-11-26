import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {validateAddon} from '../tools/validate-addon.mjs';
import {applyPatch} from '../tools/apply-addon-patch.mjs';
import {inspectZip} from '../tools/zip-preflight.mjs';
import {createZip,collectEntries} from '../tools/zip-core.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const tmp=fn=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-ai-'));const clean=()=>fs.rmSync(dir,{recursive:true,force:true});try{const r=fn(dir);if(r?.then)return r.finally(clean);clean();return r}catch(e){clean();throw e}};
const create=(root,slug='tes-addon')=>{
 const dir=path.join(root,'projects',slug);fs.mkdirSync(path.join(dir,'src/config'),{recursive:true});
 fs.mkdirSync(path.join(root,'library'),{recursive:true});
 const m={contractVersion:'1.0.0',id:'TesAddon',slug,title:'Test Addon',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{}};
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(m));
 fs.writeFileSync(path.join(dir,'src/Video.tsx'),"export const Video=()=>null;\n");
 fs.writeFileSync(path.join(root,'package.json'),JSON.stringify({dependencies:{react:'19.0.0',remotion:'4.0.538'}}));
 return dir;
};
test('shared validator accepts minimal legacy addon and rejects unsafe paths or unresolved imports',()=>tmp(root=>{
 const dir=create(root);
 assert.equal(validateAddon(dir,{root}).ok,true);
 fs.writeFileSync(path.join(dir,'src/Video.tsx'),"import X from './missing'; export const Video=()=>null;");
 assert.match(validateAddon(dir,{root}).errors.join('; '),/Import relatif tidak ditemukan/);
 fs.writeFileSync(path.join(dir,'src/Video.tsx'),"import X from '../../private'; export const Video=()=>null;");
 assert.match(validateAddon(dir,{root}).errors.join('; '),/melintasi batas add-on/);
}));
test('patch modifies only matching checksum, preserves unrelated project and refuses conflicts',()=>tmp(root=>{
 const dir=create(root),other=create(root,'other-addon');
 const otherBefore=sha(path.join(other,'src/Video.tsx'));
 const source=path.join(dir,'src/Video.tsx'),oldHash=sha(source);
 const patch=path.join(root,'revision'),payload=path.join(patch,'files/src/Video.tsx');
 fs.mkdirSync(path.dirname(payload),{recursive:true});fs.writeFileSync(payload,'export const Video=()=>42;\n');
 fs.writeFileSync(path.join(patch,'addon-patch.json'),JSON.stringify({schemaVersion:1,id:'TesAddon',slug:'tes-addon',files:[{path:'src/Video.tsx',operation:'write',expectedSha256:oldHash,sha256:sha(payload),source:'files/src/Video.tsx'}]}));
 const preview=applyPatch(patch,{root,dryRun:true});assert.equal(preview.applied,false);assert.equal(sha(source),oldHash);
 const done=applyPatch(patch,{root});assert.equal(done.applied,true);assert.equal(fs.readFileSync(source,'utf8'),'export const Video=()=>42;\n');
 assert.equal(sha(path.join(other,'src/Video.tsx')),otherBefore);
 assert.throws(()=>applyPatch(patch,{root}),/KONFLIK/);
}));
test('patch attempts to escape folder and mismatched id cannot mutate files',()=>tmp(root=>{
 create(root);const patch=path.join(root,'revision');fs.mkdirSync(patch);
 const p=path.join(patch,'addon-patch.json');
 fs.writeFileSync(p,JSON.stringify({schemaVersion:1,id:'TesAddon',slug:'tes-addon',files:[{path:'../outside',operation:'delete',expectedSha256:null}]}));
 assert.throws(()=>applyPatch(patch,{root}),/Path patch tidak aman/);
 fs.writeFileSync(p,JSON.stringify({schemaVersion:1,id:'DifferentId',slug:'tes-addon',files:[{path:'src/Video.tsx',operation:'delete',expectedSha256:'x'}]}));
 assert.throws(()=>applyPatch(patch,{root}),/ID project berubah/);
}));
test('ZIP preflight catches untrusted invalid archive',()=>tmp(root=>{
 const f=path.join(root,'corrupt.zip');fs.writeFileSync(f,'no zip');
 assert.throws(()=>inspectZip(f),/ZIP/);
}));
test('scaffold creates separate validated add-on without editing projects',()=>tmp(root=>{
 for(const dir of ['tools','templates','exports','projects','library'])fs.mkdirSync(path.join(root,dir),{recursive:true});
 fs.cpSync(path.join(ROOT,'templates/addon-starter'),path.join(root,'templates/addon-starter'),{recursive:true});
 for(const f of ['scaffold-addon.mjs','validate-addon.mjs','qa-motion-plan.mjs','qa-spatial.mjs','qa-spatial-trace.mjs'])fs.copyFileSync(path.join(ROOT,'tools',f),path.join(root,'tools',f));
 fs.writeFileSync(path.join(root,'package.json'),JSON.stringify({dependencies:{react:'19.0.0',remotion:'4.0.538'}}));
 fs.cpSync(path.join(ROOT,'templates/production-toolkit'),path.join(root,'templates/production-toolkit'),{recursive:true});
 const r=spawnSync(process.execPath,[path.join(root,'tools/scaffold-addon.mjs'),'tes-video','TesVideo','Tutorial','Test'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 assert.equal(fs.readdirSync(path.join(root,'projects')).length,0);
 assert.equal(validateAddon(path.join(root,'exports/addons/tes-video'),{root,strict:true}).ok,true);
}));

test('revision patch can be loaded directly from a ZIP file',()=>tmp(async root=>{
 const project=create(root),existing=path.join(project,'src/Video.tsx'),oldHash=sha(existing);
 const dir=path.join(root,'patch/revision'),source=path.join(dir,'files/src/Video.tsx');
 fs.mkdirSync(path.dirname(source),{recursive:true});fs.writeFileSync(source,'export const Video=()=>"ZIP Patch";');
 fs.writeFileSync(path.join(dir,'addon-patch.json'),JSON.stringify({schemaVersion:1,id:'TesAddon',slug:'tes-addon',files:[{path:'src/Video.tsx',operation:'write',expectedSha256:oldHash,sha256:sha(source),source:'files/src/Video.tsx'}]}));
 const zip=path.join(root,'patch.zip'),entries=await collectEntries([{absolute:dir,name:'revision'}]);
 await createZip(entries,zip);
 assert.equal(applyPatch(zip,{root,dryRun:true}).applied,false);
 assert.equal(applyPatch(zip,{root}).applied,true);
 assert.match(fs.readFileSync(existing,'utf8'),/ZIP Patch/);
}));
