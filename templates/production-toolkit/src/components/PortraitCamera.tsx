import React from 'react';
import {useCurrentFrame} from 'remotion';
import {cameraAt,cameraTransform,type Rect,type Pose,type Key} from '../animations/camera.mjs';
/** Source/props editable camera, NOT a native editing guarantee. Keep subtitle outside. */
export const PortraitCamera:React.FC<{viewport:Rect;world:{w:number;h:number};keys:readonly Key<Pose>[];sceneOffset:number;children:React.ReactNode}>=({viewport,world,keys,sceneOffset,children})=>{
 const frame=useCurrentFrame()+sceneOffset;
 const p=cameraTransform(cameraAt(keys,frame),viewport);
 return <div style={{position:'absolute',left:viewport.x,top:viewport.y,width:viewport.w,height:viewport.h,overflow:'hidden'}}>
  <div style={{position:'absolute',left:0,top:0,width:world.w,height:world.h,transformOrigin:'0 0',transform:`translate(${p.x}px, ${p.y}px) scale(${p.scale})`}}>{children}</div>
 </div>;
};
