#!/usr/bin/env node
/** One-time non-destructive migration for the 2 projects bundled in Master v1.8.1.
 * Only inserts segments and an optional sidebar folder name. Never replaces defaultProps.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const recipes=[
 {slug:'ip-address',id:'IPAddressReels',duration:720,segments:[
  ['IPAddress-01-Hook','01 - Opening',0,90],
  ['IPAddress-02-AlamatRumah','02 - Alamat Rumah',90,138],
  ['IPAddress-03-IPv4','03 - Empat Angka',228,138],
  ['IPAddress-04-Router','04 - Router',366,156],
  ['IPAddress-05-CTA','05 - Rangkuman dan CTA',522,198],
 ]},
 {slug:'windows-hacks-5-shortcut-lengkap',id:'WindowsHacks5ShortcutLengkap',duration:2205,folder:'Windows-Hacks-5-Shortcut',segments:[
  ['WinHacks-00-Hook','00 - Opening Hook',0,240],
  ['WinHacks-01-CtrlShiftT','01 - Pulihkan Tab',240,285],
  ['WinHacks-02-TaskManager','02 - Task Manager',525,330],
  ['WinHacks-03-Screenshot','03 - Screenshot',855,330],
  ['WinHacks-04-FileExplorer','04 - File Explorer',1185,330],
  ['WinHacks-05-FolderBonus','05 - Folder + Bonus',1515,570],
  ['WinHacks-06-CTA','06 - CTA',2085,120],
 ]},
];
const tag=new Date().toISOString().replace(/[:.]/g,'-');
const backupDir=path.join(root,'library','backups','segment-folders-'+tag);
let count=0;
for(const r of recipes){
 const file=path.join(root,'projects',r.slug,'motiongraphic-video.json');
 if(!fs.existsSync(file)){
  console.log(`[LEWATI] ${r.slug}: tidak ada di Master ini`);continue;
 }
 const original=fs.readFileSync(file,'utf8');
 const manifest=JSON.parse(original);
 if(manifest.id!==r.id||manifest.durationInFrames!==r.duration){
  throw new Error(`${r.slug}: ID/durasi berbeda dari Master v1.8.1. Tidak diubah agar scene tidak terpotong.`);
 }
 if(manifest.segments?.length){
  console.log(`[AMAN] ${r.slug}: segments sudah ada; tidak diubah`);
  continue;
 }
 const entries=r.segments.map(([id,title,startFrame,durationInFrames])=>({id,title,startFrame,durationInFrames}));
 let frame=0;
 for(const seg of entries){if(seg.startFrame!==frame)throw new Error('Urutan tidak valid: '+seg.id);frame+=seg.durationInFrames;}
 if(frame!==r.duration)throw new Error('Total durasi tidak cocok: '+r.slug);
 manifest.segments=entries;
 if(r.folder&&!manifest.studioFolderName)manifest.studioFolderName=r.folder;
 fs.mkdirSync(backupDir,{recursive:true});
 fs.writeFileSync(path.join(backupDir,r.slug+'.json'),original);
 const tmp=file+'.'+process.pid+'.tmp';
 try{fs.writeFileSync(tmp,JSON.stringify(manifest,null,2)+'\n');fs.renameSync(tmp,file)}
 finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp)}
 console.log(`[OK] ${r.slug}: ${entries.length} segmen ditambahkan; Props/aset tidak berubah`);
 count++;
}
console.log(`[SELESAI] ${count} manifest diperbarui. ${count?'Backup: '+backupDir:'Tidak perlu perubahan.'}`);
console.log('Berikutnya jalankan: npm run sync');
