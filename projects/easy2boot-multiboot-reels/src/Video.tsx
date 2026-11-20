import React from 'react';
import {SubtitleTrack} from './components/SubtitleTrack';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Scene01Problem} from './scenes/Scene01Problem';
import {Scene02WithBridge} from './scenes/Scene02WithBridge';
import {Scene03ReadableEntrance} from './scenes/Scene03ReadableEntrance';
import {Scene03ReadableSfx} from './components/Scene03ReadableSfx';
import {Scene04CopyIso} from './scenes/Scene04CopyIso';
import {Scene05Boot} from './scenes/Scene05Boot';
import {Scene06Closing} from './scenes/Scene06Closing';
import {SCENE01,SCENE02,SCENE03,SCENE04,SCENE05,SCENE06} from './config/timings';
import {DEFAULT_PROPS} from './config/props';
import type {Easy2BootScene03Props} from './config/props';
const slug='easy2boot-multiboot-reels';
const paths=[
  `videos/${slug}/audio/scene01_sfx.wav`,
  `videos/${slug}/audio/scene02_sfx.wav`,
  `videos/${slug}/audio/scene03_sfx.wav`,
  `videos/${slug}/audio/scene04_sfx.wav`,
  `videos/${slug}/audio/scene05_sfx.wav`,
  `videos/${slug}/audio/scene06_sfx.wav`,
];
const sceneData=[
 {frames:SCENE01.durationInFrames,name:'S01 — Masalah'},
 {frames:SCENE02.durationInFrames,name:'S02 — Easy2Boot'},
 {frames:SCENE03.durationInFrames,name:'S03 — Siapkan USB'},
 {frames:SCENE04.durationInFrames,name:'S04 — Salin ISO'},
 {frames:SCENE05.durationInFrames,name:'S05 — Booting'},
 {frames:SCENE06.durationInFrames,name:'S06 — CTA & Cover'},
];
/** Scene01 Impact, Scene02 Card Break unchanged; Opsi01 Match Move appended; scene03–06 unchanged. */
export const Video:React.FC<Partial<Easy2BootScene03Props>>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 const segments=[
  <Scene01Problem {...p}/>,
  <Scene02WithBridge {...p}/>,
  <Scene03ReadableEntrance {...p}/>,
  <Scene04CopyIso {...p}/>,
  <Scene05Boot {...p}/>,
  <Scene06Closing {...p}/>,
 ];
 let offset=0;
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  {segments.map((segment,i)=>{
   const item=sceneData[i]; const from=offset;offset+=item.frames;
   return <Sequence key={item.name} name={item.name} from={from} durationInFrames={item.frames}>
    {segment}
    {p.showSfx && i===2 ? <Scene03ReadableSfx {...p}/> : p.showSfx && (i!==1 || !p.scene02ShowBreak)?<Audio src={staticFile(paths[i])} volume={0.82}/>:null}
   </Sequence>;
  })}
  {p.showVoiceOver&&p.voiceOverFileName?
    <Audio src={staticFile(`videos/${slug}/audio/${p.voiceOverFileName}`)} volume={1}/>:null}
  {p.showSubtitles?<SubtitleTrack color={p.subtitleColor}/>:null}
  {p.showMusic&&p.musicFileName?
    <Audio src={staticFile(`videos/${slug}/audio/${p.musicFileName}`)} volume={0.17}/>:null}
 </AbsoluteFill>;
};
