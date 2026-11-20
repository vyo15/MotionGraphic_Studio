#!/usr/bin/env node
/** Portable specification that ChatGPT can use without the entire Master ZIP. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const caps=JSON.parse(fs.readFileSync(path.join(root,'contracts/studio-capabilities.json'),'utf8'));
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const output={...caps,masterVersion:pkg.version,remotionVersion:pkg.dependencies.remotion,exportedAt:'generated from package.json (no timestamp)',pluginDependencies:Object.keys(pkg.dependencies)};
const dst=process.argv[2]?path.resolve(process.argv[2]):path.resolve(root,'contracts/studio-capabilities.json');
fs.writeFileSync(dst,JSON.stringify(output,null,2)+'\n');
console.log('[CAPABILITIES] '+dst);
