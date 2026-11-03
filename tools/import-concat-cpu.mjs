#!/usr/bin/env node
// Explicitly import only a user-downloaded artifact from our GitHub Actions CPU build.
import {existsSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const master=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let input=process.argv.slice(2).filter(x=>x!=='--').join(' ').trim();
if(!input){
  const downloads=path.join(os.homedir(),'Downloads');
  const choices=existsSync(downloads)?readdirSync(downloads)
    .filter(n=>/^Concat-CPU-Portable-Windows-x64(?:\s*\(\d+\))?\.zip$/i.test(n))
    .map(n=>path.join(downloads,n)).sort((a,b)=>statSync(b).mtimeMs-statSync(a).mtimeMs):[];
  input=choices[0]||'';
  if(input)console.log(`[DITEMUKAN] Paket di Downloads: ${input}`);
}
if(!input){
  console.error('[BELUM ADA] File CPU portable belum diunduh.');
  console.error('1. Push patch ke GitHub; buka Actions > Build Concat CPU-only (Windows portable) > Run workflow.');
  console.error('2. Setelah build sukses, download artifact Concat-CPU-Portable-Windows-x64.');
  console.error('3. Jalankan npm run concat:cpu:import (otomatis cari Downloads) atau npm run concat:cpu:import -- "C:\\path\\file.zip".');
  process.exit(1);
}
if(!existsSync(input)){
 console.error(`[TIDAK ADA] ${input}`); process.exit(1);
}
if(process.platform!=='win32'){
 console.error('[WINDOWS] Import artifact CPU Windows hanya dapat dijalankan di Windows.'); process.exit(1);
}
const ps=spawnSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',path.join(master,'tools','concat-manager.ps1'),'-Action','import-cpu','-Package',path.resolve(input)],{cwd:master,stdio:'inherit'});
if(ps.error){console.error('[GAGAL]',ps.error.message);process.exit(1)}
process.exit(ps.status??1);
