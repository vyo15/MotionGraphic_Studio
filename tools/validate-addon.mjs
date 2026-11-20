#!/usr/bin/env node
/** Shared, dependency-free, fail-closed validation for incoming ChatGPT add-ons.
 * Static checks are NOT a complete build, TypeScript typecheck or sandbox. */
import fs from 'node:fs';
import path from 'node:path';
import {builtinModules} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const validSlug = (x) => /^[a-z][a-z0-9-]{1,48}$/.test(x || '');
export const validRel = (x) => typeof x === 'string' && x.length > 0 &&
  !path.isAbsolute(x) && !x.includes('\\') &&
  x.split('/').every(y => y && y !== '.' && y !== '..') && /^[\w./-]+$/.test(x);
const isInside = (file, base) => { const r=path.relative(base,file);return r==='' || (!r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r)); };
const assert = (ok,msg) => { if (!ok) throw Error(msg); };
const extCandidates = ['','.ts','.tsx','.js','.jsx','.json','/index.ts','/index.tsx','/index.js','/index.jsx'];
const builtin = new Set([...builtinModules, ...builtinModules.map(x=>'node:'+x)]);
function walk(dir, base, output = []) {
  for (const item of fs.readdirSync(dir,{withFileTypes:true})) {
    const loc=path.join(dir,item.name);
    const st=fs.lstatSync(loc);
    assert(!st.isSymbolicLink(),`Symlink dilarang: ${path.relative(base,loc)}`);
    assert(!['node_modules','.git','dist','build','out','.cache'].includes(item.name),`Artefak build tidak diizinkan: ${item.name}`);
    if (st.isDirectory()) walk(loc,base,output);
    else if(st.isFile()) output.push(loc);
    else throw Error(`Tipe file tidak didukung: ${loc}`);
  }
  return output;
}
export function validateAddon(dir,{root=ROOT,strict=false,sourceCheck=true,matchFolder=true,requireSyntax=false}={}) {
  const errors=[],warnings=[];
  const issue=(type,msg)=>(type==='FAIL'?errors:warnings).push(msg);
  let manifest=null,files=[];
  const base=path.resolve(dir);
  try {
    assert(fs.existsSync(base)&&fs.statSync(base).isDirectory(),'Folder add-on tidak ditemukan');
    const mf=path.join(base,'motiongraphic-video.json');
    assert(fs.existsSync(mf),'motiongraphic-video.json tidak ditemukan');
    manifest=JSON.parse(fs.readFileSync(mf,'utf8'));
    assert(validSlug(manifest.slug),'slug tidak valid');
    assert(!matchFolder||path.basename(base)===manifest.slug,`Nama folder (${path.basename(base)}) harus sama dengan slug (${manifest.slug})`);
    assert(/^[A-Z][A-Za-z0-9]{2,80}$/.test(manifest.id||''),'id tidak valid');
    assert(typeof manifest.title==='string'&&manifest.title.trim().length>0,'title wajib');
    assert(/^[A-Za-z_$][\w$]*$/.test(manifest.exportName||''),'exportName tidak valid');
    assert(validRel(manifest.entry)&&manifest.entry.startsWith('src/')&&/\.(tsx|jsx)$/.test(manifest.entry),'entry tidak valid');
    for(const key of ['width','height','fps','durationInFrames'])assert(Number.isInteger(manifest[key])&&manifest[key]>0,`${key} harus integer > 0`);
    assert(manifest.width<=8192&&manifest.height<=8192&&manifest.fps<=120&&manifest.durationInFrames<=1e6,'Batas dimensi/fps/durasi dilewati');
    assert(!manifest.defaultProps || (typeof manifest.defaultProps==='object' && !Array.isArray(manifest.defaultProps)),'defaultProps harus object');
    assert(fs.existsSync(path.join(base,manifest.entry)),'entry tidak ada');
    if (manifest.contractVersion && manifest.contractVersion!=='1.0.0') issue('FAIL','Versi kontrak tidak didukung: '+manifest.contractVersion);
    if (strict && manifest.contractVersion!=='1.0.0') issue('FAIL','contractVersion 1.0.0 wajib untuk add-on baru');
    files=walk(base,base);
    assert(files.length<=8000,'Terlalu banyak file (>8000)');
    assert(files.reduce((s,f)=>s+fs.statSync(f).size,0)<=1024**3,'Total file >1GiB');
    const needed=['README.md','PANDUAN-EDIT-ASSET.md','src/Video.tsx'];
    for(const f of needed) if(!fs.existsSync(path.join(base,f))) issue(strict?'FAIL':'WARN','File standar tidak ditemukan: '+f);
    if(strict)for(const f of ['src/scenes','src/components','src/animations','src/config'])if(!fs.existsSync(path.join(base,f)))issue('FAIL','Folder standar tidak ditemukan: '+f);
    const host=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
    const allowedDeps=new Set([...Object.keys(host.dependencies||{}),...Object.keys(host.devDependencies||{}),...builtin]);
    const pack=path.join(base,'package.json');
    if(fs.existsSync(pack)){
      const extra=JSON.parse(fs.readFileSync(pack,'utf8'));
      for(const d of Object.keys({...extra.dependencies,...extra.devDependencies}))if(!allowedDeps.has(d))issue('FAIL','Dependency tambahan tidak tersedia di Master: '+d);
    }
    const catalogFile=path.join(root,'library/catalog.json');
    if(fs.existsSync(catalogFile)){
      const cat=JSON.parse(fs.readFileSync(catalogFile,'utf8'));
      for(const p of cat.videos||[])if(p.id===manifest.id&&p.slug!==manifest.slug||p.slug===manifest.slug&&p.id!==manifest.id)issue('FAIL','ID/slug sudah terpakai oleh project lain: '+p.id);
    }
    const source=files.filter(x=>/\.(tsx?|jsx?)$/.test(x));
    let ts=null;
    if(sourceCheck){
      try{ts=require('typescript')}
      catch{issue(requireSyntax?'FAIL':'WARN','TypeScript belum terpasang; parsing sintaks/tipe penuh belum bisa diverifikasi')}
    }
    const refs=[];
    if(sourceCheck)for(const file of source){
      const text=fs.readFileSync(file,'utf8');
      const relative=path.relative(base,file).split(path.sep).join('/');
      if(ts){
        const kind=file.endsWith('.tsx')||file.endsWith('.jsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS;
        const parsed=ts.createSourceFile(relative,text,ts.ScriptTarget.Latest,true,kind);
        for(const d of parsed.parseDiagnostics)issue('FAIL',`Kesalahan sintaks ${relative}: ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`);
      }
      if(file===path.join(base,manifest.entry)){
        const esc=manifest.exportName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
        const exported=new RegExp(`\\bexport\\s+(?:const|function|class)\\s+${esc}\\b|\\bexport\\s*\\{[^}]*\\b${esc}\\b`);
        if(!exported.test(text))issue('FAIL',`Export ${manifest.exportName} tidak ditemukan di ${relative}`);
      }
      const imports=[...text.matchAll(/(?:\bfrom\s*|\bimport\s*|\brequire\s*\()\s*['"]([^'"\n]+)['"]/g)].map(m=>m[1]);
      for(const imp of imports){
        if(imp.startsWith('.')){
          const dest=path.resolve(path.dirname(file),imp);
          if(!isInside(dest,base))issue('FAIL',`Import melintasi batas add-on (${relative}): ${imp}`);
          else if(!extCandidates.some(ext=>fs.existsSync(dest+ext)))issue('FAIL',`Import relatif tidak ditemukan (${relative}): ${imp}`);
        } else if(!imp.startsWith('node:')){
          const bare=imp.startsWith('@')?imp.split('/').slice(0,2).join('/'):imp.split('/')[0];
          if(!allowedDeps.has(bare)&&!allowedDeps.has(imp))issue('FAIL',`Import package belum tersedia (${relative}): ${imp}`);
        }
      }
      for(const m of text.matchAll(/staticFile\(\s*['"]([^'"`]+)['"]\s*\)/g)){
        const ref=m[1];
        if(!validRel(ref))issue('FAIL',`staticFile path tidak aman (${relative}): ${ref}`);
        else if(ref.startsWith(`videos/${manifest.slug}/`))refs.push(ref.slice(`videos/${manifest.slug}/`.length));
        else refs.push(ref);
      }
    }
    for(const ref of refs)if(!fs.existsSync(path.join(base,'public',ref)))issue('WARN',`Aset tidak ditemukan (mungkin dibuat oleh tool lain): public/${ref}`);
    if(sourceCheck && !source.length)issue('FAIL','Tidak ada source TS/JS');
    if(strict && sourceCheck && !refs.length)issue('WARN','Tidak ada staticFile literal; abaikan bila proyek tanpa media eksternal');
  }catch(e){issue('FAIL',e.message)}
  return {ok:!errors.length,errors,warnings,manifest,files:files.length,dir:base};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2),strict=args.includes('--strict');
  const dir=args.find(a=>!a.startsWith('--'));
  if(!dir){console.error('Pakai: node tools/validate-addon.mjs <folder-addon> [--strict]');process.exit(2)}
  const r=validateAddon(dir,{strict,requireSyntax:args.includes('--syntax')});
  for(const msg of r.errors)console.error('[FAIL] '+msg);
  for(const msg of r.warnings)console.warn('[WARN] '+msg);
  console.log(`[ADDON] ${r.ok?'VALID':'GAGAL'}: ${r.manifest?.slug||dir}; ${r.files} file; ${r.errors.length} FAIL, ${r.warnings.length} WARN`);
  if(!r.ok)process.exitCode=1;
}
