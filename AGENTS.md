# Agent rules — MotionGraphic Studio Master (authoritative entry point)

> **WAJIB SAAT ZIP MASTER DIUNGGAH KE CHATGPT:** Buka ZIP, temukan folder `MotionGraphic-Studio/`, kemudian baca `CHATGPT-READ-FIRST.md` ini melalui urutan: `CHATGPT-READ-FIRST.md` → `AGENTS.md` → `PRODUCTION-RULES.md` → `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md` → dokumen project terkait. Jangan menjawab berdasarkan nama ZIP atau ingatan versi lama. Jika ZIP tidak bisa dibaca, nyatakan keterbatasannya, jangan mengklaim sudah audit. Dokumen di ZIP bukan konfigurasi otomatis akun ChatGPT.

1. **BACA DULU** `PRODUCTION-RULES.md`, **`docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md`**, `docs/MOTION-DIRECTION-RULES.md` dan `docs/QA-VISUAL-MOTION-CHECKLIST.md` untuk semua build baru. Style-lokalisasi brand/ACC tetap di atas default. Jika sedang mengerjakan video tertentu, baca juga `projects/<slug>/AGENTS.md`, `PROJECT-SCOPE.md`, `SCRIPT.md`, `STORYBOARD.md`, `PRODUCTION-STATE.json`, manifest dan source Remotion yang aktual.
2. **SATU MASTER / REMOTION STUDIO SAJA**. Proyek baru add-on utuh di `projects/<slug>/`; jangan membuat Studio baru, jangan edit manual `src/Root.tsx`, `src/index.ts`, `library/catalog.json`, atau `package.json` untuk membuat video. `npm run dev` / `npm run sync` mengurus registrasi.
3. **MODE PRODUKSI SESUAI PERMINTAAN**: hanya judul/diskusi → konsep + storyboard, tanpa modifikasi source; meminta audit/bedah/review → audit saja, source tetap; meminta preview satu scene → bangun/revisi hanya scene itu dan tunggu ACC untuk melanjutkan mode bertahap; **meminta langsung buat/build video lengkap → bangun add-on lengkap dalam giliran yang sama tanpa memaksa approval script/storyboard/scene pertama**. Approval eksplisit tetap wajib untuk mengubah bagian yang sudah terkunci/ACC. VO rekaman pengguna baru setelah motion disetujui.
4. **REVISI TERBATAS**. Pertahankan ID/slug/project lain, layer names, aset dan archive. Scope revisi hanya elemen/scene yang diminta; jangan mengubah bagian locked secara diam-diam.
5. **REMOTION-NATIVE**. Full video = preview/render ringkas; segment = editing detail via `src/SegmentVideo.tsx` dengan komponen scene yang sama. React JSX biasa tidak otomatis drag/drop. Gunakan `Interactive` bila didukung, dan uji edit → save/reload/sync.
6. **STORYBOARD UNIVERSAL 8 TAHAP + MOTION NARRATION-DRIVEN**. Setiap video baru memakai alur cerita MASALAH → KONFLIK → REAKSI → SOLUSI → DEMONSTRASI → HASIL → INTERAKSI/CTA → COVER REELS. Ini **tahap naratif**, bukan wajib delapan scene fisik. Tahap boleh digabung, tetapi **Cover Reels berada pada scene paling akhir setelah CTA** (kecuali user menentukan lain), berisi mini-demonstrasi inti konten → komposisi thumbnail → hold 1–2 detik. Rumus setiap beat: PESAN → OBJEK → PEMICU → AKSI → REAKSI → HASIL → HOLD → TRANSISI. Narasi menjelaskan, visual mendemonstrasikan, typography menekankan. Baca `docs/STORYBOARD-TEMPLATE-UNIVERSAL.md`. Video/scene lama yang ACC tidak boleh diretrofit tanpa permintaan user.
7. **DELIVERY WAJIB**. Revisi video existing / master fix = **FILE CHANGE ONLY**, yakni satu ZIP berisi **hanya file baru/berubah dengan ISI FILE LENGKAP**, path sama persis relatif terhadap root `MotionGraphic-Studio/` (contoh `projects/<slug>/src/scenes/Scene03.tsx`); pengguna cukup ekstrak dan copy–paste **Replace** ke root Master. Jangan kirim ulang Master, project utuh, file tak berubah, installer/BAT/patcher, atau meminta pengguna menempel fragmen kode manual. Video BARU = ZIP add-on utuh `<slug>/`, bukan patch revisi. Laporkan file berubah dan QA yang benar-benar dilakukan. Copy–Replace tidak mendeteksi konflik lokal: audit base dan anjurkan backup/perbandingan saat ada risiko edit lokal.
8. **AUTO PROJECT SCOPE**. `npm run sync` menambahkan file kontrol produksi hanya jika belum ada. File keputusan yang ada tidak pernah direset atau ditimpa saat sync. Untuk memeriksa gunakan `node tools/production-scope.mjs --check`.

**Precedence:** permintaan user terbaru yang eksplisit (pada scope yang diminta) + keputusan ACC yang belum dibuka → kontrak/source Master aktual → rules Project ChatGPT → aturan teknis di atas → catatan lama. Jika source dan tujuan berbeda, laporkan mismatch; jangan mengarang kesesuaian. Aturan gate approval pada dokumen lama hanya berlaku untuk mode **review bertahap**, bukan saat user secara eksplisit meminta **langsung build**.


## WAJIB — SCENE VO/ACC DASHBOARD + HYGIENE

Saat membahas video aktif, buka `production/SCENE-VO-ACC-BOARD.md` (otomatis diperbarui pada `npm run sync`) beserta `PRODUCTION-STATE.json` dan `src/config/narration.json`. Tampilkan **VO lengkap seluruh scene** (termasuk bridge, CTA, cover tanpa VO), timing dan empat status terpisah: VO teks, visual, rekaman/sync, final. Beri detail scene yang sedang dibahas setelah ringkasan. Jangan menyimpulkan visual ACC berarti VO final; perubahan status hanya setelah ACC user. Aturan: `docs/SCENE-VO-ACC-WORKFLOW.md`.

Perintah preview animasi berarti **hasil bergerak** (MP4/GIF), bukan mockup gambar; cek `docs/PREVIEW-VIDEO-OUTPUT-CONTRACT.md`. Cleanup hanya artefak yang terbukti aman; lihat `docs/ARTIFACT-HYGIENE.md`. Hapus tidak bisa dilakukan dengan copy–paste–Replace: sediakan daftar hapus manual jika perlu; jangan menyentuh backups/project yang ACC.

## User flow ChatGPT yang teruji
`npm run flow` menuntun dari judul sampai QA. `npm run flow -- --new "Judul video"` menulis brief siap salin di `exports/briefs/` (tidak otomatis mengirim ke ChatGPT). Untuk distribusi sistem, `npm run zip -- --studio` hanya mengekspor engine; video tetap di `projects/` pada PC, ekspor video sendiri lewat `npm run zip -- --all`. Baca `docs/USER-FLOW-CHATGPT.md` dan `docs/EDITABLE-CONTRACT.md`.


## Acuan Project ChatGPT terkini
Baca `docs/CHATGPT-PROJECT-REFERENCE.md` untuk user flow, pemetaan 12 Agent Skills resmi Remotion,
aturan native editability, VO setelah motion ACC, serta kontrak v1.8.1.
Gunakan skill resmi secara selektif; `npm run skills:install` hanya memasang pada PC,
bukan memperbarui Skill yang terinstal pada akun ChatGPT.

**SOUND DIRECTION SYSTEM v2.1:** `docs/SOUND-DIRECTION-RULES.md` adalah aturan utama untuk kualitas suara, mapping SFX/`omit` per beat, audio continuity antar-scene, gain/ducking, CTA→Cover, lisensi, sinkronisasi frame dan listening QA. Terapkan pada video baru; tidak retrofit project ACC. Sound plan ada di starter `production/SOUND-PLAN.md`, cue yang benar-benar ada di `production/sound-cues.json`.

## Sound Design Director (Openverse / Real SFX / earshot)
Saat build atau review scene, baca `skills/sound-design-director/SKILL.md` dan `docs/SOUND-DESIGN-WORKFLOW.md`. Setelah scene motion ACC, susun cue SFX per frame dan sumber audio berlisensi; rekaman VO tetap belakangan. Jangan tambah SFX ke setiap gerakan atau klaim paket Claude Code/earshot dijalankan otomatis. Aset audio per slug di `public/audio/sfx/`, metadata cue di `production/sound-cues.json`. Lakukan `node tools/qa-sound-cues.mjs projects/<slug> --strict` sebelum final render.

### Standar layer dan sound per scene (seluruh video baru)
Gunakan `docs/SCENE-LAYER-AND-SOUND-STANDARD.md` sebagai kontrak tambahan: satu call-site `Interactive` per objek penting yang harus diedit sendiri (hindari `+N instances` dari wrapper bersama), VO direkam setelah motion ACC, dan satu daftar cue SFX berdasarkan aksi nyata. Kualitas dan Save/reload hanya diklaim jika benar-benar diuji.


### Teks VO/subtitle yang dijanjikan editable di Studio
Untuk setiap video baru, deklarasikan satu `Interactive.Text`/`Interactive.Div`
mandiri dengan isi literal per cue/baris subtitle penting, bukan satu wrapper
`Caption` yang diulang dengan `.map()` dan membuat `+N instances`.
Pertahankan jalur Props untuk teks dinamis; uji klik, Save, reload, render.
Lihat `docs/EDITABLE-CONTRACT.md`.

## WAJIB — Editable First Gate (video baru)
Gunakan template `studio-direct-v4`, `production/editable-blueprint.json`, satu `<Interactive.Text/Div>` ber-`name` literal untuk tiap teks/cue penting, **bukan** wrapper reusable yang sama menghasilkan `+N instances`. Pisahkan cue subtitle draft, final, dan VO Guide. QA source melalui `npm run qa:native` dan import validator; QA GUI Save/reload/render tetap diperlukan sebelum klaim 100% editable. Jangan rewrite scene ACC tanpa izin.
