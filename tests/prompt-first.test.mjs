import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');
test('Prompt-first keeps creative techniques without local agent installation or a second renderer',()=>{
 const rules=read('docs/MOTION-DIRECTION-RULES.md');
 for(const name of ['Swiss Motion','Living Screencast','Instruction Manual','Data Storytelling','Precise Mechanism','Minimal Editorial'])assert.ok(rules.includes(name),name);
 assert.match(rules,/github.com\/lemomo-ai\/lemo-opuscar/);
 const pkg=JSON.parse(read('package.json'));
 assert.ok(!pkg.scripts.skills&&!pkg.scripts['skills:install']);
 assert.ok(!pkg.dependencies?.three&&!pkg.dependencies?.['playwright-core']);
 assert.ok(pkg.dependencies.remotion);
 assert.ok(!fs.existsSync(path.join(ROOT,'tools/remotion-skills.mjs')));
});

// Pilot: actual root-relative scaffold, install, registration, revision, and handoff.
// No renderer mock is used; this exercises the static/local workflow only.
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {masterEntries} from '../tools/master-export-inputs.mjs';
import {collectEntries,createZip} from '../tools/zip-core.mjs';
import {inspectZip} from '../tools/zip-preflight.mjs';
import {validateAddon} from '../tools/validate-addon.mjs';
const digest=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function snapshot(dir){const result={};function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(e.isFile())result[path.relative(dir,f)]=digest(f)}}walk(dir);return result;}
test('FILE CHANGE ONLY pilot registers draft and review, revises one file, preserves old projects and exports',async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-prompt-pilot-'));const root=path.join(tmp,'master');fs.mkdirSync(root);
 try{
  const entries=await masterEntries(ROOT);for(const e of entries){const dest=path.join(root,e.name.replace(/^MotionGraphic-Studio\//,''));if(e.isDirectory)fs.mkdirSync(dest,{recursive:true});else{fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(e.absolute,dest)}}
  const env={...process.env,NODE_PATH:[path.join(ROOT,'node_modules'),process.env.NODE_PATH].filter(Boolean).join(path.delimiter),MOTIONGRAPHIC_STUDIO_EXPORT_DIR:path.join(tmp,'handoff')};
  const run=(tool,args=[])=>spawnSync(process.execPath,[path.join(root,'tools',tool),...args],{cwd:root,env,encoding:'utf8',timeout:120000});
  const ok=r=>assert.equal(r.status,0,r.stdout+'\n'+r.stderr);
  const old=fs.readdirSync(path.join(root,'projects'),{withFileTypes:true}).filter(e=>e.isDirectory()&&!e.name.startsWith('_')&&!e.name.startsWith('.')).map(e=>e.name);const original=Object.fromEntries(old.map(n=>[n,snapshot(path.join(root,'projects',n))]));
  const slug='pilot-win-r',id='PilotWinR';ok(run('scaffold-addon.mjs',[slug,id,'Pilot Win R']));
  const pkg=path.join(root,'exports/file-change-only',slug);const staged=path.join(pkg,'projects',slug);const mf=path.join(staged,'motiongraphic-video.json');let m=JSON.parse(fs.readFileSync(mf,'utf8'));
  assert.equal(m.productionStage,'draft');assert.equal(validateAddon(staged,{root,strict:true}).ok,true);assert.equal(validateAddon(staged,{root,production:true,strict:true}).ok,false);
  const zip=path.join(tmp,'new-FILE-CHANGE-ONLY.zip');await createZip(await collectEntries([{absolute:path.join(pkg,'projects'),name:'projects'}]),zip);assert.ok(inspectZip(zip).paths.includes('projects/'+slug+'/motiongraphic-video.json'));
  const project=path.join(root,'projects',slug);fs.cpSync(staged,project,{recursive:true,errorOnExist:true,force:false});ok(run('sync-projects.mjs'));ok(run('validate-library.mjs'));
  let cat=JSON.parse(fs.readFileSync(path.join(root,'library/catalog.json'),'utf8'));const added=cat.videos.find(v=>v.id===id);assert.ok(added);assert.equal(added.segments.length,4);assert.equal(added.voiceGuideCompositionId,id+'VOGuide');
  const state=JSON.parse(fs.readFileSync(path.join(project,'PRODUCTION-STATE.json'),'utf8'));assert.equal(state.decisionLog.length,0);
  // Mark for static review, not visual ACC; then simulate root-relative revision.
  m=JSON.parse(fs.readFileSync(path.join(project,'motiongraphic-video.json'),'utf8'));m.productionStage='review';fs.writeFileSync(path.join(project,'motiongraphic-video.json'),JSON.stringify(m,null,2));// Explicitly simulate missing font assets, even when the host library is already installed.
  const localFonts=path.join(project,'public/fonts'),savedFonts=path.join(tmp,'saved-pilot-fonts');
  const hadFonts=fs.existsSync(localFonts);if(hadFonts)fs.renameSync(localFonts,savedFonts);
  try{const pending=validateAddon(project,{root,production:true});assert.equal(pending.ok,false);assert.match(pending.errors.join(' '),/Font lokal belum tersedia/);}finally{if(hadFonts)fs.renameSync(savedFonts,localFonts);}
  // Legacy review path independently tested because this fixture has no downloaded fonts.
  delete m.designContract;fs.writeFileSync(path.join(project,'motiongraphic-video.json'),JSON.stringify(m,null,2));ok(run('sync-projects.mjs'));
  const rel='projects/'+slug+'/src/scenes/Scene03.tsx',f=path.join(root,rel),before=digest(f),revision=path.join(tmp,'revision',rel);fs.mkdirSync(path.dirname(revision),{recursive:true});fs.writeFileSync(revision,fs.readFileSync(f,'utf8').replace('fontSize:64','fontSize:60'));assert.notEqual(digest(revision),before);
  const patch=path.join(tmp,'revision-FILE-CHANGE-ONLY.zip');await createZip(await collectEntries([{absolute:revision,name:rel}]),patch);assert.deepEqual(inspectZip(patch).paths,[rel]);assert.equal(digest(f),before);fs.copyFileSync(revision,f);ok(run('sync-projects.mjs'));fs.mkdirSync(path.join(root,'library/masuk'),{recursive:true});fs.writeFileSync(path.join(root,'library/masuk/old.zip'),'PK');ok(run('zip-video.mjs',['--chatgpt']));
  const latest=path.join(tmp,'handoff/Master/CHATGPT-LATEST.zip');const handoffHash=digest(latest);assert.ok(inspectZip(latest).paths.includes('MotionGraphic-Studio/'+rel));assert.ok(!inspectZip(latest).paths.some(p=>p.endsWith('/library/masuk/old.zip')));
  // A stale narration plan on a declared review cannot replace a good handoff.
  const narr=path.join(project,'src/config/narration.json');const raw=fs.readFileSync(narr);const n=JSON.parse(raw);n.beats[0].text+=' drift';fs.writeFileSync(narr,JSON.stringify(n));assert.notEqual(run('zip-video.mjs',['--chatgpt']).status,0);assert.equal(digest(latest),handoffHash);ok(run('zip-video.mjs',['--diagnostic']));const diagnostic=fs.readdirSync(path.dirname(latest)).find(x=>x.startsWith('CHATGPT-DIAGNOSTIC-')&&x.endsWith('.zip'));assert.ok(diagnostic);const diagnosticPaths=inspectZip(path.join(path.dirname(latest),diagnostic)).paths;assert.ok(diagnosticPaths.includes('MotionGraphic-Studio/DIAGNOSTIC-NOT-PRODUCTION.json'));assert.ok(diagnosticPaths.includes('MotionGraphic-Studio/diagnostic-static-report.txt'));assert.equal(digest(latest),handoffHash);fs.writeFileSync(narr,raw);
  for(const name of old)assert.deepEqual(snapshot(path.join(root,'projects',name)),original[name],name+' changed');
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

test('interaction helper math anchors cursor tip and clamps motion endpoints',async()=>{
 const {stripTypeScriptTypes}=await import('node:module');
 const src=read('templates/addon-starter/src/animations/interaction.ts');
 const mod=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(src,{mode:'strip'})).toString('base64'));
 assert.deepEqual(mod.cursorHotspot(100,200),{left:98,top:198});
 assert.equal(mod.smoothProgress(-10,0,20),0);assert.equal(mod.smoothProgress(10,0,20),0.5);assert.equal(mod.smoothProgress(30,0,20),1);
 assert.deepEqual(mod.pointBetween({x:10,y:20},{x:30,y:60},0.5),{x:20,y:40});assert.throws(()=>mod.smoothProgress(0,1,1));
});
