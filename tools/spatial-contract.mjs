export const visualRoles=new Set(['visual','background','container','headline','text','primary-object','secondary-object','ui-control','dialog','cursor','connector','subtitle','transition']);
export const isVisual=t=>visualRoles.has(t.role)&&t.role!=='background'&&t.role!=='subtitle';
export const active=(t,f)=>f>=t.start&&f<t.end;
export function validateLayerContract(plan,duration){
 if(!Array.isArray(plan.tracks)||!plan.tracks.length||!Array.isArray(plan.allowedOverlaps??[]))throw Error('Invalid layer contract');
 const ids=new Map(plan.tracks.map(t=>[t.id,t]));
 if(ids.size!==plan.tracks.length)throw Error('Duplicate track ID');
 const advanced=plan.intelligenceContract==='visual-intelligence-v1';
 if(plan.intelligenceContract!==undefined&&(!advanced||plan.geometryContract!=='screen-space-v1'))throw Error('Invalid intelligence contract');
 if(plan.geometryContract!==undefined&&plan.geometryContract!=='screen-space-v1')throw Error('Unknown geometryContract');
 const strict=plan.geometryContract==='screen-space-v1',native=new Set();
 for(const t of plan.tracks){
  if(typeof t.id!=='string'||!t.id.trim()||!Number.isInteger(t.start)||!Number.isInteger(t.end)||t.start<0||t.end<=t.start||t.end>duration)throw Error('Invalid track range '+t.id);
  if(t.source!==undefined&&(typeof t.source!=='string'||!/^src\/[A-Za-z0-9_.\/-]+\.(tsx|jsx)$/.test(t.source)||t.source.split('/').includes('..')))throw Error('Invalid track source '+t.id);
  if(t.textRequired!==undefined&&typeof t.textRequired!=='boolean')throw Error('Invalid textRequired '+t.id);
  if(t.role!==undefined&&!visualRoles.has(t.role)&&t.role!=='vo-guide')throw Error('Unknown track role '+t.id);
  if(t.nativeName!==undefined||strict&&t.native!==false){if(typeof t.nativeName!=='string'||!t.nativeName.trim()||native.has(t.nativeName))throw Error('Missing/duplicate nativeName '+t.id);native.add(t.nativeName);}
  if(advanced&&(!t.role||t.role==='visual'||!['visible','mounted'].includes(t.visibility)||typeof t.native!=='boolean'))throw Error('Specific role/native/visibility required '+t.id);
  if(t.minOpacity!==undefined&&(!Number.isFinite(t.minOpacity)||t.minOpacity<=0||t.minOpacity>1))throw Error('Invalid minOpacity '+t.id);
  if(t.minFontSize!==undefined&&(!Number.isFinite(t.minFontSize)||t.minFontSize<=0))throw Error('Invalid minFontSize '+t.id);
  if(t.maxLines!==undefined&&(!Number.isInteger(t.maxLines)||t.maxLines<1))throw Error('Invalid maxLines '+t.id);
  if(t.minGap!==undefined&&(!Number.isFinite(t.minGap)||t.minGap<0))throw Error('Invalid minGap '+t.id);
  if(t.fadeRanges!==undefined&&(!Array.isArray(t.fadeRanges)||t.fadeRanges.some(r=>!Number.isInteger(r.start)||!Number.isInteger(r.end)||r.start<t.start||r.end>t.end||r.start>=r.end)))throw Error('Invalid fadeRanges '+t.id);
  if(strict&&!t.role)throw Error('Missing role '+t.id);
  if(t.hiddenFrames!==undefined&&(!Array.isArray(t.hiddenFrames)||new Set(t.hiddenFrames).size!==t.hiddenFrames.length||t.hiddenFrames.some(f=>!Number.isInteger(f)||!active(t,f))))throw Error('Invalid hiddenFrames '+t.id);
  if(t.visibility!==undefined&&!['visible','mounted'].includes(t.visibility))throw Error('Invalid visibility policy '+t.id);
  if(t.parentId!==undefined){const p=ids.get(t.parentId);if(!p||p===t||p.start>t.start||p.end<t.end)throw Error('Invalid parent '+t.id);let a=p,seen=new Set([t.id]);while(a){if(seen.has(a.id))throw Error('Parent cycle '+t.id);seen.add(a.id);a=ids.get(a.parentId);}}
 }
 for(const e of plan.allowedOverlaps??[]){if(!ids.has(e.a)||!ids.has(e.b)||e.a===e.b||typeof e.reason!=='string'||!e.reason.trim())throw Error('Overlap exception requires known IDs and reason');
  if(advanced&&(!e.type||e.startFrame===undefined||e.endFrame===undefined))throw Error('Bounded typed overlap required');
  if(e.startFrame!==undefined||e.endFrame!==undefined){if(!Number.isInteger(e.startFrame)||!Number.isInteger(e.endFrame)||e.startFrame<Math.max(ids.get(e.a).start,ids.get(e.b).start)||e.endFrame>Math.min(ids.get(e.a).end,ids.get(e.b).end,duration)||e.startFrame>=e.endFrame)throw Error('Invalid overlap interval '+e.a+' / '+e.b);}
  if(advanced&&e.type==='containment'&&![ids.get(e.a).role,ids.get(e.b).role].some(r=>['container','dialog'].includes(r)))throw Error('Containment must involve a container/dialog');
  if(advanced&&e.type==='interaction'&&![ids.get(e.a).role,ids.get(e.b).role].includes('cursor'))throw Error('Interaction overlap must involve cursor');
  if(e.type!==undefined&&!['interaction','transition','containment','connector','dialog','other'].includes(e.type))throw Error('Invalid overlap type');
 }
 if(plan.riskWindows!==undefined&&(!Array.isArray(plan.riskWindows)||plan.riskWindows.some(r=>!Number.isInteger(r.start)||!Number.isInteger(r.end)||r.start<0||r.end>duration||r.start>=r.end||r.step!==undefined&&(!Number.isInteger(r.step)||r.step<1||r.step>5)||typeof r.reason!=='string'||!r.reason.trim())))throw Error('Invalid sampling risk windows');
 if(plan.layoutGroups!==undefined){if(!Array.isArray(plan.layoutGroups))throw Error('Invalid layoutGroups');const groups=new Set();for(const g of plan.layoutGroups){if(typeof g.id!=='string'||!g.id.trim()||groups.has(g.id)||!Array.isArray(g.layers)||g.layers.length<2||new Set(g.layers).size!==g.layers.length||!['horizontal','vertical'].includes(g.axis)||!['start','center','end'].includes(g.align)||!Number.isInteger(g.frame)||g.frame<0||g.frame>=duration||!Number.isFinite(g.gap)||g.gap<0||g.layers.some(id=>!ids.has(id)||!active(ids.get(id),g.frame)))throw Error('Invalid layout group '+g.id);groups.add(g.id);}}
 validateInteractions(plan,duration,ids,advanced);
}
export function overlapAllowed(plan,a,b,f){return a.role==='background'||b.role==='background'||(plan.allowedOverlaps??[]).some(e=>((e.a===a.id&&e.b===b.id)||(e.a===b.id&&e.b===a.id))&&(e.startFrame===undefined||(f>=e.startFrame&&f<e.endFrame)));}

export const fading=(t,f)=>t.hiddenFrames?.includes(f)||t.fadeRanges?.some(r=>f>=r.start&&f<r.end);
export const textRoles=new Set(['headline','text','vo-guide','subtitle']);
export const requiresText=t=>t.textRequired===true||textRoles.has(t.role);
export function validateInteractions(plan,duration,ids=new Map(plan.tracks.map(t=>[t.id,t])),advanced=false){
 const events=plan.interactions??[];if(!Array.isArray(events))throw Error('Invalid interactions');const seen=new Set();
 for(const e of events){const c=ids.get(e.cursorId),t=ids.get(e.targetId);
  if(typeof e.id!=='string'||!e.id||seen.has(e.id)||!['click','double-click','drag','selection'].includes(e.type)||!c||c.role!=='cursor'||!t||t.id===c.id||!Number.isInteger(e.frame)||!active(c,e.frame)||!active(t,e.frame))throw Error('Invalid interaction '+e.id);seen.add(e.id);
  if(e.type!=='click'&&(!Number.isInteger(e.endFrame)||e.endFrame<=e.frame||e.endFrame>=duration||!active(c,e.endFrame)))throw Error('Invalid interaction end '+e.id);
  const end=e.endFrame??e.frame;if(!active(ids.get(e.endTargetId??e.targetId)??{start:Infinity,end:-Infinity},end))throw Error('End target inactive '+e.id);
  if(e.requireActionMarker!==undefined&&typeof e.requireActionMarker!=='boolean')throw Error('Invalid action marker policy '+e.id);
  if(e.soundCueId!==undefined&&(typeof e.soundCueId!=='string'||!e.soundCueId.trim()))throw Error('Invalid sound cue ID '+e.id);
  if(e.endTargetId!==undefined&&(!ids.has(e.endTargetId)||!active(ids.get(e.endTargetId),end)))throw Error('Invalid end target '+e.id);
  if(e.response){const r=ids.get(e.response.layerId);if(!r||!Number.isInteger(e.response.startFrame)||!Number.isInteger(e.response.endFrame)||e.response.startFrame<=end||e.response.endFrame>duration||e.response.startFrame>=e.response.endFrame||!['visible','hidden'].includes(e.response.state)||e.response.beforeState!==undefined&&!['visible','hidden'].includes(e.response.beforeState)||e.response.value!==undefined&&typeof e.response.value!=='string')throw Error('Invalid response '+e.id);}
 }
 if(advanced)for(const t of plan.tracks.filter(t=>t.role==='cursor'))if(!events.some(e=>e.cursorId===t.id)&&t.cursorPurpose!=='navigation')throw Error('Cursor lacks interaction contract '+t.id);
}

/** Read-only cue metadata check; no assertion about audible sound. */
export function inspectInteractionSound(plan,sound){const issues=[];for(const e of plan.interactions??[]){if(!e.soundCueId)continue;const c=sound?.cues?.find(c=>c.id===e.soundCueId);if(!c||!['ready','omit'].includes(c.status)||c.status==='ready'&&c.impactFrame!==e.frame)issues.push('Interaction sound cue mismatch '+e.id+' / '+e.soundCueId);}return issues;}
