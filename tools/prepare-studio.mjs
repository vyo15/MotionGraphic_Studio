#!/usr/bin/env node
/** Automasi startup: dependency (pertama kali), import, lalu audit. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createPreflightLog} from './studio-preflight.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
console.log('[STUDIO] Persiapan otomatis...');
if(fs.existsSync(path.join(root,'motiongraphic-video.json'))){
  console.error('[LOKASI PROJECT SALAH] motiongraphic-video.json ditemukan di ROOT Master Studio.');
  console.error('Jangan copy isi src/ dan public/ video ke root. Pindahkan folder video UTUH ke projects/<slug>/, atau gunakan npm run addfolder.');
  console.error('File master kamu mungkin tertimpa: backup dan periksa sebelum lanjut.');
  process.exit(1);
}
const cli=path.join(root,'node_modules','@remotion','cli','remotion-cli.js');
if(!fs.existsSync(cli)||!fs.existsSync(path.join(root,'node_modules','typescript','package.json'))){
  console.log('[STUDIO] Instal dependency pertama kali (perlu internet)...');
  const npm=process.platform==='win32'?'npm.cmd':'npm';
  const r=spawnSync(npm,['ci','--no-audit','--no-fund'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
  if(r.status!==0){console.error('[ERROR] npm ci gagal. Pastikan Node.js LTS dan internet aktif.');process.exit(r.status||1)}
}
try{
 const log=createPreflightLog();
 log.run('Versi Master','check-release.mjs');
 const imported=log.run('Import inbox','import-inbox.mjs',['--ready-only']);
 if(imported.stdout?.includes('[INBOX MENUNGGU]'))console.log('[STUDIO] ZIP belum stabil; watcher akan memproses setelah Studio terbuka.');
 log.run('Sinkronisasi','sync-projects.mjs');
 log.staticChecks();
 log.run('Backup source','studio-session-backup.mjs');
 const count=JSON.parse(fs.readFileSync(path.join(root,'library/catalog.json'),'utf8')).videos.length;
 console.log(`[STUDIO] ${count} video siap; registrasi, source, editable dan backup diperiksa. Detail: ${log.file}`);
}catch(e){console.error('[STUDIO] '+e.message);process.exitCode=1;}
