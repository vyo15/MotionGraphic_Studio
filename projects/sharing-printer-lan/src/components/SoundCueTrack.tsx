import React from 'react';
import {Audio, Sequence} from 'remotion';
import manifest from '../../motiongraphic-video.json';
import soundDocument from '../../production/sound-cues.json';
import {SFX_FILES} from './SoundAssets';
import {typingFrames, type TypingRule} from './SoundTyping';

type Cue = {id:string; scene:string; action:string; status:string; startFrame:number; endFrame:number; file?:string; gainDb?:number; typing?:TypingRule};
const segments: {startFrame:number; durationInFrames:number}[] = (manifest as {segments?: {startFrame:number; durationInFrames:number}[]}).segments ?? [];
export const SoundCueTrack: React.FC<{enabled:boolean; gain:number; segmentIndex?:number; textProps:Readonly<Record<string,string>>}> = ({enabled,gain,segmentIndex,textProps}) => {
  if (!enabled) return null;
  const segment = segmentIndex === undefined ? undefined : segments[segmentIndex];
  if (segmentIndex !== undefined && !segment) return null;
  const start = segment?.startFrame ?? 0;
  const end = start + (segment?.durationInFrames ?? manifest.durationInFrames);
  const level = (db:number) => Math.max(0, Math.min(1, (Number.isFinite(gain)?gain:0) * Math.pow(10, db / 20)));
  return <>{(soundDocument.cues as Cue[]).filter(c => c.status === 'ready' && c.startFrame >= start && c.endFrame < end).map(c => {
    const src = SFX_FILES[c.file ?? ''];
    if (!src) throw new Error(`SFX asset missing: ${c.id}`);
    if (c.typing) {
      const events=typingFrames(c.typing,textProps[c.typing.prop] ?? '',manifest.fps).filter(f=>f>=c.startFrame&&f<=c.endFrame);
      return <React.Fragment key={c.id}>{events.map((f,i)=><Sequence key={`${c.id}-${f}`} name={`SFX ${c.id} — ${c.action} ${i+1}`} from={f-start} durationInFrames={1} layout="none"><Audio src={src} volume={level((c.gainDb??-23)+[-1,0,-2,1,-1][i%5])}/></Sequence>)}</React.Fragment>;
    }
    return <Sequence key={c.id} name={`SFX ${c.id} — ${c.action}`} from={c.startFrame-start} durationInFrames={c.endFrame-c.startFrame+1} layout="none">
      <Audio src={src} volume={level(c.gainDb??-15)}/>
    </Sequence>;
  })}</>;
};
