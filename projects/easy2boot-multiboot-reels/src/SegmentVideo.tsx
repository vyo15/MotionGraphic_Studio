import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import {DEFAULT_PROPS} from './config/props';
import type {Easy2BootScene03Props} from './config/props';
import {Scene01Problem} from './scenes/Scene01Problem';
import {Scene02WithBridge} from './scenes/Scene02WithBridge';
import {Scene03ReadableEntrance} from './scenes/Scene03ReadableEntrance';
import {Scene03ReadableSfx} from './components/Scene03ReadableSfx';
import {Scene04CopyIso} from './scenes/Scene04CopyIso';
import {Scene05Boot} from './scenes/Scene05Boot';
import {Scene06Closing} from './scenes/Scene06Closing';
const SceneComponents=[Scene01Problem,Scene02WithBridge,Scene03ReadableEntrance,Scene04CopyIso,Scene05Boot,Scene06Closing];
/** Native scene editing composition registered automatically by Master npm run sync. */
export const SegmentVideo:React.FC<Partial<Easy2BootScene03Props>&{segmentIndex:number}> = ({segmentIndex,...props})=>{
 const p={...DEFAULT_PROPS,...props};
 const Scene=SceneComponents[segmentIndex];
 if(!Scene)return <AbsoluteFill/>;
 const filename=`videos/easy2boot-multiboot-reels/audio/scene0${segmentIndex+1}_sfx.wav`;
 return <AbsoluteFill style={{background:p.backgroundColor}}>
  <Scene {...p}/>
  {p.showSfx && segmentIndex===2 ? <Scene03ReadableSfx {...p}/> : p.showSfx && (segmentIndex!==1 || !p.scene02ShowBreak)?<Audio src={staticFile(filename)} volume={0.82}/>:null}
 </AbsoluteFill>;
};
