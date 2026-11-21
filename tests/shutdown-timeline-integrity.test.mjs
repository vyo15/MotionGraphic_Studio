import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const project=path.join(root,'projects','shutdown-otomatis-hook-realistis');
const read=p=>fs.readFileSync(path.join(project,p),'utf8');
const available=fs.existsSync(path.join(project,'motiongraphic-video.json'));
(available?test:test.skip)('Shutdown timeline, VO guide, full and segment references follow the CURRENT manifest',()=>{
 const m=JSON.parse(read('motiongraphic-video.json'));
 const n=JSON.parse(read('src/config/narration.json'));
 const timeline=read('src/config/timeline.ts');
 const video=read('src/Video.tsx');
 const segmentVideo=read('src/SegmentVideo.tsx');
 assert.ok(m.durationInFrames>0&&m.segments.length>0);
 assert.match(timeline,new RegExp(`totalFrames:${m.durationInFrames}\\b`));
 let end=0;
 for(const [i,s] of m.segments.entries()){
  assert.equal(s.startFrame,end);end+=s.durationInFrames;
  assert.match(timeline,new RegExp(`start:${s.startFrame},duration:${s.durationInFrames}\\b`));
  assert.match(video,new RegExp(`SEGMENTS\\[${i}\\]\\.start`));
 }
 assert.equal(end,m.durationInFrames);
 assert.equal(n.beats[0].startFrame,0);
 let voiceEnd=0;
 for(const beat of n.beats){assert.equal(beat.startFrame,voiceEnd);assert.ok(beat.endFrame>beat.startFrame);voiceEnd=beat.endFrame}
 assert.equal(voiceEnd,m.durationInFrames);
 assert.equal((video.match(/<Sequence /g)||[]).length,m.segments.length);
 assert.match(segmentVideo,/useCurrentFrame/);
 assert.match(segmentVideo,new RegExp(`Math\\.min\\(${m.segments.length-1},`));
});
