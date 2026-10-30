#!/usr/bin/env node
/**
 * MotionGraphic Studio -> Concat: export HOOK, ISI, CTA as separate MP4 files.
 * Non-destructive: never edits manifests, scenes, compositions or other projects.
 * Requires the existing Master (node_modules, projects, src/index.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {randomUUID, createHash} from 'node:crypto';
import {createInterface} from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

const MASTER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS = path.join(MASTER, 'projects');
const CLI = path.join(MASTER, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');

function usage() {
  console.log(`\nEXPORT 3 BAGIAN REMOTION -> CONCAT\n
  node tools/export-concat-segments.mjs --project windows-hacks-5-shortcut-lengkap
  node tools/export-concat-segments.mjs                   (pilih project)
  node tools/export-concat-segments.mjs --project <slug> --dry-run
  node tools/export-concat-segments.mjs --project <slug> --hook-end 8 --cta-start 69.5
  node tools/export-concat-segments.mjs --project <slug> --mute-remotion
  node tools/export-concat-segments.mjs --project <slug> --only ISI

Opsi:
  --project <slug|id>   Pilih project Master.
  --hook-end <detik>   Akhir Hook, awal Isi (waktu eksklusif).
  --cta-start <detik>  Awal CTA, akhir Isi.
  --mute-remotion      Tanpa audio Remotion (default, untuk voice-over Concat).
  --with-remotion-audio Pertahankan audio/SFX Remotion jika lisensinya sudah aman.
  --only <HOOK|ISI|CTA> Perbarui satu bagian dari paket current (bagian lain dijaga).
  --no-sync            Lewati sync otomatis (untuk diagnosis).
  --dry-run            Cek pembagian dan perintah tanpa merender.
  --help               Bantuan.\n`);
}

function argumentsFrom(argv) {
  const options = {project: undefined, hookEnd: undefined, ctaStart: undefined, only: undefined, mute: true, dryRun: false, sync: true};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {usage(); process.exit(0);}
    if (arg === '--mute-remotion') {options.mute = true; continue;}
    if (arg === '--with-remotion-audio') {options.mute = false; continue;}
    if (arg === '--dry-run') {options.dryRun = true; continue;}
    if (arg === '--no-sync') {options.sync = false; continue;}
    if (['--project', '--hook-end', '--cta-start', '--only'].includes(arg)) {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`Nilai ${arg} tidak diberikan`);
      if (arg === '--project') options.project = value;
      else if (arg === '--only') {
        const name = value.toUpperCase();
        if (!['HOOK','ISI','CTA'].includes(name)) throw new Error('Isi --only harus HOOK, ISI, atau CTA.');
        options.only = name;
      }
      else if (arg === '--hook-end') options.hookEnd = Number(value);
      else options.ctaStart = Number(value);
      continue;
    }
    throw new Error(`Opsi tidak dikenal: ${arg}. Pakai --help`);
  }
  if ((options.hookEnd === undefined) !== (options.ctaStart === undefined)) {
    throw new Error('Berikan --hook-end dan --cta-start bersama-sama.');
  }
  return options;
}

function getProjects() {
  if (!fs.existsSync(PROJECTS)) throw new Error(`Folder projects/ tidak ditemukan: ${PROJECTS}`);
  return fs.readdirSync(PROJECTS, {withFileTypes: true})
    .filter((d) => d.isDirectory())
    .map((d) => {
      const manifestPath = path.join(PROJECTS, d.name, 'motiongraphic-video.json');
      if (!fs.existsSync(manifestPath)) return null;
      try {
        const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (!m.id || !m.slug || !Number.isInteger(m.durationInFrames) || !Number.isInteger(m.fps)) return null;
        return {manifestPath, folder: d.name, ...m};
      } catch (err) {throw new Error(`Manifest tidak valid di ${manifestPath}: ${err.message}`);}
    }).filter(Boolean).sort((a, b) => a.slug.localeCompare(b.slug));
}

async function chooseProject(projects, requested) {
  if (!projects.length) throw new Error('Tidak ada project folder-first yang valid.');
  if (requested) {
    const found = projects.find((p) => p.slug === requested || p.id === requested || p.folder === requested);
    if (!found) throw new Error(`Project '${requested}' tidak ditemukan. Pilihan: ${projects.map(p => p.slug).join(', ')}`);
    return found;
  }
  console.log('\nPILIH VIDEO:');
  projects.forEach((p, i) => console.log(`  ${i + 1}. ${p.title || p.slug} [${p.slug}]`));
  if (!input.isTTY) throw new Error('Terminal non-interaktif: gunakan --project <slug>.');
  const rl = createInterface({input, output});
  try {
    const answer = await rl.question('Nomor video (Enter untuk batal): ');
    if (!answer.trim()) throw new Error('Dibatalkan.');
    const number = Number(answer);
    if (!Number.isInteger(number) || number < 1 || number > projects.length) throw new Error('Nomor pilihan tidak valid.');
    return projects[number - 1];
  } finally {rl.close();}
}

function frameFromSeconds(value, fps, name) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${name}: nilai detik tidak valid.`);
  const frame = Math.round(value * fps);
  if (Math.abs(frame / fps - value) > 0.0167) console.log(`[CATATAN] ${name} dibulatkan ke frame terdekat: ${frame} (${(frame/fps).toFixed(3)}s)`);
  return frame;
}

function fromTimeline(project) {
  const cues = project.defaultProps?.audioTimeline;
  if (!Array.isArray(cues)) return null;
  const hook = cues.find((c) => c.id === 'HOOK');
  const cta = cues.find((c) => c.id === 'CTA');
  if (!hook || !cta || !Number.isInteger(hook.startFrame) || !Number.isInteger(hook.durationFrames) || !Number.isInteger(cta.startFrame)) return null;
  if (hook.startFrame !== 0) return null;
  return {hookEnd: hook.startFrame + hook.durationFrames, ctaStart: cta.startFrame, method: 'audioTimeline manifest (cue HOOK/CTA)'};
}

async function segmentBoundaries(project, options) {
  const total = project.durationInFrames;
  const fps = project.fps;
  let plan;
  if (options.hookEnd !== undefined) {
    plan = {hookEnd: frameFromSeconds(options.hookEnd, fps, 'Hook akhir'), ctaStart: frameFromSeconds(options.ctaStart, fps, 'CTA awal'), method: 'argumen CLI'};
  } else {
    const file = path.join(PROJECTS, project.folder, 'concat-segments.json');
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      plan = {hookEnd: Number(data.hookEndFrame), ctaStart: Number(data.ctaStartFrame), method: `konfigurasi ${file}`};
    } else {
      plan = fromTimeline(project);
    }
  }
  if (!plan) {
    if (!input.isTTY) throw new Error('Penanda HOOK/CTA tidak ada. Tentukan --hook-end dan --cta-start dalam detik.');
    const rl = createInterface({input, output});
    try {
      const hook = await rl.question('Akhir HOOK (detik): ');
      const cta = await rl.question(`Mulai CTA (detik, total ${(total/fps).toFixed(2)}s): `);
      plan = {hookEnd: frameFromSeconds(Number(hook), fps, 'Hook akhir'), ctaStart: frameFromSeconds(Number(cta), fps, 'CTA awal'), method: 'input pengguna'};
    } finally {rl.close();}
  }
  if (!Number.isInteger(plan.hookEnd) || !Number.isInteger(plan.ctaStart) || !(0 < plan.hookEnd && plan.hookEnd < plan.ctaStart && plan.ctaStart < total)) {
    throw new Error(`Pembagian tidak valid: HOOK 0-${plan.hookEnd-1}, ISI ${plan.hookEnd}-${plan.ctaStart-1}, CTA ${plan.ctaStart}-${total-1}. Total ${total} frame.`);
  }
  return {...plan, pieces: [
    {name: '01-HOOK.mp4', key: 'HOOK', startFrame: 0, endFrame: plan.hookEnd-1},
    {name: '02-ISI.mp4', key: 'ISI', startFrame: plan.hookEnd, endFrame: plan.ctaStart-1},
    {name: '03-CTA.mp4', key: 'CTA', startFrame: plan.ctaStart, endFrame: total-1},
  ]};
}

function run(label, args, {quiet = false} = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n[${label}]`);
    const child = spawn(process.execPath, args, {cwd: MASTER, stdio: quiet ? ['ignore','pipe','pipe'] : 'inherit', windowsHide: true});
    let out = '';
    if (quiet) {
      child.stdout.on('data', (x) => {out += x.toString();});
      child.stderr.on('data', (x) => {out += x.toString();});
    }
    child.once('error', reject);
    child.once('close', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${label} gagal (kode ${code}, signal ${signal || '-'}).${quiet ? '\n' + out.slice(-3500) : ''}`));
    });
  });
}

function auditMediaPaths(project) {
  const dir = path.join(PROJECTS, project.folder, 'public');
  const result = [];
  const mediaExtensions = new Set(['.png','.jpg','.jpeg','.webp','.gif','.svg','.mp3','.wav','.m4a','.aac','.ogg','.flac','.mp4','.mov','.webm','.ttf','.otf','.woff','.woff2']);
  function walk(folder) {
    if (!fs.existsSync(folder)) return;
    for (const d of fs.readdirSync(folder,{withFileTypes:true})) {
      const full = path.join(folder,d.name);
      if (d.isSymbolicLink()) continue;
      if (d.isDirectory()) walk(full);
      else if (d.isFile() && mediaExtensions.has(path.extname(d.name).toLowerCase())) {
        result.push(path.relative(path.join(PROJECTS,project.folder),full).replaceAll('\\','/'));
      }
    }
  }
  walk(dir);
  return result.sort();
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function main() {
  const opts = argumentsFrom(process.argv.slice(2));
  if (!fs.existsSync(path.join(MASTER, 'src', 'index.ts'))) throw new Error('Jalankan patch dari Master Studio yang berisi src/index.ts.');
  const project = await chooseProject(getProjects(), opts.project);
  if (!/^[a-z][a-z0-9-]{1,60}$/.test(project.slug) || project.slug !== project.folder) throw new Error('Slug manifest harus sama dengan nama folder project dan hanya huruf kecil/angka/tanda hubung.');
  const plan = await segmentBoundaries(project, opts);
  console.log(`\nVIDEO : ${project.title || project.slug}\nID    : ${project.id}\nFPS   : ${project.fps}\nRES   : ${project.width}x${project.height}\nTOTAL : ${(project.durationInFrames/project.fps).toFixed(2)} detik (${project.durationInFrames} frame)`);
  console.log(`BATAS : ${plan.method}`);
  for (const p of plan.pieces) {
    console.log(`${p.name.padEnd(15)} | frame ${String(p.startFrame).padStart(4)}-${String(p.endFrame).padEnd(4)} | ${((p.endFrame-p.startFrame+1)/project.fps).toFixed(2)}s`);
  }
  console.log(`AUDIO : ${opts.mute ? 'dimatikan (isi ulang di Concat)' : 'SFX/audio Remotion tetap ada (jika di video)'}`);
  if (opts.only) console.log(`REVISI: Hanya render ${opts.only}`);
  if (opts.dryRun) {console.log('\n[DRY RUN OK] Tidak ada file yang diubah atau dirender.'); return;}
  if (!fs.existsSync(CLI)) throw new Error(`Remotion CLI tidak ditemukan: ${CLI}. Jalankan npm install dari Master.`);
  if (opts.sync) {
    for (const file of ['sync-projects.mjs', 'validate-library.mjs']) {
      const tool = path.join(MASTER, 'tools', file);
      if (fs.existsSync(tool)) await run(`SYNC / VALIDASI - ${file}`, [tool]);
    }
  }
  // Stable output paths are essential: Concat relinks/imports 01-HOOK.mp4 etc.
  // Rendering directly over an open media file risks truncating a project.
  // Build in a separate staging directory, then replace the entire current
  // folder in one rename; the prior set remains under history/ for recovery.
  const handoffRoot = path.join(MASTER, 'out', 'concat', project.slug);
  const current = path.join(handoffRoot, 'current');
  const stage = path.join(handoffRoot, `.staging-${randomUUID()}`);
  const history = path.join(handoffRoot, 'history');
  const currentMeta = path.join(current, 'concat-timeline.json');
  let previous;
  if (opts.only) {
    if (!fs.existsSync(currentMeta)) throw new Error('Tidak ada paket current untuk --only. Jalankan export 3 bagian dahulu.');
    previous = JSON.parse(fs.readFileSync(currentMeta,'utf8'));
    if (previous.sourceProject !== project.slug || previous.compositionId !== project.id ||
      previous.fps !== project.fps || previous.width !== project.width || previous.height !== project.height ||
      previous.includesSourceRemotionAudio !== !opts.mute ||
      previous.pieces?.length !== 3 ||
      plan.pieces.some((p,i) => previous.pieces[i]?.startFrame !== p.startFrame || previous.pieces[i]?.endFrame !== p.endFrame ||
        !fs.existsSync(path.join(current,p.name)))) {
      throw new Error('Paket current memiliki timing, audio, atau spesifikasi berbeda. Render ketiga bagian tanpa --only untuk menjaga sinkronisasi.');
    }
  }
  fs.mkdirSync(stage, {recursive:true});
  try {
    if (opts.only) {
      for (const piece of plan.pieces) if (piece.key !== opts.only) fs.copyFileSync(path.join(current,piece.name),path.join(stage,piece.name));
    }

  const selectedPieces = plan.pieces.filter(p => !opts.only || p.key === opts.only);
  for (const p of selectedPieces) {
    const finalPath = path.join(stage, p.name);
    const temporaryPath = path.join(stage, `${p.name}.partial.mp4`);
    const args = [CLI, 'render', 'src/index.ts', project.id, temporaryPath, `--frames=${p.startFrame}-${p.endFrame}`, '--codec=h264', '--crf=18', '--log=info', '--concurrency=2'];
    if (opts.mute) args.push('--muted');
    await run(`RENDER ${p.key} (${p.startFrame}-${p.endFrame})`, args);
    if (!looksLikeMp4(temporaryPath)) throw new Error(`Render ${p.key} tidak menghasilkan MP4 yang terbaca header-nya.`);
    fs.renameSync(temporaryPath, finalPath);
    p.output = p.name;
    p.durationSeconds = (p.endFrame-p.startFrame+1)/project.fps;
  }
  // The metadata always describes the WHOLE stable set, even on --only.
  for (const p of plan.pieces) {
    const at = path.join(stage,p.name);
    if (!looksLikeMp4(at)) throw new Error('MP4 paket belum lengkap / rusak: ' + p.name);
    p.output = p.name;
    p.durationSeconds = (p.endFrame-p.startFrame+1)/project.fps;
    p.sha256 = hashFile(at);
  }
  const packageInfo = {
    tool: 'MotionGraphic -> Concat segmented export',
    createdAt: new Date().toISOString(),
    sourceProject: project.slug, compositionId: project.id,
    fps: project.fps, width: project.width, height: project.height,
    includesSourceRemotionAudio: !opts.mute,
    outputMode: 'stable-current-with-history',
    importedConcatProject: 'RELINK_OR_REOPEN_REQUIRED_AFTER_UPDATE',
    copyrightClearance: 'NOT_VERIFIED_CHECK_ASSET_LICENSES',
    pieces: plan.pieces,
    instructions: 'Impor MP4 dari current/ berurutan. Sesudah revisi, tutup-buka project Concat / refresh media; jangan berasumsi otomatis tersinkron. Rekam voice-over lalu generate captions dari GUI.',
  };
  fs.writeFileSync(path.join(stage,'concat-timeline.json'), JSON.stringify(packageInfo,null,2) + '\n');
  const assets = auditMediaPaths(project);
  const assetAudit = [
    '# Audit Aset Media (Belum Bersertifikat)',
    '',
    'Daftar ini otomatis dihimpun dari public/ project. Status tiap aset adalah BELUM DIVERIFIKASI, bukan klaim bahwa aset tersebut melanggar hak cipta.',
    'File UI/SVG/HTML di src/ serta aset yang hanya dirujuk dari luar project tidak dapat diputuskan status lisensinya oleh scanner ini.',
    '',
    ...assets.map((asset) => `- [ ] ${asset} — asal/lisensi: BELUM DIVERIFIKASI`),
    '',
    `Total aset media ditemukan: ${assets.length}.`,
    'Tinjau musik, SFX, gambar, video, font, logo, rekaman, dan izin penggunaan lintas platform sebelum upload.',
  ];
  fs.writeFileSync(path.join(stage, 'AUDIT-ASET-MEDIA.md'), assetAudit.join('\n') + '\n');
  fs.writeFileSync(path.join(stage,'BACA-SEBELUM-UPLOAD.txt'), 'Video MP4 hasil render sendiri belum berarti semua aset bebas hak cipta. Periksa AUDIT-ASET-MEDIA.md, lalu catat izin musik, SFX, font, foto, klip, logo, dan suara. Lihat tools/concat-bridge/CHECKLIST-HAK-CIPTA.md.\n');
  // Preserve the human-edited license evidence across repeated exports.
  const evidenceFile = 'BUKTI-LISENSI-PENGGUNA.csv';
  if (fs.existsSync(path.join(current,evidenceFile))) {
    fs.copyFileSync(path.join(current,evidenceFile),path.join(stage,evidenceFile));
  } else {
    fs.writeFileSync(path.join(stage,evidenceFile),'file,asal_pencipta,lisensi_atau_izin,komersial,lintas_platform,bukti,atribusi\n');
  }
  let backup = null;
  try {
    if (fs.existsSync(current)) {
      fs.mkdirSync(history,{recursive:true});
      backup = path.join(history, `${timestamp()}-${randomUUID().slice(0,8)}`);
      fs.renameSync(current,backup);
    }
    fs.renameSync(stage,current);
  } catch (error) {
    // Files may be locked by Concat on Windows: never delete the previous set.
    if (backup && !fs.existsSync(current) && fs.existsSync(backup)) {
      try {fs.renameSync(backup,current)} catch (rollbackError) {
        throw new Error(`Tidak bisa memperbarui handoff: ${error.message}. Backup masih ada di ${backup}. Gagal rollback: ${rollbackError.message}`);
      }
    }
    throw new Error(`Paket tidak diganti: ${error.message}. Tutup project Concat dahulu dan coba ulang; export sebelumnya tetap aman.`);
  }
  console.log(`\n[SELESAI] ${selectedPieces.length} render baru, paket lengkap untuk Concat:\n${current}\n${plan.pieces.map(p=>p.name).join(' | ')}\n${backup ? 'Versi sebelumnya: '+backup+'\n' : ''}Lisensi media belum diverifikasi. Reopen/relink media pada project Concat setelah revisi.`);
  } finally {
    // A failed render never alters current/. Do not leave a partial package.
    if (fs.existsSync(stage)) fs.rmSync(stage,{recursive:true,force:true});
  }
}

function hashFile(file) {
  const hash=createHash('sha256'), fd=fs.openSync(file,'r');
  try {
    const buffer=Buffer.allocUnsafe(1024*1024);
    let n=0;
    while ((n=fs.readSync(fd,buffer,0,buffer.length,null))>0) hash.update(buffer.subarray(0,n));
  } finally {fs.closeSync(fd);}
  return hash.digest('hex');
}

function looksLikeMp4(file) {
  if (!fs.existsSync(file) || fs.statSync(file).size < 24) return false;
  const fd=fs.openSync(file,'r');
  try {const b=Buffer.alloc(12);fs.readSync(fd,b,0,12,0);return b.toString('ascii',4,8)==='ftyp';}
  finally {fs.closeSync(fd);}
}

main().catch((err) => {console.error(`\n[GAGAL] ${err.message}`); process.exitCode = 1;});
