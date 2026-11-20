#!/usr/bin/env node
/** CLI fallback to edit VO text without opening JSON; Studio Props remains primary. */
import fs from 'node:fs';import path from 'node:path';import {createInterface} from 'node:readline/promises';import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{
 const [slug,...args]=process.argv.slice(2);
 if(!/^[a-z][a-z0-9-]{1,48}$/.test(slug||''))throw Error('Pakai: npm run vo:edit -- <slug> [--beat <1-based-index> --text "narasi"]');
 const project=path.join(ROOT,'projects',slug),file=path.join(project,'src/config/narration.json');
 if(!fs.existsSync(file))throw Error('narration.json belum ada. Jalankan: npm run vo:init -- '+slug);
 const data=JSON.parse(fs.readFileSync(file,'utf8'));
 if(data.schemaVersion!==1||!Array.isArray(data.beats))throw Error('Format naskah tidak valid');
 const m=JSON.parse(fs.readFileSync(path.join(project,'motiongraphic-video.json'),'utf8'));
 const indexOf=flag=>args.indexOf(flag);let index=0,newText=null;
 if(args.includes('--beat')){
  const i=indexOf('--beat');index=Number(args[i+1])-1;
  if(!Number.isInteger(index)||index<0||index>=data.beats.length)throw Error('Nomor beat di luar rentang 1..'+data.beats.length);
  const t=indexOf('--text');if(t<0||!args[t+1])throw Error('Gunakan --text "narasi"');
  newText=args[t+1];
 }else{
  if(!process.stdin.isTTY)throw Error('Terminal non-interaktif: gunakan --beat 1 --text "narasi"');
  console.log('\nNASKAH '+slug+' — '+data.beats.length+' beat');
  data.beats.forEach((b,i)=>console.log(`${i+1}. ${b.scene} (${(b.startFrame/m.fps).toFixed(1)}–${(b.endFrame/m.fps).toFixed(1)} dtk): ${b.text.slice(0,70)}`));
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{
   index=Number(await rl.question('Pilih beat [1..'+data.beats.length+']: '))-1;
   if(!Number.isInteger(index)||index<0||index>=data.beats.length)throw Error('Nomor beat tidak valid');
   newText=await rl.question('Ketik naskah baru (Enter untuk kosongkan): ');
   const confirm=(await rl.question('Simpan perubahan? ketik SIMPAN: ')).trim();
   if(confirm!=='SIMPAN'){console.log('[BATAL] Tidak ada file diubah');process.exit(0)}
  }finally{rl.close()}
 }
 let last=0;for(const [i,b] of data.beats.entries()){
  if(!Number.isInteger(b.startFrame)||!Number.isInteger(b.endFrame)||b.startFrame!==last||b.endFrame<=last||typeof b.text!=='string')throw Error('Timing beat '+(i+1)+' tidak valid');
  last=b.endFrame;
 }
 if(last!==m.durationInFrames)throw Error('Timing narasi tidak menutup durasi video');
 const backup=path.join(ROOT,'library/backups/vo-guide');fs.mkdirSync(backup,{recursive:true});
 const stamp=new Date().toISOString().replace(/[:.]/g,'-')+'-'+process.pid;
 fs.copyFileSync(file,path.join(backup,`${slug}-${stamp}.json`));
 data.beats[index].text=newText;
 const temp=file+'.tmp-'+process.pid;fs.writeFileSync(temp,JSON.stringify(data,null,2)+'\n');fs.renameSync(temp,file);
 console.log(`[VO EDIT] Beat ${index+1} disimpan. Jalankan npm run sync bila Studio belum merefresh.`);
}catch(e){console.error('[VO EDIT ERROR] '+e.message);process.exitCode=1}
