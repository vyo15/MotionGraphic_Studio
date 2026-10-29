import {Easing,interpolate} from 'remotion';
export const smooth=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
export const enterExit=(frame:number,start:number,end:number,fade=12)=>smooth(frame,start,start+fade)*(1-smooth(frame,end-fade,end));
export const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
