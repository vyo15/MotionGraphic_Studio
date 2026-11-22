import React from 'react';
import {Interactive} from 'remotion';
import type {VideoProps} from '../config/props';

/** Radial question marks — same position and continuous motion across boundary. */
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smoother=(x:number)=>{const t=clamp(x);return t*t*t*(t*(t*6-15)+10);};
const turn=(f:number,a:number,b:number)=>smoother((f-a)/(b-a));
type Item={x:number;y:number;size:number;tilt:number;color:'coral'|'muted';alpha:number;appear:number;phase:number};
const marks:Item[]=[
 {x:226,y:749,size:106,tilt:-11,color:'muted',alpha:.48,appear:65,phase:0.4},
 {x:857,y:771,size:122,tilt:11,color:'coral',alpha:.30,appear:75,phase:1.2},
 {x:170,y:1039,size:77,tilt:8,color:'coral',alpha:.27,appear:85,phase:1.8},
 {x:890,y:1080,size:96,tilt:-12,color:'muted',alpha:.43,appear:91,phase:2.7},
 {x:578,y:1283,size:65,tilt:12,color:'muted',alpha:.32,appear:96,phase:3.2}
];
export const QuestionOrnaments:React.FC<{globalFrame:number;p:Required<VideoProps>}>=({globalFrame:f,p})=>{
 const leave=1-turn(f,145,180);
 return <Interactive.G name="QUESTION — Radial marks, independently editable" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <g opacity={turn(f,marks[0].appear,marks[0].appear+20)*leave*marks[0].alpha} transform={`translate(${marks[0].x+11*(Math.cos(Math.max(0,f-marks[0].appear)/35+marks[0].phase)-Math.cos(marks[0].phase))} ${marks[0].y+9*(Math.sin(Math.max(0,f-marks[0].appear)/40+marks[0].phase)-Math.sin(marks[0].phase))+17*(1-turn(f,marks[0].appear,marks[0].appear+20))}) rotate(${marks[0].tilt}) scale(${.87+.13*turn(f,marks[0].appear,marks[0].appear+20)})`}>
   <Interactive.Text name="QUESTION — Tanda tanya kiri atas" x={0} y={0} textAnchor="middle" fontSize={marks[0].size} fontWeight={800} fill="#92A9AE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>
  </g>
  <g opacity={turn(f,marks[1].appear,marks[1].appear+20)*leave*marks[1].alpha} transform={`translate(${marks[1].x+11*(Math.cos(Math.max(0,f-marks[1].appear)/35+marks[1].phase)-Math.cos(marks[1].phase))} ${marks[1].y+9*(Math.sin(Math.max(0,f-marks[1].appear)/40+marks[1].phase)-Math.sin(marks[1].phase))+17*(1-turn(f,marks[1].appear,marks[1].appear+20))}) rotate(${marks[1].tilt}) scale(${.87+.13*turn(f,marks[1].appear,marks[1].appear+20)})`}>
   <Interactive.Text name="QUESTION — Tanda tanya kanan atas" x={0} y={0} textAnchor="middle" fontSize={marks[1].size} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>
  </g>
  <g opacity={turn(f,marks[2].appear,marks[2].appear+20)*leave*marks[2].alpha} transform={`translate(${marks[2].x+11*(Math.cos(Math.max(0,f-marks[2].appear)/35+marks[2].phase)-Math.cos(marks[2].phase))} ${marks[2].y+9*(Math.sin(Math.max(0,f-marks[2].appear)/40+marks[2].phase)-Math.sin(marks[2].phase))+17*(1-turn(f,marks[2].appear,marks[2].appear+20))}) rotate(${marks[2].tilt}) scale(${.87+.13*turn(f,marks[2].appear,marks[2].appear+20)})`}>
   <Interactive.Text name="QUESTION — Tanda tanya kiri bawah" x={0} y={0} textAnchor="middle" fontSize={marks[2].size} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>
  </g>
  <g opacity={turn(f,marks[3].appear,marks[3].appear+20)*leave*marks[3].alpha} transform={`translate(${marks[3].x+11*(Math.cos(Math.max(0,f-marks[3].appear)/35+marks[3].phase)-Math.cos(marks[3].phase))} ${marks[3].y+9*(Math.sin(Math.max(0,f-marks[3].appear)/40+marks[3].phase)-Math.sin(marks[3].phase))+17*(1-turn(f,marks[3].appear,marks[3].appear+20))}) rotate(${marks[3].tilt}) scale(${.87+.13*turn(f,marks[3].appear,marks[3].appear+20)})`}>
   <Interactive.Text name="QUESTION — Tanda tanya kanan bawah" x={0} y={0} textAnchor="middle" fontSize={marks[3].size} fontWeight={800} fill="#92A9AE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>
  </g>
  <g opacity={turn(f,marks[4].appear,marks[4].appear+20)*leave*marks[4].alpha} transform={`translate(${marks[4].x+11*(Math.cos(Math.max(0,f-marks[4].appear)/35+marks[4].phase)-Math.cos(marks[4].phase))} ${marks[4].y+9*(Math.sin(Math.max(0,f-marks[4].appear)/40+marks[4].phase)-Math.sin(marks[4].phase))+17*(1-turn(f,marks[4].appear,marks[4].appear+20))}) rotate(${marks[4].tilt}) scale(${.87+.13*turn(f,marks[4].appear,marks[4].appear+20)})`}>
   <Interactive.Text name="QUESTION — Tanda tanya bawah tengah" x={0} y={0} textAnchor="middle" fontSize={marks[4].size} fontWeight={800} fill="#92A9AE" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>?</Interactive.Text>
  </g>
 </Interactive.G>;
};
