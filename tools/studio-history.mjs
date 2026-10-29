/** Transactional edit history, shared by the Easy Editor, Visual Editor and Hub.
 * Content is stored outside the Master so ZIP exports don't carry undo internals.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {exportRoot} from './export-paths.mjs';
import {ROOT} from './menu-helper.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
const dir=()=>path.join(exportRoot(),'Editor-History');
const read=(slug)=>{const p=path.join(dir(),slug+'.json');if(!fs.existsSync(p))return {undo:[],redo:[]};return JSON.parse(fs.readFileSync(p,'utf8'));};
const writeAtomic=(file,text)=>{fs.mkdirSync(path.dirname(file),{recursive:true});const tmp=file+'.'+process.pid+'.tmp';try{fs.writeFileSync(tmp,text,{flag:'wx'});fs.renameSync(tmp,file)}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp)}};
const validate=(slug,items)=>{
 if(!/^[a-z][a-z0-9-]{1,48}$/.test(slug))throw Error('Slug tidak valid');
 if(!Array.isArray(items)||!items.length||items.length>20)throw Error('Transaksi kosong atau terlalu besar');
 for(const it of items){const f=path.resolve(it.file),project=path.join(ROOT,'projects',slug);if(!f.startsWith(project+path.sep))throw Error('Operasi di luar project ditolak');
 if(!fs.existsSync(f)||fs.lstatSync(f).isSymbolicLink())throw Error('File tidak ada atau symlink');
 if(typeof it.before!=='string'||typeof it.after!=='string'||it.after.length>2_000_000)throw Error('Isi tidak valid');
 if(fs.readFileSync(f,'utf8')!==it.before)throw Error('File berubah dari editor lain; muat ulang sebelum menyimpan');
 }};
export function applyEdit(slug,items){
 validate(slug,items);const history=read(slug);const tx={at:new Date().toISOString(),files:items.map(x=>({file:path.relative(ROOT,x.file),before:x.before,after:x.after}))};
 const completed=[];
 try{for(const it of items){writeAtomic(it.file,it.after);completed.push(it)}
 history.undo.push(tx);history.undo=history.undo.slice(-60);history.redo=[];
 writeAtomic(path.join(dir(),slug+'.json'),JSON.stringify(history));
 }catch(e){for(const it of completed.reverse())try{writeAtomic(it.file,it.before)}catch{}throw e}
 return {ok:true,message:'Tersimpan. Riwayat Undo/Redo tersedia (maksimal 60 langkah).'};
}
export function changeHistory(slug,action){
 if(!['undo','redo'].includes(action))throw Error('Operasi tidak valid');
 if(!/^[a-z][a-z0-9-]{1,48}$/.test(slug))throw Error('Slug tidak valid');
 const h=read(slug),from=h[action],to=h[action==='undo'?'redo':'undo'];
 if(!from.length)throw Error('Belum ada riwayat '+action);
 const tx=from.at(-1),items=tx.files.map(x=>({file:path.resolve(ROOT,x.file),before:action==='undo'?x.after:x.before,after:action==='undo'?x.before:x.after}));
 validate(slug,items);const completed=[];
 try{for(const it of items){writeAtomic(it.file,it.after);completed.push(it)}from.pop();to.push(tx);writeAtomic(path.join(dir(),slug+'.json'),JSON.stringify(h))}
 catch(e){for(const it of completed.reverse())try{writeAtomic(it.file,it.before)}catch{}throw e}
 return {ok:true,message:action==='undo'?'Undo berhasil.':'Redo berhasil.',history:historyStatus(slug)};
}
export function historyStatus(slug){const h=read(slug);return {undo:h.undo.length,redo:h.redo.length};}
export function writeAtomicFile(file,buffer){fs.mkdirSync(path.dirname(file),{recursive:true});const tmp=file+'.'+process.pid+'.tmp';try{fs.writeFileSync(tmp,buffer,{flag:'wx'});fs.renameSync(tmp,file)}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp)}};
