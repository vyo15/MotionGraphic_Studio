#!/usr/bin/env node
/** One-off, conservative JSX converter for projects that use spread layerStyle().
 * Usage: node tools/repair-computed-layers.mjs <slug> --apply
 * Preserves existing CSS transform animations. No changes unless --apply.
 * Makes inline transform controls available to Remotion's Interactive editor.
 */
import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync,copyFileSync} from 'node:fs';
import {resolve,join,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const slug=process.argv.find(a=>/^[a-z][a-z0-9-]{2,60}$/.test(a)&&a!=='apply');
const apply=process.argv.includes('--apply');
if(!slug||!existsSync(join(ROOT,'projects',slug,'motiongraphic-video.json'))){console.error('Pakai: node tools/repair-computed-layers.mjs <slug> [--apply]');process.exit(2)}
const dir=join(ROOT,'projects',slug),root=join(dir,'src');
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:e.isDirectory()?walk(join(d,e.name)):e.isFile()&&/\.tsx?$/.test(e.name)?[join(d,e.name)]:[]);
const all=walk(root);const css=all.length?readdirSync(root,{recursive:true}).filter(x=>typeof x==='string'&&x.endsWith('.css')).map(x=>{try{return readFileSync(join(root,x),'utf8')}catch{return''}}).join('\n'):'';
const classProps={};
for(const match of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)){
 const selector=match[1].trim();if(selector.includes(':')||selector.includes('>')||selector.includes('::'))continue;
 const declarations={};
 for(const m of match[2].matchAll(/([\w-]+)\s*:\s*([^;]+)/g))declarations[m[1].trim()]=m[2].trim();
 for(const cm of selector.matchAll(/\.([\w-]+)/g)){
  const c=cm[1];(classProps[c]??={});
  for(const key of ['left','top','width','height','font-size','font-weight','color','background-color','letter-spacing','text-align','line-height','transform-origin']){
   if(declarations[key])classProps[c][key]=declarations[key]
  }
 }
}
const jsName={'font-size':'fontSize','font-weight':'fontWeight','background-color':'backgroundColor','letter-spacing':'letterSpacing','text-align':'textAlign','line-height':'lineHeight','transform-origin':'transformOrigin'};
function literal(cssValue,key){const p=cssValue.trim();if(/^[-+]?\d+(\.\d+)?px$/.test(p))return (['left','top','width','height','fontSize','letterSpacing'].includes(key)?String(parseFloat(p)):JSON.stringify(p));if(/^#[a-fA-F0-9]{3,8}$/.test(p))return JSON.stringify(p);if(/^\d+(\.\d+)?$/.test(p))return String(Number(p));if(['left','top'].includes(key)&&p==='0')return '0';if(['textAlign','transformOrigin'].includes(key)&&/^[\w\s%]+$/.test(p))return JSON.stringify(p);return null;}
let total=0,files=0,unresolved=0;
for(const file of all){if(!file.endsWith('.tsx'))continue;
 const src=readFileSync(file,'utf8'),sf=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),patch=[];
 const visit=node=>{
  if(ts.isJsxSelfClosingElement(node)||ts.isJsxOpeningElement(node)){
   if(node.tagName.getText(sf).startsWith('Interactive.')){
    const styleAttr=node.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.text==='style');
    const classAttr=node.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.text==='className');
    if(styleAttr?.initializer&&ts.isJsxExpression(styleAttr.initializer)&&styleAttr.initializer.expression){
     const style=styleAttr.initializer.expression;
     const isCall=ts.isCallExpression(style)&&style.expression.getText(sf)==='layerStyle';
     const isObj=ts.isObjectLiteralExpression(style);
     const spreads=isObj?style.properties.filter(p=>ts.isSpreadAssignment(p)&&ts.isCallExpression(p.expression)&&p.expression.expression.getText(sf)==='layerStyle'):[];
     if(!isCall&&!spreads.length){ts.forEachChild(node,visit);return;}
     const existing=new Set(isObj?style.properties.filter(p=>ts.isPropertyAssignment(p)).map(p=>p.name.getText(sf).replace(/["']/g,'')):[]);
     // An inline, literal transform has the same initial appearance as legacy defaults;
     // all source transform animations remain in the existing transform property.
     const fields={position:"'absolute'",translate:"'0px 0px'",scale:'1',rotate:"'0deg'",transformOrigin:"'50% 50%'"};
     // Never force position:absolute for flex/grid child elements.
     if(!isCall&&!existing.has('position'))delete fields.position;
     const classNames=classAttr&&ts.isJsxAttribute(classAttr)&&classAttr.initializer&&ts.isStringLiteral(classAttr.initializer)?classAttr.initializer.text.split(/\s+/):[];
     for(const c of classNames){const defaults=classProps[c];if(!defaults)continue;for(const [k,v] of Object.entries(defaults)){
       const name=jsName[k]||k;if(name in fields||existing.has(name)||name==='lineHeight'&&v.includes('calc('))continue;
       const value=literal(v,name);if(value!==null)fields[name]=value;
     }}
     // Avoid overriding dynamic CSS left/top on elements that rely on CSS layout.
     if(isCall){const pairs=Object.entries(fields).map(([k,v])=>`${k}:${v}`).join(',');patch.push({start:style.getStart(sf),end:style.getEnd(),text:`{${pairs}}`});}
     else{
      const pairs=Object.entries(fields).filter(([k])=>!existing.has(k)).map(([k,v])=>`${k}:${v}`).join(',');
      for(const s of spreads)patch.push({start:s.getStart(sf),end:s.getEnd(),text:pairs});
     }
     total++;
    }
   }
  }
  ts.forEachChild(node,visit);
 };visit(sf);
 if(patch.length){files++;if(apply){const backup=join(ROOT,'library','backups','computed-repair',slug,relative(dir,file));mkdirSync(dirname(backup),{recursive:true});if(!existsSync(backup))copyFileSync(file,backup);let next=src;for(const p of patch.sort((a,b)=>b.start-a.start))next=next.slice(0,p.start)+p.text+next.slice(p.end);writeFileSync(file,next);}}
}
console.log(`${apply?'[DIUBAH]':'[SIMULASI]'} ${slug}: ${total} layer Interactive, ${files} source JSX. Backup tersedia sebelum perubahan.`);
if(!apply)console.log('Jalankan dengan --apply setelah mencadangkan project.');
