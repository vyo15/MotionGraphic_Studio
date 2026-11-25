import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {VideoProps,defaults} from '../config/props';
import narration from '../config/narration.json';
import {DraftCaptions} from './DraftCaptions';
import {starts} from '../config/timing';
// Native draft lines were generated from the canonical VO; JSON mode follows later VO edits. No audio alignment yet.
const linesAt=(frame:number):string[]=>{
 const beat=narration.beats.find(b=>frame>=b.startFrame&&frame<b.endFrame);if(!beat)return [];
 if(!beat.text.trim())return [];const words=beat.text.trim().split(/\s+/);const cuts=beat.captionCuts??[];
 if(cuts.reduce((sum,c)=>sum+c.wordCount,0)!==words.length){
  // Safe fallback if VO text is edited before its draft cuts are updated.
  const groups=Array.from({length:Math.ceil(words.length/5)},(_,i)=>words.slice(i*5,i*5+5).join(' '));
  return [groups[Math.min(groups.length-1,Math.floor((frame-beat.startFrame)/(beat.endFrame-beat.startFrame)*groups.length))]];
 }
 let offset=0;for(const c of cuts){const chunk=words.slice(offset,offset+c.wordCount);offset+=c.wordCount;if(frame<c.endFrame){return c.lineBreakAfter?[chunk.slice(0,c.lineBreakAfter).join(' '),chunk.slice(c.lineBreakAfter).join(' ')]:[chunk.join(' ')];}}return [];
};
export const Stage=({children,props,start}:{children:React.ReactNode;props:VideoProps;start:number})=>{
 const f=useCurrentFrame();const p={...defaults,...props};const show=(p.showSubtitles||p.showVoGuide)&&!(start===0&&f>=348)&&start<1704;const useNative=show&&p.showSubtitles&&!p.showVoGuide&&p.captionSource==='native';const lines=show&&!useNative?linesAt(f+start):[];
 const layout=p.mainLayouts?.[starts.findIndex(v=>v===start)]??{x:0,y:0,scale:1};
 return <AbsoluteFill style={{backgroundColor:p.backgroundColor,fontFamily:p.fontFamily}}>
 <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920" fontFamily={p.fontFamily}>
 <g transform={`translate(${layout.x} ${layout.y}) translate(540 960) scale(${layout.scale}) translate(-540 -960)`}>{children}</g>
 {useNative?<g transform={`translate(${p.subtitleX} ${p.subtitleY}) scale(${p.subtitleFontSize/42})`} fill={p.subtitleColor} fontWeight={p.subtitleFontWeight}><DraftCaptions frame={f+start}/></g>:null}
 {lines.length>0?<g id="vo-subtitle-layer" pointerEvents="none">
 {p.showVoGuide?<text x={p.subtitleX} y={p.subtitleY-105} textAnchor="middle" fontSize="23" letterSpacing="2" fill="#888888">VO GUIDE · DRAFT</text>:null}
 {lines.map((line,i)=><text key={i} x={p.subtitleX} y={p.subtitleY+(i-(lines.length-1)/2)*p.subtitleFontSize*1.22} fontSize={p.subtitleFontSize} fontWeight={p.subtitleFontWeight} textAnchor="middle" fill={p.subtitleColor}>{line}</text>)}
 </g>:null}
 </svg></AbsoluteFill>;
};
