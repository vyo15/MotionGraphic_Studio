import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve('projects/easy2boot-multiboot-reels/src');
const targets={
 'scenes/Scene01Problem.tsx':['Mau instal Windows 11,','tapi flashdisk bootable-nya','masih Windows 10?','Masa harus bikin bootable','ulang lagi?'],
 'scenes/Scene02Solution.tsx':['Ah, ribet banget.','Mending pakai Easy2Boot aja.','Satu flashdisk bisa nyimpen installer.','Windows 10, Windows 11,','Sampai Linux sekaligus.'],
 'components/SceneTextVO.tsx':['Pertama, backup data flashdisk.','Buka Easy2Boot.','Pilih USB yang benar,','lalu buat USB multiboot.'],
 'scenes/Scene06Closing.tsx':['atau pakai multiboot?']};
(fs.existsSync(dir)?test:test.skip)('Easy2Boot restored native caption literals remain visible in default branches',()=>{
 for(const [file,texts] of Object.entries(targets)){
  const src=fs.readFileSync(path.join(dir,file),'utf8');
  const values=[...src.matchAll(/<Interactive\.Text\s+name="[^"]+"[^>]*>([^<]*)<\/Interactive\.Text>/g)].map(m=>m[1].trim());
  for(const text of texts)assert.ok(values.includes(text),`${file}: missing native caption ${text}`);
  assert.ok(values.every(Boolean),`${file}: empty native text`);
 }
});
