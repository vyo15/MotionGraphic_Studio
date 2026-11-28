# MOTIONGRAPHIC STUDIO — QUALITY GATE VISUAL & MOTION v2.0

Checklist untuk **video baru dan revisi yang diminta**. Bukan janji semua pengujian tersedia. Gunakan status `PASS`, `FAIL`, `BELUM DIUJI`, `TIDAK RELEVAN` pada tiap pemeriksaan; lampirkan bukti (frame, timestamp, nama file, log) bila ada. Jangan menyebut “lulus QA” secara umum jika hanya source yang diperiksa.

## Pre-preview gate
Jalankan `npm run addon:validate -- <folder-addon> --production --syntax` untuk video baru yang siap review; gate ini sudah memeriksa motion, spatial, native, sound dan syntax. Gunakan `qa:motion`, `qa:spatial`, `qa:native`, `qa:layers` dan `qa:sound --strict` sebagai diagnostik terarah jika diperlukan, bukan workflow kreatif kedua. Periksa contact sheet, preview full/segment bergerak, audio, dan GUI secara terpisah; koreksi error yang ditemukan sebelum menunjukkan preview jika bisa. Jangan menahan source yang diminta hanya karena runtime tidak tersedia: beri status belum diuji. Untuk final, ulangi gate setelah sync dan cek MP4/audio nyata.

### Spatial evidence
Gunakan `node tools/capture-spatial.mjs projects/<slug>` untuk project baru yang memakai screen-space-v1 setelah sync; `--full` untuk coverage lengkap, `--mode final` untuk guide OFF. Validasi trace dengan `qa:spatial --trace ... --require-full --mode preview|final`. Catat jenis bukti, status, coverage, freshness, dan frame PNG. `PASS_SAMPLED` tidak setara full, `STALE` harus capture ulang setelah edit. Tidak tersedia runtime = NOT RUN/INCOMPLETE. Lihat Production Toolkit; jangan paksa capture untuk project ACC/legacy. Periksa pixel, GUI Save/reload, klik dan z-order secara manual sampai gate tersebut teruji.

## A. Pre-build: kebenaran cerita

- [ ] Brief dan satu pesan utama jelas; 8 tahap **naratif** (MASALAH, KONFLIK, REAKSI, SOLUSI, DEMONSTRASI, HASIL, CTA, COVER) terpetakan tanpa memaksa 8 scene.
- [ ] Narasi/VO draft dan kata yang sudah ACC dibedakan; tidak mengubah hook/teks/scene LOCKED.
- [ ] Storyboard punya PESAN→OBJEK→PEMICU→AKSI→REAKSI→HASIL→HOLD→TRANSISI untuk setiap beat penting.
- [ ] Tahap tutorial/fakta UI/shortcut/angka dan konsekuensi tindakan diverifikasi dengan referensi sesuai konteks; tidak ada hasil “sukses” palsu, nilai fiktif, atau UI salah sasaran.
- [ ] Setiap scene punya *handoff* ke scene berikutnya; durasi, overlap, start-end frames, dan audio masuk/keluar dinyatakan eksplisit.

## B. Visual/brand

- [ ] `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` dipakai atau override brand kit dicatat; setiap scene satu focal point.
- [ ] Font **benar-benar tersedia saat render**; Poppins/Inter/Manrope lokal sesuai font-lock; draft fallback tidak boleh diberi status review. Gaya headline, subtitle, kode, label tidak bercampur tanpa alasan.
- [ ] Typography terbaca pada preview berskala 25–33% (simulasi layar HP); cek pemenggalan, overflow, line-height, serta dominasi teks.
- [ ] Teks sekunder penting tidak memakai abu terlalu pudar; uji kontras / plate teks pada latar rumit. Warna status selalu ditemani ikon/label.
- [ ] Hero/CTA/objek penting x=120–920, y=280–1360; guide x=120–920, y=1470–1540; background boleh full frame. Review crop 3:4 dan overlay Reels aktual.
- [ ] Tulisan terkait compact; gap visual 48–80 px dari teks, antarobjek 40–80 px; jangan mepet atau kopong. Ukur glyph actual, tidak hanya bounding box; tidak ada overflow/wrap guide.
- [ ] Kartu, shadow, radius, ikon, background grid, stroke, perspektif dan alignment konsisten, tetapi UI software tetap meniru aslinya.
- [ ] Screenshot/aset tidak pecah, stretched, watermarked, atau melanggar lisensi; catat provenance bila ada.

### CLEAN FOCUS v2.1 — gate wajib untuk video BARU

- [ ] Pada frame hook, aksi utama, hasil, CTA dan cover, **tidak ada** running header/footer, badge `01 — HOOK`, label produksi, progress bar dekoratif, garis coral melintang, border halaman atau metadata template yang tak punya makna bagi penonton.
- [ ] Tiap elemen overlay punya **fungsi yang bisa dijelaskan** (petunjuk, target klik, hasil, status asli); yang hanya memanis dihapus. Progress/taskbar Windows yang asli **tidak dianggap** clutter.
- [ ] Demo/objek utama berukuran dominan dan terbaca pada HP; **headline tidak menetap selama demonstrasi** dan tidak ada duplikasi headline + caption + subtitle untuk ucapan yang sama.
- [ ] Latar awal off-white polos; jika grid/tekstur/ornamen dipakai, ada alasan fungsi dan tidak bersaing dengan UI. Teks yang sudah selesai fungsinya hilang tepat waktu.
- [ ] Audit **contact sheet semua scene** untuk overlay persisten, bukan hanya cek still pertama; source-only tidak boleh diberi status PASS render/visual.

### TEXT HIERARCHY & SUBTITLE LOCK v2.0 — gate wajib video baru

- [ ] Setiap beat bernarasi memiliki cue subtitle draft aktif default; seluruh kata VO sesuai naskah/ACC, urut dan tanpa pengulangan/gap yang tidak disengaja. Cue silent/cover kosong. Timing draft tidak disebut sinkron rekaman.
- [ ] Supporting text memiliki fungsi tambahan yang dicatat (parameter, arti, nilai, status, batasan atau `omit`); tidak ada headline yang mengulang subtitle/UI. Jika subtitle+demo cukup, hapus teks atas.
- [ ] Periksa render hook, tiap cue, aksi utama, transisi, CTA dan cover: VO Guide stabil, Inter 36 px, satu baris tanpa backing, shadow, border atau highlight; jarak minimum 80 px dari objek pada semua frame, termasuk camera/transition; terbaca pada ukuran HP.
- [ ] `showSubtitles: true` default preview dan `false` benar-benar menyembunyikan track tanpa menghapus UI/supporting text. Full dan segment memakai timing yang sama; final/draft/VO Guide tidak menumpuk. High/CapCut HQ bersih dari guide untuk designContract baru (cek MP4), Preview Cepat ON sesuai Props; safe zone hanya Studio.
- [ ] Cue native memiliki nama unik, literal dan target blueprint sesuai kontrak; edit teks/timing konsisten dengan naskah. Uji Save/reload jika GUI tersedia; source-only bukan PASS visual/GUI.

## C. Gerak, continuity, dan layar software

- [ ] Ada trigger yang jelas sebelum aksi, reaksi setelahnya, serta hasil yang bertahan cukup lama.
- [ ] Progressive reveal, easing, motion blur (bila ada), anticipation/follow-through tidak menutupi konten.
- [ ] Kursor/hotspot klik, target drag, fokus input, dan respons UI akurat; tidak ada pointer melintas/berhenti pada area yang salah.
- [ ] Kamera hanya bergerak jika membantu pemahaman; tidak ada zoom/shake/flash generik repetitif.
- [ ] Transition A→B tidak menduplikasi objek, mengubah ukuran secara mendadak, membuat flash kosong, atau meninggalkan overlay lama.
- [ ] Tidak ada objek/layer saling menumpuk secara tak sengaja, teks keluar frame, elemen penting hilang/terpotong saat transisi.
- [ ] Screenshot/contact sheet semua scene berisi setidaknya frame awal, key action, hasil dan akhir; inspeksi rapat ± beberapa frame pada titik transisi dan tindakan sulit.

## D. VO, subtitle, musik, SFX

**Sound QA v2.2:** rujuk `docs/SOUND-DIRECTION-RULES.md`. Isi status per baris dengan bukti; validator `qa:sound` menguji metadata/asset dan wiring statis pada kontrak cue-track-v1, bukan kualitas mix.

- [ ] Sound intent (`cue`/`omit`) sudah dibuat untuk setiap beat/perpindahan, serta alasan efek/hening jelas; tidak semua transition diberi whoosh.
- [ ] SFX klik/impact/drop/success terdengar **sesuai frame aksi visual**; tidak ada sound sukses sebelum hasil benar terjadi.
- [ ] Tail SFX pada batas scene tidak terpotong/digandakan; satu cue satu playback track (cek root vs scene/legacy scene-WAV).
- [ ] Variasi texture/dinamika menjaga video hidup namun tidak monoton, berisik, atau menguras perhatian.
- [ ] VO dominan; ducking, fade, headroom, klik tajam/peaking, musik dan ambience di-audisi bersama rekaman natural.
- [ ] Aset audio ada/ter-decode, durasi WAV cocok dengan cue, path & lisensi benar; `planned` tidak disebut `ready`.
- [ ] CTA tidak terpotong oleh cover; sound handoff cocok dengan objek yang diteruskan; hold thumbnail final tidak terganggu efek.
- [ ] Audit MP4 akhir (peak/LUFS bila tersedia), speaker HP, headphone, mono, volume rendah, dan silent spots disengaja.

- [ ] Jika VO belum direkam, statusnya jelas `DRAFT/VO GUIDE` dan bukan klaim audio final.
- [ ] Setelah rekaman VO tersedia, sinkronkan onset/caption/hold terhadap **ucapan aktual**, jangan mempercepat suara demi mengejar durasi.
- [ ] Keterbacaan subtitle mengikuti gate Text Hierarchy di bagian B. Hak penggunaan musik/stock sound mencakup tujuan monetisasi bila relevan. Jika listening tidak tersedia, tandai `BELUM DIUJI`.

## E. Cover Reels / thumbnail

- [ ] Cover adalah **scene terakhir setelah CTA** untuk video baru, kecuali override eksplisit.
- [ ] Mini-demo 1–3 aksi benar-benar merangkum mekanisme, kemudian hero frame stabil **1–2 detik**.
- [ ] Judul dan objek utama terbaca pada video penuh 9:16 **dan crop 3:4**, tidak tertutup elemen UI aplikasi.
- [ ] `coverFrame` dipilih pada titik tanpa kursor, blur, gerak utama, watermark atau tulisan yang hilang; masih jelas pada thumbnail kecil.
- [ ] File still PNG/JPG hanya dilaporkan jika benar-benar diekspor.

## F. Editability, source, runtime, dan delivery

- [ ] JSON manifest sesuai schema; ID/slug/path/fps/frame total konsisten; tidak ada import/aset hilang.
- [ ] Layer bernama, independen, z-index dan config yang disepakati tersedia; perbedaan source-editable/Props-editable/Studio-editable diuji, jangan klaim otomatis.
- [ ] Bila mungkin: typecheck/validator, test, sync, smoke frame, render MP4, pemeriksaan codec/resolusi/FPS, serta frame transition contact sheet. **Tuliskan apa yang dijalankan, jangan samakan statis dengan render.**
- [ ] Jika Studio GUI tersedia, uji select→drag/edit→Save-to-code→reload→render untuk layer yang dijanjikan editable.
- [ ] Tidak menyentuh project/scene lain atau `Root/index/catalog/mirror` generated; ACC dan file lokal dijaga.
- [ ] **Revisi/Master fix:** ZIP FILE CHANGE ONLY, hanya file baru/berubah dengan path relatif **dari dalam `MotionGraphic-Studio/`**. Tidak ada file yang tidak berubah; sebelum Replace cek risiko edit lokal.
- [ ] **Video baru:** ZIP FILE CHANGE ONLY dengan seluruh file baru dalam `projects/<slug>/`, manifest, source, storyboard, README dan panduan aset; bukan seluruh Master.
- [ ] Untuk chat baru: ZIP Master terbaru benar-benar dibuka dan `CHATGPT-READ-FIRST.md` dibaca; dokumen ZIP tidak otomatis mengubah Project Instructions.

## Ringkasan QA yang dikirim ChatGPT

| Pemeriksaan | Status | Bukti / batasan |
|---|---|---|
| Storyboard & ACC | ... | ... |
| Source/manifest/import | ... | ... |
| Typography/layout/crop | ... | ... |
| Transisi/frame | ... | ... |
| VO/subtitle/SFX | ... | ... |
| Native editable | ... | ... |
| Render MP4 & inspeksi | ... | ... |
| Cover thumbnail | ... | ... |

**Aturan keputusan:** bila kriteria keras gagal (mis. source tak valid, hasil demonstrasi keliru, konten di luar frame, file ACC ditimpa, patch berisi file tak diminta), jangan melabeli produk “final siap publikasi”. Laporkan blocker dan perbaikan terarah.

## G. Focus-driven motion v3.0 — gate video baru

- [ ] `node tools/qa-motion-plan.mjs projects/<slug>` PASS metadata; fingerprint sesuai narration aktual. Jangan menyamakan PASS dengan visual.
- [ ] Satu target dominan per beat, pilihan gerak mempunyai alasan semantik; hold jika tidak ada informasi baru. Tidak ada Slide Mask dekoratif, zoom reset, gerak generik atau efek yang bersaing.
- [ ] UI landscape fit/zoom uniform, camera pan terencana; target/cursor/hotspot/menu/hasil terbaca saat dibutuhkan. Subtitle/background di screen space stabil. Pose world kontinu pada carry; full/segment cocok pada frame yang sama.
- [ ] Cek bounds transform selama lintasan: awal/akhir dan frame antara, khususnya ±3 frame sekitar aksi, cut dan overlap; untuk gerak cepat tinjau tiap frame. Tidak ada clipping/occlusion penting atau benturan dengan subtitle, judul, safe area; overlap native UI yang disengaja dicatat. Periksa hasil sebenarnya, bukan hanya deklarasi focusSamples.
- [ ] VO draft vs rekaman aktual dibedakan; cue, action, reaction, hold dan sound handoff sinkron; cover tetap silent dan hold cukup.
- [ ] Preview bergerak dan native GUI Save/reload diuji secara terpisah; jika tidak tersedia tandai BELUM DIUJI. Tidak mengubah ACC tanpa izin.

## Gate release 2.0.0
Untuk video baru gunakan production gate di atas (flag produksi eksplisit; scaffold/legacy tetap dapat memakai `--strict`). `npm run qa:motion -- --all` melewati legacy tanpa kontrak, bukan PASS visual. `npm run release:check` memeriksa konsistensi versi sebelum ekspor Master. Lihat `CHATGPT-HISTORY.md` untuk pelajaran historis, bukan aturan produksi.

## Production Toolkit v1.0 — Master 2.0.0
See `docs/PRODUCTION-TOOLKIT.md` for spatial-plan, camera helpers, VO alignment and approval QA; production flow and gate are owned by `PRODUCTION-RULES.md`.

### Audit Master
`npm run check` dan `npm run qa` adalah alias full gate; daftar daily/full gate dimiliki `tools/studio-preflight.mjs`. Full gate memeriksa freshness board tanpa menulis, SFX library, layer, approval, sound dan spatial sesuai kontrak, serta typecheck. `npm test` dijalankan terpisah (regression suite); render/GUI/listening tetap terpisah.

## Gate revisi terbatas (scope / animation / natural timing / object-centered)
- Bandingkan source dan preview sebelum–sesudah: perubahan hanya target ACC; motion lokal, aset, font, subtitle, cue, easing dan scene tetangga tetap. Jangan menerima screenshot sebagai pengganti motion.
- Cek object bounds aktual, optical center, gap headline dan guide pada frame aksi/hold/handoff; pengecualian berdasarkan ACC dicatat.
- Jika durasi berubah, cocokkan manifest, Sequence, segment, narration, cue/typing, spatial/motion plan, thumbnail dan state. Jangan menekan timing untuk mengejar angka.
- Nyatakan batas static QA versus native render, GUI Save/reload dan listening; jangan mengklaim pixel parity tanpa bukti.

- QA VO kontinu: ikuti `WORKFLOW-VO-UNIVERSAL.md` (CONTINUOUS VO LOCK); periksa gap buatan, potongan/overlap di boundary visual, dual playback full/segment, alignment subtitle/highlight dan listening aktual. Metadata/VAD bukan bukti sinkron kata.

### Spatial Intelligence Paket 01/02
- [ ] Video review baru: kontrak layer semantik, native/plain identity, protected visibility, overlap berbatas waktu; plan statis lulus.
- [ ] Capture trace v3 sesuai preset/frame/scope; data tidak lengkap atau stale tidak dianggap lulus. Sampling bukan full QA.
- [ ] Review temuan overlap/occlusion, font/layout/clip, cursor hotspot/response, scene transition dan cover; kandidat `WARNING` membutuhkan inspeksi PNG/MP4, terutama paint/mask/shape kompleks.
- [ ] `review.html` dan report JSON: frame/scene/layer, rekomendasi, bukti terpilih. Uji actual full/segment, native Save/reload dan listening pada PC; tidak ada forced layout atau ACC otomatis.

### Paket 03/04 — QA gate terintegrasi
- [ ] Baca `layout-advice.json` sebagai usulan screen-space, jangan forced layout; review alignment, spacing, hierarchy, text-fit dan reading time. Terapkan perubahan source hanya dalam scope yang diizinkan; re-capture dan bandingkan.
- [ ] Preview diagnostik bukan PASS. High/CapCut review baru: bukti full scope sesuai preset dan fingerprint current; post-render QA, SHA-256 output, contact sheet dan review visual/listening terpisah. Warning/fail mempertahankan MP4 diagnostik, bukan final ACC.
- [ ] `CACHED_SAMPLE` hanya bukti historis input sama, bukan pengukuran browser sesi ini; handoff bounded summary, tidak menggantikan trace lokal. Lihat Production Toolkit untuk queue, batas capture dan status runtime.

### Final A–E refinement
- [ ] Validate containment, bounded protected fade, exact primary family/weight and explicit preset subtitle policy. No glyph-level certification from computed metadata.
- [ ] Declare object anchor and headline group for new compact object scenes. Review artwork bounds, drift, gap and alignment; never move locked anchor solely for text.
- [ ] Review pointer-events-none candidates and differential pixel evidence if available; no waiver from approximate masks. Plain text reflow candidate only; re-capture after source change.
- [ ] Run staged pilot baseline and expected faults; benchmark capture and verify browser/full-segment/native Save/reload/MP4/listening on PC. Check dev watcher, prod, menu and QA handoff. Separate diagnostic ZIP if normal static gate fails.
