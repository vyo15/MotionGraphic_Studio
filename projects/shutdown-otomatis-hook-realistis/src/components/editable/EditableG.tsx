import React from 'react';
import {Interactive,useCurrentFrame} from 'remotion';
import type {LayerTransform} from '../../config/editable';

/** Interactive.G is used by the user's Master 4.0.538. Anim on inner G, user transform outer. */
export const EditableG:React.FC<{name:string;control?:LayerTransform;children:React.ReactNode;cx?:number;cy?:number;visible?:boolean}> = ({name,control={},cx=270,cy=480,children,visible=true})=>{
 const frame=useCurrentFrame();
 const {x=0,y=0,scale=1,rotation=0,opacity=1,startFrame=0,endFrame=1e9,delayFrames=0}=control;
 const shown=visible&&frame>=startFrame+delayFrames&&frame<=endFrame;
 // Scene visuals use 540×960 viewBox, while props use 1080×1920 output pixels.
 const transform=`translate(${x/2} ${y/2}) translate(${cx} ${cy}) rotate(${rotation}) scale(${scale}) translate(${-cx} ${-cy})`;
 return <Interactive.G name={name} style={{translate:'0px 0px',scale:1,rotate:'0deg',opacity:1}}>
  <g transform={transform} opacity={shown?opacity:0}>{children}</g>
 </Interactive.G>;
};
