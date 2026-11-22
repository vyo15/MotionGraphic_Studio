#!/usr/bin/env node
/**
 * Detect reusable component call-sites that hide <Interactive.*> in one source
 * location. A React component reused N times is one Studio call-site and may
 * appear as '+N instances' instead of N independently selectable tracks.
 * Static QA only; a successful result does not prove Save/reload/render.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const T=createRequire(import.meta.url)('typescript');
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const argv=process.argv.slice(2), strict=argv.includes('--strict');
const dir=argv.find(arg=>!arg.startsWith('--'));
const roots=dir?[path.resolve(dir)]:[path.join(ROOT,'templates','addon-starter'),path.join(ROOT,'projects')];
const walk=d=>!fs.existsSync(d)?[]:fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.tsx')?[path.join(d,e.name)]:[]);
function rootProjects(folder){
 if(fs.existsSync(path.join(folder,'motiongraphic-video.json')))return [folder];
 if(fs.existsSync(path.join(folder,'src')))return [folder];
 return fs.existsSync(folder)?fs.readdirSync(folder,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.isSymbolicLink()).map(x=>path.join(folder,x.name)).filter(d=>fs.existsSync(path.join(d,'src'))):[];
}
let failed=0,warn=0;
for(const folder of roots.flatMap(rootProjects)){
 const files=walk(path.join(folder,'src'));
 const declared=[],usage=new Map();
 for(const file of files){
  const source=fs.readFileSync(file,'utf8');
  const sf=T.createSourceFile(file,source,T.ScriptTarget.Latest,true,T.ScriptKind.TSX);
  const visit=n=>{
   if(T.isJsxOpeningElement(n)||T.isJsxSelfClosingElement(n)){
    const name=n.tagName.getText(sf);
    // One use per scene/composition file is not +N: count duplicates within each caller source.
    const key=file+'\0'+name;usage.set(key,(usage.get(key)||0)+1);
   }
   if(T.isVariableDeclaration(n)&&T.isIdentifier(n.name)&&n.initializer&&/<Interactive\.(?:G|Div|Text|Span|Image|Svg)\b/.test(n.initializer.getText(sf))){
    declared.push({name:n.name.text,file});
   }
   if(T.isFunctionDeclaration(n)&&n.name&&n.body&&/<Interactive\.(?:G|Div|Text|Span|Image|Svg)\b/.test(n.body.getText(sf))){
    declared.push({name:n.name.text,file});
   }
   T.forEachChild(n,visit);
  };visit(sf);
 }
 for(const item of declared){
  const count=Math.max(0,...[...usage.entries()].filter(([k])=>k.endsWith('\0'+item.name)).map(([,n])=>n));
  if(count<2)continue;
  const message=`${path.relative(ROOT,item.file)}: <${item.name}> reused ${count} times but contains Interactive source call-site; split meaningful editable objects into separate JSX declarations.`;
  if(strict){failed++;console.error('[FAIL LAYERS] '+message)}else{warn++;console.warn('[WARN LAYERS] '+message)}
 }
}
console.log(`[LAYERS] ${failed} FAIL, ${warn} WARN; GUI Save/reload/render not verified by static checks.`);
if(failed)process.exitCode=1;
