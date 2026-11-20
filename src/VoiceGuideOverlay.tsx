import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

/** VO script for recording *after* motion approval, not viewer captions. */
export type VoiceGuideBeat = Readonly<{
  scene: string;
  startFrame: number;
  endFrame: number;
  text: string;
}>;

/** Split verbose script into successive legible cards without truncating words. */
export const splitGuideText = (input: string, limit = 130): string[] => {
  const words=input.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const pages: string[]=[];
  let part='';
  for(const word of words){
    if(part && (part+' '+word).length>limit){pages.push(part);part='';}
    part=part?part+' '+word:word;
  }
  if(part)pages.push(part);
  return pages;
};

export const VoiceGuideOverlay: React.FC<{beats: ReadonlyArray<VoiceGuideBeat>}> = ({beats}) => {
  const frame=useCurrentFrame();
  const {width,height,fps}=useVideoConfig();
  const beat=beats.find((b)=>frame>=b.startFrame&&frame<b.endFrame);
  if(!beat||!beat.text.trim())return null;
  const pages=splitGuideText(beat.text,width>=800?130:90);
  const part=Math.min(pages.length-1,Math.floor(((frame-beat.startFrame)/Math.max(1,beat.endFrame-beat.startFrame))*pages.length));
  const scale=Math.min(width/1080,height/1920);
  const side=Math.max(12,Math.round(width*0.06));
  const cardBottom=Math.max(12,Math.round(height*0.205));
  const bodyFont=Math.max(16,Math.round(38*scale));
  return <AbsoluteFill style={{pointerEvents:'none',zIndex:10000}}>
    <div style={{position:'absolute',left:side,right:side,bottom:cardBottom,
      background:'rgba(27,28,30,0.96)',color:'#fff',borderRadius:Math.round(18*scale),
      border:'1px solid rgba(255,255,255,0.16)',padding:`${Math.round(17*scale)}px ${Math.round(22*scale)}px`,
      boxShadow:'0 10px 30px rgba(0,0,0,0.13)',fontFamily:'Arial,sans-serif'}}>
      <div style={{fontSize:Math.max(12,Math.round(22*scale)),color:'#F1B096',fontWeight:700,marginBottom:Math.round(8*scale)}}>
        PANDUAN REKAM VO · {beat.scene} · {((beat.startFrame)/fps).toFixed(1)}s–{((beat.endFrame)/fps).toFixed(1)}s{pages.length>1?` · ${part+1}/${pages.length}`:''}
      </div>
      <div style={{fontSize:bodyFont,fontWeight:600,lineHeight:1.17,whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>
        {pages[part]}
      </div>
    </div>
  </AbsoluteFill>;
};
