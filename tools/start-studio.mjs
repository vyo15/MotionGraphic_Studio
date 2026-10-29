#!/usr/bin/env node
/** Single editor: native Remotion Studio. Master preparation is handled by predev. */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cli=join(root,'node_modules','.bin',process.platform==='win32'?'remotion.cmd':'remotion');
const args=['studio','src/index.ts','--port','3000'];
if(process.env.MOTION_STUDIO_LAUNCHER==='1')args.push('--no-open');
console.log('[REMOTION STUDIO] Satu editor: http://127.0.0.1:3000');
console.log('[REMOTION STUDIO] Tidak menjalankan Hub, Visual Editor, atau Easy Editor.');
const child=spawn(cli,args,{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
let stopping=false;
child.on('error',e=>{console.error('[REMOTION] Gagal memulai: '+e.message);process.exitCode=1});
child.on('exit',code=>{process.exitCode=code??0});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{
 if(stopping)return;stopping=true;
 if(child.pid)child.kill(signal);
});
