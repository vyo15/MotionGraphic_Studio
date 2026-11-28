import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const hash=v=>createHash('sha256').update(v).digest('hex');
export function canonical(v){if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';return JSON.stringify(v);}
function walk(base,relative=''){const dir=path.join(base,relative);if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0).flatMap(e=>{const r=path.join(relative,e.name);if(e.isSymbolicLink())throw Error('Symlink not supported in evidence: '+r);return e.isDirectory()?walk(base,r):e.isFile()?[r]:[];});}
// Advisory watcher memo only. Actual capture, render gate and final export re-read bytes.
const memo=new Map();
export function fileHash(file,fast=false){if(!fast)return hash(fs.readFileSync(file));const s=fs.statSync(file),key=[s.size,s.mtimeMs,s.ctimeMs,s.ino].join(':');const old=memo.get(file);if(old?.key===key)return old.digest;const digest=hash(fs.readFileSync(file));if(memo.size>=4096)memo.clear();memo.set(file,{key,digest});return digest;}
function group(base,files,fast=false){return hash(canonical(files.map(f=>[f.replaceAll('\\','/'),fileHash(path.join(base,f),fast)]).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0)));}
export function spatialEvidence(dir,{props,compositionId,mode='preview',masterRoot=root,environment,renderProfile,fast=false}={}){
 const m=JSON.parse(fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8'));
 const selected=props??m.defaultProps??{};
 const production=['spatial-plan.json','motion-plan.json','editable-blueprint.json','sound-cues.json'].map(f=>'production/'+f).filter(f=>fs.existsSync(path.join(dir,f)));
 const mirror=path.join(masterRoot,'public','videos',m.slug??'');
 const groups={mirror:m.slug&&fs.existsSync(mirror)?group(mirror,walk(mirror),fast):null,manifest:group(dir,['motiongraphic-video.json'],fast),source:group(dir,walk(dir,'src'),fast),plans:group(dir,production,fast),assets:group(dir,walk(dir,'public'),fast),master:group(masterRoot,['package.json','package-lock.json','contracts/spatial-profiles.json','contracts/addon.schema.json',...walk(masterRoot,'templates/production-toolkit'),...walk(masterRoot,'src'),...walk(masterRoot,'tools').filter(f=>/spatial|qa-design-guide|render-profiles|render-menu|qa-render|qa-motion-plan|planned-holds|validate-addon/.test(f))].filter(f=>fs.existsSync(path.join(masterRoot,f))),fast),props:hash(canonical(selected))};
 const context={compositionId:compositionId??m.id,mode,props:selected,...(environment?{environment}:{}),...(renderProfile?{renderProfile}:{})};return {schemaVersion:1,groups,context,digest:hash(canonical({groups,context}))};
}
export function evidenceStatus(dir,trace,options={}){if(!trace.evidence)return 'UNVERIFIED';try{const c=trace.evidence.context;if(!c||!['preview','final'].includes(c.mode)||!c.props||typeof c.compositionId!=='string')return 'UNVERIFIED';const current=spatialEvidence(dir,{...c,...options});return current.digest===trace.evidence.digest?'CURRENT':'STALE';}catch{return 'UNVERIFIED';}}
