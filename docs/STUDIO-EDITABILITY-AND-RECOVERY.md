# Remotion Studio — Editing Aman, Source Backup, dan User Flow

Sumber: Remotion 4.0.538 dalam Master. Referensi: https://www.remotion.dev/docs/studio/interactivity-best-practices dan https://www.remotion.dev/docs/interactive

## Saat menggunakan Studio

1. `npm run dev` melakukan validasi/registrasi dan **menyimpan snapshot source** sebelum Studio terbuka. Snapshot berada di luar Master pada `../MotionGraphic-Studio-Backups/EditorSnapshots/` (maksimal tiga perubahan source terbaru, snapshot identik tidak digandakan). Project dan render tidak ditimpa.
2. `Interactive.G` yang dipilih dapat **dihapus oleh tindakan editing di Studio**. Pesan `Deleted <Interactive.G>` adalah catatan perubahan source, bukan bug kompilasi. Jika salah: tekan **Ctrl+Z segera di Studio**. Jangan otomatis memulihkan semua elemen yang pernah dihapus, karena penghapusan bisa disengaja.
3. Jika Studio sudah ditutup, cek `git diff`/riwayat Git atau snapshot source di luar Master. Bandingkan file `projects/<slug>/src/...` sebelum menyalin balik file tertentu. Jangan menimpa semua project, source terkunci, atau perubahan lokal.
4. Edit pada TSX biasa memakai hot reload Remotion **tanpa sync**, sedangkan `motiongraphic-video.json`, `narration.json`, konfigurasi segmen, aset `public/`, ZIP inbox, dan Props Root tetap memicu sync yang relevan. Jika watcher tidak mendeteksi perubahan tertentu, jalankan `npm run sync` sekali.
5. Semua angka pada pemeriksaan `Interactive`/style adalah **pemeriksaan statis**. Banyak kotak biru atau style inline tidak membuktikan teks/objek/keyframe/edit-save-reload benar-benar bisa diedit.

## Kontrak video baru (dibangun di ChatGPT)

- Gunakan `studio-direct-v4`, `Interactive.Div` / `Interactive.Text` yang sesuai, child teks literal pada layer teks utama, style literal inline dan `interpolate()` inline untuk keyframe yang ingin diedit di Studio.
- Sebelum mengklaim **Studio-editable**, uji teks, drag, resize, keyframe, Save, reload dan render. Untuk teks dinamis dari Props, beri label **Props-editable**, bukan Studio-direct-text-editable.
- Gunakan scene/objek bernama berdasarkan fungsi UI, bukan ratusan primitif generik; kelompokkan dekorasi yang tidak perlu diedit.
- Scene lama dengan SVG dinamis/baked frame **tidak otomatis berubah menjadi native editable**. Refaktor hanya setelah persetujuan revisi dan QA visual; tidak boleh menghapus data frame yang masih diimpor.

## Bila ada folder video yang tidak ada di katalog

Master adalah folder-first: **setiap folder dengan manifest di `projects/` dapat didaftarkan lagi saat `npm run sync`**. Jika sudah tidak mau video tertentu aktif, pindahkan keluar Master tanpa menghapusnya:

```bash
npm run retire:unregistered
npm run retire:unregistered -- --apply
npm run check:sync
```

Mode preview pertama tidak mengubah apa pun. `--apply` hanya memindahkan folder **yang tidak terdaftar** ke `../MotionGraphic-Studio-Backups/RetiredProjects/`; project aktif tidak akan dipindah. Jika memang ingin mendaftarkan semua project lagi, **jangan** jalankan `--apply`, cukup `npm run sync`.

## QA minimal

```bash
npm test
npm run check:syntax
npm run check:sync
npm run validate
npm run check       # typecheck; perlu npm ci
```

Untuk MP4 final, jalankan QA render pada file asli. Jangan mengklaim tes GUI atau MP4 berhasil jika hanya tes Node/source yang dilaksanakan.
