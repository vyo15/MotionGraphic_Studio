#!/usr/bin/env node
// Removes only empty, unused controls from earlier Windows Hacks revisions.
// Never alters a nonempty user-authored value. Backup before any write.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const file=join(root,'projects','windows-hacks-5-shortcut-lengkap','motiongraphic-video.json');
if(!existsSync(file)){console.log('Tidak ada project Windows Hacks; migrasi dilewati.');process.exit(0)}
const before=readFileSync(file,'utf8'),m=JSON.parse(before);let removed=0,kept=0;
for(const [scene,config] of Object.entries(m.defaultProps?.sceneEditor||{})){
 for(const k of Object.keys(config.copy||{})){
 const stale=scene==='CTRL_SHIFT_T'&&['Title Top','Title Bottom','Subtitle'].includes(k)||
 ['CTRL_SHIFT_ESC','WIN_SHIFT_S','WIN_E','CTRL_SHIFT_N'].includes(scene)&&(/^(Masalah · Judul|Masalah · Subtitle|Shortcut · Judul|Shortcut · Subtitle|Hasil · Judul|Hasil · Subtitle|Title |Subtitle )/.test(k))||
 scene==='HOOK'&&k.startsWith('Heading ')||scene==='CTA'&&['Cta First','Cta Second','Cta Small','Cta Button'].includes(k);
 if(stale){if(!config.copy[k]){delete config.copy[k];removed++;}else kept++;}
 }
}
if(removed){const dir=join(root,'library','backups','text-controls-v7');mkdirSync(dir,{recursive:true});const backup=join(dir,'manifest-before-text-v7-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json');writeFileSync(backup,before);writeFileSync(file,JSON.stringify(m,null,2)+'\n');console.log(removed+' kontrol kosong dihapus. Backup: '+backup)}
console.log('[TEKS V7] '+kept+' kontrol lama berisi teks pengguna dipertahankan.');
