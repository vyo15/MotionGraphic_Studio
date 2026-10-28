#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog,selectVideo} from './menu-helper.mjs';
try{
 const v=await selectVideo(readCatalog().videos,process.argv.slice(2));
 const output=path.join(ROOT,'out',v.id+'.mp4');
 fs.mkdirSync(path.dirname(output),{recursive:true});
 console.log(`\n[RENDER] ${v.title}\n[RENDER] Output: out/${v.id}.mp4`);
 const cli=path.join(ROOT,'node_modules','@remotion','cli','remotion-cli.js');
 if(!fs.existsSync(cli))throw Error('Remotion belum diinstal; jalankan npm run dev terlebih dahulu.');
 const res=spawnSync(process.execPath,[cli,'render','src/index.ts',v.id,output,'--codec=h264'],{cwd:ROOT,stdio:'inherit'});
 if(res.status!==0)process.exit(res.status||1);
 console.log('\n[SELESAI] '+output);
}catch(e){console.error('\n[ERROR RENDER] '+e.message);process.exitCode=1}
