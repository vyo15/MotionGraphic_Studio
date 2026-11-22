# Standar universal — Scene editing dan Sound Design

**Berlaku pada semua add-on baru yang dibuat ChatGPT.** Satu Master Remotion, scene-first approval, rekam VO setelah motion ACC.

## 1. Hindari gabungan +N instances

- Untuk objek *yang dijanjikan editable sendiri*: letakkan `<Interactive.Div>`, `<Interactive.G>`, atau `<Interactive.Text>` **langsung di JSX scene dengan deklarasi terpisah**. Nama manusiawi dan unik (`S01 — Judul`, `S01 — Flashdisk`). Jangan membuat satu komponen `Layer` mengembalikan `<Interactive.G>` lalu memanggilnya berulang-ulang untuk beberapa objek: Remotion Studio bisa menggabungkannya sebagai `+N instances`.
- Abstraksi tetap boleh dipakai untuk bagian **visual biasa**, fungsi animasi, serta fungsi geometry. Prinsipnya: pemanggilan `Interactive` yang benar-benar ingin diedit tersendiri harus berada pada lokasi kode JSX berbeda.
- Pengulangan UI yang memang satu konsep (contoh: kepingan efek pecah, daftar kartu ISO) boleh menjadi **satu kelompok semantik**, jangan menjanjikan tiap unsur sebagai native-editable tersendiri bila belum ditulis terpisah.
- Jangan menempelkan `Interactive` parent pada satu objek yang juga mempunyai anak `Interactive` aktif jika seleksi bentrok. Pakai parent `<g>` biasa dan child native individual.
- Gunakan `interpolate()` dengan array input/output literal langsung di properti editabilitas untuk keyframe; letakkan transform bawaan visual dan user offset pada layer terpisah sehingga edit posisi tidak merusak animasi. API ini hanya digunakan saat versi Remotion Master mendukungnya.
- Beda kelas QA: **source/Props editable**, **Studio selectable**, dan **Studio Save→reload→render teruji**. Hitungan `<Interactive>` bukan bukti editabilitas penuh.

## 2. Sound menurut aksi, bukan semua gerakan

**Sumber aturan:** `docs/SOUND-DIRECTION-RULES.md` v2.1. Wajib mempertimbangkan SFX **atau silence** per beat/transisi, voice-first mixing, audio continuity, CTA→Cover, anti-duplikasi, keterlacakan aset/lisensi, dan listening QA. Sound plan di `production/SOUND-PLAN.md` (starter); cue final di JSON. `endFrame` cue **inklusif** pada implementasi SceneSoundCues existing, sedangkan beat VO Guide berakhir eksklusif.


- Buat `production/sound-cues.json` sebelum render. Setiap cue punya `scene`, `action`, `startFrame`, `impactFrame`, `endFrame`, `file`, `gainDb`, `source`/lisensi, dan status.
- Buat SFX hanya untuk trigger yang bermakna: klik pada UI, file benar-benar pindah, status berhasil, perubahan state, benturan yang terlihat. Jangan membuat whoosh generik di setiap transisi.
- Lebih baik banyak *one-shot* pendek yang disetel per frame daripada satu WAV panjang diputar tanpa kontrol sepanjang scene. Hindari memutar one-shot yang sama dari dalam scene **dan** dari root Video.
- Setiap aset SFX berada di `public/audio/sfx/`; gunakan `staticFile('videos/<slug>/audio/sfx/<filename>')` setelah sync. Tanpa tambahan renderer.
- Biarkan waktu audio punya ruang untuk VO natural yang akan direkam setelah motion ACC. SFX harus rendah, tidak menutupi vokal. Pada fase final cek mix, true peak, dan audio silent spot dari MP4 yang benar-benar dirender.
- Lisensi rekaman pihak ketiga harus dilacak; buat/rekam SFX asli bila lebih tepat. Jangan mengklaim kualitas atau kesesuaian sudah lulus tanpa mendengar preview nyata.

## 3. Checklist ChatGPT sebelum mengirim video baru

1. Storyboard per scene → prototype/review → ACC → kunci visual yang disetujui.
2. Buat named `Interactive` layer yang independen; tulis Layer Blueprint berisi objek dan edit yang ditawarkan.
3. Tambahkan cue audio yang relevan, tidak ada aset kosong, tidak ada tumpang-tindih audio tak disengaja.
4. Validasi: `npm run qa:layers -- --strict <project-directory>`, `npm run qa:sound -- <project-directory> --strict`, `npm run addon:validate -- <folder>` sesuai CLI aktual.
5. Uji preview, perubahan teks/posisi/keyframe, Save, reload, dan render bila GUI tersedia. Bila belum tersedia, laporkan **belum terverifikasi**, jangan mengklaim 100% native editable.
6. Delivery satu ZIP add-on; revisi terbatas berbasis patch/konflik aman. Motion dahulu, VO rekaman belakangan.

Acuan resmi: https://www.remotion.dev/docs/studio/interactivity-best-practices dan https://www.remotion.dev/docs/interactive.
