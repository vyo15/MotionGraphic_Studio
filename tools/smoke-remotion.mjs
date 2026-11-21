#!/usr/bin/env node
/** Optional real Remotion bundling/composition smoke gate. No project mutations.
 * Run AFTER npm ci + npm run sync; unlike static validation, this requires Chromium. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),idIndex=args.indexOf('--still');
const id=idIndex>=0?args[idIndex+1]:null;
const cli=path.join(root,'node_modules','.bin',process.platform==='win32'?'remotion.cmd':'remotion');
if(!fs.existsSync(cli)){
 console.error('[SMOKE BLOKIR] Remotion CLI tidak ada; jalankan npm ci. Ini BELUM lolos bundling/render.');
 process.exit(2);
}
const go=(cmd)=>{
 const r=spawnSync(cli,cmd,{cwd:root,stdio:'inherit',shell:process.platform==='win32',timeout:180000});
 if(r.error)throw r.error;
 if(r.status!==0)throw Error('Remotion keluar dengan status '+String(r.status)+(r.signal?' / '+r.signal:''));
};
try{
 console.log('[SMOKE] Memeriksa bundling & komposisi src/index.ts (tidak mengubah project)...');
 go(['compositions','src/index.ts','--log','error']);
 if(idIndex>=0){
  if(!id||!/^[A-Za-z][A-Za-z0-9-]*$/.test(id))throw Error('Pakai: npm run qa:smoke -- --still <CompositionId>');
  const dest=path.join(root,'qa-out','smoke-'+id+'.png');fs.mkdirSync(path.dirname(dest),{recursive:true});
  console.log('[SMOKE] Render frame pertama: '+dest);
  go(['still','src/index.ts',id,dest,'--frame','0']);
 }
 console.log('[SMOKE] PASS bundling/komposisi'+(id?' dan still frame':'')+'; belum membuktikan keseluruhan MP4/GUI.');
}catch(e){console.error('[SMOKE FAIL] '+e.message);process.exitCode=1}
