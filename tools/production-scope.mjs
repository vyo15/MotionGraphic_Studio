#!/usr/bin/env node
/**
 * Metadata produksi non-destruktif untuk add-on folder-first.
 * Dokumen baru dibuat hanya bila belum ada. Sync tidak pernah mengubah
 * script, storyboard, keputusan kreatif, maupun status persetujuan yang sudah ada.
 * Tidak membuat/merombak komposisi Remotion.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const DOCS=['AGENTS.md','PROJECT-SCOPE.md','SCRIPT.md','STORYBOARD.md','PRODUCTION-STATE.json'];
const clean=(input)=>String(input??'').replace(/\|/g,'\\|').replace(/[\r\n]+/g,' ').trim();
const duration=(frames,fps)=>`${(frames/fps).toFixed(1)} dtk (${frames} frame)`;
const segmentsOf=(m)=>Array.isArray(m.segments)?m.segments:[];
const sceneOf=(s)=>({id:s.id,title:s.title,status:'pending',scriptApproval:'pending',storyboardApproval:'pending',visualApproval:'pending'});

export function initialProductionState(m){
 const segments=segmentsOf(m);
 return {
  schemaVersion:1,
  projectId:m.id,
  slug:m.slug,
  workflow:'guided-approval-first-scene',
  phase:'script-review',
  scriptApproval:'pending',
  storyboardApproval:'pending',
  referenceSceneId:segments[0]?.id??null,
  referenceSceneApproval:'pending',
  voiceOverStatus:'not-recorded',
  fullVideoApproval:'pending',
  scenes:segments.map(sceneOf),
  decisionLog:[],
  notes:'Dokumen dibuat otomatis saat sync. Status approval tidak boleh diubah menjadi approved tanpa persetujuan pengguna.'
 };
}
function scopeText(m){
 const ref=segmentsOf(m)[0];
 return `# PROJECT SCOPE — ${clean(m.title)}\n\n`+
 `> Status: **PERLU REVIEW**. Dokumen awal ini dibuat otomatis, bukan keputusan yang disetujui pengguna.\n\n`+
 `## Identitas tetap\n\n- Project ID: \`${m.id}\`\n- Slug/folder: \`${m.slug}\`\n- Komposisi penuh: \`${m.id}\`\n- Frame: ${m.width} × ${m.height} · ${m.fps} FPS · ${duration(m.durationInFrames,m.fps)}\n- Scene referensi pertama: ${ref?`\`${ref.id}\` — ${clean(ref.title)}`:'belum ada segmen pada manifest'}\n\n`+
 `## Creative brief (isi melalui diskusi; jangan menebak)\n\n`+
 `- Target audiens: **BELUM DIPUTUSKAN**\n- Tujuan utama: **BELUM DIPUTUSKAN**\n- Gaya bicara / pacing: **BELUM DIPUTUSKAN**\n- Brand kit / warna / font: **BELUM DIPUTUSKAN**\n- Peran visual vs narasi: **BELUM DIPUTUSKAN**\n- CTA: **BELUM DIKUNCI**\n\n`+
 `## Keputusan dan batas revisi\n\n- Semua keputusan baru ditandai **USULAN**, **DISETUJUI**, atau **TERKUNCI** dan dicatat bersama tanggal serta scope.\n- Jangan mengubah keputusan TERKUNCI tanpa permintaan eksplisit.\n- Proses produksi: script penuh → storyboard penuh → bangun scene referensi → approval scene referensi → bangun scene berikut → audio sync → full QA → render.\n- Edit segmen memakai komposisi segmen langsung; video lengkap untuk preview/render.\n- File ini bukan kode eksekusi. Preview/render mengikuti source Remotion; setiap ketidakcocokan dengan naskah harus ditandai.\n`;
}
function scriptText(m){
 const segs=segmentsOf(m);
 return `# SCRIPT — ${clean(m.title)}\n\n`+
 `> Draft awal otomatis. **Belum ada persetujuan narasi.** Salin naskah final ke sini sebelum build.\n`+
 `> Tempo voice-over menentukan durasi final; jangan mengunci timing dari estimasi sebelum rekaman tersedia.\n\n`+
 (segs.length?segs.map((s,i)=>`## ${i===0?'01.':String(i+1).padStart(2,'0')+'.'} ${clean(s.title)}\n\n- ID: \`${s.id}\`\n- Durasi implementasi saat ini: ${duration(s.durationInFrames,m.fps)}\n- Narasi yang disetujui: **BELUM DIISI**\n- Jeda / penekanan: **BELUM DIISI**\n- Status script: **PENDING**\n`).join('\n'):
 `## Segmen belum terdaftar\n\nSegmen ditentukan melalui manifest/source sesuai standar Master.\n`);
}
function storyboardText(m){
 const segs=segmentsOf(m);
 return `# STORYBOARD — ${clean(m.title)}\n\n`+
 `> Draft otomatis. Bukan hasil approval. Visual mengikuti narasi, bukan menduplikasi semua kata sebagai typography.\n\n`+
 `| Scene | Durasi implementasi | Narasi | Teks Layar | Visual | Animasi | Editable Assets | Approval |\n`+
 `|---|---|---|---|---|---|---|---|\n`+
 (segs.length?segs.map(s=>`| \`${clean(s.id)}\` — ${clean(s.title)} | ${duration(s.durationInFrames,m.fps)} | Review script | Minimum seperlunya | Review visual | Review timing | Periksa layer | PENDING |`).join('\n')+'\n':'| Belum terdaftar | — | — | — | — | — | — | PENDING |\n')+
 `\n## Quality gate\n\n`+
 `1. Script **dan** storyboard lengkap disetujui sebelum build.\n`+
 `2. Bangun dan review **scene pertama** sebagai acuan gaya. Jangan membangun scene lain sebagai final sebelum scene referensi disetujui.\n`+
 `3. Evaluasi 9:16, safe zone, keterbacaan HP, kesinambungan visual, cursor/UI, layer Remotion editable, frame dan jeda.\n`+
 `4. Scene pertama untuk greenscreen/presenter tidak menggantikan validasi realisme UI pada scene demo pertama.\n`+
 `5. Baru lanjut scene lain berdasarkan acuan gaya yang dikunci.\n`;
}
function agentsText(){
 return `# Instruksi AI untuk add-on ini\n\n`+
 `Saat ZIP project ini diunggah ke ChatGPT/agent:\n\n`+
 `1. Baca \`motiongraphic-video.json\`, \`PROJECT-SCOPE.md\`, \`SCRIPT.md\`, \`STORYBOARD.md\`, \`PRODUCTION-STATE.json\`, lalu source \`src/Video.tsx\` dan \`src/SegmentVideo.tsx\` bila ada.\n`+
 `2. Jika tersedia dalam Master, baca \`PRODUCTION-RULES.md\` dan \`AGENTS.md\` di root.\n`+
 `3. Laporkan status scene, keputusan TERKUNCI, perbedaan narasi vs source, dan apa yang belum diputuskan. Jangan menebak approval.\n`+
 `4. Terapkan **approval scene pertama lebih dulu**. Jangan membangun seluruh scene hanya karena source sudah ada. Jika revisi, ubah hanya segmen yang diminta.\n`+
 `5. Video lengkap = preview/render gabungan, segmen = editing detail. Sumber komponen sama; jangan flatten visual menjadi video atau screenshot.\n`+
 `6. Kirim add-on jika video baru, atau **FILE CHANGE ONLY (copy-paste/Replace)** jika revisi. Jangan menimpa project lain atau Master secara sembarangan.\n`+
 `7. Dokumen ini adalah instruksi proses, bukan fitur Remotion bawaan; drag/resize dan persistensi edit harus diuji pada versi Studio yang terpasang.\n`;
}

export function ensureProjectProductionDocs(projectDir,m){
 const files={
  'AGENTS.md':agentsText(),
  'PROJECT-SCOPE.md':scopeText(m),
  'SCRIPT.md':scriptText(m),
  'STORYBOARD.md':storyboardText(m),
  'PRODUCTION-STATE.json':JSON.stringify(initialProductionState(m),null,2)+'\n',
 };
 const made=[];
 for(const [name,body] of Object.entries(files)){
  const target=path.join(projectDir,name);
  try{fs.writeFileSync(target,body,{encoding:'utf8',flag:'wx'});made.push(name)}
  catch(e){if(e.code!=='EEXIST')throw e}
 }
 return made;
}

export function validateProjectProduction(projectDir,m){
 const errors=[],warnings=[];
 for(const filename of DOCS)if(!fs.existsSync(path.join(projectDir,filename)))errors.push('Dokumen tidak ditemukan: '+filename);
 if(errors.length)return {errors,warnings};
 let state;
 try{state=JSON.parse(fs.readFileSync(path.join(projectDir,'PRODUCTION-STATE.json'),'utf8'))}
 catch(e){return {errors:['PRODUCTION-STATE.json tidak valid: '+e.message],warnings}}
 if(state.projectId!==m.id||state.slug!==m.slug)errors.push('ID/slug di PRODUCTION-STATE.json berbeda dari manifest. Jangan otomatis reset status, periksa manual.');
 const scenes=segmentsOf(m),ids=new Set(scenes.map(s=>s.id)),saved=new Set((state.scenes??[]).map(s=>s.id));
 for(const s of scenes)if(!saved.has(s.id))warnings.push(`Segmen baru ${s.id} belum dicatat di state (jangan hilangkan approval segmen lama).`);
 for(const s of state.scenes??[])if(!ids.has(s.id))warnings.push(`Segmen state ${s.id} tidak ada di manifest; review rename/timing sebelum revisi.`);
 if(state.referenceSceneId&&!ids.has(state.referenceSceneId))errors.push('referenceSceneId tidak ada pada manifest.');
 if(state.referenceSceneApproval==='approved'&&(state.scriptApproval!=='approved'||state.storyboardApproval!=='approved')){
  warnings.push('Scene referensi approved sementara script/storyboard belum approved — cek riwayat keputusan.');
 }
 if(['scene-build','full-assembly','audio-sync','qa','render','delivered'].includes(state.phase)&&state.referenceSceneApproval!=='approved'){
  warnings.push('Fase produksi melewati gate approval scene pertama; minta persetujuan pengguna sebelum lanjut.');
 }
 return {errors,warnings,state};
}

function cli(){
 const roots=path.join(ROOT,'projects');
 const dirs=fs.existsSync(roots)?fs.readdirSync(roots,{withFileTypes:true}).filter(x=>x.isDirectory()&&!x.name.startsWith('_')&&!x.name.startsWith('.')):[];
 let failed=false;
 for(const dir of dirs){
  const projectDir=path.join(roots,dir.name),manifestFile=path.join(projectDir,'motiongraphic-video.json');
  if(!fs.existsSync(manifestFile))continue;
  const m=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
  if(process.argv.includes('--init'))console.log(`[PRODUKSI] ${dir.name} +${ensureProjectProductionDocs(projectDir,m).length} dokumen baru`);
  const result=validateProjectProduction(projectDir,m);
  const state=result.state;
  console.log(`[PRODUKSI] ${dir.name} | script=${state?.scriptApproval??'?'} | storyboard=${state?.storyboardApproval??'?'} | referensi=${state?.referenceSceneApproval??'?'}`);
  for(const e of result.errors){failed=true;console.error('  ERROR: '+e)}
  for(const w of result.warnings)console.warn('  REVIEW: '+w);
 }
 if(failed)process.exitCode=1;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))cli();
