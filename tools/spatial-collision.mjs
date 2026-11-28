/** Pure screen-space candidate analysis. Paint sampling is not a glyph/pixel mask. */
import {contains} from '../templates/production-toolkit/src/animations/camera.mjs';
import {overlapAllowed,requiresText} from './spatial-contract.mjs';
export const rectValid=(r,empty=false)=>!!r&&[r.x,r.y,r.w,r.h].every(Number.isFinite)&&(empty?r.w>=0&&r.h>=0:r.w>0&&r.h>0);
export const pointValid=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y);
export const pointIn=(p,r)=>pointValid(p)&&rectValid(r)&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
export const intersection=(a,b)=>{const x=Math.max(a.x,b.x),y=Math.max(a.y,b.y),w=Math.min(a.x+a.w,b.x+b.w)-x,h=Math.min(a.y+a.h,b.y+b.h)-y;return w>0&&h>0?{x,y,w,h}:null;};
export const gap=(a,b)=>Math.hypot(Math.max(0,a.x-b.x-b.w,b.x-a.x-a.w),Math.max(0,a.y-b.y-b.h,b.y-a.y-a.h));
const area=r=>r.w*r.h;
// Union of screen-aligned candidate regions; not a measurement of covered glyph pixels.
export function rectangleUnionArea(rects){
 const rs=rects.filter(r=>rectValid(r)),xs=[...new Set(rs.flatMap(r=>[r.x,r.x+r.w]))].sort((a,b)=>a-b);let sum=0;
 for(let i=1;i<xs.length;i++){const l=xs[i-1],r=xs[i];const ys=rs.filter(q=>q.x<r&&q.x+q.w>l).map(q=>[q.y,q.y+q.h]).sort((a,b)=>a[0]-b[0]);let end=-Infinity,height=0;for(const [lo,hi] of ys){height+=Math.max(0,hi-Math.max(end,lo));end=Math.max(end,hi);}sum+=(r-l)*height;}return sum;
}
const bounds=a=>a.textVisibleBounds&&rectValid(a.textVisibleBounds)?a.textVisibleBounds:a.visibleBounds??a;
// Separating axis theorem for convex polygons. Use only genuine measured convex quads.
export function polygonsIntersect(a,b){
 for(const p of [a,b])for(let i=0;i<p.length;i++){const j=(i+1)%p.length,dx=p[j].x-p[i].x,dy=p[j].y-p[i].y;const axis=q=>q.x*(-dy)+q.y*dx;const x=a.map(axis),y=b.map(axis);if(Math.max(...x)<=Math.min(...y)+1e-6||Math.max(...y)<=Math.min(...x)+1e-6)return false;}return true;
}
export function validQuad(q){if(!Array.isArray(q)||q.length!==4||!q.every(pointValid))return false;const cross=q.map((p,i)=>{const b=q[(i+1)%4],c=q[(i+2)%4];return (b.x-p.x)*(c.y-b.y)-(b.y-p.y)*(c.x-b.x);});return cross.every(v=>v>1e-6)||cross.every(v=>v< -1e-6);}
function parentOf(plan,a,b){let id=b.parentId;while(id){if(id===a.id)return true;id=plan.tracks.find(t=>t.id===id)?.parentId;}return false;}
const pairKey=(a,b)=>JSON.stringify([a,b].sort());
export function analyzeCollisionFrame(plan,row,visible,emit,{advanced=false}={}){
 // Explicit parent policies are checked even when boxes do not intersect or neither is protected.
 const byId=new Map(visible.map(v=>[v.t.id,v]));
 if(advanced)for(const child of visible){const parent=byId.get(child.t.parentId);if(!child.t.parentId||child.t.containment==='overflow-allowed')continue;if(!parent){emit('PARENT_VISIBILITY_UNVERIFIED',[child.t.id,child.t.parentId],{},'incomplete');continue;}if(!contains(parent.r,child.measured.rawBounds??child.r,-1))emit('CONTAINMENT_ESCAPE',[parent.t.id,child.t.id],{parent:parent.r,child:child.measured.rawBounds??child.r});}
 const samples=new Map((row.paintPairs??[]).map(p=>[pairKey(p.a,p.b),p]));
 const combined=new Map();
 const emitPair=(code,a,b,details,severity='error')=>emit(code,[a.t.id,b.t.id],details,severity);
 for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){
  const a=visible[i],b=visible[j];if(!a.t.protected&&!b.t.protected)continue;
  const ar=bounds(a.measured),br=bounds(b.measured),inter=intersection(ar,br),objectInter=intersection(a.r,b.r);const permitted=overlapAllowed(plan,a.t,b.t,row.frame)||parentOf(plan,a.t,b.t)||parentOf(plan,b.t,a.t);
  const containment=(plan.allowedOverlaps??[]).find(e=>e.type==='containment'&&pairKey(e.a,e.b)===pairKey(a.t.id,b.t.id)&&row.frame>=e.startFrame&&row.frame<e.endFrame);
  if(containment){const parent=['container','dialog'].includes(a.t.role)?a:b,child=parent===a?b:a;if(!contains(parent.r,child.r,-1))emitPair('CONTAINMENT_ESCAPE',parent,child,{parent:parent.r,child:child.r});}
  const distance=gap(ar,br),minGap=Math.max(a.t.minGap??0,b.t.minGap??0);
  if(!inter&&minGap>0&&distance<minGap&&!permitted)emitPair('INSUFFICIENT_GAP',a,b,{gap:distance,minimum:minGap},'warning');
  if(!objectInter&&!inter)continue;
  const qa=a.measured.quad,qb=b.measured.quad;
  if(validQuad(qa)&&validQuad(qb)&&!a.measured.clipped&&!b.measured.clipped&&!requiresText(a.t)&&!requiresText(b.t)&&!polygonsIntersect(qa,qb))continue;
  const details=inter?{intersection:inter,overlapPx:area(inter),fractionA:area(inter)/area(ar),fractionB:area(inter)/area(br)}:{};
  if(inter&&area(inter)>1&&!permitted)emitPair('OVERLAP',a,b,details,(a.measured.complexPaint||b.measured.complexPaint||a.measured.shapeUncertain||b.measured.shapeUncertain)&&advanced?'warning':'error');
  if(!advanced)continue;
  const p=samples.get(pairKey(a.t.id,b.t.id));
  for(const [target,occluder] of [[a,b],[b,a]]){
   if(!target.t.protected||target.t.role==='background'||parentOf(plan,target.t,occluder.t))continue;
   if(target.t.role==='container'&&permitted&&(plan.allowedOverlaps??[]).some(e=>e.type==='containment'&&pairKey(e.a,e.b)===pairKey(target.t.id,occluder.t.id)&&row.frame>=e.startFrame&&row.frame<e.endFrame))continue;
   if(parentOf(plan,occluder.t,target.t)&&occluder.t.role==='container')continue;
   // Cursor/connector contacts can be intentional, but cannot waive a protected headline/guide.
   const interaction=(plan.allowedOverlaps??[]).some(e=>e.type==='interaction'&&pairKey(e.a,e.b)===pairKey(target.t.id,occluder.t.id)&&row.frame>=e.startFrame&&row.frame<e.endFrame);
   if(interaction&&target.t.role==='ui-control'&&occluder.t.role==='cursor')continue;
   const region=intersection(bounds(target.measured),occluder.r);if(!region||area(region)<=1)continue;
   const count=p?.[p.a===occluder.t.id?'aFront':'bFront']??0;
   const actualDetails={intersection:region,overlapPx:area(region),fractionTarget:area(region)/area(bounds(target.measured))};
   const solid=occluder.measured.paintKind==='solid'&&occluder.measured.opacity>=.98&&!occluder.measured.complexPaint;
   if(count>0&&solid&&requiresText(target.t)){const entry=combined.get(target.t.id)??{target,regions:[],ids:[]};entry.regions.push(region);entry.ids.push(occluder.t.id);combined.set(target.t.id,entry);}
   if(count>0&&solid&&occluder.measured.opaqueRect===true&&p.unknown===0&&count===p.total&&contains(occluder.r,bounds(target.measured))&&requiresText(target.t))emitPair('TEXT_FULL_COVER_GEOMETRY',target,occluder,{...actualDetails,confidence:'solid rectangle covers measured text bounds; front hit-tests agree'});
   else if(count>0&&solid)emitPair(requiresText(target.t)?'TEXT_OCCLUSION_CANDIDATE':'OBJECT_OCCLUSION_CANDIDATE',target,occluder,{...actualDetails,frontSamples:count,totalSamples:p.total,confidence:'sampled hit-test; not glyph pixels'},'warning');
   else if(occluder.measured.paintKind!=='transparent'&&(!p||p.unknown>0||count>0))emitPair('PAINT_ORDER_UNRESOLVED',target,occluder,{...actualDetails,confidence:'unresolved/transparent/complex paint'},'warning');
  }
 }
 for(const {target,regions,ids} of combined.values())if(ids.length>1){const union=rectangleUnionArea(regions),fraction=union/area(bounds(target.measured));emit('COMBINED_TEXT_OCCLUSION_CANDIDATE',[target.t.id,...ids],{candidateUnionPx:union,fractionTarget:Math.min(1,fraction),confidence:'union of rectangular candidate regions; sampled paint order, not glyph coverage'},'warning');}
}
export function analyzeInteractions(plan,row,measured,emit){
 const visible=a=>a?.state==='visible'&&a.opacity>0&&rectValid(a.visibleBounds??a);
 for(const e of plan.interactions??[]){
  const end=e.endFrame??e.frame;
  const isClick=row.frame===e.frame||row.frame===end;
  if(isClick){const targetId=row.frame===end?(e.endTargetId??e.targetId):e.targetId,c=measured.get(e.cursorId),t=measured.get(targetId);
   if(!visible(c)||!visible(t)){emit('CLICK_TARGET_HIDDEN',[e.cursorId,targetId],{eventId:e.id});continue;}
   if(!pointValid(c.hotspot)){emit('HOTSPOT_MISSING',[e.cursorId,targetId],{eventId:e.id},'incomplete');continue;}
   if(!pointIn(c.hotspot,t.visibleBounds??t)){emit('CURSOR_TARGET_MISS',[e.cursorId,targetId],{eventId:e.id,hotspot:c.hotspot,target:t.visibleBounds??t});continue;}
   if(e.requireActionMarker&&c.actionMarker!==e.id)emit('CLICK_ACTION_MARKER_MISMATCH',[e.cursorId,targetId],{eventId:e.id,actual:c.actionMarker??null});
   if(c.hotspotUntracked)emit('TARGET_UNTRACKED_OCCLUSION_CANDIDATE',[e.cursorId,targetId],{eventId:e.id},'warning');
   const stack=c.hotspotHits;if(!Array.isArray(stack)||!stack.includes(targetId)){emit('TARGET_HIT_UNVERIFIED',[e.cursorId,targetId],{eventId:e.id,hotspot:c.hotspot},'warning');continue;}
   const top=stack.find(id=>id!==e.cursorId);if(top!==targetId&&!parentOf(plan,plan.tracks.find(t=>t.id===targetId),plan.tracks.find(t=>t.id===top)??{})){const a=measured.get(top);emit('TARGET_OCCLUSION_CANDIDATE',[targetId,top],{eventId:e.id,hotspot:c.hotspot},a?.paintKind==='solid'&&a.opacity>=.98?'error':'warning');}
  }
  if(row.frame>e.frame&&row.frame<end&&['drag','selection'].includes(e.type)&&!visible(measured.get(e.cursorId)))emit('CURSOR_DRAG_HIDDEN',[e.cursorId],{eventId:e.id});
  if(e.response?.beforeState&&row.frame===e.frame){const a=measured.get(e.response.layerId);if(e.response.beforeState==='visible'?!visible(a):visible(a))emit('UI_RESPONSE_PREMATURE',[e.response.layerId],{eventId:e.id});}
  if(e.response&&row.frame>=e.response.startFrame&&row.frame<e.response.endFrame){const a=measured.get(e.response.layerId);if(e.response.state==='visible'?!visible(a):visible(a))emit('UI_RESPONSE_STATE',[e.response.layerId],{eventId:e.id,expected:e.response.state});if(e.response.value!==undefined&&a?.uiState!==e.response.value)emit('UI_RESPONSE_VALUE',[e.response.layerId],{eventId:e.id,expected:e.response.value,actual:a?.uiState??null});}
 }
}
