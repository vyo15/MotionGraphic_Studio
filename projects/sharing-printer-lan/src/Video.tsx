import React from 'react';import {AbsoluteFill,Sequence} from 'remotion';import {EditorialBackground} from './components/EditorialBackground';import {DEFAULT_PROPS,type VideoProps} from './config/props';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from "./scenes/Scene06";
import {Scene07} from "./scenes/Scene07";
import {Scene08} from "./scenes/Scene08";
export const Video:React.FC<Partial<VideoProps>>=(input)=>{const p={...DEFAULT_PROPS,...input};return <AbsoluteFill><EditorialBackground color={p.backgroundColor}/>
<Sequence name="S01" from={0} durationInFrames={276}><Scene01 {...p}/></Sequence>
<Sequence name="S02" from={276} durationInFrames={330}><Scene02 {...p}/></Sequence>
<Sequence name="S03" from={606} durationInFrames={720}><Scene03 {...p}/></Sequence>
<Sequence name="S04" from={1326} durationInFrames={540}><Scene04 {...p}/></Sequence>
<Sequence name="S05" from={1866} durationInFrames={450}><Scene05 {...p}/></Sequence>
<Sequence name="S06" from={2316} durationInFrames={390}><Scene06 {...p}/></Sequence>
<Sequence name="S07" from={2706} durationInFrames={225}><Scene07 {...p}/></Sequence>
<Sequence name="S08" from={2931} durationInFrames={180}><Scene08 {...p}/></Sequence>
</AbsoluteFill>};
