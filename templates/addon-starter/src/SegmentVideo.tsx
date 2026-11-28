import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SpatialProbe} from './qa/SpatialProbe';
import {LocalFonts} from './components/LocalFonts';
import {SafeZoneGuide} from './components/SafeZoneGuide';
import {EditorialBackground} from './components/EditorialBackground';
import {SoundCueTrack} from './components/SoundCueTrack';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
type Props={qaSpatialCapture?:boolean;qaSpatialIsolation?:string[];showSubtitles?:boolean;showSafeZone?:boolean;showSfx:boolean;sfxGain:number};
export const SegmentVideo:React.FC<Props & {segmentIndex:number}>=(p)=>{const {segmentIndex}=p;return <AbsoluteFill data-qa-root="composition"><LocalFonts/><EditorialBackground/>
{segmentIndex===0?<Scene01 showSubtitles={p.showSubtitles}/>:null}
{segmentIndex===1?<Scene02 showSubtitles={p.showSubtitles}/>:null}
{segmentIndex===2?<Scene03 showSubtitles={p.showSubtitles}/>:null}
{segmentIndex===3?<Scene04 showSubtitles={p.showSubtitles}/>:null}
<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain} segmentIndex={segmentIndex}/><SafeZoneGuide enabled={p.showSafeZone}/><SpatialProbe enabled={p.qaSpatialCapture} isolate={p.qaSpatialIsolation} offset={[0,90,360,450][segmentIndex]}/></AbsoluteFill>;};
