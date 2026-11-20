import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02Download} from './scenes/Scene02Download';
import {Scene03Time} from './scenes/Scene03Time';
import {Scene04Run} from './scenes/Scene04Run';
import {SubtitleTrack} from './components/editable/SubtitleTrack';
import {SEGMENTS} from './config/timeline';
import type {VideoProps} from './config/editable';
export type {VideoProps};
/** Full render / segment preview use the exact same React scene components. */
export const Video:React.FC<VideoProps>=(props)=><AbsoluteFill style={{background:'#F8F4F1'}}>
  <Sequence from={SEGMENTS[0].start} durationInFrames={SEGMENTS[0].duration} name="S01 · Ketiduran"><Scene01Hook {...props}/></Sequence>
  <Sequence from={SEGMENTS[1].start} durationInFrames={SEGMENTS[1].duration} name="S02 · Menunggu unduhan"><Scene02Download {...props}/></Sequence>
  <Sequence from={SEGMENTS[2].start} durationInFrames={SEGMENTS[2].duration} name="S03 · Waktu menjadi timer"><Scene03Time {...props}/></Sequence>
  <Sequence from={SEGMENTS[3].start} durationInFrames={SEGMENTS[3].duration} name="S04 · Windows Run"><Scene04Run {...props}/></Sequence>
  <SubtitleTrack {...props}/>
  {props.voiceEnabled?<Audio src={staticFile(['videos','shutdown-otomatis-hook-realistis','audio','voiceover.wav'].join('/'))} volume={props.voiceVolume??1}/>:null}
</AbsoluteFill>;
