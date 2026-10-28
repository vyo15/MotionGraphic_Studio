#!/usr/bin/env node
/** Remove dead legacy manifest sliders after JSX conversion; backup manifest; source layers remain in Studio. */
import {readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync,copyFileSync} from 'node:fs';import {join,resolve,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..'),slug=process.argv[2],apply=process.argv.includes('--apply'),dir=join(ROOT,'projects',slug||'');
if(!slug||!existsSync(join(dir,'motiongraphic-video.json'))){console.error('Pakai node tools/drop-stale-legacy-controls.mjs <slug> [--apply]');process.exit(2)}
const mpath=join(dir,'motiongraphic-video.json'),m=JSON.parse(readFileSync(mpath,'utf8'));
const sceneDirs={HOOK:'src/scenes/Hook.tsx',CTA:'src/scenes/CTA.tsx',CTRL_SHIFT_T:'src/scenes/01-ctrl-shift-t',CTRL_SHIFT_ESC:'src/scenes/02-ctrl-shift-esc',WIN_SHIFT_S:'src/scenes/03-win-shift-s',WIN_E:'src/scenes/04-win-e',CTRL_SHIFT_N:'src/scenes/05-ctrl-shift-n'};
const walk=d=>!existsSync(d)?[]:readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(join(d,x.name)):x.isFile()&&x.name.endsWith('.tsx')?[join(d,x.name)]:[]);
let removed=0,remaining=0;
for(const [scene,v] of Object.entries(m.defaultProps?.sceneEditor||{})){
 const loc=join(dir,sceneDirs[scene]);const files=loc.endsWith('.tsx')?[loc]:walk(loc);
 const used=new Set();for(const f of files){if(!existsSync(f))continue;const s=readFileSync(f,'utf8');for(const x of s.matchAll(/\blayerStyle\(['"]([^'"]+)['"]\)/g))used.add(x[1]);}
 for(const [key,settings] of Object.entries(v.layers||{})){if(used.has(settings.id))remaining++;else{removed++;if(apply)delete v.layers[key]}}
}
if(apply){const backup=join(ROOT,'library/backups/computed-repair',slug,'manifest-before-cleanup.json');mkdirSync(dirname(backup),{recursive:true});if(!existsSync(backup))copyFileSync(mpath,backup);writeFileSync(mpath,JSON.stringify(m,null,2)+'\n');}
console.log(`${apply?'[CLEANED]':'[CHECK]'} ${removed} slider manifest tidak lagi terhubung, ${remaining} kontrol legacy masih aktif. ${apply?'Tidak ada elemen React yang dihapus.':''}`);
