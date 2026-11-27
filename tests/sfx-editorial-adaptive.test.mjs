import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {checkSoundCues} from '../tools/qa-sound-cues.mjs';
import {stripTypeScriptTypes} from 'node:module';
const {typingFrames,visibleCount}=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(fs.readFileSync(new URL('../templates/sound-cue-track/SoundTyping.ts',import.meta.url),'utf8'))).toString('base64'));
const project=path.resolve('projects/sharing-printer-lan');
const json=(dir,p)=>JSON.parse(fs.readFileSync(path.join(dir,p),'utf8'));
const installed=fs.existsSync(project);
const doc=installed?json(project,'production/sound-cues.json'):null;
const manifest=installed?json(project,'motiongraphic-video.json'):null;
const rules=doc?.cues.filter(c=>c.typing)??[];
test('adaptive rate uses actual visible character frames; empty text stays silent',()=>{
 const r={prop:'x',mode:'rate',originFrame:606,localStart:84,localEnd:166,startSeconds:3.27,charsPerSecond:9};
 assert.equal(typingFrames(r,'control',30).length,7);assert.deepEqual(typingFrames(r,'',30),[]);
 assert.equal(typingFrames(r,'a',30)[0],708);assert.equal(typingFrames(r,'a'.repeat(100),30).length,20);
});
test('adaptive offsets only sound when visible text grows, not every offset',()=>{
 const r={prop:'x',mode:'offsets',originFrame:100,localStart:5,localEnd:15,offsets:[0,4,8]};
 assert.deepEqual(typingFrames(r,'x',30),[113]);assert.deepEqual(typingFrames(r,'abc',30),[105,109,113]);
 assert.deepEqual(typingFrames(r,'abcdefghijk',30),[105,109,113]);
});
test('adaptive round emits at most one tap per frame and follows final reveal',()=>{
 const r={prop:'x',mode:'round',originFrame:100,localStart:10,localEnd:20};
 assert.equal(visibleCount(r,'abcd',20,30),4);assert.equal(typingFrames(r,'abcd',30).length,4);
 assert.deepEqual(typingFrames(r,'',30),[]);assert.equal(typingFrames(r,'a'.repeat(100),30).length,10);
});
test('printer rules reproduce existing visual formulas and default/edited/empty Props; full vs segment timing', {skip:!installed},()=>{
 assert.equal(rules.length,3);
 const t5=json(project,'src/config/scene05-timing.json'),t7=json(project,'src/config/scene07-timing.json');
 assert.deepEqual(rules.find(c=>c.typing.mode==='offsets').typing.offsets,t5.typingOffsets);
 const r7=rules.find(c=>c.typing.mode==='round').typing;assert.equal(r7.localStart,t7.typeStart);assert.equal(r7.localEnd,t7.typeEnd);
 for(const c of rules){const r=c.typing;for(const text of [manifest.defaultProps[r.prop],'x','', '1234567890'.repeat(10)]){
   const count=f=>f<r.localStart?0:r.mode==='rate'?text.slice(0,Math.max(0,Math.floor((f/30-3.27)*9))).length:r.mode==='offsets'?text.slice(0,Math.floor(text.length*t5.typingOffsets.filter(n=>f>=t5.actions.type+n).length/t5.typingOffsets.length)).length:text.slice(0,Math.round(text.length*Math.min(1,Math.max(0,(f-t7.typeStart)/(t7.typeEnd-t7.typeStart))))).length;
   const expected=[];for(let f=r.localStart;f<=r.localEnd;f++)if(count(f)>count(f-1))expected.push(f+r.originFrame);
   const actual=typingFrames(r,text,30);assert.deepEqual(actual,expected);assert.ok(actual.every(f=>f>=c.startFrame&&f<=c.endFrame));assert.deepEqual(actual.map(f=>f-r.originFrame).map(f=>f+r.originFrame),actual);
 }}
});
test('validator accepts opt-in variant and rejects invalid prop, mode, canonical source and long sample',{skip:!installed},()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sfx-adaptive-'));try{fs.cpSync(project,d,{recursive:true});assert.equal(checkSoundCues(d,{strict:true}).ok,true);
 const f=path.join(d,'production/sound-cues.json'),original=fs.readFileSync(f,'utf8');
 for(const mut of [c=>c.typing.prop='unknown',c=>c.typing.mode='bad',c=>c.typing.localEnd+=1,c=>c.file='audio/sfx/editorial-paper-hook.wav']){const x=JSON.parse(original);mut(x.cues.find(c=>c.typing));fs.writeFileSync(f,JSON.stringify(x));assert.equal(checkSoundCues(d,{strict:true}).ok,false);}
 fs.writeFileSync(f,original);fs.appendFileSync(path.join(d,'src/components/SoundTyping.ts'),'\n// modified');assert.equal(checkSoundCues(d,{strict:true}).ok,false);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
