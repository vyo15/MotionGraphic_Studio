# CHATGPT — READ FIRST SAAT MASTER ZIP DIUNGGAH

**Versi aturan:** 2026-11-22 · **Lingkup:** MotionGraphic Studio v1.8.1, Remotion, project baru dan revisi.

> File ini adalah **pintu masuk dokumentasi** agar ChatGPT mudah menemukan aturan ketika ZIP Master diunggah. File ini bukan skrip yang berjalan dan tidak otomatis menjadi Project Instructions atau Memory akun. ChatGPT perlu benar-benar membuka/membaca ZIP. Instruksi keselamatan/platform tetap berlaku.

## A. Urutan baca wajib setelah menerima Master ZIP
1. Identifikasi bahwa ZIP berisi folder `MotionGraphic-Studio/` dan baca `CHATGPT-READ-FIRST.md` ini.
2. Baca `AGENTS.md`, `PRODUCTION-RULES.md`, `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md`, **`docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`**, **`docs/MOTION-DIRECTION-RULES.md`**, **`docs/QA-VISUAL-MOTION-CHECKLIST.md`**, **`docs/SOUND-DIRECTION-RULES.md`**, `PROMPT-PROYEK-CHATGPT.md`, `docs/CHATGPT-PROJECT-REFERENCE.md`.
3. Verifikasi `contracts/studio-capabilities.json`, `contracts/addon.schema.json`, `package.json` dan struktur `projects/` pada ZIP yang **baru diunggah**, bukan dari memori/snapshot lama.
4. Jika pekerjaan menyangkut project existing, baca `projects/<slug>/AGENTS.md`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`, manifest `motiongraphic-video.json`, source/scene terkait dan lock/ACC. Untuk Easy2Boot gunakan source ACC hanya sebagai referensi kualitas, **jangan ubah video yang sudah ACC**.
5. Ringkas **temuan aktual**, status ACC, ruang lingkup, tindakan yang diminta, dan batas QA. Jika file gagal dibuka, katakan yang belum berhasil dibaca. Jangan membuat klaim sudah audit tanpa bukti.

## A2. Scene VO & ACC wajib diperlihatkan pada setiap diskusi video

Sebelum storyboard/revisi/preview video aktif, **baca `projects/<slug>/production/SCENE-VO-ACC-BOARD.md`**, `PRODUCTION-STATE.json` dan `src/config/narration.json`, lalu **tampilkan semua scene berikut VO aslinya lengkap** (termasuk bridge & cover silent) dan status terpisah: **VO teks, VISUAL ACC/LOCKED, rekaman/sync, FINAL**. Lanjutkan ke detail scene yang diminta; jangan memparafrase VO atau menebak ACC. Dashboard dihasilkan ulang oleh `npm run sync`. Aturan dan contoh lengkap: `docs/SCENE-VO-ACC-WORKFLOW.md`. File dashboard adalah view, bukan sumber keputusan. Bila sync menolak karena state metadata lama, baca `docs/ARTIFACT-HYGIENE.md` dan gunakan `tools/reconcile-generated-state.mjs` yang memakai canonical byte-for-byte proof; jangan paksa menimpa Root.

Baca `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md` jika pengguna meminta preview animasi: MP4/GIF bergerak, bukan gambar yang dinamai preview. Baca `docs/ARTIFACT-HYGIENE.md` sebelum menghapus/merapikan file; `npm run clean` default adalah audit aman. Jika source/video/ACC bertentangan, tandai konflik dan pertahankan keputusan ACC yang terbukti.

## B. Klasifikasikan perintah user, jangan ulangi workflow tanpa alasan
| Permintaan | Respons yang benar | Perubahan source |
|---|---|---|
| Judul/ide/diskusi storyboard | Diskusikan konsep/naskah/storyboard dan revisi per-scene | **Tidak** |
| Audit/bedah/review tanpa instruksi implementasi | Audit rinci source, timing, visual dan rekomendasi | **Tidak** |
| Preview/build satu scene saja | Buat/revisi hanya scene yang diminta dan tunggu ACC pada alur bertahap | **Terbatas** |
| "Langsung buat/build video lengkap" | Kerjakan add-on lengkap termasuk storyboard dan scene; jangan menunggu approval tambahan | **Ya** |
| Revisi video existing atau perbaikan Master | Ubah hanya file yang relevan, jaga semua ACC | **FILE CHANGE ONLY** |

Gunakan default bila rincian tidak krusial. Jangan meminta pengguna mengulang judul, naskah, struktur, style, atau keputusan ACC yang sudah ada dalam file yang terbaca. Jangan mengubah keputusan ACC hanya karena template baru.

## C. DNA storyboard universal untuk SEMUA VIDEO BARU

**Delapan tahap cerita baku:**
1. **MASALAH** — tunjukkan situasi relatable, bukan slide teks.
2. **KONFLIK** — tunjukkan hambatan/ketidaksesuaian yang nyata.
3. **REAKSI** — objek/pengguna merespons konflik (sebab-akibat).
4. **SOLUSI** — perkenalkan jawaban dengan objek yang nyata.
5. **DEMONSTRASI** — peragakan langkah/mekanisme secara realistis.
6. **HASIL** — buktikan perubahan melalui kondisi akhir.
7. **INTERAKSI/CTA** — ajak penonton bereaksi secara relevan.
8. **COVER REELS** — scene penutup **setelah CTA**, bukan hanya kartu judul: lanjutkan objek bila logis → mini-demonstrasi inti konten 1–3 aksi → bentuk komposisi judul/objek yang bersih → **hold 1–2 detik** untuk frame thumbnail.

**Delapan tahap ≠ delapan scene.** Gabungkan 1–3 tahap per scene bila tepat agar tidak lambat dan repetitif. Pada video baru, COVER menjadi scene terakhir mandiri dengan durasi adaptif ±4–6 detik (kecuali user memberi arahan lain). Scene/hook/cover Easy2Boot yang ACC tidak dipaksa diubah.

**Rumus tiap beat:** PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI. Storyboard menguraikan beat per detik, VO, teks layar, objek/lokasi, continuity, layer editable, status `DRAFT/REVISI/ACC/LOCKED`. Teknik dari Easy2Boot (Impact Stamp, Card Break, Fold & Unfold, Match Move) adalah **opsi bermakna**, bukan efek wajib di semua video.

**SOUND LOCK v2.1:** untuk video baru, baca `docs/SOUND-DIRECTION-RULES.md` dan `skills/sound-design-director/SKILL.md`. Storyboard harus mencatat cue/`omit` per aksi dan per transisi, termasuk CTA→Cover; sound tidak otomatis diwajibkan pada setiap perpindahan. Motion ACC → cue frame & aset sah → VO Guide → rekam VO → mix/duck → preview/listening QA. Jangan klaim metadata JSON berarti SFX terdengar.

**STYLE LOCK v2.0:** baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` sebelum menentukan warna/font/layout/typography/subtitle, dan `docs/MOTION-DIRECTION-RULES.md` untuk timing/easing/transisi; QA mengikuti `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Minimal Editorial `#F7F7F5`/`#202020`/`#DF805F`, teks sekunder terbaca `#646464`, safe zone 250/350/50. **Font Inter tidak otomatis tersedia**; gunakan Arial baseline atau Inter yang benar-benar di-load/diuji. Tidak mengubah style proyek ACC. Gaya yang disetujui pengguna atau UI asli mengalahkan default.

## D. Aturan produksi dan delivery yang tidak boleh terlewat

- **SATU MASTER**, add-on video baru `projects/<slug>/` lengkap dan mandiri; jangan bikin Remotion app baru. Jangan sentuh manual `src/Root.tsx`, `src/index.ts`, `package.json`, `library/catalog.json`, atau mirror `public/videos/` untuk registrasi video.
- **VIDEO BARU:** ZIP add-on lengkap `<slug>/` untuk diletakkan di `MotionGraphic-Studio/projects/`.
- **REVISI atau MASTER FIX:** satu ZIP **FILE CHANGE ONLY** berisi **hanya file baru dan file yang kontennya berubah**, masing-masing isi lengkap, dengan path relatif terhadap root `MotionGraphic-Studio/`, misalnya `projects/<slug>/src/scenes/Scene02.tsx`. Pengguna ekstrak lalu salin file tersebut ke root Master dan pilih **Merge/Replace**. Tidak boleh kirim Master baru, seluruh project, file tak berubah, installer/BAT/patcher. Cek risiko konflik edit lokal dan jelaskan backup/diff jika perlu.
- Hormati `ACC/LOCKED` secara menyeluruh; source dan target storyboard yang berbeda harus dilaporkan, bukan dibetulkan diam-diam.
- Motion storyboard → build/preview → ACC visual → VO Guide → rekam VO pengguna → sync subtitle/SFX → QA → render final. **Jangan minta VO dulu**.
- Layer teks, ikon, kursor, UI, background, efek dan audio tetap dipisah; jangan mengklaim 100% drag/drop, save/reload atau MP4 selesai tanpa uji yang benar-benar dilakukan.
- Laporkan daftar file yang berubah, hasil validasi source, hasil render/GUI jika telah diuji dan yang belum bisa diuji.

## E. Agar berlaku di CHAT BARU sebelum ZIP dibuka

Salin isi [`docs/CHATGPT-PROJECT-INSTRUCTIONS.md`](docs/CHATGPT-PROJECT-INSTRUCTIONS.md) ke **Project Instructions** ChatGPT Motion-Graphic; unggah `CHATGPT-READ-FIRST.md`, `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md`, **`docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`**, **`docs/SOUND-DIRECTION-RULES.md`** sebagai **Project Sources** jika tersedia. Setelah itu, saat pengguna mengunggah ZIP terbaru, ChatGPT tetap harus **memeriksa source aktual** di ZIP tersebut. Tidak ada jaminan otomatis membaca seluruh isi ZIP hanya karena nama file atau file ada di PC; gunakan instruksi "Audit ZIP Master ini sesuai CHATGPT-READ-FIRST.md" bila perlu.

## Kualitas render untuk CapCut (aturan Master saat ZIP dibuka)

Gunakan render yang telah tersedia dalam `npm run menu` → Render MP4; jangan membangun renderer/launcher kedua. Profil `CapCut HQ` sudah memakai H.264 CRF16, PNG frames, BT.709, 48k AAC untuk bahan yang akan diimpor manual ke CapCut. VO dan subtitle final di CapCut, motion/transisi/SFX di Remotion, cover dari scene video terakhir tanpa PNG wajib. Baca [`docs/RENDER-HQ-CAPCUT.md`](docs/RENDER-HQ-CAPCUT.md) sebelum mengubah workflow atau render. Jangan menyatakan kualitas MP4 sudah lolos sebelum benar-benar dirender dan ditonton.
