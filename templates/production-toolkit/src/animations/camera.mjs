/** Deterministic portrait camera geometry. World coordinates, output pixel viewport. */
const finite = Number.isFinite;
export const validRect = r => !!r && [r.x,r.y,r.w,r.h].every(finite) && r.w>0 && r.h>0;
export const validPose = p => !!p && [p.cx,p.cy,p.zoom].every(finite) && p.zoom>0;
const requireRect=r=>{if(!validRect(r))throw Error('Invalid rect');};
const requirePose=p=>{if(!validPose(p))throw Error('Invalid camera pose');};
export function fitCamera(target,viewport,padding=0,maxZoom=Infinity){
 requireRect(target);requireRect(viewport);
 if(!finite(padding)||padding<0||padding*2>=Math.min(viewport.w,viewport.h)||!(maxZoom>0))throw Error('Invalid camera padding/zoom');
 return {cx:target.x+target.w/2,cy:target.y+target.h/2,zoom:Math.min(maxZoom,(viewport.w-2*padding)/target.w,(viewport.h-2*padding)/target.h)};
}
export const clamp01=t=>Math.min(1,Math.max(0,t));
export function ease(t,kind='smooth'){
 t=clamp01(t);switch(kind){case 'linear':return t;case 'smooth':return t*t*(3-2*t);case 'out':return 1-(1-t)**3;case 'hold':return t===1?1:0;default:throw Error('Unknown easing '+kind);}
}
export function validateKeys(keys,valid){
 if(!Array.isArray(keys)||!keys.length)throw Error('Keyframes required');
 let last=-1;for(const k of keys){if(!Number.isInteger(k.frame)||k.frame<=last||!valid(k.value))throw Error('Invalid/non-increasing keyframe');ease(0,k.ease);last=k.frame;}
}
export function sampleKeys(keys,frame,fields){
 if(!finite(frame))throw Error('Invalid frame');
 if(frame<=keys[0].frame)return {...keys[0].value};
 for(let i=1;i<keys.length;i++){const a=keys[i-1],b=keys[i];if(frame<=b.frame){const t=ease((frame-a.frame)/(b.frame-a.frame),b.ease);return Object.fromEntries(fields.map(k=>[k,a.value[k]+(b.value[k]-a.value[k])*t]));}}
 return {...keys.at(-1).value};
}
export function cameraAt(keys,frame){validateKeys(keys,validPose);return sampleKeys(keys,frame,['cx','cy','zoom']);}
export function projectRect(rect,pose,viewport){requireRect(rect);requirePose(pose);requireRect(viewport);return {x:viewport.x+viewport.w/2+(rect.x-pose.cx)*pose.zoom,y:viewport.y+viewport.h/2+(rect.y-pose.cy)*pose.zoom,w:rect.w*pose.zoom,h:rect.h*pose.zoom};}
export function cameraTransform(pose,viewport){requirePose(pose);requireRect(viewport);return {x:viewport.w/2-pose.cx*pose.zoom,y:viewport.h/2-pose.cy*pose.zoom,scale:pose.zoom};}
export const contains=(outer,inner,pad=0)=>inner.x>=outer.x+pad-1e-6&&inner.y>=outer.y+pad-1e-6&&inner.x+inner.w<=outer.x+outer.w-pad+1e-6&&inner.y+inner.h<=outer.y+outer.h-pad+1e-6;
export const overlapArea=(a,b)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));
