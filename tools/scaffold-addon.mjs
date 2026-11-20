#!/usr/bin/env node
/** Optional standardized add-on starter; never installs into active projects automatically. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {validSlug,validateAddon} from './validate-addon.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{
 const [slug,id,...words]=process.argv.slice(2);
 if(!validSlug(slug)||!/^[A-Z][A-Za-z0-9]{2,80}$/.test(id||'')||!words.length)throw Error('Pakai: npm run addon:scaffold -- <slug> <IdUnik> <judul bebas>');
 const title=words.join(' ');
 const destination=path.join(ROOT,'exports/addons',slug);
 if(fs.existsSync(destination)||fs.existsSync(path.join(ROOT,'projects',slug)))throw Error('Folder sudah ada; tidak ditimpa: '+slug);
 fs.mkdirSync(path.dirname(destination),{recursive:true});
 fs.cpSync(path.join(ROOT,'templates/addon-starter'),destination,{recursive:true,force:false,errorOnExist:true});
 const mf=path.join(destination,'motiongraphic-video.json');const manifest=JSON.parse(fs.readFileSync(mf,'utf8'));
 Object.assign(manifest,{id,slug,title});fs.writeFileSync(mf,JSON.stringify(manifest,null,2)+'\n');
 const v=validateAddon(destination,{root:ROOT,strict:true});
 if(!v.ok)throw Error('Scaffold gagal validasi: '+v.errors.join('; '));
 console.log('[SCAFFOLD] '+destination);
 console.log('Ganti sample scene dengan motion graphic final. Baru salin folder ke projects/ dan sync.');
}catch(e){console.error('[SCAFFOLD ERROR] '+e.message);process.exitCode=1}
