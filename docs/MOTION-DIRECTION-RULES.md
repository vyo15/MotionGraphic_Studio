# MOTIONGRAPHIC STUDIO — MOTION DIRECTION RULES v3.0 — FOCUS-DRIVEN & SEMANTIC CHOREOGRAPHY

**Tujuan:** kualitas motion Easy2Boot menjadi standar *prinsip*, bukan salinan efek. Berlaku default untuk video baru; tidak membuka scene ACC tanpa permintaan.

## 1. Grammar per beat

**PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI.** Tentukan dulu *apa yang berubah pada pemahaman penonton*. Jika objek hanya datang-pergi tanpa menjelaskan proses, kurangi atau ganti gerakan. Tiap scene harus punya **poin masuk**, satu fokus utama, dan **poin keluar** yang dirancang sebelum animasi dibuat.

| Tahap | Pertanyaan sutradara | Pemeriksaan |
|---|---|---|
| Pesan | Satu hal apa yang ingin dipahami? | Bisa diringkas satu kalimat |
| Objek | Komponen apa yang mewakili topik? | Bisa dilihat, bukan hanya teks |
| Pemicu | Kenapa gerakan mulai sekarang? | Sesuai narasi/peristiwa |
| Aksi | Gerak apa yang bermakna? | Realistis sesuai mekanisme |
| Reaksi | Akibat yang terlihat? | Tidak mendahului pemicu |
| Hasil | Apa kondisi berbeda? | Ada bukti state akhir |
| Hold | Berapa lama perlu dipahami? | Visual memberi waktu baca |
| Transisi | Mengapa scene berikutnya muncul? | Hubungan bentuk/posisi/arah/konteks |

## 2. Ritme dan easing pada 30 FPS

Angka berikut **panduan awal**, bukan keharusan: entrance 0,25–0,5 dtk (~8–15 frame); transisi ringan 0,3–0,6 dtk (~9–18 frame); meaningful hold ±0,8–2 dtk (~24–60 frame). *Beat bridge* dapat lebih panjang bila menyampaikan informasi (seperti USB Match Move Easy2Boot). Narasi asli, hasil pembacaan di HP, dan source ACC lebih prioritas daripada durasi default.

- Gerakan penting memiliki **anticipation → action → follow-through**: mulai terarah, akselerasi wajar, menyentuh target, bereaksi, lalu stabil. Boleh memakai `spring` atau interpolasi kurva yang dirancang, jangan semua benda memantul.
- **Progressive reveal:** tampilkan satu perubahan penting per beat; UI dibuka, tombol dipilih, proses terjadi, hasil ditahan. Hindari entrance serentak tanpa hierarki.
- **Camera intent:** pan/zoom hanya saat mengikuti target atau menjelaskan hubungan/skala. Jangan zoom berulang untuk menyembunyikan UI salah atau mempercepat VO. Pastikan tidak memangkas teks/objek penting.
- **Continuity:** urutan pilihan: same object/carry → match move → match cut/bentuk/warna → motivated cut. Fade boleh digunakan bila sesuai ritme; jangan paksakan semua transisi memakai benda yang sama. Posisi akhir scene A harus kompatibel dengan posisi awal B, termasuk overlap frame dan status objek.
- **Status/penghitungan waktu:** jangan tampilkan hasil sukses sebelum tindakan benar terjadi. Jika memperlihatkan masa depan sebagai simulasi, beri konteks jelas sebelum kembali ke proses saat ini.
- **Keselamatan visual:** hindari flash berkedip, shake ekstrem, gerak cepat tanpa hold, atau ornamen tak perlu. Keterbacaan lebih penting daripada jumlah efek.

## 3. Pemilihan teknik otomatis sesuai topik

| Konten | Teknik utama | Yang wajib dieksekusi |
|---|---|---|
| Windows/software | Living Screencast | UI/shortcut/tombol/menu/feedback akurat; hotspot klik benar |
| SOP/prosedur | Instruction Manual | Urutan fisik yang dapat diikuti, indikator status |
| KPI/Excel/data | Data Storytelling | Nilai nyata, skala/label jujur, satu insight setiap beat |
| Jaringan/mekanisme | Precise Mechanism | Aliran, hubungan komponen, sebab→akibat bisa diikuti |
| Hook konsep/angka | Swiss Motion | Grid, tipografi presisi, peralihan fokus terencana |

Teknik boleh dicampur dengan selektif. Impact Stamp/Card Break/Fold & Unfold/Match Move dari Easy2Boot **opsional**, bukan preset wajib. Jangan menyalin aset referensi pihak ketiga.

## 4. Realisme, state, dan teknik Remotion

- Untuk tutorial, storyboard wajib menyebut *state awal*, trigger yang dilakukan pengguna, *state setelah aksi*, serta screenshot/UI/OS yang dijadikan referensi. Perintah seperti `shutdown` memiliki akibat nyata; ilustrasi harus benar secara sebab-akibat.
- Animasi memakai `useCurrentFrame`, `interpolate`, `spring`, `Sequence` dari Remotion yang terpasang; timing deterministik dan sama saat preview/render. Tidak menggunakan random tanpa seed, `setInterval` atau animasi CSS yang berjalan bebas pada layer utama.
- **Source-editable ≠ Studio-draggable.** Layer penting diberi nama dan dipisahkan. Pisahkan posisi dasar, offset pengguna, dan transform animasi. Uji drag/save/reload bila mengklaim editable di Studio. Jangan menyembunyikan properti kunci pada komponen yang tidak dapat diseleksi.
- SFX dipasang pada aksi yang benar-benar terjadi, bukan *whoosh* otomatis. Mix dan cue merujuk `docs/SOUND-DIRECTION-RULES.md`.
- Untuk transisi yang membawa objek, rencanakan **sound handoff** juga (tail, audio bridge atau silence yang disengaja), bukan sekadar visual match-move. Aturan lengkap mapping, anti-duplikasi, voice-first mix, serta CTA→Cover: `docs/SOUND-DIRECTION-RULES.md`.

## 5. Checklist scene handoff dan cover

Sebelum scene diserahkan, tulis: waktu & frame, pesan, naskah/beat, visual masuk, puncak aksi, hasil, hold, visual keluar, objek pembawa continuity, teks penting, layer editable, dan status ACC. Pastikan tidak ada gap/overlap yang menyebabkan flash kosong atau double objek. Simpan keputusan di `STORYBOARD.md` dan status di `PRODUCTION-STATE.json` pada project baru.

**Scene cover terakhir** setelah CTA berisi ringkasan **mini-demo 1–3 aksi**, judul singkat, hero object, hold 1–2 dtk. Simpan nomor still frame jika siap ekspor. Jangan memotong layer CTA/caption dengan transisi cover sebelum VO selesai.

## 6. Motion Decision System v3.0 (wajib pada video baru)

Baca `docs/MOTION-DECISION-MATRIX.md`, `docs/MOTION-VOCABULARY.md`, `docs/PORTRAIT-CAMERA-STANDARD.md`, `docs/MOTION-PLAN-CONTRACT.md`. Gunakan otomatis berdasarkan tugas. Teknik di bagian 3 terinspirasi prinsip kreatif [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar), bukan kode, aset atau tema yang disalin. Tetap gunakan Minimal Editorial; tidak memasang engine lain.

- Tafsirkan makna beat VO, bukan kata kunci literal: intent → target fokus → state awal → gerak yang diperlukan (atau `hold`) → aksi → reaksi → hasil → hold → handoff. Satu fokus dominan. Pilih gerakan minimum yang memberi informasi baru.
- Atur eye trace: titik akhir perhatian A menjadi titik masuk B. Untuk aplikasi yang sama, pertahankan world, UI state, posisi cursor, kamera, dan momentum; jangan reset scene hanya karena batas Sequence. Match/motivated cut jika konteks memang berubah.
- Portrait UI landscape: establish → zoom in jika detail perlu dibaca → pan/tracking target → aksi dan reaksi → hold → zoom out hanya jika konteks diperlukan. Rasio UI asli; world space terpisah dari subtitle/background screen space. Jangan pan tiap gerak cursor.
- CLEAN FOCUS MOTION LOCK: tidak memakai Slide Mask dekoratif, full-page slide generik, spin/flip atau bounce berlebihan sebagai default; crop viewport teknis, native OS clipping, dan reveal fungsional berbeda dari Slide Mask dekoratif. Jangan paksa morph atau zoom. Hormati override eksplisit/ACC.
- Collision-free: sediakan ruang sebelum aset masuk, periksa bounding box termasuk transform, shadow/teks, seluruh lintasan dan z-order. Overlap native UI (menu/dialog) boleh jika fokus aktif dan label penting tidak tertutup. Pisahkan UI, cursor, subtitle dan kamera; jangan meratakan komposisi.
- Motion plan per beat wajib untuk produksi baru: `production/motion-plan.json` dengan `motionPlanContract: "focus-driven-v1"` pada manifest. Sumber naskah dan rentang beat tetap `src/config/narration.json`; fase memakai offset lokal, bukan timeline VO kedua. Silent cover/bridge direncanakan juga. Draft sebelum VO; setelah audio aktual, sesuaikan onset/hold tanpa mengubah ACC tanpa izin.
- Jalankan `node tools/qa-motion-plan.mjs projects/<slug>` sebelum preview yang akan diajukan untuk review; strict add-on validator juga memeriksa kontrak bila dideklarasikan. PASS hanya metadata. Inspeksi frame dan MP4, serta uji native editing terpisah. Tidak ada migrasi project lama atau klaim otomatisasi pemilihan gerakan saat runtime.
