/** Fast, non-mutating readiness checks for the existing Studio registry.
 * No installs, sync, QA, backup or export. Not a proof of visual quality or asset freshness. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';

export function checkProdReady(root){
 const file=p=>path.join(root,p);
 if(fs.existsSync(file('motiongraphic-video.json')))throw Error('Manifest video ditemukan di root Master; periksa lokasi project dan backup.');
 for(const p of ['node_modules/@remotion/cli/remotion-cli.js','src/index.ts','src/Root.tsx','library/catalog.json','library/.studio-generated-state.json']){
  if(!fs.existsSync(file(p)))throw Error('File persiapan belum ada: '+p);
 }
 // Unsaved-to-manifest native Props edits must not be silently treated as synced.
 const state=JSON.parse(fs.readFileSync(file('library/.studio-generated-state.json'),'utf8'));
 const normalize=s=>s.replace(/\r\n/g,'\n');
 if(typeof state.rootText!=='string'||normalize(state.rootText)!==normalize(fs.readFileSync(file('src/Root.tsx'),'utf8')))throw Error('Registrasi Root berubah sejak sync terakhir.');
 for(const [script,args] of [['check-sync-state.mjs',[]],['validate-library.mjs',['--require-mirror']]]){
  const r=spawnSync(process.execPath,[file('tools/'+script),...args],{cwd:root,stdio:'inherit',windowsHide:true});
  if(r.error)throw r.error;
  if(r.status!==0)throw Error('Pemeriksaan kesiapan gagal: '+script);
 }
 // Catalog can be stale even when identity and duration match.
 const catalog=JSON.parse(fs.readFileSync(file('library/catalog.json'),'utf8'));
 for(const v of catalog.videos){
  const m=JSON.parse(fs.readFileSync(file('projects/'+v.slug+'/motiongraphic-video.json'),'utf8'));
  if(!isDeepStrictEqual(m.defaultProps??{},v.defaultProps??{}))throw Error('Props belum sinkron: '+v.slug);
 }
}
