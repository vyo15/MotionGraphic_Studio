import React from 'react';
import {AbsoluteFill,useCurrentFrame,interpolate,Easing} from 'remotion';
import {EditableG} from '../components/editable/EditableG';
import {SceneSvg,EditorialFrame} from '../components/ui/EditorialFrame';
import {WindowsRun} from '../components/ui/WindowsRun';
import {getLayer,mergeDesign,mergeText,smooth} from '../config/editable';
import {DEFAULT_BEATS} from '../config/timeline';
import type {VideoProps} from '../config/editable';

const Key:React.FC<{x:number;text:string;active:number;width?:number;accent:string;ink:string}>=({x,text,active,width=86,accent,ink})=><g>
 <rect x={x} y="392" width={width} height="57" rx="12" stroke={active?accent:'#D4DEE3'} strokeWidth={active?2:1.5} fill={active?'#FBE5DA':'#FFFFFF'}/>
 <text x={x+width/2} y="428" fontSize="20" fontWeight="800" textAnchor="middle" fill={active?accent:ink}>{text}</text>
</g>;
/** Windows demo: accurate command and deterministic typing. On-screen notification = explanatory, not OS claim. */
export const Scene04Run:React.FC<VideoProps>=(props)=>{
 const frame=useCurrentFrame(),f=Math.round(frame*(props.sceneEditor?.scene04?.speed??1));
 const b=DEFAULT_BEATS.scene04,d=mergeDesign(props.designOverrides),t=mergeText(props.textOverrides),ed=props.sceneEditor;
 const appear=smooth(0,20,f),keys=smooth(b.keysStart,b.keysEnd,f),run=smooth(b.runStart,b.runEnd,f);
 const typed=smooth(b.typingStart,b.typingEnd,f),highlight=smooth(b.highlightStart,221,f),clicked=smooth(b.enterStart,253,f),success=smooth(b.successStart,287,f);
 const px=interpolate(f,[231,253],[379,335],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.quad)});
 const py=interpolate(f,[231,253],[605,537],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.quad)});
 const command=props.command??t.command;
 const seconds=props.shutdownSeconds??3600;
 return <AbsoluteFill style={{background:d.background}}><SceneSvg>
  <EditorialFrame scene="scene04" editor={ed} design={props.designOverrides}/>
  <EditableG name="S04 · Judul tutorial" control={getLayer(ed,'scene04','title')}>
   <g opacity={appear}>
    <text x="42" y="162" fontWeight="800" fontSize="28" fill={d.ink}>{f<207?t.tutorialTitle:'Shutdown dalam 1 jam'}</text>
    <text x="42" y="194" fontWeight="500" fontSize="15" fill={d.muted}>{f<207?t.tutorialSmall:`${seconds} detik = ${seconds/60} menit.`}</text>
   </g>
  </EditableG>
  <EditableG name="S04 · Keyboard shortcut Win + R" control={getLayer(ed,'scene04','shortcut')}>
   <g opacity={1-run}>
    <rect x="70" y="315" width="400" height="161" rx="20" fill="#EDF0F1"/>
    <text x="270" y="358" fontSize="15" fill={d.muted} textAnchor="middle" fontWeight="650">Tekan bersamaan</text>
    <Key x={144} text="⊞" active={keys} accent={d.accent} ink={d.ink}/>
    <text x="270" y="429" fontSize="24" fontWeight="700" fill={d.muted} textAnchor="middle">+</text>
    <Key x={304} text="R" active={keys} accent={d.accent} ink={d.ink}/>
   </g>
  </EditableG>
  <WindowsRun command={command} typed={typed} opacity={run} focus={run} clicked={clicked} editor={ed} design={props.designOverrides} runLabel={t.runLabel}/>
  <EditableG name="S04 · Highlight angka detik" control={getLayer(ed,'scene04','secondsHighlight')}>
   <g opacity={highlight*(1-clicked)}>
    <rect x="220" y="614" width="251" height="56" rx="13" fill="#FFF4EE" stroke="#F2D0C0"/>
    <text x="345" y="638" textAnchor="middle" fontSize="15" fontWeight="800" fill={d.accent}>{seconds} = {seconds/60} menit</text>
    <text x="345" y="655" textAnchor="middle" fontSize="11" fill={d.muted}>Waktu tunggu dalam detik</text>
   </g>
  </EditableG>
  <EditableG name="S04 · Kursor klik OK" control={getLayer(ed,'scene04','cursor')} cx={px} cy={py}>
   {f>231&&f<266?<path d={`M${px} ${py}l-2 26 10-7 10 14 7-4-10-14 12-3z`} fill="#FFFFFF" stroke={d.ink} strokeWidth="2"/>:null}
  </EditableG>
  <EditableG name="S04 · Panel hasil ilustratif" control={getLayer(ed,'scene04','success')}>
   <g opacity={success}>
    <rect x="63" y="614" width="414" height="112" rx="16" fill="#EAF6F0" stroke="#D0EBDD" strokeWidth="1.2"/>
    <circle cx="100" cy="653" r="19" fill="#35A879"/>
    <path d="M91 653L98 660L110 646" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <text x="130" y="649" fontSize="16" fontWeight="800" fill="#206C52">{t.scheduledTitle}</text>
    <text x="130" y="674" fontSize="13" fontWeight="600" fill="#4B766A">{t.scheduledSmall}</text>
    <text x="270" y="707" textAnchor="middle" fontSize="11" fontWeight="500" fill="#527369">{t.note}</text>
   </g>
  </EditableG>
 </SceneSvg></AbsoluteFill>;
};
