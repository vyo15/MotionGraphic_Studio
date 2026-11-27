# Motion Plan Contract v1.0 — focus-driven-v1

Untuk add-on BARU setelah Motion Direction v3.0: tambahkan `"motionPlanContract": "focus-driven-v1"` pada manifest dan `production/motion-plan.json`. Starter scaffold sengaja masih placeholder, tidak mendeklarasikan kontrak sampai naskah lengkap. Project lama tidak wajib migrasi; jangan menambah kontrak pada scene ACC tanpa izin. Strict validator memeriksa plan bila kontrak dinyatakan; validator legacy/non-strict sync tidak memblokir project lama. Ini metadata rencana, bukan timeline renderer kedua atau bukti editing.

## Data
`narration.json` satu sumber teks, scene dan rentang `[startFrame,endFrame)`. Satu item per beat, termasuk silent/bridge/cover. `beatIndex` berbasis 0. Tidak menggandakan VO, start/end global, FPS/durasi di motion plan. `narrationHash` adalah SHA-256 JSON.stringify array beats (termasuk captionCuts bila ada); setelah perubahan narasi/retiming, review plan dan perbarui hash secara sadar. CLI hanya membaca file:

```sh
node tools/qa-motion-plan.mjs projects/<slug> --fingerprint
node tools/qa-motion-plan.mjs projects/<slug>
```

`schemaVersion: 1`, `status: "draft" | "aligned"` (aligned bukan ACC dan memerlukan rekaman aktual), `narrationHash`, `beats` berurutan. Setiap beat:
- `beatIndex`, `intent` dari Decision Matrix, `motion` dari Vocabulary, `focusTarget`, `reason`, `stateIn`, `stateOut` string nonkosong.
- `handoff`: `type` = `start` (pertama saja), `carry`, `match`, `cut`; `reason` wajib. Carry dengan kamera mewajibkan world, viewport dan pose akhir/awal sama (toleransi 0.001). Jika cut/match tidak identik, jelaskan hubungan perhatian.
- `phases`: `action` dan `reaction` keduanya null jika beat tidak mempunyai aksi baru, atau integer offset 0..durasi-1 dengan reaction >= action; `holdStart` integer 0..durasi (durasi artinya tidak ada hold, harus dijelaskan di reason), setelah reaction jika ada. Hold berakhir pada beat end eksklusif. Beat pendek boleh melanjutkan hold/aksi dari sebelumnya; stateIn/stateOut menjelaskan hubungan. Sound cue/omit dirujuk di storyboard dan sound plan, bukan sumber audio baru.
- `camera`: null (tidak memerlukan world camera), atau `{worldId, world:{w,h}, viewport:{x,y,w,h}, start:{cx,cy,zoom}, end:{cx,cy,zoom}}`. Pose mengacu batas beat (end = boundary eksklusif, bukan frame terakhir); interpolation diterapkan di source; perencanaan path/easing di storyboard. Viewport default portrait harus berada dalam zona aman dan tidak berebut ruang subtitle. `focusSamples` opsional: `[{offset, pose:{cx,cy,zoom}, target:{x,y,w,h}}]` dengan target bounds world px pada titik yang harus terbaca; validator memeriksa proyeksi rect ke viewport pada sample tersebut. Sample tidak membuktikan jalur antara sample, aktualisasi source, ataupun seluruh collision; wajib audit frame/MP4. Camera non-null memiliki minimal satu sample saat target penting perlu terbaca (gate kreatif manual).
- `collisionPolicy`: penjelasan elemen terlindung, planned reflow/overlap native yang disengaja, dan safe zone; `editableTargets`: daftar nama layer/Props/source yang harus bisa diedit; detail dan kategori pada blueprint/layer map.

Contoh satu item (ilustrasi beat 60 frame, bukan plan siap pakai):
```json
{"beatIndex":0,"intent":"introduce","motion":"establish","focusTarget":"Explorer","reason":"Kenalkan konteks sebelum detail.","stateIn":"Explorer siap","stateOut":"Daftar terlihat","handoff":{"type":"start","reason":"Awal world"},"phases":{"action":null,"reaction":null,"holdStart":18},"camera":null,"collisionPolicy":"Subtitle di bawah, UI tidak tertutup.","editableTargets":["Explorer UI"]}
```

## Gate
CLI memeriksa struktur, hash, coverage narration 0..durasi, intent/motion, phase order, carry pose, viewport dan declared focus sample bounds. Tidak memeriksa seluruh collision aktual, semantics VO, actual source keyframes, audio, GUI, atau render. PASS metadata bukan PASS visual. Setelah sync/VO edit, jalankan ulang secara eksplisit; strict add-on validation hanya gate add-on yang mendeklarasikan kontrak. Status QA dan keputusan ACC tetap di sistem lama, bukan di motion plan. Jangan memperbarui hash otomatis untuk menutupi mismatch.

## Gate release 2.0.0
Untuk video baru jalankan `npm run qa:motion -- <folder-addon>` dan `npm run qa:spatial -- <folder-addon>` lalu `npm run addon:validate -- <folder-addon> --production --syntax` (flag produksi eksplisit; scaffold/legacy tetap dapat memakai `--strict`). `npm run qa:motion -- --all` melewati legacy tanpa kontrak, bukan PASS visual. `npm run release:check` memeriksa konsistensi versi sebelum ekspor Master. Lihat `CHATGPT-HISTORY.md` untuk pelajaran historis, bukan aturan produksi.

## Production Toolkit v1.0 — Master 2.0.0
See `docs/PRODUCTION-TOOLKIT.md` for spatial-plan, camera helpers, VO alignment and approval QA; production flow and gate are owned by `PRODUCTION-RULES.md`.
