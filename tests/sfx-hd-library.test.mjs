import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {inspectWav,loadLibrary,selectAsset,prepare} from '../tools/sfx-local.mjs';
const assets=loadLibrary();
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('HD PCM24 supports true 24-bit sample sizes, rates and amplitude',()=>{
 const b=Buffer.alloc(50);b.write('RIFF');b.writeUInt32LE(42,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(96000,24);b.writeUInt32LE(288000,28);b.writeUInt16LE(3,32);b.writeUInt16LE(24,34);b.write('data',36);b.writeUInt32LE(6,40);b.writeIntLE(-500000,44,3);b.writeIntLE(100000,47,3);
 const x=inspectWav(b);assert.equal(x.bitsPerSample,24);assert.equal(x.samples,2);assert.equal(x.peak,500000);assert.equal(x.sampleRate,96000);b.writeIntLE(-8388608,44,3);assert.throws(()=>inspectWav(b),/full-scale/);
});
test('HD packs verify source hash, native sample rate and safe peak',()=>{
 const hd=assets.filter(a=>a.processing?.format==='PCM_24');
 // engine-only exports intentionally exclude personal packs.
 if(!hd.length)return;
 assert.ok(hd.length>=37);for(const a of hd){assert.equal(a.bitsPerSample,24);assert.equal(a.sampleRate,a.processing.sampleRate);assert.ok(a.peak/8388608<=10**(-3/20)+1e-6);assert.equal(a.source.license,'CC0-1.0');assert.equal(hash(a.full),a.sha256);}
});
test('unreviewed numbered SFX requires explicit ID; keyboard selects physical typing',()=>{
 const d=assets.find(a=>a.id==='dustyroom-cgs-20');if(!d)return;
 assert.equal(assets.some(a=>a.id==='dustyroom-cgs-01'),false);assert.equal(d.reviewStatus,'pending-function');assert.equal(assets.filter(a=>a.id.startsWith('dustyroom-cgs-')).length,29);
 assert.throws(()=>selectAsset([d],{character:'either',tags:['dustyroom']}),/Tidak ada/);assert.equal(selectAsset([d],{character:'synthetic',assetId:d.id}).id,d.id);
 assert.match(selectAsset(assets,{character:'recorded',tags:['computer','keyboard','typing']}).id,/^keyboard-typing-/);
});
test('PCM24 cue staging copies exact bytes and retains source metadata',()=>{
 const a=assets.find(a=>a.id==='whoosh-metal-tea-strainer-01');if(!a)return;
 const d=fs.mkdtempSync(path.join(os.tmpdir(),'sfx-hd-'));try{const out=path.join(d,'staging');prepare({slug:'test-hd',fps:30,durationInFrames:90},{schemaVersion:1,cues:[{id:'whoosh',scene:'S01',action:'motion',impactFrame:20,status:'ready',character:'recorded',assetId:a.id}]},out,assets);const p=path.join(out,'public/audio/sfx',a.id+'.wav');assert.equal(hash(p),a.sha256);const cue=JSON.parse(fs.readFileSync(path.join(out,'production/sound-cues.json'))).cues[0];assert.equal(cue.source.originalSha256,a.source.originalSha256);}finally{fs.rmSync(d,{recursive:true,force:true});}
});

test('additional Freesound motion effects preserve source and function, DROP files stay excluded',()=>{
 const expected={'transition-swoosh-adh-01':'transition','transition-swoosh-halgrimm-01':'transition','riser-anticipation-01':'anticipation','camera-shutter-flash-01':'camera'};
 const added=assets.filter(a=>Object.hasOwn(expected,a.id));if(!added.length)return;assert.equal(added.length,4);
 for(const a of added){assert.equal(a.category,expected[a.id]);assert.equal(a.bitsPerSample,24);assert.equal(a.reviewStatus,'pending-listening');assert.equal(selectAsset(assets,{character:'synthetic',assetId:a.id}).id,a.id);assert.throws(()=>selectAsset([a],{character:'synthetic',tags:a.tags}),/Tidak ada/);assert.equal(a.source.license,'CC0-1.0');}
 const p=path.resolve('library/sfx/dustyroom-cgs-hd/catalog.json');if(fs.existsSync(p)){const doc=JSON.parse(fs.readFileSync(p));assert.equal(doc.excludedByUser.length,21);for(const a of doc.excludedByUser){assert.equal(a.storageStatus,'removed-after-user-drop');assert.ok(!assets.some(x=>x.id===a.id));}}
});
