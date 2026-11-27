#!/usr/bin/env node
/** Single editor: native Remotion Studio. Master preparation is handled by predev. */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {startAutoSync} from './auto-sync-watch.mjs';
import {startAutoChatgptExport} from './auto-chatgpt-export.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
// Execute the Remotion JS CLI through Node, not a .cmd shell wrapper.
// On Windows this avoids DEP0190 and argument quoting issues.
const cli=join(root,'node_modules','@remotion','cli','remotion-cli.js');
const args=['studio','src/index.ts','--port','3000'];
if(process.env.MOTION_STUDIO_LAUNCHER==='1')args.push('--no-open');
console.log('[REMOTION STUDIO] Satu editor: http://127.0.0.1:3000');
console.log('[REMOTION STUDIO] Tidak menjalankan Hub, Visual Editor, atau Easy Editor.');
const child=spawn(process.execPath,[cli,...args],{cwd:root,stdio:'inherit',windowsHide:false});
const watcher=startAutoSync({root});
console.log('[AUTO SYNC] Aktif: copy folder ke projects/ atau ZIP ke library/masuk.');
const handoff=process.env.MOTION_STUDIO_AUTO_CHATGPT==='0'?null:startAutoChatgptExport({root,isIdle:()=>watcher.isIdle()});
console.log(handoff?'[CHATGPT] ZIP otomatis setelah source stabil; tidak perlu command zip.':'[CHATGPT] ZIP otomatis nonaktif.');
function closeWatchers(){handoff?.close();watcher.close()}
let stopping=false;
child.on('error',e=>{closeWatchers();console.error('[REMOTION] Gagal memulai: '+e.message);process.exitCode=1});
child.on('exit',code=>{closeWatchers();process.exitCode=code??0});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{
 if(stopping)return;stopping=true;closeWatchers();
 if(child.pid)child.kill(signal);
});
