#!/usr/bin/env node
/** MotionGraphic Easy Editor — local only; persists project manifest and rebuilds the Remotion registry. */
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {visualHandler} from './universal-visual-editor.mjs';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const PROJECTS=join(ROOT,'projects');
const HTML=join(ROOT,'tools','easy-editor','index.html');
const PORT=Number(process.env.MG_EDITOR_PORT||4077);
const allowedLayerKeys={x:'number',y:'number',scale:'number',rotation:'number',opacity:'number',zIndex:'number',enabled:'boolean',startFrame:'number',endFrame:'number',animation:'string',delayFrames:'number',animationFrames:'number'};
function projects(){return readdirSync(PROJECTS,{withFileTypes:true}).filter(e=>e.isDirectory()&&!e.isSymbolicLink()).flatMap(e=>{const p=join(PROJECTS,e.name,'motiongraphic-video.json');if(!existsSync(p))return [];try{const m=JSON.parse(readFileSync(p,'utf8'));return m.slug===e.name?[{id:m.id,title:m.title,slug:m.slug,scenes:Object.keys(m.defaultProps?.sceneEditor||{})}]:[]}catch{return []}})}
function manifest(slug){const found=projects().find(p=>p.slug===slug);if(!found)throw Error('Project tidak terdaftar');const file=join(PROJECTS,slug,'motiongraphic-video.json');return {file,data:JSON.parse(readFileSync(file,'utf8'))};}
function validNumber(key,n){const lim={x:3000,y:4000,scale:15,rotation:3600,opacity:1,zIndex:9999,startFrame:100000,endFrame:100000,delayFrames:100000,animationFrames:100000};if(!Number.isFinite(n)||Math.abs(n)>lim[key])throw Error('Nilai '+key+' di luar batas');if(['scale','opacity','animationFrames'].includes(key)&&n<0)throw Error('Nilai '+key+' tidak boleh negatif');}
function validateChange(original,changes){
 if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('Perubahan tidak valid');
 const updated=structuredClone(original);
 // Only allow editing existing scene/layer and text keys — no JSX/filename/path injection.
 if(Object.hasOwn(changes,'sceneEditor')){
  if(!updated.defaultProps?.sceneEditor)throw Error('Project ini memakai editor langsung Remotion Studio, bukan sceneEditor');
  const editor=changes.sceneEditor;
  if(!editor||typeof editor!=='object')throw Error('Scene editor tidak valid');
  for(const [scene,change] of Object.entries(editor)){
   const target=updated.defaultProps.sceneEditor[scene];if(!target)throw Error('Scene tidak ditemukan: '+scene);
   if(!change||typeof change!=='object')throw Error('Perubahan scene tidak valid');
   for(const field of Object.keys(change))if(!['layers','copy','sfxVolume','sfxEnabled'].includes(field))throw Error('Field terlarang: '+field);
   if(change.layers){for(const [layer,vals] of Object.entries(change.layers)){
    const l=target.layers[layer];if(!l)throw Error('Layer tidak ditemukan: '+layer);
    for(const [key,value] of Object.entries(vals)){
     if(!allowedLayerKeys[key]||typeof value!==allowedLayerKeys[key])throw Error('Properti layer tidak valid: '+key);
     if(typeof value==='number')validNumber(key,value);
     if(key==='animation'&&!['none','fade','slide-up','pop'].includes(value))throw Error('Preset animasi tidak valid');
     l[key]=value;
    }
   }}
   if(change.copy){for(const [key,value] of Object.entries(change.copy)){
    if(!Object.hasOwn(target.copy,key)||typeof value!=='string'||value.length>500)throw Error('Teks tidak valid: '+key);
    target.copy[key]=value;
   }}
   if(Object.hasOwn(change,'sfxVolume')){const v=change.sfxVolume;if(typeof v!=='number'||v<0||v>1)throw Error('Volume SFX harus antara 0–1');target.sfxVolume=v;}
   if(Object.hasOwn(change,'sfxEnabled')){if(typeof change.sfxEnabled!=='boolean')throw Error('SFX aktif harus boolean');target.sfxEnabled=change.sfxEnabled;}
  }
 }
 if(Object.hasOwn(changes,'voice')){if(!updated.defaultProps.voice)throw Error('Project tidak mendukung voice');const v=changes.voice;if(Object.hasOwn(v,'enabled')){if(typeof v.enabled!=='boolean')throw Error('Voice enabled tidak valid');updated.defaultProps.voice.enabled=v.enabled;}if(Object.hasOwn(v,'volume')){if(typeof v.volume!=='number'||v.volume<0||v.volume>1)throw Error('Voice volume 0–1');updated.defaultProps.voice.volume=v.volume;}}
 for(const k of Object.keys(changes))if(!['sceneEditor','voice'].includes(k))throw Error('Tidak diizinkan mengubah: '+k);
 return updated;
}
function sync(){const r=spawnSync(process.execPath,[join(ROOT,'tools','sync-projects.mjs')],{cwd:ROOT,encoding:'utf8',timeout:20000});if(r.status!==0)throw Error((r.stderr||r.stdout||'Gagal sync').slice(-1000));return (r.stdout||'').trim();}
const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Access-Control-Allow-Origin':'none'};
const send=(res,status,body)=>{res.writeHead(status,headers);res.end(JSON.stringify(body));};
async function body(req){let s='';for await(const part of req){s+=part;if(s.length>1024*1024)throw Error('Payload terlalu besar')}return JSON.parse(s||'{}')}
const server=createServer(async(req,res)=>{try{
 const url=new URL(req.url||'/',`http://localhost:${PORT}`);
 if(await visualHandler(req,res,url))return;
 if(url.pathname==='/'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(readFileSync(HTML));return;}
 if(url.pathname==='/api/projects'&&req.method==='GET')return send(res,200,{projects:projects()});
 if(url.pathname==='/api/project'&&req.method==='GET'){const {data}=manifest(url.searchParams.get('slug'));return send(res,200,{project:{id:data.id,title:data.title,slug:data.slug,fps:data.fps,durationInFrames:data.durationInFrames,defaultProps:data.defaultProps||{}}});}
 if((url.pathname==='/api/save'||url.pathname==='/api/undo')&&req.method==='POST'){
  const origin=req.headers.origin;if(origin&&origin!==`http://127.0.0.1:${PORT}`&&origin!==`http://localhost:${PORT}`)throw Error('Origin tidak diizinkan');
  const payload=await body(req);const {file,data}=manifest(payload.slug);const backup=join(ROOT,'library','backups','easy-editor',payload.slug+'.previous.json');
  if(url.pathname==='/api/undo'){
   if(!existsSync(backup))throw Error('Tidak ada perubahan terakhir yang dapat dipulihkan');
   const previous=readFileSync(backup,'utf8');const current=readFileSync(file,'utf8');writeFileSync(file,previous);try{sync()}catch(e){writeFileSync(file,current);sync();throw e}writeFileSync(backup,current);return send(res,200,{ok:true,message:'Versi sebelumnya dipulihkan.'});
  }
  const next=validateChange(data,payload.changes);const raw=readFileSync(file,'utf8');mkdirSync(dirname(backup),{recursive:true});writeFileSync(backup,raw);writeFileSync(file,JSON.stringify(next,null,2)+'\n');
  let msg;try{msg=sync()}catch(e){writeFileSync(file,raw);try{sync()}catch{}throw Error('Perubahan dibatalkan: '+e.message)}
  return send(res,200,{ok:true,message:'Tersimpan permanen di manifest. '+msg});
 }
 send(res,404,{error:'Halaman tidak ditemukan'});
 }catch(e){send(res,400,{error:String(e.message||e)})}});
export function startEasyEditor(){return new Promise((ok,fail)=>{server.once('error',fail);server.listen(PORT,'127.0.0.1',()=>{console.log(`[EASY EDITOR] http://127.0.0.1:${PORT} — Visual Editor: http://127.0.0.1:${PORT}/visual`);ok(server)})})}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))startEasyEditor().catch(e=>{console.error('[EASY EDITOR] '+e.message);process.exitCode=1});
