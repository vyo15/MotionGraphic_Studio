import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import soundDocument from '../../production/sound-cues.json';
import type {Easy2BootScene03Props} from '../config/props';

/**
 * Sound design: one short cue per meaningful visible action, not one full-scene
 * audio bed. Timings in production/sound-cues.json are absolute full-video
 * frames so the same document powers full-video and per-scene previews.
 * No new Remotion dependencies; use the Audio API available in Master v4.0.538.
 */
const lengths = [381, 498, 472, 240, 486, 390];
const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((sum, n) => sum + n, 0));
const sceneNames = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06'];

/** Static literal asset paths keep Master strict validator happy. */
const SFX_FILES: Record<string,string> = {
  'confirm.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/confirm.wav'),
  'iso_transfer.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/iso_transfer.wav'),
  'micro_click.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/micro_click.wav'),
  'soft_break.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/soft_break.wav'),
  'soft_reveal.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/soft_reveal.wav'),
  'usb_place.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/usb_place.wav'),
  'warning_stump.wav': staticFile('videos/easy2boot-multiboot-reels/audio/sfx/warning_stump.wav'),
};

export const SceneSoundCues: React.FC<{sceneIndex: number; enabled: boolean; timing: Pick<Easy2BootScene03Props, 'scene03EntryFadeFrames'|'scene03ReadableIntroFrames'|'scene03IntroHoldFrames'|'scene03IntroEndSourceFrame'>}> = ({sceneIndex, enabled, timing}) => {
  if (!enabled || sceneIndex < 0 || sceneIndex > 5) return null;
  const scene = sceneNames[sceneIndex];
  const offset = starts[sceneIndex];
  const available = soundDocument.cues.filter((cue) => cue.scene === scene && cue.status === 'ready');
  return <>
    {available.map((cue) => {
      // The S03 intro is time-remapped; nudge cues after its hold with editable timing Props.
      // Default: holdEnd = 127 and sourceEnd = 75. No audio drift when the scene entrance changes.
      const shift = sceneIndex === 2 && cue.sceneFrame >= 194
        ? timing.scene03EntryFadeFrames + timing.scene03ReadableIntroFrames + timing.scene03IntroHoldFrames - 127 + 75 - timing.scene03IntroEndSourceFrame
        : 0;
      const from = Math.max(0, Math.min(lengths[sceneIndex] - 1, cue.startFrame - offset + shift));
      const duration = Math.max(1, Math.min(lengths[sceneIndex] - from, cue.endFrame - cue.startFrame + 1));
      const filename = cue.file.split('/').pop() ?? '';
      const volume = Math.min(0.4, Math.pow(10, cue.gainDb / 20));
      const src = SFX_FILES[filename];
      if (!src) return null;
      return <Sequence key={cue.id} name={`SFX ${cue.id} — ${cue.action}`} from={from} durationInFrames={duration} layout="none">
        <Audio src={src} volume={volume}/>
      </Sequence>;
    })}
  </>;
};
