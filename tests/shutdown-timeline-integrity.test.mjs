import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const project=path.join(root,'projects','shutdown-otomatis-hook-realistis');
const read=p=>fs.readFileSync(path.join(project,p),'utf8');
const available=fs.existsSync(path.join(project,'motiongraphic-video.json'));
(available?test:test.skip)('Shutdown timeline, VO, source sequences and native segments match CURRENT manifest',()=>{
 const m=JSON.parse(read('motiongraphic-video.json'));
 const n=JSON.parse(read('src/config/narration.json'));
 const v=read('src/Video.tsx');
 const parts=read('src/SegmentVideo.tsx');
 const timing=read('src/config/timing.ts');
 assert.equal(m.segments.length,9);
 assert.match(timing,new RegExp('VIDEO_FRAMES\\s*=\\s*'+m.durationInFrames+'\\b'));
 assert.match(timing,new RegExp('SCENE03_FRAMES\\s*=\\s*'+m.segments[3].durationInFrames+'\\b'));
 assert.equal((v.match(/<Sequence name=/g)||[]).length,m.segments.length);
 let previousEnd=0;
 for(const [i,s] of m.segments.entries()){
  assert.equal(s.startFrame,previousEnd,`${s.id} starts at expected frame`);
  previousEnd=s.startFrame+s.durationInFrames;
  assert.ok(v.includes(`from={${s.startFrame}} durationInFrames={${s.durationInFrames}}`),`${s.id} uses correct Sequence timing`);
  assert.ok(parts.includes(`segmentIndex===${i}?<Scene`),`${s.id} has native editable composition`);
 }
 assert.equal(previousEnd,m.durationInFrames);
 assert.equal(n.beats.length,m.segments.length);
 for(const [i,b] of n.beats.entries()){
  assert.equal(b.startFrame,m.segments[i].startFrame);
  assert.equal(b.endFrame,m.segments[i].startFrame+m.segments[i].durationInFrames);
 }
 assert.equal(m.segments[3].durationInFrames,240,'Scene 04 ACC v15 lasts 8 seconds');
 assert.match(read('src/scenes/Scene03.tsx'),/100% · selesai/);
 assert.match(read('src/scenes/Scene03.tsx'),/LAPTOP MATI/);
});
