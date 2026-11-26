# Motion Vocabulary v1.0

ID berikut dipakai dalam `production/motion-plan.json`. Primary motion menunjukkan keputusan dominan, secondary motion opsional dicatat di storyboard. Tidak ada engine preset baru; implementasikan sesuai source Remotion yang kompatibel.

| ID | Makna / penggunaan |
|---|---|
| establish | Tampilkan objek atau world utuh, beri konteks |
| focus-zoom | Zoom uniform ke target, terencana dan terukur |
| selective-emphasis | Kontras, highlight fungsional, subtle scale |
| focus-handoff | Pindahkan perhatian dari target lama ke target baru |
| cursor-action | Natural path, target lock, hover, aksi, respons |
| drag-tracking | Objek menempel pada hotspot saat drag |
| natural-typing | Input aktif, ketikan natural, hold nilai lengkap |
| state-transform | State before/after, morph jika relevan |
| path-motion | Aliran objek mengikuti lintasan bermakna |
| progressive-build | Perubahan berurutan dan cause-effect |
| spatial-reflow | Layout bergeser dengan ruang aman |
| result-hold | Tampilkan hasil dan tahan untuk membaca |
| context-zoom-out | Kembali ke konteks tanpa reset state |
| shared-element | Carry object, match move, focal match |
| hold | Static hold atau gerakan alami yang masih berlangsung |
| camera-pan | Bergeser ke target lain pada world yang sama |
| target-tracking | Kamera mengikuti fokus aktif, tidak mengejar cursor |
| adaptive-reframe | Sesuaikan ukuran frame target/dialog |
| controlled-exit | Keluarkan aset lama secara halus untuk memberi ruang |
| motivated-cut | Cut bermakna ketika world/konteks berubah |

Prioritas: eye trace, focus handoff, shared element, action/reaction, progressive build, reflow, hold. Kontekstual: morph, path, stagger, subtle scale, fade. Parallax sangat selektif. Hindari Slide Mask dekoratif, spin/flip, excessive bounce, generic slide, random zoom, flash atau whoosh otomatis. Crop native UI dan clipping kamera bukan Slide Mask dekoratif. Easing awal: ease-in-out untuk kamera; ease-out untuk reveal; spring critically/over-damped jika diperlukan; jangan memaksa overshoot. Pakai frame-based `interpolate`/`spring`, bukan CSS animation.
