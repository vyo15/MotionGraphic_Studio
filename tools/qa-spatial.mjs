#!/usr/bin/env node
/** Exhaustive frame check of DECLARED tracks, not DOM geometry. Read-only. */
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {validRect,validPose,validateKeys,sampleKeys,projectRect,contains,overlapArea} from '../templates/production-toolkit/src/animations/camera.mjs';
import {fingerprint,inspectMotionPlan} from './qa-motion-plan.mjs';
import {inspectSpatialTrace} from './qa-spatial-trace.mjs';
export function inspectSpatial(m,n,p,motion=null){
 const errors=[];const issues=new Map();let checked=0;
 const fail=s=>{throw Error(s)};const need=(ok,s)=>{if(!ok)fail(s)};
 try{
  need(p?.schemaVersion===1&&p.narrationHash===fingerprint(n.beats),'Spatial schema/hash mismatch');
  need(Number.isInteger(m.durationInFrames)&&m.durationInFrames>0&&m.durationInFrames<=100000,'Invalid frame count (max 100000)');
  const canvas={x:0,y:0,w:m.width,h:m.height};const safe=p.safeRect;
  need(validRect(canvas)&&validRect(safe)&&contains(canvas,safe),'Invalid safeRect');
  if(m.width===1080&&m.height===1920)need(contains({x:50,y:250,w:980,h:1320},safe),'Safe rect outside portrait safe zone');
  need(Array.isArray(p.worlds)&&Array.isArray(p.tracks)&&p.tracks.length>0&&p.tracks.length<=100,'Invalid tracks/worlds');
  need(Array.isArray(p.allowedOverlaps??[]),'Invalid allowed overlaps');
  const worlds=new Map();for(const w of p.worlds){need(typeof w.id==='string'&&w.id&&!worlds.has(w.id)&&validRect(w.viewport)&&contains(safe,w.viewport),'Invalid world/viewport');validateKeys(w.keys,validPose);worlds.set(w.id,w);}
  const ids=new Set();for(const t of p.tracks){need(typeof t.id==='string'&&t.id&&!ids.has(t.id),'Duplicate/invalid track');ids.add(t.id);need(Number.isInteger(t.start)&&Number.isInteger(t.end)&&t.start>=0&&t.end>t.start&&t.end<=m.durationInFrames,'Invalid track range '+t.id);need(['world','screen'].includes(t.space)&&typeof t.protected==='boolean'&&(t.space==='screen'||worlds.has(t.worldId)),'Invalid track space/protection '+t.id);validateKeys(t.keys,validRect);need(t.keys[0].frame<=t.start&&t.keys.at(-1).frame>=t.end-1,'Track keys must cover active range '+t.id);}
  need(p.tracks.some(t=>t.protected),'At least one protected track required');
  if(motion){
   const mr=inspectMotionPlan(m,n,motion);need(mr.ok,'Motion plan invalid: '+mr.errors.join('; '));
   const close=(a,b,fields)=>fields.every(k=>Math.abs(a[k]-b[k])<=.001);
   for(const [i,b] of motion.beats.entries()){
    const beat=n.beats[i],c=b.camera;
    need(p.tracks.some(t=>t.protected&&t.start<beat.endFrame&&t.end>beat.startFrame),'Missing protected track at beat '+i);
    if(!c)continue;
    const w=worlds.get(c.worldId);need(w&&close(w.viewport,c.viewport,['x','y','w','h']),'World/viewport mismatch beat '+i);
    const sample=f=>sampleKeys(w.keys,f,['cx','cy','zoom']);
    need(w.keys[0].frame<=beat.startFrame&&w.keys.at(-1).frame>=beat.endFrame,'Camera keys must cover beat boundary '+i);
    need(close(sample(beat.startFrame),c.start,['cx','cy','zoom'])&&close(sample(beat.endFrame),c.end,['cx','cy','zoom']),'Camera boundary pose mismatch beat '+i);
    for(const x of c.focusSamples??[])need(close(sample(beat.startFrame+x.offset),x.pose,['cx','cy','zoom']),'Camera focus sample mismatch beat '+i);
   }
  }
  const allowed=new Set();const pair=(a,b)=>JSON.stringify([a,b].sort());for(const a of p.allowedOverlaps??[]){need(ids.has(a.a)&&ids.has(a.b)&&a.a!==a.b&&typeof a.reason==='string'&&a.reason.trim(),'Overlap exception requires known IDs and reason');allowed.add(pair(a.a,a.b));}
  const issue=(key,frame)=>{const r=issues.get(key);if(r){r.last=frame;r.count++;}else issues.set(key,{issue:key,first:frame,last:frame,count:1});};
  need(m.durationInFrames*p.tracks.length*p.tracks.length<=100000000,'Spatial workload too large; split plan');
  for(let f=0;f<m.durationInFrames;f++){
   const visible=[];for(const t of p.tracks){if(f<t.start||f>=t.end)continue;let r=sampleKeys(t.keys,f,['x','y','w','h']);let clip=safe;
    if(t.space==='world'){const w=worlds.get(t.worldId);r=projectRect(r,sampleKeys(w.keys,f,['cx','cy','zoom']),w.viewport);clip=w.viewport;}
    if(t.protected&&!contains(clip,r))issue('CLIP '+t.id,f);
    const left=Math.max(r.x,clip.x),top=Math.max(r.y,clip.y),right=Math.min(r.x+r.w,clip.x+clip.w),bottom=Math.min(r.y+r.h,clip.y+clip.h);
    if(right>left&&bottom>top)visible.push({t,r:{x:left,y:top,w:right-left,h:bottom-top}});
   }
   for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){const a=visible[i],b=visible[j];if((a.t.protected||b.t.protected)&&!allowed.has(pair(a.t.id,b.t.id))&&overlapArea(a.r,b.r)>1)issue('OVERLAP '+pair(a.t.id,b.t.id),f);}
   checked++;
  }
 }catch(e){errors.push(e.message);}
 return {ok:errors.length===0&&issues.size===0,errors,issues:[...issues.values()],checkedFrames:checked,verification:'declared geometry only; DOM/render not verified'};
}
export function validateSpatial(dir,traceFile){try{const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));const m=read('motiongraphic-video.json'),n=read('src/config/narration.json'),p=read('production/spatial-plan.json');const result=inspectSpatial(m,n,p,read('production/motion-plan.json'));if(traceFile&&result.ok){const actual=inspectSpatialTrace(m,n,p,JSON.parse(fs.readFileSync(traceFile,'utf8')));result.trace=actual;result.ok=actual.ok;}return result;}catch(e){return {ok:false,errors:[e.message],issues:[],checkedFrames:0};}}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const [dir,flag,file]=process.argv.slice(2);if(!dir||!(process.argv.length===3||(process.argv.length===5&&flag==='--trace'&&file))){console.error('Pakai: npm run qa:spatial -- <folder-addon> [--trace measured.json]');process.exitCode=2;}else{const r=validateSpatial(dir,file);console.log(JSON.stringify(r,null,2));process.exitCode=r.ok?0:1;}}
