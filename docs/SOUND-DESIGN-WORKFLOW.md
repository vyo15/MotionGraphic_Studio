# Sound Design Director — workflow universal (Project Motion-Graphic)

> **Aturan utama sound terbaru:** `docs/SOUND-DIRECTION-RULES.md` v2.1. Dokumen ini adalah panduan implementasi operasional, bukan alasan memberi SFX pada setiap transisi. Tambahkan `production/SOUND-PLAN.md` saat storyboard; status dapat `planned`/`omit`. Cue saat visual sudah ACC harus memiliki impact frame, peran terhadap VO dan tail antar-scene. Jangan lupa CTA→Cover serta listening QA speaker HP.


**Tujuan:** kualitas SFX Reels/TikTok/Shorts, bukan membuat audio baru di setiap aksi. Video contoh pengguna `Download (2)(2).mp4` menunjukkan Openverse (pencarian), Real SFX (penempatan rekaman di frame), dan earshot (pembuatan/analisis SFX berbasis kode). Rincian pilihan berada di `skills/sound-design-director/SKILL.md`.

## Flow scene-first yang wajib
1. ChatGPT memberi ide dan membuat storyboard; tandai aksi yang secara nyata **membutuhkan** SFX. Sisakan jeda tanpa suara jika gerak kecil atau penjelasan membutuhkan tenang.
2. Bangun motion per scene. User review dan ACC; jangan mengubah source/lock scene demi sound design secara diam-diam.
3. Setelah scene ACC, susun cue pada `production/sound-cues.json`. Setiap cue punya `scene`, `action`, `startFrame`, `impactFrame`, `endFrame`, `status`, `file`, `source`; `file` relatif ke folder public. Tanpa file nyata, status = `planned`.
4. ChatGPT memilih **Openverse/rekaman asli** ketika relevan, **Real SFX** sebagai metode penempatan/mixing tepat frame, atau **earshot** opsional bila efek berbasis kode cocok. Hanya satu atau sedikit bunyi yang punya peran; bukan tiga sumber pada setiap scene.
5. File WAV/MP3 yang benar-benar dipakai disimpan di `public/audio/sfx/`; rekaman VO asli kemudian disimpan terpisah di `public/audio/voiceover/` setelah motion disetujui. Simpan source URL/licence/credit per cue. Jangan mengunduh/menyematkan media yang hak pakainya tidak jelas.
6. Lakukan penempatan setiap efek di source Remotion sebagai **track audio berlabel**; untuk clip tidak ada, source tidak boleh menyatakan siap dan validasi memberi FAIL ketika status ready.
7. Setelah VO direkam, atur level musik dan SFX relatif pada suara; pertimbangkan fade/duck. Periksa pada speaker HP, render, lalu ukur loudness/peak serta sinkronisasi frame dengan tools QA.

## Source Remotion 4.0.538 — tanpa dependency baru
Master aktual hanya menyediakan `remotion`, tidak memiliki `@remotion/media` atau `@remotion/sfx`. **Gunakan API versi terpasang.** Untuk efek terpisah yang asetnya benar-benar ada:

```tsx
import {Sequence, Html5Audio, staticFile} from 'remotion';

// Letakkan di dalam komposisi, bukan file Root generated.
<Sequence name="S02 — Click UI" from={120} durationInFrames={15}>
  <Html5Audio
    name="S02 — SFX Click"
    src={staticFile('videos/contoh-slug/audio/sfx/ui-click.wav')}
    volume={0.24}
  />
</Sequence>
```

Bila `@remotion/media` tersedia pada Master versi lain, ikuti dokumentasi paket itu untuk komposisi baru. Untuk sound level dinamis, `volume={(f) => ...}` didukung dan menampilkan curve di Remotion Studio. Gunakan `Sequence` dan data frame deterministik. Script audio-cue di `production/` adalah *metadata QA*; harus dicocokkan dengan source audio Remotion. Jangan klaim bahwa mengisi JSON otomatis menambahkan WAV ke renderer.

## QA
- `node tools/qa-sound-cues.mjs projects/<slug> --strict` memeriksa urutan frame, keberadaan file berstatus ready, dan metadata lisensi—tanpa render.
- `node tools/qa-render.mjs <path-final.mp4> --src projects/<slug>` menganalisis MP4: frame, loudness dan peak jika FFmpeg mendukung filter terkait. Gunakan pendengaran manusia untuk menilai karakter suara; statistik tidak dapat membuktikan efek terdengar natural.
- Jangan menggunakan angka LUFS tunggal sebagai bukti bagus. Target kerja awal untuk konten narasi biasanya sekitar −16 sampai −18 LUFS integrated dengan true peak tak lebih dari −1 dBTP, **hanya sebagai referensi pemeriksaan**, bukan hard rule; platform dapat menerapkan normalisasi sendiri.

## Arsip & hak cipta
File project menyimpan audio yang dipakai, cue, dan kredit. Render/QA/log eksternal tidak perlu ikut ZIP add-on. Tidak menyertakan suara dari video referensi atau demo pihak ketiga. `Openverse` bukan izin lisensi otomatis; cek di halaman asal tiap file. `Real SFX` adalah Skill Claude Code, bukan pengganti sound renderer Remotion. `earshot` adalah tool opsional dan keluaran WAV-nya harus disimpan sebagai aset project sebelum render.
