# Panduan Audio pada Remotion Studio

Audio/video sumber tinggal di `projects/<slug>/public/`. Path aset yang disinkronkan memakai pola Remotion `staticFile('videos/<slug>/audio/nama-file.wav')`. Jangan menaruh file audio langsung ke `public/videos/` karena itu hanya mirror hasil sync.

1. Masukkan file audio ke `projects/<slug>/public/audio/` (buat folder bila diperlukan).
2. Panggil `npm run sync` agar aset tersalin ke mirror.
3. Buka Remotion Studio, pilih komposisi video, dan gunakan Props yang disediakan project (`audioTimeline`, `voice`, `musicVolume` bila ada) untuk mengatur path sumber, start frame, trim, durasi, volume dan mute.
4. Jalankan preview; sinkronkan awal voice-over dan subtitle yang ada dengan nomor frame. Di 30 fps, 30 frame = 1 detik.
5. Render final via Remotion. Periksa suara hasil MP4 dan pastikan semua lisensi media sesuai penggunaan.

**Batasan:** paket ini tidak menyertakan DAW/editor suara drag-and-drop atau transkripsi otomatis. Ketersediaan Props dan kemampuan edit tiap audio mengikuti implementasi video, dan UI bukan waveform multitrack.
