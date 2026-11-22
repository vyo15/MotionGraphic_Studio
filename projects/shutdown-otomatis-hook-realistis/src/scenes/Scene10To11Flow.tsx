import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
/**
 * Scene 10 CTA (frames 0–239) + Scene 11 Cover (frames 240–389).
 * Native React/SVG single-source motion (preview v58); no MP4/images embedded.
 * Scene 11 reads the same timeline at frameOffset=240, preserving the CTA-to-cover handoff.
 * Use Remotion Studio layer selection for individual shapes/text and Props for driven strings,
 * shifts, sizes, and timing. Advanced path animation still lives in source.
 */
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(a:number,b:number,f:number)=>{const v=clamp((f-a)/(b-a));return v*v*(3-2*v);};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const interpColor=(a:string,b:string,t:number)=>{
 const unpack=(s:string)=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];
 const c1=unpack(a),c2=unpack(b);
 return '#'+c1.map((v,i)=>Math.round(lerp(v,c2[i],t)).toString(16).padStart(2,'0')).join('');
};
export type OutroFlowProps = VideoProps & {frameOffset?: number};
export const Scene10To11Flow:React.FC<OutroFlowProps>=({frameOffset=0,...input})=>{
 const p={...DEFAULT_PROPS,...input};
 const C={bg:p.backgroundColor,ink:p.inkColor,coral:p.coralColor,navy:p.navyColor,fade:'#89969A',sage:'#CADAD2'};
 const f=useCurrentFrame()+frameOffset;
 const statusOut=smooth(20,49,f);
 const titleIn=smooth(38,67,f);
 const secondaryIn=smooth(75,106,f);
 const cardIn=smooth(73,112,f);
 const cardOut=smooth(211,254,f);
 const coverIn=smooth(248,283,f);
 const secondTitleIn=smooth(267,305,f);
 const clockIn=smooth(258,295,f);
 const coverTagIn=smooth(302,338,f);
 const toBadge=smooth(18,58,f);
 const toClock=smooth(p.scene10ToCoverStartFrame,p.scene11ClockArrivalFrame,f);
 // Same badge geometry as the previous Scene09 on frame 0.
 const badgeCx=lerp(lerp(540,248+p.scene10CommentBadgeShiftX,toBadge),540+p.scene11ClockShiftX,toClock);
 const badgeCy=lerp(lerp(950,1010+p.scene10CommentBadgeShiftY,toBadge),950+p.scene11ClockShiftY,toClock);
 const badgeR=lerp(lerp(66,37,toBadge),110*p.scene11ClockScale,toClock);
 const subtitleAlpha=(f<86 ? smooth(9,23,f)*(1-smooth(72,86,f)) :
   f<145 ? smooth(86,99,f)*(1-smooth(133,145,f)) :
   smooth(148,163,f)*(1-smooth(215,237,f)));
 const subtitle=f<86?p.scene10SubtitlePart1:f<145?p.scene10SubtitlePart2:p.scene10SubtitlePart3;
 const typed=p.scene10CommentPlaceholder;
 const typeN=Math.min(typed.length,Math.max(0,Math.floor((f-p.scene10TypeStartFrame)/Math.max(1,p.scene10TypeFramesPerChar))));
 const ctaOut=1-smooth(211,253,f);
 const ringGrow=smooth(286,343,f);
 const handA=-Math.PI/2 + (1.75*Math.PI)*smooth(270,356,f);
 const radius=badgeR;
 const checkScale=radius/66;
 const badgeCol=interpColor(interpColor('#EFF3F0','#FFF7F1',toBadge),'#FBF9F6',toClock);
 const badgeStroke=interpColor(interpColor(C.sage,'#EDD0C2',toBadge),'#E0D9D1',toClock);
 const commentIconAlpha=toBadge*(1-toClock);
 const checkOpacity=1-toBadge;
 const yShift=28*(1-titleIn);
 const cardY=lerp(970,949,cardIn);
 return <AbsoluteFill style={{backgroundColor:C.bg}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style={{overflow:'hidden',fontFamily:'Inter, Arial, sans-serif'}}>
   <rect width="1080" height="1920" fill={C.bg}/>

   {/* One title group, no grids, no decorative rules. */}
   <g opacity={titleIn*ctaOut} transform={`translate(0 ${yShift})`}>
    {p.scene10TitleTop===DEFAULT_PROPS.scene10TitleTop ? <Interactive.Text name="S10 CTA / Title top" x={540+p.scene10TitleShiftX} y={580+p.scene10TitleShiftY} fontSize={94} fontWeight={800} fill={C.ink} textAnchor="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>PUNYA CARA</Interactive.Text> : <text x={540+p.scene10TitleShiftX} y={580+p.scene10TitleShiftY} fontSize={94} fontWeight={800} fill={C.ink} textAnchor="middle">{p.scene10TitleTop}</text>}
    {p.scene10TitleBottom===DEFAULT_PROPS.scene10TitleBottom ? <Interactive.Text name="S10 CTA / Title bottom" x={540+p.scene10TitleShiftX} y={700+p.scene10TitleShiftY} fontSize={104} fontWeight={800} fill={C.coral} textAnchor="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>LAIN?</Interactive.Text> : <text x={540+p.scene10TitleShiftX} y={700+p.scene10TitleShiftY} fontSize={104} fontWeight={800} fill={C.coral} textAnchor="middle">{p.scene10TitleBottom}</text>}
   </g>
   <g opacity={secondaryIn*ctaOut} transform={`translate(0 ${16*(1-secondaryIn)})`}>
    {p.scene10Question===DEFAULT_PROPS.scene10Question ? <Interactive.Text name="S10 CTA / Additional question" x={540+p.scene10TitleShiftX} y={799+p.scene10TitleShiftY} fontSize={45} fontWeight={620} fill={C.navy} textAnchor="middle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Yang lebih praktis?</Interactive.Text> : <text x={540+p.scene10TitleShiftX} y={799+p.scene10TitleShiftY} fontSize={45} fontWeight={620} fill={C.navy} textAnchor="middle">{p.scene10Question}</text>}
   </g>

   {/* One useful card, not stacked cards or filler decorations. */}
   <g opacity={cardIn*(1-cardOut)} transform={`translate(${p.scene10CardShiftX} ${p.scene10CardShiftY+cardY-949})`}>
    <Interactive.G name="S10 CTA / Card surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={169} y={963} width={749} height={149} rx={25} fill="#DCE3DF" opacity={0.38}/>
     <rect x={165} y={953} width={749} height={149} rx={25} fill="#FFFFFF" stroke="#E3E7E4" strokeWidth={2}/>
    </Interactive.G>
    <Interactive.G name="S10 CTA / Animated comment placeholder" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><text x={320} y={1040} fontSize={39} fontWeight={540} fill={C.navy}>{typed.slice(0,typeN)}</text></Interactive.G>
    {f>125&&f<204&&Math.floor(f/11)%2===0&&<path d={`M${322+Math.min(430,typeN*20)} 1006 V1052`} stroke={C.coral} strokeWidth={3}/>} 
    <Interactive.G name="S10 CTA / Send arrow" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <circle cx={843} cy={1027} r={28} fill="#FAEEE8"/>
     <path d="M831 1029 L855 1029 M845 1019 L855 1029 L845 1039" stroke={C.coral} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </Interactive.G>
   </g>

   {/* Prior status badge becomes comment indicator, then the cover clock. */}
   <Interactive.G name="Shared success to comment to clock — moving circle" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    <circle cx={badgeCx} cy={badgeCy} r={radius} fill={badgeCol} stroke={badgeStroke} strokeWidth={3}/>
   </Interactive.G>
   <g opacity={checkOpacity}>
    <path d={`M${badgeCx-31*checkScale} ${badgeCy-3*checkScale} L${badgeCx-11*checkScale} ${badgeCy+16*checkScale} L${badgeCx+30*checkScale} ${badgeCy-24*checkScale}`} fill="none" stroke={C.navy} strokeWidth={8*checkScale} strokeLinecap="round" strokeLinejoin="round"/>
   </g>
   <g opacity={commentIconAlpha}>
    <rect x={badgeCx-15} y={badgeCy-13} width={31} height={25} rx={6} fill="none" stroke={C.coral} strokeWidth={3}/>
    <path d={`M${badgeCx-6} ${badgeCy+12} l-5 8 l12 -8`} fill="none" stroke={C.coral} strokeWidth={3} strokeLinejoin="round"/>
   </g>
   {/* One clock draws only as the comment badge morphs, no sudden duplication. */}
   <Interactive.G name="S11 Cover / Animated clock face, ticks and hands" style={{opacity:clockIn}}>
    <Interactive.G name="S11 Cover / Clock tick marks" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
    {Array.from({length:12},(_,i)=>{
      const a=i*Math.PI/6-Math.PI/2;
      const inner=i%3===0?radius*.72:radius*.79;
      const outer=radius*.87;
      return <line key={i} x1={badgeCx+Math.cos(a)*inner} y1={badgeCy+Math.sin(a)*inner} x2={badgeCx+Math.cos(a)*outer} y2={badgeCy+Math.sin(a)*outer} stroke={C.navy} strokeWidth={i%3===0?3.5:2} opacity={.72}/>;
    })}
    </Interactive.G>
    <Interactive.G name="S11 Cover / Clock minute hand" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d={`M${badgeCx} ${badgeCy}L${badgeCx+Math.cos(handA)*radius*.52} ${badgeCy+Math.sin(handA)*radius*.52}`} fill="none" stroke={C.navy} strokeWidth={7} strokeLinecap="round"/></Interactive.G>
    <Interactive.G name="S11 Cover / Clock hour hand" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><path d={`M${badgeCx} ${badgeCy}L${badgeCx+Math.cos(handA*.48)*radius*.37} ${badgeCy+Math.sin(handA*.48)*radius*.37}`} fill="none" stroke={C.coral} strokeWidth={5} strokeLinecap="round"/></Interactive.G>
    <Interactive.G name="S11 Cover / Clock center" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><circle cx={badgeCx} cy={badgeCy} r={7} fill={C.navy}/></Interactive.G>
    <Interactive.G name="S11 Cover / Coral progress ring" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><circle cx={badgeCx} cy={badgeCy} r={radius+12} fill="none" stroke={C.coral} strokeWidth={5} strokeDasharray={`${2*Math.PI*(radius+12)*.78} ${2*Math.PI*(radius+12)}`} strokeDashoffset={2*Math.PI*(radius+12)*(.78-ringGrow*.78)} strokeLinecap="round" opacity={.75*ringGrow} transform={`rotate(-90 ${badgeCx} ${badgeCy})`}/></Interactive.G>
   </Interactive.G>

   {/* Prior exact status stays until CTA objects move, then disappears. */}
   <g opacity={1-statusOut}>
    {p.scene09CancelSuccessText===DEFAULT_PROPS.scene09CancelSuccessText ? <Interactive.Text name="S09 handoff / JADWAL DIBATALKAN" x={540} y={1086} textAnchor="middle" fontSize={51} fontWeight={800} fill={C.navy} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>JADWAL DIBATALKAN</Interactive.Text> : <text x={540} y={1086} textAnchor="middle" fontSize={51} fontWeight={800} fill={C.navy}>{p.scene09CancelSuccessText}</text>}
   </g>

   {/* CTA VO subtitles in the identical baseline and style as the master. */}
   {p.showCaptions&&<g opacity={subtitleAlpha}>
     {f<86
       ? (p.scene10SubtitlePart1===DEFAULT_PROPS.scene10SubtitlePart1
         ? null
         : <text x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} fontSize={p.subtitleFontSize} fontWeight={600} textAnchor="middle" fill={p.subtitleColor}>{p.scene10SubtitlePart1}</text>)
       : f<145
         ? (p.scene10SubtitlePart2===DEFAULT_PROPS.scene10SubtitlePart2
           ? null
           : <text x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} fontSize={p.subtitleFontSize} fontWeight={600} textAnchor="middle" fill={p.subtitleColor}>{p.scene10SubtitlePart2}</text>)
         : (p.scene10SubtitlePart3===DEFAULT_PROPS.scene10SubtitlePart3
           ? null
           : <text x={540+p.subtitleShiftX} y={p.subtitleBaselineY+p.subtitleShiftY} fontSize={p.subtitleFontSize} fontWeight={600} textAnchor="middle" fill={p.subtitleColor}>{p.scene10SubtitlePart3}</text>)}
   </g>}

   {/* Cover uses same clock shape and same background. */}
   <g opacity={coverIn} transform={`translate(0 ${26*(1-coverIn)})`}>
    {p.scene11TitleTop===DEFAULT_PROPS.scene11TitleTop ? <Interactive.Text name="S11 Cover / Title top" x={540+p.scene11TitleShiftX} y={571+p.scene11TitleShiftY} textAnchor="middle" fontSize={104} fontWeight={800} fill={C.navy} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>SHUTDOWN</Interactive.Text> : <text x={540+p.scene11TitleShiftX} y={571+p.scene11TitleShiftY} textAnchor="middle" fontSize={104} fontWeight={800} fill={C.navy}>{p.scene11TitleTop}</text>}
   </g>
   <g opacity={secondTitleIn} transform={`translate(0 ${26*(1-secondTitleIn)})`}>
    {p.scene11TitleBottom===DEFAULT_PROPS.scene11TitleBottom ? <Interactive.Text name="S11 Cover / Title bottom" x={540+p.scene11TitleShiftX} y={708+p.scene11TitleShiftY} textAnchor="middle" fontSize={103} fontWeight={800} fill={C.coral} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>OTOMATIS</Interactive.Text> : <text x={540+p.scene11TitleShiftX} y={708+p.scene11TitleShiftY} textAnchor="middle" fontSize={103} fontWeight={800} fill={C.coral}>{p.scene11TitleBottom}</text>}
   </g>
   <g opacity={coverTagIn}>
     {p.scene11TimerText===DEFAULT_PROPS.scene11TimerText ? <Interactive.Text name="S11 Cover / Timer value" x={540+p.scene11ClockShiftX} y={1250+p.scene11TimerShiftY} textAnchor="middle" fontSize={61} fontWeight={740} fill={C.navy} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>01:00:00</Interactive.Text> : <text x={540+p.scene11ClockShiftX} y={1250+p.scene11TimerShiftY} textAnchor="middle" fontSize={61} fontWeight={740} fill={C.navy}>{p.scene11TimerText}</text>}
     {p.scene11Summary===DEFAULT_PROPS.scene11Summary ? <Interactive.Text name="S11 Cover / Summary" x={540+p.scene11ClockShiftX} y={1360+p.scene11SummaryShiftY} textAnchor="middle" fontSize={40} fontWeight={570} fill={C.ink} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>Atur waktunya. Laptop mati sendiri.</Interactive.Text> : <text x={540+p.scene11ClockShiftX} y={1360+p.scene11SummaryShiftY} textAnchor="middle" fontSize={40} fontWeight={570} fill={C.ink}>{p.scene11Summary}</text>}
   </g>
  </svg>
 </AbsoluteFill>;
};
