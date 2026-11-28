import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {SpatialProbe} from './qa/SpatialProbe';
import {LocalFonts} from './components/LocalFonts';
import {SafeZoneGuide} from './components/SafeZoneGuide';
import {EditorialBackground} from './components/EditorialBackground';
import {SoundCueTrack} from './components/SoundCueTrack';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
type Props={qaSpatialCapture?:boolean;showSubtitles?:boolean;showSafeZone?:boolean;showSfx:boolean;sfxGain:number};
export const Video:React.FC<Props>=(p)=>(<AbsoluteFill data-qa-root="composition"><LocalFonts/><EditorialBackground/>
<Sequence from={0} durationInFrames={90} name="S01"><Scene01 showSubtitles={p.showSubtitles}/></Sequence>
<Sequence from={90} durationInFrames={270} name="S02"><Scene02 showSubtitles={p.showSubtitles}/></Sequence>
<Sequence from={360} durationInFrames={90} name="S03"><Scene03 showSubtitles={p.showSubtitles}/></Sequence>
<Sequence from={450} durationInFrames={150} name="S04"><Scene04 showSubtitles={p.showSubtitles}/></Sequence>
<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain}/><SafeZoneGuide enabled={p.showSafeZone}/><SpatialProbe enabled={p.qaSpatialCapture}/></AbsoluteFill>);
