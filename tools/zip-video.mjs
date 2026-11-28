#!/usr/bin/env node
/** ZIP native Node streaming: satu proses, satu sesi input, tanpa PowerShell/WinRAR. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline/promises';
import {ROOT,readCatalog} from './menu-helper.mjs';
import {ensureExportDirs,availableFile,timestamp} from './export-paths.mjs';
import {collectEntries,createZip,progressLogger} from './zip-core.mjs';
import {inspectRelease} from './check-release.mjs';
import {createPreflightLog} from './studio-preflight.mjs';
import {masterSources,masterEntries,entrySignature,ignoreNames,ignoreRelative} from './master-export-inputs.mjs';
import {randomUUID} from 'node:crypto';

const IGNORE=ignoreNames;
const controller=new AbortController();
process.on('SIGINT',()=>{console.error('\n[ZIP] Permintaan batal diterima, membersihkan file sementara...');controller.abort()});
const report=progressLogger();
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const exportDirs=()=>ensureExportDirs();
async function pack(sources,out,{lean=false}={}){
  const entries=await collectEntries(sources,{ignoreNames:IGNORE,ignoreRelative:name=>ignoreRelative(name,lean)});
  console.log(`[ZIP] Menyiapkan ${entries.length} entri tanpa memuat seluruh file ke RAM.`);
  const result=await createZip(entries,out,{signal:controller.signal,onProgress:report});
  console.log(`\n[ZIP BERHASIL] ${result.out} (${(result.compressedBytes/1048576).toFixed(2)} MB)`);
  console.log(`[ZIP] ${result.files} entri | Hasil dapat diekstrak sebagai folder utuh.`);
  return result;
}
async function videoZip(video){
  assert(video.projectDir,'Video tidak berada dalam projects/. Jalankan npm run sync.');
  const origin=path.resolve(ROOT,video.projectDir);
  const projectRoot=path.join(ROOT,'projects')+path.sep;
  assert(origin.startsWith(projectRoot),'Path project di luar projects/: '+video.projectDir);
  assert(fs.existsSync(path.join(origin,'motiongraphic-video.json')),'Manifest video tidak ditemukan: '+video.slug);
  const out=availableFile(exportDirs().videos,`${video.slug}-editable-${timestamp()}`,'.zip');
  console.log(`\n[ZIP VIDEO] ${video.title} (${video.id})`);
  return pack([{absolute:origin,name:video.slug}],out);
}
// Default export is an independent, empty engine suitable for sharing with ChatGPT.
// It never mutates the user's active Master or projects.
async function engineOnlyZip(){
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-engine-export-'));
  const target=path.join(temp,'MotionGraphic-Studio');
  const copy=(rel)=>{
    const from=path.join(ROOT,rel),to=path.join(target,rel);
    if(!fs.existsSync(from))return;
    fs.mkdirSync(path.dirname(to),{recursive:true});
    fs.cpSync(from,to,{recursive:true,filter:(entry)=>{
      const part=path.relative(ROOT,entry).replaceAll('\\','/');
      const bits=part.split('/');
      if(bits.some(n=>IGNORE.has(n)))return false;
      if(part==='src/Root.tsx'||part==='library/.studio-generated-state.json')return false;
      if(fs.lstatSync(entry).isSymbolicLink())return false;
      return true;
    }});
  };
  try{
    for(const dir of ['src','tools','contracts','templates','docs'])copy(dir);
    for(const file of ['package.json','package-lock.json','tsconfig.json','.gitignore','README.md','CHATGPT-READ-FIRST.md','CHATGPT-HISTORY.md','PRODUCTION-RULES.md','AGENTS.md','public/README.txt','01-BUKA-STUDIO.bat','02-CEK-STUDIO.bat','03-STOP-STUDIO.bat','tests/engine-smoke.test.mjs'])copy(file);
    fs.mkdirSync(path.join(target,'projects'),{recursive:true});
    fs.mkdirSync(path.join(target,'library/masuk'),{recursive:true});
    const inbox='library/masuk/TARUH-ZIP-VIDEO-DI-SINI.txt';
    if(fs.existsSync(path.join(ROOT,inbox)))copy(inbox);
    fs.mkdirSync(path.join(target,'public'),{recursive:true});
    fs.writeFileSync(path.join(target,'library/catalog.json'),'{'+'"schemaVersion":1,"videos":[]'+'}\n');
    // Regenerate Root.tsx from the same sync code as the real Master.
    const sync=spawnSync(process.execPath,[path.join(target,'tools','sync-projects.mjs')],{cwd:target,encoding:'utf8',timeout:20000});
    if(sync.status!==0)throw Error('Engine kosong gagal registrasi: '+(sync.stderr||sync.stdout));
    // No generated backups or mirror is necessary in the distributed empty engine.
    fs.rmSync(path.join(target,'library/backups'),{recursive:true,force:true});
    // Engine-only export must not ship any generated-studio state from export-time sync.
    // On the destination PC, the first sync will safely create a fresh state for its projects.
    fs.rmSync(path.join(target,'library/.studio-generated-state.json'),{force:true});
    fs.rmSync(path.join(target,'public/videos'),{recursive:true,force:true});
    const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
    const out=availableFile(exportDirs().master,`MotionGraphic-Studio-ENGINE-ONLY-v${pkg.version}-${timestamp()}`,'.zip');
    console.log('\n[ZIP ENGINE ONLY] Tanpa projects/, backup historis, log, render, dan mirror; project aktif di PC tidak diubah.');
    return await pack([{absolute:target,name:'MotionGraphic-Studio'}],out,{lean:true});
  }finally{fs.rmSync(temp,{recursive:true,force:true})}
}
async function studioZip({full=false}={}){
  const sources=masterSources(ROOT);
  const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
  const out=availableFile(exportDirs().master,`MotionGraphic-Studio-${full?'FULL':'WITH-PROJECTS'}-v${pkg.version}-${timestamp()}`,'.zip');
  console.log(`\n[ZIP MASTER] Seluruh project disertakan. Backup historis ${full?'disertakan':'dikecualikan'} dari ZIP.`);
  return pack(sources,out,{lean:!full});
}
// Dedicated generated handoff only: prior manual/dated backups are never overwritten.
async function chatgptZip(){
 const before=entrySignature(await masterEntries(ROOT));
 const log=createPreflightLog('ChatGPT-export.log');
 log.run('Versi Master','check-release.mjs');log.staticChecks();
 const entries=await masterEntries(ROOT);
 assert(before===entrySignature(entries),'Source berubah selama validasi; ekspor ditunda.');
 const out=path.join(exportDirs().master,'CHATGPT-LATEST.zip');
 const pending=path.join(path.dirname(out),`.chatgpt-${randomUUID()}.zip`);
 try{
  await createZip(entries,pending,{signal:controller.signal});
  assert(before===entrySignature(await masterEntries(ROOT)),'Source berubah saat ekspor; ZIP lama dipertahankan.');
  if(fs.existsSync(out))assert(fs.lstatSync(out).isFile()&&!fs.lstatSync(out).isSymbolicLink(),'CHATGPT-LATEST.zip bukan file biasa.');
  try{fs.renameSync(pending,out)}catch(e){if(['EPERM','EBUSY','EACCES'].includes(e.code))e.transientHandoff=true;throw e;}
  console.log('[CHATGPT] ZIP terbaru siap: '+out);
 }finally{fs.rmSync(pending,{force:true});}
}
// Explicit diagnostic snapshot: no static gate bypass for normal handoff, no overwrite of valid ZIP.
async function diagnosticZip(){
 const sources=masterSources(ROOT),collect=()=>collectEntries(sources,{ignoreNames:IGNORE,ignoreRelative:n=>ignoreRelative(n,true)});
 const entries=await collect(),before=entrySignature(entries);
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-diagnostic-'));
 const out=availableFile(exportDirs().master,'CHATGPT-DIAGNOSTIC-'+timestamp(),'.zip');
 const pending=path.join(path.dirname(out),'.diagnostic-'+randomUUID()+'.zip');
 try{
  const log=createPreflightLog('ChatGPT-diagnostic.log');let validation='STATIC_PASS';
  try{log.run('Versi Master','check-release.mjs');log.staticChecks();}catch(e){validation='STATIC_FAIL: '+e.message;}
  assert(before===entrySignature(await collect()),'Source changed during diagnostic preflight');
  const marker=path.join(temp,'DIAGNOSTIC-NOT-PRODUCTION.json');fs.writeFileSync(marker,JSON.stringify({status:'DIAGNOSTIC_ONLY',validation,verification:'Source snapshot for repair. Not a valid production handoff or approval.'},null,2));
  const additions=await collectEntries([{absolute:marker,name:'MotionGraphic-Studio/DIAGNOSTIC-NOT-PRODUCTION.json'},{absolute:log.file,name:'MotionGraphic-Studio/diagnostic-static-report.txt'}]);
  await createZip([...entries,...additions],pending,{signal:controller.signal});
  assert(before===entrySignature(await collect()),'Source changed during diagnostic ZIP');
  // Hard-link publication is exclusive; never replace another archive.
  fs.linkSync(pending,out);console.log('[DIAGNOSTIC ONLY] '+out);
 }finally{fs.rmSync(pending,{force:true});fs.rmSync(temp,{recursive:true,force:true});}
}
function matchVideo(videos,input){return videos.find((v,i)=>input===String(i+1)||input===v.id||input===v.slug)}
function showVideos(videos){
  console.log('\nVIDEO TERSEDIA:');
  videos.forEach((v,i)=>console.log(`  ${i+1}. ${v.title} [${v.id}]`));
}
async function run(){
  const args=process.argv.slice(2);
  if(args.length===1&&args[0]==='--chatgpt')return chatgptZip();
  if(args.length===1&&args[0]==='--diagnostic')return diagnosticZip();
  if(args.includes('--studio')||args.includes('--master')){
    const release=inspectRelease(ROOT);assert(release.ok,'Versi release tidak konsisten: '+release.errors.join('; '));
    if(args.includes('--full'))return studioZip({full:true});
    if(args.includes('--with-projects'))return studioZip({full:false});
    return engineOnlyZip();
  }
  if(args.includes('--all')){
    for(const video of readCatalog().videos)await videoZip(video);
    return;
  }
  if(args.length){
    const videos=readCatalog().videos;
    const selected=matchVideo(videos,args[0]);
    assert(selected,'Video tidak dikenali: '+args[0]);
    return videoZip(selected);
  }
  if(!process.stdin.isTTY)throw Error('Untuk terminal noninteraktif gunakan npm run zip -- --studio / --all / IDVideo.');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  const ask=async prompt=>(await rl.question(prompt)).trim();
  try{
    console.log('\n=== ZIP OTOMATIS — PILIH JENIS EXPORT ===');
    console.log('  1. Satu video (ZIP editable)');
    console.log('  2. Semua video (ZIP masing-masing)');
    console.log('  3. Master Engine Only (tanpa project, direkomendasikan)');
    console.log('  4. Master + semua project (tanpa backup historis)');
    console.log('  5. Backup Master lengkap + seluruh riwayat');
    const choice=await ask('\nPilih 1/2/3/4/5 (Enter untuk batal): ');
    if(!choice)return console.log('[ZIP] Dibatalkan.');
    if(choice==='3')return await engineOnlyZip();
    if(choice==='4')return await studioZip({full:false});
    if(choice==='5')return await studioZip({full:true});
    const videos=readCatalog().videos;
    assert(videos.length,'Belum ada video aktif.');
    if(choice==='2'){for(const video of videos)await videoZip(video);return}
    assert(choice==='1','Pilihan tidak valid: '+choice);
    showVideos(videos);
    const id=await ask('\nPilih nomor / ID video (Enter untuk batal): ');
    if(!id)return console.log('[ZIP] Dibatalkan.');
    const selected=matchVideo(videos,id);
    assert(selected,'Video tidak dikenali: '+id);
    await videoZip(selected);
  }finally{rl.close()}
}
try{await run()}catch(e){console.error('[ERROR ZIP] '+(e?.message||e));process.exitCode=e?.transientHandoff?75:1}
