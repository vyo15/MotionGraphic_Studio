#!/usr/bin/env node
/**
 * qa-render.mjs — QA hasil RENDER (MP4) untuk MotionGraphic Studio Master.
 *
 * Melengkapi tools/studio-quality.mjs (audit geometri statis dari source).
 * Script ini memeriksa video yang SUDAH dirender: format, loudness, tempo gerak,
 * dead zone, dissolve yang berpotensi menumpuk teks, konten di zona tidak aman,
 * dan membuat contact sheet + frame bermasalah untuk di-review / dikirim ke ChatGPT.
 *
 * Tanpa dependensi npm. Butuh ffmpeg + ffprobe: dari PATH, atau otomatis lewat
 * `npx remotion ffmpeg` / `npx remotion ffprobe` (bawaan Remotion v4).
 *
 * Pakai (dari root Master):
 *   node tools/qa-render.mjs out/Easy2Boot.mp4
 *   node tools/qa-render.mjs out/Easy2Boot.mp4 --src projects/easy2boot-multiboot-reels
 *   node tools/qa-render.mjs out/x.mp4 --strict --safe-top 250 --safe-bottom 350
 *
 * Opsi:
 *   --out <dir>          folder hasil (default qa-out/<nama-video>)
 *   --src <projectDir>   juga pindai source project (font kecil + lint praktik Remotion)
 *   --expect-frames <n>  jumlah frame yang diharapkan (default: dibaca dari manifest bila --src)
 *   --safe-top/--safe-bottom/--safe-side <px>  zona aman dalam koordinat 1080x1920 (default 250/350/50)
 *   --tolerance <px>     toleransi batas zona aman (default 40) agar huruf yang menyentuh batas tidak dihitung
 *   --strict             WARN dianggap gagal (exit code 1)
 *
 * Batasan jujur: analisis dilakukan pada frame yang diperkecil (108x192) sehingga
 * hanya menangkap pola makro. Ini TIDAK membuktikan teks terpotong, kursor tepat
 * sasaran, atau lip-sync. Selalu lihat contact sheet dan frame yang ditandai.
 */
import {spawn, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isWin = process.platform === 'win32';

// ---------- Ambang batas (ubah di sini bila standar berubah) ----------
const T = {
  width: 1080, height: 1920, fps: 30,
  loudnessMin: -20, loudnessMax: -10, loudnessSilent: -30, truePeakMax: -1,
  staticDiff: 0.15,        // beda rata-rata antar frame (0-255) yang dianggap "diam"
  maxStaticSec: 1.0,       // diam lebih lama dari ini = dead zone
  maxStaticRatio: 0.5,     // lebih dari 50% frame diam = terlalu statis
  maxBeatGapSec: 3.0,      // rata-rata jeda antar peristiwa gerak
  onsetOn: 0.5, onsetOff: 0.2,
  dissolveWindowSec: 0.2, dissolveMinDelta: 8, dissolveAlpha: [0.15, 0.85], dissolveResidual: 0.35,
  zoneInk: 0.0015,         // >0,15% piksel "tinta" di zona aman = ada konten (teks kecil ikut terdeteksi)
  inkDelta: 40,
  zoneFlaggedRatio: 0.25,  // zona dianggap bermasalah bila terisi di >25% frame
  minFont: 36,             // px pada kanvas 1080 lebar
};

// ---------- Argumen ----------
const argv = process.argv.slice(2);
const opt = {safeTop: 250, safeBottom: 350, safeSide: 50, tolerance: 40};
const files = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => argv[++i];
  if (a === '--out') opt.out = next();
  else if (a === '--src') opt.src = next();
  else if (a === '--expect-frames') opt.expectFrames = Number(next());
  else if (a === '--safe-top') opt.safeTop = Number(next());
  else if (a === '--safe-bottom') opt.safeBottom = Number(next());
  else if (a === '--safe-side') opt.safeSide = Number(next());
  else if (a === '--tolerance') opt.tolerance = Number(next());
  else if (a === '--strict') opt.strict = true;
  else if (a === '-h' || a === '--help') opt.help = true;
  else files.push(a);
}
if (opt.help || files.length !== 1) {
  console.log('Pakai: node tools/qa-render.mjs <video.mp4> [--src projects/<slug>] [--out dir] [--strict]');
  process.exit(opt.help ? 0 : 2);
}
const video = path.resolve(files[0]);
// Match each video's actual manifest instead of assuming all projects are 30 FPS.
let manifestConfig=null;
if(opt.src){
 const mp=path.resolve(opt.src,'motiongraphic-video.json');
 if(!fs.existsSync(mp)){console.error('[QA ERROR] Manifest tidak ditemukan: '+mp);process.exit(2)}
 try{manifestConfig=JSON.parse(fs.readFileSync(mp,'utf8'))}
 catch(e){console.error('[QA ERROR] Manifest rusak: '+e.message);process.exit(2)}
 for(const prop of ['width','height','fps','durationInFrames']){
  if(!Number.isInteger(manifestConfig[prop])||manifestConfig[prop]<=0){console.error('[QA ERROR] Manifest '+prop+' tidak valid');process.exit(2)}
 }
 T.width=manifestConfig.width;T.height=manifestConfig.height;T.fps=manifestConfig.fps;
}
if (!fs.existsSync(video)) { console.error('File tidak ditemukan: ' + video); process.exit(2); }
const outDir = path.resolve(opt.out || path.join(ROOT, 'qa-out', path.basename(video).replace(/\.[^.]+$/, '')));
fs.mkdirSync(path.join(outDir, 'frames'), {recursive: true});

// ---------- ffmpeg / ffprobe ----------
const q = (s) => `"${String(s).replaceAll('"', '\\"')}"`;
function resolveTool(name) {
  const direct = spawnSync(name, ['-version'], {encoding: 'utf8'});
  if (direct.status === 0) return {name, via: 'PATH', pre: [], shell: false, cmd: name};
  const cmdline = `npx remotion ${name} -version`;
  const viaRemotion = spawnSync(cmdline, {encoding: 'utf8', shell: true, cwd: ROOT});
  if (viaRemotion.status === 0) return {name, via: `npx remotion ${name}`, pre: [], shell: true, cmd: `npx remotion ${name}`};
  return null;
}
const FFMPEG = resolveTool('ffmpeg');
const FFPROBE = resolveTool('ffprobe');
if (!FFMPEG || !FFPROBE) {
  console.error('ffmpeg/ffprobe tidak ditemukan di PATH maupun lewat "npx remotion ffmpeg". Jalankan "npm ci" dulu di root Master.');
  process.exit(2);
}
function spawnTool(tool, args, o = {}) {
  if (tool.shell) return spawn(`${tool.cmd} ${args.map(q).join(' ')}`, {shell: true, cwd: ROOT, ...o});
  return spawn(tool.cmd, args, o);
}
function runTool(tool, args) {
  return new Promise((resolve) => {
    const p = spawnTool(tool, args, {stdio: ['ignore', 'pipe', 'pipe']});
    let out = '', err = '';
    p.stdout.on('data', (d) => (out += d)); p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => resolve({code, out, err}));
    p.on('error', (e) => resolve({code: -1, out, err: String(e)}));
  });
}
function readFrames(W, H) {
  return new Promise((resolve, reject) => {
    const p = spawnTool(FFMPEG, ['-v', 'error', '-i', video, '-an', '-vf', `scale=${W}:${H}:flags=area,format=gray`, '-f', 'rawvideo', '-'],
      {stdio: ['ignore', 'pipe', 'pipe']});
    const size = W * H, frames = []; let carry = Buffer.alloc(0), err = '';
    p.stdout.on('data', (c) => {
      carry = carry.length ? Buffer.concat([carry, c]) : c;
      while (carry.length >= size) { frames.push(new Uint8Array(carry.subarray(0, size))); carry = carry.subarray(size); }
    });
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => (code === 0 || frames.length ? resolve(frames) : reject(new Error(err || 'ffmpeg gagal'))));
    p.on('error', reject);
  });
}

// ---------- Pencatat hasil ----------
let n = 0, fps = 0, duration = 0, spark = '', sheet = '', loud = null;
const saved = [], marks = [], lint = [];
const results = []; // {level, area, msg}
const add = (level, area, msg) => results.push({level, area, msg});
const fmt = (n, d = 1) => Number(n).toFixed(d);
const sec = (f, fps) => fmt(f / fps, 2) + 's';

// ---------- 1. Probe ----------
const probe = await runTool(FFPROBE, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', video]);
let info = {};
try { info = JSON.parse(probe.out); } catch { add('FAIL', 'probe', 'ffprobe tidak bisa membaca file: ' + probe.err.slice(0, 200)); }
const vs = (info.streams || []).find((s) => s.codec_type === 'video');
const as = (info.streams || []).find((s) => s.codec_type === 'audio');
if (!vs) { add('FAIL', 'probe', 'Tidak ada stream video.'); finish(); }
const [fn, fd] = String(vs.avg_frame_rate || vs.r_frame_rate || '30/1').split('/').map(Number);
fps = fd ? fn / fd : 30;
const W0 = vs.width, H0 = vs.height;
duration = Number(info.format?.duration || vs.duration || 0);

add(W0 === T.width && H0 === T.height ? 'OK' : (Math.abs(W0/H0-T.width/T.height)<0.005?'WARN':'FAIL'), 'format',
  `Resolusi ${W0}x${H0}` + (W0 === T.width && H0 === T.height ? '' : ` (target ${T.width}x${T.height}, rasio 9:16)`));
add(Math.abs(fps - T.fps) < 0.01 ? 'OK' : 'WARN', 'format', `Frame rate ${fmt(fps, 2)} fps (target ${T.fps})`);
add(vs.codec_name === 'h264' ? 'OK' : 'WARN', 'format', `Codec video ${vs.codec_name}`);
add(vs.pix_fmt === 'yuv420p' ? 'OK' : 'WARN', 'format', `Pixel format ${vs.pix_fmt} (yuv420p paling aman untuk Reels)`);
add(as ? 'OK' : 'WARN', 'audio', as ? `Audio ${as.codec_name} ${as.sample_rate} Hz` : 'Tidak ada track audio.');

// ---------- Manifest / ekspektasi frame ----------
let expect = opt.expectFrames;
if (!expect && opt.src) {
  try {
    expect = manifestConfig.durationInFrames;
  } catch { /* manifest tidak wajib */ }
}

// ---------- 2. Analisis frame ----------
const W = 108, H = 192, N_PIX = W * H;
const frames = await readFrames(W, H);
n = frames.length;
if (n < 2) { add('FAIL', 'frames', 'Frame tidak terbaca.'); finish(); }
if (expect) add(Math.abs(n - expect) <= 1 ? 'OK' : 'FAIL', 'format', `Jumlah frame ${n} (diharapkan ${expect})`);
else add('INFO', 'format', `Jumlah frame ${n}, durasi ${fmt(n / fps, 2)}s`);

const diff = new Float32Array(n);
for (let i = 1; i < n; i++) {
  let s = 0; const a = frames[i], b = frames[i - 1];
  for (let k = 0; k < N_PIX; k++) s += Math.abs(a[k] - b[k]);
  diff[i] = s / N_PIX;
}

// 2a. Dead zone / rasio diam
let staticCount = 0; const runs = []; let run = 0;
for (let i = 1; i < n; i++) {
  if (diff[i] < T.staticDiff) { staticCount++; run++; }
  else { if (run) runs.push({from: i - run, len: run}); run = 0; }
}
if (run) runs.push({from: n - run, len: run});
const staticRatio = staticCount / (n - 1);
const longRuns = runs.filter((r) => r.len / fps > T.maxStaticSec).sort((a, b) => b.len - a.len);
add(staticRatio <= T.maxStaticRatio ? 'OK' : 'WARN', 'gerak',
  `Frame hampir diam: ${fmt(staticRatio * 100, 0)}% (batas ${T.maxStaticRatio * 100}%)`);
if (longRuns.length) {
  add('WARN', 'gerak', `${longRuns.length} dead zone > ${T.maxStaticSec}s. Terlama: ${fmt(longRuns[0].len / fps, 2)}s mulai ${sec(longRuns[0].from, fps)}`);
} else add('OK', 'gerak', `Tidak ada diam > ${T.maxStaticSec}s`);

// 2b. Kerapatan peristiwa gerak (beat)
const sm = (i) => (diff[i] + (diff[i - 1] ?? diff[i]) + (diff[i + 1] ?? diff[i])) / 3;
const onsets = []; let armed = true, calm = 0;
for (let i = 1; i < n - 1; i++) {
  const v = sm(i);
  if (v < T.onsetOff) { calm++; if (calm >= 4) armed = true; } else calm = 0;
  if (armed && v > T.onsetOn) { onsets.push(i); armed = false; }
}
const gaps = onsets.slice(1).map((o, i) => (o - onsets[i]) / fps);
const avgGap = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : duration;
add(avgGap <= T.maxBeatGapSec ? 'OK' : 'WARN', 'gerak',
  `${onsets.length} peristiwa gerak, rata-rata jeda ${fmt(avgGap, 2)}s (batas ${T.maxBeatGapSec}s)`);

// 2c. Sparkline gerak per 0,5 detik (ASCII)
const bucket = Math.max(1, Math.round(fps / 2)); const chars = ' .:-=+*#%@'; // skala akar: gerak kecil tetap terlihat
spark = '';
for (let i = 1; i < n; i += bucket) {
  let s = 0, c = 0; for (let j = i; j < Math.min(n, i + bucket); j++) { s += diff[j]; c++; }
  spark += chars[Math.min(chars.length - 1, Math.floor(Math.sqrt(s / c) * 4))];
}

// 2d. Hard cut
const cuts = []; for (let i = 1; i < n; i++) if (diff[i] > 6) cuts.push(i);
add('INFO', 'gerak', `Cut keras (beda > 6): ${cuts.length ? cuts.slice(0, 12).map((c) => sec(c, fps)).join(', ') : 'tidak ada'}`);

// 2e. Dissolve (crossfade) -> risiko teks bertumpuk
const k = Math.max(2, Math.round(fps * T.dissolveWindowSec));
const flagged = new Uint8Array(n);
for (let i = k; i < n - k; i++) {
  const a = frames[i - k], b = frames[i + k], f = frames[i];
  let ab = 0, fb_ab = 0, aa = 0, D = 0;
  for (let p = 0; p < N_PIX; p++) {
    const dab = a[p] - b[p]; D += Math.abs(dab); aa += dab * dab; fb_ab += (f[p] - b[p]) * dab;
  }
  D /= N_PIX; if (D < T.dissolveMinDelta || aa === 0) continue;
  const alpha = fb_ab / aa; if (alpha < T.dissolveAlpha[0] || alpha > T.dissolveAlpha[1]) continue;
  let R = 0; for (let p = 0; p < N_PIX; p++) R += Math.abs(f[p] - (alpha * a[p] + (1 - alpha) * b[p]));
  R /= N_PIX; if (R < T.dissolveResidual * D) flagged[i] = 1;
}
const dissolves = []; for (let i = 0; i < n; i++) if (flagged[i]) { const last = dissolves[dissolves.length - 1]; if (last && i - (last.from + last.len) <= 2) last.len = i - last.from + 1; else dissolves.push({from: i, len: 1}); }
const realDissolves = dissolves.filter((d) => d.len >= 3);
if (realDissolves.length) add('WARN', 'transisi', `${realDissolves.length} dissolve/crossfade terdeteksi (cek teks bertumpuk): ${realDissolves.slice(0, 8).map((d) => `${sec(d.from, fps)} (${d.len}f)`).join(', ')}`);
else add('OK', 'transisi', 'Tidak ada dissolve yang mencurigakan');

// 2f. Zona aman + frame pembuka (histogram -> latar -> "tinta")
const scaleY = H / T.height, scaleX = W / T.width;
// Safe-area options are specified in reference 1080x1920 coordinates.
const safeTopPx=opt.safeTop*T.height/1920, safeBottomPx=opt.safeBottom*T.height/1920;
const sidePx=opt.safeSide*T.width/1080;
const tolerancePx=opt.tolerance*T.height/1920;
const rows = {top: Math.max(0, Math.round((safeTopPx - tolerancePx) * scaleY)), bottom: Math.max(0, Math.round((safeBottomPx - tolerancePx) * scaleY))};
const cols = Math.max(1, Math.round(sidePx * scaleX));
const extentTop = [], extentBottom = [];
const inkFrac = {top: new Float32Array(n), bottom: new Float32Array(n), left: new Float32Array(n), right: new Float32Array(n), all: new Float32Array(n)};
for (let i = 0; i < n; i++) {
  const f = frames[i], hist = new Uint32Array(32);
  for (let p = 0; p < N_PIX; p++) hist[f[p] >> 3]++;
  let bi = 0; for (let b = 1; b < 32; b++) if (hist[b] > hist[bi]) bi = b;
  const bg = bi * 8 + 4;
  const zone = (x0, x1, y0, y1) => {
    let c = 0, t = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { t++; if (Math.abs(f[y * W + x] - bg) > T.inkDelta) c++; }
    return t ? c / t : 0;
  };
  inkFrac.top[i] = zone(0, W, 0, rows.top);
  inkFrac.bottom[i] = zone(0, W, H - rows.bottom, H);
  inkFrac.left[i] = zone(0, cols, rows.top, H - rows.bottom);
  inkFrac.right[i] = zone(W - cols, W, rows.top, H - rows.bottom);
  inkFrac.all[i] = zone(0, W, 0, H);
  let r0 = -1, r1 = -1;
  for (let y = 0; y < H; y++) { let c = 0; for (let x = 0; x < W; x++) if (Math.abs(f[y * W + x] - bg) > T.inkDelta) c++; if (c >= 2) { if (r0 < 0) r0 = y; r1 = y; } }
  if (r0 >= 0) { extentTop.push(Math.round(r0 / scaleY)); extentBottom.push(Math.round(r1 / scaleY)); }
}
const pct = (arr, p) => { const a = [...arr].sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(p * a.length))] : 0; };
if (extentTop.length) add('INFO', 'zona-aman', `Rentang vertikal konten (px @1920): paling atas median ${pct(extentTop, 0.5)} (p5 ${pct(extentTop, 0.05)}), paling bawah median ${pct(extentBottom, 0.5)} (p95 ${pct(extentBottom, 0.95)})`);
const zoneReport = {};
for (const z of ['top', 'bottom', 'left', 'right']) {
  const idx = []; for (let i = 0; i < n; i++) if (inkFrac[z][i] > T.zoneInk) idx.push(i);
  const ratio = idx.length / n;
  const worst = [...idx].sort((a, b) => inkFrac[z][b] - inkFrac[z][a]);
  zoneReport[z] = {ratio, worst};
  const label = {top: `zona atas ${opt.safeTop}px`, bottom: `zona bawah ${opt.safeBottom}px`, left: `tepi kiri ${opt.safeSide}px`, right: `tepi kanan ${opt.safeSide}px`}[z];
  add(ratio > T.zoneFlaggedRatio ? 'WARN' : 'OK', 'zona-aman',
    `Konten di ${label}: ada pada ${fmt(ratio * 100, 0)}% frame` + (worst.length ? ` (terpadat ${sec(worst[0], fps)})` : ''));
}
const hookN = Math.min(n, Math.max(1, Math.round(fps * 0.5)));
let hookInk = 0; for (let i = 0; i < hookN; i++) hookInk = Math.max(hookInk, inkFrac.all[i]);
add(hookInk > 0.003 ? 'OK' : 'WARN', 'hook', `Konten pada 0,5 detik pertama: ${fmt(hookInk * 100, 1)}%` + (hookInk > 0.003 ? '' : ' (hampir kosong; hook 1-2 detik pertama lemah)'));
if (inkFrac.all[0] <= 0.003) add('INFO', 'hook', 'Frame ke-0 kosong (wajar bila ada fade-in, tetapi thumbnail otomatis Reels bisa kosong; pilih cover manual).');

// ---------- 3. Audio ----------
if (as) {
  const r = await runTool(FFMPEG, ['-hide_banner', '-nostats', '-i', video, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-']);
  const text = r.err + r.out;
  if (/Unknown filter|No such filter|Filter ebur128/i.test(text) && !/Summary/.test(text)) {
    add('INFO', 'audio', 'Filter ebur128 tidak tersedia di build ffmpeg ini; loudness dilewati (pakai ffmpeg lengkap dari PATH).');
  } else {
    const sum = text.slice(text.lastIndexOf('Summary:'));
    const I = Number((sum.match(/I:\s+(-?[\d.]+)\s+LUFS/) || [])[1]);
    const LRA = Number((sum.match(/LRA:\s+([\d.]+)\s+LU/) || [])[1]);
    const TP = Number((sum.match(/Peak:\s+(-?[\d.]+)\s+dBFS/) || [])[1]);
    if (Number.isFinite(I)) {
      loud = {I, LRA, TP};
      const lvl = I < T.loudnessSilent ? 'FAIL' : (I < T.loudnessMin || I > T.loudnessMax) ? 'WARN' : 'OK';
      add(lvl, 'audio', `Loudness ${fmt(I)} LUFS (target ${T.loudnessMin} s.d. ${T.loudnessMax}; ideal Reels sekitar -14)` + (I < T.loudnessSilent ? ' - praktis senyap, apakah VO/SFX belum terpasang?' : ''));
      if (Number.isFinite(TP)) add(TP > T.truePeakMax ? 'WARN' : 'OK', 'audio', `True peak ${fmt(TP)} dBFS (batas ${T.truePeakMax})`);
    }
  }
  const s = await runTool(FFMPEG, ['-hide_banner', '-nostats', '-i', video, '-vn', '-af', 'silencedetect=noise=-50dB:d=1', '-f', 'null', '-']);
  const starts = [...(s.err + s.out).matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
  const ends = [...(s.err + s.out).matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));
  let silent = 0; starts.forEach((st, i) => { silent += (ends[i] ?? duration) - st; });
  if (starts.length) add(silent / duration > 0.5 ? 'WARN' : 'INFO', 'audio', `Senyap (<-50 dB, >1s): ${starts.length} segmen, total ${fmt(silent, 1)}s (${fmt(silent / duration * 100, 0)}%)`);
}

// ---------- 4. Contact sheet + frame bermasalah ----------
const interval = Math.max(0.5, Math.ceil((duration / 42) * 2) / 2);
const count = Math.min(42, Math.ceil(duration / interval)); const tileCols = 7, tileRows = Math.ceil(count / tileCols);
sheet = path.join(outDir, 'contact-sheet.png');
const contact=await runTool(FFMPEG, ['-v', 'error', '-y', '-i', video, '-vf', `fps=1/${interval},scale=270:-1,tile=${tileCols}x${tileRows}`, '-frames:v', '1', '-update', '1', sheet]);
if(contact.code!==0||!fs.existsSync(sheet)){add('WARN','contact-sheet','Gagal membuat contact sheet: '+contact.err.slice(0,150));sheet='';}
const pushMark = (t, label) => { if (!marks.some((m) => Math.abs(m.t - t) < 0.8)) marks.push({t, label}); };
if (longRuns[0]) pushMark((longRuns[0].from + longRuns[0].len / 2) / fps, 'dead-zone');
realDissolves.slice(0, 3).forEach((d) => pushMark((d.from + d.len / 2) / fps, 'dissolve'));
if (zoneReport.bottom.worst[0] !== undefined) pushMark(zoneReport.bottom.worst[0] / fps, 'zona-bawah');
if (zoneReport.top.worst[0] !== undefined) pushMark(zoneReport.top.worst[0] / fps, 'zona-atas');
pushMark(0, 'frame-pertama');
for (const m of marks.slice(0, 8)) {
  const name = `${String(Math.round(m.t * 100)).padStart(5, '0')}_${m.label}.png`;
  await runTool(FFMPEG, ['-v', 'error', '-y', '-ss', String(m.t), '-i', video, '-frames:v', '1', '-vf', 'scale=540:-1', path.join(outDir, 'frames', name)]);
  saved.push(name);
}

// ---------- 5. (Opsional) pindai source ----------
if (opt.src) {
  const srcDir = path.resolve(opt.src, 'src');
  const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, {withFileTypes: true}).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : /\.(tsx?|css)$/.test(e.name) ? [path.join(d, e.name)] : [])) : []);
  const all = walk(srcDir); const rel = (f) => path.relative(path.resolve(opt.src), f).replaceAll('\\', '/');
  const small = [], big = []; let loadsFont = false, audioFromRemotion = 0, setAttr = 0, mapSeq = 0, nondeterm = 0, cssAnim = 0, hasFontFamily = 0, interp = 0, springs = 0;
  for (const f of all) {
    const st = fs.statSync(f); if (st.size > 500_000) big.push(`${rel(f)} (${fmt(st.size / 1e6, 1)} MB)`);
    if (st.size > 500_000) continue; // data baked: jangan dipindai baris per baris
    const txt = fs.readFileSync(f, 'utf8');
    if (/@remotion\/google-fonts|@remotion\/fonts|new FontFace\(|loadFont\(/.test(txt)) loadsFont = true;
    if (/import\s*\{[^}]*\bAudio\b[^}]*\}\s*from\s*['"]remotion['"]/.test(txt)) audioFromRemotion++;
    if (/fontFamily|font-family/.test(txt)) hasFontFamily++;
    if (/\/animations\//.test(f.replaceAll('\\', '/')) || /animate\w*\s*=/.test(txt)) setAttr += (txt.match(/\.setAttribute\(/g) || []).length;
    mapSeq += (txt.match(/\.map\([^)]*=>[\s\S]{0,300}?<Sequence\b/g) || []).length;
    nondeterm += (txt.match(/Math\.random\(|Date\.now\(|new Date\(/g) || []).length;
    cssAnim += (txt.match(/@keyframes|\btransition\s*:|\banimation\s*:/g) || []).length;
    interp += (txt.match(/\binterpolate\(/g) || []).length; springs += (txt.match(/\bspring\(/g) || []).length;
    txt.split('\n').forEach((line, i) => {
      for (const m of line.matchAll(/font-size[=:]\s*["']?(\d+(?:\.\d+)?)|fontSize\s*[:=]\s*\{?\s*(\d+(?:\.\d+)?)/g)) {
        const v = Number(m[1] ?? m[2]); if (v > 0 && v < T.minFont) small.push(`${rel(f)}:${i + 1} (${v}px)`);
      }
    });
  }
  if (small.length) lint.push({level: 'WARN', msg: `${small.length} deklarasi font < ${T.minFont}px (tidak terbaca di HP). Contoh: ${small.slice(0, 5).join(', ')}`});
  else lint.push({level: 'OK', msg: `Tidak ada font < ${T.minFont}px pada source yang dipindai`});
  if (hasFontFamily && !loadsFont) lint.push({level: 'WARN', msg: 'fontFamily dipakai tetapi tidak ada loadFont()/@remotion/google-fonts/FontFace: hasil render bergantung font terpasang di PC. Muat font lewat Remotion agar render konsisten.'});
  if (audioFromRemotion) lint.push({level: 'INFO', msg: `<Audio> diimpor dari 'remotion' di ${audioFromRemotion} file. Dokumentasi terbaru menamainya <Html5Audio>; untuk audio baru disarankan <Audio> dari @remotion/media.`});
  if (setAttr) lint.push({level: 'INFO', msg: `${setAttr} pemanggilan setAttribute() pada kode animasi: animasi imperatif lewat DOM tidak terlihat oleh Studio (tidak bisa di-keyframe). Pola yang direkomendasikan: interpolate() inline di style.`});
  if (!springs && interp < 5) lint.push({level: 'INFO', msg: `Hanya ${interp} interpolate() dan ${springs} spring() di source: animasi ditulis dengan easing manual.`});
  if (mapSeq) lint.push({level: 'INFO', msg: `${mapSeq} <Sequence> dibuat lewat .map(): di Studio tampil sebagai satu item. Pertimbangkan <Series.Sequence> terpisah bila tiap scene perlu diedit sendiri.`});
  if (nondeterm) lint.push({level: 'WARN', msg: `${nondeterm} pemakaian Math.random()/Date.now()/new Date(): hasil render bisa berbeda antar frame/proses. Pakai random('seed') dari remotion.`});
  if (cssAnim) lint.push({level: 'WARN', msg: `${cssAnim} CSS transition/animation/@keyframes: tidak sinkron dengan frame Remotion. Pakai useCurrentFrame()+interpolate().`});
  if (big.length) lint.push({level: 'INFO', msg: `File data besar (>500 KB, tidak dipindai): ${big.join(', ')}. Animasi yang di-bake sebagai data sulit direvisi dan memperlambat bundling.`});
}

// ---------- Laporan ----------
function finish() {
  const order = {FAIL: 0, WARN: 1, INFO: 2, OK: 3};
  const all = [...results, ...lint.map((l) => ({level: l.level, area: 'source', msg: l.msg}))];
  const count = (l) => all.filter((r) => r.level === l).length;
  const lines = [];
  lines.push(`QA render: ${path.basename(video)}`);
  lines.push(`${n} frame @ ${fmt(fps, 2)} fps = ${fmt(duration, 1)}s | ffmpeg via ${FFMPEG.via}`);
  lines.push('');
  for (const r of [...all].sort((a, b) => order[a.level] - order[b.level])) lines.push(`[${r.level}]`.padEnd(7) + `${r.area.padEnd(10)} ${r.msg}`);
  lines.push('');
  if (spark) lines.push(`Gerak per 0,5s (spasi=diam, @=ramai):\n|${spark}|`);
  lines.push('');
  lines.push(`Ringkasan: ${count('FAIL')} FAIL, ${count('WARN')} WARN, ${count('INFO')} INFO, ${count('OK')} OK`);
  if (sheet) lines.push(`Contact sheet : ${path.relative(process.cwd(), sheet)}`);
  if (saved.length) lines.push(`Frame ditandai: ${path.relative(process.cwd(), path.join(outDir, 'frames'))}${path.sep} (${saved.join(', ')})`);
  lines.push('Catatan: analisis memakai frame 108x192; ini bukan bukti teks terpotong, kursor tepat sasaran, atau lip-sync.');
  const text = lines.join('\n');
  console.log(text);
  fs.writeFileSync(path.join(outDir, 'report.md'), '```\n' + text + '\n```\n');
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify({video: path.basename(video), frames: n, fps, duration, loudness: loud, results: all, marks}, null, 2));
  const bad = count('FAIL') || (opt.strict && count('WARN'));
  process.exit(bad ? 1 : 0);
}
finish();
