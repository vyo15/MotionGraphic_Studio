import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {registerMissingSceneSegments} from '../tools/register-scene-segments.mjs';
import {startAutoSync} from '../tools/auto-sync-watch.mjs';

const fixture=()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'motion-auto-scene-'));
 fs.mkdirSync(path.join(root,'projects'),{recursive:true});
 return root;
};
function add(root,slug,extra={},entry='export const Video = () => null;'){
 const dir=path.join(root,'projects',slug);fs.mkdirSync(path.join(dir,'src'),{recursive:true});
 const m={id:'Test'+slug.replace(/[^a-z0-9]/gi,''),slug,title:'Demo '+slug,entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{color:'#123456',sceneEditor:{hello:1}},...extra};
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify(m,null,2));
 fs.writeFileSync(path.join(dir,'src/Video.tsx'),entry);
 return dir;
}
const manifest=(root,slug)=>JSON.parse(fs.readFileSync(path.join(root,'projects',slug,'motiongraphic-video.json'),'utf8'));

test('new config/segments.json is automatically registered with preserved Props',()=>{
 const root=fixture();try{
  const dir=add(root,'auto-json');fs.mkdirSync(path.join(dir,'src/config'),{recursive:true});
  fs.writeFileSync(path.join(dir,'src/config/segments.json'),JSON.stringify([
   {title:'01 — Hook',startFrame:0,durationInFrames:30},{title:'02 — Demo',startFrame:30,durationInFrames:60}
  ]));
  assert.equal(registerMissingSceneSegments(root),1);
  const m=manifest(root,'auto-json');assert.equal(m.segments.length,2);assert.equal(m.segments[1].startFrame,30);
  assert.equal(m.defaultProps.sceneEditor.hello,1);
  const first=JSON.stringify(m);assert.equal(registerMissingSceneSegments(root),0);assert.equal(JSON.stringify(manifest(root,'auto-json')),first);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('TS config literal array (keys not quoted) is supported',()=>{
 const root=fixture();try{
  const dir=add(root,'auto-ts');fs.mkdirSync(path.join(dir,'src/config'),{recursive:true});
  fs.writeFileSync(path.join(dir,'src/config/segments.ts'),`export const SEGMENTS = [
   {title: 'Hook', startFrame: 0, durationInFrames: 45},
   {title: 'CTA', startFrame: 45, durationInFrames: 45},
  ] as const;`);
  assert.equal(registerMissingSceneSegments(root),1);
  assert.equal(manifest(root,'auto-ts').segments[1].title,'CTA');
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('inline Sequence timing is detected when exactly covering the video',()=>{
 const root=fixture();try{
  add(root,'inline-demo',{},`import {Sequence} from 'remotion'; export const Video=()=> <>
   <Sequence name="Hook" from={0} durationInFrames={30}><div/></Sequence>
   <Sequence from={30} durationInFrames={60} name="Demo"><div/></Sequence>
  </>;`);
  assert.equal(registerMissingSceneSegments(root),1);
  assert.deepEqual(manifest(root,'inline-demo').segments.map(s=>s.durationInFrames),[30,60]);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('ambiguous overlapping Sequence effects are not mistaken for scenes',()=>{
 const root=fixture();try{
  add(root,'ambiguous',{},`import {Sequence} from 'remotion'; export const Video=()=> <>
   <Sequence from={0} durationInFrames={90}><div/></Sequence>
   <Sequence from={30} durationInFrames={20}><div/></Sequence>
  </>;`);
  assert.equal(registerMissingSceneSegments(root),0);
  assert.equal(manifest(root,'ambiguous').segments,undefined);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('existing segments and all manual Props remain untouched',()=>{
 const root=fixture();try{
  const custom=[{id:'KeepA',title:'Hook',startFrame:0,durationInFrames:30},{id:'KeepB',title:'Demo',startFrame:30,durationInFrames:60}];
  const dir=add(root,'existing',{segments:custom});
  const before=fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8');
  assert.equal(registerMissingSceneSegments(root),0);
  assert.equal(fs.readFileSync(path.join(dir,'motiongraphic-video.json'),'utf8'),before);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('live watcher registers an added project without calling npm run sync',async()=>{
 const root=fixture();try{
  let notified=0;
  const watcher=startAutoSync({root,debounceMs:55,pollMs:150,runImport:async()=>{},runSync:async()=>{notified++;registerMissingSceneSegments(root)}});
  try{
   const dir=add(root,'live-demo',{},`import {Sequence} from 'remotion';export const Video=()=> <>
    <Sequence name="Hook" from={0} durationInFrames={30}><div/></Sequence>
    <Sequence name="Demo" from={30} durationInFrames={60}><div/></Sequence>
    </>;`);
   const deadline=Date.now()+2500;
   while((!fs.existsSync(path.join(dir,'motiongraphic-video.json'))||!manifest(root,'live-demo').segments)&&Date.now()<deadline)await new Promise(r=>setTimeout(r,45));
   assert.ok(notified>0,'watcher did not run sync');
   assert.equal(manifest(root,'live-demo').segments.length,2);
  }finally{watcher.close()}
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('timeline config TS is detected without authoring manifest segments',()=>{
 const root=fixture();try{
  const dir=add(root,'timeline-test');fs.mkdirSync(path.join(dir,'src/config'),{recursive:true});
  fs.writeFileSync(path.join(dir,'src/config/series.ts'),`export const TIMELINE = [
   {key:'HOOK',start:0,frames:30,end:30},
   {key:'DEMO',start:30,frames:60,end:90},
  ] as const;`);
  assert.equal(registerMissingSceneSegments(root),1);
  assert.equal(manifest(root,'timeline-test').segments[1].startFrame,30);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('scene constants with overlapping transitions preserve timeline frames',()=>{
 const root=fixture();try{
  add(root,'scene-const',{},`import {Sequence} from 'remotion';
   const SCENE_1 = {from: 0, duration: 45};
   const SCENE_2 = {from: 40, duration: 50};
   export const Video=()=> <>
     <Sequence from={SCENE_1.from} durationInFrames={SCENE_1.duration}><div/></Sequence>
     <Sequence from={SCENE_2.from} durationInFrames={SCENE_2.duration}><div/></Sequence>
   </>;`);
  assert.equal(registerMissingSceneSegments(root),1);
  assert.deepEqual(manifest(root,'scene-const').segments.map(s=>s.durationInFrames),[40,50]);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('ZIP inbox watcher waits for a complete stable ZIP before import',async()=>{
 const root=fixture();try{
  const inbox=path.join(root,'library/masuk');fs.mkdirSync(inbox,{recursive:true});
  const destination=path.join(inbox,'video-addon.zip');
  let count=0;
  const watcher=startAutoSync({root,debounceMs:45,pollMs:65,zipAgeMs:110,
    runImport:async()=>{count++;fs.renameSync(destination,destination+'.done')},runSync:async()=>{}});
  try{
   fs.writeFileSync(destination,Buffer.from('PK\x03\x04')); // header only = not a completed zip
   await new Promise(r=>setTimeout(r,230));
   assert.equal(count,0,'Must not import partially copied ZIP');
   const eocd=Buffer.alloc(22);eocd.writeUInt32LE(0x06054b50,0);
   fs.writeFileSync(destination,eocd);
   const deadline=Date.now()+1400;
   while(count===0&&Date.now()<deadline)await new Promise(r=>setTimeout(r,50));
   assert.equal(count,1,'Completed ZIP should import automatically');
  }finally{watcher.close()}
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
