# Preview 7 segmen — source original (tanpa desain ulang)

Paket ini hanya **menambahkan alat untuk melihat setiap segmen dalam MP4 terpisah**. Animasi, UI Windows, kursor, layer, audio, ID, slug, dan komposisi `WindowsHacks5ShortcutLengkap` **tidak diubah**. Master Studio tetap satu.

## Cara menjalankan (Windows)

1. Jika addon belum dipasang, taruh **folder** `windows-hacks-5-shortcut-lengkap` di `MotionGraphic-Studio/projects/` (jangan memindahkan isi `src` atau `public` ke root Master).
2. Pastikan dependencies Master sudah dipasang (`npm install` bila belum). Studio dan project lainnya tetap ada.
3. Double-click `PREVIEW-PER-SEGMEN.bat` di dalam folder video itu.
4. Pilih **01** untuk hanya melihat demo Ctrl + Shift + T, atau pilih **02**, **03**, **04**, **05** sesuai segmen. **00** adalah Hook dan **06** CTA. Pilihan **07** mengekspor semua segmen satu per satu.
5. Hasil MP4 masuk ke folder Master: `out/segment-previews/windows-hacks-5-shortcut-lengkap/`.

Alat memanggil `npm run sync` yang meregistrasi project secara otomatis, lalu memakai Remotion CLI untuk merender **frame range asli**. Setiap MP4 bersumber dari scene React/TSX yang sama dengan preview Studio, **bukan simulasi gambar dari luar**. Semua keluaran H.264 dan bersifat sementara, bukan proyek pengganti.

## Batas frame asli (30 fps)

| Segmen | Frame | Durasi | Nama keluaran |
|---|---|---:|---|
| Hook | 0–239 | 8 dtk | `00-hook.mp4` |
| Ctrl+Shift+T | 240–524 | 9,5 dtk | `01-ctrl-shift-t.mp4` |
| Ctrl+Shift+Esc | 525–854 | 11 dtk | `02-ctrl-shift-esc.mp4` |
| Win+Shift+S | 855–1184 | 11 dtk | `03-win-shift-s.mp4` |
| Win+E | 1185–1514 | 11 dtk | `04-win-e.mp4` |
| Ctrl+Shift+N | 1515–2084 | 19 dtk | `05-ctrl-shift-n.mp4` |
| CTA | 2085–2204 | 4 dtk | `06-cta.mp4` |

> **Timing:** Ini masih 73,5 detik dari proyek yang kamu kirim, bukan revisi panjang ±100 detik yang sedang didiskusikan. Tidak ada voice-over asli pada paket sumber sehingga audio narasi tidak akan terdengar. Setiap scene akan kita perbaiki setelah preview aslinya disetujui.

## Bila terjadi error

- **`Remotion CLI belum tersedia`** → buka terminal di Master dan jalankan `npm install`.
- **`Master Studio tidak ditemukan`** → folder harus tepat berada di dalam `MotionGraphic-Studio/projects/<slug>/`.
- **Render tidak bisa / invalid composition** → jalankan `npm run check` dari Master, lalu `npm run sync`. Pastikan project masih terdaftar.
- **Tidak mau lewat BAT** → gunakan perintah manual dari Master: `npx --no-install remotion render src/index.ts WindowsHacks5ShortcutLengkap out/segment-01.mp4 --frames=240-524 --codec=h264`.

Tidak ada file Master yang diedit manual. Hasil render ditulis ke `out/`.
