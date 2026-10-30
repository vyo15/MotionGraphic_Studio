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

**G1 Brief & script** — Buat script utuh HOOK → MASALAH → SOLUSI/DEMO → RANGKUMAN → CTA. Gaya bahasa natural, tempo santai sesuai permintaan, jeda untuk demonstrasi. Tidak boleh mempercepat voice-over demi mengejar durasi default. Minta approval script sebelum build besar.

**G2 Storyboard & visual mapping** — Tabel `Scene | Durasi | Narasi | Teks Layar | Visual | Animasi | Editable Assets`, termasuk beat yang memicu visual dan durasi *sementara*. User menyetujui storyboard dan arah visual (brand kit, komposisi, pacing) sebelum produksi.

**G3 Golden scene FIRST** — Bangun **satu scene referensi pertama saja** (biasanya Hook/Opening), preview, review, revisi, kemudian **minta approval jelas**. Simpan persetujuan di `PRODUCTION-STATE.json` dan keputusan gaya di `PROJECT-SCOPE.md`. Hanya setelah approved lanjut build scene lain. Jika Hook adalah greenscreen/presenter, scene demo UI pertama juga perlu verifikasi realisme terpisah; jangan menganggap Hook membuktikan kualitas UI.

**G4 Other segments** — Scene berikut mengikuti visual reference yang terkunci: warna, font, typography density, safe zone, transisi, komponen UI, cursor, framing, dan tempo. Bisa direvisi per scene; jangan merombak semua jika hanya satu yang bermasalah.

**G5 Audio sync** — Saat VO belum ada, scene memiliki timing estimasi, tanda jeda, marker beats dan placeholder yang diberi label. **Jangan mengklaim audio placeholder sebagai voice-over.** Setelah VO direkam, ukur timing kata/hasil demonstrasi dan sesuaikan frame. Render dan preview memakai data konfigurasi sama.

**G6 Full QA & render** — Uji transisi antar-segmen, lip-sync/caption, posisi teks, visual Windows asli, cursor target, editability, safe zone, asset path, audio, save/reload dan render. Jika tidak teruji, tulis keterbatasan secara eksplisit. Setelah approval, ekspor MP4 jika memang berhasil dirender.

## 3. Creative & visual style default

- Edukasi vertikal 1080 × 1920, 30 FPS. Durasi default hanya acuan; keputusan project dan rekaman natural lebih utama.
- Hook kuat 1–2 detik pertama; narasi seperti ngobrol, bukan menumpuk instruksi. Gunakan pause untuk memberi waktu mata memahami demo.
- **Narration explains → motion demonstrates → text emphasizes.** Jangan tuliskan semua kalimat voice-over di layar. Teks label dan shortcut saja kecuali subtitle eksplisit diperlukan.
- Main text 6–8 kata per tampilan bila relevan; zona penting dari y = 250 sampai 1570 px (safe 250 atas, 350 bawah). Jangan memindahkan UI penting ke pinggir layar.
- Transisi halus ~0.3–0.6 detik; animasi deterministik berbasis frame; UI Windows realistis dengan kursor dan highlight sesuai aksi yang dijelaskan.
- Usulkan 3 warna dan 1–2 font jika tidak ada brand kit. **Jangan mengganti brand kit existing tanpa persetujuan.**

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

- **Master fix/revisi existing**: kirim **FILE CHANGE ONLY** dengan path yang sama seperti Master (mis. `tools/...`, `projects/<slug>/...`). User tinggal ekstrak lalu copy–paste/Replace. **Tanpa installer/BAT/patcher**.
- **Video baru**: kirim folder `<slug>/` utuh atau ZIP add-on, tidak perlu Master baru.
- Jangan klaim MP4, preview visual, edit-visual, atau Windows smoke test berhasil bila belum dilaksanakan. Jangan mengklaim dokumen rules mengubah UI Remotion dengan sendirinya.
- Uji `node tools/production-scope.mjs --check`, `npm run check`, test otomatis yang relevan, dan preview/render bila lingkungan tersedia.

**CREATE ONCE — APPROVE FIRST SCENE — EDIT NATIVELY — REUSE FOREVER.**
