/** Debounced, single-flight source handoff. Runs only during local Studio session. */
import {spawn} from 'node:child_process';
import path from 'node:path';
import {masterEntries,entrySignature} from './master-export-inputs.mjs';
export function startAutoChatgptExport({root,isIdle,pollMs=3000,quietMs=8000,now=Date.now,signature=async()=>entrySignature(await masterEntries(root)),run=()=>new Promise((resolve,reject)=>{
 const child=spawn(process.execPath,[path.join(root,'tools','zip-video.mjs'),'--chatgpt'],{cwd:root,stdio:['ignore','inherit','inherit'],windowsHide:true});
 child.on('error',reject);child.on('close',code=>code===0?resolve():reject(Error('ekspor gagal (kode '+code+')')));
})}={}){
 let closed=false,busy=false,observed=null,exported=null,changedAt=0,failed=null;
 async function tick(){
  if(closed||busy)return;
  busy=true;
  try{
   if(!isIdle()){observed=null;return;}
   const current=await signature();
   if(closed||!isIdle()){observed=null;return;}
   if(current!==observed){observed=current;changedAt=now();return;}
   if(current===exported||current===failed||now()-changedAt<quietMs)return;
   console.log('[CHATGPT] Menyiapkan ZIP terbaru otomatis...');
   try{await run();if(await signature()===current)exported=current;}
   catch(e){failed=current;console.warn('[CHATGPT] '+e.message+'; ZIP sebelumnya dipertahankan. Perubahan source berikutnya akan mencoba lagi.');}
  }catch(e){if(failed!==e.message){failed=e.message;console.warn('[CHATGPT] '+e.message)}}
  finally{busy=false;}
 }
 const timer=setInterval(()=>void tick(),pollMs);timer.unref?.();
 void tick();
 return {close(){closed=true;clearInterval(timer)},tick};
}
