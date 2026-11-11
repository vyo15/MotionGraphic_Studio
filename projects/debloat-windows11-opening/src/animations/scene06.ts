export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {const t = clamp01(v); return t*t*(3-2*t);};
export const easeOut = (v: number) => {const t = clamp01(v); return 1-(1-t)**3;};
export const reveal = (s: number, start: number, duration: number) => smooth((s-start)/duration);
export const visible = (s: number, from: number, to: number, fade = .3) => reveal(s,from,fade)*(1-reveal(s,to-fade,fade));
export type CursorPoint = {s:number;x:number;y:number};
export const cursorAt = (s:number, points:readonly CursorPoint[]) => {
  if(s<=points[0].s) return {x:points[0].x,y:points[0].y};
  for(let i=1;i<points.length;i++){
    if(s<=points[i].s){const a=points[i-1],b=points[i],t=smooth((s-a.s)/(b.s-a.s));
      return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}
  }
  const last=points[points.length-1];return {x:last.x,y:last.y};
};
