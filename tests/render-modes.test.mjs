import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT,readCatalog} from '../tools/menu-helper.mjs';
import {listScenes,makeRenderPlan,resolveMode} from '../tools/render-plan.mjs';

const videos=readCatalog().videos;
const ip=videos.find(v=>v.id==='IPAddressReels');
const windows=videos.find(v=>v.id==='WindowsHacks5ShortcutLengkap');

test('existing projects have correct scene count and no skipped frame',()=>{
 assert.equal(listScenes(ip).length,5);
 assert.equal(listScenes(windows).length,7);
 assert.deepEqual(makeRenderPlan(ip,'full').map(v=>v.id),['IPAddressReels']);
 assert.deepEqual(makeRenderPlan(ip,'scene','3').map(v=>v.id),['IPAddress-03-IPv4']);
 assert.deepEqual(makeRenderPlan(windows,'scene','WinHacks-04-Win-E').map(v=>v.id),['WinHacks-04-Win-E']);
 assert.deepEqual(makeRenderPlan(ip,'selected','1,3,5').map(v=>v.id),['IPAddress-01-Hook','IPAddress-03-IPv4','IPAddress-05-CTA']);
 assert.deepEqual(makeRenderPlan(ip,'all').map(v=>v.id),ip.segments.map(s=>s.id));
 assert.equal(resolveMode('4'),'all');
});

test('invalid scene choices fail safely rather than silently render the wrong scene',()=>{
 for(const value of ['', '0','6','-1','1,,3','1,1','no-scene','1,3']){
  assert.throws(()=>makeRenderPlan(ip,'scene',value));
 }
 for(const value of ['', '1,1','1,9','1,,3','99'])assert.throws(()=>makeRenderPlan(ip,'selected',value));
 assert.throws(()=>makeRenderPlan(ip,'full','1'));
 assert.throws(()=>makeRenderPlan(ip,'all','1'));
 assert.throws(()=>makeRenderPlan(ip,'garbage'));
 const noSegments={...ip,segments:[]};
 assert.deepEqual(makeRenderPlan(noSegments,'full').map(v=>v.id),[ip.id]);
 assert.throws(()=>makeRenderPlan(noSegments,'all'),/belum memiliki scene/);
 assert.throws(()=>listScenes({...ip,segments:[{...ip.segments[0],durationInFrames:91},...ip.segments.slice(1)]}),/Timing scene/);
});

test('new generator organizes Remotion UI into Full-Video and Scenes without changing IDs',()=>{
 const generator=fs.readFileSync(path.join(ROOT,'tools','sync-projects.mjs'),'utf8');
 assert.match(generator,/Folder name="Full-Video"/);
 assert.match(generator,/Folder name="Scenes"/);
 assert.match(generator,/sceneParts\.length/);
});

function fixture(){
 const home=fs.mkdtempSync(path.join(os.tmpdir(),'mg-render-fixture-'));
 const root=path.join(home,'MotionGraphic-Studio');
 for(const folder of ['tools','library','node_modules/@remotion/cli'])fs.mkdirSync(path.join(root,folder),{recursive:true});
 for(const filename of ['render-menu.mjs','render-plan.mjs','menu-helper.mjs','render-progress.mjs','export-paths.mjs']){
  fs.copyFileSync(path.join(ROOT,'tools',filename),path.join(root,'tools',filename));
 }
 const project={id:'DemoVideo',slug:'demo',title:'Demo Video',width:720,height:1280,fps:30,durationInFrames:9,
  segments:[
   {id:'Demo-01',title:'01 Hook',startFrame:0,durationInFrames:3},
   {id:'Demo-02',title:'02 Main',startFrame:3,durationInFrames:3},
   {id:'Demo-03',title:'03 CTA',startFrame:6,durationInFrames:3},
  ]};
 fs.writeFileSync(path.join(root,'library/catalog.json'),JSON.stringify({videos:[project]}));
 const cli=path.join(root,'node_modules/@remotion/cli/remotion-cli.js');
 fs.writeFileSync(cli,`const fs=require('node:fs'); const path=require('node:path');
const id=process.argv[4],target=process.argv[5];
if(process.env.MG_TEST_FAIL===id){console.error('FAKE_RENDER_FAILED '+id);process.exit(17)}
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.from('TEST_MP4_'+id)]));
console.log('Rendered 3/3');
`);
 const run=(...args)=>spawnSync(process.execPath,[path.join(root,'tools/render-menu.mjs'),...args],{cwd:root,encoding:'utf8',timeout:10000,env:{...process.env,MG_TEST_FAIL:''}});
 return {home,root,run,project};
}

test('CLI dry-run: no output, correct composition IDs, validates flags',()=>{
 const x=fixture();try{
  const result=x.run('DemoVideo','--mode','selected','--scenes','1,3','--dry-run');
  assert.equal(result.status,0,result.stderr+'\n'+result.stdout);
  assert.match(result.stdout,/Demo-01/);assert.match(result.stdout,/Demo-03/);
  assert.doesNotMatch(result.stdout,/Demo-02/);
  assert.equal(fs.existsSync(path.join(x.home,'MotionGraphic-Studio-Backups')),false);
  const invalid=x.run('DemoVideo','--mode','selected','--scene','1');
  assert.notEqual(invalid.status,0);
  assert.match(invalid.stderr,/Mode selected harus memakai --scenes/);
 }finally{fs.rmSync(x.home,{recursive:true,force:true})}
});

test('CLI renders full, single, selected, and all with separated MP4/log folders',()=>{
 const x=fixture();try{
  for(const args of [
   ['DemoVideo'],['DemoVideo','--mode','scene','--scene','2'],
   ['DemoVideo','--mode','selected','--scenes','1,3'],
   ['DemoVideo','--mode','all'],
  ]){
   const result=x.run(...args);
   assert.equal(result.status,0,result.stderr+'\n'+result.stdout);
  }
  const base=path.join(x.home,'MotionGraphic-Studio-Backups');
  const mp4=path.join(base,'MP4/demo');
  assert.equal(fs.readdirSync(path.join(mp4,'full')).length,1);
  assert.equal(fs.readdirSync(path.join(mp4,'scenes')).length,4);
  assert.equal(fs.readdirSync(path.join(mp4,'selected-scenes')).length,2);
  assert.equal(fs.readdirSync(path.join(base,'Logs/Render/demo')).length,7);
  for(const location of ['full','scenes','selected-scenes']){
   for(const filename of fs.readdirSync(path.join(mp4,location))){
    assert.ok(fs.statSync(path.join(mp4,location,filename)).size>0);
   }
  }
 }finally{fs.rmSync(x.home,{recursive:true,force:true})}
});

test('batch stops on a failed composition, retains earlier MP4 and records error log',()=>{
 const x=fixture();try{
  const result=spawnSync(process.execPath,[path.join(x.root,'tools/render-menu.mjs'),'DemoVideo','--mode','all'],{
   cwd:x.root,encoding:'utf8',env:{...process.env,MG_TEST_FAIL:'Demo-02'},timeout:45000,
  });
  assert.equal(result.status,17,result.stderr+'\n'+result.stdout);
  assert.match(result.stderr,/BATCH TERHENTI/);
  assert.equal(fs.readdirSync(path.join(x.home,'MotionGraphic-Studio-Backups/MP4/demo/scenes')).length,1);
  assert.equal(fs.readdirSync(path.join(x.home,'MotionGraphic-Studio-Backups/Logs/Render/demo')).length,2);
 }finally{fs.rmSync(x.home,{recursive:true,force:true})}
});
