import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import {AudioTimeline} from './components/AudioTimeline';
import {Background,HeaderFooter,HookScene,AddressScene,OctetScene,RouteScene,EndScene} from './Video';
import type {IPAddressReelsProps} from './Video';
import {clipAudioTracks} from './components/clipAudioTracks';
const starts=[0,90,228,366,522] as const;
const lengths=[90,138,138,156,198] as const;
const scenes=[HookScene,AddressScene,OctetScene,RouteScene,EndScene] as const;
/** Aset Interactive asli dari video lengkap, langsung di timeline segment. */
export const SegmentVideo:React.FC<IPAddressReelsProps & {segmentIndex:number}>=({segmentIndex,backgroundColor,musicVolume,audioTimeline})=>{
 const Scene=scenes[segmentIndex];
 if(!Scene)return null;
 const start=starts[segmentIndex],length=lengths[segmentIndex];
 return <AbsoluteFill style={{color:'#F6FCFF',fontFamily:'Arial, Helvetica, sans-serif'}}>
  <Background baseColor={backgroundColor} frameOffset={start}/>
  <Audio name="AUDIO • Beat original" src={staticFile('videos/ip-address/audio/beat.mp3')} startFrom={start} endAt={start+length} volume={musicVolume}/>
  <Scene/>
  <AudioTimeline tracks={clipAudioTracks(audioTimeline,start,length)} prefix="ip-address"/>
  <HeaderFooter frameOffset={start}/>
 </AbsoluteFill>;
};
