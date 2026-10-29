# WINDOWS HACKS — 5 SHORTCUT WINDOWS

**Komposisi:** `WindowsHacks5ShortcutLengkap` | **Slug:** `windows-hacks-5-shortcut-lengkap` | 1080×1920 · 30fps · 2205 frame.

## Edit hanya dengan Remotion Studio

1. Buka Master melalui `01-BUKA-STUDIO.bat`, lalu pilih komposisi `WindowsHacks5ShortcutLengkap` di Remotion Studio.
2. Pilih scene/objek `Interactive` untuk perubahan visual yang memang didukung oleh Inspector. Tidak semua elemen CSS/animasi computed dapat di-drag.
3. Gunakan panel **Props** → `sceneEditor` → scene (misalnya `CTRL_SHIFT_ESC`) untuk mengubah nilai teks pada `copy` dan beberapa parameter layer. Untuk kursor pengganti, gunakan **Props → `cursorEditor`** (aktifkan pada scene yang dipilih, atur koordinat titik awal, akhir dan klik). Ini merupakan kursor pengganti, bukan menyesuaikan otomatis semua objek Windows UI.
4. Gunakan 💾 **Save props to code** dalam Remotion Studio bila ingin menyimpan Props. Pada `npm run sync`/restart berikutnya, Master memindahkan nilai itu secara aman ke `motiongraphic-video.json` (jika hanya Props yang berubah), agar tidak tertimpa registrasi otomatis. Perubahan langsung pada elemen `Interactive` mengikuti penyimpanan native Remotion.
5. Klik **Render** pada Remotion Studio untuk membuat MP4. File sumber video dan audio tetap berada di dalam folder project ini.

## Audio

File `public/audio/00-hook.wav` hingga `06-cta.wav` pada paket lama berupa placeholder hening. Ganti rekaman aslinya, kemudian set `voice.enabled=true` melalui Props, atau gunakan track `audioTimeline` dengan `src` relatif ke folder `public` proyek (misalnya `audio/00-hook.wav`). Jangan edit mirror Master `public/videos/...`.

## Editabilitas dan batas

Source React/DOM/SVG, UI Windows dan animasi yang telah ada tetap dipertahankan. Bagian yang tergantung `interpolate`, CSS variable atau struktur HTML non-`Interactive` **belum semuanya editable langsung di Studio**. Video ini tidak ditulis ulang/di-flatten demi menjaga visual. Tidak ada server visual kursor terpisah atau Easy Editor pada Master v1.8.1.

Dokumen `EDIT-MAP-V4.md`, `VOICEOVER-CUES.md` dan catatan revisi lain adalah referensi historis. Panduan terbaru yang berlaku adalah README ini dan `../../PANDUAN-REMOTION-STUDIO.md`.
