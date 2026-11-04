#!/usr/bin/env node
/**
 * Render MP4 dari komposisi asli Remotion: full, satu, pilihan, atau seluruh scene.
 * Semua pilihan dilakukan di proses induk; anak Remotion tidak membaca stdin.
 * Tidak mengubah source, manifest, atau compositing animasi. Output di luar Master.
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline/promises';
import {ROOT,readCatalog} from './menu-helper.mjs';
import {renderChoices,resolveMode,printSceneList,makeRenderPlan} from './render-plan.mjs';
import {removeAnsi,duration,progressBar,parseRenderUpdate,newProgressTracker} from './render-progress.mjs';
import {ensureExportDirs,exportPaths,availableFile,timestamp} from './export-paths.mjs';

const MAX_LOG_LINES=16;
const now=()=>Date.now();
const usage=()=>{
 console.log(`\nRENDER MP4 — MotionGraphic Studio\n\n  npm run render                          Pilih project & mode interaktif\n  npm run render -- IDVideo               Full video (kompatibel dengan perintah lama)\n  npm run render -- IDVideo --mode scene --scene 3\n  npm run render -- IDVideo --mode selected --scenes 1,3,5\n  npm run render -- IDVideo --mode all\n  node tools/render-menu.mjs IDVideo --mode all --dry-run\n\nMode: full | scene | selected | all. Nomor scene mulai dari 1.\nFile MP4 dan log berada di MotionGraphic-Studio-Backups (di luar Master).\n`);
};
function parseArgs(args){
 const o={video:null,mode:null,scene:null,scenes:null,dryRun:false,help:false};
 for(let i=0;i<args.length;i++){
  const arg=args[i];
  if(arg==='--help'||arg==='-h'){o.help=true;continue}
  if(arg==='--dry-run'){o.dryRun=true;continue}
  if(['--mode','--scene','--scenes'].includes(arg)){
   const key=arg.slice(2);
   if(o[key]!==null)throw Error(`Opsi ${arg} hanya boleh sekali.`);
   const value=args[++i];
   if(!value||value.startsWith('--'))throw Error(`Nilai untuk ${arg} wajib diisi.`);
   o[key]=value;continue;
  }
  if(arg.startsWith('-'))throw Error(`Opsi tidak dikenal: ${arg}`);
  if(o.video!==null)throw Error('Hanya satu ID project yang dapat dipilih.');
  o.video=arg;
 }
 if(o.scene!==null&&o.scenes!==null)throw Error('Gunakan --scene ATAU --scenes, bukan keduanya.');
 if(o.scene!==null&&o.mode===null)o.mode='scene';
 if(o.scenes!==null&&o.mode===null)o.mode='selected';
 return o;
}
function findVideo(videos,value){
 return videos.find((v,i)=>String(i+1)===value||v.id===value||v.slug===value);
}
async function choosePlan(args){
 const catalog=readCatalog();const videos=catalog.videos??[];
 if(!videos.length)throw Error('Belum ada project di katalog. Jalankan npm run sync.');
 const interactive=Boolean(process.stdin.isTTY);
 let rl;
 const ask=async question=>{
  if(!interactive)throw Error('Argumen belum lengkap. Gunakan --help untuk petunjuk.');
  if(!rl)rl=createInterface({input:process.stdin,output:process.stdout});
  return (await rl.question(question)).trim();
 };
 try{
  let video=args.video?findVideo(videos,args.video):null;
  if(args.video&&!video)throw Error(`Project "${args.video}" tidak ditemukan.`);
  if(!video){
   console.log('\nVIDEO TERSEDIA:');
   videos.forEach((v,i)=>console.log(`  ${i+1}. ${v.title} [${v.id}]`));
   const answer=await ask('\nPilih nomor / ID (Enter = kembali): ');
   if(!answer)return null;
   video=findVideo(videos,answer);
   if(!video)throw Error('Pilihan project tidak ditemukan: '+answer);
  }
  let mode=args.mode?resolveMode(args.mode):null;
  if(!mode){
   if(args.video&&!interactive)mode='full'; // Kompatibel dengan pemanggil CLI lama.
   else{
    console.log(`\n=== RENDER: ${video.title} ===`);
    renderChoices.forEach(([number,label])=>console.log(`  ${number}. ${label}`));
    const answer=await ask('Pilih mode 1/2/3/4 (Enter = kembali): ');
    if(!answer)return null;
    mode=resolveMode(answer);
   }
  }
  let selection=args.scene??args.scenes??'';
  if((mode==='scene'||mode==='selected')&&!selection){
   console.log('\nSCENE TERSEDIA:');printSceneList(video);
   selection=await ask(mode==='scene'
    ?'Pilih nomor / ID scene (Enter = kembali): '
    :'Pilih scene dipisah koma, contoh 1,3,5 (Enter = kembali): ');
   if(!selection)return null;
  }
  // Bahkan flag yang salah pasangan harus gagal, jangan diam-diam diabaikan.
  if((mode==='scene'&&args.scenes!==null)||(mode==='selected'&&args.scene!==null)){
   throw Error(mode==='scene'?'Mode scene harus memakai --scene.':'Mode selected harus memakai --scenes.');
  }
  const plan=makeRenderPlan(video,mode,selection);
  return {video,mode,plan};
 }finally{rl?.close()}
}
function targetDir(exports,video,mode){
 const branch=mode==='full'?'full':mode==='selected'?'selected-scenes':'scenes';
 return path.join(exports.mp4,video.slug,branch);
}
function printPlan({video,mode,plan},dest){
 console.log(`\n========== RENCANA RENDER ==========`);
 console.log(`Project : ${video.title}\nID      : ${video.id}\nMode    : ${mode.toUpperCase()}`);
 console.log(`Output  : ${dest}`);
 for(const [i,job] of plan.entries()){
  const seconds=(job.frames/video.fps).toFixed(2);
  console.log(`  ${i+1}/${plan.length}. ${job.title} [${job.id}] — ${seconds} detik`);
 }
 console.log(`Total: ${plan.length} file MP4 terpisah.\n`);
}
async function renderOne({video,job,output,logPath,cli,concurrency,index,count}){
 const started=now();const total=job.frames;
 const args=[cli,'render','src/index.ts',job.id,output,'--codec=h264','--log=info',`--concurrency=${concurrency}`];
 const log=fs.createWriteStream(logPath,{flags:'wx'});
 log.write(`[START] ${new Date().toISOString()}\n[PROJECT] ${video.id}\n[COMPOSITION] ${job.id}\n[FRAMES] ${total}\n[COMMAND] node ${args.slice(1).join(' ')}\n`);
 console.log(`\n[${index}/${count}] Render ${job.title} [${job.id}]`);
 console.log(`Output : ${output}\nLog    : ${logPath}`);
 let latestStage='Menyiapkan project / browser';
 let latestPercent=null,latestFrame=null,lastUpdate=started,lastShow=0,progressEvents=0,tail=[];
 let stopping=false,signalHandler=null,child=null;
 const estimate=newProgressTracker(total);
 function display(force=false){
  const time=now();if(!force&&time-lastShow<4800)return;
  lastShow=time;
  let info=`[${index}/${count}] ${progressBar(latestPercent??0)} ${latestPercent===null?'—':latestPercent.toFixed(1)+'%'} | ${latestStage} | ${duration(time-started)}`;
  if(latestFrame!==null)info+=` | frame ${latestFrame}/${total}`;
  const eta=latestStage==='Render frame'&&latestFrame!==null?estimate(latestFrame,time):null;
  if(eta!==null)info+=` | sisa ≈ ${duration(eta)} (estimasi)`;
  else info+=' | estimasi: menghitung…';
  if(time-lastUpdate>60000)info+=`\n[INFO] Belum ada output selama ${duration(time-lastUpdate)}; cek log: ${logPath}`;
  console.log(info);
 }
 function consumeLine(raw,source){
  const line=removeAnsi(raw).trim();if(!line)return;
  log.write(`[${new Date().toISOString()}] [${source}] ${line}\n`);
  tail.push(line);if(tail.length>MAX_LOG_LINES)tail.shift();
  lastUpdate=now();
  const info=parseRenderUpdate(line,total);
  if(info){
   latestStage=info.stage||latestStage;
   if(info.percent!==undefined&&(info.stage==='Render frame'||info.stage==='Encoding MP4')){
    latestPercent=info.percent;
    if(info.stage==='Render frame'&&info.done!==null){latestFrame=info.done;progressEvents++}
    if(info.stage==='Encoding MP4')latestFrame=null;
   }
   display(progressEvents===1);
  }else if(/\b(?:error|failed|warning|bundled|browser download|downloaded)\b/i.test(line)){
   console.log(`[REMOTION] ${line.slice(0,300)}`);
  }
 }
 function watchStream(stream,source){
  let pending='';
  stream.setEncoding('utf8');
  stream.on('data',chunk=>{
   pending+=chunk;
   const pieces=pending.split(/\r\n|\n|\r/);pending=pieces.pop()??'';
   pieces.forEach(p=>consumeLine(p,source));
   if(pending.length>8000){consumeLine(pending.slice(0,8000),source);pending=''}
  });
  stream.on('end',()=>{if(pending)consumeLine(pending,source)});
 }
 display(true);
 try{
  const result=await new Promise((resolve,reject)=>{
   child=spawn(process.execPath,args,{cwd:ROOT,stdio:['ignore','pipe','pipe'],windowsHide:true,env:{...process.env,FORCE_COLOR:'0'}});
   child.once('error',reject);
   watchStream(child.stdout,'STDOUT');watchStream(child.stderr,'STDERR');
   const timer=setInterval(()=>display(),5000);
   const interrupt=()=>{
    if(stopping)return;
    stopping=true;
    console.log('\n[RENDER] Pembatalan diminta; menghentikan Remotion...');
    try{child.kill('SIGTERM')}catch{}
   };
   signalHandler=interrupt;
   process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
   child.once('close',(code,signal)=>{
    clearInterval(timer);
    resolve({code,signal});
   });
   child.once('error',()=>clearInterval(timer));
  });
  const exitCode=stopping?130:(result.code??1);
  log.write(`[END] ${new Date().toISOString()} exitCode=${exitCode} signal=${result.signal??'none'}\n`);
  if(exitCode!==0){
   console.error(`\n[RENDER GAGAL] ${job.id}: exit code ${exitCode} (${duration(now()-started)}).`);
   console.error(`[LOG] ${logPath}`);
   for(const line of tail.slice(-8))console.error('  '+line.slice(0,400));
   if(exitCode!==130)console.error('[TIPS] Jika memori habis, set MG_RENDER_CONCURRENCY=1.');
   return {ok:false,code:exitCode};
  }
  // MP4 harus punya header container ftyp, bukan sekadar file dengan size > 0.
  const validMp4=fs.existsSync(output) && fs.statSync(output).size>=12 && (()=>{
   const fd=fs.openSync(output,'r');
   try{const head=Buffer.alloc(12);fs.readSync(fd,head,0,12,0);return head.toString('ascii',4,8)==='ftyp'}
   finally{fs.closeSync(fd)}
  })();
  if(!validMp4){
   console.error(`[RENDER GAGAL] Remotion selesai tanpa MP4 valid (header ftyp tidak ditemukan): ${output}`);
   console.error(`[LOG] ${logPath}`);
   return {ok:false,code:1};
  }
  const size=(fs.statSync(output).size/1048576).toFixed(2);
  console.log(`[100%] ${progressBar(100)} BERHASIL: ${job.id} (${size} MB; ${duration(now()-started)})`);
  return {ok:true,code:0,output};
 }catch(e){
  console.error(`[RENDER ERROR] ${job.id}: ${e.message}\n[LOG] ${logPath}`);
  log.write(`[ERROR] ${e.stack??e.message}\n`);
  return {ok:false,code:1};
 }finally{
  if(signalHandler){process.off('SIGINT',signalHandler);process.off('SIGTERM',signalHandler)}
  await new Promise(resolve=>log.end(resolve));
 }
}
async function main(){
 const args=parseArgs(process.argv.slice(2));
 if(args.help){usage();return}
 const chosen=await choosePlan(args);
 if(!chosen){console.log('[RENDER] Dibatalkan tanpa perubahan.');return}
 const {video,mode,plan}=chosen;
 const dest=targetDir(exportPaths(),video,mode);
 printPlan(chosen,dest);
 if(args.dryRun){console.log('[DRY RUN] Tidak menjalankan Remotion dan tidak membuat file.');return}
 const cli=path.join(ROOT,'node_modules','@remotion','cli','remotion-cli.js');
 if(!fs.existsSync(cli))throw Error('Remotion belum terinstal; jalankan npm install atau npm run dev.');
 const concurrency=process.env.MG_RENDER_CONCURRENCY?.trim()||'2';
 if(!/^(?:[1-9]\d?|100)$/.test(concurrency))throw Error('MG_RENDER_CONCURRENCY harus angka 1–100.');
 const folders=ensureExportDirs();
 const outputDir=targetDir(folders,video,mode);
 const logsDir=path.join(folders.logs,'Render',video.slug);
 fs.mkdirSync(outputDir,{recursive:true});fs.mkdirSync(logsDir,{recursive:true});
 let completed=0;const outputs=[];
 for(const [i,job] of plan.entries()){
  const stem=`${job.id}-${timestamp()}`;
  const output=availableFile(outputDir,stem,'.mp4');
  const logPath=availableFile(logsDir,stem,'.log');
  const result=await renderOne({video,job,output,logPath,cli,concurrency,index:i+1,count:plan.length});
  if(!result.ok){
   console.error(`\n[BATCH TERHENTI] ${completed}/${plan.length} MP4 berhasil. Yang sudah jadi tetap tersimpan.`);
   process.exitCode=result.code||1;return;
  }
  completed++;outputs.push(result.output);
 }
 console.log(`\n========= RENDER SELESAI (${completed}/${plan.length}) =========`);
 for(const file of outputs)console.log('  '+file);
 console.log('\n[INFO] MP4 tersimpan di luar folder Master, tidak ikut ZIP source.');
}
main().catch(error=>{console.error('\n[ERROR RENDER] '+error.message);process.exitCode=1});
