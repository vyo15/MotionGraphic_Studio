import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import {DEFAULT_PROPS} from './config/props';
import {SubtitleTrack} from './components/SubtitleTrack';
import type {Easy2BootScene03Props} from './config/props';
import {Scene01Problem} from './scenes/Scene01Problem';
import {Scene02WithBridge} from './scenes/Scene02WithBridge';
import {Scene03ReadableEntrance} from './scenes/Scene03ReadableEntrance';
import {SceneSoundCues} from './components/SceneSoundCues';
import {Scene04CopyIso} from './scenes/Scene04CopyIso';
import {Scene05Boot} from './scenes/Scene05Boot';
import {Scene06Closing} from './scenes/Scene06Closing';
const SceneComponents=[Scene01Problem,Scene02WithBridge,Scene03ReadableEntrance,Scene04CopyIso,Scene05Boot,Scene06Closing];
/** Native scene editing composition registered automatically by Master npm run sync. */
export const SegmentVideo:React.FC<Partial<Easy2BootScene03Props>&{segmentIndex:number}> = ({segmentIndex,...props})=>{
 const p={...DEFAULT_PROPS,...props};
 // Same caption visibility rule as the full composition (including Scene 05 freeze in S06).
 const sceneProps=p.showOnScreenCaptions?p:{...p,showSubtitles:true,scene01ShowCaptions:false};
 const Scene=SceneComponents[segmentIndex];
 if(!Scene)return <AbsoluteFill/>;
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <Scene {...sceneProps} scene01ShowCaptions={sceneProps.showSubtitles?false:sceneProps.scene01ShowCaptions} showSfx={false}/>
  {p.showOnScreenCaptions&&p.showSubtitles?<SubtitleTrack color={p.subtitleColor} sceneIndex={segmentIndex}/>:null}
  <SceneSoundCues sceneIndex={segmentIndex} enabled={p.showSfx} timing={p}/>
 </AbsoluteFill>;
};
