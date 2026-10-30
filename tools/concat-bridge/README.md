# MotionGraphic Studio -> Concat (CHANGE ONLY)

Ini **bukan Studio baru**. Script export di `tools/export-concat-segments.mjs` memecah satu komposisi Remotion menjadi 3 file video **HOOK / ISI / CTA**, lalu kamu menggabungkannya di Concat. Source dan seluruh project lama tetap ada. Tidak memerlukan library npm tambahan.

## Instalasi patch aman

1. Backup Master sebelumnya.
2. Ekstrak ZIP CHANGE ONLY di lokasi sementara.
3. **Copy folder `tools/` dari hasil ekstrak ke Master `MotionGraphic-Studio/`, pilih merge, bukan mengganti folder `tools/` seluruhnya.** Patch ini hanya menambah satu script dan satu folder dokumentasi.
4. Dari terminal di Master jalankan:

```powershell
node tools/export-concat-segments.mjs --project windows-hacks-5-shortcut-lengkap --dry-run
```

Jika pembagian sudah benar, render:

```powershell
node tools/export-concat-segments.mjs --project windows-hacks-5-shortcut-lengkap
```

Jika ingin semua audio dibuat ulang di Concat, gunakan `--mute-remotion`. Tanpa opsi itu, audio/SFX Remotion yang sudah ada ikut terdengar pada MP4. Untuk **revisi satu bagian saja**, tambahkan `--only HOOK`, `--only ISI`, atau `--only CTA`.

Hasilnya berada di:

```text
MotionGraphic-Studio/out/concat/windows-hacks-5-shortcut-lengkap/<tanggal>/
  01-HOOK.mp4
  02-ISI.mp4
  03-CTA.mp4
  concat-timeline.json
  BACA-SEBELUM-UPLOAD.txt
  AUDIT-ASET-MEDIA.md
```

## Pembagian otomatis video 5 Shortcut Windows

Script membaca `defaultProps.audioTimeline` pada `motiongraphic-video.json`, sehingga tidak perlu mengubah kode. Pada manifest v1.8.1 publik yang diperiksa:

- HOOK: frame 0-239 = 8 detik
- ISI: frame 240-2084 = 61,5 detik
- CTA: frame 2085-2204 = 4 detik
- Total: 2205 frame, 73,5 detik pada 30 FPS.

Kalau video di PC punya timing berbeda, manifest lokal yang dipakai sebagai acuan, bukan angka lama dari dokumentasi ini. Pastikan durasi visual memang selaras dengan cue HOOK/CTA sebelum render.

Jika ingin mengatur ulang batas pemisahan dengan angka detik (tanpa mengedit manifest):

```powershell
node tools/export-concat-segments.mjs --project windows-hacks-5-shortcut-lengkap --hook-end 8 --cta-start 69.5
```

## Finishing di Concat

1. Buat project vertikal **1080×1920, 30 FPS**.
2. Impor `01-HOOK.mp4`, `02-ISI.mp4`, dan `03-CTA.mp4` berurutan di track visual utama, tanpa celah.
3. Impor atau rekam suara sendiri pada track audio terpisah. Rapikan timing dan jeda.
4. Jalankan fitur caption otomatis dari GUI Concat menggunakan voice-over yang sudah final. Pilih model/language yang mendukung Bahasa Indonesia bila tersedia. Periksa ejaan dan timing kata teknis.
5. Atur subtitle di safe zone bawah tanpa menabrak elemen UI video. Musik dan SFX tetap track terpisah bila ingin diedit penuh.
6. Export satu MP4 final H.264. Simpan project Concat di folder finishing yang berbeda dari source Remotion.

Saat revisi animasi, render ulang bagian yang berubah saja, lalu ganti file media terkait di Concat dengan hati-hati, cek lagi timing dan caption. Belum ada jaminan auto-relink timeline secara otomatis.

## Tidak mengubah

- `src/Root.tsx`, `src/index.ts`, `package.json`, `library/catalog.json`.
- `projects/<slug>/` scene, konfigurasi, atau aset video lain.
- Format registrasi otomatis dari `npm run dev` / `npm run sync` (script menjalankan tool sync milik master bila tersedia).

## Batas validasi

Script diperiksa sintaks dan dry-run dengan fixture manifest serupa. Render nyata di Windows dan integrasi GUI Concat belum teruji pada perangkatmu. Validasi hak cipta aset yang sudah ada juga tidak otomatis dilakukan.

## Audit hak cipta otomatis (inventaris, BUKAN jaminan)

Setiap export menghasilkan `AUDIT-ASET-MEDIA.md` yang mencatat nama file media di `public/`. Semua berstatus **belum diverifikasi** karena status legal tidak bisa dipastikan hanya dari nama file. Checklist berisi kebijakan musik, gambar, font dan merek ada di `CHECKLIST-HAK-CIPTA.md`. Source React/SVG di `src/` juga tetap harus diperiksa jika mengandung logo/ikon pihak ketiga.
