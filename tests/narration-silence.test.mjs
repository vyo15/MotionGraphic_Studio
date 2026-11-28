import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {isSilentNarration} from '../tools/narration-silence.mjs';
test('guide and board share silence semantics without editing narration',()=>{
 for(const s of ['', '  ', '(visual hold cover Reels; tidak ada VO)', '(silent cover)', '(tanpa VO)'])assert.equal(isSilentNarration(s),true);
 for(const s of ['Coba tulis di kolom komentar!', 'Ini tanpa VO?','(Catatan biasa)'])assert.equal(isSilentNarration(s),false);
 assert.match(fs.readFileSync(new URL('../src/VoiceGuideOverlay.tsx',import.meta.url),'utf8'),/!beat\|\|isSilentNarration\(beat\.text\)/);
});
