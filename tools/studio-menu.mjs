#!/usr/bin/env node
/**
 * Menu interaktif satu-proses: SEMUA input diterima oleh proses ini.
 * Anak proses tidak pernah membaca stdin; penting untuk npm.cmd + Git Bash/MinTTY.
 * Pemanggilan script Node secara langsung juga menghindari shell:true / DEP0190.
 * Remotion Studio tetap SATU-SATUNYA editor; menu hanya utilitas CLI.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createInterface} from 'node:readline/promises';
import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog} from './menu-helper.mjs';
import {renderChoices,resolveMode,printSceneList,makeRenderPlan} from './render-plan.mjs';
import {renderProfileChoices,resolveRenderProfile,RENDER_PROFILES} from './render-profiles.mjs';

if(!process.stdin.isTTY){
  console.error('[MENU] Gunakan terminal interaktif untuk npm run menu. Untuk otomatisasi gunakan npm run zip -- --all / --studio / IDVideo.');
  process.exit(1);
}

const menuItems=[
  ['1','Buka Remotion Studio'],
  ['3','Rename project / judul'],
  ['4','Daftar video'],
  ['5','Periksa dan sinkronkan'],
  ['6','Render MP4'],
  ['7','Buat ZIP video / Master'],
  ['8','Arsipkan video (aman)'],
  ['9','Pulihkan video'],
  ['10','Cek masalah folder (tanpa perubahan)'],
  ['11','Validasi add-on dari ChatGPT'],
  ['12','Edit panduan rekaman VO'],
  ['13','Recovery patch native lama (opsional)'],
  ['14','Panduan alur ChatGPT → MotionGraphic Studio'],
  ['15','QA Motion Plan (read-only, semua project)'],
  ['16','Cek versi release (read-only)'],
 ['17','QA Spatial — pilih video, sample / full / final'],
 ['18','QA Approval & timeline metadata (read-only)'],
 ['19','VO alignment proposal (timestamp JSON, read-only)'],
];
// Satu sesi input untuk semua menu: tidak berganti readline antar proses.
const rl=createInterface({input:process.stdin,output:process.stdout});
const ask=async q=>(await rl.question(q)).trim();
const tool=f=>path.join(ROOT,'tools',f);

function runScript(filename,args=[]){
  console.log(`\n[MENJALANKAN] ${filename.replace(/\.mjs$/,'')}\n`);
  // Jangan berikan stdin ke child. Tidak ada prompt bersarang.
  const result=spawnSync(process.execPath,[tool(filename),...args],{
    cwd:ROOT,stdio:['ignore','inherit','inherit'],windowsHide:false,
  });
  if(result.error)console.error('[MENU] Gagal menjalankan proses: '+result.error.message);
  else if(result.signal)console.error('[MENU] Proses dihentikan: '+result.signal);
  else if(result.status!==0)console.error(`[MENU] Proses selesai dengan error (kode ${result.status??'unknown'}).`);
  return !result.error&&!result.signal&&result.status===0;
}
function catalogVideos(){
  const videos=readCatalog().videos??[];
  if(!videos.length)console.log('\n[MENU] Belum ada video aktif.');
  return videos;
}
async function choose(entries,header,display,matches){
  if(!entries.length){console.log('[MENU] Tidak ada data untuk dipilih.');return null}
  console.log(`\n${header}`);
  entries.forEach((v,i)=>console.log(`  ${i+1}. ${display(v)}`));
  const choice=await ask('\nPilih nomor / ID (Enter = kembali): ');
  if(!choice){console.log('[MENU] Kembali tanpa perubahan.');return null}
  const found=entries.find((v,i)=>choice===String(i+1)||matches(v).includes(choice));
  if(!found)console.log('[MENU] Pilihan tidak ditemukan: '+choice);
  return found??null;
}
const chooseVideo=()=>choose(catalogVideos(),'VIDEO TERSEDIA:',v=>`${v.title} [${v.id}]`,v=>[v.id,v.slug]);

function currentProjects(){
  const directory=path.join(ROOT,'projects');
  return fs.readdirSync(directory,{withFileTypes:true})
    .filter(d=>d.isDirectory()&&!d.name.startsWith('.')&&!d.name.startsWith('_'))
    .flatMap(d=>{
      const file=path.join(directory,d.name,'motiongraphic-video.json');
      if(!fs.existsSync(file))return [];
      const m=JSON.parse(fs.readFileSync(file,'utf8'));
      return [{...m,folder:d.name}];
    });
}
async function doZip(){
  console.log('\n=== ZIP OTOMATIS — PILIH JENIS EXPORT ===');
  console.log('  1. Satu video (ZIP editable)');
  console.log('  2. Semua video (ZIP masing-masing)');
  console.log('  3. MASTER ENGINE ONLY (tanpa video — default)');
  console.log('  4. Master + video (tanpa backup historis)');
  console.log('  5. Backup Master penuh + riwayat');
  const mode=await ask('\nPilih 1/2/3/4/5 (Enter = kembali): ');
  if(!mode)return console.log('[MENU] Ekspor dibatalkan tanpa perubahan.');
  if(mode==='1'){
    const video=await chooseVideo();
    if(video)runScript('zip-video.mjs',[video.id]);
  }else if(mode==='2'){
    if(catalogVideos().length)runScript('zip-video.mjs',['--all']);
  }else if(mode==='3')runScript('zip-video.mjs',['--studio']);
  else if(mode==='4')runScript('zip-video.mjs',['--studio','--with-projects']);
  else if(mode==='5')runScript('zip-video.mjs',['--studio','--full']);
  else console.log('[MENU] Pilihan ekspor tidak dikenal: '+mode);
}
async function doRender(){
  // Sinkronkan lebih dulu agar daftar scene untuk project baru juga aktual.
  if(!runScript('prepare-studio.mjs',['--skip-regression']))return;
  const video=await chooseVideo();
  if(!video)return;
  console.log(`\n=== RENDER: ${video.title} ===`);
  for(const [num,label] of renderChoices)console.log(`  ${num}. ${label}`);
  const answer=await ask('Pilih mode 1/2/3/4 (Enter = kembali): ');
  if(!answer)return console.log('[MENU] Render dibatalkan.');
  let mode;
  try{mode=resolveMode(answer)}catch(e){return console.log('[MENU] '+e.message)}
  let selection='';
  if(mode==='scene'||mode==='selected'){
    try{console.log('\nSCENE TERSEDIA:');printSceneList(video)}
    catch(e){return console.log('[MENU] '+e.message)}
    selection=await ask(mode==='scene'
      ?'Pilih nomor / ID scene (Enter = kembali): '
      :'Pilih nomor scene dipisah koma, contoh 1,3,5 (Enter = kembali): ');
    if(!selection)return console.log('[MENU] Render dibatalkan.');
  }
  // Validasi sebelum anak proses berjalan. Tidak ada input di child (Git Bash aman).
  let plan;
  try{plan=makeRenderPlan(video,mode,selection)}catch(e){return console.log('[MENU] '+e.message)}
  console.log('\n=== PILIH KUALITAS VIDEO ===');
  renderProfileChoices().forEach(([num,,label])=>console.log(`  ${num}. ${label}`));
  const picked=await ask('Pilih 1/2/3 (Enter = 1 CapCut HQ): ');
  let profile;
  try{profile=resolveRenderProfile(picked||'capcut')}catch(e){return console.log('[MENU] '+e.message)}
  console.log(`\n[RENDER] ${video.title} | ${mode.toUpperCase()} | ${plan.length} MP4 | ${RENDER_PROFILES[profile].label}`);
  for(const job of plan)console.log(`  • ${job.title} [${job.id}]`);
  runScript('render-menu.mjs',[video.id,'--mode',mode,'--profile',profile,...(selection?[mode==='scene'?'--scene':'--scenes',selection]:[])]);
}
async function doRename(){
  const project=await choose(currentProjects(),'PROJECT TERSEDIA:',p=>`${p.title} [${p.id}] (projects/${p.folder})`,p=>[p.id,p.slug,p.folder]);
  if(!project)return;
  console.log('\n  1. Ganti judul saja (paling aman)');
  console.log('  2. Ganti judul + slug + folder + path aset');
  console.log('  3. Sesuaikan slug ke nama folder saat ini');
  console.log('  4. Sesuaikan nama folder ke slug saat ini');
  const mode=await ask('Pilih 1/2/3/4/5 (Enter = kembali): ');
  if(!mode)return console.log('[MENU] Rename dibatalkan.');
  if(!['1','2','3','4'].includes(mode))return console.log('[MENU] Mode tidak valid.');
  let args=[project.id];
  if(mode==='1'||mode==='2'){
    const title=await ask('Judul baru (Enter = kembali): ');
    if(!title)return console.log('[MENU] Rename dibatalkan.');
    if(mode==='1')args.push('--title-only','--title',title);
    else args.push('--name',title);
  }else args.push(mode==='3'?'--adopt-folder':'--repair');
  console.log(`\n[MENU] Project: ${project.title} [${project.id}]`);
  if(mode==='2')console.log('[PERHATIAN] Mode ini juga mengubah slug, nama folder, dan referensi aset project TERPILIH.');
  const confirmation=await ask('Ketik RENAME untuk melanjutkan (selain itu batal): ');
  if(confirmation!=='RENAME')return console.log('[MENU] Rename dibatalkan; tidak ada perubahan.');
  runScript('rename-video.mjs',[...args,'--yes']);
}
async function doDelete(){
  const video=await chooseVideo();
  if(!video)return;
  console.log(`\n[MENU] Akan mengarsipkan ${video.title} [${video.id}] ke library/sampah.`);
  const confirmation=await ask('Ketik HAPUS untuk konfirmasi pengarsipan (selain itu batal): ');
  if(confirmation!=='HAPUS')return console.log('[MENU] Pengarsipan dibatalkan.');
  runScript('delete-video.mjs',[video.id,'--confirmed']);
}
async function doRestore(){
  const directory=path.join(ROOT,'library','sampah');
  if(!fs.existsSync(directory))return console.log('[MENU] Arsip belum tersedia.');
  const entries=fs.readdirSync(directory,{withFileTypes:true})
    .filter(d=>d.isDirectory()&&fs.existsSync(path.join(directory,d.name,'restore.json')))
    .flatMap(d=>{
      try{
        const data=JSON.parse(fs.readFileSync(path.join(directory,d.name,'restore.json'),'utf8'));
        return [{name:d.name,data}];
      }catch(e){console.warn('[MENU] Arsip tidak terbaca: '+d.name);return []}
    });
  const selected=await choose(entries,'VIDEO DALAM ARSIP:',e=>`${e.data.video?.title??'(tanpa judul)'} [${e.data.video?.id??'?'}] (${e.name})`,e=>[e.name]);
  if(!selected)return;
  runScript('restore-video.mjs',[selected.name]);
}

async function doValidateAddon(){
 const folder=await ask('Path folder add-on ChatGPT (Enter = kembali): ');
 if(!folder)return;
 const mode=await ask('Mode: 1 = video baru (default), 2 = legacy/revisi: ');
 if(mode&&!['1','2'].includes(mode))return console.log('[MENU] Mode tidak dikenal.');
 runScript('validate-addon.mjs',[folder.replace(/^['"]|['"]$/g,''),mode==='2'?'--strict':'--production','--syntax']);
}
async function doEditVO(){
 const project=await choose(catalogVideos().filter(v=>fs.existsSync(path.join(ROOT,v.projectDir,'src/config/narration.json'))),
  'VIDEO DENGAN VO GUIDE:',v=>`${v.title} [${v.id}]`,v=>[v.id,v.slug]);
 if(!project)return;
 const file=path.join(ROOT,project.projectDir,'src/config/narration.json');
 const data=JSON.parse(fs.readFileSync(file,'utf8'));
 console.log('\nBEAT NASKAH:');
 data.beats.forEach((b,i)=>console.log(`  ${i+1}. ${b.scene}: ${b.text.slice(0,70)||'(kosong)'}`));
 const selected=await ask('Nomor beat untuk diubah (Enter = kembali): ');
 const n=Number(selected);
 if(!selected||!Number.isInteger(n)||n<1||n>data.beats.length)return console.log('[VO] Tidak ada perubahan.');
 const updated=await ask('Tulis teks narasi baru (satu baris): ');
 if((await ask('Ketik SIMPAN agar naskah disimpan: '))!=='SIMPAN')return console.log('[VO] Batal.');
 if(runScript('vo-edit.mjs',[project.slug,'--beat',String(n),'--text',updated]))runScript('sync-projects.mjs');
}
async function doPatch(){
 const folder=await ask('Path folder patch (addon-patch.json) (Enter = kembali): ');
 if(!folder)return;
 const dest=folder.replace(/^['"]|['"]$/g,'');
 if(!runScript('apply-addon-patch.mjs',[dest,'--dry-run']))return;
 if((await ask('Ketik TERAPKAN untuk menjalankan patch: '))!=='TERAPKAN')return console.log('[PATCH] Batal.');
 if(runScript('apply-addon-patch.mjs',[dest]))runScript('sync-projects.mjs');
}
async function handle(choice){
  switch(choice){
    case '1': if(runScript('prepare-studio.mjs'))runScript('start-studio.mjs');break;
    case '3': await doRename();break;
    case '4': runScript('list-videos.mjs');break;
    case '5': if(runScript('sync-projects.mjs'))runScript('validate-library.mjs');break;
    case '6': await doRender();break;
    case '7': await doZip();break;
    case '8': await doDelete();break;
    case '9': await doRestore();break;
    case '10': runScript('doctor.mjs');break;
    case '11': await doValidateAddon();break;
    case '12': await doEditVO();break;
    case '13': await doPatch();break;
    case '15': runScript('qa-motion-plan.mjs',['--all']);break;
    case '16': runScript('check-release.mjs');break;
    case '17': {
      if(!runScript('prepare-studio.mjs',['--skip-regression']))break;
      const v=await chooseVideo();if(!v)break;
      console.log(' 1. Sample preview (frame penting)\n 2. Full preview (semua frame)\n 3. Full final (tanpa VO Guide compact)\n 4. Spatial plan deklaratif saja\n 5. Full CapCut HQ');
      const a=await ask('Pilih (Enter = kembali): ');
      if(a==='4')runScript('qa-spatial.mjs',[path.join(ROOT,v.projectDir)]);
      else if(['1','2','3','5'].includes(a))runScript('auto-spatial.mjs',[v.slug,({1:'sample',2:'full',3:'final',5:'capcut'})[a]]);
      break;}
    case '18': runScript('production-scope.mjs');break;
    case '19': {const v=await chooseVideo();if(!v)break;const f=await ask('Path phrases.json (Enter = kembali): ');if(f)runScript('vo-align.mjs',[path.join(ROOT,v.projectDir),f.replace(/^[\"']|[\"']$/g,'')]);break;}
    case '14': {
      console.log('\n[ALUR] Mulai dari judul, pilih langkah berikutnya dan buat prompt siap salin.');
      const title=await ask('Judul video baru (Enter untuk melihat alur saja): ');
      if(title)runScript('project-flow.mjs',['--new',title]);
      else runScript('project-flow.mjs',['--steps']);
      break;
    }
    default: console.log('[MENU] Pilihan tidak dikenal.');
  }
}
try{
  while(true){
    console.log('\n======== MOTIONGRAPHIC STUDIO — MENU ========');
    for(const [num,label] of menuItems.filter(([n])=>['1','4','6','7','8','9','17'].includes(n)))console.log(` ${num.padStart(2)}. ${label}`);
    console.log('  M. Maintenance / opsi lanjutan');
    console.log('  0. Keluar');
    const choice=await ask('\nPilih menu: ');
    if(!choice||choice==='0'){console.log('Selesai.');break}
    try{if(choice.toLowerCase()==='m'){
      console.log('\n=== MAINTENANCE (bukan workflow harian) ===');
      for(const [num,label] of menuItems.filter(([n])=>!['1','4','6','7','8','9','17'].includes(n)))console.log(` ${num.padStart(2)}. ${label}`);
      console.log(' 20. Audit statis lengkap + test regresi');
      const selected=await ask('Pilih (Enter = kembali): ');
      if(selected==='20'){const ok=runScript('studio-check.mjs');const testsOk=runScript('run-regression.mjs');console.log(ok&&testsOk?'[MAINTENANCE] Lulus':'[MAINTENANCE] Ada temuan; baca hasil, jangan reset project.');}
      else if(selected)await handle(selected);
    }else await handle(choice)}catch(e){console.error('[MENU] '+(e?.message||e));}
  }
}catch(e){
  if(e?.code!=='ERR_USE_AFTER_CLOSE')console.error('[MENU] '+(e?.message||e));
  process.exitCode=1;
}finally{rl.close()}
