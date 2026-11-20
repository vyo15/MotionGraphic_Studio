import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {Scene02Solution} from './Scene02Solution';
import {Scene02To03MatchMove} from './Scene02To03MatchMove';
import type {Easy2BootScene03Props} from '../config/props';
import {SCENE02,BRIDGE02TO03} from '../config/timings';
/** Keep approved 390 frames S02 exactly as authored, append only the approved match-move bridge. */
export const Scene02WithBridge:React.FC<Easy2BootScene03Props>=(p)=>
 <AbsoluteFill style={{background:p.backgroundColor}}>
   <Sequence from={0} durationInFrames={SCENE02.mainDurationInFrames}><Scene02Solution {...p}/></Sequence>
   <Sequence from={SCENE02.mainDurationInFrames} durationInFrames={BRIDGE02TO03.durationInFrames}>
     <Scene02To03MatchMove {...p}/>
   </Sequence>
 </AbsoluteFill>;
