import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {checkSoundCues} from '../tools/qa-sound-cues.mjs';
function fixture(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mg-sfx-'));
 fs.writeFileSync(path.join(dir,'motiongraphic-video.json'),JSON.stringify({durationInFrames:300}));
 fs.mkdirSync(path.join(dir,'production'));
 fs.mkdirSync(path.join(dir,'public','audio','sfx'),{recursive:true});
 return {dir,done:()=>fs.rmSync(dir,{recursive:true,force:true})};
}
const base=()=>({schemaVersion:1,status:'review',cues:[]});
function put(dir,doc){fs.writeFileSync(path.join(dir,'production','sound-cues.json'),JSON.stringify(doc))}
function wav(){
 const n=4410,b=Buffer.alloc(44+n*2);b.write('RIFF',0);b.writeUInt32LE(36+n*2,4);b.write('WAVEfmt ',8);
 b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(44100,24);
 b.writeUInt32LE(88200,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(n*2,40);return b;
}
const ready=(extra={})=>({id:'S01-CLICK',scene:'S01',action:'klik UI',status:'ready',startFrame:23,impactFrame:25,endFrame:40,file:'audio/sfx/click.wav',source:{kind:'own'},...extra});
test('project lama tanpa audio plan tetap valid',()=>{const x=fixture();try{assert.equal(checkSoundCues(x.dir,{strict:true}).ok,true)}finally{x.done()}});
test('template kosong pass saat motion belum ACC',()=>{const x=fixture();try{put(x.dir,base());assert.equal(checkSoundCues(x.dir,{strict:true}).ok,true)}finally{x.done()}});
test('aset SFX siap harus ditemukan',()=>{const x=fixture();try{put(x.dir,{...base(),cues:[ready()]});assert.equal(checkSoundCues(x.dir,{strict:true}).ok,false)}finally{x.done()}});
test('cue valid & aset tersedia',()=>{const x=fixture();try{fs.writeFileSync(path.join(x.dir,'public','audio','sfx','click.wav'),wav());put(x.dir,{...base(),cues:[ready()]});assert.equal(checkSoundCues(x.dir,{strict:true}).ok,true)}finally{x.done()}});
test('frame di luar komposisi ditolak',()=>{const x=fixture();try{put(x.dir,{...base(),cues:[ready({impactFrame:302})]});assert.equal(checkSoundCues(x.dir).ok,false)}finally{x.done()}});
test('lisensi NC tidak otomatis aman',()=>{const x=fixture();try{fs.writeFileSync(path.join(x.dir,'public','audio','sfx','click.wav'),wav());put(x.dir,{...base(),cues:[ready({source:{kind:'openverse',title:'fx',license:'cc-by-nc',sourceUrl:'https://example.com',licenseUrl:'https://creativecommons.org/licenses/by-nc/4.0/',attribution:'me'}})]});assert.equal(checkSoundCues(x.dir).ok,false)}finally{x.done()}});
test('path traversal ditolak',()=>{const x=fixture();try{put(x.dir,{...base(),cues:[ready({file:'audio/sfx/../../secret.wav'})]});assert.equal(checkSoundCues(x.dir).ok,false)}finally{x.done()}});
test('planned boleh sebelum ACC, strict gagal',()=>{const x=fixture();try{put(x.dir,{...base(),cues:[ready({status:'planned',file:null})]});assert.equal(checkSoundCues(x.dir).ok,true);assert.equal(checkSoundCues(x.dir,{strict:true}).ok,false)}finally{x.done()}});

test('header WAV rusak ditolak',()=>{const x=fixture();try{fs.writeFileSync(path.join(x.dir,'public','audio','sfx','click.wav'),'bukan-wave');put(x.dir,{...base(),cues:[ready()]});assert.equal(checkSoundCues(x.dir,{strict:true}).ok,false)}finally{x.done()}});

test('v2.2 production fails missing sound plan, legacy still passes',()=>{const x=fixture();try{assert.equal(checkSoundCues(x.dir,{production:true}).ok,false);assert.equal(checkSoundCues(x.dir).ok,true)}finally{x.done()}});
test('v2.2 Sharing Printer accepts canonical wiring and rejects missing or planned cues',()=>{
 const src=path.resolve('projects/sharing-printer-lan');if(!fs.existsSync(src))return;
 const x=fixture();try{
  fs.cpSync(src,x.dir,{recursive:true});
  assert.equal(checkSoundCues(x.dir,{strict:true,production:true}).ok,true);
  const file=path.join(x.dir,'src/SegmentVideo.tsx');const original=fs.readFileSync(file,'utf8');
  fs.writeFileSync(file,original.replace(/<SoundCueTrack[^>]*\/>/,''));
  assert.match(checkSoundCues(x.dir,{strict:true}).issues.join(' '),/callsite/);
  fs.writeFileSync(file,original);const map=path.join(x.dir,'src/components/SoundAssets.ts');const mapOriginal=fs.readFileSync(map,'utf8');fs.writeFileSync(map,'export const SFX_FILES = {};');assert.match(checkSoundCues(x.dir,{strict:true}).issues.join(' '),/literal map/);fs.writeFileSync(map,mapOriginal);const cues=JSON.parse(fs.readFileSync(path.join(x.dir,'production/sound-cues.json'),'utf8'));cues.cues.find(c=>c.status==='ready').status='planned';put(x.dir,cues);
  assert.equal(checkSoundCues(x.dir).ok,false);
 }finally{x.done()}
});
