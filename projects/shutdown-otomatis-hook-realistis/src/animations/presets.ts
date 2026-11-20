import {interpolate} from 'remotion';
/** Smooth timing driven solely by frame. */
export const easedAlpha=(frame:number,from:number,duration:number)=>
 interpolate(frame,[from,from+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const textSlide=(frame:number,from:number)=>
 interpolate(frame,[from,from+12],[18,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
