/** One source list and lean policy shared by manual Master ZIP and automatic handoff. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {handoffEvidenceSources} from './spatial-evidence-index.mjs';
import {collectEntries} from './zip-core.mjs';
export const ignoreNames=new Set(['node_modules','.git','.cache','dist','build','coverage','.next','tmp','temp','.remotion','out','exports','qa-out']);
export const ignoreRelative=(name,lean)=>/\.(?:log|tmp|partial|bak)$/i.test(name)||(lean&&/^MotionGraphic-Studio\/library\/(?:backups|sampah|arsip-|sudah-diimpor|gagal-import|arsip-migrasi)/.test(name))||(lean&&/^MotionGraphic-Studio\/library\/masuk\/.*\.zip$/i.test(name));
export function masterSources(root){
 const names=['projects','src','tools','library','tests','contracts','templates','docs','package.json','package-lock.json','tsconfig.json','.gitignore','README.md','CHATGPT-READ-FIRST.md','CHATGPT-HISTORY.md','PRODUCTION-RULES.md','AGENTS.md','public/README.txt','01-BUKA-STUDIO.bat','02-CEK-STUDIO.bat','03-STOP-STUDIO.bat'];
 return names.filter(n=>fs.existsSync(path.join(root,n))).map(n=>({absolute:path.join(root,n),name:'MotionGraphic-Studio/'+n}));
}
export const masterEntries=(root,{fast=false}={})=>collectEntries([...masterSources(root),...handoffEvidenceSources(root,{fast})],{ignoreNames,ignoreRelative:n=>ignoreRelative(n,true)});
export function entrySignature(entries){
 const h=createHash('sha256');
 for(const e of entries){
  h.update(e.name+'\0');
  if(!e.isDirectory){const s=fs.statSync(e.absolute);h.update(`${s.size}:${s.mtimeMs}:${s.ctimeMs}\0`)}
 }
 return h.digest('hex');
}
