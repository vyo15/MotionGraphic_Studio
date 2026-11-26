#!/usr/bin/env node
/** Guided user journey for ChatGPT -> add-on -> Remotion. No renderer or remote access. */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {ROOT} from './menu-helper.mjs';

const slugify=(v)=>v.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48).replace(/-+$/,'')||'video-baru';
const stages=[
 ['01','Brief di ChatGPT','Tentukan satu pesan, audiens, CTA; buat naskah draft dan storyboard'],
 ['02','Bangun add-on','ChatGPT membuat projects/<slug>/ tanpa mengubah Master'],
 ['03','Validasi & import','Video baru: QA Motion Plan + addon:validate --production; lalu masukkan ke projects/<slug>/'],
 ['04','Review motion','Preview dan revisi sampai ACC; cek editabilitas Save/reload'],
 ['04A','VO & ACC Board','Tampilkan seluruh VO asli dan status scene: node tools/scene-approval-board.mjs --all'],
 ['05','VO Guide','Tampilkan panduan teks setelah motion disetujui'],
 ['06','Rekam & sinkronkan','Rekam suara sendiri, sesuaikan timing, subtitle dan SFX'],
 ['07','QA & render','Periksa source, MP4, audio, safe zone dan ekspor'],
 ['08','Arsip & ulangi','ZIP video terpisah; Master Engine Only tetap ringan'],
];
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

Pada setiap diskusi video aktif, tampilkan VO lengkap seluruh scene dan status ACC dari production/SCENE-VO-ACC-BOARD.md (generated saat sync). Buatkan motion graphic edukasi Remotion untuk judul di atas menggunakan Custom Skill MotionGraphic Studio Director serta Project Rules Motion-Graphic yang berlaku. Satu Master folder-first; jangan membuat Remotion Studio baru atau mengubah file registrasi Master. Periksa contracts/studio-capabilities.json Master terbaru jika disediakan; jangan mengarang kompatibilitas.

Pilih teknik Lemo-Opuscar sesuai materi, hanya sebagai teknik visual. Pertahankan Minimal Editorial: #F7F7F5, #202020, #DF805F, grid samar dan UI clean. Default 1080x1920, 30 FPS, 15–30 detik, safe zone 250/350/50 px. Visual harus memperagakan SEBAB → AKSI → REAKSI → HASIL → HOLD, bukan dekorasi atau mengulang seluruh VO.

Motion Direction v3.0: baca Decision Matrix, Vocabulary, Portrait Camera dan Motion Plan Contract. Pilih gerak dari maksud VO, satu fokus, camera carry, tanpa Slide Mask dekoratif; reflow sebelum aset baru, cursor tepat, subtitle stabil. Buat production/motion-plan.json dan deklarasi focus-driven-v1 untuk video baru; npm run qa:motion -- <folder> lalu npm run addon:validate -- <folder> --production --syntax. Jangan retrofit ACC. Master 2.0: baca docs/PRODUCTION-TOOLKIT.md; production/spatial-plan.json wajib untuk gate produksi (cek setiap frame deklarasi); gunakan toolkit kamera lokal bila sesuai. VO alignment dari timestamp rekaman hanya proposal setelah ACC; planned hold dilaporkan terpisah.

Workflow yang tidak boleh diubah: NASKAH DRAFT → STORYBOARD → BUILD MOTION → PREVIEW/REVISI → VO GUIDE → pengguna rekam VO → sinkronisasi → QA → render final. Jangan meminta file rekaman sebelum motion disetujui.

Buat add-on mandiri <slug>/ dengan motiongraphic-video.json, src/Video.tsx export const Video, scenes/components/animations/config, aset lokal yang diperlukan, README.md, PANDUAN-EDIT-ASSET.md, dan daftar layer/editabilitas. Pisahkan teks, objek, UI, cursor dan efek secara independen. Gunakan Props/Interactive hanya bila didukung Remotion. Animasi dan transform harus berbasis frame dan tidak flatten. Bila saya meminta langsung dibuat, selesaikan add-on ZIP pada giliran ini; jangan berhenti di konsep.

Validasi manifest/import/aset, layout, font, animasi, VO Guide, dan source. Jangan mengklaim semua layer draggable atau MP4/Windows sudah diuji bila belum diuji. Kirim hanya ZIP add-on (atau patch terbatas saat revisi), bukan Master baru.
`;
};
const renderSteps=()=>console.log('\n=== USER FLOW MOTIONGRAPHIC STUDIO ===\n'+stages.map(([n,t,d])=>`${n}. ${t}\n    ${d}`).join('\n')+'\n');
function status(){
 const f=path.join(ROOT,'library','catalog.json');
 let videos=[];
 try{videos=JSON.parse(fs.readFileSync(f,'utf8')).videos||[]}catch{}
 console.log(`[FLOW] ${videos.length} project aktif di Master. Semua pembuatan video baru tetap melalui ChatGPT dan add-on mandiri.`);
 console.log('[FLOW] Baca VO/ACC: node tools/scene-approval-board.mjs --all');
 console.log('[FLOW] Berikutnya: npm run flow -- --new "Judul video"');
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
  console.log('1. Buat brief/prompt ChatGPT\n2. Saya sudah punya add-on ZIP\n3. Saya ingin merevisi video\n4. Motion sudah ACC (VO Guide)\n5. Saya akan render / QA\n0. Keluar');
  const select=await ask('\nPilih langkah: ');
  if(select==='1'){
   const title=await ask('Judul video: ');if(!title)return console.log('[FLOW] Tidak ada judul; batal.');
   const audience=await ask('Audiens (Enter = default): ');
   const cta=await ask('CTA (Enter = default): ');
   savePrompt(guide(title,audience||undefined,cta||undefined),title);
  }else if(select==='2'){
   console.log('\n[VALIDASI] npm run addon:validate -- "PATH_ADDON" --production --syntax');
   console.log('[IMPORT] npm run addfolder -- "PATH_FOLDER_ADDON" (atau letakkan ZIP di library/masuk/)');
   console.log('[SINKRON] npm run sync && npm run dev');
  }else if(select==='3'){
   console.log('\n[REVISI] Kirim slug, file/scene yang diubah, dan bukti preview ke ChatGPT.');
   console.log('[PATCH] npm run addon:patch -- "PATH_PATCH" --dry-run');
   console.log('[APPLY] npm run addon:patch -- "PATH_PATCH" (setelah tidak ada konflik)');
  }else if(select==='4'){
   console.log('\n[VO GUIDE] Pilih komposisi <ID>VOGuide di Remotion Studio.');
   console.log('[VO] Setelah preview/revisi motion disetujui, rekam suara natural, lalu sesuaikan timing.');
  }else if(select==='5'){
   console.log('\n[QA] npm test && npm run check && npm run dev');
   console.log('[RENDER] npm run render');
   console.log('[QA MP4] npm run qa:render -- out/nama.mp4 --src projects/<slug>');
   console.log('[EXPORT] npm run zip -- --studio (engine saja) atau npm run zip -- --all');
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
