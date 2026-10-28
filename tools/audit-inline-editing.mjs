#!/usr/bin/env node
/** Studio inline editability gate. Strict only for declared projects; legacy project remains intact. */
import {createRequire} from 'node:module';import {readdirSync,readFileSync,existsSync} from 'node:fs';import {resolve,join,dirname} from 'node:path';import {fileURLToPath} from 'node:url';
const T=createRequire(import.meta.url)('typescript'),ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dirs=readdirSync(join(ROOT,'projects'),{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.isSymbolicLink());
const walk=d=>!existsSync(d)?[]:readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(join(d,x.name)):x.isFile()&&x.name.endsWith('.tsx')?[join(d,x.name)]:[]);
let bad=0;console.log('\n[EDITABLE CHECK] Memeriksa struktur Interactive setiap project...');
for(const d of dirs){const root=join(ROOT,'projects',d.name);const mf=join(root,'motiongraphic-video.json');if(!existsSync(mf))continue;const manifest=JSON.parse(readFileSync(mf,'utf8'));const strict=manifest.editableContract==='studio-inline-v2';let count=0,computed=0,editable=0,details=[];
 for(const file of walk(join(root,'src'))){const s=readFileSync(file,'utf8'),sf=T.createSourceFile(file,s,T.ScriptTarget.Latest,true,T.ScriptKind.TSX);const visit=n=>{if(T.isJsxOpeningElement(n)||T.isJsxSelfClosingElement(n))if(n.tagName.getText(sf).startsWith('Interactive.')){
 count++;const style=n.attributes.properties.find(x=>T.isJsxAttribute(x)&&x.name.text==='style'),expr=style?.initializer&&T.isJsxExpression(style.initializer)?style.initializer.expression:null;
 if(!expr||!T.isObjectLiteralExpression(expr)){computed++;details.push('Bukan inline JSX object: '+file.slice(root.length+1));}
 else{
 const hasStyleVar=expr.properties.some(p=>T.isSpreadAssignment(p)||T.isPropertyAssignment(p)&&p.initializer.getText(sf).includes('var(--'));
 if(hasStyleVar){computed++;details.push('Spread/var: '+file.slice(root.length+1));}
 const names=new Set(expr.properties.filter(T.isPropertyAssignment).map(p=>p.name.getText(sf)));
 if(['translate','scale','rotate'].every(k=>names.has(k)))editable++;
 }
 }T.forEachChild(n,visit)};visit(sf);
 }
 console.log(`  ${manifest.title}: ${count} layer Interactive, ${editable} dengan transform inline, ${computed} masih computed/spread.${strict?' [standar wajib]':''}`);
 if(strict&&computed){bad+=computed;for(const n of details.slice(0,10))console.error('  [PERLU DIBENAHI] '+n);}
 else if(!strict&&computed)console.log('  [LEGACY] Tidak diubah otomatis; gunakan pola studio-inline-v2 untuk project baru.');
}
if(bad){console.error(`[EDITABLE CHECK] ${bad} kontrol computed pada project berkontrak studio-inline-v2. Perbaiki source atau jalankan repair-computed-layers.mjs sesuai panduan.`);process.exit(1)}
console.log('[EDITABLE CHECK] Pemeriksaan selesai.');
