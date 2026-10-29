#!/usr/bin/env node
/** Audit ringan tanpa mengubah file. Bermanfaat jika npm run dev/sync tidak berjalan. */
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from './menu-helper.mjs';
const dir=path.join(ROOT,'projects');
let problems=0,seen=new Set(),count=0;
console.log('\n=== MOTIONGRAPHIC STUDIO — DOCTOR (READ ONLY) ===');
for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
 if(!ent.isDirectory()||ent.name.startsWith('_')||ent.name.startsWith('.'))continue;
 const file=path.join(dir,ent.name,'motiongraphic-video.json');
 if(!fs.existsSync(file)){console.error(`[ERROR] projects/${ent.name} tidak punya motiongraphic-video.json`);problems++;continue}
 try{
  const m=JSON.parse(fs.readFileSync(file,'utf8'));count++;
  if(m.slug!==ent.name){console.error(`[NAMA TIDAK COCOK] ${ent.name} → slug manifest: ${m.slug}`);console.log(`  Pilih: npm run rename -- ${m.id} --adopt-folder  (ikuti nama folder)`);console.log(`     atau npm run rename -- ${m.id} --repair        (ikuti slug manifest)`);problems++}
  if(seen.has(m.id)){console.error('[ID GANDA] '+m.id);problems++}seen.add(m.id);
  if(!fs.existsSync(path.join(dir,ent.name,m.entry||''))){console.error('[ENTRY HILANG] '+m.id+': '+m.entry);problems++}
 }catch(e){console.error(`[MANIFEST RUSAK] ${ent.name}: ${e.message}`);problems++}
}
console.log(`\n${count} project terbaca; ${problems} masalah.`);
if(problems){console.log('Perbaiki masalah di atas, lalu jalankan npm run sync. Tidak ada file yang diubah.');process.exitCode=1}
else console.log('Struktur folder sesuai. Jalankan npm run check untuk validasi aset/TypeScript.');
