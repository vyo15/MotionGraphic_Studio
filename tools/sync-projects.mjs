#!/usr/bin/env node
/** Source of truth: projects/<slug>/motiongraphic-video.json. No legacy src/videos registration. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {captureStudioProps,saveGeneratedState} from './studio-props-bridge.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const PROJECTS=path.join(ROOT,'projects');
const ROOT_FILE=path.join(ROOT,'src','Root.tsx');
const CATALOG_FILE=path.join(ROOT,'library','catalog.json');
const assert=(x,msg)=>{if(!x)throw Error(msg)};
const js=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const safeRel=s=>typeof s==='string'&&s.length>0&&!path.isAbsolute(s)&&!s.includes('\\')&&s.split('/').every(t=>t&&t!=='.'&&t!=='..')&&/^[A-Za-z0-9_./-]+$/.test(s);
function files(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
  assert(!x.isSymbolicLink(),'Symlink tidak diizinkan: '+path.join(dir,x.name));
  const p=path.join(dir,x.name);
  return x.isDirectory()?files(p):x.isFile()?[p]:[];
 });
}
function syncAssets(project,slug){
 const origin=path.join(project,'public'),mirror=path.join(ROOT,'public/videos',slug);
 fs.mkdirSync(mirror,{recursive:true});
 const source=files(origin),names=new Set();
 for(const file of source){
  const rel=path.relative(origin,file);names.add(rel);
  const out=path.join(mirror,rel);fs.mkdirSync(path.dirname(out),{recursive:true});
  const a=fs.readFileSync(file),b=fs.existsSync(out)?fs.readFileSync(out):null;
  if(!b||!a.equals(b))fs.writeFileSync(out,a);
 }
 for(const f of files(mirror))if(!names.has(path.relative(mirror,f)))fs.unlinkSync(f);
}
function main(){
 captureStudioProps(ROOT);
 assert(!fs.existsSync(path.join(ROOT,'motiongraphic-video.json')),'Manifest video ditemukan di ROOT Studio; pindahkan folder video utuh ke projects/<slug>/');
 fs.mkdirSync(PROJECTS,{recursive:true});
 const old=fs.existsSync(CATALOG_FILE)?js(CATALOG_FILE):{schemaVersion:1,videos:[]};
 assert(Array.isArray(old.videos),'library/catalog.json tidak valid');
 // Reject data legacy after migration; don't silently keep registrations that lack a source folder.
 assert(!old.videos.some(v=>!v.projectDir),'Katalog masih berisi project legacy; migrasikan dulu ke projects/<slug>/');
 const dirs=fs.readdirSync(PROJECTS,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.name.startsWith('_')&&!x.name.startsWith('.')).sort((a,b)=>a.name.localeCompare(b.name));
 const entries=[],imports=[],comps=[],ids=new Set(),slugs=new Set();
 for(const dir of dirs){
  const slug=dir.name,folder=path.join(PROJECTS,slug),manifest=path.join(folder,'motiongraphic-video.json');
  assert(fs.existsSync(manifest),`Folder projects/${slug} tanpa motiongraphic-video.json`);
  const m=js(manifest);
  assert(/^[a-z][a-z0-9-]{1,48}$/.test(m.slug||'')&&m.slug===slug, `Nama folder dan slug berbeda pada projects/${slug} (slug manifest: ${m.slug}). Jangan ubah manifest manual. Jalankan: npm run rename -- ${m.id} --adopt-folder (mengikuti nama folder), atau npm run rename -- ${m.id} --repair (mengikuti slug manifest).`);
  assert(/^[A-Z][A-Za-z0-9]{2,80}$/.test(m.id||''),'ID komposisi tidak valid: '+m.id);
  assert(typeof m.title==='string'&&m.title.trim(),'title wajib: '+slug);
  assert(/^[A-Za-z_$][\w$]*$/.test(m.exportName||''),'exportName tidak valid: '+slug);
  assert(safeRel(m.entry)&&m.entry.startsWith('src/')&&/\.(tsx|jsx)$/.test(m.entry),'entry source tidak valid: '+slug);
  assert(fs.existsSync(path.join(folder,m.entry)),'File entry tidak ada: '+slug+'/'+m.entry);
  for(const k of ['width','height','fps','durationInFrames'])assert(Number.isInteger(m[k])&&m[k]>0&&m[k]<=100000,'Nilai '+k+' tidak valid: '+slug);
  assert(!ids.has(m.id)&&!slugs.has(slug),'ID atau slug duplikat: '+m.id);ids.add(m.id);slugs.add(slug);
  const host=js(path.join(ROOT,'package.json'));
  const deps=fs.existsSync(path.join(folder,'package.json'))?js(path.join(folder,'package.json')).dependencies||{}:{};
  for(const name of Object.keys(deps))assert(Object.hasOwn({...host.dependencies,...host.devDependencies},name),'Dependency belum di Master: '+name);
  for(const file of files(folder))assert(!path.relative(folder,file).split(path.sep).some(s=>['node_modules','.git','dist'].includes(s)),'Project berisi folder build: '+file);
  const alias='FolderProject_'+slug.replaceAll('-','_');
  const props=m.defaultProps&&typeof m.defaultProps==='object'&&!Array.isArray(m.defaultProps)?m.defaultProps:{};
  imports.push(`import {${m.exportName} as ${alias}} from '../projects/${slug}/${m.entry.replace(/\.(tsx|jsx)$/,'')}';`);
  comps.push(`      <Composition id=${JSON.stringify(m.id)} component={${alias}} width={${m.width}} height={${m.height}} fps={${m.fps}} durationInFrames={${m.durationInFrames}} defaultProps={${JSON.stringify(props)}} />`);
  entries.push({id:m.id,slug,title:m.title,width:m.width,height:m.height,fps:m.fps,durationInFrames:m.durationInFrames,assetPrefix:`videos/${slug}`,source:`projects/${slug}/${m.entry}`,projectDir:`projects/${slug}`,exportName:m.exportName,defaultProps:props});
 }
 const rootText=`import React from 'react';\nimport {Composition, Folder} from 'remotion';\n// AUTO-FOLDER-IMPORTS:START\n${imports.join('\n')}\n// AUTO-FOLDER-IMPORTS:END\n\n/** AUTO-GENERATED via npm run sync — jangan edit manual. */\nexport const Root: React.FC = () => (\n  <Folder name="Videos">\n    {/* AUTO-FOLDER-COMPOSITIONS:START */}\n${comps.join('\n')}\n    {/* AUTO-FOLDER-COMPOSITIONS:END */}\n  </Folder>\n);\n`;
 const catalogText=JSON.stringify({schemaVersion:1,videos:entries},null,2)+'\n';
 const previousRoot=fs.existsSync(ROOT_FILE)?fs.readFileSync(ROOT_FILE,'utf8'):'';
 const previousCatalog=fs.existsSync(CATALOG_FILE)?fs.readFileSync(CATALOG_FILE,'utf8'):'';
 const changed=previousRoot!==rootText||previousCatalog!==catalogText;
 // All project manifests are valid before changing files or mirrors.
 if(changed){
  const backup=path.join(ROOT,'library/backups');fs.mkdirSync(backup,{recursive:true});
  const tag=new Date().toISOString().replace(/[:.]/g,'-');
  if(previousRoot)fs.writeFileSync(path.join(backup,`Root-${tag}.txt`),previousRoot);
  if(previousCatalog)fs.writeFileSync(path.join(backup,`catalog-${tag}.json`),previousCatalog);
  fs.writeFileSync(ROOT_FILE,rootText);fs.writeFileSync(CATALOG_FILE,catalogText);
  // Preserve all historical backups. Pruning is an explicit user action, never implicit.

 }
 const active=new Set(entries.map(v=>v.slug));
 const mirrors=path.join(ROOT,'public/videos');fs.mkdirSync(mirrors,{recursive:true});
 for(const name of fs.readdirSync(mirrors)){
  // Mirrors are generated. Only remove known, previously registered projects that are no longer active.
  if(!active.has(name)&&old.videos.some(v=>v.slug===name&&v.projectDir))fs.rmSync(path.join(mirrors,name),{recursive:true,force:true});
 }
 saveGeneratedState(ROOT,rootText,entries);
 for(const {slug} of entries)syncAssets(path.join(PROJECTS,slug),slug);
 console.log(`[FOLDER SYNC] ${entries.length} folder aktif; ${changed?'registrasi diperbarui':'registrasi sudah sinkron'}.`);
}
try{main()}catch(e){console.error('[FOLDER SYNC ERROR] '+e.message);process.exitCode=1}
