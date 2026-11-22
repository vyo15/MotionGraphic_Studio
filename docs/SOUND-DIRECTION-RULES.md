# MOTIONGRAPHIC STUDIO — SOUND DIRECTION SYSTEM v2.1

**Status:** standar default untuk **video baru** dan revisi sound yang diminta. **Tidak berlaku retroaktif** pada Easy2Boot, Shutdown Otomatis, VO, scene, atau sound yang sudah `ACC/LOCKED` tanpa permintaan pengguna. **Sumber aturan sound utama**: dokumen ini; cara implementasi: `docs/SOUND-DESIGN-WORKFLOW.md`; validator: `tools/qa-sound-cues.mjs`; quality gate: `docs/QA-VISUAL-MOTION-CHECKLIST.md`.

> **Prinsip:** suara membuat tindakan terasa nyata dan hubungan scene terasa hidup. **Setiap aksi/transisi diperiksa kemungkinan sound-nya, bukan diwajibkan memiliki SFX.** Ketepatan, ruang untuk VO, ritme, dan silence lebih berharga daripada banyak efek. Jangan mengklaim audio sudah dibuat, didengar, di-mix, atau dirender hanya dari JSON/dokumen.

## 1. Prioritas dan workflow

1. **Naskah DRAFT + storyboard lebih dulu.** Tentukan aksi yang *layak* mendapat SFX, serta tempat yang justru harus hening. Tulis rencana audio per beat meskipun belum ada audio.
2. **Bangun motion → preview/revisi → ACC visual.** Jangan meminta VO rekaman atau menambahkan musik final sebagai syarat awal.
3. **Setelah ACC motion**, tentukan cue definitif per frame (`startFrame`, `impactFrame`, `endFrame`) dan aset sumber yang sah. Jika belum ada file audio: `status: "planned"`, bukan `ready`.
4. **VO Guide** dipakai sebagai penanda urutan beat. Pengguna **baru merekam VO** setelah visual disetujui.
5. **Rekaman VO masuk → sinkronisasi natural**: sesuaikan cue, subtitle, musik dan sound berdasarkan timing rekaman nyata tanpa mempercepat suara sembarangan atau merusak ACC.
6. **Preview + render + listening QA** → revisi mixing → final setelah bukti. QA metadata atau file WAV saja **bukan** uji mendengar.

Khusus permintaan “bedah/audit/storyboard”: **tidak mengubah source**. Jika user meminta *langsung build*, kerjakan add-on lengkap tanpa approval tambahan; tetap catat sound yang `planned`, `ready`, dan `belum diuji` dengan jujur.

## 2. Rumus sound per beat

**PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI** dipasangkan dengan **SOUND INTENT → CUE (atau `omit`) → ATTACK/IMPACT → TAIL → HANDOFF**.

Untuk setiap beat tentukan:
- **Mengapa terdengar?** Tindakan fisik/UI, penegasan dramatis, perubahan state, atau ambience yang memberi konteks.
- **Apa sumber/karakternya?** Click kecil, thump, pop ringan, movement, drag/drop, confirmation, riser/transform, ambience atau silence.
- **Di frame berapa?** Perbedaan waktu muncul objek, mulai bergerak, momen kontak/klik, respons, dan berhenti. Impact SFX harus selaras dengan aksi, bukan sekadar scene cut.
- **Seberapa penting?** Prioritas 1 = membantu memahami tindakan; 2 = membantu penekanan; 3 = dekoratif → default `omit`.
- **Apa pengaruhnya ke VO/scene berikutnya?** Jangan menumpuk efek, menutup kata, atau memotong ekor suara mendadak pada transisi.

Pada storyboard tulis kolom tambahan: `Sound intent | Cue/omit | Timing (frame atau detik perkiraan) | Peran terhadap VO | Handoff/tail | Status`. Gunakan `production/SOUND-PLAN.md` dari starter untuk keputusan per-scene; cue final masuk `production/sound-cues.json`.

## 3. Bahasa suara berdasarkan gerakan (bukan daftar efek wajib)

| Peristiwa nyata di layar | Opsi SFX | Timing & fungsi | Kondisi `omit` |
|---|---|---|---|
| Hook/pertanyaan penting | Single soft emphasis, tap, subtle pop | Saat satu kata/objek kunci muncul | Hook sudah kuat dengan VO; tidak perlu efek |
| Typography muncul | Soft reveal / pop pendek | Pada reveal utama, bukan setiap kata | Teks hanya caption/subtitle atau reveal minor |
| Kursor klik UI | Micro click | Tepat pada pointer-down / aktivasi tombol | Klik tidak dinarasikan dan tidak penting |
| Keyboard/shortcut | 1–2 key tap yang realistis | Pada penekanan tuts, bukan suara mengetik tak relevan | Menutupi VO / mengulang efek lain |
| Drag/drop, file/ISO berpindah | Pick + drop ringan | Kontak awal/objek sampai tujuan; prioritas pada drop | Pergerakan hanya dekoratif |
| Benturan, stamp, warning | Short impact / thump | Puncak benturan + tail yang sesuai massa benda | Tidak ada kontak atau perubahan state |
| Kartu pecah/terbelah | Soft break / crack | Saat objek benar-benar terbelah, bukan saat mulai mendekat | Objek tidak terlihat pecah |
| Object morph/fold/unfold | Subtle transform/whoosh bertekstur | Sesuai arah dan durasi perubahan | Perubahan lambat, VO cukup sebagai penghubung |
| Pan/zoom/kamera | Biasanya silence; whoosh sangat lembut opsional | Saat gerak besar mengubah fokus cerita | Gerakan kamera kecil / menjelaskan detail UI |
| Progress/countdown | Indikator sangat selektif | Trigger awal/finish; jangan bunyi untuk setiap persen | Timer hanya sedang berjalan/hold |
| Status sukses / hasil terkonfirmasi | Soft confirm / success ping | **Setelah** hasil terlihat dan benar-benar terjadi | Hasil masih simulasi/pending/ambigu |
| Pindah scene tanpa aksi | Audio bridge atau silence | Hanya bila kontinuitas perlu dibantu | Cut biasa sudah jelas; whoosh generik akan repetitif |
| CTA | Tap/focus ringan pada aksi komentar | Saat kartu komentar/tap benar-benar bereaksi | Hanya teks pertanyaan muncul |
| CTA → COVER | Gunakan tail/warna sound objek yang sama, atau fade sederhana | Sambung tanpa ledakan efek baru | VO baru selesai dan cover butuh ruang tenang |
| Cover animated mini-demo | 1 cue untuk aksi utama bila perlu; akhir stabil | Selama mini-demo, **hold thumbnail 1–2 dtk tenang** | Menambah musik/chime justru mengganggu frame penutup |

Durasi contoh, **bukan angka wajib**: UI click 40–120 ms; pop 80–250 ms; whoosh/transform 100–450 ms; impact 100–500 ms; confirm 150–600 ms. Panjang sebenarnya mengikuti aksi dan aset. **Bukan semua gerakan harus bersuara.**

## 4. Transisi antar-scene: sound continuity

- **Match Move/objek terbawa:** pertahankan karakter SFX (timbre/spatial sense) dan ekor bunyi bila realistis, bukan ulang click/whoosh baru saat batas scene.
- **Morph/Fold & Unfold:** sound dimulai ketika transformasi terlihat, mencapai puncak pada perubahan utama, berakhir saat bentuk baru menetap.
- **Card Break/Impact Stamp:** impact mengikuti tabrakan dan reaksi, bukan scene change; tail boleh menjadi penghubung ke scene berikutnya dengan fade halus.
- **Match Cut / informasi baru:** boleh **tanpa SFX**. Musik bed halus atau silence dapat menjaga continuity lebih baik.
- **Tutorial UI:** sound mengikuti state perubahan di dalam satu interface. Hindari suara transisi yang menutupi bunyi klik/keterbacaan UI.
- **Kesenjangan/gap:** jangan ada sound yang tiba-tiba terpotong; jangan biarkan tail melewati scene bila materi baru tidak terkait.
- **Overlap audio lintas scene:** jika benar-benar dibutuhkan, tempatkan pada track/parent audio yang jelas dan berlabel, tetapkan satu penanggung jawab cue, jangan memutar cue yang sama di dua scene maupun root sekaligus. Handoff harus diuji di titik boundary.
- **CTA → COVER:** jangan memotong kalimat CTA; gunakan objek yang relevan sebagai penghubung, satu transisi audiovisual yang bermakna, dan tahan akhir cover tanpa efek baru yang mengambil fokus dari thumbnail.

**Aturan anti-monoton:** jangan memakai jenis whoosh/ping yang sama di setiap scene. Variasikan intensitas, sound texture, durasi atau bahkan gunakan silence; jaga keluarga karakter suara tetap konsisten dengan Minimal Editorial (clean, halus, presisi, tidak bombastis).

## 5. Sound hierarchy, mixing, dan kenyamanan menonton

**Prioritas:** (1) VO jelas, (2) informasi aksi yang harus terdengar, (3) musik/ambience penunjang. Tidak wajib memakai musik; hindari SFX atau musik yang terus-menerus berbunyi sehingga menimbulkan kelelahan mendengar.

- Atur **gain per cue**, bukan satu volume sama untuk semua WAV. Evaluasi *perceived loudness* dan spektrum—suara klik tinggi dapat terasa lebih menusuk daripada thump walau peak sama.
- **Ducking manual/otomatis berbasis timeline:** turunkan musik/SFX saat kata penting, naikkan kembali secara bertahap setelah VO. Jangan membuat pumping atau perubahan volume mendadak.
- Jangan mengunci angka volume Remotion (`0..1`) sebagai standar universal karena rekaman aset dan VO berbeda. `gainDb` adalah titik awal, wajib didengarkan dan disesuaikan.
- Sisakan **headroom**; cek clipping/true peak di audio hasil MP4. Rujukan evaluasi awal voice-centric: kira-kira **−16 hingga −18 LUFS integrated** dan **true peak ≤ −1 dBTP**, **bukan jaminan kualitas atau target platform mutlak**. Ikuti karakter VO dan normalisasi platform bila relevan.
- Cek keseimbangan stereo/mono; pastikan SFX penting masih terdengar di speaker HP mono/kecil. Hindari bass berlebihan, treble tajam, ambience terlalu keras, reverb/echo tak sengaja, dan audio click/pop di awal/akhir file.
- Gunakan **fade masuk/keluar** pada bed/tail bila perlu; jangan memberi fade yang membuat click atau impact kehilangan sinkronisasi. Cek attack asli dengan waveform saat tersedia.
- Jangan sengaja menambah suara yang menyerupai notifikasi sistem/konfirmasi berhasil jika tidak ada perubahan state yang benar—untuk tutorial Windows realisme lebih penting daripada efek.
- **Silence disengaja** pada jeda, hold hasil, pertanyaan, dan final cover boleh menjadi keputusan sound yang benar.

## 6. Aset dan lisensi

- Simpan master/audio asli per project di `projects/<slug>/public/audio/sfx/`; VO mentah di `public/audio/voiceover/` setelah rekaman, musik di `public/audio/music/` bila digunakan dan kontrak Master mendukungnya. Nama file stabil, deskriptif, ASCII dan tidak menimpa aset ACC.
- WAV PCM berkualitas baik (48 kHz dapat dipilih bila aset baru) atau format yang didukung tool; mono SFX dekat, stereo hanya saat spatial cue/ambience memang diperlukan. **Jangan memaksakan resampling atau format baru untuk project lama.**
- `source.kind` sesuai skema aktual (`own`, `openverse`, `real-recording`, `earshot`, `licensed-other`); catat judul, pencipta, URL sumber, lisensi, URL lisensi, izin komersial dan atribusi bila diwajibkan. Bukti halaman asal lebih kuat daripada hasil pencarian Openverse.
- Jangan mengambil SFX/musik dari Easy2Boot, video contoh, CapCut, brand atau internet tanpa hak. Aset original boleh dipakai ulang hanya jika hak, scope dan pengemasannya jelas; **jangan mengubah project lain**.
- Jangan menambah dependensi baru hanya demi sound; Master v1.8.1 memakai Remotion 4.0.538. `Real SFX` adalah metodologi skill pihak lain, bukan renderer terpasang; `earshot` opsional, tidak diasumsikan tersedia.
- Jika file belum dibuat/diunduh dan belum diperiksa, status `planned`; jangan membuat file palsu, mengisi metadata lisensi asal, atau menamai stem placeholder sebagai final.

## 7. Cue sheet dan implementasi Remotion (kontrak Master aktual)

File: `projects/<slug>/production/sound-cues.json` (`schemaVersion: 1`). Minimal cue: `id`, `scene`, `action`, `startFrame`, `impactFrame`, `endFrame`, `status`, `file`, `source`; `gainDb` direkomendasikan. `kind` dan `sceneFrame` boleh dipakai bila kode project mendukung.

- **Frame dalam JSON: absolut terhadap full video** seperti implementasi Easy2Boot dan Shutdown. Jika scene component memakai `Sequence` lokal, kurangi startFrame scene dengan benar. Catat scene boundaries dari komposisi aktual, jangan menebak.
- Dalam Master ini validator menganggap `startFrame ≤ impactFrame ≤ endFrame` dan `endFrame < durationInFrames`. Implementasi `SceneSoundCues` saat ini menggunakan `durationInFrames = endFrame - startFrame + 1`, sehingga **endFrame inklusif** untuk cue. Jangan tertukar dengan end frame **eksklusif** pada VO Guide/narration beats.
- `status: planned` untuk cue belum memiliki aset; `status: ready` **hanya** bila aset tersedia. `status: omit` = keputusan disengaja tidak memakai SFX. Status dokumen `draft/review/ready/final` bukan bukti mix sudah didengar.
- Catat `gainDb` dan hubungan cue dengan VO/objek; pastikan `impactFrame` sesuai frame aksi. Jangan menempatkan klik sebelum kursor menekan atau confirmation sebelum sistem berhasil.
- Di scene gunakan `Sequence` + `Audio` / `Html5Audio` dari `remotion` yang memang terpasang, serta **path literal** `staticFile('videos/<slug>/audio/sfx/nama.wav')` setelah sync. Jangan mengimpor `@remotion/media` / `@remotion/sfx` tanpa pemeriksaan dependency.
- **Cegah double audio**: satu cue satu jalur playback. Bila legacy scene-wide WAV sudah ada, audit dan turunkan/matikan yang bentrok sebelum menambah one-shot. Jangan ubah legacy ACC tanpa izin.
- **Metadata tidak otomatis memutar SFX.** Pastikan cue benar-benar dipanggil source pada titik semestinya; sinkronisasi dan durasi file tidak diverifikasi cukup oleh JSON saja.
- Editing: beri nama track/cue, pisahkan stem SFX/VO/music. Jangan flatten semua audio ke MP4 tunggal tanpa mempertahankan sumber dan cue. Setiap revisi sound mempertahankan ID/slug/layer ACC.

## 8. QA bertahap — jangan samakan source dengan output nyata

| Tahap | Pemeriksaan minimum | Klaim yang sah |
|---|---|---|
| Storyboard | Cue/omit dan fungsi transisi per scene, ruang VO, CTA→Cover | `DIRENCANAKAN` |
| Source | Aset ditemukan, cue/frame terurut, asal/lisensi, tidak ada duplikasi terlihat dalam kode | `SOURCE CHECKED` |
| Validator | `node tools/qa-sound-cues.mjs projects/<slug> --strict` | `CUE METADATA VALID` jika lulus; **bukan** bukti audible |
| Preview | Audisi time-aligned untuk click/impact/tail, boundary, panjang WAV, dual-track | `PREVIEW DIAUDISI` bila benar-benar didengar |
| Render MP4 | Audit suara, drop/cut, clipping, loudness/true peak dengan FFmpeg jika tersedia | `RENDER AUDIO DICEK` setelah didengar + diukur |
| Perangkat | Speaker HP, headphone, volume rendah, mono fold-down, kalimat VO | `LISTENING QA LULUS` jika seluruh tes relevan dilakukan |

**Wajib cek khusus:** perubahan scene saat transisi, ketepatan click/hotspot, suara kejutan terlalu keras, suara berulang, gap senyap tak disengaja vs silence yang direncanakan, clipping, subtitle/VO, lisensi aset, fade-out akhir, dan akhir cover yang tenang. Jika tooling tidak ada, tandai `BELUM DIUJI` dan jangan menyatakan final quality 100%.

### Batas otomatisasi saat ini

`tools/qa-sound-cues.mjs` memvalidasi skema dasar, frame dalam total durasi, keberadaan/header minimum audio, dan metadata hak pakai. **Belum** memvalidasi apakah impact cocok dengan frame visual, apakah WAV ter-decode sepenuhnya, durasi WAV vs cue, cross-scene audio, sound ganda di root+scene, waveform/mixing, audio licensing di situs asal, atau kualitas hasil MP4. Audit itu memerlukan inspeksi source/preview/render dan listening aktual. Jangan menyebutnya otomatis teruji.

## 9. Aturan keputusan untuk ChatGPT baru

1. Baca dokumen ini setelah `CHATGPT-READ-FIRST.md` dan aturan produksi. Jangan meminta pengguna menjelaskan sound/style/VO dari awal jika sudah ada di Master.
2. Saat **membuat video baru**, lakukan sound planning otomatis (termasuk `omit`), tanpa bertanya “mau sound effect?”; semua SFX aktual tetap dipilih berdasarkan tindakan dan ketersediaan lisensi.
3. Saat **merevisi** sound/scene, ubah hanya file terkait; jangan mengubah scene, tempo VO, cue, sound assets atau narasi yang sudah ACC di project lain.
4. Kirim revisi sebagai **FILE CHANGE ONLY** berisi file baru/berubah dengan path relatif Master agar pengguna copy–paste–Replace. Jika hanya audit/storyboard, jangan tulis source.
5. Laporkan tiga status terpisah: `sound plan`, `asset/source implementation`, dan `audio rendering/listening QA`.
