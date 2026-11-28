# MOTIONGRAPHIC STUDIO — DESIGN SYSTEM v2.1 — Compact Typography, Balanced Visual & Isolated VO Guide

**Berlaku sebagai default untuk VIDEO BARU** dan revisi yang memang diminta mengubah desain. **Tidak meretrofit Easy2Boot, Shutdown Otomatis, atau scene/VO/style yang ACC**. Prioritas: instruksi terbaru user & LOCK/ACC > bukti source Master dan kebutuhan UI yang benar > Design System > preferensi kreatif. Setiap penyimpangan yang sengaja dipilih dicatat di storyboard/README, tidak diubah diam-diam.

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

- **Poppins** utama, Inter untuk VO Guide/informasi teknis, Manrope alternatif editorial. Gunakan satu sans utama per video; Segoe UI untuk UI Windows asli, Consolas/Courier New untuk CMD. Jangan membundel font sistem Windows.
- Font OFL 1.1 disediakan melalui `library/fonts/`: sekali pada PC jalankan `node tools/font-library.mjs --install`. Font binary belum dibundel dalam patch ini; installer memakai sumber resmi, menyertakan lisensi dan mengunci SHA-256. Starter dan video baru opt-in `designContract: "compact-balanced-v1"` memakai `LocalFonts.tsx` dan aset lokal `public/fonts/`. Startup/scaffold memprovision hanya placeholder resmi tanpa menimpa project lain. `MG Poppins`, `MG Inter`, `MG Manrope` adalah alias lokal agar font video lama tidak terpengaruh. Loader menunggu font sebelum render. Draft boleh fallback, **review wajib font lokal valid**. Jangan klaim tampilan font sebelum render nyata.
- Native layer tetap menggunakan nilai literal inline untuk family, size, weight, lineHeight, letterSpacing, posisi dan ukuran; token `design.ts` untuk starting default saja. Uji Save/reload terpisah.

**OBJECT-CENTERED COMPOSITION LOCK:** tetapkan anchor objek utama dari visual bounds aktual setelah transform (bukan bounding box container/headline). Gunakan optical centering dalam safe zone; untuk scene objek, headline mengikuti objek dengan gap 48–80 px sebagai titik awal, boleh lebih lega berdasarkan review/ACC (contoh 95 px), bukan memindahkan objek demi teks. VO Guide independen. Saat headline muncul/hilang, objek tidak bergeser kecuali gerak bermotif/ACC. Untuk typography-only, teks adalah objek utama; UI camera tetap mengikuti fokus aksi. Cek per beat dan transisi, termasuk perubahan jumlah objek. Tidak mewajibkan retrofit scene ACC.

Implementasi QA: `objectAnchors` mengikat primary-object dan kelompok headline; ukur subtree artwork bertanda `data-qa-visual` (aproksimasi bounds, bukan centroid piksel). Gap adaptif dinyatakan pada plan dan gerak bermotif beralasan. Saran koreksi memindahkan headline sebagai kelompok, bukan anchor; tidak melakukan forced reflow atau mengubah ACC. Lihat [Production Toolkit](PRODUCTION-TOOLKIT.md).

## 3. Typography 1080×1920 — starting scale adaptif

| Elemen | Font | Weight | Ukuran default (rentang) | Line height | Letter spacing |
|---|---|---:|---|---:|---|
| Hook | Poppins | 800 | 84 (72–96) px | 1.05 | −0.03em |
| Headline | Poppins | 700 | 64 (56–72) px | 1.10 | −0.02em |
| Subheadline | Poppins | 600 | 48 (42–54) px | 1.15 | −0.01em |
| Deskripsi | Poppins | 400 | 38 (32–42) px | 1.25 | 0 |
| Label objek | Poppins | 500 | 30 (26–34) px | 1.20 | 0 |
| Angka utama | Poppins | 800 | 112 (96–140) px | 1.05 | −0.03em |
| CTA | Poppins | 700 | 64 (56–80) px | 1.10 | −0.02em |
| Cover | Poppins | 800 | 80 (68–96) px | 1.05 | −0.03em |
| VO Guide sementara | Inter | 500 | 36 (32–36) px | 1.20 | 0 |
| Command | monospace | 500–600 | 32–48 px | adaptif | 0 |

Ukuran bukan batas kaku; cek ukuran glyph aktual, bukan hanya kotak layer. Hook satu baris, transparan, satu gagasan, 6–8 kata bila cocok. Maks dua tingkat hierarki utama; jangan menambahkan gap antarbaris di luar line height. Teks terkait compact, objek tetap lega. Jangan mengecilkan UI asli tanpa zoom fokus.

## 4. Komposisi, safe zone, grid, UI

- Output default `1080×1920`, `30 FPS`, `9:16`. Safe zone internal konservatif (bukan spesifikasi resmi Instagram; sumber angka `contracts/spatial-profiles.json`): kiri 120, kanan 160, atas 280, bawah 350 px; pusat X=520, lebar maks 800 px. Area visual **x=120–920, y=280–1360**, VO Guide **x=120–920, y=1470–1540**; pusat Y=1505. Background boleh full frame. Pada format lain skala proporsional atau catat override. Periksa crop, antarmuka Reels aktual dan lintasan transform/camera. `showSafeZone` hanya overlay Studio, default OFF, tidak ikut render.
- **Spacing:** antarbaris judul memakai line height 1.05–1.10; judul/subjudul 8–16 px; judul/deskripsi 12–24; label/keterangan 8–16; tulisan/objek 48–80; antarobjek 40–80; antargrup visual 64–100; objek/label 16–24. Jarak minimum **80 px** dari bounds objek ke VO Guide pada setiap frame bernarasi, ideal 100–120; jangan geser guide acak. Optical spacing lebih penting dari memaksa grid. Jangan isi whitespace dengan dekorasi atau memperbesar objek tanpa tujuan.
- **Lebar objek awal:** laptop/PC 640–800, jendela Windows 660–800, Run 500–660, CMD 680–800, ikon utama 120–220, ikon pendukung 64–100, jam 420–560, diagram jaringan 640–800, shortcut 460–720, cursor 28–38 px. Gunakan zoom terarah untuk detail, bukan membesarkan seluruh scene.
- Gunakan grid 8 px sebagai alat bantu alignment, bukan gap wajib. Satu focal point pada satu waktu, hindari tiga judul besar atau banyak card aktif sekaligus. Setiap objek memiliki nama/fungsi/z-order yang jelas.
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
- **Teks layar sesuai VO:** pilih nol atau satu frasa penegas pendek pada suatu beat, tidak perlu semua elemen informasi aktif bersamaan. Fade out teks yang tidak relevan **sebelum** demo/kursor menjadi fokus. VO Guide draft wajib aktif pada preview bernarasi; final OFF default. Subtitle final hanya jika diminta dan disinkronkan dengan rekaman. Ikuti §5A; jangan duplikasi tulisan besar.
- **Transisi bermakna:** lanjutkan objek, gerakan kursor, atau perubahan UI; tidak perlu garis, headline, label chapter maupun progress bar untuk menandai pindah scene. Tahan hasil tindakan cukup lama supaya penonton paham.
- **Pengecualian terkendali:** progress bar yang merepresentasikan proses sungguhan, menu asli software, state/status data, label keselamatan wajib, atau arahan brand yang diminta pengguna boleh ditampilkan; catat tujuan fungsionalnya. Jangan menambahkan elemen dekoratif hanya demi mengisi ruang kosong.

**Pertanyaan QA tiap elemen:** “Kalau elemen ini dihapus, apakah penonton kehilangan informasi atau sulit mengikuti aksi?” Jika **tidak**, hapus dari render. Periksa terutama frame awal, saat aksi utama, akhir scene, dan cover: apakah ada lebih dari satu *focal point* atau chrome yang masih menempel?

## 5. Subtitle, audio, ritme, dan keterbacaan

**Sound identity terkunci:** gunakan `docs/SOUND-DIRECTION-RULES.md` untuk tonal palette audio Minimal Editorial (ringan, presisi, bukan agresif), mapping cue/`omit` per beat, continuity lintas scene, CTA→Cover, dan voice-first mixing. Visual style boleh konsisten tanpa setiap gerak/slide menghasilkan whoosh.


- VO rekaman pengguna **setelah motion ACC**; sebelum itu gunakan naskah draft/VO Guide terpisah. Timing beat, frame dan teks layar harus mengikuti satu sumber konfigurasi per project.
- VO Guide mengikuti frasa/pengucapan natural, **satu baris**, tanpa highlight atau backing; jika terlalu panjang pecah cue tanpa mengubah naskah.
- Jika objek mendekati guide, reframe/geser visual ke atas. Jangan mengecilkan teks berlebihan atau memindahkan guide. Pada latar gelap, sesuaikan tinta untuk kontras tanpa blok.
- SFX hanya ketika ada *aksi terlihat*, cek onsets secara frame; VO harus tetap dominan. Rujuk `docs/SOUND-DIRECTION-RULES.md` dan `docs/WORKFLOW-VO-UNIVERSAL.md` (jangan duplikasi sound dari root dan scene).

## 5A. TEXT HIERARCHY & SUBTITLE LOCK v2.0 — wajib untuk video baru

**Narration explains → motion demonstrates → text emphasizes.** Pisahkan tiga peran; jangan memperlakukan subtitle sebagai headline atau teks pendukung sebagai subtitle kedua. Berlaku pada storyboard, source, preview dan QA video baru; revisi existing hanya dalam scope yang diminta, ACC tetap terkunci. Override eksplisit user (mis. video tanpa subtitle atau tanpa VO) dicatat pada storyboard/README.

| Peran | Fungsi | Default layout |
|---|---|---|
| Supporting text | Parameter, definisi, konversi, perbandingan, status, batasan, target atau penekanan yang membantu aksi | Atas atau callout dekat objek, muncul saat diperlukan; nol atau satu frasa penegas per beat, ideal 2–6 kata, bukan judul permanen |
| Main visual | UI/objek/kursor/diagram memperagakan aksi dan hasil; teks UI asli tetap utuh | Tengah, dominan, terbaca di HP; jangan mengecilkan demo untuk label opsional |
| Subtitle VO | Menampilkan seluruh narasi sesuai urutan frasa, tidak mengubah makna/VO ACC | Bawah, center, posisi konsisten, satu baris, transparan |

**Anti-double-function:** sebelum menambah supporting text, tanyakan apakah ia menambah pemahaman yang belum jelas dari subtitle + objek/UI. Jika tidak, hilangkan. Teks perintah/shortcut yang benar-benar dibutuhkan tetap ada dalam UI atau callout; jangan membuat salinan headline tambahan. Boleh menekankan kata teknis yang sama apabila fungsinya menunjuk parameter/objek, bukan mengulang satu kalimat. Jangan memaksa teks atas pada semua scene. Hook boleh punya satu penegasan singkat jika visual membutuhkan; CTA mengutamakan objek dan subtitle; cover silent hanya judul/objek (tanpa subtitle, tanpa CTA sisa).

| VO / subtitle | Hindari headline yang sama | Pendukung fungsional |
|---|---|---|
| Copy alamat folder tadi. | Copy alamat folder | Tidak perlu; seleksi address bar + Ctrl+C |
| Pilih huruf drive yang belum dipakai. | Pilih huruf drive | `Z:` = drive tujuan (callout pada parameter) |
| Ketik shutdown minus S. | Ketik shutdown minus S | `/s` = Shutdown |
| Masukkan 3600 detik. | Masukkan 3600 detik | 3600 detik = 1 jam |
| Folder muncul sebagai drive Z. | Folder jadi drive Z | Satu sumber data |
| Drive hilang setelah restart. | Drive hilang setelah restart | Mapping sementara (hanya jika membantu) |

**Subtitle preview:** pada setiap beat bernarasi, tampilkan subtitle DRAFT sejak preview motion pertama, tanpa meminta rekaman. Ambil teks dari `src/config/narration.json` yang aktual/ACC; bagi menjadi frasa natural (umumnya 4–8 kata, fleksibel untuk perintah/nama), tidak menghapus kata atau menambah narasi. Tentukan cue start/end frame eksklusif, jeda sesuai naskah, tanpa overlap, tanpa subtitle pada beat silent/cover. Pastikan teks tidak terlalu cepat dibaca; ubah timing draft jika diperlukan, bukan mengubah VO ACC. Status timing `DRAFT`, bukan sinkronisasi rekaman yang belum tersedia.

**Layout VO Guide 1080×1920:** Inter Medium 500, default 36 px, line height 1.2, warna `#646464` (ubah tinta untuk latar gelap), center X=520/Y=1505, max width 800. Satu baris `whiteSpace: 'nowrap'`; tanpa block, border, shadow, highlight atau animasi. Box awal x=120, y=1483.4, w=800, h=43.2. Jika glyph lebih lebar, pecah frasa/cue sesuai timing; tidak dipotong, tidak dipaksa kecil. Jarak dari objek min 80 px (ideal 100–120) berdasarkan bounds di setiap frame termasuk zoom dan transisi. `spatial-plan.json` memakai role semantik sesuai [Production Toolkit](PRODUCTION-TOOLKIT.md), dengan `vo-guide` untuk panduan; `visual` hanya kompatibilitas legacy; validator memeriksa zona, jumlah guide, gap pada semua frame deklaratif. Cek juga glyph dan pixel render nyata; tidak menyamakan plan dengan DOM.

**Implementasi:** sediakan `showSubtitles: true` pada manifest defaultProps untuk preview bernarasi dan pastikan source benar-benar menggunakannya. Toggle `false` menyembunyikan subtitle tanpa menghilangkan supporting text/UI atau mengubah timing. Full/segment memakai sumber scene dan timing yang sama; mode VO Guide terpisah dan tidak ditumpuk pada track subtitle. Untuk native Studio, buat satu callsite `Interactive.Text`/`Interactive.Div` bernama unik, teks child literal, style inline per cue, catat pada `production/editable-blueprint.json`; simpan timing dan teks cue dalam config terhubung ke naskah (jika literal diperlukan, verifikasi kesamaan), dokumentasikan edit teks/posisi/font/warna/timing. Dynamic Props bukan bukti drag/Save. Template baru dapat memakai `showSubtitles` saja; bila menambah `showOnScreenCaptions`, ikuti kontrak render CapCut dan pastikan kedua mode benar-benar bersih.

**Final:** motion ACC → VO Guide → rekaman pengguna → sinkronkan cue/hold dengan ucapan aktual → matikan VO Guide pada final; subtitle final Poppins hanya bila diminta, terpisah dan tidak bertumpuk. High dan CapCut HQ pada project compact mematikan guide melalui Props sementara; Preview Cepat mempertahankan Props. Untuk render langsung di Studio, set `showSubtitles=false` sebelum final (jangan hapus source). CapCut HQ adalah bahan mentah: sembunyikan semua subtitle draft/final/VO Guide lewat Props sementara yang dikenali Master, pertahankan supporting text dan UI, audit hasil MP4; jangan menimpa manifest/ACC. Lihat `docs/RENDER-HQ-CAPCUT.md`. QA wajib pada hook, setiap cue/aksi, batas scene, CTA dan cover; laporkan terpisah pemeriksaan source, render, audio dan GUI.

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
