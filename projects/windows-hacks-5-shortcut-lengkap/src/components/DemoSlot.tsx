import React from 'react';
import {AbsoluteFill,Freeze,Sequence} from 'remotion';
import {LayerVars,type SceneSettings} from '../editor/LayerVars';
import {TextOverrides} from '../editor/TextOverrides';
/** Plays original demo at 1x speed. Holds the final frame for VO without slow motion.
 * Scene, layer settings, copy, and audio stay separate React/DOM elements. */
export const DemoSlot:React.FC<{
 title:string;duration:number;nativeDuration:number;settings:SceneSettings;copy:Record<string,string>;component:React.ComponentType;
}>=({title,duration,nativeDuration,settings,copy,component:Component})=> <AbsoluteFill>
 <TextOverrides copy={copy}>
  <Sequence name={`${title} — normal speed`} from={0} durationInFrames={nativeDuration} premountFor={15}>
   <LayerVars settings={settings}><Component/></LayerVars>
  </Sequence>
  {duration>nativeDuration&&<Sequence name={`${title} — voice-over breathing room`} from={nativeDuration} durationInFrames={duration-nativeDuration}>
   <Freeze frame={nativeDuration-1}><LayerVars settings={{...settings,sfxEnabled:false}}><Component/></LayerVars></Freeze>
  </Sequence>}
 </TextOverrides>
 </AbsoluteFill>;
