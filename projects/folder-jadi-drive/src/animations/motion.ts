import {interpolate} from 'remotion';
export const ease=(x:number)=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q)};
export const ramp=(t:number,a:number,b:number)=>ease(interpolate(t,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));
export const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export const pulse=(t:number,a:number)=>Math.max(0,1-Math.abs(t-a)/.22);
export const move=(t:number,points:number[][])=>{for(let i=1;i<points.length;i++){if(t<points[i][0]){const a=points[i-1],b=points[i],p=ramp(t,a[0],b[0]);return [mix(a[1],b[1],p),mix(a[2],b[2],p)];}}return points[points.length-1].slice(1);};
