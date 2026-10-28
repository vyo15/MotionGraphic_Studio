# STANDAR EDITABLE LANGSUNG — MOTIONGRAPHIC STUDIO V3

## Satu Master, tidak perlu coding manual
Master Studio tetap satu. Video dibuat dari ChatGPT dalam bentuk folder `projects/<slug>/` dan dipasang melalui `npm run dev` / `npm run sync`. Jangan membuat Master baru atau mengubah proyek lain. Setiap add-on baru mencantumkan `"editableContract": "studio-direct-v3"` pada `motiongraphic-video.json`.

## Prinsip tidak boleh dikompromikan
1. **Teks utama harus langsung editable lewat Remotion Studio**. Setiap judul, baris judul, subtitle, CTA, angka, dan label penting dibuat sebagai `<Interactive.Div name="S02 · Subtitle" style={{position:'absolute',left:90,top:200,fontSize:42,color:'#fff',translate:'0px 0px',scale:1,rotate:'0deg'}}>ISI TEKS</Interactive.Div>` dengan anak teks literal. Jangan pakai `{copy(...)}`, `{CONFIG.text...}`, `{phase.top}`, ternary, `.map`, atau `<div>` bersarang untuk teks utama.
2. Untuk beberapa judul berubah menurut fase, **buat satu node tekstual per fase per baris**, dan gerakkan fase melalui wrapper/Sequence. Jangan menulis `<Interactive.Div>{dynamicTitle}</Interactive.Div>`.
3. Properti penting `left`, `top`, `width`, `height`, `fontSize`, `color`, `translate`, `scale`, `rotate` dimasukkan **langsung dalam objek JSX style** pada node edit target. Hindari `...layerStyle`, CSS `var()`, atau `transform` template untuk properti yang akan digeser. Animasi frame dapat diatur pada wrapper animasi, terpisah dari transform pengguna.
4. Setiap elemen penting yang harus dipilih berulang kali memiliki JSX node mandiri, `name` unik dan manusiawi, tidak dari loop/map. Gunakan hirarki `00 Hook`, `01 Ctrl Shift T`, dst.
5. Kursor+ring klik satu koordinat/track. Titik tekan harus mengenai target pada preview. Jika posisi target berubah, lintasan dan efek klik ikut diperbarui.
6. Elemen kecil seperti UI toolbar, button, tab, row, progress line, icon, kursor, overlay dan gambar harus memiliki kontrol independen; bila tidak layak di drag native Studio, expose Editor Visual Master dan cantumkan batasnya.
7. Audio narasi per scene, SFX, dan musik dipisahkan dalam layer/Sequence tersendiri; sediakan jeda yang nyaman, jangan memperlambat seluruh gerakan seperti slow motion. Untuk durasi scene, pengaturan harus konsisten antara preview, render dan VO cue.
8. `README.md`, `PANDUAN-EDIT-ASSET.md`, peta layer dan voice-over cue harus menjelaskan workflow tanpa VS Code.

## Pemeriksaan dan larangan klaim berlebihan
`npm run dev` memanggil `check-direct-studio-text.mjs` yang **gagal** untuk proyek `studio-direct-v3` dengan teks utama computed atau style non-inline/spread. Ini guardrail, bukan konverter ajaib. Proyek lama tetap aman dan diperiksa secara informatif. Perubahan animasi & frame masih dapat menyebabkan computed untuk properti animasi; pastikan objek statis langsung bisa digeser dan teks utamanya dapat diubah native Studio.

Editor Visual Master di `http://127.0.0.1:4077/visual` mendukung edit teks literal / sebagian copy() tanpa membuka VS Code. Klik layer source lalu edit field **Teks**, tekan **Simpan teks ini**; klik dua kali kotak layer akan fokus ke field teks. Untuk drag/ubah teks langsung di Remotion Studio, **literal children** tetap wajib. Pengaturan teks di manifest jangan dianggap sama dengan native Studio.

## Definition of Done
Lakukan uji 1) pilih judul di Studio → double klik dan ubah teks, 2) drag + resize elemen, 3) pilih cursor dan pastikan efek klik sejajar, 4) reload dan pastikan teks permanen, 5) `npm run sync`, 6) uji render bila tersedia. Laporkan yang belum teruji secara jelas. Jangan menjanjikan 100% editable jika ada komponen computed yang tidak dapat diubah secara visual.
