# MotionGraphic Studio Master v2.0.0 — Remotion Only

> **Untuk ChatGPT saat menerima ZIP Master:** buka dan baca [`CHATGPT-READ-FIRST.md`](CHATGPT-READ-FIRST.md) terlebih dahulu, kemudian ikuti routing yang berlaku; jangan membaca semua panduan sekaligus. Agar aturan diikuti **sejak awal chat baru**, salin [`Project Instructions siap tempel`](docs/CHATGPT-PROJECT-INSTRUCTIONS.md) ke pengaturan Project ChatGPT. File ZIP tidak memasang instruksi akun otomatis. Semua pembuatan dan revisi = ZIP **FILE CHANGE ONLY** untuk ekstrak → copy–paste–Replace.

**Standar kreatif video baru:** [`Design System v2.0`](docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md) · [`Motion Direction`](docs/MOTION-DIRECTION-RULES.md) · [`QA Visual & Motion`](docs/QA-VISUAL-MOTION-CHECKLIST.md). Semua file termasuk saat `npm run zip -- --studio` atau `--studio --with-projects` karena berada di `docs/`. Project/scene ACC tidak dimodifikasi otomatis.

**Satu Master, satu Remotion Studio, ChatGPT prompt-first.** Tidak ada instalasi agent/skill pack lokal. Teknik kreatif dan kontrak dimiliki dokumen Master; ChatGPT membuat dan merevisi video melalui prompt. Riwayat singkat: [CHATGPT-HISTORY.md](CHATGPT-HISTORY.md).

### Scene VO & ACC Board (otomatis)

Setiap `npm run dev`/`npm run sync`, Master membangun ulang `projects/<slug>/production/SCENE-VO-ACC-BOARD.md` dari `src/config/narration.json`, `PRODUCTION-STATE.json`, dan manifest, tanpa mengubah video/ACC. Untuk menampilkan: `node tools/scene-approval-board.mjs --all`; untuk cek stale: `node tools/scene-approval-board.mjs --all --check`. Baca board penuh dan tampilkan sesuai scope review pada panduan workflow. Baca `docs/SCENE-VO-ACC-WORKFLOW.md`. Aturan preview video: `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md`. Cleanup konservatif: `docs/ARTIFACT-HYGIENE.md` dan `npm run clean` (default preview).

## Mulai di Windows

Backup Master sebelum memasang patch. Untuk pekerjaan harian cukup `npm run dev`. Untuk melihat project yang sudah disinkronkan, gunakan `npm run prod` (preview cepat, tanpa regression, backup, sync atau watcher Master). Setelah patch/Save/perubahan aset, gunakan dev kembali. Prod bukan mode read-only native Studio dan bukan final QA. Instalasi dependency yang belum tersedia, sync, static gate, snapshot dan regression test sebelum sesi berjalan otomatis. Ekstrak FILE CHANGE ONLY di luar Master, backup dan cek base, lalu salin ke root Master. Untuk perubahan multi-file, tutup Studio dahulu agar tidak membaca source setengah tersalin. Jalankan kembali dev; watcher menangani perubahan source normal, registrasi, VO Guide dan mirror aset. Inbox lama hanya kompatibilitas arsip, bukan flow harian. Edit layer TSX biasa tetap hot reload.

Setelah source stabil, `../MotionGraphic-Studio-Backups/Master/CHATGPT-LATEST.zip` diperbarui otomatis (Master + project, tanpa backup historis). Gunakan setelah pesan **ZIP terbaru siap**. File sebelumnya dipertahankan jika gate/ekspor gagal. Upload ke ChatGPT tetap manual. Lokasi export override mengikuti konfigurasi Master. Detail: [Panduan Operasional](docs/OPERASIONAL-STUDIO.md).

Render dari Studio atau menu. Untuk pekerjaan khusus (render CapCut HQ, arsip/pulihkan, ZIP historis, maintenance) gunakan `npm run menu`. CLI diagnostik tetap tersedia di package.json, bukan daftar perintah yang harus dihafal. Regression test dijalankan saat dev; render MP4, Save/reload dan listening QA tidak diklaim oleh startup.

## Struktur Master folder-first

```text
MotionGraphic-Studio/
├── projects/
│   └── <slug>/                          # setiap video dalam folder mandiri
├── src/                                 # komposisi, auto-generated saat sync
├── public/videos/                       # mirror aset dari project, jangan edit
├── library/catalog.json                # katalog auto-generated
├── library/.studio-generated-state.json # status internal sync
├── library/masuk/                       # kompatibilitas ZIP lama (bukan flow harian)
├── contracts/                           # manifest schema + capabilities untuk ChatGPT
├── templates/addon-starter/             # starter project baru (draft, contoh kerja)
├── docs/                                # SOP universal, VO & maintenance
├── tools/                               # alat Remotion, render, impor, audit, ZIP
├── tests/                               # tes regresi Remotion
└── package.json
```

**Render CapCut HQ:** dari `npm run menu` pilih Render MP4 → video → mode → `1. CapCut HQ` (Enter default). Bahan memakai H.264 CRF 16, PNG frames, BT.709, AAC 48 kHz; audio SFX dipertahankan, VO dan panduan subtitle diatur melalui Props sementara bila tersedia. Import MP4 ke CapCut tetap manual. [Panduan kualitas render dan finishing](docs/RENDER-HQ-CAPCUT.md).

## Audio, editability, dan batas yang benar

**Sound Direction v2.2:** semua video baru menggunakan [`docs/SOUND-DIRECTION-RULES.md`](docs/SOUND-DIRECTION-RULES.md) untuk sound planning, efek relevan per aksi/transisi, kontinuitas antar-scene, voice-first mixing, SFX berlisensi, dan QA mendengar. Template baru memuat `templates/addon-starter/production/SOUND-PLAN.md`; ini tidak mengganti sound pada video ACC.

Audio sumber dipertahankan di masing-masing `projects/<slug>/public/`. Untuk mengatur voice-over dan musik, lihat [Panduan Operasional](docs/OPERASIONAL-STUDIO.md). Aturan produksi ada di [PRODUCTION-RULES.md](PRODUCTION-RULES.md).

Remotion Studio **tidak otomatis membuat semua node React draggable**. Layer `Interactive`, Properties/Props dan struktur masing-masing video menentukan apa yang bisa diedit secara visual. Layer dengan animasi/posisi computed belum tentu bebas drag-and-drop. Tidak ada editor voice-over waveform multi-track bawaan tambahan dalam paket ini. Editabilitas penuh tidak boleh diklaim tanpa pengujian per layer.

Backup dan output render disimpan sesuai [Maintenance](docs/MAINTENANCE-AND-RECOVERY.md).

Catatan batas uji: UI Remotion di Windows, drag/edit manual, dan render MP4 aktual memerlukan uji langsung di PC pengguna.

## Produksi dan pemeliharaan

- Flow resmi dan QA produksi: [PRODUCTION-RULES.md](PRODUCTION-RULES.md). `npm run flow -- --steps` membaca flow yang sama; `npm run flow -- --new "Judul"` membuat brief, bukan upload otomatis.
- Operasional dan editing: [docs/OPERASIONAL-STUDIO.md](docs/OPERASIONAL-STUDIO.md), [docs/EDITABLE-CONTRACT.md](docs/EDITABLE-CONTRACT.md), [docs/WORKFLOW-VO-UNIVERSAL.md](docs/WORKFLOW-VO-UNIVERSAL.md).
- Semua paket ChatGPT: FILE CHANGE ONLY, copy–paste–Replace setelah cek base hash dan backup. Tool import/patch lama hanya recovery kompatibilitas, tidak digunakan untuk produksi harian.
- QA bundle/satu frame: `npm run qa:smoke -- --still <IDVideo>` membutuhkan dependency dan Chromium Remotion. Render dan listening tetap perlu uji aktual.
- Project ChatGPT: ganti seluruh instruksi dengan [docs/CHATGPT-PROJECT-INSTRUCTIONS.md](docs/CHATGPT-PROJECT-INSTRUCTIONS.md). Unggah `CHATGPT-LATEST.zip` untuk sumber aktual, terutama jika edit Studio belum di-push. GitHub menyimpan riwayat dan source yang sudah di-push, bukan mirror live PC. Jangan unggah prompt/snapshot lama bersamaan.

**Setup typography sekali untuk video baru:** `node tools/font-library.mjs --install` (internet diperlukan sekali), lalu `npm run dev`. Poppins utama, Inter VO Guide, Manrope alternatif. Font pack lokal dan OFL/hash diprovision hanya ke project compact-balanced-v1; project lama tidak berubah. Jika unduhan gagal, Studio lama tetap bisa dijalankan; project baru tanpa font valid hanya draft. Rujuk [Design System](docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md).

### QA otomatis
Workflow harian: `npm run dev` (sync, gate statis, backup, regression test, Studio dan event sampling otomatis untuk project terinstrumentasi). Untuk full preview / full final / declared spatial, tutup Studio lalu `npm run menu` → 17 → pilih video dan mode. Lihat `docs/PRODUCTION-TOOLKIT.md` untuk batas bukti, hasil dan diagnosis.
