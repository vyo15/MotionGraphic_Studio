#!/usr/bin/env node
/** Convert static config layout references to editable JSX numeric literals. Never touches animation expressions. */
import {createRequire} from 'node:module';import {readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync,copyFileSync} from 'node:fs';import {join,resolve,dirname,relative} from 'node:path';import {fileURLToPath} from 'node:url';
const ts=createRequire(import.meta.url)('typescript'),ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');const slug=process.argv[2];const apply=process.argv.includes('--apply');
const dir=join(ROOT,'projects',slug||'');if(!slug||!existsSync(join(dir,'motiongraphic-video.json'))){console.error('Usage: node tools/materialize-layout-props.mjs <slug> [--apply]');process.exit(2)}
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(join(d,x.name)):x.isFile()&&x.name.endsWith('.tsx')?[join(d,x.name)]:[]);
function ev(n){if(ts.isAsExpression(n)||ts.isParenthesizedExpression(n))return ev(n.expression);if(ts.isNumericLiteral(n))return +n.text;if(ts.isStringLiteral(n))return n.text;if(ts.isPrefixUnaryExpression(n)&&n.operator===ts.SyntaxKind.MinusToken){const v=ev(n.operand);return typeof v==='number'?-v:undefined;}if(ts.isObjectLiteralExpression(n)){const o={};for(const p of n.properties)if(ts.isPropertyAssignment(p)){const key=p.name.getText().replace(/['"]/g,'');o[key]=ev(p.initializer)}return o;}return undefined;}
function configs(f){const obj={};for(const cf of [join(dir,'src/config/series.ts'),join(dirname(f),'../config/video.ts'),join(dirname(f),'config/video.ts'),join(dirname(f),'../../config/video.ts'),join(dirname(f),'../../../config/video.ts'),join(dirname(f),'../../../../config/video.ts')]){
 if(!existsSync(cf))continue;const s=readFileSync(cf,'utf8'),sf=ts.createSourceFile(cf,s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 const visit=n=>{if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name)&&['CONFIG','VIDEO','COLORS'].includes(n.name.text)&&n.initializer){obj[n.name.text]=ev(n.initializer);}ts.forEachChild(n,visit)};visit(sf);
 }return obj;}
let count=0,files=0;
for(const f of walk(join(dir,'src'))){const s=readFileSync(f,'utf8'),sf=ts.createSourceFile(f,s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),cs=configs(f),changes=[];
 const visit=n=>{if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){if(n.tagName.getText(sf).startsWith('Interactive.')){
 const style=n.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.text==='style');const expr=style?.initializer&&ts.isJsxExpression(style.initializer)?style.initializer.expression:null;
 if(expr&&ts.isObjectLiteralExpression(expr))for(const p of expr.properties){if(!ts.isPropertyAssignment(p))continue;const key=p.name.getText(sf).replace(/['"]/g,'');if(!['left','top','width','height','fontSize','fontWeight','color','backgroundColor'].includes(key))continue;
 const path=p.initializer.getText(sf).split('.');if(!['VIDEO','CONFIG','COLORS'].includes(path[0])||path.length<2||!path.every(x=>/^\w+$/.test(x)))continue;let v=cs[path[0]];for(const k of path.slice(1))v=v?.[k];if(typeof v==='number'||typeof v==='string'&&(/^#[a-f\d]{3,8}$/i.test(v))){changes.push({a:p.initializer.getStart(sf),b:p.initializer.getEnd(),text:typeof v==='number'?String(v):JSON.stringify(v)});count++}
 }
 }}ts.forEachChild(n,visit)};visit(sf);
 if(changes.length){files++;if(apply){const backup=join(ROOT,'library/backups/layout-materialize',slug,relative(dir,f));mkdirSync(dirname(backup),{recursive:true});if(!existsSync(backup))copyFileSync(f,backup);let out=s;for(const c of changes.sort((a,b)=>b.a-a.a))out=out.slice(0,c.a)+c.text+out.slice(c.b);writeFileSync(f,out)}}
}
console.log(`${apply?'[UPDATED]':'[CHECK]'} ${count} editable static layout values, ${files} files; no runtime animations changed.`);
