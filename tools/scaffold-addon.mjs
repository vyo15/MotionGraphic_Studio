#!/usr/bin/env node
/** Optional standardized add-on starter; never installs into active projects automatically. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {validSlug,validateAddon} from './validate-addon.mjs';
import {compactStarterTokens} from './spatial-profiles.mjs';
import {provisionProjectFonts} from './font-library.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let createdPackage=null;
try{
 const [slug,id,...words]=process.argv.slice(2);
 if(!validSlug(slug)||!/^[A-Z][A-Za-z0-9]{2,80}$/.test(id||'')||!words.length)throw Error('Pakai: npm run addon:scaffold -- <slug> <IdUnik> <judul bebas>');
 const title=words.join(' ');
 const packageRoot=path.join(ROOT,'exports/file-change-only',slug);
 const destination=path.join(packageRoot,'projects',slug);
 if(fs.existsSync(packageRoot)||fs.existsSync(path.join(ROOT,'projects',slug)))throw Error('Folder sudah ada; tidak ditimpa: '+slug);
 fs.mkdirSync(path.dirname(packageRoot),{recursive:true});
 fs.mkdirSync(packageRoot);createdPackage=packageRoot;
 fs.mkdirSync(path.dirname(destination),{recursive:true});
 fs.cpSync(path.join(ROOT,'templates/addon-starter'),destination,{recursive:true,force:false,errorOnExist:true});
 const design=path.join(destination,'src/config/design.ts');const tokenText='export const SAFE_AREA = '+JSON.stringify(compactStarterTokens())+' as const;';fs.writeFileSync(design,fs.readFileSync(design,'utf8').replace(/export const SAFE_AREA = [^;]+;/,tokenText));
 const mf=path.join(destination,'motiongraphic-video.json');const manifest=JSON.parse(fs.readFileSync(mf,'utf8'));
 const oldSlug=manifest.slug,oldId=manifest.id;
 Object.assign(manifest,{id,slug,title,productionStage:'draft'});
 manifest.segments=manifest.segments.map(s=>({...s,id:s.id.replace(oldId,id)}));
 const map=path.join(destination,'src/components/SoundAssets.ts');fs.writeFileSync(map,fs.readFileSync(map,'utf8').replaceAll('videos/'+oldSlug+'/','videos/'+slug+'/'));
 fs.writeFileSync(mf,JSON.stringify(manifest,null,2)+'\n');
 provisionProjectFonts(ROOT,destination);
 const v=validateAddon(destination,{root:ROOT,strict:true});
 if(!v.ok)throw Error('Scaffold gagal validasi: '+v.errors.join('; '));
 console.log('[SCAFFOLD] '+packageRoot);
 console.log('Draft contoh kerja; sesuaikan seluruh cerita dan metadata. Paket produksi FILE CHANGE ONLY: projects/<slug>/; copy ke root Master setelah backup.');
}catch(e){if(createdPackage)fs.rmSync(createdPackage,{recursive:true,force:true});console.error('[SCAFFOLD ERROR] '+e.message);process.exitCode=1}
