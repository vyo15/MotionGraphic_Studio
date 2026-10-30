#!/usr/bin/env node
/** Local Concat diagnostics: reads the editor's own log rather than pretending to know its state. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ_CAP = 2 * 1024 * 1024;
const isFile = p => {try { return fs.statSync(p).isFile(); } catch {return false;}};
const isDir = p => {try { return fs.statSync(p).isDirectory(); } catch {return false;}};
const parseJSON = p => {try {return JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));}catch{return null;}};
function tail(p,max=READ_CAP){
  if(!isFile(p))return '';
  const fd=fs.openSync(p,'r');
  try{
    const size=fs.fstatSync(fd).size; const length=Math.min(size,max);
    const buf=Buffer.alloc(length);
    fs.readSync(fd,buf,0,length,size-length);
    return buf.toString('utf8');
  }finally{fs.closeSync(fd);}
}
const dateMs = s => {const t=Date.parse(s||'');return Number.isFinite(t)?t:0;};
function allLogPaths({root=DEFAULT_ROOT,env=process.env,binaryPath}={}) {
  const dirs=[
    path.join(root,'apps','concat','runtime','current','portable','logs'),
    ...(binaryPath ? [path.join(path.dirname(binaryPath),'portable','logs')] : []),
    ...(env.LOCALAPPDATA ? [path.join(env.LOCALAPPDATA,'app.concat.editor','logs')] : []),
    ...(env.APPDATA ? [path.join(env.APPDATA,'app.concat.editor','logs')] : []),
  ];
  return [...new Set(dirs)].filter(isDir).flatMap(dir=>
    fs.readdirSync(dir).filter(name=>/^concat-.*\.log$/i.test(name))
      .map(name=>path.join(dir,name)).filter(isFile));
}
function nativeOpenedAt(file){
  // Concat's native filenames are UTC timestamps for WHEN a run opens.
  // Prefer that over mtime: a new safe-mode run may start within seconds
  // of an old crash and otherwise be attributed to the wrong attempt.
  const match=path.basename(file).match(/^concat-(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})\.log$/i);
  if(!match)return null;
  const time=Date.UTC(...match.slice(1).map(Number).map((x,i)=>i===1?x-1:x));
  return Number.isFinite(time)?time:null;
}
function rankedLogs(options={},start=0,end=0){
  const files=allLogPaths(options).map(file=>{
    const stat=fs.statSync(file);
    return {file,mtime:stat.mtimeMs,opened:nativeOpenedAt(file)};
  });
  const matched=start ? files.filter(x=>{
    if(x.opened!==null)return x.opened >= start-5_000 && (!end || x.opened <= end+2_000);
    return x.mtime >= start-10_000 && (!end || x.mtime <= end+2_500);
  }) : files;
  return matched.sort((a,b)=>b.mtime-a.mtime).map(x=>x.file);
}


/** Existing Remotion render logs live outside Master; do not duplicate them. */
export function latestRemotionLog(root=DEFAULT_ROOT){
  const dirs=[path.resolve(root,'..','MotionGraphic-Studio-Backups','Logs'),path.resolve(root,'..','MotionGraphic-Studio-Backups','Runtime')];
  const files=dirs.filter(isDir).flatMap(dir=>fs.readdirSync(dir).filter(x=>/\.log$/i.test(x)).map(x=>path.join(dir,x)).filter(isFile));
  const newest=files.sort((a,b)=>fs.statSync(b).mtimeMs-fs.statSync(a).mtimeMs)[0]||null;
  if(!newest)return null;
  const ending=tail(newest,48*1024);
  const errors=ending.split(/\r?\n/).filter(x=>/\b(?:ERROR|FATAL|FAIL(?:ED|URE)?)\b|ECONNRESET/i.test(x));
  return {file:newest,errors:errors.slice(-3).map(x=>x.slice(0,300))};
}

/** Pure, independently tested classification. A warning alone cannot prove a crash. */
export function diagnoseText(text='',exitCode=null){
  const data=String(text);
  const lines=data.split(/\r?\n/).filter(Boolean);
  const matches=lines.filter(line=>/FATAL|ERROR|panic|device was lost|out of memory|failed to (?:decode|open)|exception|could not (?:decode|load|open)|dll not found|0xC000/i.test(line));
  const evidence=matches.slice(-6).map(x=>x.slice(0,450));
  const contains=regexp=>regexp.test(data);
  let code='UNKNOWN', reason='Penyebab belum dapat dipastikan dari log yang tersedia.',action='Periksa log native dan coba file video lain. Jika berulang, gunakan npm run concat:safe.';
  let confidence='belum diketahui';
  if(contains(/(?:0xC0000005|EXCEPTION_ACCESS_VIOLATION|SIGSEGV|bad memory access)/i)){
    code='ACCESS_VIOLATION';reason='Proses mengakses memori tidak valid; modul yang terlibat mungkin tercantum dalam log.';
    action='Periksa nama DLL pada baris FATAL dan bandingkan dengan Windows Event Viewer; jangan langsung menghapus aset.';confidence='indikasi kuat';
  }else if(contains(/(?:0xC0000135|STATUS_DLL_NOT_FOUND|dll not found|missing (?:\.dll|library)|cannot find.*\.dll)/i)){
    code='MISSING_DLL';reason='Ada indikasi pustaka DLL/runtime tidak ditemukan.';action='Periksa isi runtime portable dan DLL di samping concat.exe; jangan memasang file DLL dari sumber tidak resmi.';confidence='indikasi kuat';
  }else if(contains(/(?:device was lost|GPU device reported an error|device.?lost|DXGI_ERROR_DEVICE_REMOVED|out of (?:video |gpu )?memory|E_OUTOFMEMORY|VK_ERROR_OUT_OF_DEVICE_MEMORY)/i)){
    code='GPU';reason='Log mengindikasikan kesalahan GPU, driver, atau kehabisan memori grafis.';action='Jalankan npm run concat:safe; periksa driver GPU dan coba impor file lebih ringan.';confidence='indikasi kuat';
  }else if(contains(/(?:failed to decode|decode.*failed|decoder.*error|invalid data found|unsupported codec|avcodec.*error|could not open media)/i)){
    code='MEDIA_DECODER';reason='Log menunjukkan kemungkinan kegagalan membaca atau mendekode media.';action='Coba impor MP4 H.264 + AAC sederhana, cek video dengan media_probe, dan bandingkan dengan sumber aslinya.';confidence='indikasi kuat';
  }else if(contains(/(?:\bpanic at\b|panicked at|thread .* panicked)/i)){
    code='PANIC';reason='Ada panic internal aplikasi yang tercatat.';action='Simpan file log dan laporkan ke issue resmi Concat beserta langkah reproduksi.';confidence='indikasi kuat';
  }else if(exitCode!==null && Number(exitCode)!==0){
    code='UNEXPECTED_EXIT';reason=`Concat berakhir dengan exit code ${exitCode}, tetapi penyebab pastinya belum terlihat dalam log.`;
    action='Bandingkan log native dengan Windows Event Viewer; coba npm run concat:safe jika masih tertutup.';confidence='terbatas';
  }else if(exitCode===0){
    code='NORMAL_EXIT';reason='Proses berakhir dengan kode 0; ini tidak membuktikan terjadi crash.';action='Tidak diperlukan pemulihan otomatis.';confidence='proses selesai';
  }else if(evidence.length){
    code='LOG_WARNING';reason='Ada pesan error di log, tetapi belum ada bukti proses crash.';
    action='Periksa konteks pesan dan apakah masalah dapat direproduksi.';confidence='terbatas';
  }
  return {code,reason,action,confidence,evidence};
}
export function redactForSharing(value){
  return String(value)
    .replace(/(Authorization\s*[:=]\s*Bearer\s+)[^\s"']+/gi,'$1[RAHASIA]')
    .replace(/((?:token|password|secret|api[_-]?key)\s*[:=]\s*)[^\s,;"']+/gi,'$1[RAHASIA]')
    .replace(/[A-Z]:\\Users\\[^\\\s]+/gi,'C:\\Users\\[USER]')
    .replace(/\/Users\/[^/\s]+/g,'/Users/[USER]')
    .replace(/\b[\w.%+-]+@[\w.-]+\.[A-Z]{2,}\b/gi,'[EMAIL]');
}
function newestSession(root){
  const dir=path.join(root,'apps','concat','logs','sessions');
  if(!isDir(dir))return null;
  return fs.readdirSync(dir,{withFileTypes:true}).filter(x=>x.isDirectory())
    .map(x=>path.join(dir,x.name)).filter(p=>isFile(path.join(p,'session.json')))
    .sort((a,b)=>path.basename(b).localeCompare(path.basename(a)))[0]||null;
}
export function analyze({root=DEFAULT_ROOT,session=null,env=process.env}={}){
  const folder=session||newestSession(root);
  const meta=folder?parseJSON(path.join(folder,'session.json')):null;
  const attempts=[];
  if(meta&&folder){
    for(const name of (meta.attempts||[])){
      const attemptDir=path.join(folder,name);
      const status=parseJSON(path.join(attemptDir,'attempt.json'));
      if(!status)continue;
      const since=dateMs(status.startedAtUtc),end=dateMs(status.finishedAtUtc);
      const native=rankedLogs({root,env,binaryPath:status.binaryPath},since,end);
      const mainLog=native[0]||null;
      const texts=[mainLog?tail(mainLog):'',tail(path.join(attemptDir,'stderr.log')),tail(path.join(attemptDir,'stdout.log')),tail(path.join(attemptDir,'windows-events.txt'))];
      let diagnostic=diagnoseText(texts.join('\n'),typeof status.exitCode==='number'?status.exitCode:null);
      if(status.note && status.exitCode===null){
        diagnostic={code:'LAUNCH_ERROR',reason:'Gagal membuka/memantau aplikasi: '+status.note,
          action:'Periksa path concat.exe dan file DLL, lalu lihat laporan sesi. Hindari menghapus profil atau project.',
          confidence:'pesan launcher',evidence:[String(status.note).slice(0,450)]};
      }
      attempts.push({name,mode:status.mode||'normal',exitCode:status.exitCode??null,nativeLog:mainLog,diagnostic});
    }
  }
  if(!attempts.length){
    const first=rankedLogs({root,env})[0]||null;
    return {session:folder,attempts:[],nativeLog:first,diagnostic:diagnoseText(first?tail(first):'')};
  }
  const worst=attempts.find(x=>x.exitCode!==null && x.exitCode!==0) || attempts.find(x=>!['NORMAL_EXIT','UNKNOWN'].includes(x.diagnostic.code)) || attempts.at(-1);
  return {session:folder,attempts,nativeLog:worst.nativeLog,diagnostic:worst.diagnostic};
}
export function formatReport(report,{share=false}={}){
  const a=report.attempts;
  let rows=['=== MOTIONGRAPHIC STUDIO — DIAGNOSTIK CONCAT ==='];
  if(a.length){
    rows.push(`Sesi: ${report.session}`);
    for(const item of a)rows.push(`Percobaan ${item.name} (${item.mode}): exit ${item.exitCode??'belum diketahui'} — ${item.diagnostic.code}`);
    if(a.length>1 && a[0].exitCode!==0 && a.at(-1).exitCode===0)rows.push('Status: crash pertama tercatat; mode aman berhasil dibuka/ditutup normal (belum membuktikan proses import sudah pulih).');
  }else {
    rows.push('Belum ada sesi launcher yang tercatat; membaca log native terbaru bila tersedia.');
    if(!report.nativeLog){
      rows.push('Status: Belum ada data diagnostik. Ini bukan indikasi error.');
      rows.push('Langkah: Jalankan npm run concat, gunakan Concat, lalu cek npm run logs jika perlu.');
      return rows.join('\n')+'\n';
    }
  }
  rows.push(`Hasil: ${report.diagnostic.reason}`);
  rows.push(`Keyakinan: ${report.diagnostic.confidence}`);
  rows.push(`Langkah: ${report.diagnostic.action}`);
  rows.push(`Log Concat: ${report.nativeLog||'Belum ditemukan'}`);
  if(report.diagnostic.evidence.length){rows.push('Bukti log (maks 6 baris):',...report.diagnostic.evidence.map(x=>'  '+x));}
  rows.push('Log disimpan lokal, tidak dikirim otomatis. Penyebab pasti membutuhkan bukti dari sesi yang crash.');
  return share?redactForSharing(rows.join('\n')+'\n'):rows.join('\n')+'\n';
}
function cli(){
  const args=process.argv.slice(2);
  const sessionAt=args.indexOf('--session');
  if(sessionAt>=0&&!args[sessionAt+1])throw Error('--session memerlukan path direktori');
  const report=analyze({session:sessionAt>=0?path.resolve(args[sessionAt+1]):null});
  const share=args.includes('--share');
  const content=formatReport(report,{share});
  console.log(content);
  if(report.session){
    const output=path.join(report.session,share?'RINGKASAN-BAGI.txt':'RINGKASAN.txt');
    fs.writeFileSync(output,content,'utf8');
    if(!share){
      const data={...report,generatedAtUtc:new Date().toISOString()};
      fs.writeFileSync(path.join(report.session,'report.json'),JSON.stringify(data,null,2)+'\n');
    }
    console.log(`[LOKAL] ${output}`);
  }
  if(!share){
    const remotion=latestRemotionLog();
    console.log(remotion?`[REMOTION] Log render/runtime terakhir: ${remotion.file}`:'[REMOTION] Belum ada log render/runtime; log npm run dev tetap tampil di terminal Studio.');
    if(remotion?.errors?.length)console.log('[REMOTION] Perhatian pada log: '+remotion.errors.join(' | '));
  }
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{cli();}catch(error){console.error('[LOGS] '+error.message);process.exitCode=1;}
}
