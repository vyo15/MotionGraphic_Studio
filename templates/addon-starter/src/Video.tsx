import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {EditorialBackground} from './components/EditorialBackground';
export const Video: React.FC<{headline?:string}> = ({headline='Contoh Judul'}) => <AbsoluteFill><EditorialBackground/>
  <Sequence from={0} durationInFrames={600} name="01 — Demo"><Scene01 headline={headline}/></Sequence>
</AbsoluteFill>;
