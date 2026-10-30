/**
 * Auto-sync folder-first Master ketika Remotion Studio sedang berjalan.
 * Menangani copy folder ke projects/ dan ZIP masuk ke library/masuk.
 * Debounce + pemantauan berkala mencegah gagal event fs.watch di beberapa Windows/NAS.
 * Tidak membuka studio lain dan tidak menulis Root.tsx secara manual.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';

const metadata=(f)=>{
  try{const s=fs.statSync(f);return `${s.size}:${Math.floor(s.mtimeMs)}`}
  catch{return '-'}
};
const getPaths=root=>({projects:path.join(root,'projects'),inbox:path.join(root,'library','masuk')});
const stableFiles=(inbox,ageMs)=>{
  if(!fs.existsSync(inbox))return [];
  const now=Date.now();
  return fs.readdirSync(inbox).filter(name=>name.toLowerCase().endsWith('.zip')).filter(name=>{
    const f=path.join(inbox,name);
    try{return fs.statSync(f).isFile() && now-fs.statSync(f).mtimeMs>ageMs && completedZip(f)}catch{return false}
  });
};
// ZIP end-of-central-directory, sehingga ZIP yang sedang dicopy belum dianggap siap.
function completedZip(file){
  const fd=fs.openSync(file,'r');
  try{
    const size=fs.fstatSync(fd).size;
    if(size<22)return false;
    const len=Math.min(size,65557),buf=Buffer.alloc(len);
    fs.readSync(fd,buf,0,len,size-len);
    for(let i=len-22;i>=0;i--){
      if(buf.readUInt32LE(i)===0x06054b50){
        const comment=buf.readUInt16LE(i+20);
        if(i+22+comment!==len)continue;
        const cdSize=buf.readUInt32LE(i+12),cdOffset=buf.readUInt32LE(i+16);
        return cdOffset+cdSize<=size-len+i;
      }
    }
    return false;
  }finally{fs.closeSync(fd)}
}
function snapshot(root){
  const {projects,inbox}=getPaths(root),pieces=[];
  if(fs.existsSync(projects))for(const dir of fs.readdirSync(projects,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
    if(!dir.isDirectory()||dir.name.startsWith('_')||dir.name.startsWith('.'))continue;
    const folder=path.join(projects,dir.name),manifest=path.join(folder,'motiongraphic-video.json');
    pieces.push(`folder:${dir.name}:${metadata(manifest)}:${metadata(path.join(folder,'src'))}`);
    let entry='src/Video.tsx';
    try{entry=JSON.parse(fs.readFileSync(manifest,'utf8')).entry||entry}catch{}
    for(const rel of [entry,'src/SegmentVideo.tsx','src/config/segments.json','src/config/segments.ts','src/config/scenes.ts','src/config/series.ts']){
      pieces.push(`${dir.name}/${rel}:${metadata(path.join(folder,rel))}`);
    }
  }
  if(fs.existsSync(inbox))for(const entry of fs.readdirSync(inbox).filter(x=>x.toLowerCase().endsWith('.zip')).sort())pieces.push('zip:'+entry+':'+metadata(path.join(inbox,entry)));
  return pieces.join('|');
}
function nodeScript(root,script){
  return new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,[path.join(root,'tools',script)],{cwd:root,stdio:'inherit',windowsHide:true});
    child.on('error',reject);
    child.on('close',code=>code===0?resolve():reject(new Error(`${script}: exit code ${code}`)));
  });
}
export function startAutoSync({
  root,
  debounceMs=1350,
  pollMs=3000,
  zipAgeMs=4500,
  runSync=()=>nodeScript(root,'sync-projects.mjs'),
  runImport=()=>nodeScript(root,'import-inbox.mjs'),
}={}){
  if(!root)throw new Error('startAutoSync memerlukan root Master');
  const {projects,inbox}=getPaths(root);
  for(const dir of [projects,inbox])fs.mkdirSync(dir,{recursive:true});
  let closed=false,busy=false,queued=false,timer=null,lastSignature=snapshot(root);
  const watchers=[];
  async function execute(){
    if(closed){return}
    if(busy){queued=true;return}
    busy=true;
    try{
      const pendingZips=fs.readdirSync(inbox).filter(name=>name.toLowerCase().endsWith('.zip'));
      const toImport=stableFiles(inbox,zipAgeMs);
      // Jangan panggil import-inbox (yang memproses semua ZIP) bila masih ada
      // ZIP lain yang belum selesai dicopy ke folder inbox.
      if(toImport.length && toImport.length===pendingZips.length){
        console.log(`[AUTO SYNC] ${toImport.length} ZIP selesai disalin; import otomatis...`);
        await runImport();
      }
      await runSync();
      lastSignature=snapshot(root);
      console.log('[AUTO SYNC] Folder dan segmen baru sudah terdaftar. Refresh sidebar jika perlu.');
    }catch(e){
      console.error('[AUTO SYNC] '+e.message+' (video lama tidak dihapus; periksa project yang baru disalin)');
    }finally{
      busy=false;
      if(queued&&!closed){queued=false;schedule()}
    }
  }
  function schedule(){
    if(closed)return;
    clearTimeout(timer);
    timer=setTimeout(()=>{timer=null;void execute()},debounceMs);
  }
  function attach(dir){
    // Windows / Node terbaru: recursive memantau semua folder baru dan lama.
    // Jika tidak tersedia, polling signature tetap mendeteksi copy project.
    try{const w=fs.watch(dir,{recursive:true},schedule);w.on('error',e=>console.warn('[AUTO SYNC] Watcher error: '+e.message+'; polling tetap berjalan.'));watchers.push(w)}
    catch{
      try{const w=fs.watch(dir,schedule);w.on('error',e=>console.warn('[AUTO SYNC] Watcher error: '+e.message+'; polling tetap berjalan.'));watchers.push(w)}catch(e){console.warn('[AUTO SYNC] Watcher tidak tersedia: '+e.message)}
    }
  }
  attach(projects);attach(inbox);
  const interval=setInterval(()=>{
    if(closed)return;
    const next=snapshot(root);
    if(next!==lastSignature){lastSignature=next;schedule()}
    else if(stableFiles(inbox,zipAgeMs).length)schedule();
  },pollMs);
  return {
    close(){closed=true;clearTimeout(timer);clearInterval(interval);for(const w of watchers)w.close()},
    check(){if(snapshot(root)!==lastSignature)schedule()},
  };
}
