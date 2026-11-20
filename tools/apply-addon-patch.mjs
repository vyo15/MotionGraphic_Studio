#!/usr/bin/env node
/** Conflict-safe patch. Never overwrites unrelated files or projects. Includes rollback. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {inspectZip} from './zip-preflight.mjs';
import {validateAddon,validRel,validSlug} from './validate-addon.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=f=>createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const assert=(v,m)=>{if(!v)throw Error(m)};
const inside=(p,base)=>{const r=path.relative(base,p);return r && !r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r)};
function safePath(base,rel){
  assert(validRel(rel),`Path patch tidak aman: ${rel}`);
  assert(!['.git','node_modules','dist','out','build'].some(s=>rel.split('/').includes(s)),`Patch mengarah ke folder terlarang: ${rel}`);
  const p=path.resolve(base,rel);assert(inside(p,base),`Path keluar project: ${rel}`);
  let current=base;
  for(const part of rel.split('/')){current=path.join(current,part);if(fs.existsSync(current))assert(!fs.lstatSync(current).isSymbolicLink(),`Symlink dilarang: ${rel}`)}
  return p;
}
export function applyPatch(folder,{root=ROOT,dryRun=false}={}){
  let extraction=null;
  const input=path.resolve(folder);
  let patchBase=input;
  if(fs.existsSync(input)&&fs.statSync(input).isFile()){
    assert(input.toLowerCase().endsWith('.zip'),'Patch harus folder atau ZIP');
    inspectZip(input);
    extraction=fs.mkdtempSync(path.join(os.tmpdir(),'mg-patch-zip-'));
    try{
      if(process.platform==='win32'){
        const esc=x=>x.replace(/'/g,"''");
        execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',`Expand-Archive -LiteralPath '${esc(input)}' -DestinationPath '${esc(extraction)}' -Force`],{timeout:180000});
      }else execFileSync('unzip',['-q',input,'-d',extraction],{timeout:180000});
      const direct=path.join(extraction,'addon-patch.json');
      if(fs.existsSync(direct))patchBase=extraction;
      else{
        const dirs=fs.readdirSync(extraction,{withFileTypes:true}).filter(x=>x.isDirectory());
        assert(dirs.length===1&&fs.existsSync(path.join(extraction,dirs[0].name,'addon-patch.json')),'ZIP patch harus berisi tepat satu folder dengan addon-patch.json');
        patchBase=path.join(extraction,dirs[0].name);
      }
    }catch(e){fs.rmSync(extraction,{recursive:true,force:true});throw e}
  }
  try{return applyDirectoryPatch(patchBase,{root,dryRun})}
  finally{if(extraction)fs.rmSync(extraction,{recursive:true,force:true})}
}
function applyDirectoryPatch(folder,{root,dryRun}){
  const base=path.resolve(folder),config=path.join(base,'addon-patch.json');
  assert(fs.existsSync(config),'addon-patch.json tidak ditemukan');
  const patch=JSON.parse(fs.readFileSync(config,'utf8'));
  assert(patch.schemaVersion===1,'schemaVersion patch harus 1');
  assert(validSlug(patch.slug),'slug patch tidak valid');
  assert(Array.isArray(patch.files)&&patch.files.length>0&&patch.files.length<2000,'files patch tidak valid');
  const project=path.join(root,'projects',patch.slug);
  assert(fs.existsSync(path.join(project,'motiongraphic-video.json')),'Target project tidak ada');
  const mf=JSON.parse(fs.readFileSync(path.join(project,'motiongraphic-video.json'),'utf8'));
  assert(mf.slug===patch.slug, 'Slug manifest tidak sesuai');
  if(patch.id)assert(patch.id===mf.id,'ID project berubah; revisi ditolak');
  const plan=[],seen=new Set();
  for(const f of patch.files){
    assert(f&&typeof f==='object','Item patch harus object');
    assert(!seen.has(f.path),`Duplikat file di patch: ${f.path}`);seen.add(f.path);
    assert(f.path!=='motiongraphic-video.json' || f.operation==='write','Manifest tidak boleh dihapus');
    assert(f.operation==='write'||f.operation==='delete','Operasi patch tidak dikenal');
    const dest=safePath(project,f.path);const exists=fs.existsSync(dest);
    assert(!exists || fs.statSync(dest).isFile(),`Target bukan file: ${f.path}`);
    assert((f.expectedSha256===null && !exists) || (typeof f.expectedSha256==='string'&&exists&&sha(dest)===f.expectedSha256),
      `KONFLIK: ${f.path}. Berubah di PC atau expectedSha256 keliru; tidak ada file diubah.`);
    let source=null;
    if(f.operation==='write'){
      assert(validRel(f.source||'')&&f.source.startsWith('files/'),'source file patch harus di files/');
      source=safePath(base,f.source);
      assert(fs.existsSync(source)&&fs.statSync(source).isFile(),`Payload tidak ditemukan: ${f.source}`);
      assert(/^[a-f0-9]{64}$/.test(f.sha256||'')&&sha(source)===f.sha256,`Hash payload berbeda: ${f.path}`);
    }else assert(exists,'File yang ingin dihapus tidak ditemukan');
    plan.push({...f,dest,source,exists});
  }
  if(dryRun)return {slug:patch.slug,files:plan.map(p=>({operation:p.operation,path:p.path})),applied:false};
  const tag=new Date().toISOString().replace(/[:.]/g,'-')+'-'+process.pid;
  const backup=path.join(root,'library/backups/addon-patches',`${patch.slug}-${tag}`);
  const staging=fs.mkdtempSync(path.join(os.tmpdir(),'mg-patch-'));
  const done=[];
  try{
    // Pre-stage all payload before writing to a project.
    for(const [i,p] of plan.entries())if(p.source){p.staged=path.join(staging,String(i));fs.copyFileSync(p.source,p.staged)}
    // Backup all originals outside the target project for reversal.
    for(const p of plan)if(p.exists){const b=safePath(backup,p.path);fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(p.dest,b)}
    for(const p of plan){
      fs.mkdirSync(path.dirname(p.dest),{recursive:true});
      if(p.operation==='delete')fs.unlinkSync(p.dest);
      else {const tmp=p.dest+'.mg-patch-'+process.pid+'.tmp';fs.copyFileSync(p.staged,tmp);fs.renameSync(tmp,p.dest)}
      done.push(p);
    }
    // Revalidate manifest and source references before considering a patch committed.
    const v=validateAddon(project,{root,matchFolder:true});
    assert(v.ok,'Hasil patch tidak valid: '+v.errors.join('; '));
    fs.mkdirSync(backup,{recursive:true});
    fs.writeFileSync(path.join(backup,'APPLIED.json'),JSON.stringify({schemaVersion:1,slug:patch.slug,files:plan.map(({operation,path,expectedSha256,sha256})=>({operation,path,expectedSha256,sha256}))},null,2)+'\n');
    return {slug:patch.slug,files:plan.map(p=>({operation:p.operation,path:p.path})),applied:true,backup};
  }catch(e){
    for(const p of done.reverse()){
      const b=safePath(backup,p.path);
      if(p.exists&&fs.existsSync(b)){fs.mkdirSync(path.dirname(p.dest),{recursive:true});fs.copyFileSync(b,p.dest)}
      else fs.rmSync(p.dest,{force:true});
    }
    throw e;
  }finally{fs.rmSync(staging,{recursive:true,force:true})}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const args=process.argv.slice(2),folder=args.find(x=>!x.startsWith('--'));
    assert(folder,'Pakai: node tools/apply-addon-patch.mjs <folder-patch> [--dry-run]');
    const result=applyPatch(folder,{dryRun:args.includes('--dry-run')});
    console.log(`[PATCH] ${result.applied?'BERHASIL':'DRY-RUN'}: ${result.slug}`);
    for(const p of result.files)console.log('  '+p.operation+' '+p.path);
    if(result.backup)console.log('[BACKUP] '+result.backup);
  }catch(e){console.error('[PATCH DIBATALKAN] '+e.message);process.exitCode=1}
}
