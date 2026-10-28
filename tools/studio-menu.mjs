#!/usr/bin/env node
/** Pintu masuk satu menu untuk operasi Studio sehari-hari. */
import {createInterface} from 'node:readline/promises';
import {spawnSync} from 'node:child_process';
import {ROOT} from './menu-helper.mjs';
if(!process.stdin.isTTY){console.error('Jalankan npm run menu di terminal interaktif.');process.exit(1)}
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
async function ask(q){const rl=createInterface({input:process.stdin,output:process.stdout});try{return (await rl.question(q)).trim()}finally{rl.close()}}
while(true){
 console.log('\n======== MOTIONGRAPHIC STUDIO — MENU ========');
 for(const [num,[label]] of Object.entries(choices))console.log(` ${num.padStart(2)}. ${label}`);
 console.log('  0. Keluar');
 const value=await ask('\nPilih menu: ');
 if(value==='0'||value===''){console.log('Selesai.');break}
 if(!choices[value]){console.log('[INFO] Menu tidak dikenal.');continue}
 const [label,script]=choices[value];console.log('\n[MENJALANKAN] '+label+'\n');
 const npm=process.platform==='win32'?'npm.cmd':'npm';
 const result=spawnSync(npm,['run',script],{cwd:ROOT,stdio:'inherit',shell:process.platform==='win32'});
 if(result.status!==0)console.error(`[MENU] ${label} selesai dengan error (exit ${result.status??'unknown'}).`);
 // npm run dev menahan terminal selama Studio terbuka. Setelah ditutup kembali ke menu.
}
