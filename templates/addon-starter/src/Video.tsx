import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene01} from './scenes/Scene01';
import {EditorialBackground} from './components/EditorialBackground';

/** One composition; every foreground object is a named native Studio layer. */
export const Video: React.FC = () => (
  <AbsoluteFill>
    <EditorialBackground/>
    <Sequence name="S01 — Demo" from={0} durationInFrames={600}>
      <Scene01/>
    </Sequence>
  </AbsoluteFill>
);
