#!/usr/bin/env node
/** Automasi startup: dependency (pertama kali), import, lalu audit. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function runNode(file){
  const r=spawnSync(process.execPath,[path.join(root,'tools',file)],{cwd:root,stdio:'inherit'});
  if(r.status!==0)process.exit(r.status||1);
}
console.log('\n[STUDIO] Menyelaraskan library sebelum menjalankan Studio...');
if(fs.existsSync(path.join(root,'motiongraphic-video.json'))){
  console.error('[LOKASI PROJECT SALAH] motiongraphic-video.json ditemukan di ROOT Master Studio.');
  console.error('Jangan copy isi src/ dan public/ video ke root. Pindahkan folder video UTUH ke projects/<slug>/, atau gunakan npm run addfolder.');
  console.error('File master kamu mungkin tertimpa: backup dan periksa sebelum lanjut.');
  process.exit(1);
}
const cli=path.join(root,'node_modules','@remotion','cli','remotion-cli.js');
if(!fs.existsSync(cli)){
  console.log('[STUDIO] Instal dependency pertama kali (perlu internet)...');
  const npm=process.platform==='win32'?'npm.cmd':'npm';
  const r=spawnSync(npm,['ci','--no-audit','--no-fund'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
  if(r.status!==0){console.error('[ERROR] npm ci gagal. Pastikan Node.js LTS dan internet aktif.');process.exit(r.status||1)}
}
runNode('import-inbox.mjs');
runNode('sync-projects.mjs');
runNode('validate-library.mjs');
runNode('check-editability.mjs');
runNode('audit-inline-editing.mjs');
runNode('check-direct-studio-text.mjs');
console.log('[STUDIO] Library siap.\n');
