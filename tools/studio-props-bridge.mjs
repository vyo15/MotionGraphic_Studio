/** Preserve "Save props to code" edits performed in native Remotion Studio.
 * Source of truth stays projects/<slug>/motiongraphic-video.json.
 * Only statically inspect JSX literals; NEVER evaluate source. Refuse conflicts. */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url);
export const hash=s=>createHash('sha256').update(s).digest('hex');
export const statePath=root=>path.join(root,'library','.studio-generated-state.json');
const getTS=()=>{
 try{return require('typescript')}
 catch {throw new Error('TypeScript belum terpasang. Jalankan npm ci sebelum menyinkronkan hasil edit Props Remotion. src/Root.tsx TIDAK diubah.')}
};
const unwrap=(ts,x)=>{
 while(x&&(ts.isParenthesizedExpression(x)||ts.isAsExpression(x)||ts.isTypeAssertionExpression(x)||ts.isSatisfiesExpression(x)))x=x.expression;
 return x;
};
function decode(ts,node){
 node=unwrap(ts,node);
 if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
 if(ts.isNumericLiteral(node))return Number(node.text);
 if(node.kind===ts.SyntaxKind.TrueKeyword)return true;
 if(node.kind===ts.SyntaxKind.FalseKeyword)return false;
 if(node.kind===ts.SyntaxKind.NullKeyword)return null;
 if(ts.isPrefixUnaryExpression(node)&&node.operator===ts.SyntaxKind.MinusToken&&ts.isNumericLiteral(node.operand))return -Number(node.operand.text);
 if(ts.isArrayLiteralExpression(node))return node.elements.map(x=>decode(ts,x));
 if(ts.isObjectLiteralExpression(node)){
  const obj={};
  for(const prop of node.properties){
   if(!ts.isPropertyAssignment(prop))throw new Error('Props mengandung spread/shorthand/computed, tidak aman disalin ke manifest.');
   const name=prop.name;
   if(!ts.isIdentifier(name)&&!ts.isStringLiteral(name)&&!ts.isNumericLiteral(name))throw new Error('Key Props tidak statis');
   const key=name.text;
   if(key==='__proto__'||key==='constructor'||key==='prototype')throw new Error('Key Props tidak diizinkan');
   obj[key]=decode(ts,prop.initializer);
  }
  return obj;
 }
 throw new Error('Props tidak sepenuhnya berupa literal JSON. Perubahan tidak akan ditimpa; periksa Root.tsx.');
}
/** Returns source root compositions and skeleton excluding only defaultProps values. */
export function parseCompositions(source){
 const ts=getTS();const sf=ts.createSourceFile('Root.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 if(sf.parseDiagnostics.length)throw new Error('Root.tsx mengalami kesalahan sintaks; perubahan tidak ditimpa.');
 const found=new Map(),ranges=[];
 const walk=node=>{
  if(ts.isJsxSelfClosingElement(node)||ts.isJsxOpeningElement(node)){
   if(node.tagName.getText(sf)==='Composition'){
    const attr=key=>node.attributes.properties.find(x=>ts.isJsxAttribute(x)&&x.name.text===key);
    const id=attr('id')?.initializer;
    const props=attr('defaultProps')?.initializer;
    if(!id||!ts.isStringLiteral(id)||!props||!ts.isJsxExpression(props)||!props.expression)throw new Error('Registrasi Composition bukan literal yang aman untuk sinkronisasi.');
    if(found.has(id.text))throw new Error('Duplikat ID Composition: '+id.text);
    const plain=decode(ts,props.expression);
    if(!plain||Array.isArray(plain)||typeof plain!=='object')throw new Error('defaultProps harus object');
    found.set(id.text,plain);
    ranges.push([props.getStart(sf),props.end]);
   }
  }
  ts.forEachChild(node,walk);
 };walk(sf);
 let skeleton=source;
 for(const [start,end] of ranges.sort((a,b)=>b[0]-a[0]))skeleton=skeleton.slice(0,start)+'={PROPS}'+skeleton.slice(end);
 // Formatting-only changes by Remotion are harmless; strings in JSX remain preserved by comparison of props.
 return {props:found,skeleton:skeleton.replace(/\s+/g,'')};
}
export function saveGeneratedState(root,rootText,entries){
 const state={version:1,rootHash:hash(rootText),rootText,propsHashes:Object.fromEntries(entries.map(v=>[v.id,hash(JSON.stringify(v.defaultProps))]))};
 const dest=statePath(root);fs.mkdirSync(path.dirname(dest),{recursive:true});
 const tmp=dest+'.'+process.pid+'.tmp';fs.writeFileSync(tmp,JSON.stringify(state,null,2)+'\n');fs.renameSync(tmp,dest);
}
/** Native Studio writes props to Root.tsx. Merge them to manifest before the generator overwrites Root. */
export function captureStudioProps(root){
 const stateFile=statePath(root),src=path.join(root,'src','Root.tsx');
 if(!fs.existsSync(stateFile)||!fs.existsSync(src))return 0;
 const state=JSON.parse(fs.readFileSync(stateFile,'utf8'));
 const current=fs.readFileSync(src,'utf8');
 if(hash(current)===state.rootHash)return 0;
 const old=parseCompositions(state.rootText),next=parseCompositions(current);
 if(old.skeleton!==next.skeleton)throw new Error('Root.tsx berubah selain Props. Sync dibatalkan agar perubahan native Remotion tidak tertimpa. Backup tersedia di library/.studio-generated-state.json.');
 const changes=[];
 for(const [id,props] of next.props){
  if(!old.props.has(id))throw new Error('Composition berubah: '+id);
  if(JSON.stringify(props)===JSON.stringify(old.props.get(id)))continue;
  const item=rootProjectManifest(root,id);
  if(!item)throw new Error('Manifest project ID tidak ditemukan: '+id);
  const manifest=JSON.parse(fs.readFileSync(item,'utf8'));
  const manifestHash=hash(JSON.stringify(manifest.defaultProps??{}));
  if(manifestHash!==state.propsHashes[id])throw new Error('Props Remotion dan manifest sama-sama diubah untuk '+id+'. Sync dibatalkan untuk menghindari kehilangan data.');
  changes.push({file:item,manifest,props,id});
 }
 const back=path.join(root,'library','backups','studio-props');fs.mkdirSync(back,{recursive:true});
 const tag=new Date().toISOString().replace(/[:.]/g,'-');
 for(const ch of changes){
  fs.copyFileSync(ch.file,path.join(back,`${ch.id}-${tag}.json`));
  ch.manifest.defaultProps=ch.props;
  const temp=ch.file+'.'+process.pid+'.tmp';fs.writeFileSync(temp,JSON.stringify(ch.manifest,null,2)+'\n');fs.renameSync(temp,ch.file);
  console.log('[REMOTION PROPS] Edit Studio disimpan ke manifest '+ch.id);
 }
 return changes.length;
}
function rootProjectManifest(root,id){
 const base=path.join(root,'projects');
 for(const e of fs.readdirSync(base,{withFileTypes:true})){if(!e.isDirectory())continue;
  const f=path.join(base,e.name,'motiongraphic-video.json');
  if(fs.existsSync(f)&&JSON.parse(fs.readFileSync(f,'utf8')).id===id)return f;
 }
 return null;
}
