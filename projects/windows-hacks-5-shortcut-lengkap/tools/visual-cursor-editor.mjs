#!/usr/bin/env node
/**
 * Project-local visual cursor editor: real drag handles, persistent manifest,
 * actual Remotion still-frame preview. No Master Studio file is edited.
 * Run from the existing Master root:
 * node projects/windows-hacks-5-shortcut-lengkap/tools/visual-cursor-editor.mjs
 */
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {tmpdir} from 'node:os';
const PROJECT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const MASTER=resolve(PROJECT,'../..');
const FILE=join(PROJECT,'motiongraphic-video.json');
const HTML=join(PROJECT,'tools','visual-cursor-editor.html');
const PORT=Number(process.env.MG_CURSOR_PORT||4081);
const META={CTRL_SHIFT_T:{label:'01 · Ctrl + Shift + T — Tutup tab',start:240,length:285,native:270},CTRL_SHIFT_ESC:{label:'02 · Ctrl + Shift + Esc — End Task',start:525,length:330,native:300},WIN_SHIFT_S:{label:'03 · Win + Shift + S — Seleksi',start:855,length:330,native:300},WIN_E:{label:'04 · Win + E — Downloads',start:1185,length:330,native:300},CTRL_SHIFT_N:{label:'05 · Ctrl + Shift + N — Folder',start:1515,length:570,native:540}};
const CACHE=join(tmpdir(),'motiongraphic-win-hacks-v5-cursor-cache');
mkdirSync(CACHE,{recursive:true});
const data=()=>JSON.parse(readFileSync(FILE,'utf8'));
const json=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(obj));};
const run=(cmd,args,timeoutMs=180000)=>new Promise((resolveRun,reject)=>{
 const child=spawn(cmd,args,{cwd:MASTER,windowsHide:true,shell:process.platform==='win32'});
 let error='';let done=false;
 const timer=setTimeout(()=>{child.kill();if(!done){done=true;reject(Error('Proses preview terlalu lama / timeout'))}},timeoutMs);
 child.stderr.on('data',d=>{error+=d.toString();error=error.slice(-4000)});
 child.stdout.on('data',d=>{error+=d.toString();error=error.slice(-4000)});
 child.once('error',e=>{if(done)return;done=true;clearTimeout(timer);reject(e)});
 child.once('exit',code=>{if(done)return;done=true;clearTimeout(timer);if(code===0)resolveRun();else reject(Error(error.slice(-1300)||'Render/Sync exit '+code))});
});
async function requestBody(req){let s='';for await(const c of req){s+=c;if(s.length>100000)throw Error('Payload terlalu besar')}return JSON.parse(s||'{}')}
function validate(scene,input){if(!Object.hasOwn(META,scene))throw Error('Scene tidak dikenal');const result={};
 for(const key of ['enabled','fromFrame','toFrame','clickFrame','startX','startY','endX','endY','size','ringColor']){
  const v=input[key];if(key==='enabled'){if(typeof v!=='boolean')throw Error('enabled harus boolean');result[key]=v;continue;}
  if(key==='ringColor'){if(typeof v!=='string'||!/^#[0-9a-fA-F]{6}$/.test(v))throw Error('Warna harus #RRGGBB');result[key]=v;continue;}
  if(typeof v!=='number'||!Number.isFinite(v))throw Error(key+' harus angka');
  if(['fromFrame','toFrame','clickFrame'].includes(key)&&(!Number.isInteger(v)||v<0||v>=META[scene].native))throw Error(key+' di luar timeline scene');
  if(['startX','endX'].includes(key)&&(v<0||v>1080))throw Error(key+' harus 0–1080');
  if(['startY','endY'].includes(key)&&(v<0||v>1920))throw Error(key+' harus 0–1920');
  if(key==='size'&&(v<.35||v>3))throw Error('Ukuran kursor harus 0.35–3');
  result[key]=v;
 }
 if(result.fromFrame>=result.toFrame)throw Error('Frame akhir harus sesudah frame awal');
 if(result.clickFrame<result.fromFrame||result.clickFrame>result.toFrame)throw Error('Frame klik harus berada dalam interval');
 return result;
}
const server=createServer(async(req,res)=>{try{
 const url=new URL(req.url||'/',`http://127.0.0.1:${PORT}`);
 if(url.pathname==='/'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(readFileSync(HTML));return}
 if(url.pathname==='/api/state'&&req.method==='GET'){const m=data();return json(res,200,{project:m.title,composition:m.id,width:m.width,height:m.height,fps:m.fps,scenes:META,cursorEditor:m.defaultProps.cursorEditor||{}})}
 if(url.pathname==='/api/save'&&req.method==='POST'){
  if(req.headers.origin&&!['http://127.0.0.1:'+PORT,'http://localhost:'+PORT].includes(req.headers.origin))throw Error('Origin tidak diizinkan');
  const body=await requestBody(req);if(!body||typeof body!=='object')throw Error('Payload salah');
  const m=data(),track=validate(body.scene,body.track);
  const before=readFileSync(FILE,'utf8');
  const backup=join(MASTER,'library','backups','visual-cursor-windows-hacks.json');mkdirSync(dirname(backup),{recursive:true});writeFileSync(backup,before);
  m.defaultProps.cursorEditor??={};m.defaultProps.cursorEditor[body.scene]=track;
  writeFileSync(FILE,JSON.stringify(m,null,2)+'\n');
  try{await run(process.execPath,[join(MASTER,'tools','sync-projects.mjs')],30000)}catch(e){writeFileSync(FILE,before);throw Error('Disimpan dibatalkan karena sinkronisasi gagal: '+e.message)}
  return json(res,200,{ok:true,message:'Perubahan tersimpan di manifest dan tersinkron ke Studio. Refresh preview.'});
 }
 if(url.pathname==='/api/undo'&&req.method==='POST'){
  const backup=join(MASTER,'library','backups','visual-cursor-windows-hacks.json');if(!existsSync(backup))throw Error('Belum ada backup');const before=readFileSync(FILE,'utf8'),last=readFileSync(backup,'utf8');writeFileSync(FILE,last);await run(process.execPath,[join(MASTER,'tools','sync-projects.mjs')],30000);writeFileSync(backup,before);return json(res,200,{ok:true});
 }
 if(url.pathname==='/api/still'&&req.method==='GET'){
  const frame=Number(url.searchParams.get('frame'));if(!Number.isInteger(frame)||frame<0||frame>2204)throw Error('Frame tidak valid');
  const p=join(CACHE,`preview-${frame}.png`);
  // Render from the SAME source as Remotion preview, using the bundled CLI.
  const bin=process.platform==='win32'?'npx.cmd':'npx';
  await run(bin,['--no-install','remotion','still','src/index.ts','WindowsHacks5ShortcutLengkap',p,`--frame=${frame}`,'--scale=0.5','--overwrite'],180000);
  if(!existsSync(p))throw Error('Renderer belum menghasilkan gambar');
  res.writeHead(200,{'Content-Type':'image/png','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(readFileSync(p));return;
 }
 json(res,404,{error:'Halaman tidak ditemukan'});
 }catch(e){json(res,400,{error:String(e.message||e)})}});
server.listen(PORT,'127.0.0.1',()=>console.log(`Visual Cursor Editor: http://127.0.0.1:${PORT}`));
