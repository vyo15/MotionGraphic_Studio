# Scene 05 — ACC v21 Soft Depth · Native Editable

- Sumber: Preview_Shutdown_Scene05_SoftDepth_v21.mp4 (persetujuan pengguna, 22 Nov 2026).
- Implementasi: `src/scenes/Scene04.tsx` (nama file legacy; ini adalah **Scene 05** dalam urutan 9 scene).
- Durasi tidak berubah: 300 frame @ 30 fps = 10 detik (00:26–00:36 sejak Scene 04 menjadi 8 detik).
- Elemen: putih off-white, typography dua baris center, tanpa grid/garis, tombol Windows + R soft depth 2D, perubahan coral pada press, Run UI, typing, kursor klik OK, dan keluar menjadi 3600 DETIK.
- Bukan MP4 atau gambar statis: sumber seluruhnya native SVG/React dengan layer `Interactive.G`/`Interactive.Text`.
- Layer grup `S05 / Keyboard / ...` untuk geser tombol bersama, atau `... Windows key independent` dan `... R key independent` untuk geser terpisah.
- Layer `S05 / Run / Whole window — drag and resize` untuk memindahkan jendela Run. Teks lain dan tombol memiliki handle tersendiri.
- Props edit langsung di Remotion Studio: `scene04HeadlineLine1`, `scene04HeadlineLine2`, `scene04RunCommand`, `scene04KeysScale`, `scene04SoftDepth`, `scene04WindowShiftX/Y/Scale`, `scene04KeysShiftX/Y`, `scene04CursorShiftX/Y`.
- Subtitle di sumber adalah **guide**, bukan VO audio; rekaman VO final belum disematkan.
- Bila mengganti `scene04RunCommand`, animasi mengetik menyesuaikan panjang string otomatis. Input Run yang panjang bisa memerlukan ukuran font / skala lebih kecil untuk mencegah pemotongan.
- GUI drag / text edit / save reload dan render resmi di Windows tetap memerlukan tes pengguna. Validasi AST bukan bukti semua fitur GUI bekerja.
- Semua scene lainnya tidak diubah.
