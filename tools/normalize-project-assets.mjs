/** Legacy staticFile('audio/name.wav') -> folder-first mirror path, on a STAGED copy only. */
import fs from 'node:fs';import path from 'node:path';
import {validRel} from './validate-addon.mjs';
function files(dir){return fs.existsSync(dir)?fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:[]):[]}
export function normalizeProjectAssets(staging,slug){
 let changed=0;
 for(const file of files(path.join(staging,'src')).filter(f=>/\.[jt]sx?$/.test(f))){
  const original=fs.readFileSync(file,'utf8');
  const updated=original.replace(/staticFile\(\s*(['"])([^'"`]+)\1\s*\)/g,(raw,quote,relative)=>{
   if(!validRel(relative))throw Error('staticFile path tidak aman: '+relative);
   if(relative.startsWith('videos/'+slug+'/'))return raw;
   changed++;
   return `staticFile(${quote}videos/${slug}/${relative}${quote})`;
  });
  if(updated!==original)fs.writeFileSync(file,updated);
 }
 return changed;
}
