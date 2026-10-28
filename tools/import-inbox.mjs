#!/usr/bin/env node
/** Drop ZIP di library/masuk; jalankan saat startup. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const inbox=path.join(root,'library/masuk'), archive=path.join(root,'library/sudah-diimpor'), quarantine=path.join(root,'library/gagal-import');
for(const d of [inbox,archive,quarantine])fs.mkdirSync(d,{recursive:true});
const items=fs.readdirSync(inbox,{withFileTypes:true}).filter(e=>e.isFile()&&e.name.toLowerCase().endsWith('.zip')).sort((a,b)=>a.name.localeCompare(b.name));
if(!items.length){console.log('[AUTO IMPORT] Tidak ada video baru.');process.exit(0)}
let success=0,failed=0;
function uniqueLocation(folder,name){const parsed=path.parse(name);let dest=path.join(folder,name),n=2;while(fs.existsSync(dest))dest=path.join(folder,`${parsed.name}-${n++}${parsed.ext}`);return dest}
function moveSafe(file,dest){try{fs.renameSync(file,dest)}catch{fs.copyFileSync(file,dest);fs.unlinkSync(file)}}
for(const i of items){
 const file=path.join(inbox,i.name);
 console.log('\n[AUTO IMPORT] '+i.name);
 const result=spawnSync(process.execPath,[path.join(root,'tools/import-video.mjs'),file],{cwd:root,stdio:'inherit'});
 if(result.status!==0){
  failed++;console.error('[GAGAL] ZIP dipindah ke library/gagal-import agar startup berikutnya tidak mengulang kesalahan.');
  try{const dest=uniqueLocation(quarantine,i.name);moveSafe(file,dest);fs.writeFileSync(dest+'.INFO.txt','ZIP gagal diimpor. Periksa log saat startup; perbaiki manifest/source paket lalu kembalikan ZIP ke library/masuk.\n')}catch(err){console.warn('[PERINGATAN] Gagal memindahkan ZIP ke folder gagal-import: '+err.message)}
  continue
 }
 try{
  const dest=uniqueLocation(archive,i.name);moveSafe(file,dest)
  success++;
 }catch(err){failed++;console.warn('[PERINGATAN] Import berhasil tetapi ZIP belum terarsip: '+err.message)}
}
console.log(`\n[AUTO IMPORT] ${success} selesai, ${failed} bermasalah. Video lama aman.`);
if(failed)process.exitCode=1;
