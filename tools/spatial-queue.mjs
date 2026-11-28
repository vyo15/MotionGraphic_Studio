/** Cross-process exclusive QA/render lease. No kill of unrelated PID or forced source edits. */
import fs from 'node:fs';import path from 'node:path';import {randomUUID} from 'node:crypto';import {setTimeout as delay} from 'node:timers/promises';
export function qaDirectory(root){const d=path.join(root,'qa-out');if(fs.existsSync(d)&&fs.lstatSync(d).isSymbolicLink())throw Error('Symlink qa-out refused');fs.mkdirSync(d,{recursive:true});return d;}
const alive=pid=>{if(!Number.isInteger(pid)||pid<=0)return true;try{process.kill(pid,0);return true;}catch(e){return e.code!=='ESRCH';}};
export function tryQaLease(root,kind){const dir=qaDirectory(root),file=path.join(dir,'.qa-active.lock'),token=randomUUID();let fd;
 try{fd=fs.openSync(file,'wx');fs.writeFileSync(fd,JSON.stringify({pid:process.pid,token,kind,started:Date.now()}));fs.closeSync(fd);fd=undefined;}catch(e){if(fd!==undefined){fs.closeSync(fd);fs.rmSync(file,{force:true});}if(e.code!=='EEXIST')throw e;
  // Recovery serialized; never remove unreadable locks or a live owner's lock.
  const recovery=file+'.recovery';let recoverFd;try{recoverFd=fs.openSync(recovery,'wx');const s=fs.lstatSync(file);if(s.isSymbolicLink()||!s.isFile())throw Error('Unsafe QA lock');const prev=JSON.parse(fs.readFileSync(file,'utf8'));if(!alive(prev.pid)){fs.unlinkSync(file);}}catch(x){if(!['EEXIST','ENOENT'].includes(x.code)&&!(x instanceof SyntaxError))throw x;}finally{if(recoverFd!==undefined){fs.closeSync(recoverFd);fs.unlinkSync(recovery);}}return null;
 }
 let released=false;const release=()=>{if(released)return;released=true;try{const v=JSON.parse(fs.readFileSync(file,'utf8'));if(v.token===token)fs.unlinkSync(file);}catch{}};return {release,token};
}
function waitDirectory(root){const d=path.join(qaDirectory(root),'.qa-waiters');if(fs.existsSync(d)&&fs.lstatSync(d).isSymbolicLink())throw Error('Unsafe QA waiter directory');fs.mkdirSync(d,{recursive:true});return d;}
function waiting(d){const rows=[];for(const name of fs.readdirSync(d).filter(n=>/^\d+-[a-f0-9-]+\.json$/.test(n)).sort()){const file=path.join(d,name);try{if(fs.lstatSync(file).isSymbolicLink())throw Error('Unsafe QA waiter');const row=JSON.parse(fs.readFileSync(file,'utf8'));if(!alive(row.pid))fs.unlinkSync(file);else rows.push(name);}catch(e){if(e.code!=='ENOENT'&&!(e instanceof SyntaxError))throw e;}}return rows;}
export async function acquireQaLease(root,kind,{waitMs=600000,signal}={}){
 const end=Date.now()+waitMs,d=waitDirectory(root);let ticket;
 try{if(waitMs>0){ticket=String(Date.now()).padStart(14,'0')+'-'+randomUUID()+'.json';fs.writeFileSync(path.join(d,ticket),JSON.stringify({pid:process.pid,kind}),{flag:'wx'});}
  for(;;){if(signal?.aborted)throw Error('QA cancelled');const queue=waiting(d);if(ticket?queue[0]===ticket:queue.length===0){const lease=tryQaLease(root,kind);if(lease)return lease;}if(Date.now()>=end)throw Object.assign(Error('QA BUSY: capture/render already running'),{code:'QA_BUSY'});await delay(Math.min(1000,Math.max(1,end-Date.now())),undefined,{signal});}
 }finally{if(ticket)fs.rmSync(path.join(d,ticket),{force:true});}
}
