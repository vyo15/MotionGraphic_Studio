import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const master=fileURLToPath(new URL('../',import.meta.url));
function fixture(t){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-prod-'));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const put=(p,s)=>{const f=path.join(root,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s);};
 const json=(p,o)=>put(p,JSON.stringify(o));
 for(const f of ['start-studio.mjs','prod-preflight.mjs','check-sync-state.mjs','validate-library.mjs'])put('tools/'+f,fs.readFileSync(path.join(master,'tools',f)));
 const manifest={id:'Demo',slug:'demo',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{title:'ok'}};
 json('projects/demo/motiongraphic-video.json',manifest);
 put('projects/demo/src/Video.tsx',"staticFile('videos/demo/asset.txt')");
 put('projects/demo/public/asset.txt','asset');put('public/videos/demo/asset.txt','asset');
 json('library/catalog.json',{videos:[{...manifest,projectDir:'projects/demo',source:'projects/demo/src/Video.tsx',segments:[]}]});
 put('src/index.ts','');const rootText='<Composition id="Demo" />';put('src/Root.tsx',rootText);json('library/.studio-generated-state.json',{rootText});
 put('node_modules/@remotion/cli/remotion-cli.js',"console.log('MOCK CLI '+JSON.stringify(process.argv.slice(2)));process.exit(0)");
 // These must never even be imported by prod.
 for(const f of ['auto-sync-watch','auto-chatgpt-export','auto-spatial'])put('tools/'+f+'.mjs',"throw Error('Watcher must not run in prod')");
 const run=()=>spawnSync(process.execPath,['tools/start-studio.mjs','--prod'],{cwd:root,encoding:'utf8',timeout:10000});
 return {root,put,json,manifest,run};
}
test('prod uses existing native Studio launcher and skips npm preparation lifecycle',()=>{
 const pkg=JSON.parse(fs.readFileSync(path.join(master,'package.json'),'utf8'));
 assert.equal(pkg.scripts.prod,'node tools/start-studio.mjs --prod');assert.equal(pkg.scripts.preprod,undefined);assert.equal(pkg.scripts.postprod,undefined);
 assert.equal(pkg.scripts.predev,'node tools/prepare-studio.mjs');
});
test('prod starts only Remotion with stable registry, no Master watchers or mutations',t=>{
 const f=fixture(t);const before=fs.readFileSync(path.join(f.root,'library/catalog.json'));const r=f.run();assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/MOCK CLI \["studio","src\/index.ts","--port","3000"/);assert.doesNotMatch(r.stdout,/\[AUTO SYNC\] Aktif|\[AUTO SPATIAL\] Sampling/);assert.deepEqual(fs.readFileSync(path.join(f.root,'library/catalog.json')),before);
});
for(const [name,change] of [
 ['missing CLI',f=>fs.rmSync(path.join(f.root,'node_modules'),{recursive:true})],
 ['missing mirror',f=>fs.rmSync(path.join(f.root,'public/videos/demo/asset.txt'))],
 ['missing source asset',f=>fs.rmSync(path.join(f.root,'projects/demo/public/asset.txt'))],
 ['unregistered project',f=>f.json('projects/new/motiongraphic-video.json',{id:'New'})],
 ['changed Root',f=>f.put('src/Root.tsx','changed')],
 ['changed Props',f=>f.json('projects/demo/motiongraphic-video.json',{...f.manifest,defaultProps:{title:'changed'}})],
 ['wrong root',f=>f.json('motiongraphic-video.json',{})],
])test('prod blocks '+name+' without launching or repairing',t=>{const f=fixture(t);change(f);const r=f.run();assert.equal(r.status,1,r.stdout+r.stderr);assert.match(r.stderr,/npm run dev/);assert.doesNotMatch(r.stdout,/MOCK CLI/);});
test('dev retains all three watchers and same Studio launch',t=>{
 const f=fixture(t);for(const [file,fn] of [['auto-sync-watch','startAutoSync'],['auto-chatgpt-export','startAutoChatgptExport'],['auto-spatial','startAutoSpatial']])f.put('tools/'+file+'.mjs',`export function ${fn}(){console.log('${fn} started');return {isIdle:()=>true,close(){console.log('${fn} closed')}}}`);
 const r=spawnSync(process.execPath,['tools/start-studio.mjs'],{cwd:f.root,encoding:'utf8',timeout:10000,env:{...process.env,MOTION_STUDIO_AUTO_CHATGPT:'1',MOTION_STUDIO_AUTO_SPATIAL:'1'}});
 assert.equal(r.status,0,r.stdout+r.stderr);for(const fn of ['startAutoSync','startAutoChatgptExport','startAutoSpatial']){assert.match(r.stdout,new RegExp(fn+' started'));assert.match(r.stdout,new RegExp(fn+' closed'));}assert.match(r.stdout,/MOCK CLI/);
});
