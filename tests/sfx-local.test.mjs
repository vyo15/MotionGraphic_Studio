import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {loadLibrary,selectAsset,prepare,importPack,inspectWav,renderEarshot} from '../tools/sfx-local.mjs';
import {checkSoundCues} from '../tools/qa-sound-cues.mjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest={slug:'test-sfx',fps:30,durationInFrames:120,entry:'src/Video.tsx',soundImplementationContract:'cue-track-v1',defaultProps:{showSfx:true,sfxGain:1},segments:[{startFrame:0,durationInFrames:60},{startFrame:60,durationInFrames:60}]};
const request=JSON.parse(fs.readFileSync(path.join(ROOT,'templates/sfx-library/example-requests.json'),'utf8'));
const tmp=fn=>{const d=fs.mkdtempSync(path.join(os.tmpdir(),'sfx-local-'));try{return fn(d)}finally{fs.rmSync(d,{recursive:true,force:true})}};
const library=loadLibrary();
test('20 actual original WAVs decode as PCM and match catalog checksum',()=>{const starter=library.filter(a=>a.id.startsWith('starter-'));assert.equal(starter.length,20);assert.ok(starter.every(a=>a.character==='synthetic'&&a.sampleRate===48000&&a.peak>0&&a.peak<32767));});
test('matching uses exact tags; no synthetic substitution for recorded',()=>{assert.equal(selectAsset(library,{character:'synthetic',tags:['ui','click']}).id,'starter-ui-click');assert.throws(()=>selectAsset(library,{character:'recorded',assetId:'starter-ui-click'}),/Tidak ada/);assert.throws(()=>selectAsset(library,{character:'synthetic',tags:['unknown-tag']}),/Tidak ada/);});
test('prepare only creates new staging and strict canonical audio gate accepts output',()=>tmp(d=>{
 const out=path.join(d,'staging');const r=prepare(manifest,request,out,library);assert.equal(r.assets,1);assert.throws(()=>prepare(manifest,request,out,library),/sudah ada/);
 const doc=JSON.parse(fs.readFileSync(path.join(out,'production/sound-cues.json'),'utf8'));assert.equal(doc.cues[0].impactFrame,15);assert.equal(doc.cues[1].status,'omit');
 fs.writeFileSync(path.join(out,'motiongraphic-video.json'),JSON.stringify(manifest));fs.writeFileSync(path.join(out,'production/SOUND-PLAN.md'),'draft plan');fs.copyFileSync(path.join(ROOT,'templates/sound-cue-track/SoundCueTrack.tsx'),path.join(out,'src/components/SoundCueTrack.tsx'));
 const imp="import {SoundCueTrack} from './components/SoundCueTrack';\n";
 fs.writeFileSync(path.join(out,'src/Video.tsx'),imp+'<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain}/>');
 fs.writeFileSync(path.join(out,'src/SegmentVideo.tsx'),imp+'<SoundCueTrack enabled={p.showSfx} gain={p.sfxGain} segmentIndex={segmentIndex}/>');
 const qa=checkSoundCues(out,{strict:true,production:true});assert.ok(qa.ok,qa.issues.join('\n'));
}));
test('invalid timing, missing scene, duplicate and missing recordings fail before writing',()=>tmp(d=>{
 for(const mutate of [q=>q.cues[0].impactFrame=59,q=>q.cues.pop(),q=>q.cues[0].character='recorded',q=>q.cues.push(q.cues[0]),q=>q.cues[1].reason='']){
 const q=structuredClone(request);mutate(q);const o=path.join(d,'out');assert.throws(()=>prepare(manifest,q,o,library));assert.equal(fs.existsSync(o),false);}
 fs.mkdirSync(path.join(d,'projects'));assert.throws(()=>prepare(manifest,request,path.join(d,'projects','never'),library),/staging/);
}));
test('import is offline, no overwrite, SHA validation, license and path protections',()=>tmp(d=>{
 const root=path.join(d,'master');fs.mkdirSync(path.join(root,'templates'),{recursive:true});fs.cpSync(path.join(ROOT,'templates/sfx-library'),path.join(root,'templates/sfx-library'),{recursive:true});
 const a=library.find(a=>a.id==='starter-ui-click');fs.copyFileSync(a.full,path.join(d,'sample.wav'));
 const spec={schemaVersion:1,assets:[{id:'fixture-click',file:'sample.wav',character:'synthetic',tags:['ui','click'],source:a.source,rightsEvidence:'Original starter fixture; no outside sample'}]};const f=path.join(d,'spec.json');fs.writeFileSync(f,JSON.stringify(spec));
 const baselineCount=loadLibrary(root).length;assert.equal(importPack(f,'test-pack',root).assets,1);assert.equal(loadLibrary(root).length,baselineCount+1);assert.throws(()=>importPack(f,'test-pack',root));
 spec.assets[0].id='other-id';spec.assets[0].source={...a.source,license:'CC-BY-NC-4.0'};fs.writeFileSync(f,JSON.stringify(spec));assert.throws(()=>importPack(f,'bad-license',root),/Lisensi/);
 spec.assets[0].source=a.source;spec.assets[0].file='../sample.wav';fs.writeFileSync(f,JSON.stringify(spec));assert.throws(()=>importPack(f,'bad-path',root),/Path/);
 fs.appendFileSync(path.join(root,'library/sfx/test-pack/audio/fixture-click.wav'),Buffer.from('corrupt'));assert.throws(()=>loadLibrary(root),/SHA256/);
}));
test('invalid WAV rejected',()=>{assert.throws(()=>inspectWav(Buffer.from('not audio')),/WAV/);});

test('optional Earshot adapter invokes only bank render, imports result; mock runtime not upstream test',()=>tmp(d=>{
 const root=path.join(d,'master');fs.mkdirSync(path.join(root,'templates'),{recursive:true});fs.cpSync(path.join(ROOT,'templates/sfx-library'),path.join(root,'templates/sfx-library'),{recursive:true});
 const a=library.find(a=>a.id==='starter-ui-click');let called=0;
 const fake=(cmd,args)=>{called++;assert.equal(cmd,'earshot');assert.deepEqual(args.slice(0,3),['sfx','render','whoosh_fast/crisp']);fs.copyFileSync(a.full,args[4]);return {status:0};};
 const r=renderEarshot('whoosh_fast/crisp','test-earshot',['motion','whoosh'],root,fake);assert.equal(called,1);assert.equal(r.provider,'earshot-local');assert.equal(loadLibrary(root).find(x=>x.id==='earshot-test-earshot').source.kind,'earshot');
 assert.throws(()=>renderEarshot('fit/no','bad-pack',['motion'],root,fake),/non-fit/);assert.throws(()=>renderEarshot('whoosh_fast/crisp','test-earshot',['motion'],root,fake),/sudah ada/);
}));

test('catalog verifies all bundled WAV; editorial selection remains exact and duration-fit',()=>{
 assert.equal(library.filter(a=>a.full.startsWith(path.join(ROOT,'templates/sfx-library')+path.sep)).length,41);
 assert.equal(selectAsset(library,{character:'synthetic',tags:['ui','tap'],preferSoftEditorial:true}).id,'editorial-tap-1');
 assert.throws(()=>selectAsset(library,{character:'recorded',tags:['ui','tap'],preferSoftEditorial:true}),/Tidak ada/);
});

// Metadata fixtures exercise selection only; they are not audio recordings or proof of provenance.
test('physical mouse requires recorded no-attribution source and one exact action',()=>{
 const fixture=(id,action,character='recorded',license='CC0-1.0')=>({id,character,tags:['mouse',action],source:{license,kind:'real-recording'}});
 const assets=[fixture('mouse-fake','single-click','synthetic'),fixture('mouse-by','single-click','recorded','CC-BY-4.0'),fixture('mouse-click-01','single-click'),fixture('mouse-double-click-01','double-click'),fixture('mouse-scroll','scroll-normal'),fixture('mouse-scroll-slow','scroll-slow')];
 for(const [action,id] of [['single-click','mouse-click-01'],['double-click','mouse-double-click-01'],['scroll-normal','mouse-scroll'],['scroll-slow','mouse-scroll-slow']])assert.equal(selectAsset(assets,{character:'either',tags:['mouse',action]}).id,id);
 assert.throws(()=>selectAsset(assets,{character:'synthetic',tags:['mouse','single-click']}),/wajib recorded/);
 assert.throws(()=>selectAsset(assets,{character:'either',tags:['mouse']}),/Pilih satu aksi/);
 assert.throws(()=>selectAsset(assets,{character:'recorded',tags:['mouse','single-click','double-click']}),/Pilih satu aksi/);
 assert.throws(()=>selectAsset(assets,{character:'either',assetId:'mouse-fake',tags:['mouse','single-click']}),/Tidak ada/);
 assert.throws(()=>selectAsset(assets,{character:'recorded',assetId:'mouse-by',tags:['mouse','single-click']}),/Tidak ada/);
 assert.throws(()=>selectAsset(assets,{character:'recorded',assetId:'mouse-double-click-01',tags:['mouse','single-click']}),/Tidak ada/);
 assert.throws(()=>selectAsset(assets,{character:'recorded',assetId:'mouse-click-01'}),/Pilih satu aksi/);
 assert.throws(()=>selectAsset(library.filter(a=>a.character==='synthetic'),{character:'either',tags:['mouse','single-click']}),/Tidak ada/);
});

// Synthetic fixture bytes ONLY, never a production recording; exercise integrity guard.
test('mouse import requires source original hash and preserves exact bytes through staging',()=>tmp(d=>{
 const root=path.join(d,'master');fs.mkdirSync(path.join(root,'templates'),{recursive:true});fs.cpSync(path.join(ROOT,'templates/sfx-library'),path.join(root,'templates/sfx-library'),{recursive:true});
 const b=fs.readFileSync(library.find(a=>a.id==='starter-ui-click').full);fs.writeFileSync(path.join(d,'sample.wav'),b);
 const a={id:'mouse-fixture',file:'sample.wav',character:'recorded',tags:['mouse','single-click'],source:{kind:'real-recording',title:'TEST FIXTURE ONLY',creator:'fixture',license:'CC0-1.0',sourceUrl:'https://example.com/fixture',originalSha256:'0'.repeat(64)},rightsEvidence:'TEST fixture only'};
 const f=path.join(d,'spec.json'),write=()=>fs.writeFileSync(f,JSON.stringify({schemaVersion:1,assets:[a]}));write();assert.throws(()=>importPack(f,'test-mouse',root),/SHA256/);
 a.source.originalSha256=createHash('sha256').update(b).digest('hex');write();assert.equal(importPack(f,'test-mouse',root).assets,1);
 const assets=loadLibrary(root);const q=structuredClone(request);Object.assign(q.cues[0],{character:'recorded',tags:['mouse','single-click'],assetId:'mouse-fixture'});
 const out=path.join(d,'staging');prepare(manifest,q,out,assets);
 assert.deepEqual(fs.readFileSync(path.join(out,'public/audio/sfx/mouse-fixture.wav')),b);
 const cue=JSON.parse(fs.readFileSync(path.join(out,'production/sound-cues.json'))).cues[0];assert.equal(cue.mouseAction,'single-click');assert.equal(cue.source.originalSha256,a.source.originalSha256);
}));
