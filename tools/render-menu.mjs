#!/usr/bin/env node
/** Render MP4 dengan heartbeat, log, estimasi dinamis dan exit code Remotion asli. */
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {ROOT,readCatalog,selectVideo} from './menu-helper.mjs';
import {removeAnsi,duration,progressBar,parseRenderUpdate,newProgressTracker} from './render-progress.mjs';

const stamp=()=>new Date().toISOString().replace(/[:.]/g,'-');
const MAX_LOG_LINES=16;
const now=()=>Date.now();

async function main(){
 // Jika ID sudah dipilih oleh menu utama, lewati readline di proses render.
 // Prompt ganda dalam npm.cmd -> Git Bash dapat menunggu input tanpa akhir.
 const videos=readCatalog().videos??[];
 const requested=process.argv[2]?.trim();
 const v=requested
   ? videos.find((item,index)=>item.id===requested||item.slug===requested||String(index+1)===requested)
   : await selectVideo(videos,[]);
 if(!v)throw Error(`Video '${requested}' tidak ditemukan. Jalankan npm run list untuk melihat ID.`);
 const outDir=path.join(ROOT,'out');
 const output=path.join(outDir,v.id+'.mp4');
 const logs=path.join(outDir,'logs');
 fs.mkdirSync(logs,{recursive:true});
 const logPath=path.join(logs,`${v.id}-${stamp()}.log`);
 const log=fs.createWriteStream(logPath,{flags:'wx'});
 const started=now();
 const cli=path.join(ROOT,'node_modules','@remotion','cli','remotion-cli.js');
 if(!fs.existsSync(cli))throw Error('Remotion belum diinstal; jalankan npm run dev terlebih dahulu.');
 const concurrency=process.env.MG_RENDER_CONCURRENCY?.trim()||'2';
 if(!/^(?:[1-9]\d?|100)$/.test(concurrency))throw Error('MG_RENDER_CONCURRENCY harus angka 1–100.');
 const total=Number(v.durationInFrames)||0;
 const argumentsForCli=[cli,'render','src/index.ts',v.id,output,'--codec=h264','--log=info',`--concurrency=${concurrency}`];
 console.log(`\n========== RENDER VIDEO ==========`);
 console.log(`Video     : ${v.title}\nKomposisi : ${v.id}\nResolusi  : ${v.width}x${v.height} @ ${v.fps} FPS`);
 console.log(`Frame     : ${total||'sesuai komposisi'}\nOutput    : ${path.relative(ROOT,output)}`);
 console.log(`Log       : ${path.relative(ROOT,logPath)}`);
 console.log(`Concurrency: ${concurrency} (ubah dengan MG_RENDER_CONCURRENCY bila diperlukan)`);
 console.log(`\n[RENDER] Memulai Remotion. Estimasi muncul setelah cukup frame diproses.`);
 console.log('[RENDER] Tekan Ctrl+C untuk membatalkan proses.');
 log.write(`[START] ${new Date().toISOString()}\n[VIDEO] ${v.id}\n[COMMAND] node ${argumentsForCli.slice(1).join(' ')}\n`);
 let latestStage='Menyiapkan project / browser';
 let latestPercent=null,latestFrame=null,lastUpdate=started,lastShow=0,progressEvents=0;
 let tail=[];let exitCode=null;let stopping=false;
 const estimate=newProgressTracker(total);
 const display=(force=false)=>{
   const t=now();if(!force && t-lastShow<4800)return;
   lastShow=t;
   const elapsed=duration(t-started);
   const noOutput=duration(t-lastUpdate);
   let percentage=latestPercent===null?'—':latestPercent.toFixed(1)+'%';
   let msg=`[PROGRES] ${progressBar(latestPercent??0)} ${percentage} | ${latestStage} | berjalan ${elapsed}`;
   if(latestFrame!==null)msg+=` | frame ${latestFrame}/${total}`;
   const eta=latestStage==='Render frame'&&latestFrame!==null?estimate(latestFrame,t):null;
   if(eta!==null)msg+=` | sisa ≈ ${duration(eta)} (estimasi)`;
   else msg+=' | estimasi: menghitung…';
   if(t-lastUpdate>60000)msg+=`\n[INFO] Belum ada output baru selama ${noOutput}. Cek CPU/RAM; log: ${path.relative(ROOT,logPath)}`;
   console.log(msg);
 };
 function consumeLine(s,source){
   const line=removeAnsi(s).trim();if(!line)return;
   log.write(`[${new Date().toISOString()}] [${source}] ${line}\n`);
   tail.push(line);if(tail.length>MAX_LOG_LINES)tail.shift();
   lastUpdate=now();
   const p=parseRenderUpdate(line,total);
   if(p){
     latestStage=p.stage||latestStage;
     if(p.percent!==undefined){
       // Jangan melaporkan progres encoding sebagai persentase frame render.
       if(p.stage==='Render frame'||p.stage==='Encoding MP4'){
         latestPercent=p.percent;
         if(p.stage==='Render frame'&&p.done!==null){latestFrame=p.done;progressEvents++}
         if(p.stage==='Encoding MP4')latestFrame=null;
       }
     }
     display(progressEvents===1);
   }else if(/\b(?:error|failed|warning|bundled|browser download|downloaded)\b/i.test(line)){
     console.log(`[REMOTION] ${line.slice(0,300)}`);
   }
 }
 function watchStream(stream,source){
   let pending='';
   stream.setEncoding('utf8');
   stream.on('data',(chunk)=>{
     pending+=chunk;
     const pieces=pending.split(/\r\n|\n|\r/);
     pending=pieces.pop()??'';
     for(const p of pieces)consumeLine(p,source);
     // Status Remotion kadang overwrite satu baris pakai \r; flush sementara tanpa membuatnya berlipat.
     if(pending.length>8000){consumeLine(pending.slice(0,8000),source);pending=''}
   });
   stream.on('end',()=>{if(pending)consumeLine(pending,source)});
 }
 // Status pertama langsung terlihat, termasuk jika bundling memerlukan waktu lama.
 display(true);
 const result=await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,argumentsForCli,{cwd:ROOT,stdio:['ignore','pipe','pipe'],windowsHide:true,env:{...process.env,FORCE_COLOR:'0'}});
   child.once('error',reject);
   watchStream(child.stdout,'STDOUT');
   watchStream(child.stderr,'STDERR');
   const timer=setInterval(()=>display(),5000);
   timer.unref();
   function interrupt(){if(stopping)return;stopping=true;console.log('\n[RENDER] Pembatalan diminta, menghentikan proses...');child.kill('SIGINT');setTimeout(()=>{if(child.exitCode===null)child.kill('SIGTERM')},2500).unref()}
   process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
   child.once('close',(code,signal)=>{
     clearInterval(timer);process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
     resolve({code,signal});
   });
 });
 exitCode=result.code??(stopping?130:1);
 await new Promise(resolve=>log.end(resolve));
 const elapsed=duration(now()-started);
 if(exitCode!==0){
   console.error(`\n[RENDER GAGAL] Kode ${exitCode}, setelah ${elapsed}.`);
   console.error(`[LOG] ${logPath}`);
   console.error('[INFO] 8 pesan terakhir Remotion:');
   for(const line of tail.slice(-8))console.error('  '+line.slice(0,400));
   console.error('[SOLUSI] Cek log. Jika kehabisan memori, jalankan dengan MG_RENDER_CONCURRENCY=1.');
   process.exitCode=exitCode;
   return;
 }
 if(!fs.existsSync(output)||fs.statSync(output).size===0){
   console.error(`\n[RENDER GAGAL] CLI selesai tanpa MP4 valid. Periksa ${logPath}`);
   process.exitCode=1;return;
 }
 const size=(fs.statSync(output).size/1048576).toFixed(2);
 console.log(`\n[100%] ${progressBar(100)} RENDER BERHASIL`);
 console.log(`Waktu proses : ${elapsed}\nUkuran MP4   : ${size} MB\nLokasi file  : ${output}`);
 console.log(`[LOG] ${logPath}\n`);
}
main().catch(e=>{console.error('\n[ERROR RENDER] '+e.message);process.exitCode=1});
