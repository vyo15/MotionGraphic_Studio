#!/usr/bin/env node
/** ZIP native Node streaming: satu proses, satu sesi input, tanpa PowerShell/WinRAR. */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {ROOT,readCatalog} from './menu-helper.mjs';
import {ensureExportDirs,availableFile,timestamp} from './export-paths.mjs';
import {collectEntries,createZip,progressLogger} from './zip-core.mjs';

const IGNORE=new Set(['node_modules','.git','.cache','dist','build','coverage','.next','tmp','temp','.remotion','out']);
const controller=new AbortController();
process.on('SIGINT',()=>{console.error('\n[ZIP] Permintaan batal diterima, membersihkan file sementara...');controller.abort()});
const report=progressLogger();
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const exportDirs=()=>ensureExportDirs();
async function pack(sources,out){
  const entries=await collectEntries(sources,{ignoreNames:IGNORE});
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
async function studioZip(){
  const dirs=['projects','src','tools','library','.agents','.github','tests'];
  const files=['package.json','package-lock.json','tsconfig.json','.gitignore','README.md','PANDUAN-EDIT-ASSET.md','PROMPT-PROYEK-CHATGPT.md','PRODUCTION-RULES.md','PANDUAN-GITHUB.md','PANDUAN-RENAME.md','AGENTS.md','STANDAR-EDITABLE-STUDIO.md','STANDAR-EDITABLE-STUDIO-v3.md','PANDUAN-REMOTION-STUDIO.md','PANDUAN-AUDIO-TIMELINE.md','STATUS-VALIDASI-v1.8.1.md','ALUR-KERJA-REMOTION-CONCAT.md','AUDIT-CLEANUP-MASTER-v1.8.1.md','AUDIT-FINAL-v1.8.1.md','PANDUAN-HANDOFF-CONCAT.md','PANDUAN-LOG-CONCAT.md','LAPORAN-PERBAIKAN-ZIP-v1.8.2.md','public/README.txt','01-BUKA-STUDIO.bat','02-CEK-STUDIO.bat','03-STOP-STUDIO.bat','INSTALL-SEMUA-SKILL-REMOTION.bat'];
  const sources=[...dirs,...files].filter(name=>fs.existsSync(path.join(ROOT,name))).map(name=>({absolute:path.join(ROOT,name),name:'MotionGraphic-Studio/'+name}));
  const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
  const out=availableFile(exportDirs().master,`MotionGraphic-Studio-Master-v${pkg.version}-${timestamp()}`,'.zip');
  console.log('\n[ZIP MASTER] Mengemas seluruh project, source, konfigurasi, arsip, dan dokumen.');
  const result=await pack(sources,out);
  console.log('[MASTER] Lokasi: '+exportDirs().root+' (di LUAR folder Master).');
  console.log('[MASTER] Tidak menyertakan node_modules, render, cache, dan mirror aset.');
  return result;
}
function matchVideo(videos,input){return videos.find((v,i)=>input===String(i+1)||input===v.id||input===v.slug)}
function showVideos(videos){
  console.log('\nVIDEO TERSEDIA:');
  videos.forEach((v,i)=>console.log(`  ${i+1}. ${v.title} [${v.id}]`));
}
async function run(){
  const args=process.argv.slice(2);
  if(args.includes('--studio')||args.includes('--master'))return studioZip();
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
    console.log('  3. MASTER STUDIO lengkap');
    const choice=await ask('\nPilih 1/2/3 (Enter untuk batal): ');
    if(!choice)return console.log('[ZIP] Dibatalkan.');
    if(choice==='3')return await studioZip();
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
try{await run()}catch(e){console.error('[ERROR ZIP] '+(e?.message||e));process.exitCode=1}
