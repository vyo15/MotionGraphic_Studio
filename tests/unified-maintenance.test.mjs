import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('one maintained flow and compact history, both reachable from onboarding',()=>{
 const doc=read('PRODUCTION-RULES.md');
 const headings=[...doc.split('## 2. Flow tunggal')[1].split('## 3.')[0].matchAll(/^(\d+)\. \*\*(.+?):\*\*/gm)];
 const r=spawnSync(process.execPath,[path.join(root,'tools/project-flow.mjs'),'--steps'],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);assert.equal(headings.length,7);
 for(const h of headings)assert.ok(r.stdout.includes(`${h[1].padStart(2,'0')}. ${h[2]}`));
 assert.match(read('CHATGPT-READ-FIRST.md'),/CHATGPT-HISTORY\.md/);
 assert.ok(read('CHATGPT-HISTORY.md').split('\n').length<=60);
 assert.match(read('tools/zip-video.mjs'),/CHATGPT-HISTORY\.md/);
});
test('merged AST audit preserves v2 inline and v3/v4 direct text policies',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mg-unified-edit-'));
 try{
  fs.mkdirSync(path.join(tmp,'tools'));fs.mkdirSync(path.join(tmp,'projects','demo','src'),{recursive:true});
  const tool=path.join(tmp,'tools','check-direct-studio-text.mjs');fs.copyFileSync(path.join(root,'tools','check-direct-studio-text.mjs'),tool);
  const project=path.join(tmp,'projects','demo');
  const tsModule=createRequire(import.meta.url).resolve('typescript');
  const nodePath=path.dirname(path.dirname(path.dirname(tsModule)));
  const run=(contract,source)=>{
   fs.writeFileSync(path.join(project,'motiongraphic-video.json'),JSON.stringify({title:'Demo',editableContract:contract}));
   fs.writeFileSync(path.join(project,'src','Video.tsx'),source);
   return spawnSync(process.execPath,[tool],{encoding:'utf8',env:{...process.env,NODE_PATH:[nodePath,process.env.NODE_PATH].filter(Boolean).join(path.delimiter)}});
  };
  for(const c of ['studio-inline-v2','studio-direct-v3','studio-direct-v4']){
   assert.equal(run(c,'<Interactive.Div name="Judul" style={{...computed}}>A</Interactive.Div>').status,1,c);
   assert.equal(run(c,'<Interactive.Div name="Judul" style={{translate:0,scale:1,rotate:0}}>A</Interactive.Div>').status,0,c);
  }
  assert.equal(run('studio-inline-v2','<Interactive.Div name="Judul" style={{}}>{value}</Interactive.Div>').status,0);
  for(const c of ['studio-direct-v3','studio-direct-v4'])assert.equal(run(c,'<Interactive.Div name="Judul" style={{}}>{value}</Interactive.Div>').status,1,c);
  assert.equal(run('legacy','<Interactive.Div name="Judul" style={computed}>{value}</Interactive.Div>').status,0);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});
