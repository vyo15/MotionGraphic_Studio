import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {inspectRelease} from '../tools/check-release.mjs';
import {inspectProjectMotionPlans} from '../tools/qa-motion-plan.mjs';
import {validateAddon} from '../tools/validate-addon.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
test('release metadata versions and scripts synchronized',()=>assert.equal(inspectRelease(root).ok,true));
test('release detects stale lock without rewriting',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-release-'));
 try{for(const f of ['package.json','package-lock.json','contracts/studio-capabilities.json','tools/check-release.mjs','tools/qa-motion-plan.mjs','tools/qa-spatial.mjs','tools/qa-spatial-trace.mjs','tools/vo-align.mjs','tools/production-scope.mjs','tools/approval-identity.mjs','tools/planned-holds.mjs','templates/production-toolkit/src/animations/camera.mjs','templates/production-toolkit/src/components/PortraitCamera.tsx','docs/PRODUCTION-TOOLKIT.md']){const dest=path.join(temp,f);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,f),dest);}
 const f=path.join(temp,'package-lock.json'),d=JSON.parse(fs.readFileSync(f,'utf8'));d.version='0.0.0';fs.writeFileSync(f,JSON.stringify(d));const before=fs.readFileSync(f);assert.equal(inspectRelease(temp).ok,false);assert.match(inspectRelease(temp).errors.join(' '),/Versi package/);assert.deepEqual(fs.readFileSync(f),before);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('batch motion QA distinguishes legacy and incomplete declared plans',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-release-motion-'));
 try{for(const [slug,m] of [['legacy',{}],['declared',{motionPlanContract:'focus-driven-v1'}],['orphan',{}]]){const d=path.join(temp,slug);fs.mkdirSync(path.join(d,'production'),{recursive:true});fs.writeFileSync(path.join(d,'motiongraphic-video.json'),JSON.stringify(m));if(slug==='orphan')fs.writeFileSync(path.join(d,'production/motion-plan.json'),'{}');}
 assert.deepEqual(inspectProjectMotionPlans(temp).map(r=>[r.slug,r.status]),[['declared','FAIL'],['legacy','SKIP'],['orphan','FAIL']]);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
test('explicit production gate rejects placeholder without breaking legacy strict scaffold',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-release-scaffold-'));
 try{const d=path.join(temp,'contoh-video-reels');fs.cpSync(path.join(root,'templates/addon-starter'),d,{recursive:true});assert.equal(validateAddon(d,{root,strict:true}).ok,true);const result=validateAddon(d,{root,strict:true,production:true});assert.equal(result.ok,false);assert.match(result.errors.join(' '),/motionPlanContract/);
 }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
