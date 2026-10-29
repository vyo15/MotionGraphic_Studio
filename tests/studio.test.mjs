import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {randomBytes} from 'node:crypto';
import {ROOT,readCatalog} from '../tools/menu-helper.mjs';
import {applyEdit,changeHistory,historyStatus} from '../tools/studio-history.mjs';
import {exportPaths} from '../tools/export-paths.mjs';
import {checkQuality} from '../tools/studio-quality.mjs';

const slug='test-studio-'+randomBytes(6).toString('hex');
const temp=path.join(ROOT,'projects',slug);
const source=path.join(temp,'src','Video.tsx');
const historyFile=path.join(exportPaths().root,'Editor-History',slug+'.json');
fs.mkdirSync(path.dirname(source),{recursive:true});
fs.writeFileSync(source,'initial');
fs.writeFileSync(path.join(temp,'motiongraphic-video.json'),JSON.stringify({id:'TestStudioX',slug,title:'Test Studio',entry:'src/Video.tsx',exportName:'Video',width:1080,height:1920,fps:30,durationInFrames:90,defaultProps:{}},null,2));
process.on('exit',()=>{try{fs.rmSync(temp,{recursive:true,force:true});fs.rmSync(historyFile,{force:true})}catch{}});

test('original projects remain in the master',()=>{
 const projects=readCatalog().videos;
 assert.deepEqual(projects.map(v=>v.slug).sort(),['ip-address','windows-hacks-5-shortcut-lengkap']);
 assert.equal(projects.find(v=>v.slug==='ip-address').id,'IPAddressReels');
 assert.equal(projects.find(v=>v.slug.startsWith('windows')).durationInFrames,2205);
});
test('transaction history keeps all edit steps, undo, redo, and detects external modifications',()=>{
 applyEdit(slug,[{file:source,before:'initial',after:'first'}]);
 applyEdit(slug,[{file:source,before:'first',after:'second'}]);
 assert.equal(historyStatus(slug).undo,2);
 changeHistory(slug,'undo');assert.equal(fs.readFileSync(source,'utf8'),'first');
 changeHistory(slug,'undo');assert.equal(fs.readFileSync(source,'utf8'),'initial');
 changeHistory(slug,'redo');assert.equal(fs.readFileSync(source,'utf8'),'first');
 assert.equal(historyStatus(slug).redo,1);
 fs.writeFileSync(source,'external change');
 assert.throws(()=>changeHistory(slug,'undo'),/berubah dari editor lain/);
 assert.equal(fs.readFileSync(source,'utf8'),'external change');
});
test('QA detects injected overflow and overlap with timecode',()=>{
 fs.writeFileSync(source,`import React from 'react';import {Interactive} from 'remotion';export const Video=()=> <><Interactive.Div name="A" style={{position:'absolute',left:980,top:200,width:200,height:150}}>A</Interactive.Div><Interactive.Div name="B" style={{position:'absolute',left:990,top:210,width:220,height:170}}>B</Interactive.Div></>`);
 const qa=checkQuality(slug);
 assert.ok(qa.issues.some(x=>x.code==='offscreen'));
 assert.ok(qa.issues.some(x=>x.code==='overlap'));
 assert.deepEqual(qa.summary.framesToReview,[0,45,89]);
});
test('output package has stable source audio references',()=>{
 for(const slug of ['ip-address','windows-hacks-5-shortcut-lengkap']){
  const m=JSON.parse(fs.readFileSync(path.join(ROOT,'projects',slug,'motiongraphic-video.json'),'utf8'));
  assert.ok(m.defaultProps.audioTimeline.length>=1);
  for(const track of m.defaultProps.audioTimeline){assert.equal(track.enabled,false);if(track.src)assert.ok(fs.existsSync(path.join(ROOT,'projects',slug,'public',track.src)));}
 }
});
