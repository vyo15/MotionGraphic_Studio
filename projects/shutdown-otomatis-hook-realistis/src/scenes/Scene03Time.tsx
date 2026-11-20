import React from 'react';
import {AbsoluteFill,useCurrentFrame,interpolate,Easing} from 'remotion';
import {EditableG} from '../components/editable/EditableG';
import {SceneSvg,EditorialFrame} from '../components/ui/EditorialFrame';
import {getLayer,mergeDesign,mergeText,clamp,smooth} from '../config/editable';
import {DEFAULT_BEATS} from '../config/timeline';
import type {VideoProps} from '../config/editable';

const TimeCard:React.FC<{x:number;type:'film'|'download';accent:string;ink:string;opacity:number}>=({x,type,accent,ink,opacity})=>{
 const film=type==='film';return <g opacity={opacity}>
  <rect x={x} y="245" width="211" height="82" rx="16" fill="#FFFFFF" stroke="#E4E5E2" strokeWidth="1.1"/>
  <circle cx={x+35} cy="285" r="15" fill="#FBE5DA"/>
  {film?<path d={`M${x+32} 278L${x+43} 285L${x+32} 292Z`} fill={accent}/>:<g fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"><path d={`M${x+35} 277V291 M${x+29} 286L${x+35} 292L${x+41} 286 M${x+27} 296H${x+43}`}/></g>}
  <text x={x+62} y="280" fontSize="13" fontWeight="750" fill={ink}>{film?'Film terus':'Unduhan belum'}</text>
  <text x={x+62} y="299" fontSize="12" fill="#6D7984">{film?'berjalan':'selesai'}</text>
  <rect x={x+62} y="307" width="126" height="5" rx="3" fill="#E4E7E8"/>
  <rect x={x+62} y="307" width={film?86:95} height="5" rx="3" fill={accent}/>
 </g>;
};
/** Scene 03 from preview V35: two cases -> clock -> timer. No prerendered assets. */
export const Scene03Time:React.FC<VideoProps>=(props)=>{
 const frame=useCurrentFrame(),f=Math.round(frame*(props.sceneEditor?.scene03?.speed??1));
 const d=mergeDesign(props.designOverrides),t=mergeText(props.textOverrides),ed=props.sceneEditor;
 const b=DEFAULT_BEATS.scene03;
 const appear=smooth(0,16,f),merge=smooth(b.mergeStart,b.mergeEnd,f),timer=smooth(b.timerStart,b.timerEnd,f),scheduled=smooth(b.scheduledStart,b.scheduledEnd,f);
 const angle=interpolate(f,[0,105],[0,445],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
 const radius=131-28*timer;
 const clockTime=f<58?'23:55':f<96?'00:30':'01:00:00';
 const ticks=Array.from({length:12},(_,i)=>i*Math.PI/6);
 return <AbsoluteFill style={{background:d.background}}><SceneSvg>
  <EditorialFrame scene="scene03" editor={ed} design={props.designOverrides}/>
  <EditableG name="S03 · Judul waktu" control={getLayer(ed,'scene03','title')}>
    <g opacity={appear}>
     <text x="42" y="162" fontSize="27" fontWeight="800" fill={d.ink}>{timer>.52?'Biar laptop mati sendiri':t.clockTitle}</text>
     <text x="42" y="193" fontSize="15" fill={d.muted}>{timer>.52?'Atur waktunya, bukan menunggu terus.':t.clockSmall}</text>
    </g>
  </EditableG>
  <EditableG name="S03 · Kartu menonton" control={getLayer(ed,'scene03','filmCard')}>
   <TimeCard x={41-12*merge} type="film" ink={d.ink} accent={d.accent} opacity={1-merge}/>
  </EditableG>
  <EditableG name="S03 · Kartu download" control={getLayer(ed,'scene03','downloadCard')}>
   <TimeCard x={288+12*merge} type="download" ink={d.ink} accent={d.accent} opacity={1-merge}/>
  </EditableG>
  <EditableG name="S03 · Jam dasar dan angka" control={getLayer(ed,'scene03','clock')} cx={270} cy={470}>
   <circle cx="270" cy="479" r={radius+7} fill="#CBD8DE" opacity="0.2"/>
   <circle cx="270" cy="470" r={radius} fill={d.panel} stroke="#E1E6E7" strokeWidth="3"/>
   {ticks.map((a,i)=><line key={i} x1={270+(radius-23)*Math.sin(a)} y1={470-(radius-23)*Math.cos(a)} x2={270+(radius-12)*Math.sin(a)} y2={470-(radius-12)*Math.cos(a)} stroke="#9CA8AE" strokeWidth="3" strokeLinecap="round"/>)}
   <rect x="212" y="486" width="116" height="33" rx="10" fill="#FFFFFF"/>
   <text x="270" y="510" fontSize="19" fontWeight="750" fill={d.ink} textAnchor="middle">{clockTime}</text>
  </EditableG>
  <EditableG name="S03 · Jarum jam bergerak" control={getLayer(ed,'scene03','clockHands')} cx={270} cy={470}>
   <path d={`M270 470V${470-radius*.48}`} fill="none" stroke={d.ink} strokeWidth="7" strokeLinecap="round" transform={`rotate(${angle*.7} 270 470)`}/>
   <path d={`M270 470V${470-radius*.72}`} fill="none" stroke={d.accent} strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 270 470)`}/>
   <circle cx="270" cy="470" r="6" fill={d.accent}/>
  </EditableG>
  <EditableG name="S03 · Keterangan waktu" control={getLayer(ed,'scene03','timeTag')}>
   <text x="270" y="665" opacity={1-smooth(80,100,f)} fill={d.muted} fontWeight="700" fontSize="14" letterSpacing="1.1" textAnchor="middle">{t.timeTag}</text>
  </EditableG>
  <EditableG name="S03 · Panel timer" control={getLayer(ed,'scene03','timer')}>
   <g opacity={timer}>
    <rect x="101" y="640" width="338" height="109" rx="17" fill="#FFFFFF" stroke="#E4E5E2"/>
    <text x="270" y="672" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="1.4" fill={d.muted}>{t.timerTitle}</text>
    <text x="270" y="716" textAnchor="middle" fontSize="32" fontWeight="850" fontFamily="monospace" fill={d.ink}>01 : 00 : 00</text>
    <line x1="130" y1="735" x2="410" y2="735" stroke="#E6ECEC" strokeWidth="5" strokeLinecap="round"/>
    <line x1="130" y1="735" x2={130+280*scheduled} y2="735" stroke={d.accent} strokeWidth="5" strokeLinecap="round"/>
   </g>
  </EditableG>
  <EditableG name="S03 · Status jadwal" control={getLayer(ed,'scene03','scheduled')}>
   <g opacity={scheduled}><rect x="156" y="771" width="228" height="39" rx="18" fill="#E7F5EF"/>
    <text x="270" y="797" fontSize="13" fontWeight="750" fill="#287B5B" textAnchor="middle">{t.timerDescription}</text></g>
  </EditableG>
 </SceneSvg></AbsoluteFill>;
};
