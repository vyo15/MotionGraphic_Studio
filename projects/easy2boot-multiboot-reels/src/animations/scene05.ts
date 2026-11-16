/** Animasi deterministik Scene05: frame -> seluruh layer SVG. */
export const animateScene05=(root:HTMLDivElement, frame:number):void=>{
  const el=(id:string): SVGElement|null=>root.querySelector<SVGElement>(`#${id}`);
  const clamp=(x:number,a=0,b=1):number=>Math.max(a,Math.min(b,x));
  const ease=(x:number):number=>{x=clamp(x);return x*x*(3-2*x)};
  const s=(t:number,a:number,b:number):number=>ease((t-a)/(b-a));
  const show=(t:number,a:number,b:number,c:number,d:number):number=>s(t,a,b)*(1-s(t,c,d));
  const opacity=(id:string,v:number):void=>{el(id)?.setAttribute('opacity',clamp(v).toFixed(4))};
  const tf=(id:string,x=0,y=0,scale=1,rotation=0,cx=540,cy=1040):void=>{el(id)?.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${cx} ${cy}) rotate(${rotation.toFixed(1)}) scale(${scale.toFixed(3)}) translate(${-cx} ${-cy})`)};
const t=frame/30;el('timebar')?.setAttribute('width',String(904*clamp(t/14)));
 // last scene04 panel becomes scene05 and is pulled away; new hero USB comes into focus
 opacity('carry',1-s(t,.10,.64));tf('carry',-250*s(t,.05,.64),-40*s(t,.05,.64),1-.17*s(t,.05,.64));
 opacity('stageA',show(t,.23,.67,2.62,3.00));tf('titleA',0,55*(1-s(t,.32,.81)));tf('pcA',0,68*(1-s(t,.60,1.11)),.91+.09*s(t,.60,1.11));tf('pcScreenA',0,68*(1-s(t,.60,1.11)),.91+.09*s(t,.60,1.11));
 const fly=s(t,1.01,2.20);tf('usbFlying',105+360*fly,1160+115*fly-95*Math.sin(Math.PI*fly),1-.43*fly,-6+6*fly,0,0);opacity('usbFlying',show(t,.60,1.08,2.34,2.62));opacity('linkPulse',show(t,2.02,2.20,2.55,2.75));
 // firmware boot choice: compositional camera move + UI keyboard selection
 opacity('stageB',show(t,2.70,3.14,5.12,5.48));tf('stageB',185*(1-s(t,2.70,3.18))-170*s(t,5.10,5.51),0,.965+.035*s(t,2.70,3.22));tf('titleB',0,60*(1-s(t,2.78,3.31)));opacity('usbSelected',show(t,3.53,3.72,5.25,5.48));
 // file manager navigates WIN11, folder becomes persistent through next action
 opacity('stageC',show(t,5.23,5.61,8.32,8.72));tf('stageC',180*(1-s(t,5.23,5.63))-175*s(t,8.31,8.72),0,.97+.03*s(t,5.23,5.69));tf('titleC',0,55*(1-s(t,5.26,5.83)));
 const folder=s(t,6.80,7.32);opacity('highlightFolder',folder);tf('highlightFolder',0,0,1+.015*Math.sin(folder*Math.PI));
 // selected ISO, then simulated boot action and load bar
 opacity('stageD',show(t,8.52,8.88,11.34,11.72));tf('stageD',170*(1-s(t,8.52,8.94))-170*s(t,11.34,11.72),0,.965+.035*s(t,8.52,8.98));tf('titleD',0,55*(1-s(t,8.6,9.08)));
 opacity('isoWin11',s(t,9.15,9.35));opacity('bootAction',s(t,9.75,10.12));opacity('loading',s(t,10.48,10.68));el('loadFill')?.setAttribute('width',String(737*s(t,10.62,11.28)));
 // Next contextual scene (Setup) actually appears after boot completes
 opacity('stageE',s(t,11.52,12.00));tf('stageE',145*(1-s(t,11.52,12.07)),0,.95+.05*s(t,11.52,12.09));tf('titleE',0,66*(1-s(t,11.58,12.1)));tf('winLogo',0,24*(1-s(t,12.03,12.46)),.92+.08*s(t,12.03,12.46));opacity('doneBadge',s(t,12.82,13.22));
 // cursor only when selection makes sense
 let cx=0,cy=0,o=0;if(t>=3.58&&t<4.80){o=0;}
 else if(t>=6.62&&t<7.93){cx=755-185*s(t,6.66,7.30);cy=1280-160*s(t,6.66,7.30);o=show(t,6.62,6.83,7.69,7.94)}
 else if(t>=9.05&&t<10.44){cx=770-142*s(t,9.05,9.69);cy=1160-94*s(t,9.05,9.69);o=show(t,9.05,9.22,10.15,10.42)}
 tf('cursor',cx,cy,1,0,0,0);opacity('cursor',o);

};
