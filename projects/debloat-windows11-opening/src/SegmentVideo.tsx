import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {type DebloatOpeningProps} from './Video';
import {OpeningScene} from './scenes/OpeningScene';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';

/** The same scenes, props, config and audio as the full composition. */
export const SegmentVideo:React.FC<DebloatOpeningProps&{segmentIndex:number}> = ({
  segmentIndex,voiceEnabled=false,voiceVolume=1,showSubtitles=true,showGrid=true,
}) => <AbsoluteFill>
  {segmentIndex===0 ? <>
    <OpeningScene showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile('videos/debloat-windows11-opening/audio/voiceover.wav')} volume={voiceVolume}/> : null}
  </> : segmentIndex===1 ? <>
    <Scene02 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile('videos/debloat-windows11-opening/audio/voiceover-scene02.wav')} volume={voiceVolume}/> : null}
  </> : segmentIndex===2 ? <>
    <Scene03 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile('videos/debloat-windows11-opening/audio/voiceover-scene03.wav')} volume={voiceVolume}/> : null}
  </> : segmentIndex===3 ? <>
    <Scene04 showSubtitles={showSubtitles} showGrid={showGrid}/>
    {voiceEnabled ? <Audio src={staticFile('videos/debloat-windows11-opening/audio/voiceover-scene04.wav')} volume={voiceVolume}/> : null}
  </> : null}
</AbsoluteFill>;
