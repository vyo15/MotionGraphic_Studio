#!/usr/bin/env node
/** Lightweight creative references to Lemo-Opuscar for ChatGPT; no external deps, no renderer switch. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'contracts/creative-style-profiles.json'),'utf8'));
const args=process.argv.slice(2);
const name=args.find(a=>!a.startsWith('--'));
const asJson=args.includes('--json');
if(args.includes('--list')||!name){
 if(asJson)console.log(JSON.stringify(catalog,null,2));
 else {console.log('REFERENSI GAYA (bukan preset yang mengganti style lock):');for(const s of catalog.styles)console.log('  '+s.id.padEnd(22)+' '+s.title+' — '+s.bestFor.join(', '));console.log('Pakai: node tools/opuscar-style.mjs <id> [--json]');}
 process.exit(0);
}
const style=catalog.styles.find(s=>s.id===name);
if(!style){console.error('Pilihan tidak dikenal: '+name+'. Gunakan --list.');process.exit(2)}
const out={...style,sourceUrl:style.reference?catalog.sourceRepository+'/blob/main/'+style.reference:null,masterRule:'Preserve Minimal Editorial brand lock and Remotion folder-first; use as technique reference only.'};
if(asJson)console.log(JSON.stringify(out,null,2));
else console.log(`GAYA: ${style.title}\nCOCOK: ${style.bestFor.join(', ')}\nPENERAPAN: ${style.application}\nREFERENSI: ${out.sourceUrl||'Style bawaan Master'}\nPENTING: tidak memasang dependency / mengubah renderer.`);
