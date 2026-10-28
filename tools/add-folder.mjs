#!/usr/bin/env node
/** Salin folder add-on eksternal ke projects/<slug> tanpa mengubah video lama. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projectRoot=path.join(root,'projects');
const validSlug=s=>/^[a-z][a-z0-9-]{1,48}$/.test(s);
const cleanup=[];
function isInside(p,base){const r=path.relative(base,p);return r===''||(!r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r))}
async function chooseFolder(){
  const arg=process.argv.slice(2).find(a=>!a.startsWith('--'));
  if(arg) return arg;
  if(process.platform==='win32'){
    const ps=`Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.FolderBrowserDialog; $d.Description='Pilih folder add-on video (berisi motiongraphic-video.json)'; if($d.ShowDialog() -eq 'OK'){Write-Output $d.SelectedPath}`;
    const r=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',ps],{encoding:'utf8',timeout:120000});
    if(r.status===0&&r.stdout.trim())return r.stdout.trim().split(/\r?\n/).at(-1);
  }
  if(!process.stdin.isTTY)throw Error('Masukkan path folder: npm run addfolder -- "/alamat/folder-video"');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{return await rl.question('Path lengkap folder add-on video: ')}finally{rl.close()}
}
try{
  const input=(await chooseFolder()).trim().replace(/^['"]|['"]$/g,'');
  if(!input){console.log('[BATAL] Tidak ada folder dipilih.');process.exit(0)}
  let source=path.resolve(input);
  if(!fs.existsSync(source)||!fs.statSync(source).isDirectory())throw Error('Folder sumber tidak ditemukan: '+source);
  let manifest=path.join(source,'motiongraphic-video.json');
  // Juga terima folder pembungkus ZIP jika berisi tepat satu subfolder add-on.
  if(!fs.existsSync(manifest)){
    const candidates=fs.readdirSync(source,{withFileTypes:true}).filter(e=>e.isDirectory()&&fs.existsSync(path.join(source,e.name,'motiongraphic-video.json')));
    if(candidates.length===1){source=path.join(source,candidates[0].name);manifest=path.join(source,'motiongraphic-video.json')}
  }
  if(!fs.existsSync(manifest))throw Error('Folder bukan add-on: tidak ada motiongraphic-video.json. Pilih folder VIDEO, bukan folder Master.');
  const m=JSON.parse(fs.readFileSync(manifest,'utf8'));
  if(!validSlug(m.slug))throw Error('Slug pada manifest tidak valid: '+m.slug);
  if(!/^[A-Z][A-Za-z0-9]{2,80}$/.test(m.id||''))throw Error('ID komposisi pada manifest tidak valid.');
  if(typeof m.entry!=='string'||!m.entry.startsWith('src/')||m.entry.includes('..')||!fs.existsSync(path.join(source,m.entry)))throw Error('File entry tidak ada / tidak valid: '+m.entry);
  fs.mkdirSync(projectRoot,{recursive:true});
  const dest=path.join(projectRoot,m.slug);
  if(isInside(source,root)){
    if(source===dest){console.log('[ADA] Folder ini sudah berada di projects/. Jalankan npm run sync.');process.exit(0)}
    if(isInside(source,path.join(root,'src'))||isInside(source,path.join(root,'public'))||source===root)throw Error('Jangan pilih folder Master/src/public. Salin folder add-on yang mandiri.');
  }
  if(fs.existsSync(dest))throw Error(`Folder tujuan sudah ada: projects/${m.slug}. Tidak ditimpa untuk melindungi hasil edit lama.`);
  const temp=fs.mkdtempSync(path.join(projectRoot,'_importing-'));
  cleanup.push(temp);
  // fs.cpSync source directory CONTENT into temp. Reject symlinks and skip bulky build artifacts.
  const ignored=new Set(['node_modules','.git','dist','out','.cache']);
  fs.cpSync(source,temp,{recursive:true,force:false,errorOnExist:true,filter:(p)=>{
    const rel=path.relative(source,p);
    if(rel.split(path.sep).some(t=>ignored.has(t)))return false;
    if(fs.lstatSync(p).isSymbolicLink())throw Error('Symlink tidak diizinkan dalam folder add-on: '+p);
    return true;
  }});
  fs.renameSync(temp,dest);
  cleanup.pop();
  const result=spawnSync(process.execPath,[path.join(root,'tools','sync-projects.mjs')],{cwd:root,stdio:'inherit'});
  if(result.status!==0){
    console.error('[PERHATIAN] Folder sudah tersalin namun sync gagal. Perbaiki error, lalu jalankan npm run sync. Folder lama tetap aman.');
    process.exitCode=1;
  }else{
    const check=spawnSync(process.execPath,[path.join(root,'tools','validate-library.mjs')],{cwd:root,stdio:'inherit'});
    if(check.status!==0)process.exitCode=1;
    else console.log(`[BERHASIL] Project ${m.id} ditambahkan ke projects/${m.slug}. Refresh Remotion Studio.`);
  }
}catch(e){console.error('[ERROR ADDFOLDER] '+e.message);process.exitCode=1}
finally{for(const p of cleanup)fs.rmSync(p,{recursive:true,force:true})}
