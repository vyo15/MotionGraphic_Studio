#!/usr/bin/env node
/** Soft delete: keluarkan dari Root/catalog dan pindahkan source+asset ke library/sampah. */
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,readCatalog,writeCatalog,selectVideo,confirm,uniqueDir} from './menu-helper.mjs';
import {spawnSync} from 'node:child_process';
const rootPath=path.join(ROOT,'src/Root.tsx');
let folder;
try{
 const catalog=readCatalog();const v=await selectVideo(catalog.videos,process.argv.slice(2));
 if(v.projectDir){
  if(!await confirm(`\nKetik HAPUS untuk mengarsipkan ${v.id}: `)){console.log('Dibatalkan.');process.exit(0)}
  const source=path.join(ROOT,v.projectDir);
  if(!fs.existsSync(source))throw Error('Folder project tidak ditemukan: '+v.projectDir);
  folder=uniqueDir(path.join(ROOT,'library/sampah'),`${new Date().toISOString().slice(0,10)}-${v.id}`);
  fs.mkdirSync(folder,{recursive:true});
  const archived=path.join(folder,'project');
  fs.renameSync(source,archived);
  fs.writeFileSync(path.join(folder,'restore.json'),JSON.stringify({type:'folder',video:v,projectDir:v.projectDir},null,2));
  const r=spawnSync(process.execPath,[path.join(ROOT,'tools/sync-projects.mjs')],{cwd:ROOT,stdio:'inherit'});
  if(r.status!==0){fs.renameSync(archived,source);throw Error('Gagal sinkronisasi, project dikembalikan ke folder asal.');}
  console.log('\n[ARSIP] '+v.id+' → '+path.relative(ROOT,folder));
  console.log('Untuk memulihkan: npm run restore');
  process.exit(0);
 }

 const raw=fs.readFileSync(rootPath,'utf8');
 const blocks=[...raw.matchAll(/^[ \t]*<Composition\b[\s\S]*?\/>[ \t]*\r?\n?/gm)];
 const compMatch=blocks.find(m=>new RegExp('\\bid="'+v.id+'"').test(m[0]));
 if(!compMatch)throw Error('Komposisi tidak ditemukan di Root.tsx. Perbaiki lewat npm run check dulu.');
 const comp=compMatch[0];const varName=comp.match(/\bcomponent=\{([A-Za-z_$][\w$]*)\}/)?.[1];
 if(!varName)throw Error('Nama component tidak dapat dibaca dengan aman.');
 const importMatch=[...raw.matchAll(/^import\s+\{[^\n]+\}\s+from\s+['"][^'"\n]+['"];?\r?\n/gm)].find(x=>new RegExp('\\b'+varName+'\\b').test(x[0]));
 if(!importMatch)throw Error('Import komponen tidak ditemukan, pembatalan agar source aman.');
 if(!await confirm(`\nKetik HAPUS untuk memindahkan ${v.id} ke library/sampah: `)){console.log('Dibatalkan.');process.exit(0)}
 const source=path.join(ROOT,'src/videos',v.slug);const assets=path.join(ROOT,'public/videos',v.slug);
 folder=uniqueDir(path.join(ROOT,'library/sampah'),`${new Date().toISOString().slice(0,10)}-${v.id}`);
 fs.mkdirSync(folder,{recursive:true});
 const oldCat=fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8');
 fs.writeFileSync(path.join(folder,'Root.sebelum.tsx'),raw);
 fs.writeFileSync(path.join(folder,'catalog.sebelum.json'),oldCat);
 const data={video:v,composition:comp,importLine:importMatch[0],sourcePresent:fs.existsSync(source),assetsPresent:fs.existsSync(assets)};
 fs.writeFileSync(path.join(folder,'restore.json'),JSON.stringify(data,null,2));
 const moved=[];
 try{
  for(const [old,dest] of [[source,path.join(folder,'src')],[assets,path.join(folder,'public')]]){
   if(fs.existsSync(old)){fs.renameSync(old,dest);moved.push([dest,old])}
  }
  // Hapus hanya node komposisi dan import untuk video tersebut.
  const updated=raw.replace(comp,'').replace(importMatch[0],'');
  fs.writeFileSync(rootPath,updated);
  writeCatalog({...catalog,videos:catalog.videos.filter(x=>x.id!==v.id)});
 }catch(e){
  fs.writeFileSync(rootPath,raw);fs.writeFileSync(path.join(ROOT,'library/catalog.json'),oldCat);
  for(const [dest,old] of moved.reverse())if(fs.existsSync(dest))fs.renameSync(dest,old);
  throw e;
 }
 console.log(`\n[BERHASIL] ${v.id} dihapus dari Studio, bukan dihapus permanen.`);
 console.log('File tersimpan di: '+path.relative(ROOT,folder));
 console.log('Pulihkan dengan: npm run restore');
}catch(e){console.error('\n[ERROR HAPUS] '+e.message);process.exitCode=1}
