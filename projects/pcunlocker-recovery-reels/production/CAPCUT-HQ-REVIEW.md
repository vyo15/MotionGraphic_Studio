# CapCut HQ — PCUnlocker Recovery Reels

Source Master v2.0.0; total 2193 frames, 73.1s at 30 FPS, 1080×1920. Keep the native source editable, export only as a separate MP4. The existing Master HQ profile is unchanged.

## Export and review
1. After backing up and copying the patch, run `npm run sync` then `npm run dev`. Review the full composition and segments at native 30 FPS; check visual handoffs before recording VO.
2. `npm run render -- PCUnlockerRecoveryReels --profile capcut` (or menu 6 → Full Video → CapCut HQ). This temporarily disables recognized VO/subtitle guides while preserving SFX. CTA typography is linked to the guide, so verify the actual clean export and recreate the corresponding CTA captions in CapCut as needed. If retaining guide/CTA typography is preferred, use `--profile high` and inspect for subtitle duplication.
3. The existing profile uses H.264 CRF16 / slow / PNG frames / yuv420p / BT.709 / AAC 256k at 48kHz. No resolution, frame rate, render engine, package or profile change. Output outside Master: `MotionGraphic-Studio-Backups/MP4/pcunlocker-recovery-reels/full/`.
4. Import rendered MP4 manually. Keep source FPS; add recorded VO and final captions. `production/VO-Subtitle.srt` contains draft timing, not synced captions. Adjust based on actual reading. Do not change speed uniformly; use only stable holds if timing needs trimming, and re-render source for action/SFX alignment changes. Verify SFX level with VO.
5. Render QA: `npm run qa:render -- "PATH_KE_MP4" --src projects/pcunlocker-recovery-reels`. Watch the entire result at 1× and on mobile; check actual audio, crop and cover. CapCut final export: 1080×1920 30 FPS, H.264 SDR Rec.709, high bitrate (roughly 12–20 Mbps if available), AAC 48kHz. This is not a guarantee of platform recompression quality.

## Review markers (time is seconds, frame index is zero-based)
| Global frame | Time | Check |
|---:|---:|---|
| 150 | 5.0 | Hook to gallery |
| 330 | 11.0 | Gallery to response |
| 450 | 15.0 | Alert to solution |
| 600 | 20.0 | Logo to preparation |
| 840 | 28.0 | Laptop handoff starts |
| 846 | 28.2 | Previously reported ghost UI; only outgoing laptop state expected |
| 852 | 28.4 | App replaces screen contents |
| 876 | 29.2 | App settles at full fit |
| 915 | 30.5 | List focus beat |
| 1020 | 34.0 | Shared camera continuity |
| 1174 | 39.13 | Dialog visible only after framing |
| 1200 | 40.0 | Dialog continuity |
| 1350 | 45.0 | Restart scene |
| 1500 | 50.0 | Login continuity |
| 1539 | 51.3 | No premature gallery cards |
| 1704 | 56.8 | Explorer exits, gallery begins |
| 1803 | 60.1 | CTA handoff |
| 2073 | 69.1 | Cover handoff |
| 2163 | 72.1 | Cover candidate frame; silent hold |

Native render and VO listening QA remain pending. No new ACC is recorded by this technical revision.
