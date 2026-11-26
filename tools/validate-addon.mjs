#!/usr/bin/env node
/** Validate folder-first ChatGPT add-ons without altering the Master or projects.
 * Strict validates contract and local assets. It does NOT prove bundling/rendering.
 * --syntax additionally REQUIRES TypeScript to parse the source; without it the result is FAIL.
 */
import fs from 'node:fs';
import path from 'node:path';
import {builtinModules,createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {validateMotionPlan} from './qa-motion-plan.mjs';
import {validateSpatial} from './qa-spatial.mjs';
const require=createRequire(import.meta.url);
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const validSlug=s=>/^[a-z][a-z0-9-]{1,48}$/.test(s||'');
export const validRel=s=>typeof s==='string'&&s.length>0&&!path.isAbsolute(s)&&!s.includes('\\')&&!s.includes('\0')&&
  s.split('/').every(t=>t&&t!=='.'&&t!=='..')&&/^[A-Za-z0-9_./-]+$/.test(s);
const assert=(v,msg)=>{if(!v)throw Error(msg)};
const inside=(p,base)=>{const r=path.relative(base,p);return r===''||(!r.startsWith('..'+path.sep)&&r!=='..'&&!path.isAbsolute(r))};
const extensions=['','.mjs','.mts','.ts','.tsx','.js','.jsx','.json','/index.ts','/index.tsx','/index.js','/index.jsx'];
const builtins=new Set([...builtinModules,...builtinModules.map(s=>'node:'+s)]);
const forbiddenDirs=new Set(['node_modules','.git','dist','build','out','.cache']);
function walk(dir,base,output=[]){
 for(const item of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,item.name),st=fs.lstatSync(file);
  assert(!st.isSymbolicLink(),`Symlink dilarang: ${path.relative(base,file)}`);
  assert(!forbiddenDirs.has(item.name),`Artefak build tidak diizinkan: ${item.name}`);
  if(st.isDirectory())walk(file,base,output);
  else if(st.isFile())output.push(file);
  else throw Error('Tipe file tidak didukung: '+file);
 }
 return output;
}
const matchesLocal=(dest)=>extensions.some(ext=>fs.existsSync(dest+ext)&&fs.statSync(dest+ext).isFile());
const supportedBare=(s,allowed)=>{
 if(builtins.has(s))return true;
 const pkg=s.startsWith('@')?s.split('/').slice(0,2).join('/'):s.split('/')[0];
 return allowed.has(pkg)||allowed.has(s);
};
function refsFromSource(text){
 // Literal imports: static named/default, side effect, import('...'), require('...').
 const imports=[];
 for(const re of [
  /\b(?:import|export)\s+(?:[\s\S]*?\s+from\s*)?['"]([^'"\n]+)['"]/g,
  /\bimport\s*\(\s*['"]([^'"\n]+)['"]\s*\)/g,
  /\brequire\s*\(\s*['"]([^'"\n]+)['"]\s*\)/g,
 ])for(const m of text.matchAll(re))imports.push(m[1]);
 // Dynamic imports with expressions cannot be resolved through static inspection.
 const unresolved=[...text.matchAll(/\bimport\s*\(\s*([^\n)]*)\)/g)].map(m=>m[1].trim()).filter(s=>!/^([\'"])[^\'"\n]+\1$/.test(s));
 const staticFiles=[...text.matchAll(/\bstaticFile\s*\(\s*['"]([^'"\n]+)['"]\s*\)/g)].map(m=>m[1]);
 const dynamicFiles=[...text.matchAll(/\bstaticFile\s*\(\s*([^\n)]*)\)/g)].map(m=>m[1].trim()).filter(s=>!/^([\'"])[^\'"\n]+\1$/.test(s));
 return {imports,unresolved,staticFiles,dynamicFiles};
}
/** AST path when TypeScript is available; avoids treating comments/strings as imports. */
function refsFromAST(sf,ts){
 const result={imports:[],unresolved:[],staticFiles:[],dynamicFiles:[]};
 const literal=node=>node&&(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))?node.text:null;
 const visit=node=>{
  if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier){
   const value=literal(node.moduleSpecifier);if(value!==null)result.imports.push(value);
  }
  if(ts.isCallExpression(node)){
   const exp=node.expression;
   const isImport=exp.kind===ts.SyntaxKind.ImportKeyword;
   const isRequire=ts.isIdentifier(exp)&&exp.text==='require';
   const isStatic=ts.isIdentifier(exp)&&exp.text==='staticFile';
   if(isImport||isRequire||isStatic){
    const arg=node.arguments[0];const value=literal(arg);
    if(value!==null)(isStatic?result.staticFiles:result.imports).push(value);
    else (isStatic?result.dynamicFiles:result.unresolved).push(arg?.getText(sf)||'expression');
   }
  }
  ts.forEachChild(node,visit);
 };
 visit(sf);return result;
}
export function validateAddon(dir,{root=ROOT,strict=false,sourceCheck=true,matchFolder=true,requireSyntax=false,production=false}={}){
 const errors=[],warnings=[];const issue=(level,msg)=>(level==='FAIL'?errors:warnings).push(msg);
 let manifest=null,files=[];
 const base=path.resolve(dir);
 try{
  assert(fs.existsSync(base)&&fs.statSync(base).isDirectory(),'Folder add-on tidak ditemukan');
  const file=path.join(base,'motiongraphic-video.json');assert(fs.existsSync(file),'motiongraphic-video.json tidak ditemukan');
  manifest=JSON.parse(fs.readFileSync(file,'utf8'));
  assert(manifest&&typeof manifest==='object'&&!Array.isArray(manifest),'Manifest harus object');
  assert(validSlug(manifest.slug),'slug tidak valid');
  assert(!matchFolder||path.basename(base)===manifest.slug,`Nama folder (${path.basename(base)}) tidak sama dengan slug (${manifest.slug})`);
  assert(/^[A-Z][A-Za-z0-9]{2,80}$/.test(manifest.id||''),'id tidak valid');
  assert(typeof manifest.title==='string'&&manifest.title.trim().length>0,'title wajib');
  assert(/^[A-Za-z_$][\w$]*$/.test(manifest.exportName||''),'exportName tidak valid');
  assert(validRel(manifest.entry)&&manifest.entry.startsWith('src/')&&/\.(tsx|jsx)$/.test(manifest.entry),'entry tidak valid');
  for(const key of ['width','height','fps','durationInFrames'])assert(Number.isInteger(manifest[key])&&manifest[key]>0,`${key} harus integer >0`);
  assert(manifest.width<=8192&&manifest.height<=8192&&manifest.fps<=120&&manifest.durationInFrames<=1e6,'Dimensi/FPS/durasi melebihi batas');
  if(!Object.hasOwn(manifest,'defaultProps'))issue((strict||manifest.contractVersion==='1.0.0')?'FAIL':'WARN','defaultProps wajib berupa object menurut kontrak add-on');
  else assert(manifest.defaultProps!==null&&typeof manifest.defaultProps==='object'&&!Array.isArray(manifest.defaultProps),'defaultProps harus object');
  assert(fs.existsSync(path.join(base,manifest.entry)),'entry tidak ditemukan');
  if(manifest.contractVersion && manifest.contractVersion!=='1.0.0')issue('FAIL','contractVersion tidak didukung: '+manifest.contractVersion);
  if(strict && manifest.contractVersion!=='1.0.0')issue('FAIL','contractVersion 1.0.0 wajib untuk add-on baru');
  if(manifest.segments!==undefined){
   assert(Array.isArray(manifest.segments),'segments harus array');let cursor=0;const segmentIds=new Set([manifest.id,manifest.id+'VOGuide']);
   for(const s of manifest.segments){
    assert(s&&typeof s==='object'&&!Array.isArray(s),'Segment harus object');
    assert(/^[A-Za-z][A-Za-z0-9-]{1,75}$/.test(s.id||''),'ID segment tidak valid');
    assert(!segmentIds.has(s.id),'Duplikasi ID segment: '+s.id);segmentIds.add(s.id);
    assert(typeof s.title==='string'&&s.title.trim(),'Title segment wajib');
    assert(Number.isInteger(s.startFrame)&&s.startFrame===cursor,'StartFrame segment harus berurutan');
    assert(Number.isInteger(s.durationInFrames)&&s.durationInFrames>0,'Durasi segment tidak valid');
    cursor+=s.durationInFrames;assert(cursor<=manifest.durationInFrames,'Segment melampaui durasi video');
   }
   if(manifest.segments.length)assert(cursor===manifest.durationInFrames,'Segment harus menutupi seluruh durasi video');
  }
  files=walk(base,base);
  assert(files.length<=8000,'Terlalu banyak file');
  assert(files.reduce((s,f)=>s+fs.statSync(f).size,0)<=1024**3,'Isi add-on >1GiB');
  for(const f of ['README.md','PANDUAN-EDIT-ASSET.md','src/Video.tsx'])if(!fs.existsSync(path.join(base,f)))issue(strict?'FAIL':'WARN','File standar tidak ada: '+f);
  if(strict)for(const f of ['src/scenes','src/components','src/animations','src/config'])if(!fs.existsSync(path.join(base,f)))issue('FAIL','Folder standar tidak ada: '+f);
  const host=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  const allowed=new Set([...Object.keys(host.dependencies||{}),...Object.keys(host.devDependencies||{}),...builtins]);
  const pkg=path.join(base,'package.json');
  if(fs.existsSync(pkg)){
   const extra=JSON.parse(fs.readFileSync(pkg,'utf8'));
   for(const d of Object.keys({...extra.dependencies,...extra.devDependencies}))if(!allowed.has(d))issue('FAIL','Dependency belum ada di Master: '+d);
  }
  const catalog=path.join(root,'library/catalog.json');
  if(fs.existsSync(catalog)){
   const cat=JSON.parse(fs.readFileSync(catalog,'utf8'));
   for(const p of cat.videos||[])if((p.id===manifest.id&&p.slug!==manifest.slug)||(p.slug===manifest.slug&&p.id!==manifest.id))issue('FAIL','Bentrok ID/slug dengan project lain: '+p.id);
  }
  // New opt-in motion plan contract; legacy sync/add-ons are not migrated.
  if(production && manifest.motionPlanContract!=='focus-driven-v1')issue('FAIL','Video baru: motionPlanContract focus-driven-v1 wajib');
  if(production && manifest.editableContract!=='studio-direct-v4')issue('FAIL','Video baru: editableContract studio-direct-v4 wajib');
  if((strict||production) && Object.hasOwn(manifest,'motionPlanContract')){
    const plan=validateMotionPlan(base);
    for(const msg of plan.errors)issue('FAIL','Motion plan: '+msg);
    for(const msg of plan.warnings)issue('WARN','Motion plan: '+msg);
  }
  const spatialFile=path.join(base,'production/spatial-plan.json');
  if(production||((strict)&&fs.existsSync(spatialFile))){
   const spatial=validateSpatial(base);
   for(const msg of spatial.errors)issue('FAIL','Spatial plan: '+msg);
   for(const item of spatial.issues)issue('FAIL',`Spatial ${item.issue}, frame ${item.first}..${item.last} (${item.count})`);
  }
  if(manifest.editableContract==='studio-direct-v4'){
    // Native edit gate requires an explicit blueprint so "Interactive count" is not a false PASS.
    const native=inspectNativeEditable(base,{strict:true});
    for(const msg of native.errors)issue('FAIL','Native editable: '+msg);
    for(const msg of native.warnings)issue('WARN','Native editable: '+msg);

    for(const rel of ['EDITABLE-LAYER-MAP.md','src/config/narration.json']){
      if(!fs.existsSync(path.join(base,rel)))issue('FAIL','Kontrak studio-direct-v4: '+rel+' wajib');
    }
    const jsx=files.filter(f=>/\.(tsx|jsx)$/.test(f)&&f.includes(path.sep+'src'+path.sep));
    const body=jsx.map(f=>fs.readFileSync(f,'utf8')).join('\n');
    const layers=[...body.matchAll(/<Interactive\.[A-Za-z]+\b[^>]*>/g)];
    if(!layers.length)issue('FAIL','studio-direct-v4 tidak memiliki layer Interactive');
    for(const layer of layers){
      if(!/\bname\s*=\s*[\"'][^\"']+[\"']/.test(layer[0]))issue('FAIL','studio-direct-v4 memiliki layer tanpa nama literal');
      if(!/\bstyle\s*=\s*\{\s*\{/.test(layer[0]))issue('FAIL','studio-direct-v4 memerlukan style inline literal (style={{...}})');
    }
    for(const pattern of [/\.setAttribute\s*\(/,/dangerouslySetInnerHTML/,/\.innerHTML\s*=/]){
      if(pattern.test(body))issue('FAIL','studio-direct-v4 melarang animasi DOM imperatif/HTML ter-flatten: '+pattern);
    }
    if(!/\binterpolate\s*\(|\bspring\s*\(/.test(body))issue('WARN','Tidak ditemukan keyframe Remotion; cek apakah video memang butuh animasi');
  }
  const source=files.filter(f=>/\.(tsx?|jsx?|mjs|mts)$/.test(f));
  if(sourceCheck){
   let ts=null;
   try{ts=require('typescript')}catch{issue(requireSyntax?'FAIL':'WARN','TypeScript tidak tersedia; parsing sintaks penuh belum terverifikasi (npm ci)')}
   for(const src of source){
    const rel=path.relative(base,src).replaceAll('\\','/'),txt=fs.readFileSync(src,'utf8');
    let parsed=null;
    if(ts){
     const kind=src.endsWith('.tsx')||src.endsWith('.jsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS;
     parsed=ts.createSourceFile(rel,txt,ts.ScriptTarget.Latest,true,kind);
     for(const d of parsed.parseDiagnostics)issue('FAIL',`Sintaks ${rel}: ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`);
    }
    if(src===path.join(base,manifest.entry)){
     const esc=manifest.exportName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
     if(!new RegExp(`\\bexport\\s+(?:const|function|class)\\s+${esc}\\b|\\bexport\\s*\\{[^}]*\\b${esc}\\b`).test(txt))issue('FAIL','Export '+manifest.exportName+' tidak ditemukan di '+rel);
    }
    const refs=parsed?refsFromAST(parsed,ts):refsFromSource(txt);
    for(const imp of refs.imports){
     if(imp.startsWith('.')){
      const dest=path.resolve(path.dirname(src),imp);
      if(!inside(dest,base))issue('FAIL',`Import melintasi batas add-on (${rel}): ${imp}`);
      else if(!matchesLocal(dest))issue('FAIL',`Import relatif tidak ditemukan (${rel}): ${imp}`);
     }else if(!supportedBare(imp,allowed))issue('FAIL',`Paket import tidak tersedia (${rel}): ${imp}`);
    }
    for(const value of refs.unresolved)issue(strict?'FAIL':'WARN',`Import dinamis tidak dapat diverifikasi (${rel}): ${value||'expression'}`);
    for(const value of refs.dynamicFiles)issue(strict?'FAIL':'WARN',`staticFile dinamis tidak dapat diverifikasi (${rel}): ${value||'expression'}`);
    for(const ref of refs.staticFiles){
     if(!validRel(ref)){issue('FAIL',`Path staticFile tidak aman (${rel}): ${ref}`);continue}
     const prefix=`videos/${manifest.slug}/`;
     if(strict&&!ref.startsWith(prefix))issue('FAIL',`Aset add-on wajib memakai staticFile('${prefix}...') (${rel}): ${ref}`);
     const target=ref.startsWith(prefix)?path.join(base,'public',ref.slice(prefix.length)):
      (fs.existsSync(path.join(base,'public',ref))?path.join(base,'public',ref):path.join(root,'public',ref));
     if(!fs.existsSync(target)||!fs.statSync(target).isFile())issue('FAIL',`Aset tidak ditemukan (${rel}): ${ref}`);
    }
   }
  }
  if(sourceCheck&&!source.length)issue('FAIL','Tidak ada source JS/TS');
 }catch(e){issue('FAIL',e.message)}
 return {ok:errors.length===0,errors,warnings,manifest,files:files.length,dir:base,verification:{static:errors.length?'FAIL':'PASS',syntax:sourceCheck?(requireSyntax?'REQUIRED':'BEST_EFFORT'):'SKIPPED',bundle:'NOT_RUN',render:'NOT_RUN'}};
}
const blueprintValidRel=(s)=>typeof s==='string'&&/^(src\/)[A-Za-z0-9_./-]+\.(tsx|jsx)$/.test(s)&&
  s.split('/').every(x=>x!=='.'&&x!=='..');
const blueprintValidLabel=(s)=>typeof s==='string'&&s.trim().length>=4;
const blueprintTagOf=(n,sf)=>n.tagName?.getText(sf)??'';
const blueprintGetAttr=(attrs,name,ts)=>attrs.find(a=>ts.isJsxAttribute(a)&&a.name.text===name);
function blueprintWalk(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:
  e.isDirectory()?blueprintWalk(path.join(dir,e.name)):e.isFile()&&/\.tsx$/.test(e.name)?[path.join(dir,e.name)]:[]);
}
/** @returns {{errors:string[],warnings:string[],targets:number}} */
export function inspectNativeEditable(base,{strict=true}={}){
 const errors=[],warnings=[];
 const fail=s=>errors.push(s);
 const advise=s=>warnings.push(s);
 const file=path.join(base,'production','editable-blueprint.json');
 if(!fs.existsSync(file)){
  (strict?fail:advise)('production/editable-blueprint.json belum tersedia; target editing tidak dapat dibuktikan');
  return {errors,warnings,targets:0};
 }
 let blueprint;
 try{blueprint=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){return {errors:['Blueprint JSON tidak valid: '+e.message],warnings,targets:0}}
 if(blueprint.schemaVersion!==1)fail('schemaVersion blueprint harus 1');
 const kinds=['nativeTextTargets','nativeVisualTargets','propsTextTargets'];
 for(const key of kinds)if(!Array.isArray(blueprint[key]))fail('Blueprint wajib memuat array '+key);
 if(errors.length)return {errors,warnings,targets:0};
 const targets=[...blueprint.nativeTextTargets.map(x=>({...x,type:'text'})),...blueprint.nativeVisualTargets.map(x=>({...x,type:'visual'}))];
 const seen=new Set();
 for(const t of targets){
  if(!blueprintValidLabel(t.name))fail('Nama layer tidak valid: '+String(t.name));
  if(!blueprintValidRel(t.source))fail('Path JSX tidak valid untuk '+t.name);
  if(seen.has(t.name))fail('Nama layer ganda dalam blueprint: '+t.name);
  seen.add(t.name);
 }
 // No changes to active legacy video: only audit an opted-in blueprint.
 let ts=null;
 try{ts=require('typescript')}catch{
  fail('TypeScript parser belum tersedia; npm ci diperlukan untuk gate native editable');
  return {errors,warnings,targets:targets.length};
 }
 const nodes=new Map(),callsiteNames=new Map(),componentCallsites=new Set(),jsxUsages=new Map();
 for(const source of blueprintWalk(path.join(base,'src'))){
  const rel=path.relative(base,source).replaceAll('\\','/');
  const ast=ts.createSourceFile(source,fs.readFileSync(source,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  for(const d of ast.parseDiagnostics)fail('Sintaks JSX: '+rel+' '+ts.flattenDiagnosticMessageText(d.messageText,' '));
  const visit=(node)=>{
   if(ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node)){
    const tag=blueprintTagOf(node,ast);
    if(/^[A-Z][A-Za-z0-9_]*$/.test(tag)){
      const key=rel+'\u0000'+tag;
      jsxUsages.set(key,(jsxUsages.get(key)||0)+1);
    }
    if(tag.startsWith('Interactive.')){
      let owner=node.parent;
      while(owner){
        if(ts.isFunctionDeclaration(owner)&&owner.name){componentCallsites.add(owner.name.text);break;}
        if(ts.isVariableDeclaration(owner)&&ts.isIdentifier(owner.name)&&owner.initializer&&
          (ts.isArrowFunction(owner.initializer)||ts.isFunctionExpression(owner.initializer))){
          componentCallsites.add(owner.name.text);break;
        }
        owner=owner.parent;
      }
     // A callsite instantiated inside array.map() is not one independent Studio track.
     let ancestor=node.parent;
     while(ancestor){
       if(ts.isCallExpression(ancestor)&&ts.isPropertyAccessExpression(ancestor.expression)&&ancestor.expression.name.text==='map'){
         fail(rel+': Interactive dari .map() dapat tergabung +N instances; deklarasikan node independen atau tandai kelompok Props-editable');
         break;
       }
       ancestor=ancestor.parent;
     }
     const labelAttr=blueprintGetAttr(node.attributes.properties,'name',ts);
     const name=labelAttr?.initializer&&ts.isStringLiteral(labelAttr.initializer)?labelAttr.initializer.text:null;
     const styleAttr=blueprintGetAttr(node.attributes.properties,'style',ts);
     const style=styleAttr?.initializer&&ts.isJsxExpression(styleAttr.initializer)?styleAttr.initializer.expression:null;
     const literalStyle=!!style&&ts.isObjectLiteralExpression(style)&&!style.properties.some(p=>ts.isSpreadAssignment(p));
     if(!name)fail(rel+': Interactive harus mempunyai name literal');
     if(!literalStyle)fail(rel+': '+(name||tag)+' memerlukan style literal inline, tanpa spread');
     if(name){
      callsiteNames.set(name,(callsiteNames.get(name)||0)+1);
      const key=rel+'\u0000'+name;
      let literal=false,dynamic=false;
      const parent=node.parent;
      if(ts.isJsxElement(parent)){
       literal=parent.children.some(c=>ts.isJsxText(c)&&c.getText(ast).trim().length>0);
       dynamic=parent.children.some(c=>ts.isJsxExpression(c)&&c.expression!==undefined);
      }
      nodes.set(key,{tag,literal,dynamic,source:rel});
     }
    }
   }
   ts.forEachChild(node,visit);
  };visit(ast);
 }
 for(const [name,count] of callsiteNames)if(count>1)fail('Nama Interactive ganda: '+name+' ('+count+' callsite).');
 for(const component of componentCallsites){
   const maxPerCaller=Math.max(0,...[...jsxUsages.entries()]
     .filter(([key])=>key.endsWith('\u0000'+component)).map(([,n])=>n));
   if(maxPerCaller>1)fail('Komponen '+component+' memiliki Interactive callsite dan dipakai '+maxPerCaller+
     ' kali dalam satu source; bisa muncul +N instances. Pecah JSX atau gunakan satu grup semantik Props-editable.');
 }
 for(const item of targets){
  const target=nodes.get(item.source+'\u0000'+item.name);
  if(!target){fail('Target native hilang: '+item.source+' → '+item.name);continue;}
  if(item.type==='text'){
   if(!['Interactive.Text','Interactive.Div','Interactive.Span','Interactive.P'].includes(target.tag))fail('Target teks '+item.name+' memakai '+target.tag+', bukan Interactive.Text/Div/Span/P');
   if(!target.literal||target.dynamic)fail('Teks '+item.name+' harus berupa child JSX literal, bukan computed expression atau teks kosong');
  }
 }
 // Correct metadata must not claim test results before user verifies GUI.
 if(blueprint.guiVerification==='passed'&&!fs.existsSync(path.join(base,'production','studio-editability-verification.json')))
  fail('guiVerification=passed tanpa bukti production/studio-editability-verification.json');
 // Some UI objects are intentionally Props-editable rather than direct-editable.
 for(const item of blueprint.propsTextTargets)if(!blueprintValidLabel(item.name))fail('Nama Props target tidak valid');
 if(!targets.length)fail('Blueprint tidak mempunyai native edit target');
 return {errors,warnings,targets:targets.length};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const argv=process.argv.slice(2),dir=argv.find(x=>!x.startsWith('--'));
 if(!dir){console.error('Pakai: node tools/validate-addon.mjs <folder-addon> [--strict] [--production] [--syntax]');process.exit(2)}
 const production=argv.includes('--production');
 const r=validateAddon(dir,{strict:production||argv.includes('--strict'),production,requireSyntax:argv.includes('--syntax')});
 for(const e of r.errors)console.error('[FAIL] '+e);
 for(const w of r.warnings)console.warn('[WARN] '+w);
 console.log(`[ADDON] ${r.ok?'STATIS VALID':'GAGAL'}: ${r.manifest?.slug||dir}, ${r.files} file; ${r.errors.length} FAIL, ${r.warnings.length} WARN; bundling/render BELUM diuji.`);
 if(!r.ok)process.exitCode=1;
}
