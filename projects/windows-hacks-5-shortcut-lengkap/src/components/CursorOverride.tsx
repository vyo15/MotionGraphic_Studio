import React from 'react';
import {Easing, interpolate} from 'remotion';

/**
 * A real, frame-deterministic cursor and click effect in 1080 × 1920 scene coordinates.
 * This is edited by the project-local visual cursor editor and is used unchanged by
 * both Studio preview and MP4 rendering. Does not alter Master Studio files.
 */
export type CursorTrack = {
  enabled:boolean;
  fromFrame:number;
  toFrame:number;
  clickFrame:number;
  startX:number;
  startY:number;
  endX:number;
  endY:number;
  size:number;
  ringColor:string;
};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const fade=(n:number)=>clamp(n);
export const CursorOverride:React.FC<{track:CursorTrack;frame:number}>=({track,frame})=>{
  if(!track.enabled||frame<track.fromFrame||frame>track.toFrame)return null;
  const from=track.fromFrame,to=Math.max(from+1,track.toFrame);
  // Target the click coordinate at clickFrame, then HOLD until toFrame.
  // This binds the click ring and cursor tip to exactly the same position.
  const arrival=Math.max(from+1,Math.min(to,track.clickFrame));
  const x=interpolate(frame,[from,arrival],[track.startX,track.endX],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,1,.36,1)});
  const y=interpolate(frame,[from,arrival],[track.startY,track.endY],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,1,.36,1)});
  const clickDistance=Math.abs(frame-track.clickFrame);
  const click=clickDistance<=7?1-clickDistance/8:0;
  const opacity=fade((frame-from)/4)*fade((to-frame)/4);
  return <div data-cursor-override="true" style={{position:'absolute',left:x,top:y,zIndex:999,opacity,pointerEvents:'none',transformOrigin:'2px 2px',transform:`scale(${track.size})`,filter:'drop-shadow(2px 3px 3px #0009)'}}>
    {click>0&&<div style={{position:'absolute',left:-38,top:-38,width:86,height:86,border:`5px solid ${track.ringColor}`,borderRadius:'50%',opacity:click,transform:`scale(${1.6-click*.7})`,boxShadow:`0 0 22px ${track.ringColor}`,pointerEvents:'none'}}/>}
    <svg width="35" height="49" viewBox="0 0 35 49" aria-label="Kursor editable" style={{display:'block'}}><path d="M3 2v37l9-10 8 16 8-4-9-15h13Z" fill="#fff" stroke="#15263a" strokeWidth="2.8" strokeLinejoin="round"/></svg>
  </div>;
};
