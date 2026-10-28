#!/usr/bin/env node
/** V3 DIRECT STUDIO TEXT CONTRACT: safeguards ALL future add-ons at npm run dev.
 * Existing legacy videos are audited but never rewritten or silently broken.
 */
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const T=createRequire(import.meta.url)('typescript');
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..'),P=join(ROOT,'projects');
const walk=d=>!existsSync(d)?[]:readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isSymbolicLink()?[]:x.isDirectory()?walk(join(d,x.name)):x.name.endsWith('.tsx')?[join(d,x.name)]:[]);
let failures=0;
console.log('\n[NO-CODE EDIT] Memeriksa teks langsung + inline props pada semua proyek');
for(const dir of readdirSync(P,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.isSymbolicLink())){
 const project=join(P,dir.name),mf=join(project,'motiongraphic-video.json');if(!existsSync(mf))continue;
 const manifest=JSON.parse(readFileSync(mf,'utf8')),strict=manifest.editableContract==='studio-direct-v3';
 let total=0,staticText=0,dynamicText=0,compStyles=0;const faults=[];
 for(const file of walk(join(project,'src'))){const sf=T.createSourceFile(file,readFileSync(file,'utf8'),T.ScriptTarget.Latest,true,T.ScriptKind.TSX);
 const visit=node=>{if(T.isJsxOpeningElement(node)||T.isJsxSelfClosingElement(node))if(node.tagName.getText(sf).startsWith('Interactive.')){
   total++;const attrs=node.attributes.properties,name=attrs.find(x=>T.isJsxAttribute(x)&&x.name.text==='name');
   const label=name?.initializer&&T.isStringLiteral(name.initializer)?name.initializer.text:'';
   const style=attrs.find(x=>T.isJsxAttribute(x)&&x.name.text==='style');
   const e=style?.initializer&&T.isJsxExpression(style.initializer)?style.initializer.expression:null;
   if(!e||!T.isObjectLiteralExpression(e)||e.properties.some(x=>T.isSpreadAssignment(x)||T.isPropertyAssignment(x)&&x.initializer.getText(sf).includes('var(--'))){compStyles++;if(strict)faults.push(relative(project,file)+': style bukan literal inline ('+label+')');}
   const parent=node.parent;
   if(T.isJsxElement(parent)){
    const direct=parent.children;
    const literal=direct.some(x=>T.isJsxText(x)&&!!x.getText(sf).trim());
    const computed=direct.some(x=>T.isJsxExpression(x)&&x.expression!=null);
    if(literal)staticText++;if(computed)dynamicText++;
    if(strict&&/(judul|subtitle|headline|teks|cta)/i.test(label)&&computed&&!literal)faults.push(relative(project,file)+': teks utama computed pada '+label+' — tulis teks literal langsung sebagai child Interactive.Div');
   }
 }T.forEachChild(node,visit)};visit(sf);
 }
 console.log(' · '+manifest.title+': '+total+' interactive, '+staticText+' teks langsung, '+dynamicText+' fragmen dinamis, '+compStyles+' style rumit'+(strict?' [V3 WAJIB]':' [lama / informatif]'));
 if(strict&&faults.length){failures+=faults.length;for(const s of faults.slice(0,12))console.error('   ❌ '+s);}
}
if(failures){console.error('[NO-CODE EDIT] '+failures+' pelanggaran. Project baru harus bisa diedit langsung di Studio; lihat STANDAR-EDITABLE-STUDIO-v3.md');process.exit(1);}
console.log('[NO-CODE EDIT] Pemeriksaan selesai. Project lama tidak diubah otomatis.');
