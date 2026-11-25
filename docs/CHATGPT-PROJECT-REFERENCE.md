# MOTION-GRAPHIC — SUMBER BERSAMA PROJECT CHATGPT v2.0

**TUJUAN:** satu acuan untuk semua obrolan baru dalam Project **Motion-Graphic**, sebagai pelengkap Project Rules v1.7 dan Custom Skill MotionGraphic Studio Director. Bukan klaim bahwa ChatGPT mengakses PC pengguna secara otomatis. Diperbarui 21 November 2026 dari ZIP Master terakhir yang dibagikan.

## Aturan keputusan
Permintaan terbaru user dan item ACC > kontrak/version Master aktual > Project Rules > panduan Skill > referensi kreatif. Hindari tafsir dari nama file jika source aktual tersedia. **Empat mode tegas**: hanya judul = konsep/storyboard; meminta audit = audit tanpa mengubah source; meminta review scene = kerjakan scene tersebut dan tunggu ACC; meminta langsung build = add-on selesai tanpa gate approval tambahan. VO **selalu direkam setelah motion disetujui**.

## Kontrak pengiriman yang wajib dibawa ke chat baru
- **Video baru**: satu ZIP add-on utuh `<slug>/` untuk `projects/`.
- **Semua revisi (video existing maupun Master fix)**: satu **ZIP FILE CHANGE ONLY**, hanya file baru/benar-benar berubah, isi lengkap, path relatif terhadap **root `MotionGraphic-Studio/`** (contoh `projects/<slug>/src/scenes/Scene03.tsx`). Ekstrak ZIP dan copy seluruh isinya ke dalam root Master → Merge/Replace; jangan ikut mengirim Master/project penuh atau file tak berubah. Daftar file berubah, area yang dijaga/ACC, serta QA yang diuji pada respons. Jangan gunakan file BAT/installer/patcher untuk jalur sederhana ini.
- **Perubahan di PC yang belum tercakup ZIP ChatGPT**: minta ZIP terbaru atau source relevan dan cek konflik sebelum Replace; copy manual tidak punya checksum otomatis.
- **Konsistensi chat baru**: dokumen dalam Master ZIP **tidak otomatis** menjadi instruksi akun ChatGPT. Letakkan aturan ringkas ini di **Project Instructions** dan simpan file rujukannya di **Project Sources**; ZIP terbaru tetap diperlukan ketika audit keadaan source aktual. Jangan meminta ulang detail yang sudah tersedia di percakapan/Project Sources.

**TEXT HIERARCHY & SUBTITLE LOCK v1.0 (video baru):** subtitle draft VO wajib aktif secara default pada preview bernarasi; teks pendukung atas/dekat objek hanya jika memberi fungsi tambahan (parameter, arti, nilai, status atau batasan), bukan mengulang subtitle atau UI. Visual utama mendemonstrasikan aksi/hasil. Maksimal satu penegasan relevan per beat, boleh kosong; subtitle bawah maksimal dua baris, aman, konsisten dan editable per cue. Cover silent tanpa subtitle. Setelah motion ACC, rekam VO dan sinkronkan subtitle final; tampilkan hanya satu track. CapCut HQ menonaktifkan subtitle melalui Props sementara. Baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` §5A dan gate `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Jangan retrofit project/scene ACC.

## Aturan storyboard universal terbaru — video BARU

**Acuan wajib:** `CHATGPT-READ-FIRST.md` dan `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md`. Gunakan delapan **tahap cerita**: MASALAH → KONFLIK → REAKSI → SOLUSI → DEMONSTRASI → HASIL → INTERAKSI/CTA → COVER REELS. Tahap boleh digabung; jangan memaksa 8 scene. **Setelah CTA, scene terakhir khusus COVER REELS animatif** yang memperlihatkan inti materi dalam 1–3 aksi, membentuk hero composition dan hold 1–2 detik agar ada frame thumbnail 9:16 yang aman untuk crop grid 3:4. Scene lama/ACC dikecualikan kecuali user meminta revisi.

Jika Master ZIP baru diunggah, **baca file ZIP dan entrypoint `CHATGPT-READ-FIRST.md` terlebih dahulu**, baru aturan, manifest, source, dan status ACC aktual. Jika ZIP belum dibaca, jangan klaim sudah memeriksa. Dokumen di dalam ZIP **tidak otomatis** menjadi pengaturan instruksi ChatGPT Project. Gunakan `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` untuk pengaturan yang berlaku sebelum ZIP ditelaah.

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

## Design System v2.0 — default untuk video BARU
Baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`, `docs/MOTION-DIRECTION-RULES.md`, dan `docs/QA-VISUAL-MOTION-CHECKLIST.md` dari ZIP Master aktual. Palet default `#F7F7F5` / `#202020` / `#DF805F`, teks sekunder penting `#646464`, font Arial/Helvetica **baseline yang konsisten** (Inter hanya bila aset tersedia dan teruji), skala font/hierarki, crop 3:4, aksesibilitas/kontras, UI realistis, SFX semantik, hold dan continuity. Style existing/ACC tidak dirombak karena dokumen ini. Baru bisa menyatakan lolos QA jika ada bukti frame/render/GUI yang sesuai.

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

## Status snapshot dan kewaspadaan sumber lama
Catatan ZIP 20261121-043709 yang menyebut Master kosong adalah **historis**, bukan keadaan Master saat ini. Dalam ZIP **20261122-024918** yang diaudit untuk pembaruan aturan ini, folder `projects/` berisi `easy2boot-multiboot-reels` dan `shutdown-otomatis-hook-realistis`. Status scene/ACC harus diperiksa dari file project serta source aktual; jangan mengikuti catatan kosong yang kedaluwarsa.
Dokumen ini adalah rujukan, bukan pemasangan otomatis ke ChatGPT Project. Salin aturan operasional ke Project Instructions; unggah file rujukan ke Project Sources. Perubahan file PC tidak tersinkron otomatis ke akun ChatGPT.

## Audio motion graphic: Sound Design Director
Video referensi `Download (2)(2).mp4` menampilkan tiga pendekatan: **Openverse** (pencarian audio terbuka berlisensi, bukan Skill), **Real SFX** (metode/Skill Claude Code untuk penempatan rekaman nyata tepat frame), **earshot** (tool berbasis kode & pemeriksaan audio, opsional). Untuk semua scene motion, gunakan `skills/sound-design-director/SKILL.md` dan `docs/SOUND-DESIGN-WORKFLOW.md` secara selektif; tidak otomatis menginstal layanan/Skill pihak ketiga. Cue dan asal aset dikelola per project, record VO setelah motion ACC, mixing setelah VO tersedia. Gunakan `node tools/qa-sound-cues.mjs projects/<slug> --strict` untuk validasi cue; final QA audio harus didengar/diukur pada MP4.

## Native layer per scene & sound design (update 2026-11-21)

- Untuk setiap video baru, pastikan layer visual yang akan diubah sendiri memiliki deklarasi JSX `Interactive.G` / `.Div` / `.Text` langsung per objek, **bukan satu komponen pembungkus `<Layer>` yang mengembalikan `<Interactive.G>` lalu dipanggil berulang**. Itu menyebabkan Remotion Studio menampilkan `+N instances`.
- Detail pemisahan layer dan source audio ada di `docs/SCENE-LAYER-AND-SOUND-STANDARD.md`. Jalankan `npm run qa:layers -- --strict <project-folder>` sebelum mengirim add-on, dan uji perubahan visual lalu Save/reload secara nyata bila bisa mengakses GUI.
- Selama build scene, rencanakan sound cue untuk aksi yang bermakna, bukan whoosh generik. Setelah scene motion ACC, tandai frame pemicu/impact, buat SFX pendek dan satu sumber `production/sound-cues.json`, file di `public/audio/sfx/`, cek `npm run qa:sound`. Hindari main ulang satu WAV sepanjang scene dan efek tambahan yang berbenturan.
- Untuk konten lama, bedakan apakah validasi hanya memperingatkan sumber legacy atau memastikan editing native teruji. Jangan migrasi animasi baked yang sudah ACC tanpa review frame/preview.

## Native Editable First (aturan terbaru)
Saat ChatGPT membuat scene baru, gunakan `studio-direct-v4` + `production/editable-blueprint.json`, deklarasi `Interactive.Text/Div` terpisah untuk setiap subtitle/teks yang dijanjikan bisa diklik, `name` dan teks child literal, style inline. Hindari `.map()` wrapper generik untuk native text; bedakan Props-editable. Jalankan `npm run qa:native`; video lama dengan frame bake tidak otomatis 100% editable. Review per-scene → ACC → VO Guide → rekam → sinkronkan subtitle → QA render; periksa Save/reload Windows sebelum membuat klaim.
