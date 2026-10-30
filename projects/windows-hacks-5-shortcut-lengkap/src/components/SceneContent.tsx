import React from 'react';
import {Hook} from '../scenes/Hook';
import {CTA} from '../scenes/CTA';
import {Video as CtrlShiftT} from '../scenes/01-ctrl-shift-t/Video';
import {Video as CtrlShiftEsc} from '../scenes/02-ctrl-shift-esc/Video';
import {Video as WinShiftS} from '../scenes/03-win-shift-s/Video';
import {Video as WinE} from '../scenes/04-win-e/Video';
import {Video as CtrlShiftN} from '../scenes/05-ctrl-shift-n/Video';
import {DemoSlot} from './DemoSlot';
import {DEMO_BEATS} from '../config/beat-timeline';
import {FRAMES,NATIVE_FRAMES} from '../config/series';
import {LayerVars} from '../editor/LayerVars';
import {TextOverrides} from '../editor/TextOverrides';
import type {VideoProps} from '../Video';

export type SceneKey='HOOK'|'CTRL_SHIFT_T'|'CTRL_SHIFT_ESC'|'WIN_SHIFT_S'|'WIN_E'|'CTRL_SHIFT_N'|'CTA';
export const SCENE_KEYS: readonly SceneKey[] = ['HOOK','CTRL_SHIFT_T','CTRL_SHIFT_ESC','WIN_SHIFT_S','WIN_E','CTRL_SHIFT_N','CTA'];

/** Komponen scene yang sama untuk video gabungan maupun editor per segmen.
 * Tidak membungkus SceneContent dalam Sequence supaya daftar layer per scene
 * terlihat langsung di timeline Remotion Studio. */
export const SceneContent:React.FC<Pick<VideoProps,'sceneEditor'|'cursorEditor'> & {segmentKey:SceneKey}>=({sceneEditor,cursorEditor,segmentKey})=>{
 const settings=sceneEditor[segmentKey];
 if(!settings)return null;
 if(segmentKey==='HOOK')return <TextOverrides scope="HOOK" copy={settings.copy}><LayerVars settings={settings}><Hook/></LayerVars></TextOverrides>;
 if(segmentKey==='CTA')return <TextOverrides scope="CTA" copy={settings.copy}><LayerVars settings={settings}><CTA/></LayerVars></TextOverrides>;
 const configs={
  CTRL_SHIFT_T:{title:'01 · Browser — Pulihkan Tab',sfx:'01-ctrl-shift-t/audio/sfx.wav',index:1,shortcut:'CTRL + SHIFT + T',component:CtrlShiftT},
  CTRL_SHIFT_ESC:{title:'02 · Task Manager — Akhiri Aplikasi',sfx:'02-ctrl-shift-esc/audio/ctrl-shift-esc-sfx.wav',index:2,shortcut:'CTRL + SHIFT + ESC',component:CtrlShiftEsc},
  WIN_SHIFT_S:{title:'03 · Snipping Tool — Screenshot Area',sfx:'03-win-shift-s/audio/win-shift-s-sfx.wav',index:3,shortcut:'WIN + SHIFT + S',component:WinShiftS},
  WIN_E:{title:'04 · Explorer — Jendela Kedua',sfx:'04-win-e/audio/win-e-two-windows.wav',index:4,shortcut:'WIN + E',component:WinE},
  CTRL_SHIFT_N:{title:'05 · Explorer — Buat Folder',sfx:'05-ctrl-shift-n/audio/ctrl-shift-n-v2.wav',index:5,shortcut:'CTRL + SHIFT + N',component:CtrlShiftN},
 };
 const key=segmentKey as keyof typeof configs;
 const c=configs[key];
 return <DemoSlot title={c.title} duration={FRAMES[key]} nativeDuration={NATIVE_FRAMES[key]} settings={settings} copy={settings.copy} sceneKey={key} cursorTrack={cursorEditor?.[key]} beats={DEMO_BEATS[key]} sfx={c.sfx} index={c.index} shortcut={c.shortcut} component={c.component}/>;
};
