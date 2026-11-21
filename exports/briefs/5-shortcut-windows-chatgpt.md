# BRIEF CHATGPT → MOTIONGRAPHIC STUDIO

Judul: 5 shortcut windows
Slug usulan: 5-shortcut-windows
Audiens: Pengguna komputer Indonesia
CTA: Ajak penonton berbagi pengalaman

Buatkan motion graphic edukasi Remotion untuk judul di atas menggunakan Custom Skill MotionGraphic Studio Director serta Project Rules Motion-Graphic yang berlaku. Satu Master folder-first; jangan membuat Remotion Studio baru atau mengubah file registrasi Master. Periksa contracts/studio-capabilities.json Master terbaru jika disediakan; jangan mengarang kompatibilitas.

Pilih teknik Lemo-Opuscar sesuai materi, hanya sebagai teknik visual. Pertahankan Minimal Editorial: #F7F7F5, #202020, #DF805F, grid samar dan UI clean. Default 1080x1920, 30 FPS, 15–30 detik, safe zone 250/350/50 px. Visual harus memperagakan SEBAB → AKSI → REAKSI → HASIL → HOLD, bukan dekorasi atau mengulang seluruh VO.

Workflow yang tidak boleh diubah: NASKAH DRAFT → STORYBOARD → BUILD MOTION → PREVIEW/REVISI → VO GUIDE → pengguna rekam VO → sinkronisasi → QA → render final. Jangan meminta file rekaman sebelum motion disetujui.

Buat add-on mandiri <slug>/ dengan motiongraphic-video.json, src/Video.tsx export const Video, scenes/components/animations/config, aset lokal yang diperlukan, README.md, PANDUAN-EDIT-ASSET.md, dan daftar layer/editabilitas. Pisahkan teks, objek, UI, cursor dan efek secara independen. Gunakan Props/Interactive hanya bila didukung Remotion. Animasi dan transform harus berbasis frame dan tidak flatten. Bila saya meminta langsung dibuat, selesaikan add-on ZIP pada giliran ini; jangan berhenti di konsep.

Validasi manifest/import/aset, layout, font, animasi, VO Guide, dan source. Jangan mengklaim semua layer draggable atau MP4/Windows sudah diuji bila belum diuji. Kirim hanya ZIP add-on (atau patch terbatas saat revisi), bukan Master baru.
