/** Deterministic frame presets. For native Studio keyframe editing, prefer inline
 * interpolate() on each Interactive element's style in the scene source. */
import {interpolate,spring, type SpringConfig} from 'remotion';
export const fade=(frame:number,start:number,duration:number)=>interpolate(frame,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const slideY=(frame:number,start:number,duration:number,offset=40)=>interpolate(frame,[start,start+duration],[offset,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const pop=(frame:number,fps:number,start:number,config?:Partial<SpringConfig>)=>spring({frame:Math.max(0,frame-start),fps,config:{damping:18,stiffness:150,...config}});
