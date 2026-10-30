# Alur kerja bersih: Remotion → Concat

**Tujuan:** satu Master, dua aplikasi. Tidak membuat editor ketiga atau menggandakan source video.

```text
Brief → storyboard → animasi editable Remotion (npm run dev)
     → cek visual dan durasi
     → handoff Hook/Isi/CTA (npm run handoff)
     → Concat (npm run concat): urutkan klip, voice-over, caption, musik/SFX
     → cek lisensi aset dan final playback → publikasi
```

**Pembagian tanggung jawab:**

| Remotion | Concat |
|---|---|
| Animasi React/TypeScript/SVG dan simulasi UI | Trim/jeda video, multitrack, footage presenter |
| Frame key animation, posisi dan teks elemen | Voice-over, cleanup suara, musik/SFX |
| Hook / Isi / CTA terpisah | Caption mengikuti voice-over melalui Whisper GUI |
| Source project tetap editable di projects/<slug>/ | Export MP4 final |

**Keputusan di tengah proses:** jika ada salah animasi, perbaiki di Remotion dan ekspor ulang adegan terkait. Jika salah caption/audio, perbaiki di Concat. Jika durasi scene berubah, review timing caption dan audio lagi. Jika terjadi error, jangan teruskan ekspor; pastikan paket sebelumnya tetap tersimpan.

**Dua project saat ini:** IP Address 24 detik (Hook 0–89, Isi 90–521, CTA 522–719) dan Windows Hacks 73,5 detik (Hook 0–239, Isi 240–2084, CTA 2085–2204). Semua berdasarkan 30fps. Tidak memendekkan atau mengubah hook/script yang sudah disetujui secara otomatis.

**Batasan yang harus tetap jelas:** source JSX tidak otomatis editable per layer setelah menjadi MP4 di Concat; Concat source Rust harus dikompilasi dan bukan aplikasi portable langsung dari clone; auto-caption tersedia di GUI namun tidak diasumsikan bisa dipanggil dari MCP; relink/update video bukan live sync; hasil edit perlu diperiksa manual pada Windows.
