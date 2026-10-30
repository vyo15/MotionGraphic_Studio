import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import {AudioTimeline} from './components/AudioTimeline';
import {SceneContent,SCENE_KEYS} from './components/SceneContent';
import {SceneTransition} from './components/SceneTransition';
import {START,FRAMES} from './config/series';
import type {VideoProps} from './Video';
import {clipAudioTracks} from './components/clipAudioTracks';
const voices:Record<string,string>={
 HOOK:'00-hook.wav',CTRL_SHIFT_T:'01-ctrl-shift-t.wav',CTRL_SHIFT_ESC:'02-ctrl-shift-esc.wav',
 WIN_SHIFT_S:'03-win-shift-s.wav',WIN_E:'04-win-e.wav',CTRL_SHIFT_N:'05-ctrl-shift-n.wav',CTA:'06-cta.wav',
};
/** Editor scene LANGSUNG (tanpa Sequence pembungkus video gabungan).
 * segmentIndex diberikan otomatis oleh Master, bukan user Props.
 * Komponen scene, pengaturan layer dan aset persis sama dengan Video.tsx. */
export const SegmentVideo:React.FC<VideoProps & {segmentIndex:number}>=({segmentIndex,...props})=>{
 const key=SCENE_KEYS[segmentIndex];
 if(!key)return null;
 const start=START[key],duration=FRAMES[key];
 return <AbsoluteFill style={{background:'#071321'}}>
  <SceneContent segmentKey={key} sceneEditor={props.sceneEditor} cursorEditor={props.cursorEditor}/>
  <SceneTransition settings={props.transitionEditor} frameOffset={start}/>
  <AudioTimeline tracks={clipAudioTracks(props.audioTimeline,start,duration)} prefix="windows-hacks-5-shortcut-lengkap"/>
  {props.voice.enabled&&<Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/'+voices[key])} volume={props.voice.volume}/>}
  {props.showTimingGuide&&<div style={{position:'absolute',bottom:320,left:60,right:60,textAlign:'center',fontSize:22,color:'white'}}>VOICE-OVER GUIDE · SEGMENT</div>}
 </AbsoluteFill>;
};
