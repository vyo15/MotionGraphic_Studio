#!/usr/bin/env node
/**
 * Pratinjau/pembersihan artefak sistem yang ditentukan secara eksplisit.
 * Tidak pernah menyentuh projects/, root generated state, catalog, atau rendered MP4.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=new Set(process.argv.slice(2));
const usage='Pakai: npm run clean [-- --apply [--logs] [--history]]';
if([...args].some(a=>!['--apply','--history','--logs','--help'].includes(a))){console.error(usage);process.exit(2)}
if(args.has('--help')){console.log(usage+'\nDefault hanya pratinjau; --logs menghapus file .log/.tmp di root/logs; --history mengizinkan hapus isi library/backups/ setelah --apply.');process.exit(0)}
if(args.has('--history')&&!args.has('--apply'))console.log('[CLEAN] --history tanpa --apply hanya menampilkan daftar.');
const apply=args.has('--apply');
const oldDocs=[
 'AUDIT-REMOTION-ONLY-20261104.md',
 'PANDUAN-AUDIO-TIMELINE.md',
 'STANDAR-EDITABLE-STUDIO.md',
 'STANDAR-EDITABLE-STUDIO-v3.md',
 'INSTALL-SEMUA-SKILL-REMOTION.bat',
 'docs/CLEANUP-ARTEFAK-LEGACY.md',
 'docs/SISTEM-GUARDRAILS-DAN-CLEANUP.md',
 'docs/LAPORAN-IMPLEMENTASI-ABC-20261120.md',
 'docs/PASANG-PATCH-SISTEM-ABC.md',
];
function fileList(dir){
 if(!fs.existsSync(dir))return [];
 if(fs.lstatSync(dir).isSymbolicLink())throw Error('Backup folder symlink tidak diizinkan: '+dir);
 const result=[];
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const loc=path.join(dir,entry.name);
  if(entry.isSymbolicLink())throw Error('Tidak menerima symlink: '+path.relative(ROOT,loc));
  if(entry.isDirectory())result.push(...fileList(loc));
  else if(entry.isFile())result.push(loc);
 }
 return result;
}
const docPaths=oldDocs.map(p=>path.join(ROOT,p)).filter(f=>fs.existsSync(f));
let historyPaths=[];
if(args.has('--history'))historyPaths=fileList(path.join(ROOT,'library','backups'));
// Logs may be removed only from the Master root or its dedicated logs/ folder.
// Never touch projects/, exports/, render output, or external backup log folders.
const logPaths=[];
if(args.has('--logs'))for(const dir of [ROOT,path.join(ROOT,'logs')]){
 if(!fs.existsSync(dir))continue;
 if(fs.lstatSync(dir).isSymbolicLink())throw Error('Symlink log directory dilarang: '+dir);
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  if(e.isSymbolicLink())throw Error('Symlink tidak diizinkan di folder log: '+e.name);
  if(e.isFile() && /\.(?:log|tmp|partial)$/i.test(e.name))logPaths.push(path.join(dir,e.name));
 }
}
const all=[...docPaths,...historyPaths,...logPaths];
const bytes=all.reduce((s,f)=>s+fs.statSync(f).size,0);
console.log(`\n[CLEAN ${apply?'APPLY':'PREVIEW'}] ${all.length} file, ${(bytes/1024).toFixed(1)} KiB`);
for(const f of all)console.log(`  ${apply?'HAPUS':'KANDIDAT'} ${path.relative(ROOT,f).replaceAll('\\','/')}`);
if(!apply){console.log('[CLEAN] Tidak ada file diubah. Untuk dokumen usang: npm run clean -- --apply');console.log('[CLEAN] Untuk log sistem saja: npm run clean -- --apply --logs');console.log('[CLEAN] Untuk juga menghapus backup historis: npm run clean -- --apply --history (backup Master dahulu).');process.exit(0)}
for(const f of all){
 const rel=path.relative(ROOT,f).replaceAll('\\','/');
 // Defensive allowlist: no creative project source, generated state, current registries or outputs.
 if(rel.startsWith('projects/')||rel.startsWith('public/')||rel.startsWith('src/')||rel.startsWith('contracts/')||rel.startsWith('templates/')||rel.startsWith('tests/'))throw Error('Path dilarang: '+rel);
 if(!oldDocs.includes(rel) && !(args.has('--history')&&rel.startsWith('library/backups/')) && !(args.has('--logs')&&logPaths.includes(f)))throw Error('Tidak masuk daftar aman: '+rel);
 if(fs.lstatSync(f).isSymbolicLink())throw Error('Symlink dilarang: '+rel);
 fs.unlinkSync(f);
}
console.log(`[CLEAN] Berhasil: ${all.length} file sistem dihapus. Tidak menyentuh projects/ atau katalog.`);
