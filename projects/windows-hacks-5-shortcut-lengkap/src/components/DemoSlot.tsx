import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {LayerVars,type SceneSettings} from '../editor/LayerVars';
import {TextOverrides} from '../editor/TextOverrides';
import {DemoClock} from '../editor/DemoClock';
import {SeriesSkin} from './SeriesSkin';
import type {Beat} from '../config/beat-timeline';
import {CursorOverride,type CursorTrack} from './CursorOverride';
import {useCurrentFrame} from 'remotion';
import './cursor-overrides.css';
const Clip:React.FC<{component:React.ComponentType;at:number;frozen?:number}>=({component:Scene,frozen,at})=><DemoClock sourceStart={at} frozen={frozen}><Scene/></DemoClock>;
/** Five distinct JSX-timeline entries per shortcut, with real-speed native motion. */
export const DemoSlot:React.FC<{
 title:string;duration:number;nativeDuration:number;settings:SceneSettings;copy:Record<string,string>;sceneKey:string;component:React.ComponentType;
 beats:readonly Beat[];sfx:string;index:number;shortcut:string;cursorTrack?:CursorTrack;
}>=({title,duration,nativeDuration,settings,copy,sceneKey,component,beats,sfx,index,shortcut,cursorTrack})=>{
 const frame=useCurrentFrame();
 const override=Boolean(cursorTrack?.enabled&&frame>=cursorTrack.fromFrame&&frame<=cursorTrack.toFrame);
 const [a,b,c,d,e]=beats;
 const f1=a.frames,f2=b.frames,f3=c.frames,f4=d.frames,f5=e.frames;
 return <AbsoluteFill className={override?'wh-cursor-override':''} style={{fontFamily:'Inter, Segoe UI, Arial, sans-serif'}}>
  <TextOverrides scope={sceneKey} copy={copy}><LayerVars settings={settings}>
   <Sequence name={`${title} · 01 ${a.name}`} from={0} durationInFrames={f1} premountFor={15}><Clip at={a.start} component={component}/></Sequence>
   <Sequence name={`${title} · 02 ${b.name}`} from={f1} durationInFrames={f2} premountFor={15}><Clip at={b.start} component={component}/></Sequence>
   <Sequence name={`${title} · 03 ${c.name}`} from={f1+f2} durationInFrames={f3} premountFor={15}><Clip at={c.start} component={component}/></Sequence>
   <Sequence name={`${title} · 04 ${d.name}`} from={f1+f2+f3} durationInFrames={f4} premountFor={15}><Clip at={d.start} component={component}/></Sequence>
   <Sequence name={`${title} · 05 ${e.name}`} from={f1+f2+f3+f4} durationInFrames={f5} premountFor={15}><Clip at={e.start} component={component}/></Sequence>
   {duration>nativeDuration&&<Sequence name={`${title} · 06 JEDA HASIL (VO)`} from={nativeDuration} durationInFrames={duration-nativeDuration} premountFor={10}><Clip at={nativeDuration-1} frozen={nativeDuration-1} component={component}/></Sequence>}
   <SeriesSkin index={index} shortcut={shortcut} duration={duration}/>
   {cursorTrack&&<CursorOverride track={cursorTrack} frame={frame}/>}
  </LayerVars></TextOverrides>
  <Audio name={`${title} — SFX dapat dimute`} src={staticFile(`videos/windows-hacks-5-shortcut-lengkap/${sfx}`)} volume={settings.sfxEnabled?settings.sfxVolume:0}/>
 </AbsoluteFill>;
};
