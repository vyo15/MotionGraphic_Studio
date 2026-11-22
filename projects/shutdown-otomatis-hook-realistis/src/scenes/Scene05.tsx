import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame, interpolate} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';

/**
 * Scene 05 — Swiss Motion #02 (visual selected by user, 21 Nov 2026).
 * Native, individual SVG React layers (NOT a flat MP4 or image).
 * 225 local frames @ 30 FPS. Scene 01–04 source is untouched.
 * Beat sequence: 3600 detik → 60 menit → 1 jam → countdown → laptop OFF.
 * The time-lapse is illustrative; actual /t 3600 is one hour of real time.
 */
const clamp=(v:number)=>Math.min(1,Math.max(0,v));
const ease=(v:number)=>{const a=clamp(v);return a*a*(3-2*a);};
const enter=(f:number,a:number,b:number)=>ease(interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));
const leave=(f:number,a:number,b:number)=>1-enter(f,a,b);
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;

export const Scene05:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 const f=useCurrentFrame();
 const chapter=enter(f,0,10);
 const number=enter(f,24,43);
 const path=enter(f,63,85);
 const sixty=enter(f,67,85);
 const hour=enter(f,86,104);
 const card=enter(f,120,136);
 const laptopOff=enter(f,207,220);
 const seconds=Math.max(1,Math.round(p.scene05CountdownSeconds));
 // A single continuous time-lapse inside the same card: no slide cuts.
 const t=clamp((f-120)/(194-120));
 const remaining=f<120?seconds:(f>=194?0:Math.round(seconds*(1-ease(t))));
 const fmt=(s:number)=>`${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
 const current=fmt(remaining);
 const txtA=enter(f,4,10)*leave(f,97,109);
 const txtB=enter(f,101,108)*leave(f,151,160);
 const txtC=enter(f,154,163)*leave(f,219,225);
 const contentDrift=lerp(18,0,enter(f,0,28));
 const scale=p.scene05MainScale;
 const shiftX=p.scene05MainShiftX+540*(1-scale);
 const shiftY=p.scene05MainShiftY+820*(1-scale);
 const centeredSubX=540+p.subtitleShiftX;
 const centeredSubY=p.subtitleBaselineY+p.subtitleShiftY;
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style={{overflow:'hidden',fontFamily:'Inter, Arial, sans-serif'}}>
   <rect width={1080} height={1920} fill={p.backgroundColor}/>
   <defs>
    <filter id="s05-subtle-shadow" x="-25%" y="-40%" width="150%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
    <clipPath id="s05-card-clip"><rect x={116} y={1184} width={848} height={244} rx={23}/></clipPath>
   </defs>
   <g opacity={chapter}>
    <Interactive.G name="S05 — Divider top" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M100 305H976" stroke="#DCE1DE" strokeWidth={2}/></Interactive.G>
    <Interactive.Text name="S05 — Header 3600 to 60 to 1" x={100} y={381} fontFamily="DejaVu Sans, Arial, sans-serif" fontSize={50} fontWeight={770} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>3600 → 60 → 1</Interactive.Text>
   </g>
   <g transform={`translate(${shiftX} ${shiftY+contentDrift}) scale(${scale})`}>
    {p.showBackgroundGrid&&<Interactive.G name="S05 — Background editorial grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <g stroke="#DDE4E1" strokeWidth={1.2} opacity={0.20}>
      <path d="M95 460H975M95 605H975M95 750H975M95 895H975M95 1040H975M95 1185H975M95 1330H975"/>
      <path d="M100 458V1390M275 458V1390M450 458V1390M625 458V1390M800 458V1390M975 458V1390"/>
     </g>
    </Interactive.G>}
    <Interactive.G name="S05 — Main thin horizontal separator" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d="M108 548H968" stroke="#D7DEDC" strokeWidth={3}/></Interactive.G>
    <g opacity={number} transform={`translate(0 ${24*(1-number)})`}>
     <Interactive.Text name="S05 — Main number 3600" x={124} y={765} fontSize={178} fontWeight={850} letterSpacing={-6} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>3600</Interactive.Text>
     <Interactive.Text name="S05 — Unit DETIK" x={694} y={755} fontSize={40} fontWeight={600} fill="#879395" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>DETIK</Interactive.Text>
    </g>
    <Interactive.G name="S05 — Coral arrow to conversion" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <g opacity={path} fill="none" stroke={p.coralColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M238 866H${lerp(238,841,path)}`}/>
      {path>.92&&<path d="M822 851L842 866L822 881"/>}
     </g>
    </Interactive.G>
    <g opacity={sixty} transform={`translate(0 ${36*(1-sixty)})`}>
     <Interactive.Text name="S05 — Conversion number 60" x={139} y={1049} fontSize={140} fontWeight={780} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>60</Interactive.Text>
     <Interactive.Text name="S05 — Unit MENIT" x={459} y={1042} fontSize={35} fontWeight={680} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>MENIT</Interactive.Text>
    </g>
    <g opacity={hour} transform={`translate(0 ${24*(1-hour)})`}>
     <Interactive.Text name="S05 — Conversion number 1" x={772} y={1045} fontSize={140} fontWeight={840} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>1</Interactive.Text>
     <Interactive.Text name="S05 — Unit JAM" x={776} y={1087} fontSize={37} fontWeight={700} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>JAM</Interactive.Text>
    </g>
    <g opacity={card} transform={`translate(0 ${25*(1-card)})`}>
     <Interactive.G name="S05 — Timer card surface and shadow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
      <rect x={117} y={1200} width={850} height={231} rx={26} fill="#223E4A" opacity={0.11} filter="url(#s05-subtle-shadow)"/>
      <rect x={116} y={1184} width={848} height={244} rx={23} fill="#FFFFFF" stroke="#E1E7E5" strokeWidth={2}/>
     </Interactive.G>
     <Interactive.Text name="S05 — TIMER label" x={148} y={1261} fontSize={27} fontWeight={600} fill="#879597" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>TIMER</Interactive.Text>
     <Interactive.Text name="S05 — Countdown value dynamic Props" x={148} y={1350} fontSize={58} fontWeight={760} fontFamily="Consolas, DejaVu Sans Mono, monospace" fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{current}</Interactive.Text>
     <g transform={`translate(${p.scene05LaptopShiftX} ${p.scene05LaptopShiftY})`}>
      <Interactive.G name="S05 — Laptop screen and bezel" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
       <rect x={713} y={1246} width={191} height={143} rx={13} fill="#294A57"/>
       <rect x={727} y={1259} width={163} height={115} rx={7} fill={laptopOff>.6?'#223944':'#D7ECEC'}/>
       <g opacity={1-laptopOff}><rect x={753} y={1295} width={65} height={16} rx={8} fill="#B9DADA"/><circle cx={763} cy={1345} r={8} fill="#BEDDDF"/></g>
      </Interactive.G>
      <Interactive.G name="S05 — Laptop keyboard and stand" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
       <path d="M709 1388H911L965 1423H646Z" fill="#97ACB1"/>
       <path d="M651 1418H963L950 1428H670Z" fill="#CED8D7"/>
      </Interactive.G>
      <g opacity={laptopOff}>
       <Interactive.Text name="S05 — Laptop OFF" x={807} y={1341} textAnchor="middle" fontSize={49} fontWeight={850} fill="#FFFFFF" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OFF</Interactive.Text>
      </g>
     </g>
    </g>
   </g>
   {p.showCaptions&&<g transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
    <g opacity={txtA}>
     <Interactive.Text name="S05 — Subtitle 01 Angka 3600 itu artinya satu jam" x={centeredSubX} y={centeredSubY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Angka 3600 itu artinya satu jam.</Interactive.Text>
    </g>
    <g opacity={txtB}>
     <Interactive.Text name="S05 — Subtitle 02 Kalau waktunya habis" x={centeredSubX} y={centeredSubY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Kalau waktunya habis,</Interactive.Text>
    </g>
    <g opacity={txtC}>
     <Interactive.Text name="S05 — Subtitle 03 Laptop bakal mati sendiri" x={centeredSubX} y={centeredSubY} textAnchor="middle" fontSize={p.subtitleFontSize} fontWeight={600} fill={p.subtitleColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>laptop bakal mati sendiri.</Interactive.Text>
    </g>
   </g>}
  </svg>
 </AbsoluteFill>;
};
