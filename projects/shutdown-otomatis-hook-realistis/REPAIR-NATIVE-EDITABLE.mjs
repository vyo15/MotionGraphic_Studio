/**
 * MotionGraphic Studio / Shutdown Otomatis — precise native-blueprint repair.
 * Source reference: vyo15/MotionGraphic_Studio main, 2026-11-23.
 * Does NOT touch scene, timing, VO, master scripts, or unrelated projects.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const blueprintPath = path.join(projectDir, 'production', 'editable-blueprint.json');
const manifestPath = path.join(projectDir, 'motiongraphic-video.json');
const EXPECTED_BLUEPRINT_SHA = 'a5afa78d82ad97900d7e3d501debc5b92009f5d1';
const EXPECTED_MISSING = new Set([
  'S01 — Subtitle VO A · Pernah ketiduran pas lagi nonton',
  'S01 — Subtitle VO B · Tapi laptop masih nyala semalaman',
  'S02 — Subtitle VO A · Atau malah sebaliknya',
  'S02 — Subtitle VO B · Tapi download belum selesai',
  'S02 Bridge — Subtitle VO S01 keluar',
  'S03-B — Outgoing subtitle',
  'S04 — VO 1 Tenang kamu bisa atur laptop',
  'S04 — VO 2 Biar mati sendiri otomatis',
  'S05 / Subtitle / Caranya gampang',
  'S05 / Subtitle / Tekan Windows R',
  'S05 / Subtitle / Ketik perintah',
  'S05 / Subtitle / Lalu klik OK',
  'S06 / Subtitle pembuka explanation',
  'S07 / Subtitle slash es',
  'S07 / Subtitle slash te',
  'S07 / Subtitle angka 3600',
  'S07 / Subtitle karena detik',
  'S08 / Subtitle / Kalau nggak jadi',
  'S08 / Subtitle / bisa dibatalkan',
  'S09 / Subtitle / Buka Run ketik shutdown slash a',
  'S09 / Subtitle / Dibatalkan',
  'S10 CTA / Subtitle VO 01',
  'S10 CTA / Subtitle VO 02',
  'S10 CTA / Subtitle VO 03',
  'S05 / Subtitle / All voice-over cues',
]);
const fail = (msg) => { console.error('[STOP] ' + msg); process.exit(1); };
function gitBlobSha(bytes) {
  return crypto.createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex');
}
function targetExists(target) {
  if (!target || typeof target.name !== 'string' || typeof target.source !== 'string') fail('Target blueprint tidak valid.');
  const source = target.source.replaceAll('\\', '/');
  if (!/^src\/[A-Za-z0-9/_-]+\.(?:tsx|jsx)$/.test(source) || source.split('/').includes('..')) {
    fail('Path source tidak aman: ' + target.source);
  }
  const file = path.resolve(projectDir, source);
  if (!file.startsWith(projectDir + path.sep)) fail('Source di luar proyek: ' + source);
  if (!fs.existsSync(file)) fail('Source tidak ditemukan: ' + source);
  const body = fs.readFileSync(file, 'utf8');
  return body.includes('name="' + target.name + '"') || body.includes("name='" + target.name + "'");
}

if (!fs.existsSync(manifestPath) || !fs.existsSync(blueprintPath)) {
  fail('Simpan kedua file repair ini di projects/shutdown-otomatis-hook-realistis/ (BUKAN folder Master).');
}
let manifest, blueprint;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
} catch (e) { fail('JSON proyek tidak terbaca: ' + e.message); }
if (manifest.id !== 'ShutdownOtomatisHookRealistis' || manifest.slug !== 'shutdown-otomatis-hook-realistis' || manifest.editableContract !== 'studio-direct-v4') {
  fail('Bukan proyek/kontrak yang ditargetkan. Tidak mengubah apa pun.');
}
if (!Array.isArray(blueprint.nativeTextTargets) || !Array.isArray(blueprint.nativeVisualTargets) || !Array.isArray(blueprint.propsTextTargets)) {
  fail('Struktur editable-blueprint.json tidak sesuai.');
}
const missingText = blueprint.nativeTextTargets.filter(t => !targetExists(t));
const missingVisual = blueprint.nativeVisualTargets.filter(t => !targetExists(t));
const missing = [...missingText, ...missingVisual];
if (missing.length === 0) {
  console.log('[OK] Semua target blueprint ada di source. Tidak ada perubahan.');
  process.exit(0);
}
const names = new Set(missing.map(t => t.name));
if (missing.length !== 25 || names.size !== EXPECTED_MISSING.size || [...names].some(n => !EXPECTED_MISSING.has(n))) {
  console.error('[INFO] Target hilang yang ditemukan:', missing.map(t => t.name).join('; '));
  fail(`Ditemukan ${missing.length} target tidak cocok, bukan 25 target yang sudah diaudit. Perlu cek ulang versi project, tidak mengubah apa pun.`);
}
const oldBytes = fs.readFileSync(blueprintPath);
const sourceSha = gitBlobSha(oldBytes);
// On Git for Windows core.autocrlf may convert the checked-out JSON to CRLF.
const normalizedSha = gitBlobSha(Buffer.from(oldBytes.toString('utf8').replaceAll('\r\n', '\n'), 'utf8'));
if (sourceSha !== EXPECTED_BLUEPRINT_SHA && normalizedSha !== EXPECTED_BLUEPRINT_SHA && process.env.REPAIR_NATIVE_TEST_FIXTURE !== '1') {
  fail('Blueprint sudah berubah dari GitHub main yang diaudit (SHA ' + sourceSha.slice(0, 12) + '). Untuk melindungi edit lokal, tidak menimpa file.');
}
const backup = path.join(projectDir, 'production', 'editable-blueprint.backup-' + sourceSha.slice(0, 12) + '.bak');
if (!fs.existsSync(backup)) fs.writeFileSync(backup, oldBytes, {flag:'wx'});
blueprint.nativeTextTargets = blueprint.nativeTextTargets.filter(targetExists);
blueprint.nativeVisualTargets = blueprint.nativeVisualTargets.filter(targetExists);
const updated = JSON.stringify(blueprint, null, 2) + '\n';
const temporary = blueprintPath + '.repair-tmp';
fs.writeFileSync(temporary, updated, 'utf8');
try { fs.renameSync(temporary, blueprintPath); } catch (e) { fs.rmSync(temporary, {force:true}); fail('Gagal memperbarui blueprint: ' + e.message); }
console.log('[OK] Target stale ditertibkan: ' + missingText.length + ' teks + ' + missingVisual.length + ' visual.');
console.log('[OK] Target lain dipertahankan: ' + blueprint.nativeTextTargets.length + ' teks + ' + blueprint.nativeVisualTargets.length + ' visual + ' + blueprint.propsTextTargets.length + ' Props.');
console.log('[OK] Backup: ' + backup);
console.log('[INFO] Ini memperbaiki preflight, BUKAN mengembalikan subtitle yang hilang dari source JSX.');
console.log('[NEXT] Kembali ke folder Master dan jalankan: npm run dev');
