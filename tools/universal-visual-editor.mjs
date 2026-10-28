/** Visual workspace API — no extra runtime dependency. Only listens on the local Easy Editor server.
 * Editing source Interactive nodes uses the existing TypeScript dev dependency and literal JSX values.
 * Unsupported computed expressions are never silently overwritten.
 */
import {readFileSync,writeFileSync,existsSync,readdirSync,mkdirSync,mkdtempSync,rmSync,statSync} from 'node:fs';
import {join,resolve,relative,dirname,sep} from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const PROJS=join(ROOT,'projects');
const HTML=join(ROOT,'tools','visual-editor','index.html');
const SOURCE_KEYS=['left','top','width','height','opacity','fontSize','zIndex','scale','rotate','color','backgroundColor'];
const COLOR_KEYS=['color','backgroundColor'];
const LAYER_KEYS=['x','y','scale','scaleX','scaleY','rotation','opacity','zIndex','enabled','startFrame','endFrame','delayFrames','animationFrames','hueShift','animation'];
const TRACK_KEYS=['enabled','fromFrame','toFrame','clickFrame','startX','startY','endX','endY','size','ringColor'];
const caches=new Map();
const jobdir=mkdtempSync(join(tmpdir(),'motiongraphic-frame-'));
const cors={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const json=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8',...cors});res.end(JSON.stringify(obj));};
const err=(msg)=>{throw Error(msg)};
const round=n=>Math.round(Number(n)*100)/100;
function project(slug){if(typeof slug!=='string'||!(/^[a-z][a-z0-9-]{1,48}$/).test(slug))err('Slug tidak valid');const file=join(PROJS,slug,'motiongraphic-video.json');if(!existsSync(file))err('Project tidak ditemukan');const m=JSON.parse(readFileSync(file,'utf8'));if(m.slug!==slug)err('Manifest tidak cocok');return {manifest:m,file,dir:join(PROJS,slug)};}
function list(){return readdirSync(PROJS,{withFileTypes:true}).filter(d=>d.isDirectory()&&!d.isSymbolicLink()).flatMap(d=>{try{const p=project(d.name);return [{slug:d.name,id:p.manifest.id,title:p.manifest.title,frames:p.manifest.durationInFrames,fps:p.manifest.fps,width:p.manifest.width,height:p.manifest.height}]}catch{return[]}});}
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(d=>{if(d.isSymbolicLink())return [];const p=join(dir,d.name);return d.isDirectory()?walk(p):d.isFile()&&p.endsWith('.tsx')?[p]:[]});}
let ts;
function typescript(){if(!ts){const require=createRequire(import.meta.url);ts=require('typescript');}return ts;}
const numberVal=(node)=>{const T=typescript();if(T.isNumericLiteral(node))return Number(node.text);if(T.isPrefixUnaryExpression(node)&&T.isNumericLiteral(node.operand)){if(node.operator===T.SyntaxKind.MinusToken)return -Number(node.operand.text);if(node.operator===T.SyntaxKind.PlusToken)return Number(node.operand.text);}return null};
const propVal=(node,key)=>{const T=typescript();if(COLOR_KEYS.includes(key)&&T.isStringLiteral(node)&&/^#[0-9a-f]{6}$/i.test(node.text))return node.text;if(key==='rotate'&&T.isStringLiteral(node)&&/^-?[0-9]+(?:\.[0-9]+)?deg$/.test(node.text))return Number(node.text.slice(0,-3));return numberVal(node);};

/** Find text inside the selected Interactive node, excluding nested Interactive components.
 * Literal children can be edited in Studio; copy(...) children are editable here
 * without editing JSX in VS Code. Both paths persist to project files.
 */
function textNodes(node){
 const T=typescript(),out=[];
 if(!node||!T.isJsxElement(node))return out;
 const visit=(n)=>{
  if(n!==node&&(T.isJsxElement(n)||T.isJsxSelfClosingElement(n))&&n.tagName?.getText().startsWith('Interactive.'))return;
  if(T.isJsxText(n)){const raw=n.getText();if(raw.trim()&&raw.trim().length<500)out.push({type:'literal',node:n,text:raw.trim()});return;}
  if(T.isJsxExpression(n)&&n.expression&&T.isCallExpression(n.expression)){
    const c=n.expression,fn=c.expression.getText();
    if((fn==='copy'||fn==='text')&&c.arguments.length>=2&&T.isStringLiteral(c.arguments[0])){
      const fallback=c.arguments[1];out.push({type:'copy',node:n,key:c.arguments[0].text,text:T.isStringLiteral(fallback)?fallback.text:'',fallback:fallback.getText()});return;
    }
  }
  T.forEachChild(n,visit);
 };
 for(const child of node.children)visit(child);
 return out;
}
function copyScope(file){const f=file.replaceAll('\\','/');if(f.includes('/01-ctrl-shift-t/'))return 'CTRL_SHIFT_T';if(f.includes('/02-ctrl-shift-esc/'))return 'CTRL_SHIFT_ESC';if(f.includes('/03-win-shift-s/'))return 'WIN_SHIFT_S';if(f.includes('/04-win-e/'))return 'WIN_E';if(f.includes('/05-ctrl-shift-n/'))return 'CTRL_SHIFT_N';if(f.endsWith('/Hook.tsx'))return 'HOOK';if(f.endsWith('/CTA.tsx'))return 'CTA';if(f.includes('/src/components/SeriesSkin'))return '*';return null;}
function displayCopyKey(projectDir,scene,key){
 const f=join(projectDir,'src','editor','EditorNames.ts');if(!existsSync(f))return key;
 const text=readFileSync(f,'utf8');const section=text.match(new RegExp('"'+scene+'"\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\}'));
 if(!section)return key;
 const matches=[...section[1].matchAll(/"([^"\n]+)"\s*:\s*"([^"\n]+)"/g)];
 return matches.find(x=>x[1]===key)?.[2]||key;
}
function sourceLayers(slug){const p=project(slug),T=typescript();const out=[];for(const file of walk(join(p.dir,'src'))){const source=readFileSync(file,'utf8');const sf=T.createSourceFile(file,source,T.ScriptTarget.Latest,true,T.ScriptKind.TSX);let index=0;const visit=(node)=>{if(T.isJsxOpeningElement(node)||T.isJsxSelfClosingElement(node)){const tag=node.tagName.getText(sf);if(tag.startsWith('Interactive.')){const nameAttr=node.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='name');const styleAttr=node.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='style');if(nameAttr&&nameAttr.initializer&&T.isStringLiteral(nameAttr.initializer)&&styleAttr&&styleAttr.initializer&&T.isJsxExpression(styleAttr.initializer)&&styleAttr.initializer.expression&&T.isObjectLiteralExpression(styleAttr.initializer.expression)){
const metrics={};for(const prop of styleAttr.initializer.expression.properties){if(T.isPropertyAssignment(prop)&&(T.isIdentifier(prop.name)||T.isStringLiteral(prop.name))&&SOURCE_KEYS.includes(prop.name.text))metrics[prop.name.text]=propVal(prop.initializer,prop.name.text);}
const rel=relative(p.dir,file).split(sep).join('/');const texts=textNodes(node.parent).map((x,i)=>({index:i,type:x.type,text:x.type==='copy'?(p.manifest.defaultProps?.sceneEditor?.[copyScope(rel)]?.copy?.[displayCopyKey(p.dir,copyScope(rel),x.key)]||p.manifest.defaultProps?.sceneEditor?.[copyScope(rel)]?.copy?.[x.key]||x.text):x.text,key:x.key||null}));
out.push({kind:'source',id:`${rel}#${index}`,file:rel,index,name:nameAttr.initializer.text,tag,metrics,editable:SOURCE_KEYS.filter(k=>metrics[k]!==undefined&&metrics[k]!==null),texts});index++;
}}}T.forEachChild(node,visit)};visit(sf);}return out;}
function sourceEdit(slug,layerId,changes){const p=project(slug),T=typescript();const [relPart,num]=layerId.split('#');if(!(/^src\/[\w./-]+\.tsx$/).test(relPart)||!/^(0|[1-9]\d*)$/.test(num)||relPart.includes('..'))err('ID source tidak valid');const file=resolve(p.dir,relPart);if(!file.startsWith(p.dir+sep)||!existsSync(file))err('Source tidak ditemukan');const original=readFileSync(file,'utf8');const src=T.createSourceFile(file,original,T.ScriptTarget.Latest,true,T.ScriptKind.TSX);const matches=[];const visit=(node)=>{if(T.isJsxOpeningElement(node)||T.isJsxSelfClosingElement(node)){if(node.tagName.getText(src).startsWith('Interactive.')){const nameAttr=node.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='name'),styleAttr=node.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='style');if(nameAttr?.initializer&&T.isStringLiteral(nameAttr.initializer)&&styleAttr?.initializer&&T.isJsxExpression(styleAttr.initializer)&&T.isObjectLiteralExpression(styleAttr.initializer.expression))matches.push({node,style:styleAttr.initializer.expression});}}T.forEachChild(node,visit)};visit(src);
const target=matches[Number(num)];if(!target)err('Layer source sudah berubah, refresh dahulu');const swaps=[];
for(const [key,value] of Object.entries(changes)){
 if(!SOURCE_KEYS.includes(key))err('Properti tidak diizinkan: '+key);
 const isColor=COLOR_KEYS.includes(key);
 if(isColor){if(typeof value!=='string'||!/^#[a-f0-9]{6}$/i.test(value))err('Warna harus HEX #RRGGBB')}
 else if(typeof value!=='number'||!Number.isFinite(value)||Math.abs(value)>10000)err('Nilai tidak valid: '+key);
 const prop=target.style.properties.find(q=>T.isPropertyAssignment(q)&&(T.isIdentifier(q.name)||T.isStringLiteral(q.name))&&q.name.text===key);
 if(!prop||propVal(prop.initializer,key)===null)err('Properti computed tidak akan ditimpa: '+key);
 if(key==='opacity'&&(value<0||value>1))err('Opacity 0–1');
 if(['height','width','fontSize','scale'].includes(key)&&value<0)err('Ukuran/scale harus positif');
 const text=isColor?JSON.stringify(value):key==='rotate'?JSON.stringify(round(value)+'deg'):String(round(value));
 swaps.push({start:prop.initializer.getStart(src),end:prop.initializer.getEnd(),text});
}
let next=original;for(const s of swaps.sort((a,b)=>b.start-a.start))next=next.slice(0,s.start)+s.text+next.slice(s.end);
return {file,original,next};}
/** Safe text editing. JSX literals replace only the selected literal token.
 * copy() labels use sceneEditor copy overrides so source fallback stays intact. */
function sourceTextEdit(slug,layerId,textIndex,value){
 const T=typescript(),p=project(slug),[relPart,num]=String(layerId).split('#');
 if(!/^src\/[\w./-]+\.tsx$/.test(relPart)||relPart.includes('..')||!/^(0|[1-9]\d*)$/.test(num))err('ID teks tidak valid');
 if(typeof value!=='string'||value.length>500||/[\u0000-\u0008]/.test(value))err('Teks tidak valid atau terlalu panjang');
 const file=resolve(p.dir,relPart);if(!file.startsWith(p.dir+sep)||!existsSync(file))err('Source teks tidak ditemukan');
 const old=readFileSync(file,'utf8'),sf=T.createSourceFile(file,old,T.ScriptTarget.Latest,true,T.ScriptKind.TSX),nodes=[];
 const visit=n=>{if((T.isJsxOpeningElement(n)||T.isJsxSelfClosingElement(n))&&n.tagName.getText(sf).startsWith('Interactive.')){
 const a=n.attributes.properties.find(x=>T.isJsxAttribute(x)&&x.name.text==='name');const b=n.attributes.properties.find(x=>T.isJsxAttribute(x)&&x.name.text==='style');
 if(a?.initializer&&T.isStringLiteral(a.initializer)&&b?.initializer&&T.isJsxExpression(b.initializer)&&T.isObjectLiteralExpression(b.initializer.expression))nodes.push(n);
 }T.forEachChild(n,visit)};visit(sf);
 const selected=nodes[Number(num)];if(!selected)err('Layer berubah, refresh editor');
 const target=textNodes(selected.parent)[Number(textIndex)];if(!target)err('Teks tidak ditemukan, refresh editor');
 if(target.type==='literal'){
   const raw=target.node.getText(sf),i=raw.indexOf(raw.trim());const escaped=value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('{','&#123;').replaceAll('}','&#125;');
   const a=target.node.getStart(sf),b=target.node.getEnd();const next=old.slice(0,a)+raw.slice(0,i)+escaped+raw.slice(i+raw.trim().length)+old.slice(b);
   return {file,before:old,after:next};
 }
 if(target.type==='copy'){
   const scene=copyScope(relPart);const m=structuredClone(p.manifest),key=displayCopyKey(p.dir,scene,target.key);const cfg=m.defaultProps?.sceneEditor?.[scene];
   if(!cfg||!cfg.copy)err('Teks dinamis belum terhubung ke scene editor; gunakan naskah JSX literal');
   cfg.copy[key]=value;return {file:p.file,before:readFileSync(p.file,'utf8'),after:JSON.stringify(m,null,2)+'\n'};
 }
 err('Teks ini belum dapat diedit');
}
function backupName(slug){return join(ROOT,'library','backups','visual-editor',slug+'.previous.json')}
function saveAtomic(slug,targets){const b=backupName(slug);mkdirSync(dirname(b),{recursive:true});const payload=targets.map(x=>({file:relative(ROOT,x.file),before:x.before,after:x.after}));writeFileSync(b,JSON.stringify(payload,null,2));for(const x of targets)writeFileSync(x.file,x.after);caches.clear();}
function save(slug,payload){const p=project(slug),targets=[];let changed=false;
if(payload.kind==='source'){const x=sourceEdit(slug,payload.layerId,payload.values);if(x.next!==x.original){targets.push({file:x.file,before:x.original,after:x.next});changed=true;}}
else if(payload.kind==='text'){const x=sourceTextEdit(slug,payload.layerId,payload.textIndex,payload.text);if(x.before!==x.after){targets.push(x);changed=true;}}
else if(payload.kind==='layer'||payload.kind==='cursor'||payload.kind==='anchor'){
 const m=structuredClone(p.manifest),props=m.defaultProps||{};
 if(payload.kind==='layer'){
 const l=props.sceneEditor?.[payload.scene]?.layers?.[payload.layer];if(!l)err('Layer tidak ditemukan');for(const [k,v] of Object.entries(payload.values||{})){if(!LAYER_KEYS.includes(k)||!(k in l))err('Properti layer ditolak: '+k);if(k==='animation'){if(!['none','fade','slide-up','pop'].includes(v))err('Animasi tidak didukung')}else if(k==='enabled'){if(typeof v!=='boolean')err('Harus boolean')}else if(typeof v!=='number'||!Number.isFinite(v)||Math.abs(v)>100000)err('Nilai tidak valid');if(k==='opacity'&&(v<0||v>1))err('Opacity 0–1');l[k]=v;}
 }else if(payload.kind==='cursor'){
 const c=props.cursorEditor?.[payload.scene];if(!c)err('Track kursor tidak ditemukan');for(const [k,v] of Object.entries(payload.values||{})){if(!TRACK_KEYS.includes(k))err('Field cursor ditolak');if(k==='enabled'){if(typeof v!=='boolean')err('Harus boolean')}else if(k==='ringColor'){if(typeof v!=='string'||!/^#[a-f0-9]{6}$/i.test(v))err('Hex color tidak valid')}else if(typeof v!=='number'||!Number.isFinite(v)||Math.abs(v)>100000)err('Nilai kursor tidak valid');c[k]=v;}
 }else{
 const a=payload.anchor;if(!a||typeof a!=='object')err('Anchor tidak valid');for(const k of ['x','y'])if(typeof a[k]!=='number'||!Number.isFinite(a[k])||a[k]<0||a[k]>Math.max(m.width,m.height))err('Koordinat anchor tidak valid');if(!props.sceneEditor?.[payload.scene]?.layers?.[payload.layer])err('Layer tidak ditemukan');props.visualAnchors??={};props.visualAnchors[payload.scene]??={};props.visualAnchors[payload.scene][payload.layer]={x:round(a.x),y:round(a.y)};
 }
 m.defaultProps=props;const before=readFileSync(p.file,'utf8'),after=JSON.stringify(m,null,2)+'\n';if(before!==after){targets.push({file:p.file,before,after});changed=true;}
 }else err('Jenis penyimpanan tidak dikenali');if(!changed)return {ok:true,message:'Belum ada perubahan.'};saveAtomic(slug,targets);return {ok:true,message:'Perubahan disimpan permanen. Refresh preview untuk melihat hasil.'};}
function undo(slug){project(slug);const f=backupName(slug);if(!existsSync(f))err('Belum ada riwayat Undo');const items=JSON.parse(readFileSync(f,'utf8'));const next=[];for(const it of items){const file=resolve(ROOT,it.file);if(!file.startsWith(ROOT+sep)||!existsSync(file))err('Riwayat tidak valid');const current=readFileSync(file,'utf8');if(current!==it.after)err('File sudah berubah dari luar. Undo dibatalkan agar perubahan pengguna tidak tertimpa');next.push({file,before:it.after,after:it.before});}saveAtomic(slug,next);return {ok:true,message:'Undo berhasil, dan dapat diulang untuk Redo.'};}
async function frame(slug,frameNumber){const p=project(slug),m=p.manifest;const frame=Math.max(0,Math.min(m.durationInFrames-1,Math.floor(Number(frameNumber)||0)));// Perbarui Preview selalu mengambil frame baru termasuk perubahan source / CSS dari luar editor.
const key=slug+'_'+frame+'_'+Date.now(); const c=caches.get(key);if(c&&existsSync(c))return c;const bin=join(ROOT,'node_modules','.bin',process.platform==='win32'?'remotion.cmd':'remotion');if(!existsSync(bin))err('Remotion belum terinstal. Jalankan npm run dev terlebih dahulu.');const out=join(jobdir,`${slug}_${frame}_${Date.now()}.png`);await new Promise((ok,fail)=>{const proc=spawn(bin,['still','src/index.ts',m.id,out,`--frame=${frame}`,'--overwrite'],{cwd:ROOT,shell:process.platform==='win32'});let logs='';let timeout=setTimeout(()=>{proc.kill();fail(Error('Render frame melewati 90 detik'))},90000);for(const stream of [proc.stdout,proc.stderr])stream?.on('data',c=>logs=(logs+String(c)).slice(-1500));proc.on('error',e=>{clearTimeout(timeout);fail(e)});proc.on('exit',code=>{clearTimeout(timeout);code===0&&existsSync(out)?ok():fail(Error('Tidak bisa merender frame: '+logs.slice(-450)))})});caches.set(key,out);if(caches.size>12){const k=caches.keys().next().value;const old=caches.get(k);caches.delete(k);try{rmSync(old)}catch{}}return out;}
async function readBody(req){let s='';for await(const b of req){s+=b;if(s.length>250000)err('Payload terlalu besar')}return JSON.parse(s||'{}')}
export async function visualHandler(req,res,url){if(url.pathname==='/visual'&&req.method==='GET'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8',...cors});res.end(readFileSync(HTML));return true;}
if(!url.pathname.startsWith('/api/visual/'))return false;
try{
 if(req.method==='GET'&&url.pathname==='/api/visual/projects')return json(res,200,{projects:list()})||true;
 if(req.method==='GET'&&url.pathname==='/api/visual/layers'){
  const p=project(url.searchParams.get('slug'));let source=[],error='';try{source=sourceLayers(p.manifest.slug)}catch(e){error='Daftar layer source belum bisa dibaca: '+e.message;}
  return json(res,200,{project:{id:p.manifest.id,title:p.manifest.title,slug:p.manifest.slug,fps:p.manifest.fps,durationInFrames:p.manifest.durationInFrames,width:p.manifest.width,height:p.manifest.height},sceneEditor:p.manifest.defaultProps?.sceneEditor||{},cursorEditor:p.manifest.defaultProps?.cursorEditor||{},visualAnchors:p.manifest.defaultProps?.visualAnchors||{},source,error})||true;
 }
 if(req.method==='POST'&&url.pathname==='/api/visual/save'){
  const origin=req.headers.origin;const u=new URL(req.url,'http://localhost');const allow=['http://localhost:'+u.host.split(':').at(-1),'http://127.0.0.1:'+u.host.split(':').at(-1)];if(origin&&!allow.includes(origin))err('Origin tidak diizinkan');const b=await readBody(req);return json(res,200,save(b.slug,b))||true;
 }
 if(req.method==='POST'&&url.pathname==='/api/visual/undo'){const b=await readBody(req);return json(res,200,undo(b.slug))||true;}
 if(req.method==='GET'&&url.pathname==='/api/visual/frame'){
  const file=await frame(url.searchParams.get('slug'),url.searchParams.get('frame'));
  res.writeHead(200,{'Content-Type':'image/png','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(readFileSync(file));return true;
 }
 json(res,404,{error:'Rute tidak ditemukan'});return true;
}catch(e){json(res,400,{error:String(e.message||e)});return true;}}
