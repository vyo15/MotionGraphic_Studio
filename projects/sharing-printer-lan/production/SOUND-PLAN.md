# Sound plan — Soft Editorial redesign v1 (draft audio review)

Scope S01–S08 audio only. Source visual, subtitle, scene duration, VO text and approvals preserved. Mouse cues now use the original HunteR4708 recordings; other existing sound assets are designed synthetic accents, not physical recordings. No final sound ACC.

| Scene | Direction | Intentional silence |
|---|---|---|
| S01 | Airy connection at LAN reveal, soft paper-motion texture as sheet appears | S01→S02 no whoosh |
| S02 | Quiet icon reveal at local frame 23 | explanation and transition silent |
| S03 | Adaptive Run typing, mouse actions using original single/double click where available | S03→S04 silent |
| S04 | Mouse selection, context, properties, check and confirmation using original single/double click where available | handoff silent |
| S05 | Shortcut, adaptive UNC typing, context click and Connect using original single/double click where available, soft graphic settle on install result | focus handoff silent; no fake Windows sound |
| S06 | Open document and Print using original single/double click where available; shortcut, subtle data pulse, designed mechanical-texture paper feed | CTA fade silent |
| S07 | Comment bubble reveal, paper texture, adaptive typing, subtle completion | no fake send; CTA→cover silent |
| S08 | Data mini-demo and subtle paper texture | silent hero hold |

Frame-exact cues and gain in sound-cues.json (endFrame inclusive). Typing cue windows expand deterministically on visible character changes; one tap per frame, empty text silent. Other cues remain normal. Existing designed WAVs have baked EQ/envelope; original mouse WAVs unmodified, gain editable, same canonical opt-in track on full and segment. Old WAVs intentionally retained as rollback but not referenced. No VO or music added. Preview MP4 and listening still pending.

## Mouse-only correction — original recordings restored (review)
12 single-click cues alternate the two original single clicks; one double-click uses the first double-click recording. Two dedicated right-click cues remain omit (no source supplied). 29 unrelated cues unchanged. All original impact frames preserved. Double-click starts six frames earlier so the second press (about 206 ms into WAV) aligns with document opening at S06 local frame 54; cursor is at target from local frame 44. Full WAV tails fit their segments. Playback gain -14 dB for click 01/double 01, -11 dB for quieter click 02; audition with VO later. Original WAV bytes, format and source declarations preserved; clean mastering candidates are separate audition files and not in active Master. No visual, narration, ACC, or canonical sound track change. Render/listening in Studio pending.

## Mouse clarity revision — playback only (review)
Existing 13 original mouse cues: +6 dB (click 01/double 01 -8 dB, click 02 -5 dB). Restore five previously silent UI clicks: Network and Sharing Center (913), File and Printer Sharing (1175), Control Panel Home (1386), Sharing tab (1626), printer selection (2433). These use -10/-7 dB for secondary navigation. All 18 ready mouse cues keep full original WAV tails; two right-click cues remain omitted, no substitute. Other 24 cues, visual, VO, timing and ACC are unchanged. No source WAV processing or library change. Gain chosen from measured source peaks, not listening approval; review with VO and Studio.

## V4 — historical timing
Dua slide typography silent (omit). Demo LAN/paper cue dipindah ke frame aksi sesuai playback 1,3x; WAV dan gain lama tetap. S02–08 +206f, typing origin ikut, tanpa perubahan local cue atau WAV. Field scene sound-cues adalah ordinal segmen: S01/S02 opening, S03 demo S01, S04–S10 = ID lama S02–08. Sound canonical tetap satu track. Belum listening QA native.


## V10 — ACC referensi 2026-11-28
Opening 560f: Question 198f, Response 84f, Demo 278f; full 3395f (113,17s), 10 segmen. +78f untuk seluruh segmen/cue/guide setelah question; local timing, VO dan WAV tetap. Demo source asli +112px screen, headline mengikuti objek (gap referensi ~95px), S02 mengikuti V10 selama 36f (+112→+80px), lalu settle ke posisi asli sampai 78f. Silent hold demo frame 526–559, cover thumbnail lokal 179/global 3394. Native parity/GUI/listening pending. Lima teks baru (tiga tanda tanya, dua headline) + satu coral target; tidak ada raster bake.

## S01-R/S01 — rekaman VO
VO asli diproses satu kali, clean PCM 48k/24-bit mono, target -17 LUFS. Full video memakai satu track WAV utuh mulai global 224f, melewati batas 282f tanpa gap. Segment editor saja memakai clip lokal 26f/0f, full comp mematikan dua clip lokal; SFX asli dan gain tetap. Pemisahan dan cue frasa kandidat dari VAD/energi, belum ASR/listening ACC.

**Update continuous VO ACC:** question 186f, opening 548f, full 3383f; VO kontinu mulai 212f hingga 382f (batas demo 270f); gap buatan 0f. Seluruh cue global setelah question -12f; local timing, WAV, gain, typing dan scene lain tetap. Angka sebelumnya riwayat. Hold question -12f review.
