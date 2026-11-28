/** Supplied measured geometry, never a certificate of render provenance or glyph pixels. */
import {validRect,contains,overlapArea} from '../templates/production-toolkit/src/animations/camera.mjs';
import {resolveSpatialProfile} from './spatial-profiles.mjs';
import {overlapAllowed,isVisual,validateLayerContract,requiresText,fading} from './spatial-contract.mjs';
import {fingerprint} from './qa-motion-plan.mjs';
import {rectValid,pointValid,validQuad,analyzeCollisionFrame,analyzeInteractions,intersection} from './spatial-collision.mjs';
import {canonical} from './spatial-evidence.mjs';
import {summarizeIssues} from './spatial-diagnostics.mjs';
const normalizeFamily=s=>s.split(',')[0].trim().replace(/^(['"])(.*)\1$/,'$2').trim().toLowerCase();
const sameRect=(a,b)=>['x','y','w','h'].every(k=>Math.abs(a[k]-b[k])<=.05);
const within=(a,b)=>b.w===0||b.h===0||contains(a,b,-.05);
const union=rs=>{const x=Math.min(...rs.map(r=>r.x)),y=Math.min(...rs.map(r=>r.y));return {x,y,w:Math.max(...rs.map(r=>r.x+r.w))-x,h:Math.max(...rs.map(r=>r.y+r.h))-y};};
export function inspectTraceScope(m,trace,{partial=false}={}){
 const advanced=trace.schemaVersion===3,scope=trace.scope??{start:0,end:m.durationInFrames,compositionId:m.id};
 if(advanced||trace.scope){const segment=m.segments?.find(s=>s.id===scope.compositionId);if(scope.compositionId===m.id||!m.id&&!scope.compositionId){if(scope.start!==0||scope.end!==m.durationInFrames)throw Error('Invalid full composition scope');}else if(!segment||scope.start!==segment.startFrame||scope.end!==segment.startFrame+segment.durationInFrames)throw Error('Invalid segment scope');}
 if(!Number.isInteger(scope.start)||!Number.isInteger(scope.end)||scope.start<0||scope.end>m.durationInFrames||scope.start>=scope.end)throw Error('Invalid scope');
 const actual=trace.frames.map(r=>r.frame);
 if(advanced||trace.requestedFrames!==undefined){const req=trace.requestedFrames;if(!Array.isArray(req)||!req.length||req.some((f,i)=>!Number.isInteger(f)||f<scope.start||f>=scope.end||i>0&&f<=req[i-1]))throw Error('Invalid requested frames');if(req.length!==actual.length||req.some((f,i)=>f!==actual[i]))throw Error('Requested frames differ from captured frames');}
 if(actual.some(f=>f<scope.start||f>=scope.end))throw Error('Frame outside scope');
 if(advanced){if(!trace.scope)throw Error('Capture scope missing');const c=trace.evidence?.context;if(!c||c.compositionId!==scope.compositionId||!['preview','final'].includes(c.mode)||!c.props||typeof c.props!=='object'||Array.isArray(c.props))throw Error('Capture context missing/mismatch');if(!trace.environment||typeof trace.environment.browserUserAgent!=='string'||!trace.environment.browserUserAgent||trace.environment.probeVersion!==3||Object.keys(trace.environment).some(k=>c.environment?.[k]!==trace.environment[k])||Object.keys(c.environment??{}).length!==Object.keys(trace.environment).length)throw Error('Capture environment missing');if(!partial&&!['full','sample'].includes(scope.requestMode))throw Error('Capture request mode missing');if(!partial&&scope.requestMode==='full'&&(actual.length!==scope.end-scope.start||actual.some((f,i)=>f!==scope.start+i)))throw Error('Full request incomplete');}
 return scope;
}
export function inspectSpatialTrace(m,n,plan,trace,{partial=false}={}){
 const errors=[],issues=[];let checkedFrames=0,scope,invalid=false;const need=(ok,msg)=>{if(!ok)throw Error(msg)};
 const advanced=trace?.schemaVersion===3,actual=trace?.schemaVersion>=2;
 try{
  need([1,2,3].includes(trace?.schemaVersion)&&trace.narrationHash===fingerprint(n.beats)&&trace.width===m.width&&trace.height===m.height&&trace.fps===m.fps,'Trace dimensions/FPS/hash mismatch');
  need(typeof trace.source==='string'&&trace.source.trim()&&Array.isArray(trace.frames)&&trace.frames.length>0,'Trace requires source and measured frames');
  scope=inspectTraceScope(m,trace,{partial});validateLayerContract(plan,m.durationInFrames);
  if(plan.intelligenceContract==='visual-intelligence-v1'&&!advanced)throw Error('Enhanced plan requires schemaVersion 3 actual trace');
  const tracks=new Map(plan.tracks.map(t=>[t.id,t])),worlds=new Map(plan.worlds.map(w=>[w.id,w]));
  const profile=resolveSpatialProfile(m),guideEnabled=!actual||trace.evidence?.context?.props?.showSubtitles!==false;
  const preset=trace.evidence?.context?.renderProfile??(trace.evidence?.context?.mode==='final'?'high':'preview');
  const subtitlePolicy=plan.subtitlePolicy?.[preset]??(m.designContract==='compact-balanced-v1'?(guideEnabled?'required':'none'):'optional');
  const canvas={x:0,y:0,w:m.width,h:m.height};const active=(t,f)=>f>=t.start&&f<t.end;let previous=-1;const anchorPositions=new Map();
  for(const row of trace.frames){
   const f=row.frame;need(Number.isInteger(f)&&f>previous&&f>=0&&f<m.durationInFrames&&Array.isArray(row.rects),'Trace frames must be unique, ordered and inside manifest');previous=f;
   const emit=(code,layers=[],details={},severity='error')=>issues.push({frame:f,code,layers,details,severity,issue:code.replaceAll('_',' ')+' '+layers.join(' / ')});
   if(actual)need(row.fontStatus==='loaded'&&row.geometry==='screen-space-aabb','Actual capture font/geometry missing at '+f);
   if(advanced)need((row.isolationIds===undefined||Array.isArray(row.isolationIds)&&row.isolationIds.length===0)&&row.probeVersion===3&&row.browserUserAgent===trace.environment.browserUserAgent&&Array.isArray(row.paintPairs),'Frame probe/environment mismatch '+f);
   const measured=new Map(),visible=[];
   for(const a of row.rects){
    const t=tracks.get(a.id);need(t&&active(t,f)&&!measured.has(a.id),'Unknown, inactive or duplicate measured rect at frame '+f+': '+a.id);
    if(a.state==='hidden'&&actual){if(advanced)need(rectValid(a.rawBounds,true)&&Number.isFinite(a.opacity)&&a.opacity>=0&&a.opacity<=1,'Invalid hidden geometry '+a.id);measured.set(a.id,a);if((t.protected||t.visibility!=='mounted')&&!fading(t,f))emit('HIDDEN',[a.id]);continue;}
    need(validRect(a),'Invalid measured rect '+a.id);
    if(actual){
     need(a.state==='visible'&&validRect(a.rawBounds)&&rectValid(a.visibleBounds,true)&&Number.isFinite(a.opacity)&&a.opacity>0&&a.opacity<=1&&Array.isArray(a.textRects)&&typeof a.clipped==='boolean','Incomplete actual geometry '+a.id);
     need(sameRect(a,a.rawBounds)&&within(a.rawBounds,a.visibleBounds)&&within(canvas,a.visibleBounds),'Inconsistent measured/visible bounds '+a.id);
     need(a.textRects.every(r=>rectValid(r))&&(a.textBounds===null||validRect(a.textBounds)),'Invalid text bounds/rectangles '+a.id);
     if(a.textRects.length)need(a.textBounds&&sameRect(union(a.textRects),a.textBounds),'Text rectangle union mismatch '+a.id);
     if(a.textVisibleBounds!=null)need(a.textBounds&&rectValid(a.textVisibleBounds,true)&&within(a.textBounds,a.textVisibleBounds)&&within(canvas,a.textVisibleBounds),'Invalid visible text bounds '+a.id);
     if(a.hotspot!=null)need(pointValid(a.hotspot),'Invalid cursor hotspot '+a.id);if(advanced&&a.hotspotHits!=null)need(Array.isArray(a.hotspotHits)&&new Set(a.hotspotHits).size===a.hotspotHits.length&&a.hotspotHits.every(id=>tracks.has(id)),'Invalid cursor hit stack '+a.id);
     if(a.quad!=null)need(validQuad(a.quad)&&a.quad.every(p=>contains(a.rawBounds,{...p,w:0,h:0},-.1)),'Invalid measured quad '+a.id);
     if(requiresText(t)&&(!a.textBounds||!a.textRects.length||a.textVisibleBounds==null))emit('TEXT_MEASUREMENT_MISSING',[a.id],{},'incomplete');
     if(t.role==='cursor'&&!pointValid(a.hotspot))emit('HOTSPOT_MISSING',[a.id],{},'incomplete');
     if(advanced&&t.hiddenFrames?.includes(f)&&a.opacity>.05)emit('UNEXPECTED_VISIBLE',[a.id]);
     if(t.protected&&!fading(t,f)&&a.opacity<(t.minOpacity??.05))emit('LOW_VISIBILITY',[a.id],{opacity:a.opacity});
     if(t.protected&&!fading(t,f)&&!validRect(a.visibleBounds))emit('FULLY_CLIPPED',[a.id]);
     if(advanced){need(typeof a.complexPaint==='boolean'&&typeof a.shapeUncertain==='boolean'&&typeof a.opaqueRect==='boolean'&&Array.isArray(a.untrackedOcclusion)&&a.untrackedOcclusion.every(pointValid)&&Number.isInteger(a.lineCount)&&a.lineCount>=0&&Array.isArray(a.textVisibleRects)&&['solid','mixed','transparent','unknown'].includes(a.paintKind)&&Array.isArray(a.fontRuns),'Missing visual intelligence measurements '+a.id);
      need(a.fontRuns.every(r=>typeof r.family==='string'&&typeof r.weight==='string'&&Number.isFinite(r.fontSize)&&r.fontSize>0&&Number.isFinite(r.effectiveFontSize)&&r.effectiveFontSize>0&&typeof r.fontReady==='boolean'&&Number.isFinite(r.lineCount)&&r.lineCount>=1),'Invalid font measurement '+a.id);
      if(requiresText(t)&&!a.fontRuns.length)emit('FONT_MEASUREMENT_MISSING',[a.id],{},'incomplete');
      if(a.textRects.length){need(Array.isArray(a.textVisibleRects)&&a.textVisibleRects.every(r=>rectValid(r)&&within(canvas,r)&&a.textRects.some(raw=>within(raw,r))),'Invalid visible text rectangles '+a.id);if(a.textVisibleRects.length)need(a.textVisibleBounds&&sameRect(union(a.textVisibleRects),a.textVisibleBounds),'Visible text union mismatch '+a.id);if(t.protected&&a.textVisibleRects.reduce((sum,r)=>sum+r.w*r.h,0)<a.textRects.reduce((sum,r)=>sum+r.w*r.h,0)-2)emit('TEXT_LINE_CLIP',[a.id]);}
      if(a.fontRuns.some(r=>!r.fontReady))emit('FONT_NOT_READY',[a.id],{},'incomplete');
      if(t.fontFamily&&a.fontRuns.some(r=>normalizeFamily(r.family)!==normalizeFamily(t.fontFamily)))emit('FONT_FAMILY_MISMATCH',[a.id]);
      if(t.fontWeight!==undefined&&a.fontRuns.some(r=>Number(r.weight==='normal'?400:r.weight==='bold'?700:r.weight)!==t.fontWeight))emit('FONT_WEIGHT_MISMATCH',[a.id]);
      const min=t.minFontSize!==undefined?t.minFontSize*profile.sy:t.role==='vo-guide'&&m.designContract==='compact-balanced-v1'?profile.reference.guideFontMin*profile.sy:0;
      if(min&&a.fontRuns.some(r=>r.effectiveFontSize<min-.5))emit('EFFECTIVE_FONT_TOO_SMALL',[a.id],{minimum:min});
      const maxLines=t.maxLines??(t.role==='vo-guide'?1:t.role==='subtitle'?2:null);
      if(maxLines&&a.lineCount>maxLines)emit('TEXT_LINE_COUNT',[a.id],{actual:a.lineCount,max:maxLines});
      if(requiresText(t)&&(!Number.isInteger(a.lineCount)||a.lineCount<1))emit('LINE_COUNT_UNVERIFIED',[a.id],{},'warning');
      if(a.fontRuns.some(r=>r.lineHeight!==null&&Number.isFinite(r.lineHeight)&&r.lineHeight<r.fontSize*.8))emit('LINE_HEIGHT_REVIEW',[a.id],{},'warning');
      if(a.reflowMeasurement!=null){const r=a.reflowMeasurement;need(r.method==='offscreen-plain-text-normal-wrap'&&[r.width,r.requiredWidth,r.requiredHeight,r.fontSize].every(v=>Number.isFinite(v)&&v>0)&&Number.isInteger(r.lineCount)&&r.lineCount>0,'Invalid measured reflow '+a.id);}
      if(a.pointerNoneCandidates!==undefined)need(Array.isArray(a.pointerNoneCandidates)&&a.pointerNoneCandidates.every(pointValid),'Invalid pointer-none candidates '+a.id);
      if(t.protected&&a.pointerNoneCandidates?.length)emit('POINTER_NONE_OCCLUSION_CANDIDATE',[a.id],{samples:a.pointerNoneCandidates.length},'warning');
      if(t.protected&&a.paintCandidateBudgetExceeded)emit('PAINT_CANDIDATE_BUDGET',[a.id],{},'warning');
      if(a.untrackedOcclusion?.length&&t.protected)emit('UNTRACKED_OCCLUSION_CANDIDATE',[a.id],{samples:a.untrackedOcclusion.length},'warning');
      if(a.fontRuns.some(r=>Number.isFinite(r.contrastEstimate)&&r.contrastEstimate<(r.effectiveFontSize>=36?3:4.5)))emit('TEXT_CONTRAST_REVIEW',[a.id],{},'warning');
      if(a.complexPaint&&t.protected)emit('COMPLEX_PAINT_REVIEW',[a.id],{},'warning');
     }
    }
    if(t.role==='vo-guide'&&!guideEnabled)emit('UNEXPECTED_GUIDE',[a.id]);
    measured.set(a.id,a);const clip=t.space==='world'?worlds.get(t.worldId)?.viewport:t.role==='background'?canvas:plan.safeRect;need(validRect(clip),'Invalid clip region '+a.id);
    if(t.protected&&!contains(clip,a))emit('CLIP',[t.id],{bounds:a.rawBounds??a,region:clip});
    if(actual&&a.textBounds&&validRect(a.textBounds)&&t.protected&&!contains(a,a.textBounds,-1))emit('TEXT_OVERFLOW',[a.id],{textBounds:a.textBounds});
    if(actual&&t.protected&&a.textBounds&&a.textVisibleBounds&&(a.textVisibleBounds.w<a.textBounds.w-1||a.textVisibleBounds.h<a.textBounds.h-1))emit('TEXT_CLIP',[a.id]);
    if(actual&&t.protected&&a.clipped===true)emit('ANCESTOR_CLIP',[a.id]);
    const r=intersection(clip,a.visibleBounds??a);if(r)visible.push({t,r,measured:a});
   }
   for(const t of tracks.values())if(active(t,f)&&(guideEnabled||t.role!=='vo-guide')&&(subtitlePolicy!=='none'||t.role!=='subtitle')&&!measured.has(t.id)&&!t.hiddenFrames?.includes(f))emit('MISSING',[t.id],{},actual?'incomplete':'error');
   if(advanced){const seen=new Set();for(const p of row.paintPairs){const key=JSON.stringify([p.a,p.b].sort());need(p.a!==p.b&&measured.has(p.a)&&measured.has(p.b)&&!seen.has(key)&&[p.aFront,p.bFront,p.unknown,p.total].every(v=>Number.isInteger(v)&&v>=0)&&p.total>0&&p.aFront+p.bFront+p.unknown===p.total,'Invalid paint pair at '+f);seen.add(key);}}
   const spoken=n.beats.some(b=>f>=b.startFrame&&f<b.endFrame&&b.text.trim());
   if(m.designContract==='compact-balanced-v1'){
    const {visual,guide}=profile;const guides=visible.filter(x=>x.t.role==='vo-guide');
    for(const [id,rect] of measured){const t=tracks.get(id);if(rect.state!=='hidden'&&t.protected&&!contains(t.role==='vo-guide'?guide:t.role==='subtitle'?profile.safe:t.role==='background'?canvas:visual,rect))emit('DESIGN_CLIP',[id]);}
    if(guides.length!==(guideEnabled&&spoken?1:0))emit('VO_GUIDE_COUNT');
    for(const g of guides)for(const a of visible.filter(x=>isVisual(x.t)))if(g.r.y-(a.r.y+a.r.h)<profile.guideGap-.001)emit('VO_GUIDE_GAP',[a.t.id,g.t.id],{minimum:profile.guideGap,gap:g.r.y-a.r.y-a.r.h});
   }
   if(advanced){
    if([...tracks.values()].some(t=>active(t,f)&&t.protected&&isVisual(t)&&!fading(t,f))&&!visible.some(v=>v.t.protected&&isVisual(v.t)&&v.measured.opacity>=.05))emit('NO_VISIBLE_PROTECTED_CONTENT');
    const subtitles=visible.filter(x=>['subtitle','vo-guide'].includes(x.t.role));if(subtitles.length>1)emit('DUPLICATE_SUBTITLE',subtitles.map(x=>x.t.id));if(!spoken&&subtitles.length)emit('SILENT_SUBTITLE',subtitles.map(x=>x.t.id));
    // Explicit per-preset policy; compact preview guide count is already mandatory above.
    const policy=subtitlePolicy;
    const finalSubs=subtitles.filter(v=>v.t.role==='subtitle');
    if(spoken&&policy==='required'&&!subtitles.some(v=>v.measured.opacity>=(v.t.minOpacity??.05)&&validRect(v.measured.textVisibleBounds)))emit('SUBTITLE_COVERAGE_MISSING',[],{preset});
    if(policy==='none'&&subtitles.length)emit('SUBTITLE_UNEXPECTED_FOR_PRESET',subtitles.map(v=>v.t.id),{preset});
    if(plan.subtitlePolicy?.[preset]==='required'&&preset!=='preview'&&spoken&&!finalSubs.length)emit('FINAL_SUBTITLE_MISSING');
    const cover=n.beats.find(b=>f>=b.startFrame&&f<b.endFrame&&/cover/i.test(b.scene??''));if(cover){const h=Math.min(m.height,m.width*4/3),crop={x:0,y:(m.height-h)/2,w:m.width,h};for(const [id,a] of measured)if(tracks.get(id).protected&&a.state==='visible'&&!contains(crop,a.rawBounds??a))emit('COVER_CROP',[id]);}
    for(const g of plan.objectAnchors??[]){if(f<g.start||f>=g.end)continue;const a=measured.get(g.anchorId);if(a?.state!=='visible'||!validRect(a.visibleBounds)||a.opacity<.05)continue;if(!a.visualContentBounds&&g.visualBoundsPolicy!=='layer'){emit('OBJECT_ANCHOR_VISUAL_UNVERIFIED',[g.anchorId],{},'incomplete');continue;}const v=a.visualContentBounds??a.visibleBounds;need(validRect(v)&&within(canvas,v),'Invalid visual content bounds '+a.id);const center={x:v.x+v.w/2,y:v.y+v.h/2};const prev=anchorPositions.get(g.id);if(g.motion==='fixed'&&prev&&Math.hypot(center.x-prev.x,center.y-prev.y)>2*Math.max(profile.sx,profile.sy))emit('OBJECT_ANCHOR_DRIFT',[g.anchorId],{reference:prev,actual:center});if(!prev)anchorPositions.set(g.id,center);
     // Multiple headline lines form one group; use the union, not individual baselines.
     const heads=g.headlineIds.map(id=>measured.get(id)).filter(h=>h?.state==='visible'&&h.opacity>=.05&&validRect(h.textVisibleBounds??h.visibleBounds));if(heads.length){const b=union(heads.map(h=>h.textVisibleBounds??h.visibleBounds));const gap=v.y-b.y-b.h;if(gap<g.gap*profile.sy-2)emit('OBJECT_HEADLINE_GAP',[g.anchorId,...heads.map(h=>h.id)],{gap,minimum:g.gap*profile.sy},'warning');if(Math.abs(b.x+b.w/2-center.x)>32*profile.sx)emit('OBJECT_HEADLINE_ALIGNMENT',[g.anchorId,...heads.map(h=>h.id)],{},'warning');}}
    analyzeCollisionFrame(plan,row,visible,emit,{advanced});
   }else for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){const a=visible[i],b=visible[j];if((a.t.protected||b.t.protected)&&!overlapAllowed(plan,a.t,b.t,f)&&overlapArea(a.r,b.r)>1)emit('OVERLAP',[a.t.id,b.t.id]);}
   analyzeInteractions(plan,row,measured,emit);checkedFrames++;
  }
  if(advanced&&!partial){const frames=new Set(trace.frames.map(r=>r.frame));for(const e of plan.interactions??[])for(const f of [e.frame,e.endFrame,e.response?.startFrame,e.response?e.response.endFrame-1:undefined])if(Number.isInteger(f)&&f>=scope.start&&f<scope.end&&!frames.has(f))issues.push({frame:f,code:'INTERACTION_FRAME_MISSING',issue:'INTERACTION FRAME MISSING '+e.id,layers:[e.cursorId,e.targetId],details:{eventId:e.id},severity:'incomplete'});}
 }catch(e){errors.push(e.message);invalid=true;}
 const coverage=invalid?'incomplete':checkedFrames===m.durationInFrames?'all-frames':scope&&checkedFrames===scope.end-scope.start?'all-segment-frames':'sampled-only';
 const status=invalid?(advanced?'INCOMPLETE':'FAIL'):issues.some(i=>i.severity==='error')?'FAIL':issues.some(i=>i.severity==='incomplete')?'INCOMPLETE':issues.length?'WARNING':coverage==='all-frames'?'PASS':coverage==='all-segment-frames'?'PASS_SEGMENT':'PASS_SAMPLED';
 const findings=summarizeIssues(issues,m,n,plan,scope);
 return {ok:['PASS','PASS_SEGMENT','PASS_SAMPLED'].includes(status),errors,issues,findings,checkedFrames,coverage,status,verification:'Supplied screen-space measurements only. Hit-test candidates, not glyph pixels or proof of capture provenance, actual font selection, audio or native GUI.'};
}

/** Compare global frames between two supplied traces; no claim of pixel equivalence. */
export function compareSpatialTraces(m,full,segment,{tolerance=.25}={}){
 const issues=[];let checkedFrames=0;
 try{
  if(!Number.isFinite(tolerance)||tolerance<0||tolerance>2)throw Error('Invalid comparison tolerance');
  const a=inspectTraceScope(m,full),b=inspectTraceScope(m,segment);
  if(a.compositionId!==m.id||b.compositionId===m.id)throw Error('Expected full composition and segment trace');
  const ac=full.evidence?.context,bc=segment.evidence?.context;
  if(!ac||!bc||ac.mode!==bc.mode||ac.renderProfile!==bc.renderProfile||canonical(ac.props)!==canonical(bc.props)||full.environment?.browserUserAgent!==segment.environment?.browserUserAgent||canonical(full.evidence.groups)!==canonical(segment.evidence.groups))throw Error('Trace inputs or runtime context differ');
  const by=new Map(full.frames.map(r=>[r.frame,r]));
  for(const r of segment.frames){const x=by.get(r.frame);if(!x){issues.push({frame:r.frame,issue:'Full trace missing matching global frame'});continue;}checkedFrames++;
   const xa=new Map(x.rects.map(t=>[t.id,t])),ya=new Map(r.rects.map(t=>[t.id,t]));
   const equalRect=(l,k)=>l==null&&k==null||l!=null&&k!=null&&['x','y','w','h'].every(f=>Math.abs(l[f]-k[f])<=tolerance);
   const equalRects=(a=[],b=[])=>a.length===b.length&&a.every((r,i)=>equalRect(r,b[i]));
   const equalRuns=(a=[],b=[])=>a.length===b.length&&a.every((r,i)=>{const s=b[i];return new Set([...Object.keys(r),...Object.keys(s)]).size===Object.keys(r).length&&Object.entries(r).every(([k,v])=>typeof v==='number'&&typeof s[k]==='number'&&['fontSize','effectiveFontSize','lineHeight','letterSpacing','contrastEstimate'].includes(k)?Math.abs(v-s[k])<=tolerance:v===s[k]);});
   for(const id of new Set([...xa.keys(),...ya.keys()])){const u=xa.get(id),v=ya.get(id);if(!u||!v||u.state!==v.state||!equalRect(u.rawBounds??u,v.rawBounds??v)||!equalRect(u.visibleBounds,v.visibleBounds)||!equalRect(u.textBounds,v.textBounds)||Math.abs((u.opacity??1)-(v.opacity??1))>.001||canonical(u.fontFamilies??[])!==canonical(v.fontFamilies??[])||!equalRuns(u.fontRuns,v.fontRuns)||!equalRects(u.textRects,v.textRects)||!equalRects(u.textVisibleRects,v.textVisibleRects)||u.lineCount!==v.lineCount||u.actionMarker!==v.actionMarker||u.uiState!==v.uiState||canonical(u.hotspotHits??[])!==canonical(v.hotspotHits??[])||((u.hotspot||v.hotspot)&&(!u.hotspot||!v.hotspot||Math.hypot(u.hotspot.x-v.hotspot.x,u.hotspot.y-v.hotspot.y)>tolerance)))issues.push({frame:r.frame,layer:id,issue:'Full / segment geometry mismatch'});}
  }
 }catch(e){return {ok:false,status:'INCOMPLETE',checkedFrames,issues,errors:[e.message],verification:'supplied trace comparison only'};}
 return {ok:checkedFrames>0&&!issues.length,status:issues.length?'FAIL':checkedFrames?'PASS_MATCHED_FRAMES':'INCOMPLETE',checkedFrames,issues,verification:'supplied matched frames only; not proof of native editing or pixel parity'};
}
