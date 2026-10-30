import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('all user-facing workflow docs referenced from README exist and stay in Master backup whitelist',()=>{
  const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
  const zip=fs.readFileSync(path.join(root,'tools/zip-video.mjs'),'utf8');
  for(const filename of ['ALUR-KERJA-REMOTION-CONCAT.md','PANDUAN-HANDOFF-CONCAT.md','AUDIT-CLEANUP-MASTER-v1.8.1.md','AUDIT-FINAL-v1.8.1.md']){
    assert.ok(fs.existsSync(path.join(root,filename)),filename+' must exist');
    assert.ok(zip.includes("'"+filename+"'"),filename+' must be in ZIP Master whitelist');
  }
  assert.match(readme,/PANDUAN-HANDOFF-CONCAT/);
});
