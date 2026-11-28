#!/usr/bin/env node
/** Guided user journey for ChatGPT -> add-on -> Remotion. No renderer or remote access. */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {ROOT} from './menu-helper.mjs';

const slugify=(v)=>v.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48).replace(/-+$/,'')||'video-baru';
// Read the single authoritative flow instead of hardcoding a second copy.
const stages=()=>{
 const doc=fs.readFileSync(path.join(ROOT,'PRODUCTION-RULES.md'),'utf8');
 const section=doc.split('## 2. Flow tunggal')[1]?.split('## 3.')[0]||'';
 const rows=[...section.matchAll(/^(\d+)\. \*\*(.+?):\*\* (.+)$/gm)].map(m=>[m[1].padStart(2,'0'),m[2],m[3].replace(/\r$/,'')]);
 if(rows.length!==7||rows.some((r,i)=>Number(r[0])!==i+1))throw Error('Flow resmi harus berisi tujuh tahap berurutan');
 return rows;
};
const usage=`Pakai:
  npm run flow                        # panduan interaktif
  npm run flow -- --new "Judul video" [--audience "..."] [--cta "..."]
  npm run flow -- --new "Judul" --stdout   # tampilkan prompt tanpa menulis file
  npm run flow -- --status            # lihat jumlah project aktif (read-only)
  npm run flow -- --steps             # lihat seluruh alur
`;
const guide=(title,audience='Pengguna komputer Indonesia',cta='Ajak penonton berbagi pengalaman')=>{
 const slug=slugify(title);
 return `# BRIEF CHATGPT → MOTIONGRAPHIC STUDIO

Judul: ${title.trim()}
Slug usulan: ${slug}
Audiens: ${audience.trim()}
CTA: ${cta.trim()}

Buat motion graphic sesuai Master aktual. Buka CHATGPT-READ-FIRST.md dan CHATGPT-HISTORY.md, ikuti mode langsung build dalam PRODUCTION-RULES.md. Satu ZIP FILE CHANGE ONLY dengan path projects/<slug>/, tidak mengubah Master. VO GUIDE mengikuti flow resmi. Jika runtime belum tersedia, laporkan batas uji.
`;
};
const renderSteps=()=>console.log('\n=== USER FLOW MOTIONGRAPHIC STUDIO ===\n'+stages().map(([n,t])=>`${n}. ${t}`).join('\n')+'\n');
function status(){
 const f=path.join(ROOT,'library','catalog.json');
 let videos=[];
 try{videos=JSON.parse(fs.readFileSync(f,'utf8')).videos||[]}catch{}
 console.log(`[FLOW] ${videos.length} project aktif di Master. Semua pembuatan video baru tetap melalui ChatGPT dan FILE CHANGE ONLY.`);
 console.log('[FLOW] Baca VO/ACC: node tools/scene-approval-board.mjs --all');
 console.log('[FLOW] Berikutnya: berikan judul langsung di ChatGPT.');
}
function savePrompt(prompt,title){
 const dir=path.join(ROOT,'exports','briefs');fs.mkdirSync(dir,{recursive:true});
 const filename=slugify(title)+'-chatgpt.md';let dest=path.join(dir,filename),suffix=2;
 while(fs.existsSync(dest))dest=path.join(dir,`${slugify(title)}-chatgpt-${suffix++}.md`);
 fs.writeFileSync(dest,prompt,'utf8');console.log('[FLOW] Brief untuk ChatGPT: '+dest);
 console.log('[FLOW] Buka file, salin isinya ke Project ChatGPT Motion-Graphic, lalu lampirkan kontrak Master bila berubah.');
}
function parse(args){
 const options={};
 for(let i=0;i<args.length;i++){
  const a=args[i];if(['--steps','--status','--stdout','--help'].includes(a)){options[a.slice(2)]=true;continue}
  if(['--new','--audience','--cta'].includes(a)){
   const val=args[++i];if(!val||val.startsWith('--'))throw Error('Nilai untuk '+a+' wajib diisi');
   options[a.slice(2)]=val;continue;
  }
  throw Error('Argumen tidak dikenal: '+a);
 }
 return options;
}
async function interactive(){
 if(!process.stdin.isTTY)throw Error('Mode interaktif perlu terminal. Gunakan --new "Judul" atau --steps.');
 const rl=createInterface({input:process.stdin,output:process.stdout});
 const ask=async prompt=>(await rl.question(prompt)).trim();
 try{
  renderSteps();
  console.log('1. Buat brief/prompt ChatGPT\n2. Saya sudah punya FILE CHANGE ONLY\n3. Saya ingin merevisi video\n4. Motion sudah ACC (VO Guide)\n5. Saya akan render / QA\n0. Keluar');
  const select=await ask('\nPilih langkah: ');
  if(select==='1'){
   const title=await ask('Judul video: ');if(!title)return console.log('[FLOW] Tidak ada judul; batal.');
   const audience=await ask('Audiens (Enter = default): ');
   const cta=await ask('CTA (Enter = default): ');
   savePrompt(guide(title,audience||undefined,cta||undefined),title);
  }else if(select==='2'){
   console.log('\n[VALIDASI] ChatGPT menguji project sebelum delivery; startup memeriksa source.');
   console.log('[PASANG] Tutup Studio, backup, cek base hash dan ekstrak di luar Master; copy–paste–Replace ke root Master.');
   console.log('[STUDIO] npm run dev jika Studio belum berjalan; setelah copy selesai.');
  }else if(select==='3'){
   console.log('\n[REVISI] Kirim slug, file/scene yang diubah, dan bukti preview ke ChatGPT.');
   console.log('[PATCH] Periksa hash base dan backup sebelum Replace (FILE CHANGE ONLY).');
   console.log('[APPLY] Copy file lengkap sesuai path relatif root; Studio menyinkronkan perubahan yang relevan otomatis.');
  }else if(select==='4'){
   console.log('\n[VO GUIDE] Pilih komposisi <ID>VOGuide di Remotion Studio.');
   console.log('[VO] Setelah preview/revisi motion disetujui, rekam suara natural, lalu sesuaikan timing.');
  }else if(select==='5'){
   console.log('\n[QA] Static gate otomatis saat dev; uji preview/GUI dan hasil render secara nyata.');
   console.log('[RENDER] npm run render');
   console.log('[QA MP4] npm run qa:render -- out/nama.mp4 --src projects/<slug>');
   console.log('[EXPORT] npm run zip -- --studio (engine saja) atau npm run zip -- --studio --with-projects');
  }else console.log('[FLOW] Selesai tanpa perubahan.');
 }finally{rl.close()}
}
try{
 const options=parse(process.argv.slice(2));
 if(options.help)console.log(usage);
 else if(options.steps)renderSteps();
 else if(options.status)status();
 else if(options.new){const p=guide(options.new,options.audience,options.cta);if(options.stdout)console.log(p);else savePrompt(p,options.new)}
 else await interactive();
}catch(e){console.error('[FLOW ERROR] '+(e?.message||e));process.exitCode=2}
