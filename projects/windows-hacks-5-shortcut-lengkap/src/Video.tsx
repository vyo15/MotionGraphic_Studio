import {SceneContent} from './components/SceneContent';
import {DEMO_BEATS} from './config/beat-timeline';
import {AudioTimeline} from './components/AudioTimeline';
import type {AudioTrack} from './components/AudioTimeline';
import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {Hook} from './scenes/Hook';
import {CTA} from './scenes/CTA';
import {Video as CtrlShiftT} from './scenes/01-ctrl-shift-t/Video';
import {Video as CtrlShiftEsc} from './scenes/02-ctrl-shift-esc/Video';
import {Video as WinShiftS} from './scenes/03-win-shift-s/Video';
import {Video as WinE} from './scenes/04-win-e/Video';
import {Video as CtrlShiftN} from './scenes/05-ctrl-shift-n/Video';
import {START,FRAMES,NATIVE_FRAMES,TOTAL_FRAMES} from './config/series';
import {SceneTransition} from './components/SceneTransition';
import {DemoSlot} from './components/DemoSlot';
import type {CursorTrack} from './components/CursorOverride';
import {LayerVars} from './editor/LayerVars';
import {TextOverrides} from './editor/TextOverrides';
import type {SceneSettings} from './editor/LayerVars';

export type VideoProps={
 sceneEditor:Record<string,SceneSettings & {copy:Record<string,string>}>;
 transitionEditor:{enabled:boolean;fadeFrames:number;opacity:number;color:string};
 voice:{enabled:boolean;volume:number};
 cursorEditor?:Record<string,CursorTrack>;
 showTimingGuide:boolean;
 audioTimeline?:AudioTrack[];
};
/** Important: one project folder, original visual UI remains DOM/CSS/SVG, NOT flattened videos. */
export const Video:React.FC<VideoProps>=({sceneEditor,voice,showTimingGuide,transitionEditor,cursorEditor,audioTimeline})=> <AbsoluteFill style={{background:'#071321'}}>
 <Sequence name="00 · HOOK — Pembuka" from={START.HOOK} durationInFrames={FRAMES.HOOK} premountFor={10}><SceneContent segmentKey="HOOK" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="01 · CTRL + SHIFT + T — Pulihkan Tab" from={START.CTRL_SHIFT_T} durationInFrames={FRAMES.CTRL_SHIFT_T} premountFor={15}><SceneContent segmentKey="CTRL_SHIFT_T" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="02 · CTRL + SHIFT + ESC — Task Manager" from={START.CTRL_SHIFT_ESC} durationInFrames={FRAMES.CTRL_SHIFT_ESC} premountFor={15}><SceneContent segmentKey="CTRL_SHIFT_ESC" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="03 · WIN + SHIFT + S — Snipping Tool" from={START.WIN_SHIFT_S} durationInFrames={FRAMES.WIN_SHIFT_S} premountFor={15}><SceneContent segmentKey="WIN_SHIFT_S" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="04 · WIN + E — Dua Jendela" from={START.WIN_E} durationInFrames={FRAMES.WIN_E} premountFor={15}><SceneContent segmentKey="WIN_E" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="05 · CTRL + SHIFT + N — Folder Baru" from={START.CTRL_SHIFT_N} durationInFrames={FRAMES.CTRL_SHIFT_N} premountFor={15}><SceneContent segmentKey="CTRL_SHIFT_N" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <Sequence name="06 · CTA — Simpan Video" from={START.CTA} durationInFrames={FRAMES.CTA} premountFor={10}><SceneContent segmentKey="CTA" sceneEditor={sceneEditor} cursorEditor={cursorEditor}/></Sequence>
 <SceneTransition settings={transitionEditor}/>
 <AudioTimeline tracks={audioTimeline} prefix="windows-hacks-5-shortcut-lengkap"/>
 {showTimingGuide&&<div style={{position:'absolute',bottom:320,left:60,right:60,textAlign:'center',fontSize:22,color:'white',background:'#072e3bdf',borderRadius:12,padding:8}}>VOICE-OVER GUIDE · 73.5 sec · 30 fps</div>}
 {voice.enabled&&<>
  <Sequence name="VOICE 00 — Hook" from={START.HOOK} durationInFrames={FRAMES.HOOK}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/00-hook.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 01 — Ctrl Shift T" from={START.CTRL_SHIFT_T} durationInFrames={FRAMES.CTRL_SHIFT_T}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/01-ctrl-shift-t.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 02 — Ctrl Shift Esc" from={START.CTRL_SHIFT_ESC} durationInFrames={FRAMES.CTRL_SHIFT_ESC}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/02-ctrl-shift-esc.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 03 — Win Shift S" from={START.WIN_SHIFT_S} durationInFrames={FRAMES.WIN_SHIFT_S}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/03-win-shift-s.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 04 — Win E" from={START.WIN_E} durationInFrames={FRAMES.WIN_E}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/04-win-e.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 05 — Ctrl Shift N" from={START.CTRL_SHIFT_N} durationInFrames={FRAMES.CTRL_SHIFT_N}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/05-ctrl-shift-n.wav')} volume={voice.volume}/></Sequence>
  <Sequence name="VOICE 06 — CTA" from={START.CTA} durationInFrames={FRAMES.CTA}><Audio src={staticFile('videos/windows-hacks-5-shortcut-lengkap/audio/06-cta.wav')} volume={voice.volume}/></Sequence>
 </>}
 </AbsoluteFill>;
