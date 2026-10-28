# KONTRAK WAJIB — MotionGraphic Studio · Studio Inline Editable V2

**Tujuan:** Semua proyek baru yang dibuat untuk Master ini memakai layer yang dapat dipilih dan diatur dari Remotion Studio; bukan sekadar property computed. Berlaku lintas topik, bukan hanya Windows Hacks. Jangan membuat Master baru setiap video.

## Kriteria yang wajib dipenuhi sebelum mengirim add-on

1. Manifest `motiongraphic-video.json`: tambahkan `"editableContract": "studio-inline-v2"` untuk proyek baru. `id` dan `slug` unik; path add-on tetap folder-first. Project revisi mempertahankan ID dan slug.
2. Setiap objek penting (judul, subtitle, kursor, klik, tombol, toolbar, UI, background, progres, ikon, audio) mempunyai elemen JSX sendiri dan nama pendek yang spesifik: `01 · Browser · Tab Dokumen`, bukan `+5` atau `other`.
3. Untuk objek HTML gunakan `<Interactive.Div>` (atau elemen Interactive tepat). Tulis **style literal secara langsung** pada JSX, bukan `...layerStyle`, CSS custom property `var(--...)`, atau string `transform:translate(...)` untuk kontrol dasar. Model IP Address adalah contoh yang valid.
4. Minimal setiap objek mengandung `translate:'0px 0px', scale:1, rotate:'0deg', transformOrigin:'50% 50%'`. Bila `left/top/width/height/color/fontSize` bersifat statis, tulis secara inline juga. Contoh:

```tsx
<Interactive.Div name="02 · Task Manager · End task"
  style={{position:'absolute',left:570,top:328,width:165,height:44,
    translate:'0px 0px',scale:1,rotate:'0deg',opacity:1,
    backgroundColor:'#eaf2fa',color:'#172839',fontSize:22}}>
  End task
</Interactive.Div>
```

5. Animasi tetap deterministic melalui `useCurrentFrame`, `interpolate` dan `spring`. Gunakan property `opacity`, `scale` atau `translate` terpisah bila ingin Studio mengenali keyframes. Bila ada animasi kompleks (drag mouse, path, zoom), expose titik kunci dan frame melalui Props **dan** layer visual; jangan mencampur koordinat cursor dan ring klik.
6. Untuk teks dinamis jangan mengklaim `Text` di Remotion dapat diketik langsung bila dihasilkan dari fungsi. Sediakan `sceneEditor.copy`/Props atau nilai teks inline. Bedakan `computed` yang masih sah untuk animasi dari properti dasar yang wajib editable.
7. Dilarang flatten seluruh scene menjadi PNG/MP4. Komponen UI kecil tetap SVG/HTML sehingga objeknya bisa dipilih dan direvisi. Jangan mengandalkan satu `.map()` untuk objek yang harus dapat diseleksi sendiri.
8. Urutan video: hook → contoh masalah → tekan shortcut → demonstrasi → hasil → CTA. Untuk VO, pisahkan audio per adegan, letakkan jeda 0,4–0,8 detik setelah aksi yang penting, bukan memperlambat semua gerakan. Sediakan pengaturan `startFrame/endFrame` dan potongan adegan mandiri.
9. Nama panel memakai bahasa Indonesia yang jelas dengan nomor adegan 00–06. Maksimum 2 tingkat hierarki untuk pekerjaan utama. Pastikan safe-zone vertikal 250 px atas dan 350 px bawah.
10. Lakukan tes `node tools/audit-inline-editing.mjs` dan `npm run sync`. Untuk project berkontrak `studio-inline-v2` setiap `Interactive` harus punya style object inline dan bebas CSS var/spread. Preview di Remotion Studio dan **uji drag → simpan → reload** sebelum menyatakan visual-editable selesai.

## Mengatasi computed pada proyek lama

- `node tools/repair-computed-layers.mjs <slug>`: lihat perkiraan layer yang bisa diperbaiki.
- `node tools/repair-computed-layers.mjs <slug> --apply`: konversi `layerStyle` pada `Interactive` ke transform inline, membuat backup. **Tidak** dijalankan otomatis tanpa persetujuan karena dapat mengubah layout proyek custom.
- `node tools/materialize-layout-props.mjs <slug> --apply`: salin nilai posisi statis dari `CONFIG` ke JSX jika aman.
- `node tools/audit-inline-editing.mjs`: cek proyek aktif. Proyek lama tanpa kontrak tidak ditimpa.

## Batas yang tidak boleh disalahartikan

Remotion Studio dapat membuat objek `Interactive` bisa dipilih dan properti inline/keyframe tertentu dapat diubah. Ini **bukan CapCut penuh**. Style yang berasal dari CSS class, teks yang dihitung oleh fungsi, serta koordinat animasi yang dihitung per-frame masih dapat berstatus `computed`. Gunakan Visual Editor lokal dan Easy Editor untuk pengaturan yang tersedia. Jangan membuat tombol yang pura-pura berhasil menyimpan.
