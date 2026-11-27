import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {startAutoChatgptExport} from '../tools/auto-chatgpt-export.mjs';
import {startAutoSync,stableFiles} from '../tools/auto-sync-watch.mjs';
import {inspectZip} from '../tools/zip-preflight.mjs';
import {masterEntries,entrySignature} from '../tools/master-export-inputs.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=f=>createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const delay=ms=>new Promise(r=>setTimeout(r,ms));

test('auto handoff waits for idle and stable source, coalesces changes and stops polling on close',async()=>{
 let now=0,source='a',idle=false,runs=0;
 const auto=startAutoChatgptExport({root:ROOT,isIdle:()=>idle,now:()=>now,quietMs:10,pollMs:100000,signature:async()=>source,run:async()=>{runs++}});
 try{
  await delay(0);now=100;await auto.tick();assert.equal(runs,0);
  idle=true;await auto.tick();now=109;await auto.tick();assert.equal(runs,0);
  source='b';await auto.tick();now=119;await auto.tick();assert.equal(runs,1);
  now=150;await auto.tick();assert.equal(runs,1);
  source='c';await auto.tick();now=160;await auto.tick();assert.equal(runs,2);
  auto.close();source='d';now=200;await auto.tick();assert.equal(runs,2);
 }finally{auto.close()}
});
test('failed auto handoff is not repeated endlessly for same source; new edits retry',async()=>{
 let now=0,source='a',runs=0;
 const auto=startAutoChatgptExport({root:ROOT,isIdle:()=>true,now:()=>now,quietMs:10,pollMs:100000,signature:async()=>source,run:async()=>{runs++;if(runs===1)throw Error('fixture failure')}});
 try{await delay(0);now=10;await auto.tick();assert.equal(runs,1);now=100;await auto.tick();assert.equal(runs,1);source='b';await auto.tick();now=110;await auto.tick();assert.equal(runs,2)}finally{auto.close()}
});
test('registry watcher does not report idle after failed sync; a changed source can recover',async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-idle-'));
 const p=path.join(root,'projects','demo');fs.mkdirSync(p,{recursive:true});const manifest=path.join(p,'motiongraphic-video.json');fs.writeFileSync(manifest,'{}');
 let count=0;
 const w=startAutoSync({root,pollMs:20,debounceMs:10,runSync:async()=>{count++;if(count===1)throw Error('fixture failure')}});
 try{
  assert.equal(w.isIdle(),true);fs.writeFileSync(manifest,'{"title":"A"}');
  const wait=async predicate=>{for(let i=0;i<100&&!predicate();i++)await delay(15);assert.ok(predicate())};
  await wait(()=>count===1);assert.equal(w.isIdle(),false);
  fs.writeFileSync(manifest,'{"title":"Changed"}');await wait(()=>count>=2&&w.isIdle());
 }finally{w.close();fs.rmSync(root,{recursive:true,force:true})}
});
test('startup-ready import refuses a partially copied ZIP',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-inbox-ready-'));
 try{
  const tools=path.join(root,'tools');fs.mkdirSync(tools);for(const f of ['import-inbox.mjs','auto-sync-watch.mjs'])fs.copyFileSync(path.join(ROOT,'tools',f),path.join(tools,f));
  const inbox=path.join(root,'library','masuk');fs.mkdirSync(inbox,{recursive:true});const zip=path.join(inbox,'incomplete.zip');fs.writeFileSync(zip,'PK');
  assert.deepEqual(stableFiles(inbox,0),[]);
  const r=spawnSync(process.execPath,[path.join(tools,'import-inbox.mjs'),'--ready-only'],{encoding:'utf8',cwd:root});assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/INBOX MENUNGGU/);assert.ok(fs.existsSync(zip));
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
test('real automatic handoff updates only dedicated latest ZIP, protects previous ZIP on invalid source and does not edit projects',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-auto-zip-'));
 try{
  const root=path.join(temp,'master'),out=path.join(temp,'exports');fs.mkdirSync(root);
  // Use the actual Master ZIP source set, no node_modules or historical backup copies.
  const entries=await masterEntries(ROOT);
  for(const e of entries){const dest=path.join(root,e.name.replace(/^MotionGraphic-Studio\//,''));if(e.isDirectory)fs.mkdirSync(dest,{recursive:true});else{fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(e.absolute,dest)}}
  const run=()=>spawnSync(process.execPath,[path.join(root,'tools','zip-video.mjs'),'--chatgpt'],{cwd:root,encoding:'utf8',env:{...process.env,MOTIONGRAPHIC_STUDIO_EXPORT_DIR:out},timeout:120000});
  // Isolated fixture uses installed TypeScript without copying all dependencies.
  const {createRequire}=await import('node:module');const modules=path.dirname(path.dirname(createRequire(import.meta.url).resolve('typescript/package.json')));const old=process.env.NODE_PATH;process.env.NODE_PATH=[modules,old].filter(Boolean).join(path.delimiter);
  try{
   let r=run();assert.equal(r.status,0,r.stderr+'\n'+r.stdout);const latest=path.join(out,'Master','CHATGPT-LATEST.zip');
   const first=sha(latest);const paths=inspectZip(latest).paths;assert.ok(paths.includes('MotionGraphic-Studio/CHATGPT-HISTORY.md'));assert.ok(!paths.some(p=>p.includes('/library/backups/')));
   const backup=path.join(out,'Master','manual-backup.zip');fs.writeFileSync(backup,'manual backup untouched');
   const before=entrySignature(await masterEntries(root));fs.appendFileSync(path.join(root,'README.md'),'\nHandoff test update\n');r=run();assert.equal(r.status,0,r.stderr+'\n'+r.stdout);assert.notEqual(sha(latest),first);assert.equal(fs.readFileSync(backup,'utf8'),'manual backup untouched');
   const last=sha(latest);fs.writeFileSync(path.join(root,'src','Root.tsx'),'broken source');r=run();assert.notEqual(r.status,0);assert.equal(sha(latest),last);assert.notEqual(entrySignature(await masterEntries(root)),before);
   assert.deepEqual(fs.readdirSync(path.join(out,'Master')).sort(),['CHATGPT-LATEST.zip','manual-backup.zip']);
  }finally{if(old===undefined)delete process.env.NODE_PATH;else process.env.NODE_PATH=old}
 }finally{fs.rmSync(temp,{recursive:true,force:true})}
});
