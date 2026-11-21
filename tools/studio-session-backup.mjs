#!/usr/bin/env node
/** Before a Remotion visual-editing session, preserve project SOURCE outside Master.
 * Never restore automatically, overwrite approved scenes, or copy generated mirrors.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {ROOT} from './menu-helper.mjs';
import {exportRoot} from './export-paths.mjs';

const keep=3;
const base=path.join(exportRoot(),'EditorSnapshots');
const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8'));
const paths=[];
function gather(root,dir){
  if(!fs.existsSync(dir))return;
  for(const item of fs.readdirSync(dir,{withFileTypes:true})){
    if(item.isSymbolicLink())throw new Error('Symlink pada source backup tidak diperbolehkan: '+item.name);
    const f=path.join(dir,item.name);
    if(item.isDirectory())gather(root,f);
    else if(item.isFile())paths.push({absolute:f,rel:path.relative(ROOT,f)});
  }
}
for(const v of catalog.videos??[]){
  if(!v.projectDir)continue;
  const project=path.resolve(ROOT,v.projectDir);
  if(!project.startsWith(path.join(ROOT,'projects')+path.sep))throw new Error('Project path tidak aman: '+v.projectDir);
  const mf=path.join(project,'motiongraphic-video.json');
  if(!fs.existsSync(mf))throw new Error('Project source hilang: '+v.projectDir);
  paths.push({absolute:mf,rel:path.relative(ROOT,mf)});
  gather(ROOT,path.join(project,'src'));
  gather(ROOT,path.join(project,'production'));
}
if(process.env.MOTION_STUDIO_AUTO_BACKUP==='0'){
  console.log('[EDIT BACKUP] Dilewati sesuai MOTION_STUDIO_AUTO_BACKUP=0');
  process.exit(0);
}
if(!paths.length){console.log('[EDIT BACKUP] Master tanpa project; tidak perlu snapshot.');process.exit(0)}
paths.sort((a,b)=>a.rel.localeCompare(b.rel));
const digest=createHash('sha256');
for(const f of paths){digest.update(f.rel);digest.update(fs.readFileSync(f.absolute))}
const fingerprint=digest.digest('hex');
fs.mkdirSync(base,{recursive:true});
const snapshots=fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.name.startsWith('.')).map(x=>x.name).sort().reverse();
for(const name of snapshots){
  try{if(JSON.parse(fs.readFileSync(path.join(base,name,'snapshot.json'),'utf8')).sha256===fingerprint){
    console.log('[EDIT BACKUP] Source tidak berubah; snapshot sudah ada, tidak digandakan.');process.exit(0);
  }}catch{}
}
const tag=new Date().toISOString().replace(/[:.]/g,'-');
const dest=path.join(base,tag),tmp=path.join(base,'.pending-'+process.pid+'-'+tag);
try{
  for(const f of paths){const out=path.join(tmp,'files',f.rel);fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(f.absolute,out)}
  fs.writeFileSync(path.join(tmp,'snapshot.json'),JSON.stringify({createdAt:new Date().toISOString(),sha256:fingerprint,files:paths.length,note:'Salinan source sebelum Remotion Studio. Pemulihan manual setelah memeriksa perubahan.',sourceRoot:ROOT},null,2)+'\n');
  fs.renameSync(tmp,dest);
  // Keep most recent snapshots to limit disk usage outside the Master.
  const ordered=fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.name.startsWith('.')).map(x=>x.name).sort().reverse();
  for(const old of ordered.slice(keep))fs.rmSync(path.join(base,old),{recursive:true,force:true});
  console.log(`[EDIT BACKUP] ${paths.length} file source disimpan sebelum sesi Studio (maksimal ${keep} snapshot).`);
}catch(e){fs.rmSync(tmp,{recursive:true,force:true});throw e}
