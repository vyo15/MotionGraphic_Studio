# MotionGraphic Studio Master v2.0.0 — Remotion Only

> **Untuk ChatGPT saat menerima ZIP Master:** buka dan baca [`CHATGPT-READ-FIRST.md`](CHATGPT-READ-FIRST.md) terlebih dahulu, kemudian ikuti routing yang berlaku; jangan membaca semua panduan sekaligus. Agar aturan diikuti **sejak awal chat baru**, salin [`Project Instructions siap tempel`](docs/CHATGPT-PROJECT-INSTRUCTIONS.md) ke pengaturan Project ChatGPT. File ZIP tidak memasang instruksi akun otomatis. Semua revisi = ZIP **FILE CHANGE ONLY** untuk ekstrak → copy–paste–Replace.

**Standar kreatif video baru:** [`Design System v2.0`](docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md) · [`Motion Direction`](docs/MOTION-DIRECTION-RULES.md) · [`QA Visual & Motion`](docs/QA-VISUAL-MOTION-CHECKLIST.md). Semua file termasuk saat `npm run zip -- --studio` atau `--studio --with-projects` karena berada di `docs/`. Project/scene ACC tidak dimodifikasi otomatis.

**Satu Master, satu Remotion Studio.** Riwayat singkat: [CHATGPT-HISTORY.md](CHATGPT-HISTORY.md).

### Scene VO & ACC Board (otomatis)

Setiap `npm run dev`/`npm run sync`, Master membangun ulang `projects/<slug>/production/SCENE-VO-ACC-BOARD.md` dari `src/config/narration.json`, `PRODUCTION-STATE.json`, dan manifest, tanpa mengubah video/ACC. Untuk menampilkan: `node tools/scene-approval-board.mjs --all`; untuk cek stale: `node tools/scene-approval-board.mjs --all --check`. Gunakan board dalam setiap chat diskusi video. Baca `docs/SCENE-VO-ACC-WORKFLOW.md`. Aturan preview video: `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md`. Cleanup konservatif: `docs/ARTIFACT-HYGIENE.md` dan `npm run clean` (default preview).

## Mulai di Windows

Backup Master sebelum memasang patch. Untuk pekerjaan harian cukup `npm run dev`. Instalasi dependency yang belum tersedia, import inbox, sync, static gate, dan snapshot sebelum sesi berjalan otomatis. Saat Studio terbuka, drop ZIP add-on ke `library/masuk/` atau folder ke `projects/`; watcher menangani registrasi, VO Guide dan mirror aset. Edit layer TSX biasa tetap hot reload.

Setelah source stabil, `../MotionGraphic-Studio-Backups/Master/CHATGPT-LATEST.zip` diperbarui otomatis (Master + project, tanpa backup historis). Gunakan setelah pesan **ZIP terbaru siap**. File sebelumnya dipertahankan jika gate/ekspor gagal. Upload ke ChatGPT tetap manual. Lokasi export override mengikuti konfigurasi Master. Detail: [Panduan Operasional](docs/OPERASIONAL-STUDIO.md).

Render dari Studio atau menu. Untuk pekerjaan khusus (render CapCut HQ, arsip/pulihkan, ZIP historis, maintenance) gunakan `npm run menu`. CLI diagnostik tetap tersedia di package.json, bukan daftar perintah yang harus dihafal. Full test, render, Save/reload dan listening QA tidak diklaim oleh startup.

## Struktur Master folder-first

```text
MotionGraphic-Studio/
├── projects/
│   └── <slug>/                          # setiap video dalam folder add-on mandiri
├── src/                                 # komposisi, auto-generated saat sync
├── public/videos/                       # mirror aset dari project, jangan edit
├── library/catalog.json                # katalog auto-generated
├── library/.studio-generated-state.json # status internal sync
├── library/masuk/                       # tempat ZIP add-on yang akan diimpor
├── contracts/                           # manifest schema + capabilities untuk ChatGPT
├── templates/addon-starter/             # add-on standar untuk konten baru
├── docs/                                # SOP universal, VO & maintenance
├── tools/                               # alat Remotion, render, impor, audit, ZIP
├── tests/                               # tes regresi Remotion
└── package.json
```

**Render CapCut HQ:** dari `npm run menu` pilih Render MP4 → video → mode → `1. CapCut HQ` (Enter default). Bahan memakai H.264 CRF 16, PNG frames, BT.709, AAC 48 kHz; audio SFX dipertahankan, VO dan panduan subtitle diatur melalui Props sementara bila tersedia. Import MP4 ke CapCut tetap manual. [Panduan kualitas render dan finishing](docs/RENDER-HQ-CAPCUT.md).

## Audio, editability, dan batas yang benar

**Sound Direction v2.2:** semua video baru menggunakan [`docs/SOUND-DIRECTION-RULES.md`](docs/SOUND-DIRECTION-RULES.md) untuk sound planning, efek relevan per aksi/transisi, kontinuitas antar-scene, voice-first mixing, SFX berlisensi, dan QA mendengar. Template baru memuat `templates/addon-starter/production/SOUND-PLAN.md`; ini tidak mengganti sound pada video ACC.



Audio sumber dipertahankan di masing-masing `projects/<slug>/public/`. Untuk mengatur voice-over dan musik, lihat [Panduan Operasional](docs/OPERASIONAL-STUDIO.md). Aturan produksi ada di [PRODUCTION-RULES.md](PRODUCTION-RULES.md).

Remotion Studio **tidak otomatis membuat semua node React draggable**. Layer `Interactive`, Properties/Props dan struktur masing-masing video menentukan apa yang bisa diedit secara visual. Beberapa layer Windows Hacks masih memiliki animasi/posisi computed dan belum semua bebas drag-and-drop. Tidak ada editor voice-over waveform multi-track bawaan tambahan dalam paket ini. Editabilitas penuh tidak boleh diklaim tanpa pengujian per layer.

Backup dan output render disimpan sesuai [Maintenance](docs/MAINTENANCE-AND-RECOVERY.md).

Catatan batas uji: UI Remotion di Windows, drag/edit manual, dan render MP4 aktual memerlukan uji langsung di PC pengguna.

## Produksi dan pemeliharaan

- Flow resmi dan QA produksi: [PRODUCTION-RULES.md](PRODUCTION-RULES.md). `npm run flow -- --steps` membaca flow yang sama; `npm run flow -- --new "Judul"` membuat brief, bukan upload otomatis.
- Operasional dan editing: [docs/OPERASIONAL-STUDIO.md](docs/OPERASIONAL-STUDIO.md), [docs/EDITABLE-CONTRACT.md](docs/EDITABLE-CONTRACT.md), [docs/WORKFLOW-VO-UNIVERSAL.md](docs/WORKFLOW-VO-UNIVERSAL.md).
- Revisi ChatGPT: FILE CHANGE ONLY, copy–paste–Replace setelah cek base hash dan backup. CLI `addon:patch` tetap tersedia untuk format patch native yang berbeda, bukan untuk ZIP FILE CHANGE ONLY biasa.
- QA bundle/satu frame: `npm run qa:smoke -- --still <IDVideo>` membutuhkan dependency dan Chromium Remotion. Render dan listening tetap perlu uji aktual.
- Project ChatGPT: ganti seluruh instruksi dengan [docs/CHATGPT-PROJECT-INSTRUCTIONS.md](docs/CHATGPT-PROJECT-INSTRUCTIONS.md). Unggah satu ZIP Master terbaru (engine-only untuk video baru, with-projects untuk revisi existing). Jangan unggah prompt/snapshot lama bersamaan.
