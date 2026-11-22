import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const scene = readFileSync(resolve('projects/easy2boot-multiboot-reels/src/scenes/Scene01Problem.tsx'), 'utf8');
const contract = readFileSync(resolve('docs/EDITABLE-CONTRACT.md'), 'utf8');

test('S01 subtitle has five distinct direct native-text call sites', () => {
  const names = [...scene.matchAll(/<Interactive\.Text name="(S01 — Subtitle [^"]+)"/g)].map(x=>x[1]);
  assert.equal(names.length, 5, 'one independently declared Interactive.Text per line');
  assert.equal(new Set(names).size, names.length, 'native subtitle names must be unique');
  assert.ok(names.some(n=>n.includes('Subtitle 01')));
  assert.ok(names.some(n=>n.includes('Subtitle 03B')));
  assert.doesNotMatch(scene, /SCENE01_IMPACT\.captions\.map\(/);
  assert.doesNotMatch(scene, /const Caption:React\.FC/);
});

test('S01 caption fallback preserves Props, colors, geometry, cue boundaries', () => {
  assert.match(scene, /scene01CaptionLines\?\.\[cue\]\?\.split\('\|'\)/);
  for (const y of [754, 769, 786]) assert.match(scene, new RegExp(`y=\\{${y}\\}`));
  for (const id of [1,2,3]) assert.match(scene,new RegExp(`id="caption${id}"`));
  for (const cue of ['Mau instal Windows 11,','tapi flashdisk bootable-nya','masih Windows 10?','Masa harus bikin bootable','ulang lagi?']) assert.ok(scene.includes(cue));
  assert.match(scene,/scene01ShowCaptions/);
  assert.match(contract,/satu node langsung/);
});
