import React from 'react';
import {Audio, Sequence} from 'remotion';
import manifest from '../../motiongraphic-video.json';
import soundDocument from '../../production/sound-cues.json';
import {SFX_FILES} from './SoundAssets';

type Cue = {id:string; scene:string; action:string; status:string; startFrame:number; endFrame:number; file?:string; gainDb?:number};
const segments: {startFrame:number; durationInFrames:number}[] = (manifest as {segments?: {startFrame:number; durationInFrames:number}[]}).segments ?? [];
export const SoundCueTrack: React.FC<{enabled:boolean; gain:number; segmentIndex?:number}> = ({enabled,gain,segmentIndex}) => {
  if (!enabled) return null;
  const segment = segmentIndex === undefined ? undefined : segments[segmentIndex];
  if (segmentIndex !== undefined && !segment) return null;
  const start = segment?.startFrame ?? 0;
  const end = start + (segment?.durationInFrames ?? manifest.durationInFrames);
  return <>{(soundDocument.cues as Cue[]).filter(c => c.status === 'ready' && c.startFrame >= start && c.endFrame < end).map(c => {
    const src = SFX_FILES[c.file ?? ''];
    if (!src) throw new Error(`SFX asset missing: ${c.id}`);
    const volume = Math.max(0, Math.min(1, gain * Math.pow(10, (c.gainDb ?? -15) / 20)));
    return <Sequence key={c.id} name={`SFX ${c.id} — ${c.action}`} from={c.startFrame-start} durationInFrames={c.endFrame-c.startFrame+1} layout="none">
      <Audio src={src} volume={volume}/>
    </Sequence>;
  })}</>;
};
