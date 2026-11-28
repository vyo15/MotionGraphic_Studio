#!/usr/bin/env node
/** Optional, disposable staging pilot. Never overwrites or installs an active video. */
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {spawnSync} from 'node:child_process';import {randomUUID} from 'node:crypto';import {fileURLToPath,pathToFileURL} from 'node:url';import {validateAddon} from './validate-addon.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),slug='spatial-qa-pilot',id='SpatialQaPilot';
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));const write=(f,v)=>fs.writeFileSync(f,JSON.stringify(v,null,2)+'\n');
function replace(file,old,next){const s=fs.readFileSync(file,'utf8');if(s.split(old).length!==2)throw Error('Pilot source mismatch '+path.basename(file));fs.writeFileSync(file,s.replace(old,next));}
export function instrumentPilot(dir){
 const p=path.join(dir,'production/spatial-plan.json'),plan=read(p),mfile=path.join(dir,'motiongraphic-video.json'),m=read(mfile),bfile=path.join(dir,'production/editable-blueprint.json'),blueprint=read(bfile),sfile=path.join(dir,'production/sound-cues.json'),sound=read(sfile);
 if(m.productionStage!=='draft'||plan.tracks.some(t=>t.id==='Pilot — Cursor'))throw Error('Pilot requires fresh starter draft');
 const scene=i=>path.join(dir,'src/scenes/Scene0'+i+'.tsx');
 for(const f of ['Video.tsx','SegmentVideo.tsx']){const q=path.join(dir,'src',f);replace(q,'qaSpatialCapture?:boolean;','qaPilotFault?:string;qaSpatialCapture?:boolean;');for(let i=1;i<=4;i++)replace(q,`<Scene0${i} showSubtitles={p.showSubtitles}/>`,`<Scene0${i} showSubtitles={p.showSubtitles} fault={p.qaPilotFault}/>`);}
 for(let i=1;i<=4;i++)replace(scene(i),'React.FC<{showSubtitles?:boolean}> = ({showSubtitles=true})','React.FC<{showSubtitles?:boolean;fault?:string}> = ({showSubtitles=true,fault=\'none\'})');
 replace(scene(1),'top:565,width:800,height:210','top:565,width:fault===\'overflow\'?160:800,height:210,whiteSpace:fault===\'overflow\'?\'nowrap\':\'normal\'');
 replace(scene(3),'top:570,width:800,height:310','top:fault===\'guide\'?1380:570,width:800,height:310');
 replace(scene(4),'name="S04 — Windows" data-qa-track="S04 — Windows" style={{position:\'absolute\',left:420,top:850,width:200,height:200,opacity: interpolate(frame,[42,58],[0,1],CLAMP),translate:\'0px 0px\',scale:1,rotate:\'0deg\',}}','name="S04 — Windows" data-qa-track="S04 — Windows" style={{position:\'absolute\',left:420,top:850,width:200,height:200,opacity: interpolate(frame,[42,58],[0,1],CLAMP),translate:fault===\'anchor\'&&frame>=80?\'80px 0px\':fault===\'occlusion\'&&frame>=80?\'0px -240px\':\'0px 0px\',scale:fault===\'occlusion\'&&frame>=80?2.5:1,rotate:\'0deg\',}}');
 replace(scene(2),"import {WindowsMark} from '../components/VisualGlyphs';","import {WindowsMark,CursorGlyph} from '../components/VisualGlyphs';");
 replace(scene(2),'name="S02 — Run input" data-qa-track="S02 — Run input"','name="S02 — Run input" data-qa-track="S02 — Run input" data-qa-state={frame<118?\'idle\':\'focused\'}');
 replace(scene(2),"border:'2px solid #888888'","border:frame>=118?'3px solid #202020':'2px solid #888888'");
 const cursor=`    {frame>=100&&frame<132?<Interactive.Div name="Pilot — Cursor" data-qa-track="Pilot — Cursor" data-qa-action={frame===116?'PilotClickInput':undefined} style={{position:'absolute',left:450,top:893,width:34,height:44,translate:fault==='cursor'?'410px 0px':\`0px \${interpolate(frame,[100,116],[47,0],CLAMP)}px\`,scale:1,rotate:'0deg',pointerEvents:'none'}}><CursorGlyph/><span data-qa-hotspot="1" style={{position:'absolute',left:1,top:1,width:2,height:2,opacity:0}}/></Interactive.Div>:null}\n`;
 replace(scene(2),'    {showSubtitles && frame>=0',cursor+'    {showSubtitles && frame>=0');
 const name='Pilot — Cursor',parent='S02 — Run window',target='S02 — Run input',r=(frame,y)=>({frame,value:{x:450,y,w:34,h:44}});
 plan.tracks.push({id:name,nativeName:name,native:true,role:'cursor',space:'screen',protected:false,visibility:'visible',parentId:parent,containment:'inside',source:'src/scenes/Scene02.tsx',start:190,end:222,keys:[r(190,940),r(206,893),r(221,893)]});
 plan.allowedOverlaps.push({a:parent,b:name,type:'containment',startFrame:190,endFrame:222,reason:'Pilot cursor inside Run window'},{a:target,b:name,type:'interaction',startFrame:190,endFrame:222,reason:'Pilot focus input'});
 plan.interactions.push({id:'PilotClickInput',type:'click',cursorId:name,targetId:target,frame:206,requireActionMarker:true,soundCueId:'pilot-click-omit',response:{layerId:target,startFrame:208,endFrame:222,state:'visible',beforeState:'visible',value:'focused'}});
 plan.riskWindows=[...(plan.riskWindows??[]),{start:190,end:222,step:1,reason:'Pilot cursor and response'},{start:528,end:535,step:1,reason:'Pilot anchor/occlusion fault boundary'}];
 blueprint.nativeVisualTargets.push({name,source:'src/scenes/Scene02.tsx'});
 sound.cues.push({id:'pilot-click-omit',scene:'S02',action:'Diagnostic focus input',startFrame:206,impactFrame:206,endFrame:206,status:'omit',reason:'Pilot focus only; no approved recorded mouse cue'});
 m.defaultProps.qaPilotFault='none';write(p,plan);write(mfile,m);write(bfile,blueprint);write(sfile,sound);
 fs.writeFileSync(path.join(dir,'PILOT-QA.md'),'# Spatial QA pilot — DRAFT / not for publication\n\n20s, 4 starter scenes, 5 fault scenarios. Use menu 17 to capture baseline, then faults. No real VO or ACC. Native Save/reload must be tested manually in dev. Do not mark this diagnostic draft review/final.\n');
 return dir;
}
const faults={overflow:{segment:0,codes:['TEXT_OVERFLOW','TEXT_CLIP','TEXT_LINE_CLIP']},cursor:{segment:1,codes:['CURSOR_TARGET_MISS']},guide:{segment:2,codes:['DESIGN_CLIP','VO_GUIDE_GAP','OVERLAP']},anchor:{segment:3,codes:['OBJECT_ANCHOR_DRIFT']},occlusion:{segment:3,codes:['OVERLAP','TEXT_OCCLUSION_CANDIDATE','PAINT_ORDER_UNRESOLVED','TEXT_FULL_COVER_GEOMETRY','OBJECT_HEADLINE_GAP']}};
const run=(tool,args)=>spawnSync(process.execPath,[path.join(ROOT,'tools',tool),...args],{cwd:ROOT,stdio:'inherit',windowsHide:true});
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{
 const [mode,fault]=process.argv.slice(2);
 if(mode==='--stage'){
  const stage=path.join(ROOT,'exports/file-change-only',slug),active=path.join(ROOT,'projects',slug);if(fs.existsSync(stage)||fs.existsSync(active))throw Error('Pilot already staged/active; no overwrite');
  if(run('scaffold-addon.mjs',[slug,id,'Spatial QA Pilot — DRAFT']).status!==0)throw Error('Scaffold failed');
  try{const dir=instrumentPilot(path.join(stage,'projects',slug)),v=validateAddon(dir,{root:ROOT,strict:true,syntax:true});if(!v.ok)throw Error(v.errors.join('; '));console.log('[PILOT STAGED] '+stage+' — copy projects/ to Master only if you want to register pilot; dev syncs.');}catch(e){fs.rmSync(stage,{recursive:true,force:true});throw e;}
 }else if(mode==='--fault'&&Object.hasOwn(faults,fault)){
  const dir=path.join(ROOT,'projects',slug),m=read(path.join(dir,'motiongraphic-video.json'));if(m.id!==id||m.productionStage!=='draft'||!Object.hasOwn(m.defaultProps,'qaPilotFault'))throw Error('Only the generated diagnostic draft may run faults');
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-pilot-props-')),props=path.join(temp,'props.json'),out=path.join(ROOT,'qa-out',slug,'fault-'+fault+'-'+randomUUID());
  try{write(props,{qaPilotFault:fault});run('capture-spatial.mjs',[dir,'--segment',m.segments[faults[fault].segment].id,'--props',props,'--out',out]);const report=read(path.join(out,'report.json'));const found=(report.issues??[]).some(i=>faults[fault].codes.includes(i.code));console.log('[PILOT FAULT]',fault,found?'EXPECTED_ISSUE_FOUND':'NOT_VERIFIED',out);process.exitCode=found?0:2;}finally{fs.rmSync(temp,{recursive:true,force:true});}
 }else throw Error('Use --stage or --fault overflow|cursor|guide|anchor|occlusion');
}catch(e){console.error('[PILOT]',e.message);process.exitCode=2;}}
