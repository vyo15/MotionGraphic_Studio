#!/usr/bin/env node
/** Adds Concat launch scripts to the existing MotionGraphic Studio package.json safely.
 * Does not touch Remotion composition files or any project/asset.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath=path.join(root,'package.json');
const manager=path.join(root,'tools','concat-manager.ps1');
const required={
  'concat': 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/concat-manager.ps1 -Action launch',
  'concat:setup': 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/concat-manager.ps1 -Action setup',
  'concat:status': 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/concat-manager.ps1 -Action status',
  'concat:clone': 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/concat-manager.ps1 -Action clone',
  'concat:safe': 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/concat-manager.ps1 -Action launch -SoftwareGraphics',
};

function main(){
  if(!fs.existsSync(pkgPath)) throw Error('package.json tidak ditemukan di Master Studio.');
  if(!fs.existsSync(manager)) throw Error('tools/concat-manager.ps1 tidak ditemukan. Ekstrak seluruh ZIP patch terlebih dahulu.');
  const original=fs.readFileSync(pkgPath,'utf8');
  const pkg=JSON.parse(original);
  if(!pkg||typeof pkg!=='object'||!pkg.scripts||typeof pkg.scripts!=='object') throw Error('Struktur package.json tidak valid.');
  if(!pkg.scripts.dev) throw Error('Ini bukan Master Studio yang diharapkan: script npm run dev tidak ada.');
  for(const [name,value] of Object.entries(required)){
    if(Object.prototype.hasOwnProperty.call(pkg.scripts,name) && pkg.scripts[name]!==value){
      throw Error(`Script '${name}' sudah ada dan berbeda. Tidak ditimpa demi keamanan.`);
    }
  }
  const pending=Object.entries(required).filter(([name])=>!Object.prototype.hasOwnProperty.call(pkg.scripts,name));
  if(pending.length===0){
    console.log('[OK] Semua perintah npm Concat sudah terdaftar. Tidak ada perubahan.');
    return;
  }
  const backupDir=path.join(root,'apps','concat','backups');
  fs.mkdirSync(backupDir,{recursive:true});
  const backup=path.join(backupDir,`package-before-concat-${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
  fs.writeFileSync(backup,original,{flag:'wx'});
  for(const [name,value] of pending) pkg.scripts[name]=value;
  const updated=JSON.stringify(pkg,null,2)+'\n';
  const temp=pkgPath+'.concat-update.tmp';
  try{
    fs.writeFileSync(temp,updated,{flag:'wx'});
    // Prefer atomic replacement on the same disk. Backups remain available.
    fs.renameSync(temp,pkgPath);
  } catch(error){
    try{fs.rmSync(temp,{force:true})}catch{}
    throw error;
  }
  console.log('[OK] npm run dev tetap sama:',pkg.scripts.dev);
  console.log('[OK] Perintah Concat aktif:');
  for(const name of Object.keys(required)) console.log('     npm run '+name);
  console.log('[BACKUP] package.json lama: '+backup);
}

try{main()}catch(e){console.error('[GAGAL] '+e.message);process.exitCode=1}
