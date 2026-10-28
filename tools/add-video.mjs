#!/usr/bin/env node
/**
 * Easy add-on ZIP import without manually navigating library/masuk.
 * Supports: npm run add -- "C:\\path\\video.zip"
 * Windows with no argument: native file chooser (PowerShell OpenFileDialog).
 * Fallback: paste the absolute ZIP path in terminal.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline/promises';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INBOX=path.join(ROOT, 'library', 'masuk');
fs.mkdirSync(INBOX, {recursive: true});

function chooseOnWindows() {
  if(process.platform!=='win32') return '';
  const cmd=[
    'Add-Type -AssemblyName System.Windows.Forms',
    '$dlg=New-Object System.Windows.Forms.OpenFileDialog',
    "$dlg.Title='Pilih ZIP add-on MotionGraphic (bukan ZIP full Studio)'",
    "$dlg.Filter='ZIP project (*.zip)|*.zip'",
    '$dlg.Multiselect=$false',
    'if($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){[Console]::Write($dlg.FileName)}'
  ].join('; ');
  const r=spawnSync('powershell.exe',['-NoProfile','-STA','-Command',cmd],{encoding:'utf8',timeout:120000,windowsHide:false});
  if(r.status!==0) return '';
  return (r.stdout||'').trim();
}
async function getInput() {
  const args=process.argv.slice(2);
  if(args.length) return args.join(' ').trim();
  const chosen=chooseOnWindows();
  if(chosen) return chosen;
  if(!process.stdin.isTTY) throw new Error('Berikan path ZIP: npm run add -- "C:\\folder\\video.zip"');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try {return (await rl.question('Paste lokasi lengkap ZIP add-on (Enter untuk batal): ')).trim();}
  finally {rl.close();}
}
function newDestination(filename) {
  const parsed=path.parse(filename);
  let p=path.join(INBOX,filename),i=2;
  while(fs.existsSync(p)) p=path.join(INBOX,`${parsed.name}-${i++}${parsed.ext}`);
  return p;
}
try {
  console.log('\n=== TAMBAH VIDEO BARU KE MOTIONGRAPHIC STUDIO ===');
  const raw=await getInput();
  if(!raw) {console.log('Tidak ada file dipilih. Tidak ada perubahan.');process.exit(0);}
  const file=path.resolve(raw.replace(/^['"]|['"]$/g,''));
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()) throw new Error('File tidak ditemukan: '+file);
  if(!file.toLowerCase().endsWith('.zip')) throw new Error('Harus file .zip add-on Remotion.');
  const dest=path.dirname(file)===INBOX?file:newDestination(path.basename(file));
  if(dest!==file) fs.copyFileSync(file,dest);
  console.log('[ADD] ZIP disiapkan di: '+dest);
  const importer=spawnSync(process.execPath,[path.join(ROOT,'tools','import-inbox.mjs')],{cwd:ROOT,stdio:'inherit'});
  if(importer.status!==0) throw new Error('Import gagal. Baca pesan di atas; ZIP gagal tersedia di library/gagal-import.');
  const check=spawnSync(process.execPath,[path.join(ROOT,'tools','validate-library.mjs')],{cwd:ROOT,stdio:'inherit'});
  if(check.status!==0) throw new Error('Import selesai tetapi validasi mendeteksi masalah.');
  console.log('\n[OK] Refresh http://localhost:3000; pilih video dari panel Compositions.');
} catch(e) {
  console.error('\n[ERROR ADD] '+e.message);
  process.exitCode=1;
}
