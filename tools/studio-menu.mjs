#!/usr/bin/env node
/**
 * Menu tunggal Master. Semua prompt interaktif dilakukan di proses ini.
 * Render menerima ID sebagai argumen, sehingga tidak meminta input kedua di
 * proses npm.cmd (penting untuk Git Bash / MinTTY pada Windows).
 */
import {createInterface} from 'node:readline/promises';
import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog} from './menu-helper.mjs';

if(!process.stdin.isTTY){
 console.error('Jalankan npm run menu di terminal interaktif.');
 process.exit(1);
}
const choices={
 '1':['Buka Remotion Studio','dev'],
 '2':['Tambah folder video','addfolder'],
 '3':['Rename project / judul','rename'],
 '4':['Daftar video','list'],
 '5':['Periksa dan sinkronkan','check'],
 '6':['Render MP4','render'],
 '7':['Buat ZIP video / Master','zip'],
 '8':['Arsipkan video (aman)','delete'],
 '9':['Pulihkan video','restore'],
 '10':['Cek masalah folder (tanpa perubahan)','doctor'],
 '11':['Buka Easy Editor (pengaturan teks / layer)','edit'],
};

async function ask(q){
 const rl=createInterface({input:process.stdin,output:process.stdout});
 try{return (await rl.question(q)).trim()}
 finally{rl.close()}
}

async function chooseRenderTarget(){
 const videos=readCatalog().videos??[];
 if(!videos.length){console.log('[RENDER] Belum ada video yang terdaftar.');return null}
 console.log('\nVIDEO TERSEDIA:');
 videos.forEach((v,i)=>console.log(`  ${i+1}. ${v.title}  [${v.id}]`));
 const answer=await ask('\nPilih nomor / ID video (Enter untuk kembali): ');
 if(!answer){console.log('[MENU] Render dibatalkan.');return null}
 const video=videos.find((v,i)=>answer===String(i+1)||answer===v.id||answer===v.slug);
 if(!video){console.log(`[MENU] Pilihan '${answer}' tidak dikenal; render tidak dimulai.`);return null}
 return video;
}

while(true){
 console.log('\n======== MOTIONGRAPHIC STUDIO — MENU ========');
 for(const [num,[label]] of Object.entries(choices))console.log(` ${num.padStart(2)}. ${label}`);
 console.log('  0. Keluar');
 const value=await ask('\nPilih menu: ');
 if(value==='0'||value===''){console.log('Selesai.');break}
 if(!choices[value]){console.log('[INFO] Menu tidak dikenal.');continue}
 const [label,script]=choices[value];
 let extra=[];
 if(value==='6'){
  try{
   const target=await chooseRenderTarget();
   if(!target)continue;
   // npm run render -- <id> : 1 input terminal saja, sebelum npm.cmd dibuat.
   extra=['--',target.id];
   console.log(`\n[MENU] Video dipilih: ${target.title}`);
   console.log(`[MENU] Komposisi: ${target.id}`);
   console.log('[MENU] Memulai pemeriksaan dan renderer. Progress menyusul setelah persiapan.');
  }catch(err){console.error('[MENU] Gagal membaca daftar video:',err.message);continue}
 }
 console.log(`\n[MENJALANKAN] ${label}\n`);
 const npm=process.platform==='win32'?'npm.cmd':'npm';
 const result=spawnSync(npm,['run',script,...extra],{cwd:ROOT,stdio:'inherit',shell:process.platform==='win32'});
 if(result.error)console.error(`[MENU] Proses gagal dibuat: ${result.error.message}`);
 if(result.signal)console.error(`[MENU] Proses dihentikan oleh sinyal ${result.signal}`);
 if(result.status!==0)console.error(`[MENU] ${label} selesai dengan error (exit ${result.status??'unknown'}).`);
 // npm run dev menahan terminal selama Studio terbuka. Setelah ditutup kembali ke menu.
}
