#!/usr/bin/env node
/** Source of truth: projects/<slug>/motiongraphic-video.json. No legacy src/videos registration. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {validateAddon} from './validate-addon.mjs';
import {fileURLToPath} from 'node:url';
import {captureStudioProps,saveGeneratedState} from './studio-props-bridge.mjs';
import {registerMissingSceneSegments} from './register-scene-segments.mjs';
import {ensureProjectProductionDocs} from './production-scope.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const PROJECTS=path.join(ROOT,'projects');
const ROOT_FILE=path.join(ROOT,'src','Root.tsx');
const CATALOG_FILE=path.join(ROOT,'library','catalog.json');
const assert=(x,msg)=>{if(!x)throw Error(msg)};
const js=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const folderName=(title,slug)=>{
 const readable=title.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
 return readable||slug;
};
const safeRel=s=>typeof s==='string'&&s.length>0&&!path.isAbsolute(s)&&!s.includes('\\')&&s.split('/').every(t=>t&&t!=='.'&&t!=='..')&&/^[A-Za-z0-9_./-]+$/.test(s);
function files(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
  assert(!x.isSymbolicLink(),'Symlink tidak diizinkan: '+path.join(dir,x.name));
  const p=path.join(dir,x.name);
  return x.isDirectory()?files(p):x.isFile()?[p]:[];
 });
}
// Mirrors are generated independently; stage and rename so no half-copied asset is visible.
const assetChanges=[];
function syncAssets(project,slug){
 const base=path.join(ROOT,'public/videos'),mirror=path.join(base,slug);
 fs.mkdirSync(base,{recursive:true});
 const tag=process.pid+'-'+Date.now();
 const next=path.join(base,'.stage-'+slug+'-'+tag),old=path.join(base,'.backup-'+slug+'-'+tag);
 try{
  fs.mkdirSync(next,{recursive:true});
  const origin=path.join(project,'public');
  if(fs.existsSync(origin))for(const file of files(origin)){
   const relative=path.relative(origin,file),target=path.join(next,relative);
   fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(file,target);
  }
  const hadOld=fs.existsSync(mirror);
  if(hadOld)fs.renameSync(mirror,old);
  try{fs.renameSync(next,mirror)}catch(e){if(hadOld)fs.renameSync(old,mirror);throw e}
  assetChanges.push({mirror,old,hadOld});
 }finally{if(fs.existsSync(next))fs.rmSync(next,{recursive:true,force:true})}
}
function preflightAllProjects(){
 if(!fs.existsSync(PROJECTS))return;
 for(const entry of fs.readdirSync(PROJECTS,{withFileTypes:true})){
  if(!entry.isDirectory()||entry.name.startsWith('_')||entry.name.startsWith('.'))continue;
  const dir=path.join(PROJECTS,entry.name);
  const result=validateAddon(dir,{root:ROOT,sourceCheck:false});
  assert(result.ok,`Preflight project ${entry.name} gagal: ${result.errors.join('; ')}`);
 }
}
// Save generated files and manifest state; restore on failure without touching video scene source.
function rollbackSnapshot(){
 const registry=[ROOT_FILE,CATALOG_FILE,path.join(ROOT,'library','.studio-generated-state.json')];
 if(fs.existsSync(PROJECTS))for(const d of fs.readdirSync(PROJECTS,{withFileTypes:true})){
  if(!d.isDirectory()||d.name.startsWith('_')||d.name.startsWith('.'))continue;
  registry.push(path.join(PROJECTS,d.name,'motiongraphic-video.json'));
  registry.push(path.join(PROJECTS,d.name,'src/config/narration.json'));
 }
 return registry.map(file=>({file,bytes:fs.existsSync(file)?fs.readFileSync(file):null}));
}
function restoreSnapshot(snapshot){
 for(const {file,bytes} of snapshot){
  if(bytes===null)fs.rmSync(file,{force:true});
  else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,bytes)}
 }
}
function finishAssets(commit){
 for(const ch of assetChanges.reverse()){
  if(!commit){
   fs.rmSync(ch.mirror,{recursive:true,force:true});
   if(ch.hadOld&&fs.existsSync(ch.old))fs.renameSync(ch.old,ch.mirror);
  }else if(ch.hadOld)fs.rmSync(ch.old,{recursive:true,force:true});
 }
 assetChanges.length=0;
}
function archiveContains(slug,id){
 const trash=path.join(ROOT,'library','sampah');
 if(!fs.existsSync(trash))return false;
 return fs.readdirSync(trash,{withFileTypes:true}).filter(x=>x.isDirectory()).some(x=>{
  const file=path.join(trash,x.name,'restore.json');
  if(!fs.existsSync(file))return false;
  try{const data=js(file);return data.type==='folder'&&data.video?.id===id&&data.projectDir===`projects/${slug}`&&fs.existsSync(path.join(trash,x.name,'project','motiongraphic-video.json'))}
  catch{return false}
 });
}
function preflightProjectSafety(old){
 // Must run BEFORE captureStudioProps() and any source/catalog/asset mutation.
 const currentIds=new Set();
 for(const entry of fs.existsSync(PROJECTS)?fs.readdirSync(PROJECTS,{withFileTypes:true}):[]){
  if(!entry.isDirectory()||entry.name.startsWith('_')||entry.name.startsWith('.'))continue;
  const m=path.join(PROJECTS,entry.name,'motiongraphic-video.json');
  if(fs.existsSync(m))currentIds.add(js(m).id); // Preserve ID across legitimate rename.
 }
 const missing=old.videos.filter(v=>v.projectDir&&!currentIds.has(v.id)&&!archiveContains(v.slug,v.id));
 assert(!missing.length,
   'SYNC DIBATALKAN untuk melindungi project hilang (bukan arsip): '+missing.map(v=>v.slug).join(', ')+
   '. Pulihkan folder projects/<slug> dari backup terlebih dahulu. Katalog/Root/asset belum diubah.');
}
function initialNarration(project,m){
 const file=path.join(project,'src','config','narration.json');
 if(fs.existsSync(file))return;
 const segments=m.segments?.length?m.segments.map(s=>({
  scene:s.title,startFrame:s.startFrame,endFrame:s.startFrame+s.durationInFrames,text:''
 })):[{scene:'FULL',startFrame:0,endFrame:m.durationInFrames,text:''}];
 fs.mkdirSync(path.dirname(file),{recursive:true});
 fs.writeFileSync(file,JSON.stringify({schemaVersion:1,status:'draft',beats:segments},null,2)+'\n');
 console.log(`[VO GUIDE] Template naskah dibuat: projects/${m.slug}/src/config/narration.json (isi text sebelum preview guide).`);
}
function readNarration(project,m){
 const file=path.join(project,'src','config','narration.json');
 if(!fs.existsSync(file))return [];
 const data=js(file);
 assert(data.schemaVersion===1&&Array.isArray(data.beats),`Format narration.json tidak valid: ${m.slug}`);
 let prev=0;
 for(const [i,b] of data.beats.entries()){
  assert(typeof b.scene==='string'&&typeof b.text==='string',`Narration beat ${i} perlu scene dan text: ${m.slug}`);
  assert(Number.isInteger(b.startFrame)&&Number.isInteger(b.endFrame)&&b.startFrame===prev&&b.endFrame>b.startFrame&&b.endFrame<=m.durationInFrames,
   `Timing narration beat ${i} tidak berurutan / melebihi durasi: ${m.slug}`);
  prev=b.endFrame;
 }
 assert(!data.beats.length||prev===m.durationInFrames,`Narration ${m.slug} harus menutup semua frame video`);
 return data.beats; // VO Guide tersedia juga untuk template kosong (editable melalui Props).
}
function main(){
 assert(!fs.existsSync(path.join(ROOT,'motiongraphic-video.json')),'Manifest video ditemukan di ROOT Studio; pindahkan folder video utuh ke projects/<slug>/');
 fs.mkdirSync(PROJECTS,{recursive:true});
 const old=fs.existsSync(CATALOG_FILE)?js(CATALOG_FILE):{schemaVersion:1,videos:[]};
 assert(Array.isArray(old.videos),'library/catalog.json tidak valid');
 assert(!old.videos.some(v=>!v.projectDir),'Katalog masih berisi project legacy; migrasikan dulu ke projects/<slug>/');
 preflightProjectSafety(old);
 preflightAllProjects(); // before any capture, auto-registration or source/catalog/asset mutation
 captureStudioProps(ROOT);
 registerMissingSceneSegments(ROOT);
 const dirs=fs.readdirSync(PROJECTS,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.name.startsWith('_')&&!x.name.startsWith('.')).sort((a,b)=>a.name.localeCompare(b.name));
 const entries=[],imports=[],segmentDeclarations=[],comps=[],ids=new Set(),slugs=new Set(),folderNames=new Set(),allCompositions=[];
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
  const projectFolder=folderName(m.studioFolderName||m.title,slug);
  assert(!folderNames.has(projectFolder),`Nama folder sidebar duplikat: ${projectFolder}. Perbarui judul video supaya berbeda.`);
  folderNames.add(projectFolder);
  const rawSegments=m.segments??[];
  assert(Array.isArray(rawSegments),'segments harus array: '+slug);
  const segments=[];
  let nextFrame=0;
  for(const seg of rawSegments){
   assert(seg&&typeof seg==='object'&&!Array.isArray(seg),'Data segmen tidak valid: '+slug);
   assert(/^[A-Za-z][A-Za-z0-9-]{1,75}$/.test(seg.id||''),'ID segmen tidak valid: '+slug);
   assert(!ids.has(seg.id),`ID segmen duplikat: ${seg.id}`);
   assert(typeof seg.title==='string'&&seg.title.trim(),'Judul segmen wajib: '+seg.id);
   assert(Number.isInteger(seg.startFrame)&&seg.startFrame===nextFrame,`Start frame segmen ${seg.id} harus ${nextFrame} (berurutan tanpa celah)`);
   assert(Number.isInteger(seg.durationInFrames)&&seg.durationInFrames>0,`Durasi segmen ${seg.id} tidak valid`);
   nextFrame+=seg.durationInFrames;
   assert(nextFrame<=m.durationInFrames,`Segmen ${seg.id} melampaui durasi video`);
   ids.add(seg.id);
   segments.push({id:seg.id,title:seg.title,startFrame:seg.startFrame,durationInFrames:seg.durationInFrames});
  }
  if(segments.length)assert(nextFrame===m.durationInFrames,`Segmen ${slug} tidak menutupi seluruh video (akhir ${nextFrame}, total ${m.durationInFrames})`);
  const alias='FolderProject_'+slug.replaceAll('-','_');
  const segmentSource=path.join(folder,'src','SegmentVideo.tsx');
  const directSegments=fs.existsSync(segmentSource);
  if(directSegments) assert(/export\s+(?:const|function)\s+SegmentVideo\b/.test(fs.readFileSync(segmentSource,'utf8')),
    `src/SegmentVideo.tsx harus export const SegmentVideo untuk ${slug}`);
  else if(segments.length)console.log(`[EDITOR SCENE INFO] ${slug}: source SegmentVideo.tsx belum ada; segmen tetap preview frame (belum layer langsung).`);
  // Only newly-added projects get a blank narration template. Existing video source stays untouched.
  if(!old.videos.some(v=>v.id===m.id))initialNarration(folder,m);
  const guideBeats=readNarration(folder,m);
  const props=m.defaultProps&&typeof m.defaultProps==='object'&&!Array.isArray(m.defaultProps)?m.defaultProps:{};
  imports.push(`import {${m.exportName} as ${alias}} from '../projects/${slug}/${m.entry.replace(/\.(tsx|jsx)$/,'')}';`);
  if(directSegments)imports.push(`import {SegmentVideo as ${alias}_editable} from '../projects/${slug}/src/SegmentVideo';`);
  const fullAlias=alias+'_full';
  segmentDeclarations.push(`const ${fullAlias} = createFullPreviewComposition(${alias}, ${m.durationInFrames});`);
  const guideAlias=alias+'_voice_guide';
  if(guideBeats.length)segmentDeclarations.push(`const ${guideAlias} = createFullPreviewComposition(${alias}, ${m.durationInFrames}, ${JSON.stringify(guideBeats)});`);
  const fullPart=`          <Composition id=${JSON.stringify(m.id)} component={${fullAlias}} width={${m.width}} height={${m.height}} fps={${m.fps}} durationInFrames={${m.durationInFrames}} defaultProps={${JSON.stringify(props)}} />`;
  const sceneParts=[];
  allCompositions.push({id:m.id,ownerId:m.id,defaultProps:props});
  const guideId=m.id+'VOGuide';
  const guideProps={...props,voiceGuide:{status:'draft',beats:guideBeats}}; // editable di native Studio Props, disimpan ke narration.json
  const guidePart=guideBeats.length?`        <Folder name="VO-Guide"><Composition id=${JSON.stringify(guideId)} component={${guideAlias}} width={${m.width}} height={${m.height}} fps={${m.fps}} durationInFrames={${m.durationInFrames}} defaultProps={${JSON.stringify(guideProps)}} /></Folder>`:null;
  if(guidePart){
   assert(!ids.has(guideId),`ID VO Guide bentrok: ${guideId}`);
   ids.add(guideId);
   allCompositions.push({id:guideId,ownerId:m.id,kind:'voiceGuide',defaultProps:guideProps});
  }
  for(const [i,seg] of segments.entries()){
   const partAlias=alias+'_segment_'+i;
   segmentDeclarations.push(directSegments
     ? `const ${partAlias} = createEditableSegmentComposition(${alias}_editable, ${i});`
     : `const ${partAlias} = createSegmentComposition(${alias}, ${seg.startFrame}, ${seg.durationInFrames});`);
   sceneParts.push(`          <Composition id=${JSON.stringify(seg.id)} component={${partAlias}} width={${m.width}} height={${m.height}} fps={${m.fps}} durationInFrames={${seg.durationInFrames}} defaultProps={${JSON.stringify(props)}} />`);
   allCompositions.push({id:seg.id,ownerId:m.id,defaultProps:props});
  }
  // Dashboard Remotion bawaan: dua folder jelas, tanpa editor/route tambahan.
  // ID composition tetap sama sehingga render, props, dan bookmark existing tidak berubah.
  const parts=[`        <Folder name="Full-Video">`,fullPart,'        </Folder>'];
  if(guidePart)parts.push(guidePart);
  if(sceneParts.length)parts.push('        <Folder name="Scenes">',...sceneParts,'        </Folder>');
  comps.push(`      <Folder name=${JSON.stringify(projectFolder)}>\n${parts.join('\n')}\n      </Folder>`);
  entries.push({id:m.id,slug,title:m.title,width:m.width,height:m.height,fps:m.fps,durationInFrames:m.durationInFrames,assetPrefix:`videos/${slug}`,source:`projects/${slug}/${m.entry}`,projectDir:`projects/${slug}`,exportName:m.exportName,defaultProps:props,segments,...(guidePart?{voiceGuideCompositionId:guideId}:{})});
 }
 const rootText=`import React from 'react';\nimport {Composition, Folder} from 'remotion';\nimport {createSegmentComposition,createEditableSegmentComposition} from './SegmentComposition';\nimport {createFullPreviewComposition} from './FullPreviewComposition';\n// AUTO-FOLDER-IMPORTS:START\n${imports.join('\n')}\n// AUTO-FOLDER-IMPORTS:END\n${segmentDeclarations.join('\n')}\n\n/** AUTO-GENERATED via npm run sync — jangan edit manual. */\nexport const Root: React.FC = () => (\n  <Folder name="Videos">\n    {/* AUTO-FOLDER-COMPOSITIONS:START */}\n${comps.join('\n')}\n    {/* AUTO-FOLDER-COMPOSITIONS:END */}\n  </Folder>\n);\n`;
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
  if(!active.has(name)&&old.videos.some(v=>v.slug===name&&v.projectDir)){
   const mirror=path.join(mirrors,name),oldMirror=path.join(mirrors,'.backup-'+name+'-'+process.pid);
   fs.renameSync(mirror,oldMirror);assetChanges.push({mirror,old:oldMirror,hadOld:true});
  }
 }
 saveGeneratedState(ROOT,rootText,allCompositions);
 for(const {slug} of entries){
  const dir=path.join(PROJECTS,slug);
  syncAssets(dir,slug);
  const manifest=js(path.join(dir,'motiongraphic-video.json'));
  const added=ensureProjectProductionDocs(dir,manifest);
  if(added.length)console.log(`[PRODUCTION SCOPE] ${slug}: ${added.length} file panduan produksi dibuat (tanpa overwrite).`);
 }
 console.log(`[FOLDER SYNC] ${entries.length} folder video, ${allCompositions.length} komposisi (lengkap + segmen); ${changed?'registrasi diperbarui':'sudah sinkron'}.`);
}
let baseline=null;
try{
 baseline=rollbackSnapshot();
 main();
 finishAssets(true);
}catch(e){
 try{finishAssets(false);if(baseline)restoreSnapshot(baseline)}
 catch(rollbackError){console.error('[ROLLBACK ERROR] '+rollbackError.message)}
 console.error('[FOLDER SYNC ERROR] '+e.message);process.exitCode=1;
}
