# MotionGraphic Studio Master v1.8.1 — Remotion Studio Saja

**Satu Master. Satu editor.** Video tersedia langsung di **Remotion Studio resmi** (`http://127.0.0.1:3000`). Tidak ada Studio Hub, Visual Editor, Easy Editor, iframe, maupun server editor di port 4077.

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
| `npm run dev` | Sync + buka Remotion Studio resmi (satu UI) |
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
