# MOTIONGRAPHIC STUDIO — DESIGN SYSTEM v2.0

**Berlaku sebagai default untuk add-on VIDEO BARU** dan revisi yang memang diminta mengubah desain. **Tidak meretrofit Easy2Boot, Shutdown Otomatis, atau scene/VO/style yang ACC**. Prioritas: instruksi terbaru user & LOCK/ACC > bukti source Master dan kebutuhan UI yang benar > Design System > preferensi kreatif. Setiap penyimpangan yang sengaja dipilih dicatat di storyboard/README, tidak diubah diam-diam.

## 1. Karakter visual

**Minimal Editorial:** editorial terang, ruang kosong terencana, fokus tunggal per beat, typography fungsional, objek/UI yang benar-benar memperagakan proses. Referensi Easy2Boot dipakai untuk **kualitas directing** (aksi→reaksi→hasil dan continuity), bukan kewajiban memakai Impact Stamp/Card Break/Fold & Unfold di semua video. Tidak menyalin branding, aset, musik, karakter, atau layout persis dari referensi lain. Satu video = satu topik/pesan inti, walau memiliki beberapa langkah.

## 2. Design tokens (default)

| Token | Nilai | Penggunaan |
|---|---|---|
| `background` | `#F7F7F5` | Kanvas off-white |
| `surface` | `#FFFFFF` | UI card/dialog |
| `ink` | `#202020` | Judul, body, caption penting |
| `secondary` | `#646464` | Teks sekunder yang harus terbaca |
| `muted` | `#888888` | Dekorasi/metadata besar saja; hindari untuk teks kecil |
| `accent` | `#DF805F` | Satu titik fokus, status progres, pemicu/hasil; bukan semua objek |
| `stroke` | `#E7E7E5` | Border tipis, divider, garis grid samar |
| `success` | `#31A878` | Status berhasil **bersama** ikon/teks |

Warna status warning/error hanya bila ada konteks; pilih warna berkontras baik dan tetap sertakan simbol/label. **Jangan mengandalkan warna saja untuk menyampaikan informasi.** Pada bidang coral `#DF805F`, pakai tinta gelap `#202020` untuk teks penting (kontras nominal sekitar **5,73:1**); teks putih di atas coral hanya sekitar **2,84:1** sehingga bahkan tidak mencapai target 3:1 untuk teks besar. Teks `#646464` di atas off-white memiliki kontras sekitar **5,52:1**, sedangkan `#888888` hanya sekitar **3,30:1**. Angka dihitung dari token warna sRGB, **bukan pengujian seluruh frame render**. Target pemeriksaan *teks biasa* setara WCAG 4.5:1 dan teks besar 3:1 sebagai pedoman visual; ini adalah **target desain**, bukan klaim bahwa semua video telah diuji aksesibilitasnya.

### Kebijakan font dan konsistensi render

- **Baseline yang pasti tersedia** pada Master saat ini: `Arial, Helvetica, sans-serif` (font sistem/fallback); jangan mengklaim Inter akan dipakai identik pada semua PC karena font **belum dibundel dan di-load secara eksplisit**.
- **Arah brand pilihan**: Inter, **hanya jika** aset font berlisensi resmi ditempatkan/di-load dalam add-on atau ketersediaan render sudah diverifikasi; gunakan weight yang benar. Jika belum, gunakan baseline Arial yang konsisten pada seluruh video baru.
- Max **satu family sans utama** + family monospace untuk perintah (`Consolas, 'Courier New', monospace`) bila diperlukan. Tidak mengambil font berlisensi komersial tanpa hak dan tidak membundel font dari mesin pengguna secara asal.
- Untuk Native Studio editing, pertahankan properti `Interactive` yang perlu diedit berupa **nilai literal inline** jika API Save-to-code membutuhkannya. `design.ts` adalah sumber nilai *default/scaffold*, bukan bukti bahwa editor bisa mengubah semua token global otomatis.

## 3. Typography pada kanvas 1080×1920 (skala awal, bukan batas keras)

| Peran | Font size rekomendasi | Weight | Aturan |
|---|---:|---:|---|
| Hook / Hero | 88–108 px | 700–800 | Maks 2 baris, 1 gagasan dominan |
| Judul scene | 64–84 px | 700–800 | Selaras dengan VO, jangan mengulang penuh |
| Subjudul / poin kunci | 44–56 px | 500–700 | Hanya saat membantu memahami |
| Subtitle VO | 38–46 px | 600–750 | Maks 2 baris, pecah mengikuti ujaran |
| Label / callout | 28–36 px | 600–700 | Jangan terlalu kecil untuk HP |
| Command/keyboard | 32–50 px adaptif | 600–750 | Monospace bila cocok, harus terbaca |

Mulai dengan `line-height` sekitar 1.08–1.18 untuk judul dan 1.16–1.3 untuk subtitle/body, lalu **cek frame nyata**. Gunakan maksimal 2 tingkat hierarki utama pada satu tampilan, garis teks tidak terlalu panjang, dan sekitar 6–8 kata **teks utama** per beat. `subtitle` bisa memiliki lebih banyak kata bila perlu, tetapi jangan berebut fokus dengan teks hero. Label status, nomor step dan parameter boleh menjadi pengecualian yang fungsional.

## 4. Komposisi, safe zone, grid, UI

- Output default `1080×1920`, `30 FPS`, `9:16`. Area informatif aman **x=50–1030, y=250–1570**; margin interior 80–110 px lebih nyaman jika layout memungkinkan. Bagian background/dekorasi boleh di luar safe zone, bukan teks/tombol/hasil penting.
- Gunakan ritme jarak dari **grid 8 px** (`8/16/24/32/48/64` dan kelipatannya). Satu focal point pada satu waktu, hindari tiga judul besar atau banyak card aktif sekaligus. Setiap objek memiliki nama/fungsi/z-order yang jelas.
- **Cards:** radius awal 20–28 px, stroke 1–2 px, shadow lembut (contoh `0 12px 32px rgba(32,32,32,0.08)`), padding sesuai isi; bukan efek bevel/glow berlebihan. Pada *realistic Windows UI*, utamakan ukuran, menu, alignment dan radius **asli software**, jangan memaksakan radius editorial pada komponen native.
- Grid latar hanya bila membantu komposisi, opacity sangat rendah, jangan bertabrakan dengan garis UI. Icon set satu keluarga outline/solid yang koheren; samakan stroke visual dan radius, jangan campur ikon 3D, outline tipis, dan kartun tebal tanpa alasan.
- Gunakan teks **center** saat ia benar-benar fokus tunggal; alignment kiri untuk langkah teknis/daftar. Jangan membuat border, underline, badge atau tanda tanya hanya sebagai pemanis generik. Ornamen harus menegaskan pertanyaan, status, atau arah perhatian.
- Kursor/hotspot, target klik, dan zoom UI harus realistis. Gunakan sorotan pada aksi aktual, bukan pointer menyilang layar; jangan tampilkan menu/hasil teknis yang tak benar.

## 4A. CLEAN FOCUS v2.1 — anti *template chrome* (default video BARU)

**Scene bukan slide presentasi.** Desain harus membantu penonton memahami **aksi nyata pada objek utama**. Area yang kosong lebih baik daripada elemen pemanis. Gunakan aturan ini pada proses generasi, storyboard, build dan QA. **Jangan mengubah project lama/scene ACC** tanpa permintaan. Tidak membatasi headline/label yang memang diperlukan untuk memahami topik.

- **DILARANG secara default pada video yang diekspor:** running header/footer (contoh `WINDOWS / WORKFLOW`, `WINDOWS TIPS / STARTUP`), badge `01 — HOOK`, nomor scene untuk kebutuhan produksi, garis pemisah sepanjang tepi, progress bar dekoratif, garis aksen bergerak di bagian atas/bawah, border halaman, watermark/template label, metadata scene, serta label ``hero``/``headline`` yang tidak menambah pemahaman. Semua penanda produksi hanya ada pada storyboard, timeline editor, atau VO Guide — **bukan** visual final.
- **Headline kontekstual, bukan judul yang selalu menetap:** maksimal satu pesan utama ketika perlu (hook singkat, petunjuk aksi, atau cover). Saat demo layar/software berjalan, biasanya **tidak perlu** headline tambahan; nama aplikasi/shortcut/hasil tampil hanya ketika penonton perlu membacanya. Jangan memasang judul besar di atas, caption yang mengulang judul di bawah, plus subtitle VO sekaligus.
- **Objek dulu:** pada tutorial Windows, desktop/jendela/kursor/hasil tindakan mengambil area visual dominan dan cukup besar untuk HP. Jangan mengecilkan desktop demi memberi ruang untuk label dekoratif. Taskbar Windows, title bar aplikasi, progress asli software, dan penunjuk tahap yang diperlukan **tetap boleh** karena bagian dari demonstrasi; bedakan dari bar palsu milik template.
- **Latar sederhana:** off-white polos `#F7F7F5` sebagai awal. Grid bukan kewajiban; default **tanpa grid** pada visual demonstrasi, dan hanya gunakan grid sangat samar bila benar-benar membantu alignment dan tak bersaing dengan UI. Coral dipakai untuk menekankan trigger/hasil, bukan menggarisi tepi scene.
- **Teks layar sesuai VO:** pilih nol atau satu frasa penegas pendek pada suatu beat, tidak perlu semua elemen informasi aktif bersamaan. Fade out teks yang tidak relevan **sebelum** demo/kursor menjadi fokus. Subtitle opsional disinkronkan dengan rekaman, jangan duplikasi tulisan besar.
- **Transisi bermakna:** lanjutkan objek, gerakan kursor, atau perubahan UI; tidak perlu garis, headline, label chapter maupun progress bar untuk menandai pindah scene. Tahan hasil tindakan cukup lama supaya penonton paham.
- **Pengecualian terkendali:** progress bar yang merepresentasikan proses sungguhan, menu asli software, state/status data, label keselamatan wajib, atau arahan brand yang diminta pengguna boleh ditampilkan; catat tujuan fungsionalnya. Jangan menambahkan elemen dekoratif hanya demi mengisi ruang kosong.

**Pertanyaan QA tiap elemen:** “Kalau elemen ini dihapus, apakah penonton kehilangan informasi atau sulit mengikuti aksi?” Jika **tidak**, hapus dari render. Periksa terutama frame awal, saat aksi utama, akhir scene, dan cover: apakah ada lebih dari satu *focal point* atau chrome yang masih menempel?

## 5. Subtitle, audio, ritme, dan keterbacaan

**Sound identity terkunci:** gunakan `docs/SOUND-DIRECTION-RULES.md` untuk tonal palette audio Minimal Editorial (ringan, presisi, bukan agresif), mapping cue/`omit` per beat, continuity lintas scene, CTA→Cover, dan voice-first mixing. Visual style boleh konsisten tanpa setiap gerak/slide menghasilkan whoosh.


- VO rekaman pengguna **setelah motion ACC**; sebelum itu gunakan naskah draft/VO Guide terpisah. Timing beat, frame dan teks layar harus mengikuti satu sumber konfigurasi per project.
- Subtitle mengikuti **frasa/pengucapan** dengan jeda alami, bukan karaoke terlalu cepat atau paragraf panjang. Default maksimal 2 baris, visual hold memadai, cek tidak bertabrakan dengan tombol dan UI Reels. Gunakan penekanan kata terbatas; label utama **tidak** perlu mengulang subtitle secara penuh.
- Untuk subtitle dekat bawah, tempatkan **seluruh bounding box** di atas y=1570; jika perlu pindahkan area demo supaya subtitle dan UI tidak bersaing. Gunakan plate tipis/kontras bila latar ramai, bukan teks gelap pada konten gelap tanpa backing.
- SFX hanya ketika ada *aksi terlihat*, cek onsets secara frame; VO harus tetap dominan. Rujuk `docs/SCENE-LAYER-AND-SOUND-STANDARD.md`, `docs/SOUND-DESIGN-WORKFLOW.md` dan `docs/WORKFLOW-VO-UNIVERSAL.md` (jangan duplikasi sound dari root dan scene).

## 6. Cover Reels setelah CTA

- Pada **video baru** scene COVER adalah penutup **tersendiri setelah CTA** (kecuali user memilih lain). Durasi awal 4–6 dtk, dengan 1–3 aksi mini-demonstrasi inti topik → hero composition → **hold stabil 1–2 detik**.
- Pilih **satu hero object** berhubungan dengan isi dan CTA; bukan slide judul yang tidak bergerak. Judul ideal 3–6 kata, manfaat/topik langsung dipahami, dekorasi minimal.
- Review full 9:16 **dan crop tengah 3:4** (konten penting aman dalam perkiraan bidang tengah y≈240–1680), serta preview UI profil dan overlay Instagram yang berlaku. Perhatikan teks kecil/ikon yang masih harus terlihat. Hindari menaruh judul di pojok atau belakang UI.
- Catat `coverFrame` (frame hold tanpa blur/pointer/loading/gerak utama) di README atau metadata project jika didukung. Render *still image* PNG/JPG bila pipeline tersedia; jangan mengklaim sudah diekspor sebelum file benar-benar ada.

## 7. Kontrol perubahan/style-lock

- **Video baru**: mulai dari tokens starter `templates/addon-starter/src/config/design.ts`. Boleh override karena brand kit, fakta UI, konteks, atau user—**catat alasannya** dalam `STORYBOARD.md`/README. Jangan mengubah font/theme seluruh project hanya demi meniru teknik lain.
- **Video lama atau scene ACC/LOCKED**: hormati nilai nyata pada source, walau warna/typography berbeda dari default. Upgrade style baru hanya atas permintaan eksplisit, patch terbatas pada yang dituju.
- Data, screenshot, icon, font, SFX, dan musik pihak ketiga: catat asal/lisensi; jangan copy aset tanpa izin. Jangan menggunakan citra hasil generatif sebagai pengganti UI yang harus dapat diedit/berinteraksi.
- Setiap pengiriman harus diperiksa dengan `docs/QA-VISUAL-MOTION-CHECKLIST.md`; beri bukti QA, bukan label “professional/100% editable” tanpa pengujian.
