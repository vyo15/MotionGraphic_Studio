import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Design System, motion, QA documents exist and are linked by ChatGPT read-first', () => {
  const entry = read('CHATGPT-READ-FIRST.md');
  for (const doc of [
    'docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md',
    'docs/MOTION-DIRECTION-RULES.md',
    'docs/QA-VISUAL-MOTION-CHECKLIST.md',
  ]) {
    assert.ok(fs.existsSync(path.join(root, doc)), `${doc} missing`);
    assert.ok(entry.includes(doc), `entrypoint does not link ${doc}`);
  }
});

test('Storyboard has CTA then cover and holds thumbnail', () => {
  const story = read('docs/STORYBOARD-TEMPLATE-UNIVERSAL.md');
  const cta = story.indexOf('INTERAKSI / CTA');
  const cover = story.indexOf('COVER REELS');
  assert.ok(cta >= 0 && cover > cta);
  assert.match(story, /hold/i);
  assert.match(story, /3:4/);
});

test('Starter token palette matches documented visual identity', () => {
  const tokens = read('templates/addon-starter/src/config/design.ts');
  const doc = read('docs/MOTIONGRAPHIC-DESIGN-SYSTEM.md');
  for (const hex of ['#F7F7F5', '#FFFFFF', '#202020', '#646464', '#DF805F', '#E7E7E5']) {
    assert.ok(tokens.includes(hex), `starter does not have ${hex}`);
    assert.ok(doc.includes(hex), `documentation does not have ${hex}`);
  }
  assert.match(doc, /Inter.*belum dibundel|font.*belum dibundel/i);
});

test('ZIP engine-only exports docs directory and read-first entrypoint', () => {
  const src = read('tools/zip-video.mjs');
  assert.match(src, /'docs'/);
  assert.match(src, /'CHATGPT-READ-FIRST\.md'/);
  assert.match(src, /with-projects/);
});

test('Revision delivery stays FILE CHANGE ONLY', () => {
  assert.match(read('AGENTS.md'), /FILE CHANGE ONLY/);
  assert.match(read('PRODUCTION-RULES.md'), /FILE CHANGE ONLY/);
});
