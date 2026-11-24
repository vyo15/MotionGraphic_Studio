import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {VideoProps,DEFAULT_PROPS} from './config/props';
import {DESIGN} from './config/design';
export const Video:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor,fontFamily:DESIGN.font}}>
  <Sequence name="S01 — Hook" from={0} durationInFrames={855}><Scene01 {...p}/></Sequence>
  <Sequence name="S02 — Siapkan shortcut" from={855} durationInFrames={480}><Scene02 {...p}/></Sequence>
  <Sequence name="S03 — Folder Startup" from={1335} durationInFrames={300}><Scene03 {...p}/></Sequence>
  <Sequence name="S04 — Copy & Paste" from={1635} durationInFrames={270}><Scene04 {...p}/></Sequence>
  <Sequence name="S05 — Hasil & CTA" from={1905} durationInFrames={390}><Scene05 {...p}/></Sequence>
  <Sequence name="S06 — Cover Reels" from={2295} durationInFrames={150}><Scene06 {...p}/></Sequence>
 </AbsoluteFill>;
};
