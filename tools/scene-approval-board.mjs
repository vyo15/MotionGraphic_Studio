#!/usr/bin/env node
/**
 * Scene VO & ACC Board: derived, read-only view of the *actual* master sources.
 * Single sources: manifest for scene timing, narration.json for exact VO,
 * PRODUCTION-STATE.json for approvals. Never infer ACC from a video's appearance.
 * `--write` updates ONLY production/SCENE-VO-ACC-BOARD.md, not source/approval.
 */
import fs from 'node:fs';
import {resolveStateRows} from './approval-identity.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOARD = 'SCENE-VO-ACC-BOARD.md';
const safeSlug = s => typeof s === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const readJSON = file => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
const label = v => String(v ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
const fmtTime = (frame, fps) => `${(frame / fps).toFixed(2)}s`;
const normalized = v => String(v ?? '').toLowerCase();
const isBridge = s => /bridge|pengantar/i.test(String(s ?? ''));
import {isSilentNarration as isSilent} from './narration-silence.mjs';
const safeMarkdown = text => String(text).replace(/\\/g,'\\\\').replace(/\*/g,'\\*').replace(/`/g,'\\`').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/\r?\n/g,' ').trim();

function visualStatus(raw) {
  const s = normalized(raw);
  if (/^(?:locked|terkunci|approved-locked|visual-locked|visual-approved-locked)$/.test(s)) return 'ACC / LOCKED';
  if (/^(?:approved|visual-approved|acc|disetujui)$/.test(s)) return 'ACC VISUAL (belum otomatis LOCKED)';
  if (/selected|dipilih/.test(s)) return 'DIPILIH / BELUM LOCKED';
  if (/review|revisi/.test(s)) return 'REVIEW';
  return 'BELUM ACC';
}
function voTextStatus(state, sceneNumber, row) {
  const perScene = String(row?.scriptApproval ?? row?.voTextApproval ?? '').toLowerCase();
  if (perScene) {
    if (/^(?:approved|acc|locked|vo-approved|approved-locked)$/.test(perScene)) return 'ACC TEKS';
    if (/draft|pending|review/.test(perScene)) return 'DRAFT / REVIEW';
  }
  const global = normalized(state?.scriptApproval);
  const scoped = global.match(/scenes?[-_ ]0?(\d+)[-_ ]0?(\d+)[-_ ]vo[-_ ]approved/);
  if (scoped) return sceneNumber >= +scoped[1] && sceneNumber <= +scoped[2] ? 'ACC TEKS (scope global)' : 'BELUM TERBUKTI ACC';
  if (/^(?:approved|locked|acc|vo-approved-all)$/.test(global)) return 'ACC TEKS (global)';
  return 'DRAFT / BELUM TERBUKTI ACC';
}
function recordingStatus(state) {
  const s = normalized(state?.voiceOverStatus);
  if (/not[-_ ]?recorded|unrecorded|belum|draft|guide/.test(s) || !s) return 'VO GUIDE / BELUM DIREKAM';
  if (/^(?:recorded|rekaman-ada|recorded-synced|recorded-not-synced)$/.test(s)) return 'REKAMAN ADA; SYNC BELUM TERBUKTI';
  return `STATUS SUMBER: ${label(state.voiceOverStatus)}`;
}
function finalStatus(state) {
  const s = normalized(state?.fullVideoApproval);
  if (/^(?:final-approved|final-acc|published)$/.test(s)) return 'FINAL ACC (klaim status sumber)';
  return 'BELUM FINAL ACC';
}
function readBridgeLock(projectDir) {
  const file = path.join(projectDir,'production','ALL-SCENES-ACC-20261121.json');
  const obj = readJSON(file);
  const entry = Object.entries(obj?.scenes ?? {}).find(([name]) => isBridge(name));
  return entry ? {status:entry[1]?.status, source:'production/ALL-SCENES-ACC-20261121.json'} : null;
}
function analyze(projectDir) {
  const m = readJSON(path.join(projectDir, 'motiongraphic-video.json'));
  if (!m) throw Error('Manifest project tidak ditemukan: '+projectDir);
  if (!Number.isInteger(m.durationInFrames) || !Number.isInteger(m.fps) || m.fps<=0) throw Error('Manifest timing tidak valid: '+m.slug);
  const narration = readJSON(path.join(projectDir,'src/config/narration.json'));
  const state = readJSON(path.join(projectDir,'PRODUCTION-STATE.json'));
  const warnings = [];
  if (!narration || !Array.isArray(narration.beats)) warnings.push('narration.json tidak tersedia/invalid; teks VO tidak dapat dipastikan.');
  if (!state || !Array.isArray(state.scenes)) warnings.push('PRODUCTION-STATE.json tidak tersedia/invalid; status ACC tidak bisa dipastikan.');
  const segments = (m.segments?.length ? m.segments.map((s,i)=>({id:s.id,title:s.title,start:s.startFrame,end:s.startFrame+s.durationInFrames,number:i+1})) : [{id:m.id,title:m.title,start:0,end:m.durationInFrames,number:1}]);
  const beats = narration?.beats ?? [];
  const slots = [];
  for (const segment of segments) {
    // Only a specifically labeled transition beat creates an extra review row.
    // S02 in Easy2Boot includes Bridge 02→03 in its manifest; never edit manifest to split it.
    const bridgeBeats = beats.filter(b=>isBridge(b.scene) && b.startFrame>=segment.start && b.endFrame<=segment.end);
    let cursor=segment.start;
    for (const b of bridgeBeats) {
      if (b.startFrame>cursor) slots.push({...segment,start:cursor,end:b.startFrame});
      slots.push({id:String(b.scene),title:'Pengantar / Bridge antar-scene',start:b.startFrame,end:b.endFrame,number:null,parentId:segment.id,bridge:true});
      cursor=b.endFrame;
    }
    if(cursor<segment.end)slots.push({...segment,start:cursor,end:segment.end});
  }
  const resolved=resolveStateRows(m,state?.scenes ?? []);
  warnings.push(...resolved.warnings);
  const stateRows=resolved.map;
  const bridgeLock=readBridgeLock(projectDir);
  const rows=slots.map((slot,index)=>{
    const overlap = beats.filter(b=>b.startFrame<slot.end && b.endFrame>slot.start);
    const matched = stateRows.get(slot.id);
    const parent = slot.bridge ? stateRows.get(slot.parentId) : null;
    const rawVisual = slot.bridge ? (bridgeLock?.status ?? parent?.status ?? '') : (matched?.visualApproval ?? matched?.status ?? '');
    const exactVo = overlap.filter(b=>!isSilent(b.text)).map(b=>String(b.text).trim()).join(' ');
    const silent = !exactVo;
    if(!overlap.length) warnings.push(`Scene ${slot.id}: tidak ada beat VO pada frame ${slot.start}–${slot.end}.`);
    if(overlap.some(b=>b.startFrame<slot.start || b.endFrame>slot.end)) warnings.push(`Scene ${slot.id}: ada beat VO lintas batas slot; audit timing diperlukan.`);
    return {
      ...slot,index:index+1,vo:exactVo,silent,beats:overlap.length,
      voText: silent?'TANPA VO (visual saja)':voTextStatus(state,slot.number,matched),
      visual:visualStatus(rawVisual),visualRaw:rawVisual||'tidak ada status',
      recording:recordingStatus(state),final:finalStatus(state),
      notes:String((matched??parent)?.notes??''),
      approvalSource:slot.bridge&&bridgeLock?bridgeLock.source:'PRODUCTION-STATE.json'
    };
  });
  const coverage=beats.length ? beats.at(-1).endFrame : 0;
  if(coverage!==m.durationInFrames)warnings.push(`VO beats menutup ${coverage} frame; manifest ${m.durationInFrames} frame.`);
  if (rows.some(s=>s.visual.includes('DIPILIH'))) warnings.push('Status "visual-selected" tidak setara ACC/LOCKED; butuh keputusan eksplisit sebelum dikunci.');
  return {slug:m.slug,id:m.id,title:m.title,fps:m.fps,durationInFrames:m.durationInFrames,rows,warnings,narrationStatus:narration?.status ?? 'tidak tersedia',scriptApproval:state?.scriptApproval??'tidak tersedia',storyboardApproval:state?.storyboardApproval??'tidak tersedia',fullVideoApproval:state?.fullVideoApproval??'tidak tersedia',voiceOverStatus:state?.voiceOverStatus??'tidak tersedia'};
}

function markdown(board) {
  const {rows,fps}=board;
  const totals={locked:rows.filter(r=>r.visual==='ACC / LOCKED').length,approved:rows.filter(r=>r.visual.startsWith('ACC ')).length,selected:rows.filter(r=>r.visual.startsWith('DIPILIH')).length};
  const out=[
    `# SCENE VO & ACC BOARD — ${safeMarkdown(board.title)}`,
    '',
    '> **AUTO-GENERATED / READ-ONLY VIEW.** Jangan edit file ini sebagai sumber keputusan. Edit sumber yang benar melalui patch terbatas setelah pengguna memberi ACC, kemudian jalankan `npm run sync`. Dokumen ini tidak membuktikan MP4 telah dirender atau edit GUI Save/reload telah diuji.',
    '',
    `- **Project:** \`${board.slug}\` · ${fps} FPS · ${board.durationInFrames} frame (${fmtTime(board.durationInFrames,fps)})`,
    `- **Visual:** ${totals.locked}/${rows.length} LOCKED · ${totals.approved}/${rows.length} ACC/LOCKED · ${totals.selected} hanya DIPILIH`,
    `- **VO narration status:** ${safeMarkdown(board.narrationStatus)}; **Script approval (state):** ${safeMarkdown(board.scriptApproval)}`,
    `- **Storyboard approval (state):** ${safeMarkdown(board.storyboardApproval)}`,
    `- **Rekaman:** ${safeMarkdown(board.voiceOverStatus)} · **Final:** ${safeMarkdown(board.fullVideoApproval)}`,
    '',
    '## RINGKASAN SEMUA SCENE — WAJIB TAMPIL SEBELUM DETAIL REVISI',
    '',
    '| Scene | Rentang | VO teks | Visual/ACC | Rekaman | Final |',
    '|---|---|---|---|---|---|',
    ...rows.map(r=>`| ${label(r.id)}${r.bridge?' (BRIDGE)':''} | ${fmtTime(r.start,fps)}–${fmtTime(r.end,fps)} | ${label(r.voText)} | ${label(r.visual)} | ${label(r.recording)} | ${label(r.final)} |`),
    '',
    '## VO LENGKAP PER SCENE DAN CATATAN ACC',
  ];
  for(const r of rows) {
    out.push('',`### ${safeMarkdown(r.id)} — ${safeMarkdown(r.title)}`,'',
      `- **Waktu:** ${fmtTime(r.start,fps)}–${fmtTime(r.end,fps)} (${r.end-r.start} frame)` ,
      `- **VO teks:** ${r.voText} · **Visual:** ${r.visual} (sumber: ${r.approvalSource})`,
      `- **Rekaman/sync:** ${r.recording} · **Final:** ${r.final}`,
      '',r.silent?'**VO:** *(TANPA VO / COVER / VISUAL HOLD)*':`**VO asli:** “${safeMarkdown(r.vo)}”`);
    if(r.notes)out.push('',`**Catatan dari state:** ${safeMarkdown(r.notes)}`);
    if(r.bridge)out.push('',`**Perhatian:** beat BRIDGE berada di dalam segmen manifest \`${r.parentId}\`. Ini hanya baris review; tidak mengubah registrasi dan source scene ACC.`);
  }
  out.push('','## PEMERIKSAAN DAN KONFLIK SUMBER','',...(board.warnings.length?board.warnings.map(w=>`- PERIKSA: ${safeMarkdown(w)}`):['- Tidak ditemukan konflik dasar timing atau ketersediaan data.']),
    '', '## ATURAN SAAT DISKUSI DI CHATGPT', '',
    '1. Tampilkan **seluruh VO asli + status** semua scene dahulu, lalu detail scene yang sedang dibahas. Jangan ringkas VO menjadi parafrasa.',
    '2. Status **VO TEKS**, **VISUAL**, **REKAMAN/SYNC**, dan **FINAL** harus terpisah. Visual ACC tidak berarti VO final.',
    '3. Perubahan ACC hanya setelah persetujuan pengguna: catat di `PRODUCTION-STATE.json` + `decisionLog`; jangan edit hasil generated board untuk mengunci keputusan.',
    '4. Jika file metadata tertinggal dari source/preview, laporkan perbedaan. Scene ACC lain tidak boleh ditulis ulang.',
    '5. Untuk preview gerakan, kirim video yang benar-benar bergerak; foto/contact sheet hanya pendukung.',
    '', '**Sumber:** `motiongraphic-video.json`, `src/config/narration.json`, `PRODUCTION-STATE.json`; untuk Bridge yang punya catatan ACC eksplisit juga `production/ALL-SCENES-ACC-20261121.json`.',
    '');
  return out.join('\n');
}
function writeBoard(projectDir,body) {
  const dir=path.join(projectDir,'production');
  if(fs.existsSync(dir)&&fs.lstatSync(dir).isSymbolicLink())throw Error('Folder production symlink ditolak: '+dir);
  fs.mkdirSync(dir,{recursive:true});
  const file=path.join(dir,BOARD);
  if(fs.existsSync(file)&&fs.readFileSync(file,'utf8')===body)return false;
  // Do not follow symbolic links: especially important on Windows / shared workspaces.
  if(fs.existsSync(file)&&fs.lstatSync(file).isSymbolicLink())throw Error('Board symlink ditolak: '+file);
  fs.writeFileSync(file,body,'utf8');return true;
}
export {analyze,markdown,writeBoard,BOARD};

function main() {
 const args=process.argv.slice(2), valid=new Set(['--all','--write','--check','--json','--help']);
 const unexpected=args.filter(a=>a.startsWith('--')&&!valid.has(a));if(unexpected.length)throw Error('Flag tidak dikenali: '+unexpected.join(','));
 if(args.includes('--help'))return console.log('Pakai: node tools/scene-approval-board.mjs [slug|--all] [--write|--check] [--json]\nDefault: output Markdown ke terminal (read-only). --write: perbarui file board generated; --check: pastikan file board sudah mutakhir (read-only).');
 if(args.includes('--write')&&args.includes('--check'))throw Error('Pilih satu: --write atau --check');
 const projects=path.join(ROOT,'projects'), selected=args.find(a=>!a.startsWith('--'));
 if(selected&&!safeSlug(selected))throw Error('Slug tidak aman: '+selected);
 const slugs=selected?[selected]:fs.readdirSync(projects,{withFileTypes:true}).filter(d=>d.isDirectory()&&!d.name.startsWith('_')&&!d.name.startsWith('.')).map(d=>d.name).sort();
 const boards=[];let stale=0;
 for(const slug of slugs) {
  if(!safeSlug(slug))throw Error('Folder project tidak aman: '+slug);
  const dir=path.join(projects,slug);
  if(fs.lstatSync(dir).isSymbolicLink())throw Error('Symlink project ditolak: '+slug);
  if(!fs.existsSync(path.join(dir,'motiongraphic-video.json')))throw Error('Project tidak ada: '+slug);
  const data=analyze(dir),body=markdown(data),target=path.join(dir,'production',BOARD);
  if(args.includes('--write'))console.log(`[SCENE BOARD] ${slug}: ${writeBoard(dir,body)?'updated':'unchanged'}`);
  else if(args.includes('--check')) {const ok=fs.existsSync(target)&&fs.readFileSync(target,'utf8')===body;console.log(`[SCENE BOARD] ${slug}: ${ok?'OK':'STALE / NOT FOUND'}`);if(!ok)stale++;}
  else if(args.includes('--json'))boards.push(data);
  else console.log(body);
 }
 if(args.includes('--json')&&!args.includes('--write')&&!args.includes('--check'))console.log(JSON.stringify(boards,null,2));
 if(stale)process.exitCode=1;
}
const invoked=process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url);
if(invoked)try{main()}catch(e){console.error('[SCENE BOARD ERROR] '+e.message);process.exitCode=1}
