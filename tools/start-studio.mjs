#!/usr/bin/env node
/** npm run dev starts both the Remotion Studio and a local no-code editor. */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {startEasyEditor} from './easy-editor-server.mjs';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try{await startEasyEditor();}catch(e){console.error('[EASY EDITOR] Port 4077 sedang dipakai; Studio tetap dijalankan. '+e.message)}
console.log('[STUDIO] Remotion: http://localhost:3000');
console.log('[STUDIO] Visual Editor: http://localhost:4077/visual');
console.log('[STUDIO] Editor pengaturan: http://localhost:4077');
const bin=join(ROOT,'node_modules','.bin',process.platform==='win32'?'remotion.cmd':'remotion');
const child=spawn(bin,['studio','src/index.ts'],{cwd:ROOT,stdio:'inherit',shell:process.platform==='win32'});
child.on('error',e=>{console.error('[STUDIO] Gagal menjalankan Remotion: '+e.message);process.exit(1)});
child.on('exit',(code)=>{process.exitCode=code??0;process.exit()});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{if(child.pid)child.kill(signal);process.exit(0)});
