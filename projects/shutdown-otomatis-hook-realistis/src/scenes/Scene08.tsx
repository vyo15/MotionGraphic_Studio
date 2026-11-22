import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';

/**
 * S08: Silent moving cover, Minimal Editorial V2 — user-approved preview.
 * 5 seconds, 150 frames @ 30 FPS. Native React/SVG, NOT a flattened cover.
 * The title, illustration and subtitle sit inside the centered 3:4 Reels grid crop.
 * No audio/voiceover and no new master or renderer.
 */
const clip=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(f:number,a:number,b:number)=>{const v=clip(interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));return v*v*(3-2*v);};
export const Scene08:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input}; const f=useCurrentFrame();
 const top=ease(f,10,35),bottom=ease(f,24,51),underline=ease(f,47,74),sub=ease(f,56,82),panel=ease(f,66,90);
 const handAngle=(-90+109*ease(f,68,106))*Math.PI/180;
 const off=f>=103;
 const centerX=540+p.scene08MainShiftX,centerY=p.scene08MainShiftY;
 const titleScale=p.scene08MainScale;
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{overflow:'hidden',fontFamily:'Inter, Arial, sans-serif'}}>
   <rect x={0} y={0} width={1080} height={1920} fill={p.backgroundColor}/>
   {p.showBackgroundGrid&&<Interactive.G name="S08 — Minimal Editorial grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><g opacity={0.50} stroke="#E9EEEB" strokeWidth={1}>
    <path d="M116 463V1406M282 463V1406M448 463V1406M614 463V1406M780 463V1406M946 463V1406M80 540H1000M80 730H1000M80 920H1000M80 1110H1000M80 1300H1000"/>
   </g></Interactive.G>}
   <Interactive.Text name="S08 — Label WINDOWS TIPS" x={92} y={287} fontSize={30} fontWeight={700} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>WINDOWS TIPS</Interactive.Text>
   <Interactive.G name="S08 — Header divider" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M92 319H986" stroke="#E2E6E3" strokeWidth={2}/></Interactive.G>
   <Interactive.Text name="S08 — Label Ringkasan tutorial" x={92} y={407} fontSize={58} fontWeight={700} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Ringkasan tutorial.</Interactive.Text>
   <g transform={`translate(${centerX} ${809+centerY}) scale(${titleScale}) translate(${-centerX} ${-809-centerY})`}>
    <g opacity={top} transform={`translate(0 ${34*(1-top)})`}>
     {p.scene08TitleTop===DEFAULT_PROPS.scene08TitleTop ? <Interactive.Text name="S08 — Title first line SHUTDOWN" x={centerX} y={706+centerY} textAnchor="middle" fontSize={103} fontWeight={750} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SHUTDOWN</Interactive.Text> : <Interactive.Text name="S08 — Props override cover top" x={centerX} y={706+centerY} textAnchor="middle" fontSize={103} fontWeight={750} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08TitleTop}</Interactive.Text>}
    </g>
    <g opacity={bottom} transform={`translate(0 ${34*(1-bottom)})`}>
     {p.scene08TitleBottom===DEFAULT_PROPS.scene08TitleBottom ? <Interactive.Text name="S08 — Title second line OTOMATIS" x={centerX} y={842+centerY} textAnchor="middle" fontSize={103} fontWeight={750} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OTOMATIS</Interactive.Text> : <Interactive.Text name="S08 — Props override cover second" x={centerX} y={842+centerY} textAnchor="middle" fontSize={103} fontWeight={750} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08TitleBottom}</Interactive.Text>}
    </g>
    <Interactive.G name="S08 — Coral underline moving" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d={`M${250+p.scene08MainShiftX} ${887+centerY}H${250+p.scene08MainShiftX+580*underline}`} fill="none" stroke={p.coralColor} strokeWidth={8} strokeLinecap="round"/></Interactive.G>
    <g opacity={sub}>{p.scene08Subtitle===DEFAULT_PROPS.scene08Subtitle ? <Interactive.Text name="S08 — Subtitle Laptop mati sendiri" x={centerX} y={991+centerY} textAnchor="middle" fontSize={54} fontWeight={530} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Laptop mati sendiri</Interactive.Text> : <Interactive.Text name="S08 — Props override cover summary" x={centerX} y={991+centerY} textAnchor="middle" fontSize={54} fontWeight={530} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08Subtitle}</Interactive.Text>}</g>
   </g>
   {panel>0&&<g opacity={panel} transform={`translate(${p.scene08PanelShiftX} ${p.scene08PanelShiftY+17*(1-panel)})`}>
    <Interactive.G name="S08 — Cover panel surface and shadow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={142} y={1065} width={805} height={269} rx={24} fill="#E9ECEA"/>
     <rect x={138} y={1054} width={805} height={269} rx={24} fill="#FFFFFF" stroke="#E2E6E3" strokeWidth={2}/>
    </Interactive.G>
    <Interactive.G name="S08 — Timer badge ring" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <circle cx={306} cy={1175} r={58} fill="#F8EAE4"/><circle cx={306} cy={1175} r={47} stroke={p.coralColor} strokeWidth={5} fill="none"/>
     {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6-Math.PI/2;const r=i%3===0?31:36;const t=40;return <path key={i} d={`M${306+Math.cos(a)*r} ${1175+Math.sin(a)*r}L${306+Math.cos(a)*t} ${1175+Math.sin(a)*t}`} stroke={p.navyColor} strokeWidth={i%3===0?3:2}/>;})}
     <path d={`M306 1175L${306+25*Math.cos(handAngle)} ${1175+25*Math.sin(handAngle)}`} stroke={p.navyColor} strokeWidth={5} strokeLinecap="round"/><circle cx={306} cy={1175} r={5} fill={p.navyColor}/>
    </Interactive.G>
    <Interactive.G name="S08 — Timer to laptop arrow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M379 1175H425M413 1165L425 1175L413 1185" fill="none" stroke={p.coralColor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></Interactive.G>
    <g transform="translate(697 1161)">
     <Interactive.G name="S08 — Laptop bezel and screen" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <rect x={-108} y={-81} width={216} height={148} rx={15} fill={p.navyColor}/>
      <rect x={-96} y={-68} width={192} height={122} rx={8} fill={off?'#526773':'#DDEEF1'}/>
      {!off&&<g><path d="M-68 -27H-3" stroke="#B2D1D5" strokeWidth={9} strokeLinecap="round"/><path d="M-68 -2H58" stroke="#B9D5D8" strokeWidth={7} strokeLinecap="round"/><rect x={-68} y={16} width={112} height={11} rx={5} fill="#C8DEE1"/></g>}
     </Interactive.G>
     <Interactive.G name="S08 — Laptop base and keyboard" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M-128 67H129L152 89H-152Z" fill="#93A9B2"/><path d="M-151 88H151" stroke="#6D8993" strokeWidth={4}/></Interactive.G>
     {off&&<Interactive.Text name="S08 — Laptop OFF text" x={0} y={7} textAnchor="middle" fontSize={38} fontWeight={700} fill={p.backgroundColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OFF</Interactive.Text>}
    </g>
    <Interactive.Text name="S08 — Timer status within card" x={522} y={1317} textAnchor="middle" fontSize={30} fontWeight={650} fill={f<101?p.navyColor:p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{f<101?(f<84?'01:00:00':'00:00:01'):'OTOMATIS'}</Interactive.Text>
   </g>}
  </svg>
 </AbsoluteFill>;
};
