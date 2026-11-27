import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {inspectMotionPlan,fingerprint,validateMotionPlan,INTENTS,MOTIONS} from '../tools/qa-motion-plan.mjs';
import {validateAddon} from '../tools/validate-addon.mjs';
const fixture=()=>{
 const m={motionPlanContract:'focus-driven-v1',width:1080,height:1920,durationInFrames:60};
 const n={beats:[{scene:'S01',startFrame:0,endFrame:30,text:'Lihat folder.'},{scene:'S02',startFrame:30,endFrame:60,text:''}]};
 const pose={cx:320,cy:180,zoom:1},end={cx:360,cy:150,zoom:1.5};
 const camera={worldId:'explorer',world:{w:640,h:360},viewport:{x:80,y:300,w:920,h:900},start:pose,end,focusSamples:[{offset:0,pose,target:{x:300,y:120,w:80,h:70}}]};
 const a={beatIndex:0,intent:'detail',motion:'focus-zoom',focusTarget:'Folder',reason:'Baca label',stateIn:'Explorer terlihat',stateOut:'Folder jelas',handoff:{type:'start',reason:'Awal'},phases:{action:null,reaction:null,holdStart:20},camera,collisionPolicy:'Subtitle di luar viewport',editableTargets:['Folder']};
 const b={...structuredClone(a),beatIndex:1,intent:'pause',motion:'hold',handoff:{type:'carry',reason:'World sama'},camera:{...structuredClone(camera),start:{...end},end:{...end},focusSamples:[{offset:0,pose:{...end},target:{x:300,y:120,w:80,h:70}}]}};
 return {m,n,p:{schemaVersion:1,status:'draft',narrationHash:fingerprint(n.beats),beats:[a,b]}};
};
const inspect=f=>inspectMotionPlan(f.m,f.n,f.p);
const rejects=(change,re)=>{const f=fixture();change(f);const r=inspect(f);assert.equal(r.ok,false);assert.match(r.errors.join('\n'),re);};
test('valid plan includes silent beat and continuous camera',()=>assert.equal(inspect(fixture()).ok,true));
test('stale VO/text/timing, missing beat, duplicate timeline rejected',()=>{
 rejects(f=>f.n.beats[0].text='Changed',/narrationHash/);
 rejects(f=>{f.n.beats[1].startFrame=31;f.p.narrationHash=fingerprint(f.n.beats)},/contiguous/);
 rejects(f=>f.p.beats.pop(),/Jumlah/);rejects(f=>f.p.beats[0].startFrame=0,/duplikasi/);
});
test('bad phase order, forbidden preset, duplicate target, invalid handoff rejected',()=>{
 rejects(f=>f.p.beats[0].phases={action:12,reaction:9,holdStart:20},/action\/reaction/);
 rejects(f=>f.p.beats[0].phases={action:4,reaction:10,holdStart:9},/holdStart/);
 rejects(f=>f.p.beats[0].motion='slide-mask',/motion tidak dikenal/);
 rejects(f=>f.p.beats[0].editableTargets=['a','a'],/editableTargets/);
 rejects(f=>f.p.beats[1].handoff.type='start',/handoff/);
});
test('carry detects reset and pose mismatch, motivated cut may change camera',()=>{
 rejects(f=>f.p.beats[1].camera=null,/carry/);
 rejects(f=>f.p.beats[1].camera.start.zoom=2,/carry camera discontinuity/);
 const f=fixture();f.p.beats[1].camera=null;f.p.beats[1].handoff={type:'cut',reason:'Konteks berbeda'};assert.equal(inspect(f).ok,true);
});
test('viewport and declared target clipping checked',()=>{
 rejects(f=>f.p.beats[0].camera.viewport.y=100,/safe zone/);
 rejects(f=>f.p.beats[0].camera.focusSamples[0].target.w=1000,/target di luar world/);
 rejects(f=>{const c=f.p.beats[0].camera;c.focusSamples[0].pose={cx:0,cy:0,zoom:5};c.focusSamples[0].offset=5},/target terpotong/);
 rejects(f=>f.p.beats[0].camera.start.zoom=0,/camera pose/);
});
test('routing docs and vocabulary are consistent with validator',()=>{
 const root=new URL('../',import.meta.url);const read=p=>fs.readFileSync(new URL(p,root),'utf8');
 const matrix=read('docs/MOTION-DECISION-MATRIX.md'),vocab=read('docs/MOTION-VOCABULARY.md');
 for(const v of INTENTS)assert.ok(matrix.includes(`| ${v} |`),v);
 for(const v of MOTIONS)assert.ok(vocab.includes(`| ${v} |`),v);
 for(const p of ['docs/MOTION-DECISION-MATRIX.md','docs/MOTION-VOCABULARY.md','docs/PORTRAIT-CAMERA-STANDARD.md','docs/MOTION-PLAN-CONTRACT.md'])assert.ok(read('CHATGPT-READ-FIRST.md').includes(p),p);
});
test('strict add-on gate opt-in; legacy remains accepted; read-only',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-motion-'));
 try{
  const dir=path.join(root,'motion-sample');for(const p of ['src/config','src/scenes','src/components','src/animations','production'])fs.mkdirSync(path.join(dir,p),{recursive:true});
  const f=fixture();const m={...f.m,contractVersion:'1.0.0',id:'MotionSample',slug:'motion-sample',title:'Sample',entry:'src/Video.tsx',exportName:'Video',fps:30,defaultProps:{}};
  const write=(p,v)=>fs.writeFileSync(path.join(dir,p),JSON.stringify(v));
  fs.writeFileSync(path.join(root,'package.json'),'{}');fs.writeFileSync(path.join(dir,'src/Video.tsx'),'export const Video = () => null;');
  for(const p of ['README.md','PANDUAN-EDIT-ASSET.md'])fs.writeFileSync(path.join(dir,p),'fixture');
  write('motiongraphic-video.json',m);write('src/config/narration.json',f.n);write('production/motion-plan.json',f.p);
  assert.equal(validateMotionPlan(dir).ok,true);assert.equal(validateAddon(dir,{root,strict:true}).ok,true);
  const before=fs.readFileSync(path.join(dir,'production/motion-plan.json'));validateMotionPlan(dir);assert.deepEqual(fs.readFileSync(path.join(dir,'production/motion-plan.json')),before);
  fs.rmSync(path.join(dir,'production/motion-plan.json'));assert.equal(validateAddon(dir,{root,strict:true}).ok,false);assert.equal(validateAddon(dir,{root,strict:false}).ok,true);
  delete m.motionPlanContract;write('motiongraphic-video.json',m);assert.equal(validateAddon(dir,{root,strict:true}).ok,true);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
