# Debloat Windows 11 — Scene 01–05 (editable)

Add-on **folder-first** untuk MotionGraphic Studio Master v1.8.1. Project ini **tetap ID dan slug lama**:
- ID: `DebloatWindows11Opening`
- Folder / slug: `debloat-windows11-opening`
- Entry: `src/Video.tsx` → `export const Video`
- 1080×1920, 30 fps, **77 detik / 2310 frame**. Seluruh efek deterministik terhadap frame.

**Paket ini menggantikan folder Debloat sebelumnya secara utuh**, bukan menambah proyek baru. Source serta aset Scene 01–04 dipertahankan byte-for-byte. Yang ditambahkan adalah Scene 05, konfigurasi, komponen, audio hening, dan dokumen.

## Komposisi

| ID komposisi | Isi | Durasi |
| --- | --- | ---: |
| `DebloatWindows11Opening` | S01 + S02 + S03 + S04 + S05 | 77 detik |
| `DebloatWindows11Opening-S01` | Opening | 8 detik |
| `DebloatWindows11Opening-S02` | Xbox / Bing Search / Copilot | 15,5 detik |
| `DebloatWindows11Opening-S03` | Tong sampah / GitHub Stars | 15 detik |
| `DebloatWindows11Opening-S04` | PowerShell / Progress Bar / WinUtil | 15 detik |
| `DebloatWindows11Opening-S05` | Restore Point / Tweaks / AppX Removal | 23,5 detik |

## Instalasi dan pembaruan

1. Jika pernah mengedit folder `MotionGraphic-Studio/projects/debloat-windows11-opening/`, **cadangkan** versi tersebut sebelum menggantinya.
2. Ekstrak ZIP hingga terlihat satu folder `debloat-windows11-opening/` yang di dalamnya ada `motiongraphic-video.json`.
3. Salin **foldernya**, bukan isinya saja, ke `MotionGraphic-Studio/projects/`. Ganti folder Debloat lama; **jangan** menyalin file ke `src/` atau `public/` root Master.
4. Dari root Master jalankan `npm run sync` (atau `npm run dev`). Tidak perlu mengubah registrasi master secara manual.
5. Buka komposisi `DebloatWindows11Opening-S05` untuk mengedit khusus Scene 05, atau `DebloatWindows11Opening` untuk video gabungan.

## Scene 05 dan pengeditan

**Voice-over Scene 05:** “Setelah terbuka, buat Restore Point dulu. Terus masuk ke Tweaks, pilih pengaturan yang dibutuhkan. Kalau mau hapus aplikasi bawaan, buka AppX Removal, lalu pilih aplikasi yang nggak dipakai.”

Visual dan beat mengikuti preview yang disetujui:
- 0–1,73s: WinUtil terbuka dari akhir Scene 04.
- 1,73–8,9s: Tweaks → Create Restore Point → Run Tweaks → progress ilustratif.
- 8,9–13,72s: pilih **hanya** satu contoh tweak, tidak memilih semua.
- 13,72–23,5s: AppX Removal → pilih Xbox App dan Microsoft Copilot. **Tidak mengklik Remove Selected**.

**Yang editable:** heading, subtitle, label tombol dan tab, teks UI (via source; label penting memiliki layer Interactive), kotak centang, jendela WinUtil, progres, kursor, warna, posisi, jalur gerakan, dan timing. Lihat `SCENE-05-EDITABLE-LAYER-MAP.md` dan `PANDUAN-EDIT-ASSET.md`.

`src/scenes/Scene05.tsx` memuat judul dan subtitle literal dalam `Interactive.Div`, untuk editing teks via editor yang mendukung. `src/components/Scene05WinUtil.tsx` menyediakan UI sebagai layer React/HTML/SVG, bukan satu screenshot/video datar. `src/config/scene05.ts` memuat posisi, durasi, keyframe kursor, dan ambang transisi, sedangkan `src/animations/scene05.ts` mengatur easing. Pengeditan parameter dari source membutuhkan penyimpanan file; jangan menganggap semua layer React otomatis drag-and-drop pada Master.

## Audio

`public/audio/voiceover-scene05.wav` adalah **placeholder 24 detik hening**, bukan VO asli. Rekam sesuai naskah, gantikan file dengan nama yang sama, lalu aktifkan Props `voiceEnabled=true`. Sesuaikan timing subtitle dan animasi dengan rekaman asli. Seluruh scene memakai default `voiceEnabled=false` karena belum ada VO.

## Batasan dan keamanan

- UI WinUtil adalah **simulasi grafis** mengacu pada preview, tidak menjalankan perubahan Windows; detail dapat berbeda menurut versi WinUtil.
- Progress bar pembuatan Restore Point bersifat ilustratif; bukan klaim output yang selalu sama.
- Hanya aplikasi contoh Xbox App dan Copilot yang dipilih. Jangan menghapus komponen sistem/layanan sign-in tanpa memahami dampaknya.
- Preview eksternal `preview-scene05-winutil-restore-tweaks-appx-v1.mp4` adalah **referensi visual**; bukan render sumber editable yang baru.
- Uji registrasi, validasi aset, cek kontrak teks dan layout berhasil. Rendering Remotion, tes drag-and-drop/simpan/reload di Windows dan sinkronisasi VO asli **belum terverifikasi**. Lihat `VALIDASI.md`.

Dokumentasi UI: https://winutil.christitus.com/guides/getting-started/ dan https://github.com/ChrisTitusTech/winutil.


---

## Update Scene 06 — Penutup dan CTA final (11 November 2026)

Paket terbaru menambahkan **Scene 06 + CTA** pada **proyek yang sama**; ID/slug tetap `DebloatWindows11Opening` / `debloat-windows11-opening`.

- Gabungan S01–S06: **2827 frame / 94,23 detik** pada 30 FPS.
- S06: **517 frame / 17,23 detik**; mulai pada frame **2310**.
- Komposisi preview tersendiri: `DebloatWindows11Opening-S06`.
- Scene S01–S05 bersumber dari ZIP sebelumnya dan tidak dimodifikasi, kecuali registrasi lewat `src/Video.tsx`, `src/SegmentVideo.tsx`, dan manifest.

**VO final S06:** “Tapi jangan asal hapus semuanya, ya. Selesai! Restart kalau diperlukan. Menurut kamu, debloat Windows perlu nggak sih? Coba tulis di kolom komentar!”

**Visual:** WinUtil/AppX selektif → proses ilustratif → Windows 11 Power > Restart (tidak diklik) → animasi tipografi dan kartu *PERLU / NGGAK* yang menyatu menjadi bubble komentar. Bagian CTA **tidak memakai simulasi Windows atau kolom komentar palsu**.

**File baru:** `src/scenes/Scene06.tsx`, `src/components/Scene06Windows.tsx`, `src/components/Scene06CTA.tsx`, `src/components/Scene06Pointer.tsx`, `src/config/scene06.ts`, `src/animations/scene06.ts`, dan `public/audio/voiceover-scene06.wav` (hening sementara).

Cara menggunakan: ganti hanya **folder proyek Debloat** lama dengan folder utuh dari ZIP terbaru di `MotionGraphic-Studio/projects/`, lalu jalankan `npm run sync` atau `npm run dev`. Folder proyek lain tidak ikut dimasukkan ke ZIP.

Untuk nama layer, timing, pengeditan, dan batasan hasil uji, lihat `SCENE-06-EDITABLE-LAYER-MAP.md` dan bagian akhir `VALIDASI.md`.
