#!/usr/bin/env node
/** Dependency-free audit of production/sound-cues.json; DOES NOT modify audio or scenes. */
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

export function checkSoundCues(projectDir,{strict=false}={}) {
 const issues=[],warnings=[],notes=[];
 const fail=s=>issues.push(s),warn=s=>warnings.push(s);
 const dir=path.resolve(projectDir);
 const mf=path.join(dir,'motiongraphic-video.json');
 if(!fs.existsSync(mf)) return {ok:false,issues:['Manifest tidak ditemukan: '+mf],warnings,notes,cueCount:0};
 let manifest;
 try {manifest=JSON.parse(fs.readFileSync(mf,'utf8'));}
 catch(e){return {ok:false,issues:['Manifest rusak: '+e.message],warnings,notes,cueCount:0};}
 const f=path.join(dir,'production','sound-cues.json');
 if(!fs.existsSync(f))return {ok:true,issues,warnings,notes:['Belum ada sound-cues.json (opsional untuk project lama)'],cueCount:0};
 let doc;
 try {doc=JSON.parse(fs.readFileSync(f,'utf8'));}
 catch(e){return {ok:false,issues:['sound-cues.json rusak: '+e.message],warnings,notes,cueCount:0};}
 if(doc.schemaVersion!==1) fail('schemaVersion harus 1');
 if(!['draft','review','ready','final'].includes(doc.status))fail('status document tidak valid');
 if(!Array.isArray(doc.cues))return {ok:false,issues:['cues harus array'],warnings,notes,cueCount:0};
 const seen=new Set(),frames=manifest.durationInFrames,publicDir=path.join(dir,'public');
 for(let i=0;i<doc.cues.length;i++) {
  const c=doc.cues[i],prefix=`cues[${i}]`;
  if(!c||typeof c!=='object'||Array.isArray(c)){fail(prefix+': cue harus object');continue}
  if(typeof c.id!=='string'||!c.id.trim())fail(prefix+': id wajib');
  else if(seen.has(c.id))fail(prefix+': duplikasi ID '+c.id);
  else seen.add(c.id);
  for(const field of ['scene','action'])if(typeof c[field]!=='string'||!c[field].trim())fail(prefix+': '+field+' wajib');
  for(const key of ['startFrame','impactFrame','endFrame'])if(!Number.isInteger(c[key]))fail(prefix+': '+key+' harus integer frame');
  if(['startFrame','impactFrame','endFrame'].every(x=>Number.isInteger(c[x]))) {
   if(c.startFrame<0||c.startFrame>c.impactFrame||c.impactFrame>c.endFrame||c.endFrame>=frames)fail(prefix+': urutan frame tidak valid atau keluar durasi');
  }
  if(!['planned','ready','omit'].includes(c.status))fail(prefix+': status cue planned/ready/omit');
  if(c.gainDb!==undefined&&(!Number.isFinite(c.gainDb)||c.gainDb< -80||c.gainDb>12))fail(prefix+': gainDb di luar rentang -80..12');
  if(c.status==='omit')continue;
  if(c.status==='planned') {warn(prefix+': SFX masih rencana, belum siap render');continue;}
  const rel=c.file;
  if(typeof rel!=='string'||!/^audio\/sfx\/[A-Za-z0-9_./-]+\.(?:wav|mp3|ogg)$/i.test(rel)||rel.split('/').some(s=>s==='..'||s==='.'||!s)){
   fail(prefix+': file harus path audio/sfx/<nama>.wav|mp3|ogg relatif ke public/');continue;
  }
  const full=path.join(publicDir,...rel.split('/'));
  if(!fs.existsSync(full)||!fs.statSync(full).isFile()){fail(prefix+': aset audio tidak ada: '+rel);continue;}
  if(fs.lstatSync(full).isSymbolicLink()){fail(prefix+': symlink dilarang');continue;}
  if(!fs.realpathSync(full).startsWith(fs.realpathSync(publicDir)+path.sep)){fail(prefix+': aset keluar dari folder public');continue;}
  // Cheap format sanity check, not an actual decode or listening test.
  const stat=fs.statSync(full),fd=fs.openSync(full,'r'),h=Buffer.alloc(12);
  try{fs.readSync(fd,h,0,12,0)}finally{fs.closeSync(fd)}
  const ext=path.extname(full).toLowerCase();
  const okHeader=ext==='.wav'?stat.size>=44&&['RIFF','RF64'].includes(h.toString('ascii',0,4))&&h.toString('ascii',8,12)==='WAVE':
   ext==='.ogg'?stat.size>=64&&h.toString('ascii',0,4)==='OggS':
   ext==='.mp3'?stat.size>=128&&(h.toString('ascii',0,3)==='ID3'||(h[0]===0xff&&(h[1]&0xe0)===0xe0)):false;
  if(!okHeader){fail(prefix+': file audio tidak memiliki header minimum yang sah ('+rel+')');continue;}
  const src=c.source;
  if(!src||typeof src!=='object'||!['own','openverse','real-recording','earshot','licensed-other'].includes(src.kind)){
   fail(prefix+': source.kind wajib dan harus known');continue;
  }
  if(src.kind==='own'||src.kind==='earshot')continue;
  for(const k of ['title','license','sourceUrl'])if(typeof src[k]!=='string'||!src[k].trim())fail(prefix+': source.'+k+' wajib');
  const license=String(src.license||'').toLowerCase();
  if(/(?:by-nc|nc-|noncommercial|non-commercial)/.test(license)&&src.extraCommercialPermission!==true)fail(prefix+': NC tidak otomatis boleh untuk konten komersial');
  if(license.includes('by')&&license!=='cc0'&&(!src.attribution||typeof src.attribution!=='string'))fail(prefix+': atribusi lisensi BY harus dicatat');
  if(src.kind==='openverse'&&(!src.licenseUrl||typeof src.licenseUrl!=='string'))fail(prefix+': Openverse harus mencatat licenseUrl');
 }
 if(strict&&warnings.length)issues.push(...warnings.map(w=>'STRICT: '+w));
 return {ok:issues.length===0,issues,warnings,notes,cueCount:doc.cues.length};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const args=process.argv.slice(2),dir=args.find(x=>!x.startsWith('--'));
 if(!dir){console.error('Pakai: node tools/qa-sound-cues.mjs projects/<slug> [--strict] [--json]');process.exit(2)}
 const r=checkSoundCues(dir,{strict:args.includes('--strict')});
 if(args.includes('--json'))console.log(JSON.stringify(r,null,2));
 else {console.log(`[QA SFX] ${r.ok?'PASS':'FAIL'} · ${r.cueCount} cue`);for(const s of r.notes)console.log('INFO  '+s);for(const s of r.warnings)console.log('WARN  '+s);for(const s of r.issues)console.error('FAIL  '+s)}
 if(!r.ok)process.exitCode=1;
}
