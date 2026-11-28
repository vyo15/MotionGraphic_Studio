# VO Guide universal — REKAM SETELAH MOTION

**Tidak perlu merekam VO untuk memulai produksi.** Buat naskah sementara, storyboard, motion graphic, preview, revisi dan setujui visual terlebih dahulu. Baru rekam narasi dengan komposisi panduan.

**Bedakan:** overlay VO Guide satu baris pada motion preview (`showSubtitles`, Design System v2.1) dan komposisi rekaman `<ID>VOGuide` yang sudah ada. Keduanya tidak ditumpuk; desain rekaman legacy tidak diubah. Overlay guide OFF final/cover, tidak dihapus dari source.

1. Add-on yang didaftarkan melalui sync/dev mendapatkan `src/config/narration.json` apabila belum ada. Project lama hanya dimigrasikan secara opt-in melalui `npm run vo:init -- <slug>`.
2. Panduan muncul sebagai komposisi **`<ID>VOGuide`**, bahkan ketika naskahnya masih kosong (isi naskah agar terlihat). Video `<ID>` tidak mendapat overlay ini.
3. Pilih VO Guide di Remotion Studio dan buka Props. Pada objek `voiceGuide.beats`, ubah teks `text`, `scene`, atau rentang `startFrame`–`endFrame` (harus contiguous dari 0 hingga durasi). Save to code. Watcher menyimpan edit ke `narration.json` melalui sync otomatis; setelah sinkronisasi selesai, reload Studio dan periksa hasil. Fungsi penyimpanan menolak konflik jika naskah file juga berubah di luar Studio.
4. Jika Props Studio kurang nyaman, gunakan CLI tanpa membuka JSON: `npm run vo:edit -- <slug>` atau `npm run vo:edit -- <slug> --beat 2 --text "Narasi yang dibaca"`. Cadangan otomatis disimpan di `library/backups/vo-guide/`.
5. Naskah panjang dipecah menjadi beberapa kartu dalam satu beat sehingga kata tidak terpotong; durasi tetap mengikuti panjang beat. VO Guide hanya panduan, belum ada alignment kata otomatis.
6. Rekam natural. Masukkan audio final ke `projects/<slug>/public/audio/`; sync dan sesuaikan timing animasi/subtitle yang terpisah mengikuti rekaman. Render full `<ID>` untuk publikasi, bukan `VOGuide`.

**Batasan:** native Studio Props dapat mengubah value yang dikenali, tetapi perpindahan interaktif layer/kontrol naskah no-code menyeluruh harus diverifikasi di Windows. Sistem tidak membuat editor paralel. VO Guide belum transkripsi ASR atau waveform editor.

## CONTINUOUS VO LOCK — lintas scene

- Satu kalimat atau rangkaian ucapan yang alami boleh melintasi beberapa slide/scene. Batas visual bukan batas audio: jangan menambah silence, memotong suku kata, mengulang audio, atau memaksa VO berhenti untuk pergantian slide. Pertahankan jeda alami, napas, pitch, tempo, dan karakter rekaman yang telah ACC.
- Untuk full video gunakan satu aset VO utuh yang melintasi batas scene ketika rekaman bersambung. Catat global start, durasi/sampel, boundary visual dan offset lokal; segment preview boleh memakai slice dari sumber yang sama (tanpa gap atau overlap), dan nonaktifkan playback lokal jika track full aktif. Jangan memaksa arsitektur baru ke project ACC tanpa izin.
- Visual/subtitle/highlight menyesuaikan ucapan aktual; geser boundary visual bila diperlukan, bukan memotong narasi. Jika durasi berubah, ikuti NATURAL TIMING LOCK: manifest, full/segment, narration, VO Guide, SFX/typing, motion/spatial plan, thumbnail dan state konsisten; jaga timing lokal scene di luar scope.
- Analisis waveform/VAD hanya membuktikan aktivitas suara dan kandidat titik sambung, bukan transkripsi/timestamp kata. Gunakan ASR/forced alignment bila tersedia dan verifikasi terhadap rekaman; jika tidak, nyatakan provisional dan minta review MP4. Jangan mengklaim listening atau deteksi kata tanpa bukti.
- QA sebelum ACC: cek tidak ada gap buatan/duplikasi/cut, bandingkan sampel sumber dengan sambungan, cek batas slide, subtitle dan highlight, peak/loudness serta listening aktual. Pisahkan ACC referensi dari final/native QA. Hindari memproses ulang audio yang sudah disetujui tanpa kebutuhan.

## Motion Plan v1 setelah perubahan VO

Untuk video dengan `motionPlanContract: "focus-driven-v1"`, retiming/VO edit dapat membuat plan lama tidak cocok. Review tiap beat dan offset aksi/reaksi/hold, camera carry, subtitle dan SFX terhadap ucapan aktual; jalankan `node tools/qa-motion-plan.mjs projects/<slug> --fingerprint`, perbarui hash setelah review dan jalankan QA plan lagi. Tidak ada alignment ASR otomatis, tidak ada perubahan ACC tanpa izin. Sync normal tidak menimpa motion plan; validator strict dan QA eksplisit mengecek kesesuaian.

## Production Toolkit v1.0 — Master 2.0.0
Rujuk `PRODUCTION-TOOLKIT.md` untuk VO alignment dan approval QA. Flow dan gate produksi tetap dimiliki `../PRODUCTION-RULES.md`.
