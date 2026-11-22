import React from 'react';
import {AbsoluteFill, Interactive, useCurrentFrame} from 'remotion';
import {DEFAULT_PROPS, type VideoProps} from '../config/props';
import {Matched3600} from '../components/Matched3600';

/**
 * Scene 05 -> Scene 06 -> Scene 07, continuous Remotion match move.
 * This source is shared by the independent intro/explanation editor scenes.
 * frameOffset is 0 for the intro and 90 for the explanation; the visual frame
 * is NEVER reset to zero between the two segments.
 *
 * Coordinate contract from Scene04.tsx (display S05), final frame 299:
 * 3600: x=540, baseline=1040, fontSize=146, weight=850, anchor=middle.
 * DETIK: x=540, baseline=1134, fontSize=48, weight=700, anchor=middle.
 * No duplicated or rasterized number/label. One background for both scenes.
 */
export const BRIDGE_FRAMES=90;
export const EXPLANATION_FRAMES=375;
export const SEPARATOR_FRAMES=150; // approved v54 'KALAU NGGAK JADI?' scene
export const CANCELLATION_FRAMES=300; // slower pacing approved in v55
export const FLOW_FRAMES=BRIDGE_FRAMES+EXPLANATION_FRAMES+SEPARATOR_FRAMES+CANCELLATION_FRAMES;
/**
 * The approved v55 preview left frames 0–615 of the shared timeline untouched.
 * The final cancellation is delayed by remapping its SOURCE frame clock.
 * IMPORTANT: retime only the source frame—not the SVG or MP4—so all editor layers stay native.
 */
export const mapCancellationFrame=(visualFrame:number):number=>{
 const target=[615,690,780,838,914];
 const source=[615,674,740,779,835];
 if(visualFrame<=615)return visualFrame;
 for(let i=1;i<target.length;i++){
  if(visualFrame<=target[i])return source[i-1]+(visualFrame-target[i-1])*(source[i]-source[i-1])/(target[i]-target[i-1]);
 }
 return source[source.length-1];
};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};
const step=(f:number,start:number,end:number)=>smooth((f-start)/(end-start));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const fade=(f:number,inA:number,inB:number,outA:number,outB:number)=>step(f,inA,inB)*(1-step(f,outA,outB));
const countChars=(f:number,start:number,speed:number,max:number)=>Math.max(0,Math.min(max,Math.floor((f-start)/speed)));
const mono='Inter, Arial, sans-serif';

type FlowProps=VideoProps&{frameOffset?:number};
export const Scene05To06Flow:React.FC<FlowProps>=({frameOffset=0,...input})=>{
 const p={...DEFAULT_PROPS,...input};
 const localFrame=useCurrentFrame();
 const visualFrame=localFrame+frameOffset;
 // Native pacing control; 1.0 reproduces ACC v55 exactly.
 const clock=visualFrame<=615?visualFrame:615+(visualFrame-615)*Math.max(.5,Math.min(1.5,p.scene09CancelPlaybackSpeed));
 const f=mapCancellationFrame(clock);
 // One continuous source number. Begin IDENTICALLY to the last frame of S05.
 const move=step(f,9,71);
 const numberX=lerp(540,851,move);
 const numberY=lerp(1040,841,move);
 const numberSize=lerp(146,49,move);
 const unitY=numberY+94*(numberSize/146);
 const unitSize=48*(numberSize/146);
 const unitAlpha=1-step(f,11,38);
 const titleAlpha=step(f,72,89);
 // Prepare the command before the number lands; no delayed row pop-in.
 const rowAlpha=step(f,38,58);
 const ef=f-15; // Explanation waits until 3600 lands, then stays on one shared frame clock.
 // Copy-down animation — main command remains stable while one token is explained.
 const sMove=step(ef,84,113);
 const sAlpha=fade(ef,84,96,190,202);
 const sType=p.scene05ExplainSMeaning;
 const sTyped=sType.slice(0,countChars(ef,114,4.0,sType.length));
 const tMove=step(ef,203,231);
 const tAlpha=fade(ef,203,213,286,299);
 const tType=p.scene05ExplainTMeaning;
 const tTyped=tType.slice(0,countChars(ef,233,5,tType.length));
 const nMove=step(ef,301,327);
 // Keep the explanation on-screen when the timer appears.
 const nAlpha=step(ef,301,310);
 // The meaning remains centered ABOVE the timer; do not slide it below.
 const meaningY=1080;
 const nType=p.scene05ExplainDurationMeaning;
 // Type the complete unit conversion before the timer takes focus.
 const nTyped=nType.slice(0,countChars(ef,325,1.0,nType.length));
 const timerAlpha=step(ef,389,412);
 const timerSeconds=ef<435?p.scene07TimerInitialText:p.scene07TimerRunningText;
 // Seamless continuation into the newly proposed cancellation separator.
 const outExplanation=step(f,465,508);
 const bridgeHeader=step(f,495,523)*(1-step(f,584,607));
 const bridgeSubtitle=step(f,511,528)*(1-step(f,582,604));
 const cancelHeader=step(f,615,640)*(1-step(f,775,800));
 const cancelRun=step(f,639,667)*(1-step(f,750,779));
 const timerToBridge=step(f,465,541);
 const timerToCancel=step(f,585,637);
 const timerY=lerp(1295,925,timerToBridge)-250*timerToCancel;
 const timerSize=lerp(86,48,timerToCancel);
 const timerHold=1-step(f,760,787);
 const successAlpha=step(f,779,801);
 const cancelCmd=p.scene09CancelCommand;
 const cancelTyped=cancelCmd.slice(0,countChars(f,674,5.2,cancelCmd.length));
 const active=ef<203?'s':ef<300?'t':'n';
 const titleTop=p.scene05ExplainTitleTop;
 const titleBottom=p.scene05ExplainTitleBottom;
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style={{overflow:'hidden',fontFamily:mono}}>
   {/* The complete frame has one solid master background; no gradients, grid or rule. */}
   <g opacity={titleAlpha*(1-outExplanation)}>
    <Interactive.Text
     name="S06/S07 / Title — CARA editable"
     x={540}
     y={318}
     textAnchor="middle"
     fontSize={68}
     fontWeight={800}
     fill={p.inkColor}
     style={{
      translate: '0px 219.4px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >{titleTop}</Interactive.Text>
    <Interactive.Text
     name="S06/S07 / Title — KERJANYA editable"
     x={540}
     y={398}
     textAnchor="middle"
     fontSize={68}
     fontWeight={800}
     fill={p.coralColor}
     style={{
      translate: '0px 219.4px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >{titleBottom}</Interactive.Text>
   </g>
   {/* Shared 3600, NOT duplicated: its x, baseline and font change continuously. */}
   <g opacity={1-outExplanation}><Matched3600 x={numberX+p.scene05FlowShiftX} y={numberY+p.scene05FlowShiftY}
      fontSize={numberSize} unitY={unitY+p.scene05FlowShiftY} unitFontSize={unitSize} unitAlpha={unitAlpha}
      inkColor={p.inkColor} coralColor={p.coralColor}/></g>
   {/* Rest of the command appears around the same number only after it moves. */}
   <g opacity={rowAlpha*(1-outExplanation)}>
    <Interactive.Text name="S07 / Command token shutdown editable" x={102} y={841} fontSize={49} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene05ExplainCommandRoot}</Interactive.Text>
    <Interactive.Text name="S07 / Command token slash s editable" x={459} y={841} fontSize={49} fontWeight={800} fill={active==='s'?p.coralColor:p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>/s</Interactive.Text>
    <Interactive.Text name="S07 / Command token slash t editable" x={606} y={841} fontSize={49} fontWeight={800} fill={active==='t'?p.coralColor:p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>/t</Interactive.Text>
   </g>
   {/* slash-s is visually copied down, then the meaning is typed. */}
   <g opacity={sAlpha*(1-outExplanation)}>
    <Interactive.Text name="S07 / Slash S copy motion" x={lerp(459,332,sMove)} y={lerp(841,1110,sMove)} fontSize={58} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>/s</Interactive.Text>
    <Interactive.Text name="S07 / Slash S meaning typed" x={lerp(459,390,sMove)} y={1110} fontSize={58} fontWeight={740} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{sTyped}</Interactive.Text>
   </g>
   {/* slash-t gets the exact same copy -> type treatment. */}
   <g opacity={tAlpha*(1-outExplanation)}>
    <Interactive.Text name="S07 / Slash T copy motion" x={lerp(606,366,tMove)} y={lerp(841,1110,tMove)} fontSize={58} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>/t</Interactive.Text>
    <Interactive.Text name="S07 / Slash T meaning typed" x={lerp(606,433,tMove)} y={1110} fontSize={58} fontWeight={740} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{tTyped}</Interactive.Text>
   </g>
   {/* 3600 copy joins into a seconds conversion, while main 3600 stays fixed. */}
   <g opacity={nAlpha*(1-outExplanation)}>
    <Interactive.Text
     name="S07 / 3600 copy down"
     x={lerp(851,208,nMove)}
     y={lerp(841,meaningY,nMove)}
     fontSize={57}
     fontWeight={800}
     fill={p.coralColor}
     style={{
      translate: '-62.4px 0px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >3600</Interactive.Text>
    <Interactive.Text
     name="S07 / Seconds equals one hour typed"
     x={lerp(851,374,nMove)}
     y={meaningY}
     fontSize={49}
     fontWeight={740}
     fill={p.inkColor}
     style={{
      translate: '-62.4px 0px',
      scale: 1,
      rotate: '0deg',
      opacity: 1
     }}
    >{nTyped}</Interactive.Text>
   </g>
   <g opacity={timerAlpha*timerHold}>
    <Interactive.Text name="S07 / Timer continuous into cancellation bridge" x={540} y={timerY} textAnchor="middle" fontSize={timerSize} fontWeight={780} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{timerSeconds}</Interactive.Text>
   </g>
   {/* NEW PREVIEW-ONLY SEPARATOR: one timebase, same timer node as S07. */}
   <g opacity={bridgeHeader}>
    <Interactive.Text name="S08 / Separator / KALAU" x={540} y={424} textAnchor="middle" fontSize={67} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08SeparatorTitleTop}</Interactive.Text>
    <Interactive.Text name="S08 / Separator / NGGAK JADI?" x={540} y={514} textAnchor="middle" fontSize={67} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08SeparatorTitleBottom}</Interactive.Text>
    <Interactive.Text name="S08 / Separator / countdown status" x={540} y={808} textAnchor="middle" fontSize={32} fontWeight={680} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08SeparatorStatus}</Interactive.Text>
   </g>
   <g opacity={bridgeSubtitle}>
    <Interactive.Text name="S08 / Separator / Jadwal bisa dibatalkan" x={540} y={1105} textAnchor="middle" fontSize={42} fontWeight={720} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene08SeparatorMessage}</Interactive.Text>
   </g>
   <g opacity={cancelHeader}>
    <Interactive.Text name="S09 / Cancellation opening / Header" x={540} y={362} textAnchor="middle" fontSize={62} fontWeight={800} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelTitleTop}</Interactive.Text>
    <Interactive.Text name="S09 / Cancellation opening / Header line 2" x={540} y={442} textAnchor="middle" fontSize={62} fontWeight={800} fill={p.coralColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelTitleBottom}</Interactive.Text>
   </g>
   <g opacity={cancelRun} transform={`translate(${p.scene09CancelWindowShiftX} ${p.scene09CancelWindowShiftY+30*(1-cancelRun)})`}>
    <Interactive.G name="S09 / Cancellation / Windows Run card preview" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <rect x={207} y={845} width={670} height={448} rx={20} fill="#A9B6B5" opacity={p.scene04SoftDepth*.32}/>
     <rect x={200} y={836} width={670} height={448} rx={20} fill="#FFFFFF" stroke="#D5DEDD" strokeWidth={2}/>
     <path d="M220 836H850Q870 836 870 856V904H200V856Q200 836 220 836Z" fill="#F8FAF9"/>
     <rect x={227} y={862} width={25} height={24} rx={4} fill="#2D789F"/>
     <Interactive.Text name="S09 / Window / Run title" x={266} y={884} fontSize={28} fontWeight={750} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelRunTitle}</Interactive.Text>
     <Interactive.Text name="S09 / Window / Close icon" x={834} y={884} fontSize={32} fontWeight={620} fill="#778589" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>×</Interactive.Text>
     <Interactive.Text name="S09 / Window / Instructions line 1" x={275} y={974} fontSize={22} fontWeight={520} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelInstructionLine1}</Interactive.Text>
     <Interactive.Text name="S09 / Window / Instructions line 2" x={275} y={1004} fontSize={22} fontWeight={520} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelInstructionLine2}</Interactive.Text>
     <Interactive.Text name="S09 / Window / Instructions line 3" x={275} y={1034} fontSize={22} fontWeight={520} fill="#354047" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelInstructionLine3}</Interactive.Text>
     <Interactive.Text name="S09 / Window / Open label" x={225} y={1133} fontSize={26} fontWeight={750} fill={p.inkColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelOpenLabel}</Interactive.Text>
     <Interactive.G name="S09 / Window / Open input field" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={317} y={1088} width={520} height={64} rx={7} fill="#FFFFFF" stroke="#A4B7BF" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S09 / Cancellation / typed shutdown slash a" x={336} y={1130} fontSize={29} fontWeight={610} fontFamily="Consolas, DejaVu Sans Mono, monospace" fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{cancelTyped}</Interactive.Text>
     <Interactive.G name="S09 / Window / OK button surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={486} y={1194} width={108} height={58} rx={7} fill="#FAFCFC" stroke="#C6D4D7" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S09 / Window / OK label" x={540} y={1232} textAnchor="middle" fontSize={26} fontWeight={740} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelOkLabel}</Interactive.Text>
     <Interactive.G name="S09 / Window / Cancel button surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={610} y={1194} width={120} height={58} rx={7} fill="#FAFCFC" stroke="#C6D4D7" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S09 / Window / Cancel label" x={670} y={1232} textAnchor="middle" fontSize={23} fontWeight={640} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelCancelLabel}</Interactive.Text>
     <Interactive.G name="S09 / Window / Browse button surface" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}><rect x={746} y={1194} width={108} height={58} rx={7} fill="#FAFCFC" stroke="#C6D4D7" strokeWidth={2}/></Interactive.G>
     <Interactive.Text name="S09 / Window / Browse label" x={800} y={1232} textAnchor="middle" fontSize={22} fontWeight={640} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelBrowseLabel}</Interactive.Text>
     <g opacity={step(f,738,746)*(1-step(f,764,775))}>
      <rect x={486} y={1194} width={108} height={58} rx={7} fill="#FBE7E0" stroke={p.coralColor} strokeWidth={2.5}/>
      <Interactive.Text name="S09 / Window / OK pressed label" x={540} y={1232} textAnchor="middle" fontSize={26} fontWeight={740} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelOkLabel}</Interactive.Text>
     </g>
    </Interactive.G>
   </g>
   <g opacity={successAlpha}>
    <Interactive.G name="S09 / Canceled / Check mark" style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
     <circle cx={540} cy={950} r={66} fill="#EFF3F0" stroke="#CADAD2" strokeWidth={3}/>
     <path d="M509 947L529 966L570 926" fill="none" stroke={p.navyColor} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"/>
    </Interactive.G>
    <Interactive.Text name="S09 / Canceled / Status" x={540} y={1086} textAnchor="middle" fontSize={51} fontWeight={800} fill={p.navyColor} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>{p.scene09CancelSuccessText}</Interactive.Text>
   </g>
   {p.showCaptions&&<g transform={`translate(${p.subtitleShiftX} ${p.subtitleShiftY})`}>
    <g opacity={fade(f,59,70,89,99)}>
    </g>
    <g opacity={fade(ef,88,99,187,201)}>
    </g>
    <g opacity={fade(ef,206,220,282,297)}>
    </g>
    <g opacity={fade(ef,307,319,364,379)}>
    </g>
    <g opacity={fade(ef,382,395,442,449)}>
    </g>
    <g opacity={fade(f,475,493,539,554)}>
    </g>
    <g opacity={fade(f,552,565,608,617)}>
    </g>
    <g opacity={fade(f,635,648,759,773)}>
    </g>
    <g opacity={fade(f,773,787,813,824)}>
    </g>
   </g>}
  </svg>
 </AbsoluteFill>;
};
