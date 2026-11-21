#!/usr/bin/env node
/** Read-only safety check: source project identity and catalog alignment.
 * Does NOT register, sync, update Props or write generated assets. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projects=path.join(root,'projects');
const catalog=path.join(root,'library/catalog.json');
let fails=0;const issues=[];
const error=msg=>{issues.push(msg);fails++};
try{
 if(!fs.existsSync(catalog))throw Error('library/catalog.json belum ada. Jalankan npm run sync.');
 const old=JSON.parse(fs.readFileSync(catalog,'utf8'));
 const registered=new Map((old.videos||[]).map(v=>[v.slug,v]));
 const found=new Set();
 for(const entry of fs.readdirSync(projects,{withFileTypes:true})){
  if(!entry.isDirectory()||entry.name.startsWith('_')||entry.name.startsWith('.'))continue;
  const file=path.join(projects,entry.name,'motiongraphic-video.json');
  if(!fs.existsSync(file)){error('Manifest hilang: projects/'+entry.name);continue}
  try{
   const m=JSON.parse(fs.readFileSync(file,'utf8'));found.add(entry.name);
   const v=registered.get(entry.name);
   if(!v)error('Project belum terdaftar: '+entry.name+' (jalankan npm run sync)');
   else if(v.id!==m.id||v.width!==m.width||v.height!==m.height||v.fps!==m.fps||v.durationInFrames!==m.durationInFrames)error('Katalog belum sinkron dengan manifest: '+entry.name);
  }catch(e){error('Manifest tidak valid: '+entry.name+': '+e.message)}
 }
 for(const slug of registered.keys())if(!found.has(slug))error('Project terdaftar hilang dari projects/: '+slug);
 if(!fs.existsSync(path.join(root,'src/Root.tsx')))error('Registrasi src/Root.tsx belum ada');
}catch(e){error(e.message)}
 for(const m of issues)console.error('[SYNC CHECK FAIL] '+m);
 console.log(`[SYNC CHECK] ${registeredSize()} project terdaftar, ${fails} masalah; READ-ONLY.`);
 if(fails)process.exitCode=1;
 function registeredSize(){try{return JSON.parse(fs.readFileSync(catalog,'utf8')).videos.length}catch{return 0}}
