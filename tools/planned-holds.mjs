import {inspectMotionPlan} from './qa-motion-plan.mjs';
/** Approved-looking metadata is not visual QA: return only declared, verified structure. */
export function plannedHolds(m,n,p){
 const result=inspectMotionPlan(m,n,p);if(!result.ok)return {ranges:[],warnings:result.errors};
 const ranges=p.beats.flatMap((b,i)=>{const beat=n.beats[i],start=beat.startFrame+b.phases.holdStart;return start<beat.endFrame?[{start,end:beat.endFrame}]:[];});
 return {ranges,warnings:[]};
}
export function classifyStaticRuns(diff,threshold,ranges){
 const isHold=f=>ranges.some(r=>f-1>=r.start&&f<r.end);const runs=[];let planned=0,unplanned=0,start=null;
 for(let i=1;i<diff.length;i++){
  if(diff[i]<threshold&&isHold(i)){planned++;if(start!==null){runs.push({from:start,len:i-start});start=null;}}
  else if(diff[i]<threshold){unplanned++;if(start===null)start=i;}
  else if(start!==null){runs.push({from:start,len:i-start});start=null;}
 }
 if(start!==null)runs.push({from:start,len:diff.length-start});
 return {planned,unplanned,runs};
}
