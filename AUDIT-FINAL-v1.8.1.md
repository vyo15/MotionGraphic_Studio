# Audit menyeluruh patch CHANGE ONLY — 30 Oktober 2026

Sumber: `MotionGraphic-Studio-Master-v1.8.1-20261030-075343.zip` (797 entri, CRC valid).

## Sudah diperbaiki dalam patch

1. **Kesalahan batas CTA pada IP Address**: konfigurasi sebelumnya memulai CTA di frame 597, tetapi `EndScene` mulai di frame 522 sesuai manifest. Kini 522 sehingga seluruh CTA termasuk dalam hasil 03-CTA.mp4.
2. **Path Concat tidak konsisten**: hasil handoff kini stabil di `out/concat/<slug>/current/`, bukan folder tanggal baru pada setiap render.
3. **Hasil lama rentan tertimpa**: semua bagian dibangun di staging; paket lama dipindah ke `history/` setelah proses berhasil. Jika render gagal, `current/` tidak diganti. Rename gagal akan dicoba rollback.
4. **`--only` tidak punya paket lengkap**: revisi satu bagian kini menyertakan dua bagian lainnya dari `current/` dan menolak jika timing/resolusi/audio tidak sama.
5. **Audio dan hak cipta**: handoff default tanpa audio Remotion. SFX lama hanya ikut bila operator memilih `--with-remotion-audio`. Audit aset yang belum terverifikasi dan template bukti lisensi tetap tersedia.
6. **Instalasi Concat**: `npm run concat` tetap hanya clone/build source, bukan menjalankan installer app. Clone ditetapkan tag v0.2.8, dilakukan melalui folder sementara agar unduhan gagal tidak meninggalkan clone setengah jadi. Launcher memeriksa kecocokan commit build.
7. **Pemeriksaan status Concat** tidak lagi mengubah `.gitignore` hanya karena `npm run concat:status` dipanggil.
8. **Dokumentasi terputus**: panduan flow yang disebut README ternyata belum ada dalam ZIP sumber; kini dibuat dan dimasukkan ke daftar arsip ZIP Master.
9. **Tes regressi**: pengujian simulasi pembagian, revisi parsial, preservasi lisensi, kegagalan render, serta pemulihan ditambahkan.

## Dipertahankan tanpa perubahan

Semua JSX scene, aset audio/gambar asli, `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, manifest asli, ID/slug, ZIP/arsip historis, struktur skill, dan tool produksi video yang tidak terkait. `projects/ip-address/concat-segments.json` hanya perubahan penanda CTA, bukan source animasi.

## Temuan yang perlu pemeriksaan nyata sebelum mengklaim tuntas

- **Lima temuan kualitas visual Windows Hacks**: frame 382 halo klik terletak relatif di dalam kursor (tidak otomatis offscreen di layar penuh); frame 690 zoom-detail menuju result; frame 1020 keyboard screenshot vs clipboard result; frame 1800 zoom nama folder vs recap; frame 2145 bookmark vs foto kreator berada di parent DOM berbeda. Keempat pasangan kemungkinan bukan overlap simultan, atau beda sistem koordinat. Tidak mengubah JSX tanpa pembuktian visual. Wajib cek frame render dan beberapa frame sebelum/sesudah.
- **Editabilitas**: masih ada elemen ekspresi computed dan sebagian elemen tidak Interactive. Belum dinyatakan 100% draggable. Pemeriksaan nyata pada Remotion Studio wajib.
- **Concat Windows**: clone/build Rust, keberadaan semua DLL native, GUI, Whisper bahasa Indonesia, dan export H.264 belum diuji pada mesin Windows ini.
- **Render/MP4 nyata**: lingkungan audit tidak memiliki dependensi Remotion yang dapat dipasang tuntas; belum ada pengujian browser/frame-output nyata.
- **Hak cipta**: tidak dapat disertifikasi otomatis, perlu audit bukti lisensi tiap aset untuk semua platform.

**Penilaian:** masalah alur dan integritas data yang ditemukan telah diperbaiki; isu kualitas visual, toolchain Windows, dan lisensi tetap berstatus pemeriksaan manual yang harus dilakukan sebelum publikasi.
