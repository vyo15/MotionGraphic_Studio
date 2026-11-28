#!/usr/bin/env node
/** Opt-in capture via existing Remotion renderer and composition, not a new renderer.
 * Requires synced project, installed dependencies, and explicit instrumentation. */
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {fileURLToPath} from 'node:url';
import {reviewPngFiles} from './spatial-pixel-review.mjs';
import {spatialCaptureProps} from './render-profiles.mjs';import {writeSpatialDiagnostics} from './spatial-diagnostics.mjs';
import {acquireQaLease} from './spatial-queue.mjs';import {publishEvidence,publishCaptureFailure} from './spatial-evidence-index.mjs';import {adviseLayout} from './spatial-layout-advisor.mjs';
import {spatialEvidence} from './spatial-evidence.mjs';import {selectSpatialFrames,spatialReviewFrames} from './spatial-sampling.mjs';import {fingerprint} from './qa-motion-plan.mjs';import {inspectSpatialTrace} from './qa-spatial-trace.mjs';import {validateSpatial} from './qa-spatial.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let temp,outputDir,lease,attempt,browser;
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
 const started=Date.now();
 // Public renderer API since v3; reuse ONE browser per capture, not a second renderer.
 if(typeof renderer.openBrowser==='function')browser=await renderer.openBrowser('chrome',{browserExecutable});
 const browserOptions=browser?{puppeteerInstance:browser}:{browserExecutable};
 const composition=await renderer.selectComposition({serveUrl,id:compositionId,inputProps:props,...browserOptions});
 const captureStarted=Date.now();let stillMs=0,stillCount=0;
 const cancel=typeof renderer.makeCancelSignal==='function'?renderer.makeCancelSignal():null;
 const cancelRender=()=>cancel?.cancel();abort.signal.addEventListener('abort',cancelRender,{once:true});if(abort.signal.aborted)cancelRender();
 if(composition.width!==m.width||composition.height!==m.height||composition.fps!==m.fps||composition.durationInFrames!==end-start)throw Error('Registered composition stale; npm run sync');
 const soundFile=path.join(dir,'production/sound-cues.json'),sound=fs.existsSync(soundFile)?read('production/sound-cues.json'):null;
 const frames=selectSpatialFrames(m,n,motion,p,{full:!!opt.full,start,end,sound}),rows=[],eventFrames=new Set(spatialReviewFrames(m,n,motion,p,sound,42,{start,end}));
 const scope={start,end,compositionId,requestMode:opt.full?'full':'sample'};let environment,evidence,savedProblemFrames=0;const precision=[],testedPairs=new Set();
 const still=async(f,png,isolate=[])=>{const found=[];const stillStart=Date.now();if(abort.signal.aborted)throw Error('INCOMPLETE: capture cancelled');
  await renderer.renderStill({serveUrl,composition,inputProps:isolate.length?{...props,qaSpatialIsolation:isolate}:props,frame:f-start,output:png,imageFormat:'png',...browserOptions,...(cancel?{cancelSignal:cancel.cancelSignal}:{}),timeoutInMilliseconds:30000,onBrowserLog:log=>{const prefix='MG_SPATIAL_FRAME:';if(log.text?.startsWith(prefix)){try{const r=JSON.parse(log.text.slice(prefix.length));if(r.frame===f)found.push(r);}catch{}}}});
  stillMs+=Date.now()-stillStart;stillCount++;if(found.length!==1||found[0].fontStatus!=='loaded'||!found[0].rects.length)throw Error('INCOMPLETE: expected one settled capture at global frame '+f+'; got '+found.length);
  const row=found[0];if(row.probeVersion!==3||JSON.stringify(row.isolationIds??[])!==JSON.stringify(isolate))throw Error('INCOMPLETE: wrong probe or isolation state');if(environment&&row.browserUserAgent!==environment.browserUserAgent)throw Error('INCOMPLETE: browser changed during capture');return row;
 };
 const buildTrace=(rr,requestedFrames)=>({schemaVersion:3,narrationHash:fingerprint(n.beats),width:m.width,height:m.height,fps:m.fps,source:'Remotion renderStill browser log',evidence,environment,requestedFrames,scope,frames:rr});
 for(const f of frames){if(abort.signal.aborted)throw Error('INCOMPLETE: capture cancelled');const png=path.join(temp,'frame.png');const row=await still(f,png);
  if(!environment){environment={node:process.version,platform:process.platform,remotion:'4.0.538',browserExecutable:browserExecutable??'Remotion default',browserUserAgent:row.browserUserAgent,probeVersion:3};evidence=spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile,environment});}
  rows.push(row);const result=inspectSpatialTrace(m,n,p,buildTrace([row],[f]),{partial:true});
  if(eventFrames.has(f)||!result.ok&&savedProblemFrames<120){fs.copyFileSync(png,path.join(out,'frame-'+String(f).padStart(6,'0')+'.png'));if(!result.ok&&!eventFrames.has(f))savedProblemFrames++;}
  // Manual capture only: up to three distinct suspected text/cover pairs, 4 extra stills each.
  // Diagnostic isolation is render-only, never used for the actual trace or final MP4.
  if(!opt.noWait&&row.precisionVersion===1&&precision.length<3){for(const issue of result.issues){if(precision.length>=3)break;if(!['TEXT_FULL_COVER_GEOMETRY','TEXT_OCCLUSION_CANDIDATE','PAINT_ORDER_UNRESOLVED'].includes(issue.code))continue;const [target,cover]=issue.layers,t=p.tracks.find(t=>t.id===target),c=p.tracks.find(t=>t.id===cover),a=row.rects.find(t=>t.id===target);if(!t||!c||!a?.textVisibleBounds||!['headline','text','subtitle','vo-guide'].includes(t.role))continue;
    const related=(x,y)=>{for(let id=x.parentId;id;id=p.tracks.find(z=>z.id===id)?.parentId)if(id===y.id)return true;return false;};if(related(t,c)||related(c,t))continue;
    const key=JSON.stringify([target,cover]);if(testedPairs.has(key))continue;testedPairs.add(key);
    const folder=path.join(out,'precision-'+String(precision.length+1));fs.mkdirSync(folder);const files=['baseline','target-hidden','cover-hidden','both-hidden','baseline-repeat'].map(n=>path.join(folder,n+'.png'));fs.copyFileSync(png,files[0]);
    try{for(const [i,ids] of [[1,[target]],[2,[cover]],[3,[target,cover]],[4,[]]])await still(f,files[i],ids);precision.push({frame:f,target,cover,folder:path.basename(folder),...reviewPngFiles(files,a.textVisibleBounds)});}catch(e){if(abort.signal.aborted)throw e;precision.push({frame:f,target,cover,status:'INCOMPLETE',reason:e.message});}
   }}
  if(rows.length%20===0&&spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile,fast:true}).digest!==inputEvidence.digest)throw Error('STALE: source changed during capture');
  if(rows.length%20===0||rows.length===frames.length)console.log('[CAPTURE]',rows.length+'/'+frames.length);
 }
 if(abort.signal.aborted)throw Error('INCOMPLETE: capture cancelled');
 if(spatialEvidence(dir,{props,compositionId,mode:opt.mode,renderProfile}).digest!==inputEvidence.digest)throw Error('STALE: source changed during capture; discard results');
 abort.signal.removeEventListener('abort',cancelRender);
 const trace=buildTrace(rows,frames);
 const performanceReport={browserReuse:!!browser,frames:rows.length,elapsedMs:Date.now()-started,captureMs:Date.now()-captureStarted,stillCount,meanStillMs:stillMs/stillCount,processRssBytes:process.memoryUsage().rss,verification:'Node process RSS only, excludes Chromium child processes'};
 fs.writeFileSync(path.join(out,'performance.json'),JSON.stringify(performanceReport,null,2));
 const report=inspectSpatialTrace(m,n,p,trace);report.precisionReview=precision;report.precisionPolicy='Advisory only; never waives geometry/visibility findings';fs.writeFileSync(path.join(out,'precision-review.json'),JSON.stringify({results:precision,automaticSampling:!!opt.noWait},null,2));fs.writeFileSync(path.join(out,'trace.json'),JSON.stringify(trace));fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({...report,freshness:'CURRENT',scope:trace.scope,evidenceDigest:evidence.digest,renderProfile,environment},null,2));writeSpatialDiagnostics(out,report,trace,m);const advisor=adviseLayout(m,p,trace,report,{narration:n});fs.writeFileSync(path.join(out,'layout-advice.json'),JSON.stringify(advisor,null,2));publishEvidence(root,dir,out,trace,report,advisor);console.log('[CAPTURE]',report.status,report.checkedFrames+'/'+m.durationInFrames, out);process.exitCode=report.ok?0:1;
}catch(e){if(outputDir){const status=e.message.startsWith('STALE:')?'STALE':'INCOMPLETE';fs.writeFileSync(path.join(outputDir,'report.json'),JSON.stringify({ok:false,status,errors:[e.message],verification:'capture not completed'},null,2));try{if(attempt)publishCaptureFailure(root,attempt.dir,outputDir,attempt.inputEvidence,attempt.scope,status,e.message);}catch(indexError){console.error('[QA INDEX]',indexError.message);}}console.error('[SPATIAL CAPTURE]',e.message);process.exitCode=e.code==='QA_BUSY'?75:2;}finally{try{if(browser){try{await browser.close({silent:true});}catch(e){console.warn('[BROWSER CLOSE]',e.message);}}if(temp)fs.rmSync(temp,{recursive:true,force:true});}finally{lease?.release();process.off('SIGINT',stop);process.off('SIGTERM',stop);}}
