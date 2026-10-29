#!/usr/bin/env node
/** Import ZIP/folder add-on ke projects/<slug>/, tidak lagi menaruh source di src/videos. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
const safeRel=s=>typeof s==='string'&&s.length>0&&!path.isAbsolute(s)&&!s.includes('\\')&&s.split('/').every(x=>x&&x!=='.'&&x!=='..')&&/^[A-Za-z0-9_./-]+$/.test(s);
const files=dir=>!fs.existsSync(dir)?[]:fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  assert(!e.isSymbolicLink(),'Symlink dilarang: '+e.name);
  const p=path.join(dir,e.name);return e.isDirectory()?files(p):e.isFile()?[p]:[];
});
function unpack(input){
  if(fs.statSync(input).isDirectory())return {dir:input,clear:()=>{}};
  assert(input.toLowerCase().endsWith('.zip'),'Harus .zip atau folder add-on');
  assert(fs.statSync(input).size<1024*1024*1024,'ZIP terlalu besar');
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-import-'));
  try{
    if(process.platform==='win32'){
      const q=s=>s.replace(/'/g,"''");
      execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',`Expand-Archive -LiteralPath '${q(input)}' -DestinationPath '${q(tmp)}' -Force`],{timeout:180000});
    }else{
      const entries=execFileSync('unzip',['-Z','-1',input],{encoding:'utf8'}).split(/\r?\n/).filter(Boolean);
      assert(entries.every(p=>!p.startsWith('/')&&!p.includes('\\')&&!p.split('/').includes('..')),'Path ZIP tidak aman');
      execFileSync('unzip',['-q',input,'-d',tmp],{timeout:180000});
    }
    let dir=tmp;
    if(!fs.existsSync(path.join(dir,'motiongraphic-video.json'))){
      const dirs=fs.readdirSync(dir,{withFileTypes:true}).filter(e=>e.isDirectory());
      assert(dirs.length===1&&fs.existsSync(path.join(dir,dirs[0].name,'motiongraphic-video.json')),'ZIP bukan add-on (harus punya satu folder dengan manifest)');
      dir=path.join(dir,dirs[0].name);
    }
    const payload=files(dir);
    assert(payload.length<8000&&payload.reduce((s,f)=>s+fs.statSync(f).size,0)<1024**3,'Isi ZIP terlalu besar');
    return {dir,clear:()=>fs.rmSync(tmp,{recursive:true,force:true})};
  }catch(e){fs.rmSync(tmp,{recursive:true,force:true});throw e}
}
try{
  assert(process.argv[2],'Penggunaan: node tools/import-video.mjs <path-video.zip>');
  const input=path.resolve(process.argv[2]);
  assert(fs.existsSync(input),'File tidak ditemukan: '+input);
  const {dir,clear}=unpack(input);
  let staging,committed;
  try{
    const manifest=JSON.parse(fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8'));
    const m=manifest;
    assert(/^[a-z][a-z0-9-]{1,48}$/.test(m.slug||''),'slug tidak valid');
    assert(/^[A-Z][A-Za-z0-9]{2,80}$/.test(m.id||''),'id komposisi tidak valid');
    assert(typeof m.title==='string'&&m.title.trim(),'Judul tidak ada');
    assert(/^[A-Za-z_$][\w$]*$/.test(m.exportName||''),'exportName tidak valid');
    assert(safeRel(m.entry)&&m.entry.startsWith('src/')&&/\.(tsx|jsx)$/.test(m.entry),'entry tidak valid');
    for(const k of ['width','height','fps','durationInFrames'])assert(Number.isInteger(m[k])&&m[k]>0,k+' tidak valid');
    assert(fs.existsSync(path.join(dir,m.entry)),'Entry tidak ditemukan');
    const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'library/catalog.json'),'utf8'));
    assert(!catalog.videos.some(v=>v.id===m.id&&v.slug!==m.slug||v.id!==m.id&&v.slug===m.slug),'ID/slug bentrok; project lama aman');
    const target=path.join(ROOT,'projects',m.slug);
    if(fs.existsSync(target)){
      console.log('[LEWATI] Project sudah ada, tidak ditimpa: '+m.slug);
    }else{
      const all=files(dir);
      assert(!all.some(f=>path.relative(dir,f).split(path.sep).some(seg=>['node_modules','.git'].includes(seg))),'Paket berisi node_modules/.git');
      if(fs.existsSync(path.join(dir,'package.json'))){
        const deps=JSON.parse(fs.readFileSync(path.join(dir,'package.json'),'utf8')).dependencies||{};
        const host=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
        for(const name of Object.keys(deps))assert(Object.hasOwn({...host.dependencies,...host.devDependencies},name),'Dependency belum ada: '+name);
      }
      staging=fs.mkdtempSync(path.join(ROOT,'projects','_importing-'));
      fs.cpSync(dir,staging,{recursive:true,force:true,filter:p=>{
        if(fs.lstatSync(p).isSymbolicLink())throw Error('Symlink dilarang: '+p);
        return true;
      }});
      // Dukungan ZIP lama dengan staticFile('audio/xxx'): sesuaikan ke mirror asset folder-first.
      for(const file of files(path.join(staging,'src')).filter(f=>/\.[jt]sx?$/.test(f))){
        const original=fs.readFileSync(file,'utf8');
        const updated=original.replace(/staticFile\(\s*(['"])([^'"`]+)\1\s*\)/g,(raw,q,s)=>{
          assert(safeRel(s),'staticFile path tidak aman: '+s);
          return `staticFile(${q}${s.startsWith('videos/'+m.slug+'/')?s:'videos/'+m.slug+'/'+s}${q})`;
        });
        if(original!==updated)fs.writeFileSync(file,updated);
      }
      fs.renameSync(staging,target);committed=target;staging=null;
      const r=spawnSync(process.execPath,[path.join(ROOT,'tools/sync-projects.mjs')],{cwd:ROOT,stdio:'inherit'});
      if(r.status!==0){fs.renameSync(target,path.join(ROOT,'projects','_failed-'+m.slug));committed=null;throw Error('Sync gagal; source dipindah ke projects/_failed-'+m.slug+' untuk diperbaiki, video lain aman.');}
      console.log('[BERHASIL] Project aktif di projects/'+m.slug+' ['+m.id+']');
    }
  }finally{
    if(staging&&fs.existsSync(staging))fs.rmSync(staging,{recursive:true,force:true});
    clear();
  }
}catch(e){console.error('[ERROR IMPORT] '+e.message);process.exitCode=1}
