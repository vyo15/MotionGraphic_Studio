/** Session-scoped spatial QA. Reuses capture-spatial CLI; never edits project source. */
import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spatialCaptureProps} from './render-profiles.mjs';
import {reusableSample} from './spatial-evidence-index.mjs';
import {spatialEvidence} from './spatial-evidence.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
export function spatialProjects(root){
 const catalog=read(path.join(root,'library/catalog.json'));
 return catalog.videos.map(v=>{
  if(!/^[a-z][a-z0-9-]{1,48}$/.test(v.slug))throw Error('Invalid project slug');
  const dir=path.join(root,'projects',v.slug),m=read(path.join(dir,'motiongraphic-video.json'));
  const plan=path.join(dir,'production/spatial-plan.json');
  return {slug:v.slug,dir,m,eligible:fs.existsSync(plan)&&read(plan).geometryContract==='screen-space-v1'};
 });
}
export function spatialJob(root,project,{full=false,mode='preview',profile=mode==='final'?'high':'preview',segment,automatic=false}={}){
 if(!project.eligible)throw Error('NOT RUN: legacy / no screen-space-v1 instrumentation');
 if(!['preview','final'].includes(mode))throw Error('Invalid mode');
 const props=spatialCaptureProps(project.m.defaultProps??{},project.m.designContract,{mode,profile});
 const context={props,compositionId:segment??project.m.id,mode,renderProfile:profile};
 const digest=spatialEvidence(project.dir,{...context,masterRoot:root,fast:automatic}).digest;
 const out=path.join(root,'qa-out',project.slug,`spatial-${mode}-${full?'full':'sample'}-${randomUUID()}`);
 const args=[path.join(root,'tools','capture-spatial.mjs'),project.dir,'--mode',mode,'--profile',profile,'--out',out,...(full?['--full']:[]),...(segment?['--segment',segment]:[]),...(automatic?['--no-wait']:[])];
 return {slug:project.slug,digest,out,args,full,mode,context,segment,automatic};
}
export function launchSpatial(root,job){
 const child=spawn(process.execPath,job.args,{cwd:root,stdio:['ignore','inherit','inherit'],windowsHide:true});
 const result=new Promise(resolve=>{
  child.once('error',e=>resolve({status:'INCOMPLETE',reason:e.message}));
  child.once('close',code=>{
   if(code===75)return resolve({status:'BUSY',reason:'QA/render active'});
   try{const r=read(path.join(job.out,'report.json'));
    if(code===0&&(job.full?(job.segment?r.status==='PASS_SEGMENT'&&r.coverage==='all-segment-frames':r.status==='PASS'&&r.coverage==='all-frames'):['PASS','PASS_SAMPLED'].includes(r.status))&&r.ok===true)return resolve({status:r.status});
    resolve({status:['FAIL','WARNING','STALE','INCOMPLETE'].includes(r.status)?r.status:'INCOMPLETE',reason:'exit '+code});
   }catch(e){resolve({status:'INCOMPLETE',reason:'No valid report; exit '+code});}
  });
 });
 return {result,close(){if(child.exitCode===null&&child.signalCode===null)child.kill('SIGTERM');}};
}
/** Debounce saved input, one capture at a time; no retry loop for unchanged failed input. */
export function startAutoSpatial({root=ROOT,isIdle=()=>true,pollMs=8000,quietMs=12000,now=Date.now,list=()=>spatialProjects(root),jobFor=p=>spatialJob(root,p,{automatic:true}),launch=j=>launchSpatial(root,j),cache=j=>reusableSample(root,j),notify=console.log}={}){
 let closed=false,busy=false,active=null,lastError=null;const states=new Map();
 async function tick(){
  if(closed||busy)return;busy=true;
  try{
   if(!isIdle()){for(const s of states.values())s.changedAt=now();return;}
   const projects=list();const live=new Set(projects.map(p=>p.slug));for(const slug of states.keys())if(!live.has(slug))states.delete(slug);
   const pending=[];
   for(const p of projects){
    if(closed||!isIdle())return;
    if(!p.eligible){if(states.get(p.slug)?.digest!=='legacy'){notify(`[AUTO SPATIAL] ${p.slug}: NOT RUN (legacy, no instrumentation)`);states.set(p.slug,{digest:'legacy',attempted:true});}continue;}
    let job;try{job=jobFor(p);}catch(e){const msg=`${p.slug}: ${e.message}`;if(states.get(p.slug)?.error!==msg){notify('[AUTO SPATIAL] INCOMPLETE '+msg);states.set(p.slug,{error:msg});}continue;}
    let state=states.get(p.slug);
    if(state?.digest!==job.digest){state={digest:job.digest,changedAt:now(),attempted:false};states.set(p.slug,state);continue;}
    if(state.attempted||now()-state.changedAt<quietMs)continue;
    pending.push({p,job,state});
   }
   pending.sort((a,b)=>b.state.changedAt-a.state.changedAt);
   for(const {p,job,state} of pending){
    if(closed||!isIdle())return;
    const cached=cache(job);if(cached){state.attempted=true;notify(`[AUTO SPATIAL] ${p.slug}: ${cached.status} | ${cached.out}`);continue;}
    state.attempted=true;notify(`[AUTO SPATIAL] ${p.slug}: sampling preview; editing tetap tersedia.`);
    let monitor;try{active=launch(job);monitor=setInterval(()=>{if(closed||!active)return;try{const current=list().find(x=>x.slug===p.slug);if(!current?.eligible||jobFor(current).digest!==job.digest){active.close();clearInterval(monitor);}}catch{active.close();clearInterval(monitor);}},Math.max(pollMs,2000));monitor.unref?.();const r=await active.result;if(!closed){let status=r.status;if(status==='BUSY')state.attempted=false;try{const current=list().find(x=>x.slug===p.slug);if(!current?.eligible||jobFor(current).digest!==job.digest)status='STALE';}catch{status='STALE';}
      notify(`[AUTO SPATIAL] ${p.slug}: ${status}${r.reason?' — '+r.reason:''} | ${job.out}`);}}
    catch(e){if(!closed)notify(`[AUTO SPATIAL] ${p.slug}: INCOMPLETE — ${e.message}`);}
    finally{clearInterval(monitor);active=null;}
    // Yield between projects; do not run several Chromium captures concurrently.
    return;
   }
   lastError=null;
  }catch(e){if(lastError!==e.message&&!closed){notify('[AUTO SPATIAL] INCOMPLETE — '+e.message);lastError=e.message;}}
  finally{busy=false;}
 }
 const timer=setInterval(()=>void tick(),pollMs);timer.unref?.();
 return {tick,close(){closed=true;clearInterval(timer);active?.close();}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{
  const [slug,choice,...rest]=process.argv.slice(2);if(rest.length||!['sample','full','final','capcut'].includes(choice))throw Error('Use menu QA Spatial: sample / full / final / capcut');
  const p=spatialProjects(ROOT).find(x=>x.slug===slug);if(!p)throw Error('Unknown project');
  if(!p.eligible){console.log('[SPATIAL] NOT RUN (legacy). Declared plan only, when available.');process.exitCode=2;}
  else {const job=spatialJob(ROOT,p,{full:choice!=='sample',mode:['final','capcut'].includes(choice)?'final':'preview',...(choice==='capcut'?{profile:'capcut'}:{})});const task=launchSpatial(ROOT,job);const stop=()=>task.close();process.once('SIGINT',stop);process.once('SIGTERM',stop);const r=await task.result;process.off('SIGINT',stop);process.off('SIGTERM',stop);console.log(`[SPATIAL] ${r.status} | ${job.out}`);process.exitCode=['PASS','PASS_SAMPLED'].includes(r.status)?0:1;}
 }catch(e){console.error('[SPATIAL]',e.message);process.exitCode=2;}
}
