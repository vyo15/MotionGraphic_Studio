import {interpolate} from 'remotion';
export const mix=(a:number,b:number,q:number)=>a+(b-a)*q;
export const ramp=(t:number,a:number,b:number)=>{const q=interpolate(t,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return q*q*(3-2*q);};
export const sample=(keys:readonly (readonly number[])[],t:number)=>{for(let i=1;i<keys.length;i++){const a=keys[i-1],b=keys[i];if(t<=b[0])return a.slice(1).map((v,k)=>mix(v,b[k+1],ramp(t,a[0],b[0])));}return keys[keys.length-1].slice(1);};
