import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {VideoProps,DEFAULT_PROPS} from './config/props';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
export const Video:React.FC<VideoProps>=(input)=>{const p={...DEFAULT_PROPS,...input};return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
<Sequence name="S01 — Masalah & konflik" from={0} durationInFrames={150}><Scene01 {...p}/></Sequence>
<Sequence name="S02 — Memory Gallery" from={150} durationInFrames={180}><Scene02 {...p}/></Sequence>
<Sequence name="S03 — Respons" from={330} durationInFrames={120}><Scene03 {...p}/></Sequence>
<Sequence name="S04 — Solusi" from={450} durationInFrames={150}><Scene04 {...p}/></Sequence>
<Sequence name="S05 — Persiapan" from={600} durationInFrames={240}><Scene05 {...p}/></Sequence>
<Sequence name="S06 — Demonstrasi" from={840} durationInFrames={180}><Scene06 {...p}/></Sequence>
<Sequence name="S07 — Pemulihan" from={1020} durationInFrames={180}><Scene07 {...p}/></Sequence>
<Sequence name="S08 — Konfirmasi" from={1200} durationInFrames={150}><Scene08 {...p}/></Sequence>
<Sequence name="S09 — Restart" from={1350} durationInFrames={150}><Scene09 {...p}/></Sequence>
<Sequence name="S10 — Hasil" from={1500} durationInFrames={303}><Scene10 {...p}/></Sequence>
<Sequence name="S11 — CTA" from={1803} durationInFrames={270}><Scene11 {...p}/></Sequence>
<Sequence name="S12 — Cover Reels" from={2073} durationInFrames={120}><Scene12 {...p}/></Sequence>
</AbsoluteFill>};
