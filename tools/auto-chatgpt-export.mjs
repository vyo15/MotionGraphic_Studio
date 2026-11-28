/** Debounced, single-flight source handoff. Runs only during local Studio session. */
import {spawn} from 'node:child_process';
import path from 'node:path';
import {masterEntries,entrySignature} from './master-export-inputs.mjs';
export function startAutoChatgptExport({root,isIdle,pollMs=3000,quietMs=8000,now=Date.now,signature=async()=>entrySignature(await masterEntries(root,{fast:true})),run=()=>new Promise((resolve,reject)=>{
 const child=spawn(process.execPath,[path.join(root,'tools','zip-video.mjs'),'--chatgpt'],{cwd:root,stdio:['ignore','inherit','inherit'],windowsHide:true});
 child.on('error',reject);child.on('close',code=>code===0?resolve():reject(Object.assign(Error('ekspor gagal (kode '+code+')'),{transient:code===75})));
})}={}){
 let closed=false,busy=false,observed=null,exported=null,changedAt=0,failed=null,retryAt=0,retries=0,retrySignature=null;
 async function tick(){
  if(closed||busy)return;
  busy=true;
  try{
   if(!isIdle()){observed=null;return;}
   const current=await signature();
   if(closed||!isIdle()){observed=null;return;}
   if(current!==observed){observed=current;changedAt=now();if(current!==retrySignature){retrySignature=current;retryAt=0;retries=0;}return;}
   if(current===exported||current===failed||now()-changedAt<quietMs||now()<retryAt)return;
   console.log('[CHATGPT] Menyiapkan ZIP terbaru otomatis...');
   try{await run();if(await signature()===current)exported=current;}
   catch(e){if(e.transient&&retries<2){retries++;retryAt=now()+5000*retries;console.warn('[CHATGPT] File terkunci sementara; retry '+retries+'/2. ZIP sebelumnya aman.');}else{failed=current;console.warn('[CHATGPT] '+e.message+'; ZIP sebelumnya dipertahankan. Perubahan source berikutnya akan mencoba lagi.');}}
  }catch(e){if(failed!==e.message){failed=e.message;console.warn('[CHATGPT] '+e.message)}}
  finally{busy=false;}
 }
 const timer=setInterval(()=>void tick(),pollMs);timer.unref?.();
 void tick();
 return {close(){closed=true;clearInterval(timer)},tick};
}
