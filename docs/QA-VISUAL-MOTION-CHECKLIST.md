# MOTIONGRAPHIC STUDIO — QUALITY GATE VISUAL & MOTION v2.0

Checklist untuk **video baru dan revisi yang diminta**. Bukan janji semua pengujian tersedia. Gunakan status `PASS`, `FAIL`, `BELUM DIUJI`, `TIDAK RELEVAN` pada tiap pemeriksaan; lampirkan bukti (frame, timestamp, nama file, log) bila ada. Jangan menyebut “lulus QA” secara umum jika hanya source yang diperiksa.

## A. Pre-build: kebenaran cerita

- [ ] Brief dan satu pesan utama jelas; 8 tahap **naratif** (MASALAH, KONFLIK, REAKSI, SOLUSI, DEMONSTRASI, HASIL, CTA, COVER) terpetakan tanpa memaksa 8 scene.
- [ ] Narasi/VO draft dan kata yang sudah ACC dibedakan; tidak mengubah hook/teks/scene LOCKED.
- [ ] Storyboard punya PESAN→OBJEK→PEMICU→AKSI→REAKSI→HASIL→HOLD→TRANSISI untuk setiap beat penting.
- [ ] Tahap tutorial/fakta UI/shortcut/angka dan konsekuensi tindakan diverifikasi dengan referensi sesuai konteks; tidak ada hasil “sukses” palsu, nilai fiktif, atau UI salah sasaran.
- [ ] Setiap scene punya *handoff* ke scene berikutnya; durasi, overlap, start-end frames, dan audio masuk/keluar dinyatakan eksplisit.

## B. Visual/brand

- [ ] `docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md` dipakai atau override brand kit dicatat; setiap scene satu focal point.
- [ ] Font **benar-benar tersedia saat render**; jika Inter belum dibundel/di-load, gunakan fallback Arial yang konsisten. Gaya headline, subtitle, kode, label tidak bercampur tanpa alasan.
- [ ] Typography terbaca pada preview berskala 25–33% (simulasi layar HP); cek pemenggalan, overflow, line-height, serta dominasi teks.
- [ ] Teks sekunder penting tidak memakai abu terlalu pudar; uji kontras / plate teks pada latar rumit. Warna status selalu ditemani ikon/label.
- [ ] Hero/CTA/subtitle/hasil di area aman x=50–1030 dan y=250–1570; inset dekorasi boleh di luar. Subtitle dan UI tidak saling bertabrakan.
- [ ] Kartu, shadow, radius, ikon, background grid, stroke, perspektif dan alignment konsisten, tetapi UI software tetap meniru aslinya.
- [ ] Screenshot/aset tidak pecah, stretched, watermarked, atau melanggar lisensi; catat provenance bila ada.

### CLEAN FOCUS v2.1 — gate wajib untuk video BARU

- [ ] Pada frame hook, aksi utama, hasil, CTA dan cover, **tidak ada** running header/footer, badge `01 — HOOK`, label produksi, progress bar dekoratif, garis coral melintang, border halaman atau metadata template yang tak punya makna bagi penonton.
- [ ] Tiap elemen overlay punya **fungsi yang bisa dijelaskan** (petunjuk, target klik, hasil, status asli); yang hanya memanis dihapus. Progress/taskbar Windows yang asli **tidak dianggap** clutter.
- [ ] Demo/objek utama berukuran dominan dan terbaca pada HP; **headline tidak menetap selama demonstrasi** dan tidak ada duplikasi headline + caption + subtitle untuk ucapan yang sama.
- [ ] Latar awal off-white polos; jika grid/tekstur/ornamen dipakai, ada alasan fungsi dan tidak bersaing dengan UI. Teks yang sudah selesai fungsinya hilang tepat waktu.
- [ ] Audit **contact sheet semua scene** untuk overlay persisten, bukan hanya cek still pertama; source-only tidak boleh diberi status PASS render/visual.

## C. Gerak, continuity, dan layar software

- [ ] Ada trigger yang jelas sebelum aksi, reaksi setelahnya, serta hasil yang bertahan cukup lama.
- [ ] Progressive reveal, easing, motion blur (bila ada), anticipation/follow-through tidak menutupi konten.
- [ ] Kursor/hotspot klik, target drag, fokus input, dan respons UI akurat; tidak ada pointer melintas/berhenti pada area yang salah.
- [ ] Kamera hanya bergerak jika membantu pemahaman; tidak ada zoom/shake/flash generik repetitif.
- [ ] Transition A→B tidak menduplikasi objek, mengubah ukuran secara mendadak, membuat flash kosong, atau meninggalkan overlay lama.
- [ ] Tidak ada objek/layer saling menumpuk secara tak sengaja, teks keluar frame, elemen penting hilang/terpotong saat transisi.
- [ ] Screenshot/contact sheet semua scene berisi setidaknya frame awal, key action, hasil dan akhir; inspeksi rapat ± beberapa frame pada titik transisi dan tindakan sulit.

## D. VO, subtitle, musik, SFX

**Sound QA v2.1:** rujuk `docs/SOUND-DIRECTION-RULES.md`. Isi status per baris dengan bukti; validator `qa:sound` hanya menguji metadata/asset, bukan kualitas mix.

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
- [ ] Subtitle tidak mengulang hero text panjang, maksimal sekitar dua baris per beat, tidak tercepat untuk dibaca, dan tidak melanggar safe zone.
- [ ] SFX punya aksi pemicu dan posisi frame, tanpa doubling layer; VO tetap dominan, tidak ada clipping atau gap berbahaya.
- [ ] Musik/stock sound memiliki asal dan hak penggunaan yang sesuai, terutama untuk monetisasi.
- [ ] Mix audio/MP4 final didengarkan, bukan hanya diperiksa dari source atau angka; jika tidak tersedia tandai `BELUM DIUJI`.

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
- [ ] **Video baru:** ZIP `<slug>/` mandiri dengan manifest, source, storyboard, README dan panduan aset; bukan seluruh Master.
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
