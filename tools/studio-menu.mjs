#!/usr/bin/env node
/**
 * Menu interaktif satu-proses: SEMUA input diterima oleh proses ini.
 * Anak proses tidak pernah membaca stdin; penting untuk npm.cmd + Git Bash/MinTTY.
 * Pemanggilan script Node secara langsung juga menghindari shell:true / DEP0190.
 * Remotion Studio tetap SATU-SATUNYA editor; menu hanya utilitas CLI.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog} from './menu-helper.mjs';

if(!process.stdin.isTTY){
  console.error('[MENU] Gunakan terminal interaktif untuk npm run menu. Untuk otomatisasi gunakan npm run zip -- --all / --studio / IDVideo.');
  process.exit(1);
}

const menuItems=[
  ['1','Buka Remotion Studio'],
  ['2','Tambah folder video'],
  ['3','Rename project / judul'],
  ['4','Daftar video'],
  ['5','Periksa dan sinkronkan'],
  ['6','Render MP4'],
  ['7','Buat ZIP video / Master'],
  ['8','Arsipkan video (aman)'],
  ['9','Pulihkan video'],
  ['10','Cek masalah folder (tanpa perubahan)'],
];
// Satu sesi input untuk semua menu: tidak berganti readline antar proses.
const rl=createInterface({input:process.stdin,output:process.stdout});
const ask=async q=>(await rl.question(q)).trim();
const tool=f=>path.join(ROOT,'tools',f);

function runScript(filename,args=[]){
  console.log(`\n[MENJALANKAN] ${filename.replace(/\.mjs$/,'')}\n`);
  // Jangan berikan stdin ke child. Tidak ada prompt bersarang.
  const result=spawnSync(process.execPath,[tool(filename),...args],{
    cwd:ROOT,stdio:['ignore','inherit','inherit'],windowsHide:false,
  });
  if(result.error)console.error('[MENU] Gagal menjalankan proses: '+result.error.message);
  else if(result.signal)console.error('[MENU] Proses dihentikan: '+result.signal);
  else if(result.status!==0)console.error(`[MENU] Proses selesai dengan error (kode ${result.status??'unknown'}).`);
  return !result.error&&!result.signal&&result.status===0;
}
function catalogVideos(){
  const videos=readCatalog().videos??[];
  if(!videos.length)console.log('\n[MENU] Belum ada video aktif.');
  return videos;
}
async function choose(entries,header,display,matches){
  if(!entries.length){console.log('[MENU] Tidak ada data untuk dipilih.');return null}
  console.log(`\n${header}`);
  entries.forEach((v,i)=>console.log(`  ${i+1}. ${display(v)}`));
  const choice=await ask('\nPilih nomor / ID (Enter = kembali): ');
  if(!choice){console.log('[MENU] Kembali tanpa perubahan.');return null}
  const found=entries.find((v,i)=>choice===String(i+1)||matches(v).includes(choice));
  if(!found)console.log('[MENU] Pilihan tidak ditemukan: '+choice);
  return found??null;
}
const chooseVideo=()=>choose(catalogVideos(),'VIDEO TERSEDIA:',v=>`${v.title} [${v.id}]`,v=>[v.id,v.slug]);

function currentProjects(){
  const directory=path.join(ROOT,'projects');
  return fs.readdirSync(directory,{withFileTypes:true})
    .filter(d=>d.isDirectory()&&!d.name.startsWith('.')&&!d.name.startsWith('_'))
    .flatMap(d=>{
      const file=path.join(directory,d.name,'motiongraphic-video.json');
      if(!fs.existsSync(file))return [];
      const m=JSON.parse(fs.readFileSync(file,'utf8'));
      return [{...m,folder:d.name}];
    });
}
async function doZip(){
  console.log('\n=== ZIP OTOMATIS — PILIH JENIS EXPORT ===');
  console.log('  1. Satu video (ZIP editable)');
  console.log('  2. Semua video (ZIP masing-masing)');
  console.log('  3. MASTER STUDIO lengkap (di luar folder Studio)');
  const mode=await ask('\nPilih 1/2/3 (Enter = kembali): ');
  if(!mode)return console.log('[MENU] Ekspor dibatalkan tanpa perubahan.');
  if(mode==='1'){
    const video=await chooseVideo();
    if(video)runScript('zip-video.mjs',[video.id]);
  }else if(mode==='2'){
    if(catalogVideos().length)runScript('zip-video.mjs',['--all']);
  }else if(mode==='3')runScript('zip-video.mjs',['--studio']);
  else console.log('[MENU] Pilihan ekspor tidak dikenal: '+mode);
}
async function doRender(){
  const video=await chooseVideo();
  if(!video)return;
  console.log(`[MENU] Render dipilih: ${video.title} [${video.id}]`);
  if(runScript('prepare-studio.mjs'))runScript('render-menu.mjs',[video.id]);
}
async function doRename(){
  const project=await choose(currentProjects(),'PROJECT TERSEDIA:',p=>`${p.title} [${p.id}] (projects/${p.folder})`,p=>[p.id,p.slug,p.folder]);
  if(!project)return;
  console.log('\n  1. Ganti judul saja (paling aman)');
  console.log('  2. Ganti judul + slug + folder + path aset');
  console.log('  3. Sesuaikan slug ke nama folder saat ini');
  console.log('  4. Sesuaikan nama folder ke slug saat ini');
  const mode=await ask('Pilih 1/2/3/4 (Enter = kembali): ');
  if(!mode)return console.log('[MENU] Rename dibatalkan.');
  if(!['1','2','3','4'].includes(mode))return console.log('[MENU] Mode tidak valid.');
  let args=[project.id];
  if(mode==='1'||mode==='2'){
    const title=await ask('Judul baru (Enter = kembali): ');
    if(!title)return console.log('[MENU] Rename dibatalkan.');
    if(mode==='1')args.push('--title-only','--title',title);
    else args.push('--name',title);
  }else args.push(mode==='3'?'--adopt-folder':'--repair');
  console.log(`\n[MENU] Project: ${project.title} [${project.id}]`);
  if(mode==='2')console.log('[PERHATIAN] Mode ini juga mengubah slug, nama folder, dan referensi aset project TERPILIH.');
  const confirmation=await ask('Ketik RENAME untuk melanjutkan (selain itu batal): ');
  if(confirmation!=='RENAME')return console.log('[MENU] Rename dibatalkan; tidak ada perubahan.');
  runScript('rename-video.mjs',[...args,'--yes']);
}
async function doDelete(){
  const video=await chooseVideo();
  if(!video)return;
  console.log(`\n[MENU] Akan mengarsipkan ${video.title} [${video.id}] ke library/sampah.`);
  const confirmation=await ask('Ketik HAPUS untuk konfirmasi pengarsipan (selain itu batal): ');
  if(confirmation!=='HAPUS')return console.log('[MENU] Pengarsipan dibatalkan.');
  runScript('delete-video.mjs',[video.id,'--confirmed']);
}
async function doRestore(){
  const directory=path.join(ROOT,'library','sampah');
  if(!fs.existsSync(directory))return console.log('[MENU] Arsip belum tersedia.');
  const entries=fs.readdirSync(directory,{withFileTypes:true})
    .filter(d=>d.isDirectory()&&fs.existsSync(path.join(directory,d.name,'restore.json')))
    .flatMap(d=>{
      try{
        const data=JSON.parse(fs.readFileSync(path.join(directory,d.name,'restore.json'),'utf8'));
        return [{name:d.name,data}];
      }catch(e){console.warn('[MENU] Arsip tidak terbaca: '+d.name);return []}
    });
  const selected=await choose(entries,'VIDEO DALAM ARSIP:',e=>`${e.data.video?.title??'(tanpa judul)'} [${e.data.video?.id??'?'}] (${e.name})`,e=>[e.name]);
  if(!selected)return;
  runScript('restore-video.mjs',[selected.name]);
}
async function doAddFolder(){
  const label=process.platform==='win32'
    ?'Masukkan path folder add-on, atau Enter untuk memilih dari jendela Windows: '
    :'Masukkan path lengkap folder add-on (Enter = kembali): ';
  const folder=await ask('\n'+label);
  if(folder)runScript('add-folder.mjs',[folder.replace(/^["']|["']$/g,'')]);
  else if(process.platform==='win32')runScript('add-folder.mjs',['--dialog-only']);
  else console.log('[MENU] Import dibatalkan.');
}
async function handle(choice){
  switch(choice){
    case '1': if(runScript('prepare-studio.mjs'))runScript('start-studio.mjs');break;
    case '2': await doAddFolder();break;
    case '3': await doRename();break;
    case '4': runScript('list-videos.mjs');break;
    case '5': if(runScript('sync-projects.mjs'))runScript('validate-library.mjs');break;
    case '6': await doRender();break;
    case '7': await doZip();break;
    case '8': await doDelete();break;
    case '9': await doRestore();break;
    case '10': runScript('doctor.mjs');break;
    default: console.log('[MENU] Pilihan tidak dikenal.');
  }
}
try{
  while(true){
    console.log('\n======== MOTIONGRAPHIC STUDIO — MENU ========');
    for(const [num,label] of menuItems)console.log(` ${num.padStart(2)}. ${label}`);
    console.log('  0. Keluar');
    const choice=await ask('\nPilih menu: ');
    if(!choice||choice==='0'){console.log('Selesai.');break}
    try{await handle(choice)}catch(e){console.error('[MENU] '+(e?.message||e));}
  }
}catch(e){
  if(e?.code!=='ERR_USE_AFTER_CLOSE')console.error('[MENU] '+(e?.message||e));
  process.exitCode=1;
}finally{rl.close()}
