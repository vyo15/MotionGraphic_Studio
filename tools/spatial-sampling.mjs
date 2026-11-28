/** Global frame indices, end-exclusive ranges. Dense event/animated windows remain sampling, not full proof. */
export function selectSpatialFrames(m,n,motion,plan,{full=false,start=0,end=m.durationInFrames,step=m.fps,sound}={}){
 if(![start,end,step].every(Number.isInteger)||start<0||end>m.durationInFrames||end<=start||step<1)throw Error('Invalid capture range');
 if(full)return Array.from({length:end-start},(_,i)=>start+i);
 const f=new Set([start,end-1]);const add=(v,radius=1)=>{if(!Number.isInteger(v))return;for(let x=v-radius;x<=v+radius;x++)if(x>=start&&x<end)f.add(x);};
 const dense=(a,b,spacing=3)=>{if(!Number.isInteger(a)||!Number.isInteger(b)||b<a)return;if(!Number.isInteger(spacing)||spacing<1)throw Error('Invalid risk sampling step');for(let x=Math.max(start,a);x<=Math.min(end-1,b);x+=spacing)f.add(x);add(a);add(b);};
 for(let i=start;i<end;i+=step)f.add(i);
 for(const [i,b] of n.beats.entries()){add(b.startFrame,2);add(b.endFrame,2);const p=motion?.beats?.[i];for(const v of Object.values(p?.phases??{}))if(Number.isInteger(v))add(b.startFrame+v,2);for(const v of p?.camera?.focusSamples??[])add(b.startFrame+v.offset,2);const phase=p?.phases;if(Number.isInteger(phase?.action)&&Number.isInteger(phase?.holdStart))dense(b.startFrame+phase.action,b.startFrame+phase.holdStart);}
 for(const t of [...(plan.tracks??[]),...(plan.worlds??[])]){add(t.start,2);add(t.end,2);for(const f of t.hiddenFrames??[])add(f,2);for(const r of t.fadeRanges??[])dense(r.start,r.end,2);for(const k of t.keys??[])add(k.frame,2);for(let i=1;i<(t.keys??[]).length;i++){const a=t.keys[i-1],b=t.keys[i];add(Math.floor((a.frame+b.frame)/2));if(JSON.stringify(a.value)!==JSON.stringify(b.value))dense(a.frame,b.frame,Math.max(1,Math.floor(m.fps/10)));}}
 for(const s of m.segments??[]){add(s.startFrame,3);add(s.startFrame+s.durationInFrames,3);}
 for(const g of plan.layoutGroups??[])add(g.frame,2);
 for(const g of plan.objectAnchors??[]){add(g.start,2);add(g.end-1,2);add(Math.floor((g.start+g.end-1)/2),2);}
 for(const e of plan.interactions??[]){add(e.frame,3);add(e.endFrame,3);if(e.endFrame!==undefined)dense(e.frame,e.endFrame,2);if(e.response)dense(e.response.startFrame,e.response.endFrame-1,2);}
 for(const e of plan.allowedOverlaps??[])if(e.startFrame!==undefined)dense(e.startFrame,e.endFrame-1,3);
 // Optional declared risk windows for transition, typing, spring or opacity events not represented by linear keys.
 for(const r of plan.riskWindows??[])dense(r.start,r.end-1,r.step??2);
 for(const c of sound?.cues??[])if(c.status!=='omit')add(c.impactFrame,2);
 return [...f].sort((a,b)=>a-b);
}

/** Bounded event contact sheet; report selection separately from measurement coverage. */
export function spatialReviewFrames(m,n,motion,plan,sound,limit=42,{start=0,end=m.durationInFrames}={}){
 if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end>m.durationInFrames||start>=end||!Number.isInteger(limit)||limit<2)throw Error('Invalid review scope');
 const frames=new Set();const add=x=>{if(Number.isInteger(x)&&x>=start&&x<end)frames.add(x);};add(start);add(end-1);
 for(const g of plan?.layoutGroups??[])add(g.frame);
 for(const g of plan?.objectAnchors??[]){add(g.start);add(g.end-1);}
 for(const e of plan?.interactions??[]){add(e.frame);add(e.endFrame);add(e.response?.startFrame);}
 for(const [i,b] of (n?.beats??[]).entries()){const p=motion?.beats?.[i];for(const v of Object.values(p?.phases??{}))if(Number.isInteger(v))add(b.startFrame+v);add(b.startFrame);add(b.endFrame-1);}
 for(const c of sound?.cues??[])if(c.status!=='omit')add(c.impactFrame);
 const important=[...frames];const sampled=selectSpatialFrames(m,n??{beats:[]},motion,plan??{tracks:[],worlds:[]},{sound,start,end});
 for(const f of sampled)if(frames.size<limit)frames.add(f);
 return [...new Set([...important.slice(0,limit),...[...frames].filter(f=>!important.includes(f)).slice(0,Math.max(0,limit-important.length))])].sort((a,b)=>a-b);
}
