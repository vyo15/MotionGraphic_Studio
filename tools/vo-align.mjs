#!/usr/bin/env node
/** Read-only timestamp alignment proposal. Not ASR; never updates source/ACC. */
import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';import {fingerprint} from './qa-motion-plan.mjs';
const norm=s=>String(s).normalize('NFKC').toLocaleLowerCase('id').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const silent=s=>!String(s??'').trim()||/^\s*\([^)]*(?:tidak ada vo|tanpa vo|visual hold|silent cover)[^)]*\)\s*$/i.test(String(s));
export function proposeAlignment(m,n,input){
 if(!Number.isInteger(m.fps)||m.fps<=0||!Array.isArray(n.beats)||!n.beats.length||input?.schemaVersion!==1||input.narrationHash!==fingerprint(n.beats)||(!Array.isArray(input.phrases)&&!Array.isArray(input.words))||!Number.isFinite(input.audioDurationMs)||input.audioDurationMs<=0)throw Error('Alignment input/schema/hash invalid');
 // Optional external word timestamps: automatically map exact ordered tokens to beats.
 let phrases=input.phrases;
 if(!phrases){
  phrases=[];let index=0;
  for(const [beatIndex,b] of n.beats.entries()){
   if(silent(b.text))continue;
   const expected=norm(b.text).split(' ');let tokens=0;
   while(tokens<expected.length){
    const w=input.words[index++];if(!w||typeof w.text!=='string')throw Error('Missing word at beat '+beatIndex);
    const actual=norm(w.text).split(' ').filter(Boolean);if(!actual.length||actual.some((x,j)=>x!==expected[tokens+j]))throw Error('Transcript mismatch at beat '+beatIndex+'; no guessing');
    tokens+=actual.length;phrases.push({beatIndex,text:w.text,startMs:w.startMs,endMs:w.endMs});
   }
  }
  if(index!==input.words.length)throw Error('Extra transcript words; manual review required');
 }
 if(!phrases.length)throw Error('No spoken phrases');
 const grouped=new Map();let last=0,prevBeat=-1;
 for(const p of phrases){if(!Number.isInteger(p.beatIndex)||p.beatIndex<prevBeat||p.beatIndex<0||p.beatIndex>=n.beats.length||silent(n.beats[p.beatIndex].text)||typeof p.text!=='string'||!norm(p.text)||!Number.isFinite(p.startMs)||!Number.isFinite(p.endMs)||p.startMs<last||p.endMs<=p.startMs||p.endMs>input.audioDurationMs)throw Error('Invalid/non-monotonic phrase '+JSON.stringify(p));last=p.endMs;prevBeat=p.beatIndex;const a=grouped.get(p.beatIndex)??[];a.push(p);grouped.set(p.beatIndex,a);}
 const frame=ms=>Math.round(ms*m.fps/1000);const results=[];for(const [i,b] of n.beats.entries()){
  if(silent(b.text)){results.push({beatIndex:i,silent:true,originalStart:b.startFrame,originalEnd:b.endFrame,review:'Preserve silent/cover duration; no speech anchor'});continue;}
  const a=grouped.get(i);if(!a||norm(a.map(x=>x.text).join(' '))!==norm(b.text))throw Error('Beat '+i+' transcript differs from approved text; manual review required');
  const cues=a.map(x=>({...x,startFrame:frame(x.startMs),endFrame:frame(x.endMs)}));if(cues.some(x=>x.endFrame<=x.startFrame))throw Error('Phrase too short at output FPS');
  results.push({beatIndex:i,originalStart:b.startFrame,originalEnd:b.endFrame,speechStart:cues[0].startFrame,speechEnd:cues.at(-1).endFrame,cues,review:'Review scene timing, action/reaction, hold, subtitles and SFX; no auto retime'});
 }
 return {schemaVersion:1,status:'proposal-unverified',narrationHash:input.narrationHash,fps:m.fps,audioDurationMs:input.audioDurationMs,beats:results};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{const [dir,file]=process.argv.slice(2);if(!dir||!file||process.argv.length!==4)throw Error('Pakai: npm run vo:align -- <folder-addon> <phrases.json>');const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));console.log(JSON.stringify(proposeAlignment(read(path.join(dir,'motiongraphic-video.json')),read(path.join(dir,'src/config/narration.json')),read(file)),null,2));}catch(e){console.error('[FAIL] '+e.message);process.exitCode=1;}}
