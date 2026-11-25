# Panduan edit asset — folder-jadi-drive

## Mulai dari Studio, bukan VS Code
1. Backup folder project jika sudah ada; jangan replace Master. Jika folder belum ada, copy add-on utuh ke `projects/folder-jadi-drive/`.
2. Di root Master: `npm run sync`, lalu `npm run dev`.
3. Pilih Videos → Mengubah-Folder-Menjadi-Drive-Baru → Scenes → FolderJadiDrive-S01 ... FolderJadiDrive-S06. Full-Video untuk melihat urutan keseluruhan. VO-Guide terpisah untuk latihan setelah ACC.
4. Pada frame yang memperlihatkan layer, pilih nama layer di canvas/timeline, edit property yang Studio dukung, Save, reload, lalu cek Full-Video. Layer menggunakan `Interactive.G`/`Interactive.Text`, style inline, dan satu callsite per target; tidak dijamin setiap property dapat diedit via GUI sebelum uji.

## Kontrol layer
- 44 target teks literal (30 baris subtitle draft + 14 teks/label lain); 44 target visual, termasuk struktur folder, card, ikon, drive C/D, tombol keyboard, Explorer, clipboard, CMD, highlight, kursor, CTA dan cover. Lihat daftar eksak `production/editable-blueprint.json`.
- X/Y, scale, rotate dan opacity pengguna dipisah dari opacity/geometry animasi lama. Untuk grup UI, pilih grup terkait; primitive dekoratif seperti garis pemisah, tombol jendela, geometry SVG internal masih source-editable, bukan masing-masing target native yang dijanjikan.
- Jika menggeser Explorer sendiri, cek hotspot cursor pada setiap klik. `mainLayouts` menggeser/memperbesar seluruh visual scene beserta kursor bersama, tanpa memindah subtitle.
- Ikon Project: ganti `public/images/project-icon.png` dengan gambar rasio sama, lalu sync; atau isi `projectIconUrl` dengan URL gambar yang memang dapat diakses renderer. File ini satu artwork, bukan scene flattened.

## Props (gunakan Full-Video untuk default global)
| Kontrol | Fungsi |
|---|---|
| projectName | Nama Project pada diagram, drive hasil, cover |
| drive, folderPath | Huruf drive dan path sumber di CMD/clipboard |
| workFolderName, yearFolderName | Label jenjang folder |
| systemDriveName, sourceDriveName | Label disk C/D di Explorer |
| fileReport, fileDocuments, filePresentation | Isi daftar file/folder contoh |
| runCommand | Teks yang diketik dalam Run |
| terminalPrompt, terminalVersion, terminalCopyright | Konten contoh CMD |
| fontFamily, uiFontFamily | Font editorial, font UI Explorer |
| backgroundColor | Background seluruh video |
| subtitleX, subtitleY, subtitleFontSize, subtitleFontWeight, subtitleColor | Layout/warna subtitle global |
| showSubtitles | Hidup/matikan caption draft (CapCut HQ) |
| captionSource | native (default) atau narration (mengikuti JSON VO) |
| showVoGuide | Overlay panduan internal; default false; gunakan komposisi VO-Guide Master |
| motionRates | 6 angka, S01–S06: 1 = kecepatan normal; 1.1 lebih cepat |
| motionOffsets | 6 angka detik, S01–S06: 0 = default; positif menunda gerakan |
| mainLayouts | 6 objek {x,y,scale}, S01–S06; default 0,0,1 |
| cursorPathS02, cursorPathS05 | Key path dalam format [detik,x,y] dengan waktu menaik |
| projectIconUrl | Override asset dengan URL yang bisa diakses renderer, default kosong |

Perubahan kecepatan/offset tidak mengubah durasi scene atau subtitle; audit sinkronisasi sebelum render. Jika mengubah `drive`/`folderPath`, ubah juga label/narasi terkait bila diperlukan. Simpan Props dan jalankan sync agar Master menangkap perubahan. Keyframe detail seperti transform Project card dan easing masih source/config; belum diuji native keyframe editor. Tidak perlu mengubah Root secara manual.

## Subtitle dan VO
Default `native`: 30 baris literal memiliki target masing-masing; beat Swiss “Nah, ternyata bisa, loh!” memakai dua layer utama, tanpa subtitle duplikat. `src/config/narration.json` adalah naskah VO dan timing. Draft literal di `src/components/DraftCaptions.tsx` merupakan materialisasi naskah pada saat ini untuk edit klik; ubah teks draft tanpa mengubah naskah VO hanya jika disengaja. Setelah perubahan VO, gunakan `captionSource: narration` sementara atau sinkronkan teks/cue native kembali. `node projects/folder-jadi-drive/production/check-caption-sync.mjs` mendeteksi perbedaan; tidak menimpa hasil edit. Cover tidak punya subtitle. Setelah rekaman, sesuaikan cue dengan audio sebenarnya.

## Uji manual sebelum klaim 100% editable
Pilih target teks → edit → Save → reload; pilih ikon/kursor → drag/resize → Save → reload; ubah motion Props → Save/sync → cek full dan segment; render frame sebelum/saat/setelah klik. Periksa safe zone 250/350/50, layer tidak overlap, cursor benar, dan command tetap utuh. Pengujian GUI/native render belum dijalankan di sini.
