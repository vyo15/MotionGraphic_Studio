import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {capcutOverrides} from '../tools/render-profiles.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const starter=p=>read(`templates/addon-starter/${p}`);

test('Text hierarchy is owned by design system and reachable from entrypoints',()=>{
 for(const p of ['AGENTS.md','PRODUCTION-RULES.md']) assert.match(read(p),/MOTIONGRAPHIC-DESIGN-SYSTEM\.md/,p);
 assert.match(read('CHATGPT-READ-FIRST.md'),/MOTIONGRAPHIC-DESIGN-SYSTEM\.md/);
 for(const p of ['docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md','docs/QA-VISUAL-MOTION-CHECKLIST.md']) assert.match(read(p),/TEXT HIERARCHY & SUBTITLE LOCK v2\.0/,p);
 assert.match(read('docs/CHATGPT-PROJECT-INSTRUCTIONS.md'),/Subtitle draft default aktif/);
 assert.doesNotMatch(read('docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md'),/Subtitle opsional/);
 const storyboard=read('docs/STORYBOARD-TEMPLATE-UNIVERSAL.md');
 assert.match(storyboard,/Cue subtitle \(bawah\)/);
 assert.match(storyboard,/Supporting text \(atas\/dekat objek\)/);
});

test('Starter draft subtitles are default-on, CapCut overrides only temporary Props',()=>{
 const manifest=JSON.parse(starter('motiongraphic-video.json'));assert.equal(manifest.defaultProps.showSubtitles,true);
 assert.match(starter('src/Video.tsx'),/<Scene01 showSubtitles=\{p.showSubtitles\}/);const {props}=capcutOverrides(manifest.defaultProps);assert.equal(props.showSubtitles,false);assert.equal(manifest.defaultProps.showSubtitles,true);
});
test('Starter narration fully covers timeline; each spoken beat matches a literal local-frame caption; cover silent',()=>{
 const manifest=JSON.parse(starter('motiongraphic-video.json')), {beats}=JSON.parse(starter('src/config/narration.json'));let cursor=0;
 for(const b of beats){assert.equal(b.startFrame,cursor);cursor=b.endFrame;const i=manifest.segments.findIndex(s=>b.startFrame>=s.startFrame&&b.endFrame<=s.startFrame+s.durationInFrames);assert.ok(i>=0);const seg=manifest.segments[i],source=starter('src/scenes/Scene'+String(i+1).padStart(2,'0')+'.tsx');if(b.text){const cues=[...source.matchAll(/frame>=(\d+) && frame<(\d+) \? <Interactive.Div name="S0\d — Subtitle \d+"[\s\S]*?>([^<]+)<\/Interactive.Div>/g)];assert.ok(cues.some(c=>Number(c[1])===b.startFrame-seg.startFrame&&Number(c[2])===b.endFrame-seg.startFrame&&c[3]===b.text),b.text);}else assert.doesNotMatch(source,/name="S0\d — Subtitle/);}
 assert.equal(cursor,manifest.durationInFrames);assert.equal(beats.at(-1).text,'');
});
