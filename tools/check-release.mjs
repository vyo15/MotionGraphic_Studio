#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
export function inspectRelease(root){
 const errors=[];const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 try{
  const pkg=read('package.json'),lock=read('package-lock.json'),caps=read('contracts/studio-capabilities.json');
  const need=(ok,msg)=>{if(!ok)errors.push(msg)};
  need(/^\d+\.\d+\.\d+$/.test(pkg.version),'package version bukan semver stabil');
  need(pkg.version===lock.version&&pkg.version===lock.packages?.['']?.version&&pkg.version===caps.masterVersion,'Versi package/lock/capabilities berbeda');
  for(const key of ['dependencies','devDependencies']){
   const a=pkg[key]??{},b=lock.packages?.['']?.[key]??{};
   need(JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort()),'Lock root '+key+' berbeda');
  }
  need(pkg.dependencies?.remotion===pkg.dependencies?.['@remotion/cli']&&pkg.dependencies?.remotion===caps.remotionVersion,'Versi Remotion/CLI/capabilities berbeda');
  need(caps.productionStandards?.motionPlanContract==='focus-driven-v1','Capability Motion Plan belum terdaftar');
  for(const [script,file] of [['qa:motion','qa-motion-plan.mjs'],['release:check','check-release.mjs'],['qa:spatial','qa-spatial.mjs'],['vo:align','vo-align.mjs'],['qa:approval','production-scope.mjs']]){
   need(pkg.scripts?.[script]===`node tools/${file}`,`Script ${script} tidak sinkron`);
   need(fs.existsSync(path.join(root,'tools',file)),`Tool ${file} hilang`);
  }
  for(const f of ['templates/production-toolkit/src/animations/camera.mjs','templates/production-toolkit/src/components/PortraitCamera.tsx','docs/PRODUCTION-TOOLKIT.md','tools/approval-identity.mjs','tools/planned-holds.mjs','tools/qa-spatial-trace.mjs'])need(fs.existsSync(path.join(root,f)),`Toolkit file ${f} hilang`);
  return {ok:errors.length===0,errors,version:pkg.version,remotion:pkg.dependencies?.remotion};
 }catch(e){return {ok:false,errors:[e.message]};}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const r=inspectRelease(root);
 for(const e of r.errors)console.error('[FAIL] '+e);
 console.log(`[${r.ok?'PASS':'FAIL'}] Master ${r.version??'?'} | Remotion ${r.remotion??'?'} | release metadata only`);process.exitCode=r.ok?0:1;
}
