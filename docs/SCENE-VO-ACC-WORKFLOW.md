# SCENE VO & APPROVAL BOARD — ATURAN OTORITATIF v1.0

**Berlaku untuk:** semua diskusi, revisi, preview dan build video pada MotionGraphic Studio. **Tujuan:** ChatGPT selalu membaca narasi lengkap per scene dan status keputusan, menampilkan sesuai scope, tanpa menebak apa yang sudah ACC.

## 1. Satu sumber untuk setiap fakta

| Fakta | Source of truth | Dilarang |
|---|---|---|
| Nama, jumlah, urutan, durasi scene | `motiongraphic-video.json` (segments, FPS, duration) dan scene source bila registrasi berbedanya perlu diverifikasi | Mengubah manifest hanya demi menyesuaikan dashboard |
| Kata-kata VO & beat frame | `src/config/narration.json` | Mengambil paraphrase AI sebagai VO resmi |
| ACC visual, teks, keputusan dan lock | `PRODUCTION-STATE.json` plus catatan ACC yang spesifik (bila ada) | Menandai ACC otomatis hanya karena preview dibuat |
| Riwayat keputusan | `PRODUCTION-STATE.json` → `decisionLog` (catatan spesifik yang sudah ada juga dibaca) | Menimpa keputusan lama tanpa persetujuan |
| Foto/MP4/SFX dan pengujian nyata | File hasil dan laporan QA yang benar-benar tersedia | Menganggap cue JSON membuktikan suara atau klaim render selesai |

`production/SCENE-VO-ACC-BOARD.md` adalah **view turunan yang digenerate**, BUKAN sumber keputusan keempat. Jangan edit langsung isi generated view untuk merevisi keputusan.

## 2. Baca penuh, tampilkan sesuai scope (Unified Production 1.0)
Selalu baca board, manifest, narration, state, lock/source terkait sebelum membahas video aktif. Tampilkan VO asli lengkap seluruh scene (termasuk silent/bridge) beserta timing dan empat status pada awal pembahasan project/berpindah chat, review keseluruhan, ACC milestone, VO Guide atau jika diminta. Pada revisi kecil/preview satu scene dalam chat yang sama, cukup target, VO asli target, timing, status dan dampak continuity tetangga; jangan mengulang seluruh board tanpa fungsi. Tidak mengurangi kewajiban membaca atau melindungi ACC. AGENTS project lama yang meminta tampilan penuh setiap giliran adalah format review legacy; aturan tampilan ini berlaku tanpa mengubah keputusan kreatif.

- `VO TEKS`: `DRAFT/REVIEW/ACC/LOCKED`, terpisah dari sudah/tidak direkam.
- `VISUAL`: `DRAFT/REVIEW/DIPILIH/ACC/LOCKED`. **DIPILIH belum otomatis LOCKED**.
- `REKAMAN/SYNC`: guide saja, sudah direkam, tersinkron, atau belum teruji. Jangan menyamakan VO Guide dengan rekaman.
- `FINAL`: hanya ACC jika final QA/render atau state memang menyatakannya; visual ACC saja bukan final.
- `PERUBAHAN TERBUKA`: tulis scope revisi, keputusan yang masih DRAFT, apa yang tetap LOCKED, dan konflik metadata bila ada.

Saat pengguna mengatakan `Scene N ACC`: **jangan mengubah isi naskah dan scene lain**. Perbarui status scene yang disetujui dan `decisionLog` di `PRODUCTION-STATE.json` melalui FILE CHANGE ONLY; jalankan generator ulang. Jangan mengubah VO text approval jika yang di-ACC hanya visual, dan sebaliknya.

**Jika status ACC hanya ada dalam percakapan namun tidak tersimpan dalam ZIP terbaru:** sebutkan bahwa metadata ZIP mungkin tertinggal; minta dasar/konfirmasi hanya jika tidak ada bukti lain. Jangan diam-diam menganggap DRAFT sebagai final.

## 3. Alur PC dan auto-sync

- `npm run sync` atau `npm run dev` membaca project dan membuat/memperbarui `projects/<slug>/production/SCENE-VO-ACC-BOARD.md` dari sumber data, tanpa mengubah scene, VO, status, atau file registrasi secara manual.
- `node tools/scene-approval-board.mjs --all` menampilkan semua board ke terminal **read-only**.
- `node tools/scene-approval-board.mjs <slug>` menampilkan satu board read-only.
- `node tools/scene-approval-board.mjs --all --check` memeriksa board sudah mutakhir tanpa menulis.
- `node tools/scene-approval-board.mjs --all --write` memperbarui board saja; berguna setelah mengedit `PRODUCTION-STATE.json` secara sah.
- `node tools/scene-approval-board.mjs --all --json` menghasilkan struktur machine-readable untuk integrasi di masa depan.

**Catatan:** `npm run sync` menghasilkan board di **komputer pengguna**. ChatGPT di chat baru **tidak mendapat file PC tersebut secara otomatis**. Pengguna mengunggah ZIP Master terbaru (dengan project), atau memakai connector yang benar-benar terhubung. ChatGPT wajib membacanya; aturan dalam ZIP saja tidak otomatis menjadi Project Instructions.

## 4. Perlindungan ACC dan konflik sumber

- Jika manifest menampung satu scene dengan beat Bridge, board boleh **memecah tampilan review** tanpa mengubah manifest atau timeline source. Contoh: Easy2Boot S02 memuat `BRIDGE02TO03`.
- Jika narration/status/scene source tidak sinkron, tandai `PERIKSA`, jangan melakukan koreksi kreatif otomatis.
- ACC visual yang tersimpan untuk keseluruhan scene tidak menyatakan VO per beat sudah ACC.
- Jika file `PRODUCTION-STATE.json` tidak ada, beri status `BELUM TERBUKTI`, jangan buat ACC fiktif.
- Hindari reset status saat `npm run sync`; `PRODUCTION-STATE.json` baru hanya dibuat jika project belum punya.

## 5. Empat gate QA

1. **Data:** semua scene dan VO terlihat; timing tidak tumpang tindih/hilang; cover silent benar.
2. **Editorial:** status tidak tertukar, keputusan ACC tidak berubah; catatan per-scene akurat.
3. **Teknis:** generator idempotent (run kedua tidak mengganti board bila tidak ada perubahan), `npm run sync` berhasil, ZIP include board.
4. **Visual/Audio:** preview MP4 dan listening adalah uji terpisah, **bukan** otomatis lulus karena metadata benar.

## 6. Delivery revisi

Revisi video/Master selalu ZIP **FILE CHANGE ONLY** berisi path relatif root Master, tidak perlu menyalin ulang project utuh. Jika ada file yang mesti dihapus, perintah Replace tidak bisa menghapusnya: buat **daftar hapus manual** terpisah dengan alasan dan pemeriksaan konflik. Jangan membuat BAT/installer untuk delete otomatis.
