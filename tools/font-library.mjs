/** One-time official OFL download and explicit new-project local font provisioning. No dependencies. */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const upstream='https://raw.githubusercontent.com/google/fonts/main/ofl/';
export const FACES=[...[[400,'Regular'],[500,'Medium'],[600,'SemiBold'],[700,'Bold'],[800,'ExtraBold'],[900,'Black']].map(([weight,suffix])=>({family:'Poppins',folder:'poppins',file:`Poppins-${suffix}.ttf`,upstream:`Poppins-${suffix}.ttf`,weight:String(weight)})),{family:'Inter',folder:'inter',file:'Inter-Variable.ttf',upstream:'Inter[opsz,wght].ttf',weight:'100 900'},{family:'Manrope',folder:'manrope',file:'Manrope-Variable.ttf',upstream:'Manrope[wght].ttf',weight:'200 800'}];
const folders=[...new Set(FACES.map(x=>x.folder))];
const specs=[...FACES.map(f=>({file:`${f.folder}/${f.file}`,url:upstream+f.folder+'/'+encodeURIComponent(f.upstream),font:true})),...folders.map(f=>({file:`${f}/OFL.txt`,url:upstream+f+'/OFL.txt',font:false}))];
const sha=b=>createHash('sha256').update(b).digest('hex');
const ensure=(v,msg)=>{if(!v)throw Error(msg)};
const validateBytes=(b,s)=>{if(s.font){ensure(b.length>1000&&['00010000','4f54544f'].includes(b.subarray(0,4).toString('hex')),'Invalid font: '+s.file);}else ensure(b.toString('utf8').includes('SIL OPEN FONT LICENSE')&&b.toString('utf8').includes('Copyright'),'Invalid OFL: '+s.file);};
export function verifyFontPack(dir){const lock=JSON.parse(fs.readFileSync(path.join(dir,'font-lock.json'),'utf8'));ensure(lock.schemaVersion===1&&Array.isArray(lock.files)&&lock.files.length===specs.length,'Invalid font-lock');for(const s of specs){const a=lock.files.find(x=>x.file===s.file);ensure(a?.source===s.url,'Font source mismatch: '+s.file);const f=path.join(dir,s.file);ensure(fs.lstatSync(f).isFile()&&!fs.lstatSync(f).isSymbolicLink(),'Font must be local file: '+s.file);const b=fs.readFileSync(f);validateBytes(b,s);ensure(sha(b)===a.sha256,'Font checksum mismatch: '+s.file);}return lock;}
export async function installFonts(root=ROOT,fetcher=fetch){const parent=path.join(root,'library/fonts'),dest=path.join(parent,'official');fs.mkdirSync(parent,{recursive:true});if(fs.existsSync(dest)){verifyFontPack(dest);return 'already installed';}const stage=fs.mkdtempSync(path.join(parent,'.font-download-'));try{const records=[];for(const s of specs){const response=await fetcher(s.url,{signal:AbortSignal.timeout(30000),redirect:'error'});ensure(response.ok,`Download ${s.file}: HTTP ${response.status}`);const b=Buffer.from(await response.arrayBuffer());validateBytes(b,s);const destFile=path.join(stage,s.file);fs.mkdirSync(path.dirname(destFile),{recursive:true});fs.writeFileSync(destFile,b);records.push({file:s.file,source:s.url,sha256:sha(b)});}fs.writeFileSync(path.join(stage,'font-lock.json'),JSON.stringify({schemaVersion:1,license:'OFL-1.1',files:records},null,2)+'\n');verifyFontPack(stage);fs.renameSync(stage,dest);return 'installed';}finally{fs.rmSync(stage,{recursive:true,force:true});}}
export const STUB='// Draft placeholder. Provision via Master font library before review.\nexport const LocalFonts = () => null;\n';
export function fontLoader(slug){ensure(/^[a-z][a-z0-9-]{1,48}$/.test(slug),'Invalid slug');
 const sources=FACES.map(f=>` {family:'MG ${f.family}',weight:'${f.weight}',url:staticFile('videos/${slug}/fonts/${f.folder}/${f.file}')},`).join('\n');
 return `// Local OFL fonts, locked per project. No network at render.
import React,{useEffect,useState} from 'react';
import {staticFile,delayRender,continueRender,cancelRender} from 'remotion';
const sources=[
${sources}
];
let pending:Promise<void>|undefined;
const load=()=>pending??=(Promise.all(sources.map(async s=>{const face=new FontFace(s.family,"url('"+s.url+"')",{weight:s.weight,style:'normal'});document.fonts.add(await face.load());})).then(()=>undefined));
export const LocalFonts:React.FC=()=>{const [handle]=useState(()=>delayRender('Loading local OFL fonts'));useEffect(()=>{load().then(()=>continueRender(handle)).catch(err=>cancelRender(err));},[handle]);return null;};
`;
}
export function provisionProjectFonts(root,dir){const mf=JSON.parse(fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8'));if(mf.designContract!=='compact-balanced-v1')return false;const local=path.join(dir,'public/fonts'),loader=path.join(dir,'src/components/LocalFonts.tsx');if(fs.existsSync(local)){verifyFontPack(local);return false;}if(!fs.existsSync(loader)||fs.readFileSync(loader,'utf8')!==STUB)throw Error('LocalFonts bukan placeholder resmi; tidak ditimpa: '+mf.slug);const source=path.join(root,'library/fonts/official');if(!fs.existsSync(source))return false;
 const statePath=path.join(dir,'PRODUCTION-STATE.json');if(fs.existsSync(statePath)){const state=JSON.parse(fs.readFileSync(statePath,'utf8'));if(state.scenes?.some(s=>/approved|locked|\bACC\b/i.test(String(s.visualApproval??s.status))||/approved|locked|\bACC\b/i.test(String(s.visual)))||/approved|locked|\bACC\b/i.test(String(state.fullVideoApproval)))throw Error('Font provisioning refused: visual already approved '+mf.slug);}
 verifyFontPack(source);fs.mkdirSync(path.dirname(local),{recursive:true});const stage=fs.mkdtempSync(path.join(path.dirname(local),'.font-copy-'));try{fs.cpSync(source,stage,{recursive:true,force:false,errorOnExist:true});verifyFontPack(stage);fs.renameSync(stage,local);try{fs.writeFileSync(loader,fontLoader(mf.slug));}catch(e){fs.rmSync(local,{recursive:true,force:true});throw e;}return true;}finally{fs.rmSync(stage,{recursive:true,force:true});}}
export function prepareNewProjectFonts(root=ROOT){const source=path.join(root,'library/fonts/official');if(!fs.existsSync(source))return [];verifyFontPack(source);const out=[];for(const e of fs.readdirSync(path.join(root,'projects'),{withFileTypes:true})){if(!e.isDirectory()||e.name.startsWith('_')||e.name.startsWith('.'))continue;const dir=path.join(root,'projects',e.name),mf=path.join(dir,'motiongraphic-video.json');if(!fs.existsSync(mf))continue;if(provisionProjectFonts(root,dir))out.push(e.name);}return out;}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{const arg=process.argv[2];if(arg==='--install'){console.log('[FONT]',await installFonts());}else if(arg==='--verify'){verifyFontPack(path.join(ROOT,'library/fonts/official'));console.log('[FONT] verified');}else throw Error('Gunakan --install (sekali) atau --verify');}catch(e){console.error('[FONT]',e.message);process.exitCode=1;}}

/** Repair only this known missing asset pack, with the exact existing local loader.
 * Never rewrite source, manifest, an existing file or approval. Verify local OFL pack first. */
export function restoreSharingPrinterFonts(root=ROOT){
 root=path.resolve(root);
 const slug='sharing-printer-lan',dir=path.join(root,'projects',slug),loader=path.join(dir,'src/components/LocalFonts.tsx'),dest=path.join(dir,'public/fonts'),source=path.join(root,'library/fonts/official');
 if(!fs.existsSync(loader))return false;
 // Refuse following symlinks for destination and source paths inside Master.
 const safe=p=>{let cur=p;while(cur!==root){try{if(fs.lstatSync(cur).isSymbolicLink())throw Error('Font recovery symlink refused: '+cur);}catch(e){if(e.code!=='ENOENT')throw e;}const next=path.dirname(cur);if(next===cur)throw Error('Font recovery outside root');cur=next;}};
 safe(loader);safe(dest);safe(source);
 if(fs.readFileSync(loader,'utf8').replace(/\r\n/g,'\n')!==fontLoader(slug))return false;
 if(fs.existsSync(dest)){verifyFontPack(dest);return false;} // Never replace or merge a partial/locally changed pack.
 if(!fs.existsSync(source))throw Error('Sharing Printer font pack missing from library/fonts/official');
 verifyFontPack(source);
 fs.mkdirSync(path.dirname(dest),{recursive:true});const stage=fs.mkdtempSync(path.join(path.dirname(dest),'.font-recovery-'));
 try{fs.cpSync(source,stage,{recursive:true,force:false,errorOnExist:true});verifyFontPack(stage);if(fs.existsSync(dest))throw Error('Font destination appeared during recovery; refused');fs.renameSync(stage,dest);return true;}
 finally{fs.rmSync(stage,{recursive:true,force:true});}
}
