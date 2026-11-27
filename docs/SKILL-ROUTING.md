# Skill routing — Unified Production 1.0 (referensi on-demand)
Satu director logis: MotionGraphic Studio Director bila tersedia. Tidak ada pemasangan otomatis akun. Enam dokumen inti merupakan fallback. Skill tidak boleh menjadi sumber flow baru atau menimpa ACC. Prinsip Opuscar sudah ada di Motion Direction; adapter lokal hanya referensi, tidak menjalankan engine.

| Tugas | Skill jika tersedia | Jangan aktifkan |
|---|---|---|
| Ide/storyboard | Director, teknik dominan dari Motion Direction | Renderer, upgrade, SaaS |
| Build add-on | remotion-best-practices, remotion-markup, remotion-create (adaptasi add-on), remotion-interactivity | create app baru |
| Preview/QA | remotion-studio, remotion-render | upgrade otomatis |
| Sync subtitle/VO | remotion-captions; multimedia bila media perlu diolah | ASR atau TTS palsu |
| Gerak sulit/kamera | motion-continuity-director sebagai modul, toolkit kamera | semua efek sekaligus |
| Sound plan/build/mix | sound-design-director sebagai modul; Local-First WAV | provider/network saat render |
| API yang meragukan | remotion-docs | API versi lain tanpa cek |
| Peta | remotion-maps hanya bila peta diperlukan | default video umum |
| SaaS/server, upgrade | remotion-saas / remotion-upgrade hanya tugas eksplisit | semua produksi Reels |

`npm run skills` hanya cek PC, `npm run skills:install` hanya instalasi lokal sesuai tool; bukan akun ChatGPT. Tidak perlu memasang semua skill untuk produksi. Folder skill yang terpasang pada PC/akun tidak diketahui dari ZIP ini. Jika skill custom akun lama memuat rules duplikat, nonaktifkan setelah backup atau ubah menjadi router tipis ke Master ini. Jangan menghapus skill dari akun secara otomatis.
