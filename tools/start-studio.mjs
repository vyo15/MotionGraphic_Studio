#!/usr/bin/env node
/** Single editor: native Remotion Studio. Master preparation is handled by predev. */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {checkProdReady} from './prod-preflight.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
// Execute the Remotion JS CLI through Node, not a .cmd shell wrapper.
// On Windows this avoids DEP0190 and argument quoting issues.
const cli=join(root,'node_modules','@remotion','cli','remotion-cli.js');
const flags=process.argv.slice(2);
if(flags.length && (flags.length!==1||flags[0]!=='--prod')){console.error('[STUDIO] Opsi tidak dikenal. Gunakan npm run dev atau npm run prod.');process.exit(1);}
const prod=flags[0]==='--prod';
if(prod){
 try{checkProdReady(root);}
 catch(e){console.error('[PROD] '+e.message+'\n[PROD] Jalankan npm run dev untuk persiapan lengkap.');process.exit(1);}
 console.log('[PROD] Preview cepat, menggunakan hasil sync terakhir. QA, backup, sync watcher dan auto ZIP nonaktif.');
 console.log('[PROD] Untuk edit/Save, gunakan dev. Mode prod bukan final QA dan bukan editor read-only.');
}
const args=['studio','src/index.ts','--port','3000'];
if(process.env.MOTION_STUDIO_LAUNCHER==='1')args.push('--no-open');
console.log('[REMOTION STUDIO] Satu editor: http://127.0.0.1:3000');
console.log('[REMOTION STUDIO] Tidak menjalankan Hub, Visual Editor, atau Easy Editor.');
let watcher=null,handoff=null,spatial=null;
function closeWatchers(){spatial?.close();handoff?.close();watcher?.close()}
if(!prod){
 const {startAutoSync}=await import('./auto-sync-watch.mjs');
 const {startAutoChatgptExport}=await import('./auto-chatgpt-export.mjs');
 const {startAutoSpatial}=await import('./auto-spatial.mjs');
 watcher=startAutoSync({root});
 console.log('[AUTO SYNC] Aktif: source projects/; FILE CHANGE ONLY dipasang sebelum membuka Studio.');
 handoff=process.env.MOTION_STUDIO_AUTO_CHATGPT==='0'?null:startAutoChatgptExport({root,isIdle:()=>watcher.isIdle()});
 console.log(handoff?'[CHATGPT] ZIP otomatis setelah source stabil; tidak perlu command zip.':'[CHATGPT] ZIP otomatis nonaktif.');
 spatial=process.env.MOTION_STUDIO_AUTO_SPATIAL==='0'?null:startAutoSpatial({root,isIdle:()=>watcher.isIdle()});
 console.log(spatial?'[AUTO SPATIAL] Sampling otomatis setelah source stabil; full/final melalui menu.':'[AUTO SPATIAL] Nonaktif.');
}
const child=spawn(process.execPath,[cli,...args],{cwd:root,stdio:'inherit',windowsHide:false});
let stopping=false;
child.on('error',e=>{closeWatchers();console.error('[REMOTION] Gagal memulai: '+e.message);process.exitCode=1});
child.on('exit',code=>{closeWatchers();process.exitCode=code??0});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{
 if(stopping)return;stopping=true;closeWatchers();
 if(child.pid)child.kill(signal);
});
