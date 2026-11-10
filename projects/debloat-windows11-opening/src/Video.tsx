import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OpeningScene} from './scenes/OpeningScene';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';

export type DebloatOpeningProps = {
  voiceEnabled?: boolean;
  voiceVolume?: number;
  showSubtitles?: boolean;
  showGrid?: boolean;
};

const SCENE01_FRAMES=240;
const SCENE02_FRAMES=465;
const SCENE03_FRAMES=450;
const SCENE04_FRAMES=450;
const PREFIX='videos/debloat-windows11-opening/audio/';

/** Same source for segmented/full preview and final renders, no scene screenshot flattening. */
export const Video: React.FC<DebloatOpeningProps> = ({
  voiceEnabled=false, voiceVolume=1, showSubtitles=true, showGrid=true,
}) => <AbsoluteFill>
  <Sequence from={0} durationInFrames={SCENE01_FRAMES} name="S01 — Opening (tidak diubah)">
    <OpeningScene showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile(`${PREFIX}voiceover.wav`)} volume={voiceVolume}/> : null}
  </Sequence>
  <Sequence from={SCENE01_FRAMES} durationInFrames={SCENE02_FRAMES} name="S02 — Xbox / Bing / Copilot (tidak diubah)">
    <Scene02 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile(`${PREFIX}voiceover-scene02.wav`)} volume={voiceVolume}/> : null}
  </Sequence>
  <Sequence from={SCENE01_FRAMES+SCENE02_FRAMES} durationInFrames={SCENE03_FRAMES} name="S03 — Debloat / Tong Sampah / GitHub Stars (tidak diubah)">
    <Scene03 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile(`${PREFIX}voiceover-scene03.wav`)} volume={voiceVolume}/> : null}
  </Sequence>
  <Sequence from={SCENE01_FRAMES+SCENE02_FRAMES+SCENE03_FRAMES} durationInFrames={SCENE04_FRAMES} name="S04 — PowerShell Administrator / Loading Bar / WinUtil">
    <Scene04 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile(`${PREFIX}voiceover-scene04.wav`)} volume={voiceVolume}/> : null}
  </Sequence>
</AbsoluteFill>;
