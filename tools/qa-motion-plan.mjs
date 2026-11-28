#!/usr/bin/env node
/** Read-only metadata QA. No render, no automatic motion selection, no write. */
import {resolveSpatialProfile} from './spatial-profiles.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
export const INTENTS=['introduce','detail','point','shift-focus','click','drag','type','change','flow','sequence','compare','result','recap','bridge','pause'];
export const MOTIONS=['establish','focus-zoom','selective-emphasis','focus-handoff','cursor-action','drag-tracking','natural-typing','state-transform','path-motion','progressive-build','spatial-reflow','result-hold','context-zoom-out','shared-element','hold','camera-pan','target-tracking','adaptive-reframe','controlled-exit','motivated-cut'];
export const fingerprint=beats=>createHash('sha256').update(JSON.stringify(beats)).digest('hex');
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const text=v=>typeof v==='string'&&v.trim().length>0;
const finite=v=>typeof v==='number'&&Number.isFinite(v);
const pos=v=>finite(v)&&v>0;
const dims=v=>object(v)&&pos(v.w)&&pos(v.h);
const rect=v=>dims(v)&&finite(v.x)&&finite(v.y);
const pose=v=>object(v)&&finite(v.cx)&&finite(v.cy)&&pos(v.zoom);
const close=(a,b,keys)=>keys.every(k=>Math.abs(a[k]-b[k])<=.001);
const inRect=(a,b)=>a.x>=b.x-.001&&a.y>=b.y-.001&&a.x+a.w<=b.x+b.w+.001&&a.y+a.h<=b.y+b.h+.001;
const projectRect=(t,p,v)=>({x:v.x+v.w/2+(t.x-p.cx)*p.zoom,y:v.y+v.h/2+(t.y-p.cy)*p.zoom,w:t.w*p.zoom,h:t.h*p.zoom});
const read=(root,rel)=>JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));
export function inspectMotionPlan(manifest,narration,plan){
 const errors=[],warnings=[];const need=(ok,msg)=>{if(!ok)errors.push(msg);return ok};
 if(!need(object(manifest),'Manifest object wajib')||!need(object(narration)&&Array.isArray(narration.beats),'Narration beats wajib')||!need(object(plan),'Motion plan object wajib'))return {ok:false,errors,warnings};
 const beats=narration.beats;
 need(manifest.motionPlanContract==='focus-driven-v1','motionPlanContract harus focus-driven-v1');
 need(Number.isInteger(manifest.durationInFrames)&&manifest.durationInFrames>0&&pos(manifest.width)&&pos(manifest.height),'Dimensi/durasi manifest tidak valid');
 need(plan.schemaVersion===1,'schemaVersion harus 1');
 need(['draft','aligned'].includes(plan.status),'status harus draft/aligned');
 if(plan.status==='aligned')warnings.push('Status aligned adalah deklarasi; rekaman dan sinkronisasi aktual wajib dibuktikan terpisah.');
 need(plan.narrationHash===fingerprint(beats),'narrationHash tidak cocok; review plan setelah perubahan VO/timing');
 need(beats.length>0,'Narration kosong');
 let cursor=0;
 for(const [i,b] of beats.entries()){
  if(!need(object(b),`Narration beat ${i} bukan object`))continue;
  need(text(b.scene)&&typeof b.text==='string',`Narration beat ${i}: scene/text tidak valid`);
  if(need(Number.isInteger(b.startFrame)&&Number.isInteger(b.endFrame)&&b.startFrame===cursor&&b.endFrame>b.startFrame&&b.endFrame<=manifest.durationInFrames,`Narration beat ${i}: range tidak contiguous/valid`))cursor=b.endFrame;
 }
 need(cursor===manifest.durationInFrames,'Narration harus mencakup 0 sampai durasi manifest termasuk silent beat');
 if(!need(Array.isArray(plan.beats)&&plan.beats.length===beats.length,'Jumlah plan beats harus sama dengan narration'))return {ok:false,errors,warnings};
 let previous=null;
 for(const [i,b] of plan.beats.entries()){
  const tag=`Beat ${i}: `,n=beats[i];
  if(!need(object(b)&&object(n),tag+'item tidak valid')){previous=null;continue;}
  const len=n.endFrame-n.startFrame;
  need(b.beatIndex===i,tag+'beatIndex harus urut');
  for(const k of ['focusTarget','reason','stateIn','stateOut','collisionPolicy'])need(text(b[k]),tag+k+' wajib');
  for(const k of ['text','startFrame','endFrame','fps','durationInFrames'])need(!Object.hasOwn(b,k),tag+k+' duplikasi sumber narration/manifest dilarang');
  need(INTENTS.includes(b.intent),tag+'intent tidak dikenal');need(MOTIONS.includes(b.motion),tag+'motion tidak dikenal');
  need(Array.isArray(b.editableTargets)&&b.editableTargets.length>0&&b.editableTargets.every(text)&&new Set(b.editableTargets).size===b.editableTargets.length,tag+'editableTargets harus nama unik nonkosong');
  const hand=b.handoff;
  need(object(hand)&&text(hand.reason)&&(i===0?hand.type==='start':['carry','match','cut'].includes(hand.type)),tag+'handoff tidak valid');
  const ph=b.phases;
  if(need(object(ph),tag+'phases wajib')){
   const offset=v=>Number.isInteger(v)&&v>=0&&v<len;
   const noAction=ph.action===null&&ph.reaction===null;
   const action=offset(ph.action)&&offset(ph.reaction)&&ph.action<=ph.reaction;
   need(noAction||action,tag+'action/reaction harus null keduanya atau offset berurutan dalam beat');
   need(Number.isInteger(ph.holdStart)&&ph.holdStart>=0&&ph.holdStart<=len&&(!action||ph.holdStart>=ph.reaction),tag+'holdStart tidak valid/lebih awal dari reaksi');
  }
  const c=b.camera;
  let validCamera=false;
  if(c!==null){
   validCamera=need(object(c)&&text(c.worldId)&&dims(c.world)&&rect(c.viewport)&&pose(c.start)&&pose(c.end),tag+'camera pose/world/viewport tidak valid');
   if(validCamera){
    const canvas={x:0,y:0,w:manifest.width,h:manifest.height};
    need(inRect(c.viewport,canvas),tag+'viewport keluar canvas');
    if(manifest.designContract==='compact-balanced-v1'||manifest.width===1080&&manifest.height===1920)need(inRect(c.viewport,resolveSpatialProfile(manifest).safe),tag+'viewport di luar safe zone');
    if(c.focusSamples!==undefined){
     if(need(Array.isArray(c.focusSamples),tag+'focusSamples harus array'))for(const [j,s] of c.focusSamples.entries()){
      const st=tag+`focusSample ${j}: `;
      if(need(object(s)&&Number.isInteger(s.offset)&&s.offset>=0&&s.offset<len&&pose(s.pose)&&rect(s.target),st+'sample tidak valid')){
       need(inRect(s.target,{x:0,y:0,w:c.world.w,h:c.world.h}),st+'target di luar world');
       need(inRect(projectRect(s.target,s.pose,c.viewport),c.viewport),st+'target terpotong viewport');
       if(s.offset===0)need(close(s.pose,c.start,['cx','cy','zoom']),st+'pose offset 0 berbeda dari camera.start');
      }
     }
    }
    if(!Array.isArray(c.focusSamples)||!c.focusSamples.length)warnings.push(tag+'Belum ada declared focus sample; inspeksi framing manual wajib.');
   }
  }
  if(hand?.type==='carry'&&previous){
   const p=previous.camera;
   if(c===null||p===null)need(c===null&&p===null,tag+'carry tidak boleh reset/menghilangkan kamera');
   else if(validCamera&&previous.validCamera)need(c.worldId===p.worldId&&close(c.world,p.world,['w','h'])&&close(c.viewport,p.viewport,['x','y','w','h'])&&close(c.start,p.end,['cx','cy','zoom']),tag+'carry camera discontinuity');
  }
  previous={camera:c,validCamera};
 }
 return {ok:errors.length===0,errors,warnings};
}
export function validateMotionPlan(dir){
 try{return inspectMotionPlan(read(dir,'motiongraphic-video.json'),read(dir,'src/config/narration.json'),read(dir,'production/motion-plan.json'));}
 catch(e){return {ok:false,errors:[e.message],warnings:[]};}
}
export function inspectProjectMotionPlans(projectsDir){
 const results=[];
 for(const ent of fs.readdirSync(projectsDir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
  if(!ent.isDirectory()||ent.name.startsWith('.')||ent.name.startsWith('_'))continue;
  const dir=path.join(projectsDir,ent.name);
  try{
   const m=read(dir,'motiongraphic-video.json');
   if(!object(m))throw Error('Manifest harus object');
   if(!Object.hasOwn(m,'motionPlanContract')){results.push({slug:ent.name,status:fs.existsSync(path.join(dir,'production/motion-plan.json'))?'FAIL':'SKIP',errors:fs.existsSync(path.join(dir,'production/motion-plan.json'))?['Motion plan ada tetapi kontrak manifest belum dideklarasikan']:[],warnings:[]});continue;}
   const v=validateMotionPlan(dir);results.push({slug:ent.name,status:v.ok?'PASS':'FAIL',errors:v.errors,warnings:v.warnings});
  }catch(e){results.push({slug:ent.name,status:'FAIL',errors:[e.message],warnings:[]});}
 }
 return results;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const args=process.argv.slice(2),dir=args[0];
 if(args.length===1&&dir==='--all'){
  try{
   const root=path.dirname(path.dirname(path.resolve(process.argv[1])));
   const results=inspectProjectMotionPlans(path.join(root,'projects'));
   for(const r of results){console.log(`[${r.status}] ${r.slug}${r.status==='SKIP'?' — legacy tanpa deklarasi; tidak dinilai':''}`);for(const w of r.warnings)console.warn('[WARN] '+w);for(const e of r.errors)console.error('[FAIL] '+e);}
   const count=s=>results.filter(r=>r.status===s).length;
   console.log(`[MOTION] ${count('PASS')} PASS, ${count('FAIL')} FAIL, ${count('SKIP')} SKIP; metadata only; visual/GUI/render/VO sync NOT VERIFIED`);
   process.exitCode=count('FAIL')?1:0;
  }catch(e){console.error('[FAIL] '+e.message);process.exitCode=1;}
 }
 else if(!dir||dir.startsWith('--')||args.slice(1).some(x=>x!=='--fingerprint')){console.error('Pakai: npm run qa:motion -- <folder-addon> [--fingerprint] | --all');process.exitCode=2;}
 else if(args.includes('--fingerprint')){try{const n=read(dir,'src/config/narration.json');if(!Array.isArray(n.beats))throw Error('Narration beats wajib');console.log(fingerprint(n.beats));}catch(e){console.error(e.message);process.exitCode=1;}}
 else {const r=validateMotionPlan(dir);for(const w of r.warnings)console.warn('[WARN] '+w);for(const e of r.errors)console.error('[FAIL] '+e);console.log(`[${r.ok?'PASS':'FAIL'}] Motion plan metadata only; visual/collision/render/GUI/VO sync NOT VERIFIED`);process.exitCode=r.ok?0:1;}
}
