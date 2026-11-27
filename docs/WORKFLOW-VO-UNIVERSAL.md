# VO Guide universal — REKAM SETELAH MOTION

**Tidak perlu merekam VO untuk memulai produksi.** Buat naskah sementara, storyboard, motion graphic, preview, revisi dan setujui visual terlebih dahulu. Baru rekam narasi dengan komposisi panduan.

1. Setiap add-on baru yang diimpor mendapatkan `src/config/narration.json` apabila belum ada. Project lama hanya dimigrasikan secara opt-in melalui `npm run vo:init -- <slug>`.
2. Panduan muncul sebagai komposisi **`<ID>VOGuide`**, bahkan ketika naskahnya masih kosong (isi naskah agar terlihat). Video `<ID>` tidak mendapat overlay ini.
3. Pilih VO Guide di Remotion Studio dan buka Props. Pada objek `voiceGuide.beats`, ubah teks `text`, `scene`, atau rentang `startFrame`–`endFrame` (harus contiguous dari 0 hingga durasi). Save to code. Watcher menyimpan edit ke `narration.json` melalui sync otomatis; setelah sinkronisasi selesai, reload Studio dan periksa hasil. Fungsi penyimpanan menolak konflik jika naskah file juga berubah di luar Studio.
4. Jika Props Studio kurang nyaman, gunakan CLI tanpa membuka JSON: `npm run vo:edit -- <slug>` atau `npm run vo:edit -- <slug> --beat 2 --text "Narasi yang dibaca"`. Cadangan otomatis disimpan di `library/backups/vo-guide/`.
5. Naskah panjang dipecah menjadi beberapa kartu dalam satu beat sehingga kata tidak terpotong; durasi tetap mengikuti panjang beat. VO Guide hanya panduan, belum ada alignment kata otomatis.
6. Rekam natural. Masukkan audio final ke `projects/<slug>/public/audio/`; sync dan sesuaikan timing animasi/subtitle yang terpisah mengikuti rekaman. Render full `<ID>` untuk publikasi, bukan `VOGuide`.

**Batasan:** native Studio Props dapat mengubah value yang dikenali, tetapi perpindahan interaktif layer/kontrol naskah no-code menyeluruh harus diverifikasi di Windows. Sistem tidak membuat editor paralel. VO Guide belum transkripsi ASR atau waveform editor.

## Motion Plan v1 setelah perubahan VO

Untuk video dengan `motionPlanContract: "focus-driven-v1"`, retiming/VO edit dapat membuat plan lama tidak cocok. Review tiap beat dan offset aksi/reaksi/hold, camera carry, subtitle dan SFX terhadap ucapan aktual; jalankan `node tools/qa-motion-plan.mjs projects/<slug> --fingerprint`, perbarui hash setelah review dan jalankan QA plan lagi. Tidak ada alignment ASR otomatis, tidak ada perubahan ACC tanpa izin. Sync normal tidak menimpa motion plan; validator strict dan QA eksplisit mengecek kesesuaian.

## Production Toolkit v1.0 — Master 2.0.0
See `docs/PRODUCTION-TOOLKIT.md` for spatial-plan, camera helpers, VO alignment and approval QA; production flow and gate are owned by `PRODUCTION-RULES.md`.
