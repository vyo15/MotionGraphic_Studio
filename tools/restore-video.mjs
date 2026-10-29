#!/usr/bin/env node
/** Restore hasil soft-delete dari trash, tanpa menimpa video yang sudah ada. */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {ROOT,readCatalog,writeCatalog} from './menu-helper.mjs';
import {spawnSync} from 'node:child_process';
try{
 const trash=path.join(ROOT,'library/sampah');
 const dirs=fs.readdirSync(trash,{withFileTypes:true}).filter(x=>x.isDirectory()&&fs.existsSync(path.join(trash,x.name,'restore.json')));
 if(!dirs.length){console.log('Belum ada video terhapus yang bisa dipulihkan.');process.exit(0)}
 const entries=dirs.map(x=>({folder:path.join(trash,x.name),name:x.name,m:JSON.parse(fs.readFileSync(path.join(trash,x.name,'restore.json'),'utf8'))}));
 console.log('\nVIDEO DI TEMPAT SAMPAH:');entries.forEach((e,i)=>console.log(`${i+1}. ${e.m.video.title} [${e.m.video.id}]`));
 let choice=process.argv[2];
 if(!choice){
  if(!process.stdin.isTTY)throw Error('Pilih ID lewat: npm run restore -- IDVideo');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{choice=(await rl.question('Pilih nomor / ID yang dipulihkan: ')).trim()}finally{rl.close()}
 }
 const item=entries.find((e,i)=>String(i+1)===choice||e.m.video.id===choice);
 if(!item)throw Error('Pilihan tidak ditemukan.');
 const m=item.m,v=m.video,catalog=readCatalog(),rootFile=path.join(ROOT,'src/Root.tsx');
 if(m.type==='folder'){
  if(catalog.videos.some(x=>x.id===v.id||x.slug===v.slug))throw Error('Video sudah aktif atau ID/slug bentrok.');
  const target=path.join(ROOT,m.projectDir);
  if(fs.existsSync(target))throw Error('Folder tujuan sudah ada; tidak ditimpa: '+m.projectDir);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.renameSync(path.join(item.folder,'project'),target);
  const r=spawnSync(process.execPath,[path.join(ROOT,'tools/sync-projects.mjs')],{cwd:ROOT,stdio:'inherit'});
  if(r.status!==0){fs.renameSync(target,path.join(item.folder,'project'));throw Error('Gagal sinkronisasi, project tetap di arsip.');}
  fs.renameSync(path.join(item.folder,'restore.json'),path.join(item.folder,'RESTORED.json'));
  console.log(`[PULIH] ${v.id} telah kembali ke Studio.`);
  process.exit(0);
 }

 if(catalog.videos.some(x=>x.id===v.id||x.slug===v.slug))throw Error('ID/slug sudah dipakai. Tidak menimpa file apa pun.');
 const destS=path.join(ROOT,'src/videos',v.slug),destA=path.join(ROOT,'public/videos',v.slug);
 if(fs.existsSync(destS)||fs.existsSync(destA))throw Error('Folder video sudah ada, tidak jadi restore.');
 const oldRoot=fs.readFileSync(rootFile,'utf8'),oldCat=fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8');
 if(!oldRoot.includes('// AUTO-IMPORTS:END')||!oldRoot.includes('{/* AUTO-COMPOSITIONS:END */}'))throw Error('Marker Root.tsx hilang.');
 const moved=[];
 try{
  for(const [from,dest] of [[path.join(item.folder,'src'),destS],[path.join(item.folder,'public'),destA]]){
   if(fs.existsSync(from)){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.renameSync(from,dest);moved.push([dest,from])}
  }
  const addBefore=(input,marker,block)=>{
   const idx=input.indexOf(marker);
   const indent=input.slice(0,idx).match(/[ \t]*$/)?.[0]||'';
   return input.slice(0,idx-indent.length)+block.trimEnd()+'\n'+indent+input.slice(idx);
  };
  const updated=addBefore(addBefore(oldRoot,'// AUTO-IMPORTS:END',m.importLine),
   '{/* AUTO-COMPOSITIONS:END */}',m.composition.replace(/^[ \t]*<Composition/,'      <Composition'));
  fs.writeFileSync(rootFile,updated);
  writeCatalog({...catalog,videos:[...catalog.videos,v]});
 }catch(e){
  fs.writeFileSync(rootFile,oldRoot);fs.writeFileSync(path.join(ROOT,'library/catalog.json'),oldCat);
  for(const [a,b] of moved.reverse())if(fs.existsSync(a))fs.renameSync(a,b);
  throw e;
 }
 fs.renameSync(path.join(item.folder,'restore.json'),path.join(item.folder,'RESTORED.json'));
 console.log(`[PULIH] ${v.id}. Studio akan menampilkan kembali setelah refresh.`);
}catch(e){console.error('[ERROR RESTORE] '+e.message);process.exitCode=1}
