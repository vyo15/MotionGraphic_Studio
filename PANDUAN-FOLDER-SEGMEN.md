# MotionGraphic Studio v1.8.1 — Folder judul dan preview per segmen

## Cara pasang tanpa mengganti Master
1. Tutup Remotion Studio / hentikan `npm run dev` sementara.
2. Cadangkan folder Master bila diperlukan.
3. Ekstrak ZIP change-only. **Salin isi folder `MotionGraphic-Studio/` dari ZIP ke folder Master yang sekarang**, lakukan merge / replace hanya file yang muncul pada patch. Jangan mengganti folder `projects/` atau Master secara keseluruhan.
4. Double-click `PASANG-FOLDER-SEGMEN.bat` pada folder Master. Proses ini menambahkan metadata `segments` pada manifest dua video yang sudah ada (tanpa mengubah `defaultProps`, source Video, atau aset). Backup manifest disimpan otomatis di `library/backups/segment-folders-...`.
5. Jalankan `npm run dev` (atau `npm run sync` jika Studio sudah berjalan; refresh browser).
6. Pada panel **Compositions > Videos**, expand folder **Belajar-IP-Address** atau **Windows-Hacks-5-Shortcut**. Pilih video lengkap atau satu segmen untuk preview/edit dan render dari Studio.

## Cara kerjanya
- Satu Master: `projects/<slug>/` tetap menjadi satu sumber video.
- Folder di sidebar hanyalah organisasi UI. Tidak ada project atau studio kedua.
- Segmen berasal dari komposisi lengkap yang sama melalui rentang frame dengan `Sequence trimBefore`. Semua elemen visual, waktu animasi, dan audio menggunakan sumber yang sama.
- Perubahan kode JSX / `Interactive` pada scene berlaku untuk video lengkap dan segmen.
- Perubahan **Props** yang disimpan lewat **Save props to code** dipindahkan ke manifest asal oleh `npm run sync` / `npm run dev`, kemudian diterapkan pada seluruh komposisi. Jika dua segmen mengubah properti yang sama secara bertentangan, sync menolak perubahan agar aman.
- Render biasa lewat `npm run render` masih merender **video lengkap**. Untuk render satu segmen, pilih komposisinya di Remotion Studio dan klik Render.
- Pemasang hanya menambah metadata segmen; **tidak** mengubah script, gaya narasi, atau durasi video.

## Standar untuk add-on baru
Sertakan array `segments` opsional dalam `projects/<slug>/motiongraphic-video.json`, contohnya:
```json
"segments": [
  {"id":"ContohVideo-01-Hook","title":"01 - Hook","startFrame":0,"durationInFrames":120},
  {"id":"ContohVideo-02-Demo","title":"02 - Demo","startFrame":120,"durationInFrames":300}
]
```
- Semua ID harus unik untuk seluruh Master, terdiri dari huruf, angka dan `-`, dan mulai dengan huruf.
- `startFrame` mulai dari 0, urut, tanpa celah/overlap; jumlah frame harus sama dengan `durationInFrames` video.
- Semua segmen menggunakan **komponen `Video` yang sama** dengan `defaultProps` yang sama; jangan menduplikasi scene.
- Opsional `studioFolderName`: nama pendek untuk folder tampilan, misalnya `Windows-Hacks-5-Shortcut`. Nama folder cuma huruf/angka/tanda hubung (Remotion).
- Jika proyek tidak memiliki `segments`, tetap muncul sebagai folder berisi komposisi video lengkap saja.
- Jangan mengedit `src/Root.tsx` atau `library/catalog.json` secara manual: jalankan `npm run sync`.

## Pemeriksaan
- Diuji lokal: generator dua folder / 14 komposisi, validasi library, dan sinkronisasi Props segment ke manifest melalui unit test.
- Perlu diuji di komputer pengguna: browser Remotion, visual editing live, dan render Windows. Tidak ada MP4 baru dalam patch.
