#!/usr/bin/env node
/** Universal authoring audit. Warning-only for legacy projects; --strict enforces on opted-in future projects. */
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const strict=process.argv.includes('--strict');
function walk(d){if(!existsSync(d))return[];return readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isSymbolicLink()?[]:f.isDirectory()?walk(join(d,f.name)):f.isFile()&&/\.tsx$/.test(f.name)?[join(d,f.name)]:[])}
const dirs=readdirSync(join(root,'projects'),{withFileTypes:true}).filter(d=>d.isDirectory()&&!d.isSymbolicLink());
let critical=0;
console.log('\n=== KONTRAK EDITABLE MASTER — semua project ===');
for(const d of dirs){const folder=join(root,'projects',d.name),m=JSON.parse(readFileSync(join(folder,'motiongraphic-video.json'),'utf8'));const files=walk(join(folder,'src'));let interactive=0,sourceLayerNames=0,computed=0,sceneLayers=0,cursor=0;const warnings=[];
for(const f of files){const s=readFileSync(f,'utf8');interactive+=(s.match(/<Interactive\./g)||[]).length;sourceLayerNames+=(s.match(/<Interactive\.\w+[\s\S]{0,150}?name\s*=\s*['"]/g)||[]).length;computed+=(s.match(/style\s*=\s*\{\s*\{[\s\S]{0,180}?var\(--/g)||[]).length;
if(/<Interactive\./.test(s)&&/style=\{\{[\s\S]{0,90}?\.\.\./.test(s))warnings.push(relative(folder,f)+': style spread berpotensi computed');}
for(const v of Object.values(m.defaultProps?.sceneEditor||{}))sceneLayers+=Object.keys(v.layers||{}).length;
cursor=Object.keys(m.defaultProps?.cursorEditor||{}).length;
console.log(`• ${m.title} [${m.id}]`);console.log(`  ${interactive} JSX Interactive · ${sceneLayers} layer manifest · ${cursor} track kursor`);
if(!interactive&&!sceneLayers){warnings.push('Tidak ada layer editable; buat Interactive.Div / sceneEditor');if(strict&&m.editableContract==='visual-v1')critical++}
if(m.editableContract==='visual-v1'){
 const required=['README.md','PANDUAN-EDIT-ASSET.md','src/Video.tsx'];
 for(const f of required)if(!existsSync(join(folder,f))){warnings.push('Kontrak file wajib hilang: '+f);if(strict)critical++}
 if(!existsSync(join(folder,'EDITABLE-LAYER-MAP.md'))){warnings.push('Buat EDITABLE-LAYER-MAP.md untuk melabel layer');if(strict)critical++}
 if(!interactive&&!sceneLayers)warnings.push('Kontrak butuh layer terpisah dan bernama');
}
if(computed)warnings.push(computed+' gaya memuat CSS var; gunakan layer Interactive atau props asli Remotion agar dapat dipilih di Studio');
for(const w of warnings.slice(0,5))console.log('  [INFO] '+w);
}
console.log('Aturan pengembangan: STANDAR-EDITABLE-STUDIO.md | Studio: http://127.0.0.1:3000');
if(strict&&critical){console.error('[KONTRAK] '+critical+' pelanggaran pada project dengan editableContract=visual-v1');process.exitCode=1;}
