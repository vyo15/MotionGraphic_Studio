#!/usr/bin/env node
/** Explicit Windows UI element authoring migration, no dependency other than TypeScript. */
import {createRequire} from 'node:module';import {readFileSync,writeFileSync,existsSync,mkdirSync,copyFileSync} from 'node:fs';import {join,resolve,dirname,relative} from 'node:path';import {fileURLToPath} from 'node:url';
const T=createRequire(import.meta.url)('typescript'),ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..'),slug=process.argv[2],apply=process.argv.includes('--apply');
const root=join(ROOT,'projects',slug||'');if(!slug||!existsSync(join(root,'motiongraphic-video.json'))){console.error('Pakai node tools/promote-ui-controls.mjs <slug> [--apply]');process.exit(2)}
const targets=[
 ['src/scenes/01-ctrl-shift-t/components/BrowserChrome.tsx',[/chromeTab doc/,'01 · Browser · Tab dokumen'],[/chromeTab home/,'01 · Browser · Tab Google'],[/tabCross/,'01 · Browser · Tombol tutup tab'],[/docsPaper/,'01 · Browser · Isi dokumen'],[/chromeActions/,'01 · Browser · Kontrol jendela']],
 ['src/scenes/02-ctrl-shift-esc/components/TaskManager.tsx',[/whecTmEnd /,'02 · Task Manager · Tombol End task'],[/whecTmExcel /,'02 · Task Manager · Excel macet'],[/whecTmProcess$/,'02 · Task Manager · Baris proses'],[/whecTmCategory/,'02 · Task Manager · Kelompok proses']],
 ['src/scenes/03-win-shift-s/components/Desktop.tsx',[/whssSnipBounds/,'03 · Snipping Tool · Kotak seleksi'],[/whssSnipOverlay/,'03 · Snipping Tool · Layar redup'],[/whssProgressBar/,'03 · Dashboard · Progress bar']],
 ['src/scenes/04-win-e/components/ExplorerWindow.tsx',[/weCommands/,'04 · Explorer · Toolbar'],[/weFileRow/,'04 · Explorer · Baris file'],[/weSideItem/,'04 · Explorer · Item sidebar']],
 ['src/scenes/05-ctrl-shift-n/components/WindowsUI.tsx',[/whnToolbar/,'05 · Explorer · Toolbar'],[/whnFileRow/,'05 · Explorer · Baris file'],[/whnNewRow/,'05 · Explorer · Folder baru'],[/whnContext/,'05 · Explorer · Menu klik kanan'],[/whnSubcontext/,'05 · Explorer · Submenu folder'],[/whnPointer/,'05 · Kursor · Pointer'],[/whnEdgePage/,'05 · Edge · Halaman browser']]
];
let total=0;for(const [rel,...patterns] of targets){const file=join(root,rel);if(!existsSync(file))continue;let src=readFileSync(file,'utf8'),sf=T.createSourceFile(file,src,T.ScriptTarget.Latest,true,T.ScriptKind.TSX),edit=[],count={};
 const visit=n=>{if(T.isJsxElement(n)&&n.openingElement.tagName.getText(sf)==='div'){
  const op=n.openingElement,cl=n.closingElement,at=op.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='className');const attr=at?.initializer?.getText(sf)||'';
  let label;for(const [pattern,name] of patterns)if(pattern.test(attr)){label=name;break;}
  if(label){const seq=(count[label]=(count[label]||0)+1),name=label+(seq>1?' '+seq:'');total++;
   edit.push({a:op.tagName.getStart(sf),b:op.tagName.getEnd(),text:'Interactive.Div'},{a:cl.tagName.getStart(sf),b:cl.tagName.getEnd(),text:'Interactive.Div'});
   const style=op.attributes.properties.find(a=>T.isJsxAttribute(a)&&a.name.text==='style');let insert=` name=${JSON.stringify(name)}`;
   if(!style)insert+=` style={{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}}`;
   edit.push({a:op.tagName.getEnd(),b:op.tagName.getEnd(),text:insert});
   // Existing JSX expressions retain their effects. For layerStyle, remove vars so it becomes editable.
   if(style?.initializer&&T.isJsxExpression(style.initializer)){
     const s=style.initializer.expression;
     if(s&&T.isCallExpression(s)&&s.expression.getText(sf)==='layerStyle')edit.push({a:s.getStart(sf),b:s.getEnd(),text:"{translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'}"});
     else if(s&&T.isObjectLiteralExpression(s)){
       const spread=s.properties.filter(p=>T.isSpreadAssignment(p)&&T.isCallExpression(p.expression)&&p.expression.expression.getText(sf)==='layerStyle');
       if(spread.length){for(const p of spread)edit.push({a:p.getStart(sf),b:p.getEnd(),text:"translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%'"});}
       else if(!s.properties.some(p=>T.isPropertyAssignment(p)&&p.name.getText(sf)==='translate'))edit.push({a:s.getStart(sf)+1,b:s.getStart(sf)+1,text:"translate:'0px 0px',scale:1,rotate:'0deg',transformOrigin:'50% 50%',"});
     }
   }
  }
 }
 T.forEachChild(n,visit)};visit(sf);
 if(edit.length){const hasImport=/import\s*\{[^}]*\bInteractive\b[^}]*\}\s*from\s*['"]remotion['"]/.test(src);if(!hasImport)edit.push({a:0,b:0,text:"import {Interactive} from 'remotion';\n"});
  if(apply){const backup=join(ROOT,'library','backups','ui-promote',slug,rel);mkdirSync(dirname(backup),{recursive:true});if(!existsSync(backup))copyFileSync(file,backup);for(const e of edit.sort((a,b)=>b.a-a.a))src=src.slice(0,e.a)+e.text+src.slice(e.b);writeFileSync(file,src);}
 }
}
console.log(`${apply?'[ADDED]':'[PREVIEW]'} ${total} child UI controls for ${slug}`);
