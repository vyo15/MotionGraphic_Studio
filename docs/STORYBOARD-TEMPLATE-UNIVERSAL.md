# MOTIONGRAPHIC STUDIO — TEMPLATE STORYBOARD UNIVERSAL v1.1

**Status:** default kreatif untuk **video BARU**, diadaptasi dari prinsip *storytelling* Easy2Boot yang sudah ACC. Bukan perintah mengubah Easy2Boot atau video existing. Ketentuan user terbaru, brief spesifik, dan ACC tetap diutamakan.

## 1. Struktur naratif 8 tahap (bukan 8 scene wajib)

| Urutan | Nama | Pertanyaan kreatif | Bukti visual yang dicari |
|---|---|---|---|
| 01 | **MASALAH** | Situasi sehari-hari apa yang dikenal penonton? | Objek/orang memperlihatkan keadaan awal |
| 02 | **KONFLIK** | Hambatan apa yang membuat situasi tidak ideal? | Kondisi salah, mismatch, proses terhambat |
| 03 | **REAKSI** | Apa efek konflik pada objek/pengguna? | Objek benar-benar merespons; bukan efek acak |
| 04 | **SOLUSI** | Apa mekanisme/alat yang menjawab konflik? | Solusi dikenalkan melalui wujud dan fungsinya |
| 05 | **DEMONSTRASI** | Bagaimana menjalankan solusinya? | UI/prosedur akurat: aksi → respons → kemajuan |
| 06 | **HASIL** | Bukti apa bahwa solusi berhasil? | Before/after atau outcome nyata yang bertahan |
| 07 | **INTERAKSI / CTA** | Tanggapan apa yang relevan diminta? | CTA kontekstual dengan objek dari video |
| 08 | **COVER REELS** | Satu visual apa yang mewakili keseluruhan konten? | Mini-explainer → hero frame judul → hold thumbnail |

**Aturan:** Tahap 01–07 boleh digabung/dipecah menjadi 3–6 scene atau lebih bila tutorial memang perlu. **Tahap 08 menjadi scene terakhir terpisah setelah CTA untuk video baru** agar siap diekspor sebagai thumbnail. Jika user memilih format lain atau video lama sudah ACC, hormati keputusan itu.

## 2. Rumus sutradara untuk SETIAP SCENE

**PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI**

- **Pesan:** satu gagasan utama yang harus dipahami.
- **Objek:** komponen utama yang secara visual merepresentasikan gagasan, bukan kartu dekoratif.
- **Pemicu:** sesuatu terjadi karena tindakan spesifik atau kondisi sebelumnya.
- **Aksi:** pilih/tarik/ketik/buka/ubah/tekan/transfer, sesuai narasi.
- **Reaksi:** perangkat/UI/objek merespons tindakan dengan cara yang masuk akal.
- **Hasil:** penonton melihat keadaan yang berubah, tidak hanya membaca label sukses.
- **Hold:** ruang jeda sesudah gerak, agar hasil dapat dipahami di ponsel.
- **Transisi:** lanjutkan hubungan objek, posisi, arah, konteks, ataupun match cut. Jangan paksa satu objek selalu dibawa.

**Referensi teknik dari Easy2Boot:** `Impact Stamp` untuk penegasan konflik, `Card Break` untuk memutus keadaan lama, `Fold & Unfold` untuk aplikasi/operasi UI, `USB Match Move` untuk kesinambungan, `progressive reveal` untuk proses multi-langkah, hasil visual pada layar yang sama, dan CTA yang memakai kembali objek konten. Ini pilihan teknik, **bukan checklist efek wajib**.

## 3. Storyboard detail per detik sebelum build/ketika review

| Kolom | Yang harus dinyatakan |
|---|---|
| Scene, fase, status | Nomor/nama scene, tahap cerita, `DRAFT / REVISI / ACC / LOCKED` |
| Rentang waktu/frame | Start–end detik dan frame eksklusif, durasi, FPS |
| VO / beat | Teks VO persis yang diketahui, jeda, penekanan; tandai draft bila belum ACC |
| Teks layar | Judul, kata kunci, subtitle, aksen/pemanis, kapan muncul/hilang |
| Objek/layout | Nama objek dan X/Y/skala/z-index, safe zone, hirarki perhatian |
| Pemicu/aksi | Apa pemicu gerak, apa yang dilakukan objek atau kursor |
| Reaksi/hasil | Apa yang berubah dan bagaimana penonton memverifikasinya |
| Animasi | Masuk, easing, follow-through, overlap yang terkendali, kamera/zoom beralasan |
| Hold | Lama diam setelah hasil, durasi baca di HP |
| Continuity/transisi | Objek/arah yang diteruskan, target posisi di scene berikutnya, range overlap |
| Editable assets | Nama layer/Props, teks, geometry, waktu, warna, audio, kursor, sound cue |
| QA | Keterbacaan, UI akurat, cursor hotspot, tumpang tindih, ACC, status uji |

**Sumber keputusan:** periksa storyboard, `PRODUCTION-STATE.json`, manifest, timing source, dan catatan ACC project. Bedakan **target yang disetujui** dari **yang sudah terimplementasi**; jangan mengedit source hanya karena sedang membedah storyboard.

## 3A. Sound plan storyboard (SEMUA VIDEO BARU)

Untuk tiap beat dan sambungan scene, tentukan `SFX / omit`, peran terhadap VO, jenis bunyi, awal/impact/tail, dan continuity. **Setiap transisi diperiksa, bukan setiap transisi dipaksa mengeluarkan whoosh.** Gunakan `docs/SOUND-DIRECTION-RULES.md` sebagai acuan; isi `production/SOUND-PLAN.md` saat draft. Setelah motion ACC, jadikan cue berbasis frame absolut di `production/sound-cues.json`. VO asli direkam setelah motion ACC; hasil audio baru dianggap lulus sesudah di-preview/didengar. CTA→Cover tidak boleh memotong kalimat CTA dan cover akhir perlu hold tenang.

### CLEAN FOCUS v2.1 — budget visual sebelum menggambar storyboard

Pada setiap beat, rancang **objek utama yang bekerja** sebelum menentukan copy. Urutan prioritas: aksi UI/objek → hasil yang terlihat → satu teks penjelas bila perlu → subtitle sesuai kebutuhan. Tidak ada keharusan memasang judul scene, running header/footer, badge nomor hook, garis progres, garis aksen atas/bawah, atau border halaman. Penanda produksi `Scene 01`, `HOOK`, `STARTUP`, `WINDOWS TIPS`, durasi, dan nama kategori cukup di storyboard atau timeline — jangan terlihat pada render final. **Headline hanya muncul bila konten membutuhkannya**, bukan karena scene baru. Pertahankan UI asli seperti taskbar Windows dan progress software yang memang sedang didemokan.

Sebelum build, buat satu kolom catatan internal `Elemen yang dibuang` dan hapus dekorasi tanpa makna. Pastikan visual prioritas dapat dipahami saat headline/caption dilepas. Aturan pengecualian hanya untuk brand/brief atau kebutuhan fungsi nyata; hormati ACC/LOCKED.

## 4. Desain SCENE TERAKHIR: COVER REELS ANIMATIF

Tujuan cover ialah **(1) penutup cerita yang terasa menyatu dan (2) still frame thumbnail**. Bukan hanya kartu judul statis, bukan mengulang seluruh tutorial.

**Beat default cover 4–6 detik, adaptif:**

| Rentang relatif | Visual dan gerakan |
|---|---|
| Awal (±0–1 dtk) | Bawa satu objek relevan dari CTA atau lakukan match cut yang jelas |
| Tengah (±1–3 dtk) | Tunjukkan ringkasan mekanisme dalam 1–3 aksi bermakna |
| Menjelang akhir (±3–4 dtk) | Objek mencapai hasil akhir, judul singkat dan label final tersusun |
| Akhir (1–2 dtk) | Semua motion utama berhenti, hero frame stabil untuk thumbnail |

**Kriteria frame akhir:** topik dan manfaat terbaca dalam satu tatapan, judul ideal 3–6 kata, maksimal satu gagasan utama, objek dan latar bersih, tanpa transisi/kursor/blur yang menutupi. Default Minimal Editorial `#F7F7F5`, `#202020`, `#DF805F`. Rasio video 9:16; periksa crop grid Instagram 3:4 dan UI overlay dengan judul/objek di tengah. Simpan pilihan `coverFrame` atau nomor frame hold pada metadata/README project; export PNG/JPG dari still itu jika tooling mendukung, dan jangan mengklaim sudah diekspor kalau belum.

**Contoh konsep:** Shutdown otomatis = laptop menyala → timer berjalan → laptop OFF → judul `SHUTDOWN OTOMATIS`. Excel VLOOKUP = data kunci → lookup ke tabel → sel hasil terisi → judul `DATA KETEMU OTOMATIS`. Easy2Boot jadi **benchmark yang tidak diubah**: prinsip objek USB dipakai ulang dan cover menyatu, tidak perlu retrofit scene baru pada video yang sudah ACC.

**Editable cover layers:** background, carrier object, tiap objek mini-demo, UI/ikon, judul, subjudul opsional, efek/suara dan penanda frame. Posisi/warna/ukuran/timing/opasitas/start/end dapat disetel, tetapi pengujian Studio `drag→save→reload` dibutuhkan sebelum klaim no-code.

## 5. Durasi, visual, dan transisi

**Style check per scene:** catat hierarchy typography, palet/token, *renderable font*, ukuran objek, safe zone, kontras, status UI, posisi subtitle dan continuity sebelum build. Acuan wajib: `MOTIONGRAPHIC-DESIGN-SYSTEM.md` dan `MOTION-DIRECTION-RULES.md`; QA visual: `QA-VISUAL-MOTION-CHECKLIST.md`. Ukuran font/warna yang sama tidak boleh dipaksakan pada UI native Windows bila mengurangi realisme.


- Default edukasi Reels 1080×1920, 30 FPS, durasi video 15–30 dtk sebagai titik mulai, **bukan limit**. Durasi dipanjangkan bila tutorial perlu. Hook awal 1–2 dtk harus menarik secara visual.
- Prioritaskan objek utama terlihat dalam safe zone atas 250, bawah 350, kiri/kanan 50 px; typography sekitar 6–8 kata per layar, bukan menyalin seluruh VO.
- Animasi halus dan deterministik; transisi scene singkat sekitar 0,3–0,6 dtk untuk perubahan ringan, sementara **beat jembatan yang menjelaskan sesuatu boleh lebih panjang**, sebagaimana USB Match Move Easy2Boot.
- Gerak kamera, skala, rotasi dan suara harus punya motif. Anticipation → action → follow-through; jangan semua objek muncul/bergerak bersamaan; sediakan visual hold.
- UI/tutorial komputer wajib akurat termasuk shortcut, jendela, nama menu, hotspot cursor, click response, dan status hasil; simulasi visual harus dinyatakan jujur bila bukan rekaman nyata.

## 6. Mode kerja dan revisi

- **Diskusi judul/storyboard:** uraikan struktur lengkap sesuai kebutuhan, lanjutkan per-scene, tidak mengubah code sebelum build diminta.
- **Audit/bedah video existing:** gunakan source dan rekaman bila ada, jangan mengarang detail yang belum diverifikasi; jangan ubah scene yang ACC.
- **Langsung buat video:** bangun add-on siap import dalam satu tugas, storyboard ikut disimpan tetapi tidak menjadi tahap approval yang memblokir.
- **Revisi scene atau Master:** kirim satu ZIP FILE CHANGE ONLY berisi hanya file baru/berubah dengan path sesuai root Master; jangan kirim ulang Master penuh.
- **Produksi VO:** naskah draft → storyboard → build motion → ACC → VO Guide → user rekam → sinkronisasi/subtitle/SFX → QA source + render.

## 7. Pencatatan yang perlu ada untuk chat berikutnya

Simpan dalam project baru: alokasi scene dan 8 tahap dalam `STORYBOARD.md`/`production/`, status LOCK dalam `PRODUCTION-STATE.json`, timing VO per beat di config sesuai kontrak, dan `coverFrame` (jika diketahui). Tidak perlu membongkar proyek lama untuk menambahkan data ini.

Untuk Project ChatGPT lintas chat, unggah file template ini ke **Project Sources** serta pasang instruksi ringkas dari `docs/CHATGPT-PROJECT-INSTRUCTIONS.md` pada **Project Instructions**. ZIP Master **hanya bisa dianalisis setelah dibuka**; file di PC bukan sumber instruksi akun ChatGPT secara otomatis.
