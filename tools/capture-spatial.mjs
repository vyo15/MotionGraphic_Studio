#!/usr/bin/env node
/** Opt-in capture via existing Remotion renderer and composition, not a new renderer.
 * Requires synced project, installed dependencies, and explicit instrumentation. */
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {fileURLToPath} from 'node:url';
import {spatialCaptureProps} from './render-profiles.mjs';import {writeSpatialDiagnostics} from './spatial-diagnostics.mjs';
import {acquireQaLease} from './spatial-queue.mjs';import {publishEvidence,publishCaptureFailure} from './spatial-evidence-index.mjs';import {adviseLayout} from './spatial-layout-advisor.mjs';
import {spatialEvidence} from './spatial-evidence.mjs';import {selectSpatialFrames,spatialReviewFrames} from './spatial-sampling.mjs';import {fingerprint} from './qa-motion-plan.mjs';import {inspectSpatialTrace} from './qa-spatial-trace.mjs';import {validateSpatial} from './qa-spatial.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let temp,outputDir,lease,attempt;
const abort=new AbortController();const stop=()=>abort.abort();process.once('SIGINT',stop);process.once('SIGTERM',stop);
try{
 const [arg,...args]=process.argv.slice(2);if(!arg||arg==='--help'){console.log('node tools/capture-spatial.mjs projects/<slug> [--full] [--segment <id>] [--mode preview|final] [--profile preview|high|capcut] [--props file.json] [--out directory] [--browser executable]');process.exit(arg?0:2);}
 const opt={mode:'preview'};for(let i=0;i<args.length;i++){const a=args[i];if(a==='--full')opt.full=true;else if(a==='--no-wait')opt.noWait=true;else if(['--segment','--mode','--profile','--props','--out','--browser'].includes(a)&&args[i+1]&&!args[i+1].startsWith('--'))opt[a.slice(2)]=args[++i];else throw Error('Unknown/missing option '+a);}
 if(!['preview','final'].includes(opt.mode))throw Error('Invalid mode');
 const dir=path.resolve(arg),read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')),m=read('motiongraphic-video.json'),n=read('src/config/narration.json'),p=read('production/spatial-plan.json'),motion=read('production/motion-plan.json');
 if(path.resolve(root,'projects',m.slug)!==dir)throw Error('Capture only registered project in Master projects/');
 if(p.geometryContract!=='screen-space-v1')throw Error('NOT RUN: project not instrumented; legacy stays unchanged');
 const declared=validateSpatial(dir);if(!declared.ok)throw Error('Declared spatial QA failed: '+JSON.stringify(declared));for(const t of p.tracks)if(!t.source&&declared.sourceMap?.[t.id])t.source=declared.sourceMap[t.id];
 const segment=opt.segment?m.segments?.find(s=>s.id===opt.segment):null;if(opt.segment&&!segment)throw Error('Unknown segment ID');
 const start=segment?.startFrame??0,end=start+(segment?.durationInFrames??m.durationInFrames),compositionId=segment?.id??m.id;
 const overrides=opt.props?JSON.parse(fs.readFileSync(opt.props,'utf8')):{};if(!overrides||typeof overrides!=='object'||Array.isArray(overrides))throw Error('Invalid props JSON');
 const renderProfile=opt.profile??(opt.mode==='final'?'high':'preview');const props=spatialCaptureProps({...m.defaultProps,...overrides},m.designContract,{mode:opt.mode,profile:renderProfile});
 // Only real project assets may be rendered; sync mirror must match source bytes.
 const mirror=path.join(root,'public','videos',m.slug);const walk=(a,b)=>{if(!fs.existsSync(a))return;for(const e of fs.readdirSync(a,{withFileTypes:true})){const x=path.join(a,e.name),y=path.join(b,e.name);if(e.isSymbolicLink())throw Error('Symlink asset '+x);if(e.isDirectory())walk(x,y);else if(e.isFile()&&(!fs.existsSync(y)||!fs.readFileSync(x).equals(fs.readFileSync(y))))throw Error('Asset mirror stale; npm run sync: '+e.name);}};walk(path.join(dir,'public'),mirror);
 const inputEvidence=spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile});
 attempt={dir,inputEvidence,scope:{start,end,compositionId,requestMode:opt.full?'full':'sample'}};
 const out=path.resolve(opt.out??path.join(root,'qa-out',m.slug,'spatial-'+compositionId+'-'+opt.mode));
 if(out===root||out.startsWith(dir+path.sep)||out===dir||!out.startsWith(path.join(root,'qa-out')+path.sep))throw Error('Output must be under Master qa-out/ and outside project');
 if(fs.existsSync(out))throw Error('Output exists; choose new --out to preserve evidence');
 for(let parent=path.dirname(out);parent!==root;parent=path.dirname(parent)){if(fs.existsSync(parent)&&fs.lstatSync(parent).isSymbolicLink())throw Error('Symlink output ancestor refused');}
 lease=await acquireQaLease(root,'capture',{waitMs:opt.noWait?0:600000,signal:abort.signal});
 if(fs.existsSync(out))throw Error('Output exists after queue wait');
 fs.mkdirSync(out,{recursive:true});outputDir=out;
 if(spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile}).digest!==inputEvidence.digest)throw Error('STALE: source changed while waiting for QA lease');
 let bundler,renderer;try{bundler=await import('@remotion/bundler');renderer=await import('@remotion/renderer');}catch(e){throw Error('NOT RUN: Remotion dependencies unavailable; npm ci. '+e.message);}
 temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-spatial-'));
 const serveUrl=await bundler.bundle({entryPoint:path.join(root,'src/index.ts'),rootDir:root,publicDir:path.join(root,'public'),outDir:path.join(temp,'bundle'),enableCaching:false});
 const browserExecutable=opt.browser?path.resolve(opt.browser):undefined;
 // Browser reuse is optional; the existing renderer API remains authoritative.
 const composition=await renderer.selectComposition({serveUrl,id:compositionId,inputProps:props,browserExecutable});
 if(composition.width!==m.width||composition.height!==m.height||composition.fps!==m.fps||composition.durationInFrames!==end-start)throw Error('Registered composition stale; npm run sync');
 const soundFile=path.join(dir,'production/sound-cues.json'),sound=fs.existsSync(soundFile)?read('production/sound-cues.json'):null;
 const frames=selectSpatialFrames(m,n,motion,p,{full:!!opt.full,start,end,sound}),rows=[],eventFrames=new Set(spatialReviewFrames(m,n,motion,p,sound,42,{start,end}));
 const scope={start,end,compositionId,requestMode:opt.full?'full':'sample'};let environment,evidence,savedProblemFrames=0;
 const buildTrace=(rr,requestedFrames)=>({schemaVersion:3,narrationHash:fingerprint(n.beats),width:m.width,height:m.height,fps:m.fps,source:'Remotion renderStill browser log',evidence,environment,requestedFrames,scope,frames:rr});
 for(const f of frames){if(abort.signal.aborted)throw Error('INCOMPLETE: capture cancelled');const found=[];const png=path.join(temp,'frame.png');
  await renderer.renderStill({serveUrl,composition,inputProps:props,frame:f-start,output:png,imageFormat:'png',browserExecutable,timeoutInMilliseconds:30000,onBrowserLog:log=>{const prefix='MG_SPATIAL_FRAME:';if(log.text?.startsWith(prefix)){try{const r=JSON.parse(log.text.slice(prefix.length));if(r.frame===f)found.push(r);}catch{}}}});
  if(found.length!==1||found[0].fontStatus!=='loaded'||!found[0].rects.length)throw Error('INCOMPLETE: expected one settled capture at global frame '+f+'; got '+found.length);
  if(found[0].probeVersion!==3)throw Error('INCOMPLETE: project needs probe v3; no automatic legacy migration');
  if(!environment){environment={node:process.version,platform:process.platform,remotion:'4.0.538',browserExecutable:browserExecutable??'Remotion default',browserUserAgent:found[0].browserUserAgent,probeVersion:3};evidence=spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile,environment});}
  rows.push(found[0]);const result=inspectSpatialTrace(m,n,p,buildTrace([found[0]],[f]),{partial:true});
  if(eventFrames.has(f)||!result.ok&&savedProblemFrames<120){fs.copyFileSync(png,path.join(out,'frame-'+String(f).padStart(6,'0')+'.png'));if(!result.ok&&!eventFrames.has(f))savedProblemFrames++;}
  if(rows.length%20===0&&spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile,fast:true}).digest!==inputEvidence.digest)throw Error('STALE: source changed during capture');
  if(rows.length%20===0||rows.length===frames.length)console.log('[CAPTURE]',rows.length+'/'+frames.length);
 }
 if(abort.signal.aborted)throw Error('INCOMPLETE: capture cancelled');
 if(spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile}).digest!==inputEvidence.digest)throw Error('STALE: source changed during capture; discard results');
 const trace=buildTrace(rows,frames);
 const report=inspectSpatialTrace(m,n,p,trace);fs.writeFileSync(path.join(out,'trace.json'),JSON.stringify(trace));fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({...report,freshness:'CURRENT',scope:trace.scope,evidenceDigest:evidence.digest,renderProfile,environment},null,2));writeSpatialDiagnostics(out,report,trace,m);const advisor=adviseLayout(m,p,trace,report,{narration:n});fs.writeFileSync(path.join(out,'layout-advice.json'),JSON.stringify(advisor,null,2));publishEvidence(root,dir,out,trace,report,advisor);console.log('[CAPTURE]',report.status,report.checkedFrames+'/'+m.durationInFrames, out);process.exitCode=report.ok?0:1;
}catch(e){if(outputDir){const status=e.message.startsWith('STALE:')?'STALE':'INCOMPLETE';fs.writeFileSync(path.join(outputDir,'report.json'),JSON.stringify({ok:false,status,errors:[e.message],verification:'capture not completed'},null,2));try{if(attempt)publishCaptureFailure(root,attempt.dir,outputDir,attempt.inputEvidence,attempt.scope,status,e.message);}catch(indexError){console.error('[QA INDEX]',indexError.message);}}console.error('[SPATIAL CAPTURE]',e.message);process.exitCode=e.code==='QA_BUSY'?75:2;}finally{try{if(temp)fs.rmSync(temp,{recursive:true,force:true});}finally{lease?.release();process.off('SIGINT',stop);process.off('SIGTERM',stop);}}
