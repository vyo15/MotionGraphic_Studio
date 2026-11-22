import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {SceneSet} from '../components/SceneSet';
import {EditorialClock} from '../components/EditorialClock';
import {QuestionOrnaments} from '../components/QuestionOrnaments';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';

/**
 * Separate 4.5s editorial question scene — review v6.
 * Same geometry as S02 at frame 0; clock becomes the shared object handed to S03.
 * At final frame the clock is exactly x540/y856, scale 1, rotation 0;
 * hands rotate one full turn and visually match S03's -32 deg at its first frame.
 */
export const QUESTION_FRAMES=135;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smoother=(n:number)=>{const t=clamp(n);return t*t*t*(t*(t*6-15)+10);};
const turn=(f:number,a:number,b:number)=>smoother((f-a)/(b-a));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export const SceneQuestion:React.FC<VideoProps>=(input)=>{
 const p={...DEFAULT_PROPS,...input};
 const f=useCurrentFrame();
 // Same user adjustments as Scene02: prevent a snap when edited later.
 const pDownload={...p,
  stickmanShiftX:p.stickmanShiftX+p.scene02StickmanShiftX,
  stickmanShiftY:p.stickmanShiftY+p.scene02StickmanShiftY,
  laptopShiftX:p.laptopShiftX+p.scene02LaptopShiftX,
  laptopShiftY:p.laptopShiftY+p.scene02LaptopShiftY,
  nightWindowShiftX:p.nightWindowShiftX+p.scene02NightWindowShiftX,
  nightWindowShiftY:p.nightWindowShiftY+p.scene02NightWindowShiftY,
  deskShiftX:p.deskShiftX+p.scene02DeskShiftX,
  deskShiftY:p.deskShiftY+p.scene02DeskShiftY};
 const setOut=turn(f,12,50);
 const move=turn(f,19,74);
 const heading1=turn(f,65,90);
 const heading2=turn(f,81,106);
 const clockVisible=turn(f,12,48);
 const clockX=mix(580-94*p.cameraStrength,540,move)+p.scene03ClockShiftX;
 const floatPhase=clamp((f-74)/60);
 const floatWindow=Math.sin(Math.PI*floatPhase)**2;
 const clockY=mix(615,856,move)-15*floatWindow+p.scene03ClockShiftY;
 const clockScale=(mix(0.31,1,move)+0.027*floatWindow)*p.scene03ClockScale;
 const handAngle=-32+360*turn(f,32,134);
 // Clock's subtle motion ends at rest, matching Scene03 frame 0.
 const labelLift=16;
 const gridOpacity=0.17*setOut;
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" style={{fontFamily:'Inter, Arial, sans-serif',overflow:'hidden'}}>
   {p.showBackgroundGrid?<Interactive.G name="S03-B — Editorial background grid" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <g opacity={gridOpacity} stroke="#E1E5E2" strokeWidth={1}>
     <path d="M110 455H970M110 565H970M110 675H970M110 785H970M110 895H970M110 1005H970M110 1115H970M110 1225H970M110 1335H970"/>
     <path d="M110 455V1335M220 455V1335M330 455V1335M440 455V1335M550 455V1335M660 455V1335M770 455V1335M880 455V1335M970 455V1335"/>
    </g>
   </Interactive.G>:null}
   <g opacity={1-setOut}>
    <SceneSet globalFrame={404} options={pDownload}/>
    <g transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
     <Interactive.Text name="S03-B — Outgoing heading download" x={104} y={382} fontSize={55} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Download belum selesai?</Interactive.Text>
    </g>
    {p.showCaptions?null:null}
   </g>
   <QuestionOrnaments globalFrame={f} p={p}/>
   <EditorialClock p={p} x={clockX} y={clockY} scale={clockScale} opacity={clockVisible} handAngle={handAngle}/>
   {/* Center-aligned two-line title. No underline, divider or extra copy. */}
   <g transform={`translate(${p.textShiftX} ${p.textShiftY})`}>
    <g opacity={heading1} transform={`translate(0 ${labelLift*(1-heading1)})`}>
     <Interactive.Text name="S03-B — Center typography EMANG ADA" x={540} y={393} textAnchor="middle" fontSize={76} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>EMANG ADA</Interactive.Text>
    </g>
    <g opacity={heading2} transform={`translate(0 ${labelLift*(1-heading2)})`}>
     <Interactive.Text name="S03-B — Center typography SOLUSINYA" x={540} y={500} textAnchor="middle" fontSize={88} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SOLUSINYA?</Interactive.Text>
    </g>
   </g>
  </svg>
 </AbsoluteFill>;
};
