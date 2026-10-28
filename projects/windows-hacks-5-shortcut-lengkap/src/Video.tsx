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
import {LayerVars} from './editor/LayerVars';
import {TextOverrides} from './editor/TextOverrides';
import type {SceneSettings} from './editor/LayerVars';

export type VideoProps={
 sceneEditor:Record<string,SceneSettings & {copy:Record<string,string>}>;
 voice:{enabled:boolean;volume:number};
 showTimingGuide:boolean;
};
/** Important: one project folder, original visual UI remains DOM/CSS/SVG, NOT flattened videos. */
export const Video:React.FC<VideoProps>=({sceneEditor,voice,showTimingGuide})=> <AbsoluteFill style={{background:'#071321'}}>
 <Sequence name="S00 — HOOK" from={START.HOOK} durationInFrames={FRAMES.HOOK} premountFor={10}><TextOverrides copy={sceneEditor.HOOK.copy}><LayerVars settings={sceneEditor.HOOK}><Hook/></LayerVars></TextOverrides></Sequence>
 <Sequence name="S01 — CTRL + SHIFT + T" from={START.CTRL_SHIFT_T} durationInFrames={FRAMES.CTRL_SHIFT_T} premountFor={15}>
  <DemoSlot title="01 Ctrl Shift T" duration={FRAMES.CTRL_SHIFT_T} nativeDuration={NATIVE_FRAMES.CTRL_SHIFT_T} settings={sceneEditor.CTRL_SHIFT_T} copy={sceneEditor.CTRL_SHIFT_T.copy} component={CtrlShiftT}/>
 </Sequence>
 <Sequence name="S02 — CTRL + SHIFT + ESC" from={START.CTRL_SHIFT_ESC} durationInFrames={FRAMES.CTRL_SHIFT_ESC} premountFor={15}>
  <DemoSlot title="02 Ctrl Shift Esc" duration={FRAMES.CTRL_SHIFT_ESC} nativeDuration={NATIVE_FRAMES.CTRL_SHIFT_ESC} settings={sceneEditor.CTRL_SHIFT_ESC} copy={sceneEditor.CTRL_SHIFT_ESC.copy} component={CtrlShiftEsc}/>
 </Sequence>
 <Sequence name="S03 — WIN + SHIFT + S" from={START.WIN_SHIFT_S} durationInFrames={FRAMES.WIN_SHIFT_S} premountFor={15}>
  <DemoSlot title="03 Win Shift S" duration={FRAMES.WIN_SHIFT_S} nativeDuration={NATIVE_FRAMES.WIN_SHIFT_S} settings={sceneEditor.WIN_SHIFT_S} copy={sceneEditor.WIN_SHIFT_S.copy} component={WinShiftS}/>
 </Sequence>
 <Sequence name="S04 — WIN + E" from={START.WIN_E} durationInFrames={FRAMES.WIN_E} premountFor={15}>
  <DemoSlot title="04 Win E" duration={FRAMES.WIN_E} nativeDuration={NATIVE_FRAMES.WIN_E} settings={sceneEditor.WIN_E} copy={sceneEditor.WIN_E.copy} component={WinE}/>
 </Sequence>
 <Sequence name="S05 — CTRL + SHIFT + N" from={START.CTRL_SHIFT_N} durationInFrames={FRAMES.CTRL_SHIFT_N} premountFor={15}>
  <DemoSlot title="05 Ctrl Shift N" duration={FRAMES.CTRL_SHIFT_N} nativeDuration={NATIVE_FRAMES.CTRL_SHIFT_N} settings={sceneEditor.CTRL_SHIFT_N} copy={sceneEditor.CTRL_SHIFT_N.copy} component={CtrlShiftN}/>
 </Sequence>
 <Sequence name="S06 — CTA" from={START.CTA} durationInFrames={FRAMES.CTA} premountFor={10}><TextOverrides copy={sceneEditor.CTA.copy}><LayerVars settings={sceneEditor.CTA}><CTA/></LayerVars></TextOverrides></Sequence>
 <SceneTransition/>
 {showTimingGuide&&<div style={{position:'absolute',bottom:320,left:60,right:60,textAlign:'center',fontSize:22,color:'white',background:'#072e3bdf',borderRadius:12,padding:8}}>VOICE-OVER GUIDE · 69.5 sec · 30 fps</div>}
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
