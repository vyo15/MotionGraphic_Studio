/** Frame-driven preset: scene 04, independent of previous/following scenes. */
export const animateScene04 = (root:Element,f:number):void=>{
const el=(id:string):SVGElement=>root.querySelector<SVGElement>(`#${id}`)!;
const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=(x:number)=>{x=clamp(x);return x*x*(3-2*x)};
const z=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
const show=(t:number,a:number,b:number,c:number,d:number)=>z(t,a,b)*(1-z(t,c,d));
const opa=(id:string,v:number)=>el(id).setAttribute('opacity',clamp(v).toFixed(4));
const move=(id:string,x=0,y=0,s=1,r=0,cx=540,cy=1000)=>el(id).setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${cx} ${cy}) rotate(${r.toFixed(2)}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`);
const t=f/30;el('timebar').setAttribute('width',String(904*clamp(t/16)));
// Scene03 closes on USB SIAP / _ISO; pull _ISO forward into folder explorer (same object continuity)
opa('carry',1-z(t,.12,.85));move('carry',-235*z(t,.06,.84),-115*z(t,.06,.84),1-.18*z(t,.06,.84));move('carryFolder',-135*z(t,.08,.92),-240*z(t,.08,.92),1+.20*z(t,.08,.92));
const a=show(t,.42,.94,2.90,3.25);opa('intro',a);move('intro',190*(1-z(t,.42,.98))-150*z(t,2.87,3.25),0,.97+.03*z(t,.42,1.0));move('introTitle',0,53*(1-z(t,.5,1.03)));move('introExplorer',0,70*(1-z(t,.75,1.3)),.90+.10*z(t,.75,1.3));
['introFolder1','introFolder2','introFolder3'].forEach((id,i)=>{const p=z(t,1.35+i*.24,1.80+i*.24);move(id,0,52*(1-p),.80+.20*p);opa(id,p)});
move('introPointer',830-260*z(t,1.42,2.12),1250-185*z(t,1.42,2.12),1,0,0,0);opa('introPointer',show(t,1.2,1.5,2.60,2.88));
// dedicated dynamic focus per ISO, single meaningful action and visible completed copy
const stages: Array<[string, number, number]> = [['win10',3.08,6.22],['win11',6.10,9.27],['linux',9.12,12.31]];
for(const [key,start,end] of stages){const p=t-start,enter=z(t,start,start+.42),exit=z(t,end-.40,end);opa(key,enter*(1-exit));move(key,210*(1-enter)-175*exit,0,.965+.035*enter);
  move(key+'Title',0,54*(1-z(p,.04,.55)));
  move(key+'Win',0,60*(1-z(p,.10,.77)),.91+.09*z(p,.1,.77));
  // Drag data icon from downloads direction into Explorer target row; disappears after copy completes
  const fly=z(p,.72,1.68);move(key+'Flying',110+520*fly,895+150*fly-108*Math.sin(Math.PI*fly),.88-.40*fly,-8+10*fly,0,0);
  opa(key+'Flying',show(p,.51,.70,1.59,1.9));
  move(key+'Cursor',625+100*z(p,.47,1.32),1140-112*z(p,.47,1.32),1,0,0,0);opa(key+'Cursor',show(p,.32,.55,1.63,1.93));
  el(key+'Bar').setAttribute('width',String(772*z(p,1.40,2.16)));
  opa(key+'Check',z(p,1.94,2.18));opa(key+'Done',z(p,1.94,2.18));
}
// new ISO leaves earlier 3 intact. Last frame prepares transition to booting.
const q=z(t,12.02,12.48);opa('final',q);move('final',215*(1-q),0,.96+.04*q);move('finalTitle',0,46*(1-z(t,12.1,12.65)));move('finalWindow',0,76*(1-z(t,12.2,12.82)),.91+.09*z(t,12.2,12.82));
for(const [id,a] of ([['check1',12.45],['check2',12.67],['check3',12.89]] as [string,number][]))opa(id,z(t,a,a+.17));
const extra=z(t,13.05,14.08);move('extraFile',60+624*extra,1325-165*extra-150*Math.sin(Math.PI*extra),.9-.44*extra,0,0,0);opa('extraFile',show(t,12.91,13.12,14.08,14.38));opa('finalChip',z(t,14.35,14.67));move('finalChip',0,35*(1-z(t,14.35,14.74)),.95+.05*z(t,14.35,14.74));

};
