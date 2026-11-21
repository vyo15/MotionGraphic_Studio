#!/usr/bin/env node
/** Move unregistered project folders OUTSIDE the Master, never delete them.
 * Only explicit --apply performs changes.  This prevents auto sync from reviving
 * retired videos that still have folders under projects/.
 */
import fs from 'node:fs';
import path from 'node:path';
import {ROOT} from './menu-helper.mjs';
import {exportRoot} from './export-paths.mjs';
const args=process.argv.slice(2);
if(args.some(x=>!['--apply','--help'].includes(x))){console.error('Usage: npm run retire:unregistered [-- --apply]');process.exit(2)}
if(args.includes('--help')){console.log('Preview unregistered projects; --apply moves them outside the Master into RetiredProjects. Never permanently deletes.');process.exit(0)}
const apply=args.includes('--apply');
const file=path.join(ROOT,'library','catalog.json');
const catalog=JSON.parse(fs.readFileSync(file,'utf8'));
if(!Array.isArray(catalog.videos))throw new Error('Catalog invalid');
const registered=new Set(catalog.videos.map(v=>v.slug));
const dir=path.join(ROOT,'projects');
const choices=[];
for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 if(!e.isDirectory()||e.isSymbolicLink()||e.name.startsWith('_')||e.name.startsWith('.'))continue;
 if(registered.has(e.name))continue;
 if(!/^[a-z][a-z0-9-]{1,48}$/.test(e.name))throw new Error('Unexpected project folder: '+e.name);
 const mf=path.join(dir,e.name,'motiongraphic-video.json');
 if(!fs.existsSync(mf))throw new Error('Folder has no manifest, review manually: projects/'+e.name);
 const m=JSON.parse(fs.readFileSync(mf,'utf8'));
 if(m.slug!==e.name)throw new Error('Manifest slug mismatch: '+e.name);
 choices.push(e.name);
}
console.log(`[RETIRED PROJECTS] ${choices.length} folder not listed in catalog (${apply?'APPLY':'PREVIEW'}).`);
for(const name of choices)console.log('  '+(apply?'MOVE':'CANDIDATE')+' projects/'+name);
if(!apply){console.log('No changes. To archive these folders OUTSIDE the Master: npm run retire:unregistered -- --apply');process.exit(0)}
if(!choices.length)process.exit(0);
const external=path.join(exportRoot(),'RetiredProjects');
fs.mkdirSync(external,{recursive:true});
for(const name of choices){
 const source=path.join(dir,name);
 if(registered.has(name))throw Error('Project became active before move: '+name);
 const stamp=new Date().toISOString().replace(/[:.]/g,'-');
 const dst=path.join(external,name+'-'+stamp);
 if(fs.existsSync(dst))throw Error('Backup target exists: '+dst);
 // A rename on the same volume is atomic: all source files are preserved.
 // On cross-volume moves, fail safely instead of copy+delete.
 fs.renameSync(source,dst);
 console.log('  ARCHIVED '+name+' -> '+dst);
}
console.log('[RETIRED PROJECTS] Source preserved outside Master; run npm run check:sync.');
