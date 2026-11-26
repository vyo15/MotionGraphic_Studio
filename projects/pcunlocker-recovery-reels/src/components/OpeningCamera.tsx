import React from 'react';
import {interpolate,Easing} from 'remotion';
// Approved POV hook and connected pull-back. World units in composition pixels.
const opts={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.42,0,.58,1)} as const;
export const openingZoom=(frame:number)=>interpolate(frame,[0,15,32,48,79,94,117,149],[1,1.72,1.72,1.82,1.82,1.9,2,2],opts);
export const bridgeZoom=(frame:number)=>interpolate(frame,[0,18],[2,1],opts);
export const OpeningCamera:React.FC<React.PropsWithChildren<{zoom:number;shake?:number;opacity?:number}>>=({zoom,shake=0,opacity=1,children})=><div style={{position:'absolute',left:0,top:250,width:1080,height:1100,overflow:'hidden',opacity}}><div style={{position:'absolute',left:shake,top:-250,width:1080,height:1920,transformOrigin:'540px 840px',scale:zoom}}>{children}</div></div>;
