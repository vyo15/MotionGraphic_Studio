import React from 'react';
import {DEFAULT_ADJUST,LayerControl} from '../config/scene01';

/** Coordinates are split intentionally: basePosition + userTransform (Props) + animationTransform. */
export const MotionLayer:React.FC<{
  basePosition:{x:number;y:number};
  userTransform?:LayerControl;
  animationTransform?:{x?:number;y?:number;scale?:number;rotation?:number;opacity?:number};
  width?:number;height?:number;zIndex?:number;
  children:React.ReactNode;
}>=({basePosition,userTransform=DEFAULT_ADJUST,animationTransform={},width,height,zIndex=1,children})=>{
 const a=animationTransform;
 const x=basePosition.x+userTransform.x+(a.x??0);
 const y=basePosition.y+userTransform.y+(a.y??0);
 const scale=userTransform.scale*(a.scale??1);
 const rotate=userTransform.rotation+(a.rotation??0);
 const opacity=userTransform.opacity*(a.opacity??1);
 return <div style={{position:'absolute',left:x,top:y,width,height,zIndex,opacity,transform:`rotate(${rotate}deg) scale(${scale})`,transformOrigin:'center center'}}>{children}</div>;
};
