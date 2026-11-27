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
 for(const p of ['docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md','docs/QA-VISUAL-MOTION-CHECKLIST.md']) assert.match(read(p),/TEXT HIERARCHY & SUBTITLE LOCK v1\.0/,p);
 assert.match(read('docs/CHATGPT-PROJECT-INSTRUCTIONS.md'),/Subtitle draft default aktif/);
 assert.doesNotMatch(read('docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md'),/Subtitle opsional/);
 const storyboard=read('docs/STORYBOARD-TEMPLATE-UNIVERSAL.md');
 assert.match(storyboard,/Cue subtitle \(bawah\)/);
 assert.match(storyboard,/Supporting text \(atas\/dekat objek\)/);
});

test('Starter turns on the draft track, and CapCut disables only the subtitle prop',()=>{
 const manifest=JSON.parse(starter('motiongraphic-video.json'));
 assert.equal(manifest.defaultProps.showSubtitles,true);
 assert.match(starter('src/Video.tsx'),/<Scene01 showSubtitles=\{showSubtitles\}/);
 const scene=starter('src/scenes/Scene01.tsx');
 assert.match(scene,/\{showSubtitles && frame>=128 && frame<218 \? <Interactive.Div name="S01 — Subtitle 01"/);
 const {props}=capcutOverrides(manifest.defaultProps);
 assert.equal(props.showSubtitles,false);
 assert.equal(manifest.defaultProps.showSubtitles,true);
});

test('Starter sample narration matches literal native subtitle and cue timing',()=>{
 const {beats}=JSON.parse(starter('src/config/narration.json'));
 const scene=starter('src/scenes/Scene01.tsx');
 const cue=scene.match(/frame>=(\d+) && frame<(\d+) \? <Interactive.Div name="S01 — Subtitle 01"[\s\S]*?>([^<]+)<\/Interactive.Div>/);
 assert.ok(cue);
 assert.equal(beats.length,1);
 assert.equal(beats[0].startFrame,Number(cue[1]));
 assert.equal(beats[0].endFrame,Number(cue[2]));
 assert.equal(beats[0].text,cue[3]);
 const blueprint=JSON.parse(starter('production/editable-blueprint.json'));
 assert.ok(blueprint.nativeTextTargets.some(x=>x.name==='S01 — Subtitle 01'));
});
