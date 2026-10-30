# MotionGraphic Studio Master v1.8.1 — Remotion + Concat

**Satu Master. Dua aplikasi, tanpa editor ketiga.** **Remotion Studio** (`npm run dev`) untuk motion graphic editable; **Concat portable dari GitHub** (`npm run concat`) untuk finishing voice-over, caption, cut dan export final. Tidak ada Studio Hub, Easy Editor atau iframe tambahan.

## Mulai cepat — hanya dua aplikasi

1. `npm run dev` → buat dan revisi animasi di Remotion Studio.
2. `npm run handoff -- --project windows-hacks-5-shortcut-lengkap` → export tiga MP4 tanpa suara ke folder stabil `out/concat/<slug>/current/` (audio ditata di Concat). Untuk video IP Address, gunakan slug `ip-address`.
3. `npm run concat` → clone source GitHub (jika belum ada), siapkan runtime portable resmi GitHub tanpa instal aplikasi, lalu buka Concat. Impor tiga MP4 dalam urutan yang sama, rekam voice-over, generate captions di GUI dan export final.

Saat pertama kali handoff dibuat, impor tiga MP4 dari folder `current/`. Saat revisi Remotion, jalankan handoff lagi atau tambahkan `--only CTA` untuk merender satu bagian. **Tutup project Concat sebelum memperbarui aset**, kemudian buka ulang/relink media setelah update; handoff tidak otomatis mengubah timeline/caption Concat. Versi terdahulu disimpan dalam folder `history/` untuk pemulihan. `npm run handoff` hanya perintah export, **bukan interface/editor ketiga**. Pada first run `npm run concat`, launcher menyiapkan source GitHub dan mengekstrak runtime portable dari rilis resmi GitHub setelah memvalidasi SHA-256. **Tidak perlu Rust/Cargo dan tidak memasang aplikasi Concat di Windows.** Kompilasi source sendiri tetap memerlukan Rust, CMake, MSVC dan dependensi native. Folder `apps/concat/` adalah local-only dan tidak ikut backup ZIP Master.

Baca **[PANDUAN-HANDOFF-CONCAT.md](PANDUAN-HANDOFF-CONCAT.md)** dan **[ALUR-KERJA-REMOTION-CONCAT.md](ALUR-KERJA-REMOTION-CONCAT.md)** untuk keputusan ekspor audio, revisi, status caption, dan cara pemulihan.


## Workflow produksi ChatGPT + Remotion Studio (approval scene pertama)

Aturan utama: [PRODUCTION-RULES.md](PRODUCTION-RULES.md) dan [PROMPT-PROYEK-CHATGPT.md](PROMPT-PROYEK-CHATGPT.md). Script/storyboard project, keputusan kreatif, dan status persetujuan disimpan **di dalam folder video** supaya ikut terbawa saat `npm run zip`.

Alur: **script full → storyboard full → approval → build satu scene pertama → preview/revisi → approval scene pertama → build scene lain → sync voice-over → preview full → QA/render**. Studio tetap Remotion asli, bukan editor baru. Pada video lama, dokumen awal boleh merekam keputusan yang sudah disepakati, tetapi tidak otomatis dianggap approved seluruhnya.

`npm run dev` dan `npm run sync` otomatis membuat `AGENTS.md`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json` **hanya jika belum tersedia** di project baru. Dokumen yang ada tidak pernah ditimpa oleh sync. Status dapat dilihat lewat `node tools/production-scope.mjs --check`. Pembuatan dokumen bukan persetujuan script otomatis.

## Mulai di Windows (tanpa VS Code)

1. Backup folder Master yang lama; ekstrak paket ini sebagai **folder Master terpisah**. Jangan dicampur dengan Master lain.
2. Klik ganda **`01-BUKA-STUDIO.bat`**. Launcher menyiapkan dependensi (saat pertama kali), import ZIP add-on, sinkronisasi, dan pemeriksaan, kemudian membuka **Remotion Studio** di browser.
3. Pada sidebar Remotion, pilih **Videos → Belajar IP Address** atau **Windows Hacks** (Composition ID tetap sama); scrub / Play, pilih layer dan gunakan panel Properties / Props untuk mengedit yang memang didukung.
4. Render video lewat kontrol **Render** pada Remotion Studio. Untuk pemeriksaan tambahan klik **`02-CEK-STUDIO.bat`**, untuk menutup proses dari launcher klik **`03-STOP-STUDIO.bat`**.

Jika tombol pembuka mendeteksi Remotion dari Master lain di port 3000, **tutup server lama dulu**; launcher tidak akan membuka proyek yang salah secara diam-diam. Kalau port dipakai app lain, baca log `../MotionGraphic-Studio-Backups/Runtime/`.

## Hal yang bisa dilakukan di Studio

- **Preview dan timeline**: Play, scrub, pilih scene / layer (`Interactive` dan `Sequence`).
- **Edit visual**: klik layer `Interactive` dan ubah posisi, skala, gaya atau teks **apabila properti layer itu didukung langsung oleh Remotion**; gunakan komposisi **Props** untuk pengaturan seperti `sceneEditor`, `voice`, `audioTimeline`, `backgroundColor` dan `musicVolume` yang memang terhubung pada video.
- **Render**: tekan tombol Render bawaan Remotion Studio. Render manual / ZIP add-on tetap tersedia sebagai fungsi pemeliharaan dari perintah `npm run render` / `npm run zip` (tidak membuka UI lain).
- **Audio**: file audio sumber di `projects/<slug>/public/audio`; path & timing track dapat diubah lewat **Props** komposisi setelah file dimasukkan. Lihat [Panduan Audio](PANDUAN-AUDIO-TIMELINE.md).

**Batas nyata:** beberapa layer Windows Hacks masih menggunakan posisi/animasi hasil perhitungan (`computed`) atau elemen non-`Interactive`, jadi belum semua objek bisa di-drag langsung. Tidak ada editor audio multitrack waveform khusus / upload-aset terintegrasi yang dibuat sendiri dalam paket ini. Jangan mengira Props otomatis membuat setiap elemen draggable. Teks source yang dihitung tiap frame juga mungkin memerlukan pengembangan komponen.

## Struktur folder (folder-first)

```text
MotionGraphic-Studio/
├── 01-BUKA-STUDIO.bat            # satu launcher => Remotion Studio
├── 02-CEK-STUDIO.bat
├── 03-STOP-STUDIO.bat
├── apps/concat/source/             # clone source GitHub (ignored oleh Git/ZIP)
├── apps/concat/runtime/current/    # binary portable rilis GitHub (tidak diinstal)
├── projects/
│   ├── ip-address/
│   └── windows-hacks-5-shortcut-lengkap/
├── src/                         # Root/index registrasi auto-generated
├── public/videos/               # mirror aset saat sync (jangan edit)
├── library/                     # katalog, backup, trash, arsip tetap dipertahankan
├── tools/                       # sync, validate, QA, render, ZIP CLI
└── package.json
```

Masukkan add-on sebagai **folder utuh** `projects/<slug>/` yang memiliki `motiongraphic-video.json`. Jangan copy isi `src/` atau `public/` add-on ke root Master, jangan edit `src/Root.tsx` atau `library/catalog.json` secara manual.

## Perintah lanjutan (opsional)

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Sync + buka Remotion Studio resmi |
| `npm run handoff -- --project <slug>` | Export HOOK/ISI/CTA tanpa audio ke `out/concat/<slug>/current/` (default) |
| `npm run handoff -- --project <slug> --only CTA` | Render ulang CTA saja, Hook/Isi tetap utuh |
| `npm run handoff -- --project <slug> --with-remotion-audio` | Sertakan audio Remotion bila semua lisensi aset sudah terverifikasi |
| `npm run concat` | Clone source (jika belum ada), ekstrak Concat portable rilis GitHub bila perlu, lalu buka tanpa Rust |
| `npm run concat:status` | Cek source, runtime portable dan opsi toolchain |
| `npm run sync` | Daftarkan project dan sinkronkan aset |
| `npm run check` | Pemeriksaan library + TypeScript + editable + layout |
| `npm run qa` | Audit statis proyek; laporan di terminal |
| `npm run render` | Render via CLI dengan hasil di folder backup luar Master |
| `npm run zip -- --studio` | ZIP Master lengkap |
| `npm run zip -- --all` | ZIP tiap add-on |
| `npm run addfolder -- "C:\\lokasi\\folder-video"` | Impor folder project |
| `npm run delete` / `npm run restore` | Arsipkan dan pulihkan secara aman |

ZIP Master menyertakan project, aset, arsip asli, panduan, dan skill. Tidak menyertakan node_modules/cache. Output CLI masuk ke `../MotionGraphic-Studio-Backups/`; render lewat **Remotion Studio** menggunakan pengaturan tujuan yang dipilih di dialog render Studio.

Dokumentasi: [Panduan Remotion](PANDUAN-REMOTION-STUDIO.md) · [Audio](PANDUAN-AUDIO-TIMELINE.md) · [Aset](PANDUAN-EDIT-ASSET.md) · [Standar Editable](STANDAR-EDITABLE-STUDIO.md).

**Bukti pengujian dan batasan tersedia di `STATUS-VALIDASI-v1.8.1.md`.** Pengujian browser Windows dan render MP4 tidak boleh dianggap berhasil jika belum dijalankan.
