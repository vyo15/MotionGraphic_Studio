# Pengaturan Audio dalam Remotion Studio (tanpa editor kedua)

1. Copy berkas MP3 / WAV yang benar ke `projects/<slug>/public/audio/`.
2. Jalankan `npm run sync` dari Master atau tutup lalu buka Studio dengan launcher.
3. Dalam Remotion Studio pilih video → **Props** → `audioTimeline`. Untuk track yang tersedia, isi `src` = `audio/nama.wav`, `enabled = true`, dan `muted = false`.
4. Sesuaikan `startFrame`, `trimStartFrames`, `durationFrames`, dan `volume` (0..1). Audio track akan masuk preview dan render dari props yang sama bila disimpan melalui Remotion Studio.
5. Tekan Play, dengarkan timing dan gunakan Render bawaan Remotion.

Tidak ada waveform drag khusus atau upload otomatis dalam paket ini. Untuk menambah jumlah track secara permanen di template, perlu mengembangkan Props/manifest add-on; opsi audio native Remotion dapat dipakai melalui UI Remotion yang tersedia pada versi terpasang.

Catatan: tujuh WAV pada projek Windows Hacks merupakan placeholder 0,1 detik hening, **bukan voice-over jadi**. Teks/subtitle tidak otomatis diselaraskan oleh editor ini. Aset sumber **bukan** `public/videos/<slug>/` karena folder itu mirror yang akan tersinkron ulang.
