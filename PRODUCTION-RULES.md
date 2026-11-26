# MOTIONGRAPHIC STUDIO — PRODUCTION RULES (Remotion Native, v1.0)

> Satu Master, satu Remotion Studio, satu sumber scene. Berlaku untuk setiap project lama dan add-on baru.
> Dokumen ini mengatur alur AI/produksi; bukan fitur bawaan Remotion dan bukan pengganti pengujian browser.

## 0. Urutan sumber kebenaran

1. **User**: permintaan terbaru yang eksplisit dan persetujuan terkini (mengalahkan keputusan terdahulu pada scope yang diminta).
2. **Source render aktual**: `src/Video.tsx`, `src/SegmentVideo.tsx`, komponen, config, manifest; menyatakan apa yang sekarang *benar-benar akan tampil*.
3. **Creative decisions**: `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`; menyatakan target dan apa yang sudah disetujui.
4. **Aturan teknis global**: file ini, `AGENTS.md`, kontrak editable yang sesuai dengan implementasi; dokumentasi Remotion versi terpasang.
5. **Catatan lama/arsip** hanya referensi historis, tidak boleh menimpa keputusan yang lebih baru.

Bila script di dokumen berbeda dari implementasi, laporkan dua-duanya: **TARGET DISETUJUI** vs **IMPLEMENTASI SAAT INI**. Jangan menyebut preview sudah berubah sebelum source benar-benar berubah. Jangan menganggap ZIP yang sudah diekstrak di PC otomatis terbaca oleh ChatGPT: unggah ZIP atau berikan akses file untuk analisis.

## 1. Struktur dan workflow Master

- Master tunggal `MotionGraphic-Studio/` dan video add-on mandiri `projects/<slug>/`, slug = nama folder = manifest.
- Video baru: `motiongraphic-video.json`, `src/Video.tsx` dengan `export const Video`, `src/SegmentVideo.tsx` bila menghendaki **editing scene langsung**, scene independen `src/scenes/`, komponen/config, `public/`, `README.md`, `PANDUAN-EDIT-ASSET.md`.
- Jangan edit `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, `package.json` secara manual untuk setiap video. `npm run dev` / `npm run sync` mendaftarkan full + segmen dan mirror aset.
- `src/SegmentVideo.tsx` menerima `segmentIndex` dan merender **komponen scene yang sama** dengan video lengkap. Jika tidak tersedia, komposisi segmen mungkin hanya trimmed preview satu layer; jangan mengklaim editable detail.
- Full Composition = navigasi/preview/render gabungan, segment compositions = layer detail. Full lebih ringkas secara timeline, tidak dijanjikan lebih ringan secara komputasi/render.
- Aset tersimpan di add-on `public/`, direferensikan setelah sync melalui `staticFile('videos/<slug>/...')`.
- `npm run sync` otomatis membuat *dokumen produksi yang masih kosong saja* (`AGENTS.md`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`). File keputusan yang sudah ada **tidak ditimpa**.

## 2. Approval gates — alur utama (Guided Automation)

**G0 Project recognition** — Baca manifest, source, media, voice-over, semua catatan keputusan dan status. Ringkas perubahan yang diminta, segment yang boleh diubah, status lock, mismatch source/target.

**G1 Brief & naskah draft (rekaman VO selalu setelah motion)** — Rancang hook dan alur baku delapan tahap cerita: MASALAH → KONFLIK → REAKSI → SOLUSI → DEMONSTRASI → HASIL → INTERAKSI/CTA → COVER REELS. Tahap bukan scene fisik; jika diperlukan gabungkan tahap agar tempo tidak bertele-tele. Gaya narasi natural dengan jeda untuk demo, jangan mempercepat VO demi durasi. **Approval script hanya diperlukan pada mode review bertahap**, bukan saat user eksplisit meminta build lengkap. Cover penutup merupakan visual ringkasan, bisa tanpa VO.

**G2 Storyboard & visual mapping** — Gunakan `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md`. Setiap scene harus mempunyai `Scene | Durasi (detik/frame) | Tahap cerita | Narasi/Beat | Cue Subtitle | Supporting Text (fungsi/omit) | Objek/Posisi | Pemicu→Aksi→Reaksi→Hasil | Hold | Transisi/Objek Penghubung | Editable Assets | Status ACC`. Detail per detik ketika audit scene. Pastikan adegan final **COVER REELS** muncul **setelah CTA** pada video baru, memperagakan ringkasan konten, lalu menghasilkan hero frame stabil untuk thumbnail. **Mode review bertahap menunggu ACC; mode langsung build membuat storyboard sebagai artefak pendamping tanpa menjadi blocker.**

**G3 Golden scene bila mode review** — Jika pengguna meminta proses scene-per-scene, bangun satu scene referensi dahulu (biasanya Hook), preview/review dan tunggu ACC. Simpan persetujuan aktual dalam `PRODUCTION-STATE.json`. **Jika user eksplisit meminta video langsung selesai, lakukan pemeriksaan referensi scene secara internal dan build seluruh scene pada respons yang sama; jangan memaksa gate ACC sementara.** Tidak boleh otomatis menganggap hasilnya sudah ACC; laporkan visual/GUI QA yang belum diuji. Untuk UI/software, uji realisme demo terpisah bila memungkinkan.

**G4 Other segments** — Scene berikut mengikuti visual reference yang terkunci: warna, font, typography density, safe zone, transisi, komponen UI, cursor, framing, dan tempo. Bisa direvisi per scene; jangan merombak semua jika hanya satu yang bermasalah.

**G5 VO GUIDE → REKAM → Audio sync (workflow WAJIB)** — Motion graphic lengkap dan revisi visual selesai terlebih dahulu. Naskah VO draft dan timing disimpan di `src/config/narration.json`; komposisi `IDVideoVOGuide` menampilkan teks panduan untuk rekaman, sementara `IDVideo` tetap tanpa overlay. Rekam voice-over **setelah** motion disetujui; bukan VO-first dalam arti audio direkam di awal. Saat VO belum ada, scene memiliki timing estimasi, tanda jeda, marker beats dan placeholder yang diberi label. **Jangan mengklaim audio placeholder sebagai voice-over.** Setelah VO direkam, ukur timing kata/hasil demonstrasi dan sesuaikan frame. Render dan preview memakai data konfigurasi sama.

**G6 Full QA & render** — Gunakan checklist `docs/QA-VISUAL-MOTION-CHECKLIST.md` untuk uji transisi antar-segmen, lip-sync/caption, posisi teks, font render, crop cover 3:4, kontras, visual Windows asli, cursor target, editability, safe zone, asset path, audio, save/reload dan render. Jika tidak teruji, tulis keterbatasan secara eksplisit. Setelah approval, ekspor MP4 jika memang berhasil dirender.

### CLEAN FOCUS v2.1 — standar output generasi baru

Generasi video bukan mengisi template dengan ornamen. Jangan tampilkan running header/footer, bar atas/bawah, progress dekoratif, badge nomor scene, *label hook*, atau headline permanen. Setiap overlay harus mengarahkan perhatian ke aksi/hasil aktual; selebihnya dibuang. Urutkan storyboard dengan **objek dan tindakan dulu**, lalu teks opsional. Hook boleh memakai satu kalimat kuat yang singkat, cover boleh punya judul untuk thumbnail; selama demo Windows, prioritaskan UI yang besar dan realistik (termasuk taskbar Windows yang asli). Latar default off-white **polos**, grid bukan wajib. Baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` §4A dan jalankan gate CLEAN FOCUS di `docs/QA-VISUAL-MOTION-CHECKLIST.md` sebelum menyebut preview layak. Tidak memaksa revisi project/scene ACC.

## 3. Creative & visual style default

- Edukasi vertikal 1080 × 1920, 30 FPS. Durasi default hanya acuan; keputusan project dan rekaman natural lebih utama.
- Hook kuat 1–2 detik pertama; narasi seperti ngobrol, bukan menumpuk instruksi. Gunakan pause untuk memberi waktu mata memahami demo.
- **Narration explains → motion demonstrates → text emphasizes.** Seluruh VO tampil bertahap sebagai subtitle bawah; teks pendukung terpisah hanya untuk fungsi informasi tambahan. **TEXT HIERARCHY & SUBTITLE LOCK v1.0 (video baru):** subtitle draft VO wajib aktif secara default pada preview bernarasi; teks pendukung atas/dekat objek hanya jika memberi fungsi tambahan (parameter, arti, nilai, status atau batasan), bukan mengulang subtitle atau UI. Visual utama mendemonstrasikan aksi/hasil. Maksimal satu penegasan relevan per beat, boleh kosong; subtitle bawah maksimal dua baris, aman, konsisten dan editable per cue. Cover silent tanpa subtitle. Setelah motion ACC, rekam VO dan sinkronkan subtitle final; tampilkan hanya satu track. CapCut HQ menonaktifkan subtitle melalui Props sementara. Baca `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` §5A dan gate `docs/QA-VISUAL-MOTION-CHECKLIST.md`. Jangan retrofit project/scene ACC.
- Main text 6–8 kata per tampilan bila relevan; zona penting dari y = 250 sampai 1570 px (safe 250 atas, 350 bawah). Jangan memindahkan UI penting ke pinggir layar.
- Transisi halus ~0.3–0.6 detik; animasi deterministik berbasis frame; UI Windows realistis dengan kursor dan highlight sesuai aksi yang dijelaskan.
- **STYLE LOCK v2.0:** gunakan token dan kebijakan font dari `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` (default `#F7F7F5`, `#202020`, `#DF805F`, teks sekunder `#646464`; Arial baseline sampai Inter benar-benar tersedia). Aturan motion/transisi dari `docs/MOTION-DIRECTION-RULES.md`, kualitas dari `docs/QA-VISUAL-MOTION-CHECKLIST.md`. **Jangan mengarang palet/font baru tanpa alasan atau mengubah brand kit/ACC existing.**

## 4. Penerapan Remotion Studio yang jujur

- Render dengan React/TypeScript dan Remotion `useCurrentFrame`, `useVideoConfig`, `Sequence`, `AbsoluteFill`, `interpolate`, `spring`; animasi tidak bergantung pada jam nyata.
- `<Folder>` dan `<Composition>` untuk komposisi; komponen scene yang sama dipakai full dan segmen; metadata segmen mencakup ID, judul, frame mulai, dan durasi.
- Remotion Studio **bukan editor drag-drop otomatis untuk semua JSX**. Hanya layer/props yang memenuhi API & praktik interactivity Remotion versi terpasang dapat diedit secara visual dan disimpan ke source. Hindari menganggap panel Props sebagai bukti semua elemen draggable.
- Pakai `Interactive.Div` / `Interactive.create()` **hanya bila benar-benar didukung** versi Remotion yang terpasang. Style, timing, keyframe, dan teks yang perlu diedit jangan disembunyikan dalam nilai computed tak didukung.
- Hindari meratakan scene sebagai screenshot/video. Pisah layer penting, label yang stabil, transform posisi dasar vs transform user vs animasi, serta efek/audio independen. Jangan membuat elemen fleksibel Windows UI menjadi `position:absolute` sembarangan.
- Tes pilihan layer → drag/edit → simpan ke source → sync → reload → full preview → render. Tulis hasil yang benar-benar dibuktikan.
- Dokumen resmi: https://www.remotion.dev/docs/composition , https://www.remotion.dev/docs/studio/interactivity , https://www.remotion.dev/docs/composing . Pastikan kompatibilitas dengan versi `package.json` sebelum memakai API baru.

## 5. Scope revisi dan penguncian

- **MASTER**: perubahan pada sistem universal, hanya dengan permintaan eksplisit. Preserve project, history dan archives.
- **PROJECT**: script/storyboard/brand/VO/video tertentu; perubahan hanya di project tersebut.
- **SCENE**: bila user menyebut satu shortcut/segmen/elemen, edit hanya scene itu dan dependensi yang benar-benar perlu; jangan mengubah Hook, CTA, scene lain.
- **LOCK**: nilai TERKUNCI tidak berubah tanpa user membuka lock. Tidak ada approval otomatis berdasarkan estimasi atau karena project sudah di-render.
- `PRODUCTION-STATE.json`: proses approval dinyatakan eksplisit `pending` → `in-review` → `approved`. Metadata tidak membuktikan hasil visual; simpan bukti pengujian pada catatan.
- Revisi harus mempertahankan `id`, `slug`, layer names dan jalur aset. Hindari perubahan non-target. Selalu tampilkan daftar file yang berubah.

## 6. Pengiriman

- **Master fix/revisi existing = FILE CHANGE ONLY WAJIB**: sediakan satu ZIP dengan **hanya file baru atau yang isinya benar-benar berubah**; setiap file di dalamnya utuh dan mempunyai path persis relatif terhadap root `MotionGraphic-Studio/` (mis. `tools/...`, `projects/<slug>/src/scenes/Scene03.tsx`). User mengekstrak lalu menyalin isi ZIP **ke dalam folder root `MotionGraphic-Studio/`** dengan Merge/Replace. Jangan sertakan seluruh Master, seluruh project, file lain yang tak berubah, installer/BAT/patcher atau instruksi tempel fragmen kode manual. Sebutkan daftar file berubah dan tujuan masing-masing pada respons ChatGPT. Tidak boleh ada file delete diam-diam.
- **Video baru (bukan revisi)**: kirim folder `<slug>/` utuh atau ZIP add-on untuk ditempatkan di `projects/`, tidak perlu Master baru. Jika user minta audit/storyboard saja, **jangan** menghasilkan atau mengganti source sampai ada instruksi build/revisi.
- **Keselamatan Replace**: pencocokan file path saja tidak mendeteksi konflik isi lokal. Saat Master hasil edit user mungkin berbeda, bandingkan sumber yang tersedia dan sarankan backup/diff. CLI `npm run addon:patch -- <patch> --dry-run` adalah jalur opsional yang mengecek checksum bila pengguna memilih patch terstruktur; **jangan mewajibkannya** pada jalur sederhana copy–Replace.
- Jangan klaim MP4, preview visual, edit-visual, atau Windows smoke test berhasil bila belum dilaksanakan. Jangan mengklaim dokumen rules mengubah UI Remotion dengan sendirinya.
- Uji `node tools/production-scope.mjs --check`, `npm run check`, test otomatis yang relevan, dan preview/render bila lingkungan tersedia.

**CREATE ONCE — APPROVE FIRST SCENE — EDIT NATIVELY — REUSE FOREVER.**

## 6A. Scene VO/ACC dashboard & review tidak kehilangan konteks

`docs/SCENE-VO-ACC-WORKFLOW.md` menetapkan bahwa **setiap respons diskusi video aktif memuat VO persis dan status seluruh scene**, dilanjutkan detail scene fokus. Sumber tunggal: `src/config/narration.json` untuk teks/beat, `PRODUCTION-STATE.json` untuk ACC, manifest untuk durasi. Generated `production/SCENE-VO-ACC-BOARD.md` dibuat saat `npm run sync`, tidak boleh diedit untuk mengubah keputusan. Empat status terpisah: VO teks / visual / rekaman-sync / final. Bridge dan silent cover harus terlihat; visual ACC tidak mengunci VO otomatis.

Preview animasi wajib MP4/GIF yang benar-benar bergerak jika tools tersedia; jangan diam-diam memberi 5 gambar saat pengguna meminta 5 alternatif animasi (baca `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md`). File hygiene mengikuti `docs/ARTIFACT-HYGIENE.md`, default non-destruktif. Tidak menghapus project, scene ACC, backup atau data generated state secara otomatis.

## 7. VO Guide universal / source of truth (semua video baru)

- `npm run sync` otomatis menyiapkan `src/config/narration.json` kosong **hanya untuk add-on baru** yang belum terdaftar. Project lama tanpa konfigurasi tidak diubah.
- Isi `beats` secara berurutan, `startFrame` inklusif, `endFrame` eksklusif, dari 0 hingga tepat `durationInFrames`; setiap beat memiliki `scene`, `text`. Gunakan beat teks pendek agar muat di layar.
- `npm run vo:init -- <slug>` dapat membuat template untuk project lama bila dibutuhkan tanpa menimpa file ada.
- Jika ada teks non-kosong, `npm run sync` mendaftarkan komposisi `IDVideoVOGuide`. Komposisi utama tidak berubah. `npm run render` atau `npx remotion render` dapat mengekspor VO Guide sebagai MP4 referensi rekaman.
- Subtitle DRAFT wajib aktif pada preview bernarasi; subtitle final dan file voice-over asli dibuat **setelah** rekaman. Jangan mengira teks VO Guide atau cue draft sudah menjadi subtitle tersinkron.
- Sinkronisasi akan **menolak kehilangan project lama tanpa arsip resmi** untuk mencegah ZIP parsial merusak katalog; `npm run delete` mengarsipkan lewat `library/sampah` secara resmi.


## Kontrak editable modern dan distribusi engine

Add-on BARU mengikuti `editableContract: studio-direct-v4` dan `docs/EDITABLE-CONTRACT.md`: lapisan penting dinamai dan dapat dipilih langsung lewat native `Interactive`, style penting inline, animasi/keyframe mudah diuji, dan ada `EDITABLE-LAYER-MAP.md`. Lolos static QA saja bukan bukti semua fungsi edit di GUI; uji Save/reload/render sebelum klaim 100%. Video lama tetap tidak diubah tanpa izin.

Ekspor Master default `npm run zip -- --studio` adalah **ENGINE ONLY** tanpa `projects/` lama; gunakan `--studio --with-projects` atau `--studio --full` untuk backup. Ini tidak menghapus video dari PC.

**SOUND DIRECTION v2.1 (BACA WAJIB UNTUK AUDIO):** `docs/SOUND-DIRECTION-RULES.md` menetapkan evaluasi SFX atau `omit` pada tiap aksi/transisi, mapping click/impact/morph/reveal/status, audio continuity, anti-duplikasi, mixing voice-first, sound CTA→Cover, serta QA listening. Sound plan dibuat saat storyboard; cue dan aset definitive setelah ACC motion; VO setelah visual ACC; mix final baru setelah rekaman natural. JSON cue bukan bukti audio terdengar. Jangan ubah SFX/VO/scene ACC tanpa permintaan.

## Sound design (motion dahulu, mixing belakangan)
Per scene yang sudah ACC, tentukan SFX dari **aksi → sound cue → impact frame → hold**, bukan dari daftar efek acak. Cek `docs/SOUND-DESIGN-WORKFLOW.md` dan skill audio terpusat. Rekaman Openverse/perpustakaan asli dipilih dengan izin jelas; metode Real SFX menempatkan rekaman pas di frame; earshot opsional untuk suara berbasis kode yang belum ada. Simpan source audio, metadata lisensi, cue dan versi hasil pada folder slug. VO asli baru direkam setelah semua visual ACC; mix/duck menyesuaikan VO natural. Sound QA source tidak menggantikan listening dan loudness test render.


## 8. TEMPLATE STORYBOARD UNIVERSAL — EASY2BOOT DNA (semua video baru)

**Acuan resmi:** `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` dan `CHATGPT-READ-FIRST.md`. Pelajari *prinsip* dari Easy2Boot yang ACC: masalah dan konflik terlihat, objek bereaksi, solusi langsung didemonstrasikan, langkah UI punya sebab-akibat, hasil dibuktikan, transisi meneruskan objek/arah/komposisi bila logis. **Jangan menyalin efek Easy2Boot secara seragam atau mengubah project Easy2Boot yang terkunci.**

- **8 tahap cerita:** (1) MASALAH, (2) KONFLIK, (3) REAKSI, (4) SOLUSI, (5) DEMONSTRASI, (6) HASIL, (7) INTERAKSI/CTA, (8) COVER REELS. Delapan tahap **tidak sama dengan delapan scene**. Gabungkan tahap 1–3 atau lainnya bila baik untuk storytelling; cover menjadi scene penutup mandiri setelah CTA pada proyek baru, kecuali user meminta berbeda.
- **Scene cover wajib default:** continuity dari CTA bila masuk akal → mini-explainer objek (1–3 aksi bermakna) → judul 3–6 kata → objek/hasil jelas → hold stabil 1–2 detik untuk still. Target 4–6 detik fleksibel. Safe crop 9:16 dan grid profil 3:4, tanpa subtitle/CTA menghalangi judul. Metadata frame thumbnail harus tercatat; jangan klaim PNG sudah diekspor bila belum.
- **Rumus per beat:** PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI. Rencanakan scene berikutnya saat menyusun scene saat ini; gunakan Match Move/Object Morph/Match Cut bila logis, bukan semua transisi harus memperpanjang objek.
- **Status & keselamatan:** tandai `DRAFT/REVISI/ACC/LOCKED`, bedakan source aktual dari rencana. Aturan ini hanya default video baru, **tidak mengubah video existing dan semua keputusan ACC**.
- **Chat baru:** file aturan dalam Master ZIP hanya dapat dipakai setelah ZIP benar-benar dibaca. Untuk aktif sejak awal chat, salin `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` ke pengaturan Project Instructions, unggah dokumen referensi sebagai Project Sources, lalu lampirkan ZIP Master terbaru untuk audit source aktual.

## Profil Render HQ untuk finishing CapCut

Untuk pengguna yang memilih workflow hybrid, Remotion membangun motion, transisi dan SFX, lalu dari `npm run menu` → Render MP4 → CapCut HQ menghasilkan bahan H.264 CRF16/Png frame/BT.709/AAC 48k. Pindahkan MP4 ke CapCut manual untuk VO rekaman, trim hold aman, dan subtitle final. Jangan memindahkan SFX ke CapCut atau memaksa cover PNG: cover adalah scene paling akhir. Prioritaskan profil render di `tools/render-profiles.mjs` dan kontrak `docs/RENDER-HQ-CAPCUT.md`, bukan flags acak atau renderer lain. Profil bersifat sementara, ACC/Props sumber jangan ditimpa. QA hasil MP4/CapCut wajib diuji terpisah.

## MOTION DIRECTION v3.0 — routing otomatis

Untuk tugas motion graphic relevan, gunakan MotionGraphic Studio Director bila tersedia dan baca `skills/motion-continuity-director/SKILL.md`, `docs/MOTION-DECISION-MATRIX.md`, `docs/MOTION-VOCABULARY.md`, `docs/PORTRAIT-CAMERA-STANDARD.md`, `docs/MOTION-PLAN-CONTRACT.md` setelah aturan motion. Pilih gerak berdasarkan makna beat: eye trace, focus handoff, shared element, action/reaction, reflow, hold; tanpa Slide Mask dekoratif sebagai default. UI landscape dalam portrait memakai kamera virtual fit → zoom bila detail → pan/tracking → hold → zoom out bila perlu; world UI/cursor terpisah dari subtitle/background. Periksa collision sepanjang lintasan dan kontinuitas full/segment. Video baru wajib Motion Plan v1 (`motionPlanContract: "focus-driven-v1"`) dan QA metadata, kemudian preview visual. Tidak ada retrofit project lama/ACC. Skill lokal bukan pemasangan otomatis ke akun.

## Production Toolkit v1.0 — Master 2.0.0
Baca `docs/PRODUCTION-TOOLKIT.md` sebelum build. Untuk video baru: pilih/copy kamera/asset lokal dari `templates/production-toolkit/` bila relevan; wajib `production/spatial-plan.json` dan `npm run qa:spatial -- <folder-addon>` di gate produksi. Catat world/viewport, focus bounds, track aktif dan collision exemption beralasan, gunakan keyframe yang sama dengan source; cek seluruh frame deklarasi dan tetap inspeksi preview full/segment. Setelah rekaman VO: `vo:align` hanya proposal timestamp, bukan ASR/ACC atau retiming otomatis. `qa:approval` read-only; `qa:render` bedakan declared hold dan kandidat dead zone. Legacy/ACC tidak dipaksa migrasi. Lihat laporan release 2.0.0 untuk batas verifikasi.
