# SOUND PLAN — TEMPLATE PER SCENE (DRAFT)

Baca `docs/SOUND-DIRECTION-RULES.md` pada Master. Ini rencana kreatif, **bukan bukti sound sudah dipasang atau terdengar**. Isi untuk tiap scene/beat; boleh tulis `omit`. Rekam VO dilakukan **setelah** motion ACC.

| Scene/beat | VO Guide / kata kunci | Objek dan pemicu | Gerak / impact visual | Cue / `omit` | Timing perkiraan / impact frame | Audio handoff / tail ke scene berikutnya | Status |
|---|---|---|---|---|---|---|---|
| S01 / hook | DRAFT | Objek utama | Reveal utama | `planned` / `omit` | Isi setelah motion tersedia | Bukan whoosh wajib | DRAFT |
| CTA → Cover | DRAFT | Objek pembawa continuity | Mini-demo lalu hold akhir | `planned` / `omit` | Jangan memotong VO CTA; hold final 1–2 dtk | Tail lembut atau silence | DRAFT |

**Saat build:** keputusan awal cukup ditulis di tabel. **Setelah ACC motion:** pindahkan cue audio yang sudah punya timing definitif ke `production/sound-cues.json` (`startFrame`, `impactFrame`, `endFrame` **inklusif** untuk cue; nilai absolut full video). File asli di `public/audio/sfx/`; `status: ready` hanya untuk aset yang benar-benar ada, `planned` bila belum. Pastikan ada jalur playback sumber Remotion; JSON sendiri bukan audio.

**Setelah rekam VO:** cek attack/impact, tail, continuity lintas scene, level musik/VO/SFX, mono HP, clipping, lisensi dan mix akhir. Cantumkan status `PASS` / `FAIL` / `BELUM DIUJI` per pemeriksaan. Jangan mengganti audio/scene LOCKED tanpa izin.
