/** Resolve only exact ID or explicit project prefix alias, never ordinal fallback. */
export function resolveSceneId(m,id){
 if(typeof id!=='string'||!id)return null;
 const ids=(m.segments??[]).map(x=>x.id);if(ids.includes(id))return id;
 if(typeof m.id!=='string')return null;
 const short=s=>s.startsWith(m.id+'-')?s.slice(m.id.length+1):s;
 const key=short(id);if(!/^S\d{2}$/i.test(key))return null;
 const matches=ids.filter(s=>short(s)===key);return matches.length===1?matches[0]:null;
}
export function resolveStateRows(m,rows){
 const map=new Map(),warnings=[],ambiguous=new Set();
 if(!Array.isArray(rows))return {map,warnings:['State scenes bukan array']};
 for(const row of rows){const raw=row?.id??row?.sceneId;const id=resolveSceneId(m,raw);if(!id){warnings.push(`Segmen state ${raw} tidak ada di manifest; review rename/timing sebelum revisi.`);continue;}
  if(row.id&&row.sceneId&&resolveSceneId(m,row.sceneId)!==id){warnings.push(`Konflik id/sceneId ${raw}; approval tidak dipetakan.`);map.delete(id);ambiguous.add(id);continue;}
  if(map.has(id)||ambiguous.has(id)){warnings.push(`Duplikat state ${id}; approval tidak dipetakan.`);map.delete(id);ambiguous.add(id);continue;}
  const seg=m.segments.find(s=>s.id===id);if((row.startFrame!==undefined&&row.startFrame!==seg.startFrame)||(row.endFrameExclusive!==undefined&&row.endFrameExclusive!==seg.startFrame+seg.durationInFrames)){warnings.push(`Timing state ${id} berbeda; review sebelum mengandalkan approval.`);}
  map.set(id,row);
 }
 return {map,warnings};
}
