#!/usr/bin/env node
/** Export video add-on / semua add-on / Master Studio. Tidak butuh WinRAR. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline/promises';
import {ROOT,readCatalog,selectVideo} from './menu-helper.mjs';

// ZIP video tetap di dalam Studio. Backup Master WAJIB di folder saudara (di luar repo).
const VIDEO_OUTPUT=path.join(ROOT,'exports','zips');
const backupDir=()=>{
  const custom=process.env.MOTIONGRAPHIC_STUDIO_BACKUP_DIR?.trim();
  const result=custom?path.resolve(custom):path.resolve(ROOT,'..','MotionGraphic-Studio-Backups');
  const rel=path.relative(ROOT,result);
  assert(rel!=='' && (rel==='..' || rel.startsWith('..'+path.sep)) && !path.isAbsolute(rel),
    'Folder backup Master harus di LUAR MotionGraphic-Studio. Atur MOTIONGRAPHIC_STUDIO_BACKUP_DIR ke path di luar folder Studio.');
  return result;
};
const IGNORE=new Set(['node_modules','.git','.cache','dist','build','coverage','.next','tmp','temp']);
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const stamp=()=>new Date().toISOString().replace(/[-:]/g,'').replace('T','-').slice(0,15);
function copyClean(src,dest){
  assert(fs.existsSync(src),`File/folder tidak ditemukan: ${src}`);
  fs.cpSync(src,dest,{recursive:true,force:false,errorOnExist:true,filter:p=>{
    const relative=path.relative(src,p);
    if(relative.split(path.sep).some(part=>IGNORE.has(part)))return false;
    if(fs.lstatSync(p).isSymbolicLink())throw Error('Symlink tidak didukung saat ZIP: '+p);
    return true;
  }});
}
function pack(work,out){
  fs.mkdirSync(path.dirname(out),{recursive:true});
  let p;
  if(process.platform==='win32'){
    const q=s=>s.replace(/'/g,"''");
    const cmd=`$ErrorActionPreference='Stop'; Compress-Archive -Path '${q(path.join(work,'*'))}' -DestinationPath '${q(out)}' -CompressionLevel Optimal -Force`;
    p=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',cmd],{encoding:'utf8',timeout:240000});
  }else{
    p=spawnSync('zip',['-q','-r',out,'.'],{cwd:work,encoding:'utf8',timeout:240000});
  }
  if(p.status!==0)throw Error('ZIP gagal: '+(p.stderr||p.error?.message||'perintah ZIP gagal'));
  assert(fs.existsSync(out)&&fs.statSync(out).size>0,'ZIP kosong/tidak terbentuk');
  console.log(`[ZIP BERHASIL] ${out} (${(fs.statSync(out).size/1024/1024).toFixed(2)} MB)`);
}
function withWork(job){
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'motiongraphic-zip-'));
  try{return job(tmp)}finally{fs.rmSync(tmp,{recursive:true,force:true})}
}
function videoZip(video){
  assert(video.projectDir,'Video tidak berada dalam projects/. Jalankan npm run sync.');
  return withWork(tmp=>{
    const origin=path.join(ROOT,video.projectDir);
    assert(fs.existsSync(path.join(origin,'motiongraphic-video.json')),'Manifest video tidak ada: '+video.slug);
    // ZIP berisi satu FOLDER bernama slug, memudahkan ekstrak ke projects/.
    copyClean(origin,path.join(tmp,video.slug));
    const out=path.join(VIDEO_OUTPUT,`${video.slug}-editable-${stamp()}.zip`);
    pack(tmp,out);
  });
}
function studioZip(){
  return withWork(tmp=>{
    const dir=path.join(tmp,'MotionGraphic-Studio');fs.mkdirSync(dir);
    for(const item of ['projects','src','tools','library'])copyClean(path.join(ROOT,item),path.join(dir,item));
    // Mirror public/videos dibangun ulang lewat npm run sync, bukan aset asli.
    fs.mkdirSync(path.join(dir,'public'),{recursive:true});
    fs.writeFileSync(path.join(dir,'public','README.txt'),'Aset video otomatis dibuat dari projects/<slug>/public/ melalui npm run dev / sync.\n');
    fs.mkdirSync(path.join(dir,'exports','zips'),{recursive:true});
    fs.writeFileSync(path.join(dir,'exports','zips','README.txt'),'Hasil npm run zip disimpan di sini.\n');
    for(const item of ['package.json','package-lock.json','tsconfig.json','.gitignore','README.md','PANDUAN-EDIT-ASSET.md','PROMPT-PROYEK-CHATGPT.md','PANDUAN-GITHUB.md','PANDUAN-RENAME.md']){
      if(fs.existsSync(path.join(ROOT,item)))fs.copyFileSync(path.join(ROOT,item),path.join(dir,item));
    }
    const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
    const out=path.join(backupDir(),`MotionGraphic-Studio-Master-v${pkg.version}-${stamp()}.zip`);
    pack(tmp,out);
    console.log('[MASTER] Lokasi: di LUAR MotionGraphic-Studio (tidak ikut repo atau ZIP berikutnya).');
    console.log('[MASTER] Termasuk semua project aktif, tools, konfigurasi, library & arsip.');
    console.log('[MASTER] Tidak menyertakan node_modules, render out, cache, mirror aset, ZIP hasil ekspor.');
  });
}
const args=process.argv.slice(2);
try{
  if(args.includes('--studio')||args.includes('--master'))studioZip();
  else if(args.includes('--all'))for(const v of readCatalog().videos)videoZip(v);
  else if(args.length){videoZip(await selectVideo(readCatalog().videos,args))}
  else{
    if(!process.stdin.isTTY)throw Error('Gunakan npm run zip -- --studio / --all / IDVideo pada terminal noninteraktif.');
    console.log('\n=== ZIP OTOMATIS — PILIH JENIS EXPORT ===');
    console.log('  1. Satu video (ZIP editable)');
    console.log('  2. Semua video (ZIP masing-masing)');
    console.log('  3. MASTER STUDIO lengkap (disimpan di folder LUAR Studio)');
    const rl=createInterface({input:process.stdin,output:process.stdout});
    let choice;
    try{choice=(await rl.question('\nPilih 1/2/3 (Enter untuk batal): ')).trim()}finally{rl.close()}
    if(choice==='1')videoZip(await selectVideo(readCatalog().videos,[]));
    else if(choice==='2')for(const v of readCatalog().videos)videoZip(v);
    else if(choice==='3')studioZip();
    else if(!choice)console.log('Dibatalkan.');
    else throw Error('Pilihan tidak valid.');
  }
}catch(e){console.error('[ERROR ZIP] '+e.message);process.exitCode=1}
