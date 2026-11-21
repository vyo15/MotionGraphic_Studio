# MOTION-GRAPHIC — SUMBER BERSAMA PROJECT CHATGPT v2.0

**TUJUAN:** satu acuan untuk semua obrolan baru dalam Project **Motion-Graphic**, sebagai pelengkap Project Rules v1.7 dan Custom Skill MotionGraphic Studio Director. Bukan klaim bahwa ChatGPT mengakses PC pengguna secara otomatis. Diperbarui 21 November 2026 dari ZIP Master terakhir yang dibagikan.

## Aturan keputusan
Permintaan terbaru user dan item ACC > kontrak/version Master aktual > Project Rules > panduan Skill > referensi kreatif. Hindari tafsir dari nama file jika source aktual tersedia. Jika user meminta langsung build, buat add-on selesai tanpa approval storyboard tambahan; untuk diskusi judul, cukup konsep/storyboard. VO **selalu direkam setelah motion disetujui**.

## Master aktual (terverifikasi dari ZIP)
- MotionGraphic Studio `1.8.1`; `remotion` dan `@remotion/cli` `4.0.538`, React 19, TypeScript devDependency. Tidak perlu membuat Remotion app baru.
- Folder-first: `projects/<slug>/`; manifest `motiongraphic-video.json`; entry `src/Video.tsx` ekspor `Video`; registrasi melalui `npm run dev` / `npm run sync`.
- Kontrak detail: `contracts/studio-capabilities.json`, `contracts/addon.schema.json`, `AGENTS.md`, `PRODUCTION-RULES.md` di Master aktual. Master ZIP baru mengalahkan snapshot ini.
- **Jangan ubah manual** `src/Root.tsx`, `src/index.ts`, `package.json`, `library/catalog.json`, mirror `public/videos/`, atau project lain.
- QA/maintenance yang ada: `npm run addon:validate`, `npm run check`, `npm run qa:render`, `npm run qa:smoke`, `npm test`, `npm run skills`, `npm run skills:install`. Cek bantuan/versi sebelum menjalankan.
- Master menyimpan code path inbox `library/masuk/`; import otomatis bergantung pada kondisi watcher. User masih perlu menaruh ZIP di PC, kecuali memakai workflow computer/app yang benar-benar terhubung.

## User flow yang harus terasa oleh user
**Judul → ChatGPT bangun ZIP add-on → unduh satu file ke inbox → preview/revisi → ACC motion → VO Guide → rekam VO → sync audio/subtitle → QA/render → arsip.**
Proses naskah draft, storyboard, pilihan teknik, template, validasi, dan organisasi folder dikerjakan internal. Jangan mengubahnya menjadi banyak pertanyaan atau wizard kecuali informasi penting benar-benar diperlukan.

## Struktur per video
Gunakan satu folder `projects/<slug>/`. Kelompokkan brief, storyboard, approval/status di `production/`, dan VO Guide/naskah di `src/config/narration.json`, aset VO di `public/audio/voiceover/`, SFX di `public/audio/sfx/`, musik di `public/audio/music/` **bila Master terverifikasi mendukung path tersebut**. Utamakan manifest, scene, dan README sesuai kontrak. Jangan buat `exports/briefs` sebagai sumber data utama. Source video tiap judul berdiri sendiri.

**Target output eksternal (rencana, belum boleh dianggap terpasang):** `MotionGraphic-Studio-Outputs/<slug>/previews,renders,qa,logs`. Master ZIP engine-only tidak membawa `projects/`; arsip video per project harus tetap tersedia bila diminta.

## Visual & directing
Minimal Editorial: off-white `#F7F7F5`, tinta `#202020`, coral `#DF805F`, grid samar, kartu UI clean. Default Reels 1080×1920, 30 FPS, 15–30 detik, maksimal 5–6 scene, hook 1–2 dtk, safe zone 250/350/50. Setiap beat: PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI. Teknik sesuai topik: Living Screencast, Instruction Manual, Data Storytelling, Precise Mechanism, Swiss Motion. Ambil prinsip kreatif Lemo-Opuscar, **bukan renderer, demo atau asetnya**. Referensi pengguna tetap diprioritaskan.

## Semua 12 Agent Skills resmi Remotion — pemilihan selektif
Sumber resmi: https://www.remotion.dev/docs/ai/skills dan https://github.com/remotion-dev/skills .

| Skill | Kapan dipakai |
|---|---|
| `remotion-best-practices` | Pengarah untuk semua pekerjaan Remotion |
| `remotion-create` | Pembuatan video/komposisi; adaptasi menjadi add-on, BUKAN Master baru |
| `remotion-markup` | JSX, animasi, layout, tipografi, media, timing |
| `remotion-studio` | Preview dan inspeksi Studio yang tersedia |
| `remotion-render` | Render video/still, diagnostic renderer |
| `remotion-maps` | Peta, rute, marker (bila relevan) |
| `remotion-captions` | Caption/subtitle hasil rekaman VO |
| `remotion-saas` | Integrasi app/render server; bukan default Reels |
| `remotion-interactivity` | Drag, resize, keyframe, dan Save-to-code |
| `remotion-docs` | Cek dokumentasi/API terkini dan versi cocok |
| `remotion-upgrade` | Upgrade terencana, tidak otomatis |
| `remotion-multimedia` | Metadata/crop/trim media |

**Semua skill adalah referensi sesuai tugas, bukan kebutuhan membaca seluruh isi sekaligus.** Master terakhir sudah mempunyai CLI `npm run skills:install` dan `npm run skills`. Jalankan di PC bila ingin skill resmi ditempatkan di `.agents/skills/`. Itu tidak otomatis memasangnya ke Custom Skill akun ChatGPT. Versi Master/SDK tetap perlu divalidasi sebelum menggunakan API.

## Kompatibilitas native editable — yang bisa dibuktikan
Dari Remotion https://www.remotion.dev/docs/studio/interactivity-best-practices dan https://www.remotion.dev/docs/interactive:
- `Interactive` tersedia sejak 4.0.475 (Master 4.0.538), gunakan `Interactive.Div`, `Interactive.G`, `.Text`, dsb. bernama untuk layer utama.
- Agar Studio mengenali property editing, tulis style literal inline (bukan spread dari object/konstanta/variabel kompleks). Untuk keyframe gunakan `interpolate()` inline langsung pada property; prefer `translate`, `scale`, `rotate`, `opacity` ketimbang `transform` string.
- Source yang dapat diubah tidak sama dengan bisa drag di Studio. Kotak biru bukan bukti semua kontrol dapat disimpan.
- `defaultProps` pada `<Composition>` harus inline untuk Save-to-code; pada Master Root generated, cek keluaran sync, **jangan ubah Root manual**.
- Pisahkan layer penting dan data timeline. Gunakan Remotion frame deterministic. Pertahankan edit lokal dan item ACC.
- Label QA: **source-editable**, **Props-editable teruji**, **Studio-editable teruji**, atau **belum terverifikasi**. **100% editable** hanya bila semua elemen yang dijanjikan lulus editing, Save, reload, dan hasil render secara nyata.

## Produksi dan QA
Naskah DRAFT dan storyboard bisa dibuat sebelum rekaman. Prototype scene kunci jika perlu → build → preview/visual ACC → VO Guide per beat → user rekam → sinkronisasi → render. Cek manifest, imports, assets, codec/resolusi/FPS, safe zone, teks HP, camera continuity, scene cut, cursor/hotspot, font, sound, contact sheet, dan MP4 jika tooling ada. Bedakan source/lint, bundling TS, render aktual, dan pengujian Studio GUI. Tidak boleh mengklaim lolos uji yang belum dijalankan.

## Link acuan
- https://www.remotion.dev/docs/ai/skills
- https://www.remotion.dev/docs/studio/interactivity-best-practices
- https://www.remotion.dev/docs/interactive
- https://www.remotion.dev/docs/cli/skills
- https://github.com/lemomo-ai/lemo-opuscar

**Kamu cukup memberi judul. ChatGPT memakai aturan/Skill untuk menghasilkan satu ZIP add-on, sedangkan Master Remotion menjalankan import dan preview di PC.**

## Status Master kosong (ZIP 20261121-043709)
Master ini saat diaudit memiliki `library/catalog.json` berisi `videos: []` dan folder `projects/` kosong.
`library/.studio-generated-state.json` masih berisi registrasi lama dari sebelum project dihapus;
patch ini memperbaiki rekonsiliasi tersebut ketika `src/Root.tsx` memang registry kosong standar.
Dokumen ini adalah sumber rujukan bagi ChatGPT, bukan pemasangan otomatis ke ChatGPT Project.
Untuk menambahkannya ke Project ChatGPT, unggah file ini sekali melalui tab Sumber;
perubahan file di PC tidak tersinkron otomatis ke akun ChatGPT.
