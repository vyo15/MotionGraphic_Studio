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
// Only changes that affect registration, Props, asset mirrors or VO Guide require sync.
// Editing scene TSX is owned by Remotion HMR and MUST NOT restart sync.
export function registrySignature(root){
  const {projects,inbox}=getPaths(root),pieces=[];
  pieces.push('native-props:'+metadata(path.join(root,'src','Root.tsx')));
  if(fs.existsSync(projects))for(const dir of fs.readdirSync(projects,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
    if(!dir.isDirectory()||dir.name.startsWith('_')||dir.name.startsWith('.'))continue;
    const folder=path.join(projects,dir.name);
    pieces.push(`folder:${dir.name}`);
    // Register a new entry or switch to native segment view if files appear.
    // Their content edits are handled by Remotion HMR, not a fresh sync.
    let entryRel='src/Video.tsx';
    try{entryRel=JSON.parse(fs.readFileSync(path.join(folder,'motiongraphic-video.json'),'utf8')).entry||entryRel}catch{}
    const safeEntry=typeof entryRel==='string'&&entryRel.startsWith('src/')&&!entryRel.includes('..')&&!entryRel.includes('\\');
    pieces.push(`entry-exists:${dir.name}:${safeEntry&&fs.existsSync(path.join(folder,entryRel))}`);
    pieces.push(`segment-component-exists:${dir.name}:${fs.existsSync(path.join(folder,'src','SegmentVideo.tsx'))}`);
    for(const rel of ['motiongraphic-video.json','src/config/narration.json','src/config/segments.json','src/config/segments.ts','src/config/scenes.ts','src/config/series.ts']){
      pieces.push(`${dir.name}/${rel}:${metadata(path.join(folder,rel))}`);
    }
    // Public assets must be mirrored after edits, including changes to nested files.
    const assets=path.join(folder,'public');
    function visit(directory,prefix=''){
      if(!fs.existsSync(directory))return;
      for(const entry of fs.readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
        if(entry.isSymbolicLink())continue;
        const next=path.join(directory,entry.name),name=prefix+entry.name;
        if(entry.isDirectory())visit(next,name+'/');
        else if(entry.isFile())pieces.push(`asset:${dir.name}/${name}:${metadata(next)}`);
      }
    }
    visit(assets);
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
  let closed=false,busy=false,timer=null,lastSignature=registrySignature(root);
  const watchers=[];
  async function execute(){
    if(closed){return}
    if(busy)return
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
      // A ZIP in the middle of being copied must not trigger expensive sync.
      if(pendingZips.length && toImport.length!==pendingZips.length)return;
      await runSync();
      lastSignature=registrySignature(root);
      console.log('[AUTO SYNC] Registrasi/VO/aset diperbarui. Edit TSX biasa hanya hot reload.');
    }catch(e){
      console.error('[AUTO SYNC] '+e.message+' (video lama tidak dihapus; periksa project yang baru disalin)');
    }finally{
      busy=false;
      // Ignore self-generated Root/mirror events; the next poll catches any
      // meaningful user edit not represented by the completed signature.
    }
  }
  function schedule(){
    if(closed)return;
    clearTimeout(timer);
    timer=setTimeout(()=>{timer=null;void execute()},debounceMs);
  }
  function onWatchChange(){
    // Ignore Remotion Save-to-code of ordinary TSX layers.  Only the
    // registrations/VO/asset/Root signature can trigger a sync.
    if(closed||busy)return;
    if(registrySignature(root)!==lastSignature)schedule();
  }
  function attach(dir){
    // Windows / Node terbaru: recursive memantau semua folder baru dan lama.
    // Jika tidak tersedia, polling signature tetap mendeteksi copy project.
    try{const w=fs.watch(dir,{recursive:true},onWatchChange);w.on('error',e=>console.warn('[AUTO SYNC] Watcher error: '+e.message+'; polling tetap berjalan.'));watchers.push(w)}
    catch{
      try{const w=fs.watch(dir,onWatchChange);w.on('error',e=>console.warn('[AUTO SYNC] Watcher error: '+e.message+'; polling tetap berjalan.'));watchers.push(w)}catch(e){console.warn('[AUTO SYNC] Watcher tidak tersedia: '+e.message)}
    }
  }
  attach(projects);attach(inbox);
  // Save to Code in Remotion Studio modifies generated Root defaultProps.
  // Watch it so changed VO Guide/Props can be merged into manifest/narration.
  const nativePropsFile=path.join(root,'src','Root.tsx');
  if(fs.existsSync(nativePropsFile))try{const w=fs.watch(nativePropsFile,onWatchChange);w.on('error',()=>{});watchers.push(w)}catch{}
  const interval=setInterval(()=>{
    if(closed)return;
    const next=registrySignature(root);
    if(next!==lastSignature){lastSignature=next;schedule()}
    else if(stableFiles(inbox,zipAgeMs).length)schedule();
  },pollMs);
  return {
    close(){closed=true;clearTimeout(timer);clearInterval(interval);for(const w of watchers)w.close()},
    check(){if(registrySignature(root)!==lastSignature)schedule()},
  };
}
