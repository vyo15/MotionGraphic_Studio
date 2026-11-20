import React from 'react';
import {AbsoluteFill,Interactive,useCurrentFrame} from 'remotion';
import {VO_CAPTIONS} from '../../config/voice';
import {mergeDesign,mergeText,clamp} from '../../config/editable';
import type {VideoProps} from '../../config/editable';

/** Subtitle rendered as true editable text, independent of illustrated panels. */
export const SubtitleTrack:React.FC<VideoProps & {absoluteFrame?:number}>=({showSubtitle=true,textOverrides,designOverrides,absoluteFrame})=>{
 const local=useCurrentFrame();const f=absoluteFrame??local;
 const cue=VO_CAPTIONS.find(c=>f>=c.from&&f<c.to);
 if(!showSubtitle||!cue)return null;
 const t=mergeText(textOverrides),d=mergeDesign(designOverrides);
 const fade=Math.min(1,clamp((f-cue.from)/8),clamp((cue.to-f)/8));
 const key=cue.id as keyof typeof t;
 return <AbsoluteFill style={{pointerEvents:'none'}}>
  <Interactive.Div name={`VO · Subtitle · ${cue.id} (ESTIMASI)`} style={{pointerEvents:'auto',position:'absolute',top:d.subtitleY,left:d.subtitleX,width:d.subtitleWidth,translate:'0px 0px',scale:1,rotate:'0deg',opacity:fade,backgroundColor:d.subtitleBackground,borderRadius:24,padding:'22px 27px',color:d.subtitleText,fontFamily:d.fontFamily,fontSize:d.subtitleFontSize,fontWeight:700,textAlign:'center',lineHeight:1.23}}>{String(t[key])}</Interactive.Div>
 </AbsoluteFill>;
};
