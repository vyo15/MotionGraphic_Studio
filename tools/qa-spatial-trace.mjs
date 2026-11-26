/** Check actual measured screen-space rectangles exported from a browser or render probe.
 * Capture source is external; trace metadata does not prove provenance or pixels. */
import {validRect,contains,overlapArea} from '../templates/production-toolkit/src/animations/camera.mjs';
import {fingerprint} from './qa-motion-plan.mjs';
export function inspectSpatialTrace(m,n,plan,trace){
 const errors=[],issues=[];let checkedFrames=0;const need=(ok,msg)=>{if(!ok)throw Error(msg)};
 try{
  need(trace?.schemaVersion===1&&trace.narrationHash===fingerprint(n.beats)&&trace.width===m.width&&trace.height===m.height&&trace.fps===m.fps,'Trace dimensions/FPS/hash mismatch');
  need(typeof trace.source==='string'&&trace.source.trim()&&Array.isArray(trace.frames)&&trace.frames.length>0,'Trace requires source and measured frames');
  const tracks=new Map(plan.tracks.map(t=>[t.id,t])),worlds=new Map(plan.worlds.map(w=>[w.id,w]));
  const pair=(a,b)=>JSON.stringify([a,b].sort()),allowed=new Set((plan.allowedOverlaps??[]).map(x=>pair(x.a,x.b)));
  const active=(t,f)=>f>=t.start&&f<t.end;let previous=-1;
  for(const row of trace.frames){
   const f=row.frame;need(Number.isInteger(f)&&f>previous&&f>=0&&f<m.durationInFrames&&Array.isArray(row.rects),'Trace frames must be unique, ordered and inside manifest');previous=f;
   const measured=new Map(),visible=[];
   for(const a of row.rects){
    const t=tracks.get(a.id);need(t&&active(t,f)&&!measured.has(a.id)&&validRect(a),'Unknown, inactive, duplicate or invalid measured rect at frame '+f+': '+a.id);
    measured.set(a.id,a);const clip=t.space==='world'?worlds.get(t.worldId).viewport:plan.safeRect;
    if(t.protected&&!contains(clip,a))issues.push({frame:f,issue:'CLIP '+t.id});
    const x=Math.max(clip.x,a.x),y=Math.max(clip.y,a.y),right=Math.min(clip.x+clip.w,a.x+a.w),bottom=Math.min(clip.y+clip.h,a.y+a.h);
    if(right>x&&bottom>y)visible.push({t,r:{x,y,w:right-x,h:bottom-y}});
   }
   for(const t of tracks.values())if(active(t,f)&&!measured.has(t.id))issues.push({frame:f,issue:'MISSING '+t.id});
   for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){
    const a=visible[i],b=visible[j];if((a.t.protected||b.t.protected)&&!allowed.has(pair(a.t.id,b.t.id))&&overlapArea(a.r,b.r)>1)issues.push({frame:f,issue:'OVERLAP '+pair(a.t.id,b.t.id)});
   }
   checkedFrames++;
  }
 }catch(e){errors.push(e.message);}
 return {ok:errors.length===0&&issues.length===0,errors,issues,checkedFrames,coverage:checkedFrames===m.durationInFrames?'all-frames':'sampled-only',verification:'supplied measured rectangles only; capture provenance, pixels, font, audio and native GUI not certified'};
}
