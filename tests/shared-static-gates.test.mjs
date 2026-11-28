import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {staticGatePlan,STATIC_GATES} from '../tools/studio-preflight.mjs';

test('startup, handoff and maintenance share the static gate plan; review only gets production gate',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-shared-gates-'));
 try{
  for(const [slug,stage] of [['draft','draft'],['review','review'],['legacy',undefined],['_hidden','review']]){
   const d=path.join(root,'projects',slug);fs.mkdirSync(d,{recursive:true});
   fs.writeFileSync(path.join(d,'motiongraphic-video.json'),JSON.stringify({productionStage:stage}));
  }
  const {gates,drafts}=staticGatePlan(root);
  assert.deepEqual(gates.slice(0,STATIC_GATES.length).map(g=>[g.label,g.script]),STATIC_GATES);
  assert.deepEqual(gates.slice(STATIC_GATES.length),[{label:'Production gate review',script:'validate-addon.mjs',args:[path.join(root,'projects','review'),'--production','--syntax']}]);
  assert.deepEqual(drafts,['draft']);
  assert.equal(new Set(gates.map(g=>JSON.stringify([g.script,g.args]))).size,gates.length);
  const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));
  assert.equal(pkg.scripts.check,pkg.scripts.qa);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});

test('full gate extends daily gate without duplicating production checks',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'mg-full-gates-'));
 try{
  for(const [slug,stage] of [['draft','draft'],['review','review'],['legacy',undefined]]){
   const d=path.join(root,'projects',slug);fs.mkdirSync(path.join(d,'production'),{recursive:true});
   fs.writeFileSync(path.join(d,'motiongraphic-video.json'),JSON.stringify({productionStage:stage}));
   fs.writeFileSync(path.join(d,'production/spatial-plan.json'),'{}');
  }
  const daily=staticGatePlan(root),full=staticGatePlan(root,{full:true});
  assert.deepEqual(full.gates.slice(0,daily.gates.length),daily.gates);
  assert.ok(full.gates.some(x=>x.script==='sfx-local.mjs'&&x.args[0]==='verify'));
  assert.ok(full.gates.some(x=>x.script==='scene-approval-board.mjs'&&x.args.includes('--check')));
  assert.equal(full.gates.filter(x=>x.script==='qa-sound-cues.mjs').length,2);
  assert.equal(full.gates.filter(x=>x.script==='qa-spatial.mjs').length,2);
  assert.equal(new Set(full.gates.map(x=>JSON.stringify([x.script,x.args]))).size,full.gates.length);
 }finally{fs.rmSync(root,{recursive:true,force:true})}
});
