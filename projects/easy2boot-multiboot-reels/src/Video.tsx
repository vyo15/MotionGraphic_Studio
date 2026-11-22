import React from 'react';
import {SubtitleTrack} from './components/SubtitleTrack';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Scene01Problem} from './scenes/Scene01Problem';
import {Scene02WithBridge} from './scenes/Scene02WithBridge';
import {Scene03ReadableEntrance} from './scenes/Scene03ReadableEntrance';
import {SceneSoundCues} from './components/SceneSoundCues';
import {Scene04CopyIso} from './scenes/Scene04CopyIso';
import {Scene05Boot} from './scenes/Scene05Boot';
import {Scene06Closing} from './scenes/Scene06Closing';
import {SCENE01,SCENE02,SCENE03,SCENE04,SCENE05,SCENE06} from './config/timings';
import {DEFAULT_PROPS} from './config/props';
import type {Easy2BootScene03Props} from './config/props';
const slug='easy2boot-multiboot-reels';
const audioDir=staticFile('videos/easy2boot-multiboot-reels/audio/VOICEOVER-README.txt').replace(/VOICEOVER-README\.txt$/,'');
/** Encode a basename, never accept a traversal path from editable Props. */
const optionalAudio=(filename:string)=>audioDir+encodeURIComponent(filename.replaceAll('\\','/').split('/').pop()??'');
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
 // Draft VO lines in Scenes 01–06 use !showSubtitles, while final subtitles use
 // SubtitleTrack. Suppress both without touching approved scene source/motion.
 const sceneProps=p.showOnScreenCaptions?p:{...p,showSubtitles:true,scene01ShowCaptions:false};
 const segments=[
  <Scene01Problem {...sceneProps} scene01ShowCaptions={sceneProps.showSubtitles?false:sceneProps.scene01ShowCaptions} showSfx={false}/>,
  <Scene02WithBridge {...sceneProps} showSfx={false}/>,
  <Scene03ReadableEntrance {...sceneProps}/>,
  <Scene04CopyIso {...sceneProps}/>,
  <Scene05Boot {...sceneProps}/>,
  <Scene06Closing {...sceneProps}/>,
 ];
 let offset=0;
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  {segments.map((segment,i)=>{
   const item=sceneData[i]; const from=offset;offset+=item.frames;
   return <Sequence key={item.name} name={item.name} from={from} durationInFrames={item.frames}>
    {segment}
    <SceneSoundCues sceneIndex={i} enabled={p.showSfx} timing={p}/>
   </Sequence>;
  })}
  {p.showVoiceOver&&p.voiceOverFileName?
    <Audio src={optionalAudio(p.voiceOverFileName)} volume={1}/>:null}
  {p.showOnScreenCaptions&&p.showSubtitles?<SubtitleTrack color={p.subtitleColor}/>:null}
  {p.showMusic&&p.musicFileName?
    <Audio src={optionalAudio(p.musicFileName)} volume={0.17}/>:null}
 </AbsoluteFill>;
};
