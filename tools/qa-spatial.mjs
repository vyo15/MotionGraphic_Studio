#!/usr/bin/env node
/** Exhaustive frame check of DECLARED tracks, not DOM geometry. Read-only. */
import fs from 'node:fs';import {createRequire} from 'node:module';import path from 'node:path';import {pathToFileURL} from 'node:url';
import {validRect,validPose,validateKeys,sampleKeys,projectRect,contains,overlapArea} from '../templates/production-toolkit/src/animations/camera.mjs';
import {fingerprint,inspectMotionPlan} from './qa-motion-plan.mjs';
import {evidenceStatus} from './spatial-evidence.mjs';
import {resolveSpatialProfile} from './spatial-profiles.mjs';
import {validateLayerContract,overlapAllowed,isVisual,visualRoles,inspectInteractionSound} from './spatial-contract.mjs';
import {inspectSpatialTrace,compareSpatialTraces} from './qa-spatial-trace.mjs';
export function inspectSpatial(m,n,p,motion=null){
 const errors=[];const issues=new Map();let checked=0;
 const fail=s=>{throw Error(s)};const need=(ok,s)=>{if(!ok)fail(s)};
 try{
  need(p?.schemaVersion===1&&p.narrationHash===fingerprint(n.beats),'Spatial schema/hash mismatch');
  need(Number.isInteger(m.durationInFrames)&&m.durationInFrames>0&&m.durationInFrames<=100000,'Invalid frame count (max 100000)');
  const canvas={x:0,y:0,w:m.width,h:m.height};const safe=p.safeRect;
  const profile=resolveSpatialProfile(m),compact=profile.id!=='legacy';
  const {visual:visualZone,guide:guideZone}=profile;
  need(validRect(canvas)&&validRect(safe)&&contains(canvas,safe),'Invalid safeRect');
  if(compact||m.width===1080&&m.height===1920)need(contains(profile.safe,safe),'Safe rect outside portrait safe zone');
  need(Array.isArray(p.worlds)&&Array.isArray(p.tracks)&&p.tracks.length>0&&p.tracks.length<=100,'Invalid tracks/worlds');
  need(Array.isArray(p.allowedOverlaps??[]),'Invalid allowed overlaps');
  const worlds=new Map();for(const w of p.worlds){need(typeof w.id==='string'&&w.id&&!worlds.has(w.id)&&validRect(w.viewport)&&contains(safe,w.viewport),'Invalid world/viewport');validateKeys(w.keys,validPose);worlds.set(w.id,w);}
  const ids=new Set();for(const t of p.tracks){need(typeof t.id==='string'&&t.id&&!ids.has(t.id),'Duplicate/invalid track');ids.add(t.id);need(Number.isInteger(t.start)&&Number.isInteger(t.end)&&t.start>=0&&t.end>t.start&&t.end<=m.durationInFrames,'Invalid track range '+t.id);need(['world','screen'].includes(t.space)&&typeof t.protected==='boolean'&&(t.space==='screen'||worlds.has(t.worldId)),'Invalid track space/protection '+t.id);if(compact)need((visualRoles.has(t.role)||t.role==='vo-guide')&&(t.role!=='vo-guide'||(t.protected&&t.space==='screen')),'Compact track requires role visual/vo-guide: '+t.id);validateKeys(t.keys,validRect);need(t.keys[0].frame<=t.start&&t.keys.at(-1).frame>=t.end-1,'Track keys must cover active range '+t.id);}
  validateLayerContract(p,m.durationInFrames);
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
  const pair=(a,b)=>JSON.stringify([a,b].sort());
  const issue=(key,frame)=>{const r=issues.get(key);if(r){r.last=frame;r.count++;}else issues.set(key,{issue:key,first:frame,last:frame,count:1});};
  need(m.durationInFrames*p.tracks.length*p.tracks.length<=100000000,'Spatial workload too large; split plan');
  for(let f=0;f<m.durationInFrames;f++){
   const visible=[];for(const t of p.tracks){if(f<t.start||f>=t.end)continue;let r=sampleKeys(t.keys,f,['x','y','w','h']);let clip=t.role==='background'?canvas:safe;
    if(t.space==='world'){const w=worlds.get(t.worldId);r=projectRect(r,sampleKeys(w.keys,f,['cx','cy','zoom']),w.viewport);clip=w.viewport;}
    if(t.protected&&!contains(clip,r))issue('CLIP '+t.id,f);
    if(compact){const zone=t.role==='vo-guide'?guideZone:t.role==='subtitle'?profile.safe:t.role==='background'?canvas:visualZone;if(t.protected&&!contains(zone,r))issue('DESIGN CLIP '+t.id,f);}
    const left=Math.max(r.x,clip.x),top=Math.max(r.y,clip.y),right=Math.min(r.x+r.w,clip.x+clip.w),bottom=Math.min(r.y+r.h,clip.y+clip.h);
    if(right>left&&bottom>top)visible.push({t,r:{x:left,y:top,w:right-left,h:bottom-top}});
   }
   if(p.geometryContract==='screen-space-v1'&&!visible.some(a=>a.t.protected&&a.t.role!=='vo-guide'&&a.t.role!=='subtitle'))issue('MISSING protected visual coverage',f);
   if(compact){
    const guides=visible.filter(a=>a.t.role==='vo-guide');
    const spoken=n.beats.some(b=>f>=b.startFrame&&f<b.endFrame&&b.text.trim());
    if(guides.length!==(spoken?1:0))issue('VO GUIDE count',f);
    for(const g of guides)for(const a of visible.filter(v=>isVisual(v.t)))if(g.r.y-(a.r.y+a.r.h)<profile.guideGap-.001)issue('VO GUIDE GAP '+a.t.id,f);
   }
   for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){const a=visible[i],b=visible[j];if((a.t.protected||b.t.protected)&&!overlapAllowed(p,a.t,b.t,f)&&overlapArea(a.r,b.r)>1)issue('OVERLAP '+pair(a.t.id,b.t.id),f);}
   checked++;
  }
 }catch(e){errors.push(e.message);}
 return {ok:errors.length===0&&issues.size===0,errors,issues:[...issues.values()],checkedFrames:checked,coverage:checked===m.durationInFrames?'all-frames':'incomplete',status:errors.length||issues.size?'FAIL':'PASS',verification:'declared geometry only; DOM/render not verified'};
}
export function inspectSpatialIdentity(dir,p,sources={}){
 const errors=[];if(p.geometryContract!=='screen-space-v1')return errors;
 try{const require=createRequire(import.meta.url),ts=require('typescript');const bp=JSON.parse(fs.readFileSync(path.join(dir,'production/editable-blueprint.json'),'utf8'));
 const byId=new Map(p.tracks.map(t=>[t.id,t]));const expected=new Map(p.tracks.filter(t=>t.native!==false).map(t=>[t.nativeName,t.id]));const plain=new Set(p.tracks.filter(t=>t.native===false).map(t=>t.id));const hits=new Map();const plainHits=new Map();
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.isFile()&&/\.tsx$/.test(e.name)?[path.join(d,e.name)]:[]);
 for(const f of walk(path.join(dir,'src'))){const ast=ts.createSourceFile(f,fs.readFileSync(f,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const scan=node=>{if(ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node)){const attr=k=>node.attributes.properties.find(x=>ts.isJsxAttribute(x)&&x.name.getText(ast)===k)?.initializer;const name=attr('name'),tag=attr('data-qa-track');if(tag){if(ts.isStringLiteral(tag)&&byId.has(tag.text))sources[tag.text]=path.relative(dir,f).replaceAll('\\','/');if(ts.isStringLiteral(tag)&&byId.get(tag.text)?.source&&byId.get(tag.text).source!==path.relative(dir,f).replaceAll('\\','/'))errors.push('Capture source mismatch '+tag.text);if(ts.isStringLiteral(tag)&&plain.has(tag.text)&&!/^Interactive\./.test(node.tagName.getText(ast)))plainHits.set(tag.text,(plainHits.get(tag.text)??0)+1);else if(!ts.isStringLiteral(tag)||!name||!ts.isStringLiteral(name)||expected.get(name.text)!==tag.text||!/^Interactive\./.test(node.tagName.getText(ast)))errors.push('Invalid capture identity '+f);else hits.set(name.text,(hits.get(name.text)??0)+1);}}ts.forEachChild(node,scan);};scan(ast);}
 for(const id of plain)if(plainHits.get(id)!==1)errors.push('Missing/duplicate plain capture binding '+id);
 for(const [name,id] of expected)if(hits.get(name)!==1)errors.push('Missing/duplicate capture binding '+id);
 for(const t of [...(bp.nativeTextTargets??[]),...(bp.nativeVisualTargets??[])])if(!expected.has(t.name))errors.push('Untracked native target '+t.name);
 }catch(e){errors.push('Spatial identity: '+e.message);}return errors;
}
export function validateSpatial(dir,traceFile,{requireFull=false,mode,profile,compareSegment}={}){try{const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));const m=read('motiongraphic-video.json'),n=read('src/config/narration.json'),p=read('production/spatial-plan.json');const result=inspectSpatial(m,n,p,read('production/motion-plan.json'));const sf=path.join(dir,'production/sound-cues.json');const cueErrors=inspectInteractionSound(p,fs.existsSync(sf)?read('production/sound-cues.json'):null);if(cueErrors.length){result.errors.push(...cueErrors);result.ok=false;result.status='FAIL';}const sourceMap=Object.create(null);const identity=inspectSpatialIdentity(dir,p,sourceMap);result.sourceMap=sourceMap;for(const t of p.tracks)if(!t.source&&sourceMap[t.id])t.source=sourceMap[t.id];if(identity.length){result.errors.push(...identity);result.ok=false;result.status='FAIL';}if(requireFull&&!traceFile&&result.ok){result.ok=false;result.status='INCOMPLETE';result.errors.push('Actual trace required');}if(traceFile&&result.ok){const trace=JSON.parse(fs.readFileSync(traceFile,'utf8')),actual=inspectSpatialTrace(m,n,p,trace);actual.freshness=evidenceStatus(dir,trace,{...(mode?{mode}:{}),...(profile?{renderProfile:profile}:{})});if(actual.freshness==='STALE'){actual.status='STALE';actual.ok=false;}else if(trace.schemaVersion===3&&actual.freshness!=='CURRENT'){actual.ok=false;if(actual.status!=='FAIL')actual.status='INCOMPLETE';}if(requireFull&&(actual.coverage!=='all-frames'||actual.freshness!=='CURRENT'||trace.schemaVersion!==3||trace.evidence?.context?.compositionId!==m.id||!Array.isArray(trace.requestedFrames)||trace.requestedFrames.length!==m.durationInFrames||trace.requestedFrames.some((f,i)=>f!==i)||trace.scope?.start!==0||trace.scope?.end!==m.durationInFrames)){actual.ok=false;if(actual.status!=='STALE'&&actual.status!=='FAIL')actual.status='INCOMPLETE';}if(compareSegment){const seg=JSON.parse(fs.readFileSync(compareSegment,'utf8'));actual.segmentComparison=compareSpatialTraces(m,trace,seg);const segQA=inspectSpatialTrace(m,n,p,seg);if(!actual.segmentComparison.ok||!segQA.ok||evidenceStatus(dir,seg)!=='CURRENT'){actual.ok=false;if(actual.status!=='STALE')actual.status='FAIL';}}result.trace=actual;result.ok=actual.ok;result.status=actual.status;}return result;}catch(e){return {ok:false,errors:[e.message],issues:[],checkedFrames:0};}}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const [dir,...args]=process.argv.slice(2);const requireFull=args.includes('--require-full');const modeIndex=args.indexOf('--mode'),mode=modeIndex>=0?args[modeIndex+1]:undefined;if(modeIndex>=0){if(!['preview','final'].includes(mode)){console.error('Invalid --mode');process.exit(2);}args.splice(modeIndex,2);}let profile,compareSegment;for(const [flag,set] of [['--profile',v=>profile=v],['--compare-segment',v=>compareSegment=v]]){const i=args.indexOf(flag);if(i>=0){if(!args[i+1]||args[i+1].startsWith('--')){console.error('Missing '+flag);process.exit(2);}set(args[i+1]);args.splice(i,2);}}const rest=args.filter(x=>x!=='--require-full');if(!dir||!(rest.length===0||rest.length===2&&rest[0]==='--trace')){console.error('Pakai: npm run qa:spatial -- <folder-addon> [--trace measured.json] [--require-full] [--mode preview|final]');process.exitCode=2;}else{const r=validateSpatial(dir,rest[1],{requireFull,mode,profile,compareSegment});console.log(JSON.stringify(r,null,2));process.exitCode=r.ok?0:1;}}
