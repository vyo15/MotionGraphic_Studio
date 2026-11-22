import {interpolate,Easing} from 'remotion';
/** Deterministic frame interpolation; use no timers/CSS keyframes/DOM mutation. */
export const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export const eased=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
export const fade=(f:number,start:number,end:number)=>interpolate(f,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*clamp(t);
/** The same continuous camera trajectory is used in both independently editable scenes. */
export const stageShift=(f:number,strength:number)=>-94*eased(f,236,258)*strength;
export const headSleep=(f:number)=>eased(f,105,170);
export const yawn=(f:number)=>fade(f,91,104)*(1-fade(f,119,132));
export const awake=(f:number)=>1-eased(f,73,91);
