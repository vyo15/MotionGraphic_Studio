#!/usr/bin/env node
/** Validasi katalog ↔ Root, source, dan staticFile literal. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8'));
const root=fs.readFileSync(path.join(ROOT,'src/Root.tsx'),'utf8');
let errors=0,assets=0,mirrorsPending=0;
const fail=(text)=>{errors++;console.error('[ERROR] '+text)};
const registered=[...root.matchAll(/<Composition\b[\s\S]*?\/>/g)].map(m=>m[0].match(/\bid="([^"]+)"/)?.[1]).filter(Boolean);
const registeredSet=new Set(registered);
const known=new Set();
const expectedSegments=new Map();
function files(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:[])}
for(const id of registered)if(registered.filter(x=>x===id).length>1)fail('Composition duplikat: '+id);
for(const v of catalog.videos){
 let current=errors;
 if(known.has(v.id))fail('Catalog ID duplikat: '+v.id);known.add(v.id);
 if(!registeredSet.has(v.id))fail('Komposisi belum terdaftar: '+v.id);
 if(v.voiceGuideCompositionId){known.add(v.voiceGuideCompositionId);if(!registeredSet.has(v.voiceGuideCompositionId))fail('Komposisi VO Guide belum terdaftar: '+v.voiceGuideCompositionId);}
 for(const seg of (v.segments||[])){
  if(known.has(seg.id))fail('ID segmen duplikat: '+seg.id);known.add(seg.id);
  if(!registeredSet.has(seg.id))fail('Komposisi segmen belum terdaftar: '+seg.id);
  expectedSegments.set(seg.id,{project:v.id,startFrame:seg.startFrame,duration:seg.durationInFrames});
 }
 if(!fs.existsSync(path.join(ROOT,v.source)))fail('Source tidak ditemukan: '+v.source);
 for(const file of files(path.join(ROOT,v.projectDir||'src/videos/'+v.slug)).filter(f=>/\.[jt]sx?$/.test(f))){
  for(const match of fs.readFileSync(file,'utf8').matchAll(/staticFile\(\s*['"]([^'"`]+)['"]\s*\)/g)){
   assets++;
   const ref=match[1],prefix=`videos/${v.slug}/`;
   const source=ref.startsWith(prefix)?path.join(ROOT,v.projectDir,'public',ref.slice(prefix.length)):path.join(ROOT,'public',ref);
   const mirror=path.join(ROOT,'public',ref);
   // Folder-first: `projects/<slug>/public` owns original assets. Generated mirror is optional for static audit.
   if(!fs.existsSync(source))fail('Aset sumber hilang: '+ref+' (diharapkan '+path.relative(ROOT,source)+')');
   else if(!fs.existsSync(mirror))mirrorsPending++;

  }
 }
 console.log((current===errors?'✓':'•')+' '+v.id);
}
for(const id of registeredSet)if(!known.has(id))fail('Root.tsx terdaftar tetapi catalog belum ada: '+id);
console.log(`\nHASIL: ${catalog.videos.length} video, ${expectedSegments.size} segmen, ${assets} rujukan aset dicek, ${errors} masalah sumber.`);
if(mirrorsPending)console.warn(`[MIRROR BELUM SYNC] ${mirrorsPending} aset asli tersedia tetapi mirror public/videos/ belum dibuat. Jalankan npm run sync sebelum preview/render.`);
// Prod must have generated assets present; the normal static audit still permits unsynced mirrors.
process.exitCode=errors||(process.argv.includes('--require-mirror')&&mirrorsPending)?1:0;
