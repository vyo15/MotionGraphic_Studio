import {interpolate, Easing} from 'remotion';
export const lerp=(f:number,a:number,b:number,from=0,to=1)=>interpolate(f,[a,b],[from,to],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
export const inOut=(f:number,a:number,b:number,c:number,d:number)=>Math.min(lerp(f,a,b),1-lerp(f,c,d));
export const point=(f:number,steps:Array<[number,number,number]>):[number,number]=>{
 if(f<=steps[0][0])return [steps[0][1],steps[0][2]];
 for(let i=1;i<steps.length;i++)if(f<steps[i][0]){
 const [prev,x,y]=steps[i-1], [end,nx,ny]=steps[i],t=lerp(f,prev,end);return [x+(nx-x)*t,y+(ny-y)*t];
 }
 const last=steps[steps.length-1];return [last[1],last[2]];
};
