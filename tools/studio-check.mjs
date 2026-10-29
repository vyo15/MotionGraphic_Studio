/** Non-destructive end-to-end static check for UI job and command-line workflow. */
import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog} from './menu-helper.mjs';import {checkQuality} from './studio-quality.mjs';
let failures=0;
function step(file){const p=spawnSync(process.execPath,[path.join(ROOT,'tools',file)],{cwd:ROOT,encoding:'utf8',timeout:60000,env:process.env});if(p.stdout)process.stdout.write(p.stdout);if(p.stderr)process.stderr.write(p.stderr);if(p.status!==0){failures++;console.error('[CHECK ERROR] '+file)}}
step('sync-projects.mjs');step('validate-library.mjs');step('check-direct-studio-text.mjs');step('check-layout-flow.mjs');
for(const p of readCatalog().videos){const dir=path.join(ROOT,p.projectDir);if(!fs.existsSync(path.join(dir,'src','Video.tsx'))){console.error('[ERROR] Missing Video.tsx: '+p.slug);failures++;continue;}
 const qa=checkQuality(p.slug);console.log(`[QUALITY] ${p.title}: ${qa.summary.interactive} interactive | ${qa.summary.literalGeometry} literal | ${qa.summary.computedGeometry} dinamis | ${qa.issues.length} temuan`);
 for(const x of qa.issues.slice(0,7))console.log(` [${x.level}] frame ${x.frame}: ${x.message}`);failures+=qa.issues.filter(x=>x.level==='error').length;
}
const tsc=path.join(ROOT,'node_modules','.bin',process.platform==='win32'?'tsc.cmd':'tsc');
if(!fs.existsSync(tsc)){console.error('[CHECK] TypeScript belum terpasang; jalankan npm run dev untuk instalasi terlebih dahulu.');failures++;}
else{const t=spawnSync(tsc,['--noEmit'],{cwd:ROOT,encoding:'utf8',timeout:120000,shell:process.platform==='win32'});if(t.stdout)process.stdout.write(t.stdout);if(t.stderr)process.stderr.write(t.stderr);if(t.status!==0){failures++;console.error('[CHECK ERROR] TypeScript gagal');}}
if(failures){console.error('[CHECK] '+failures+' error kritis');process.exitCode=1;}
else console.log('[CHECK] Semua gate statis lolos. QA visual bergerak, ketepatan klik dan render MP4 memerlukan pemeriksaan tambahan.');
