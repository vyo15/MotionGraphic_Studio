"""Original deterministic synthesized starter SFX. No samples, network or packages.
Run only into a new directory, never overwrite an existing library.
"""
import hashlib, json, math, random, struct, sys, wave
from pathlib import Path
SR=48000
SPECS={
 'ui-click':('click',.10, [ 'ui','click','button','short']),
 'ui-tap':('click',.075,['ui','tap','click','soft']),
 'ui-toggle':('toggle',.17,['ui','toggle','switch']),
 'ui-select':('pop',.14,['ui','select','pop']),
 'ui-confirm':('confirm',.30,['ui','success','confirm','status']),
 'ui-error':('error',.25,['ui','error','warning','status']),
 'ui-notification':('confirm',.37,['ui','notification','chime']),
 'motion-pop':('pop',.18,['motion','pop','reveal']),
 'motion-tick':('tick',.09,['motion','tick','data','number']),
 'motion-impact-soft':('impact',.28,['motion','impact','soft']),
 'motion-impact-dry':('impact',.17,['motion','impact','dry']),
 'motion-slide':('sweep',.32,['motion','slide','reflow']),
 'motion-whoosh-short':('sweep',.25,['motion','whoosh','transition']),
 'motion-whoosh-long':('sweep',.48,['motion','whoosh','transition','long']),
 'motion-reveal':('reveal',.36,['motion','reveal','focus']),
 'motion-riser':('riser',.55,['motion','riser','anticipation']),
 'motion-settle':('pop',.13,['motion','settle','hold']),
 'motion-fold':('fold',.29,['motion','fold','morph']),
 'data-step':('tick',.12,['data','step','tick']),
 'data-complete':('confirm',.26,['data','complete','success']),
}
def render(name, style, duration):
    rng=random.Random(name); n=round(duration*SR); a=[]; low=0.; phase=0.
    variant=rng.uniform(.88,1.12)
    for i in range(n):
        t=i/SR; u=i/(n-1); noise=rng.uniform(-1,1); low=.84*low+.16*noise; high=noise-low
        if style=='click': v=(.75*high+.25*math.sin(2*math.pi*1850*variant*t))*math.exp(-t/ .009)
        elif style=='toggle': v=.65*high*math.exp(-t/.009)+(0 if t<.055 else .6*math.sin(2*math.pi*650*variant*(t-.055))*math.exp(-(t-.055)/.014))
        elif style=='tick': v=(.5*high+.6*math.sin(2*math.pi*1100*variant*t))*math.exp(-t/.012)
        elif style=='pop': v=(.8*math.sin(2*math.pi*variant*(420*t+20*(1-math.exp(-t/.035))))+.15*low)*math.exp(-t/.028)
        elif style=='impact': v=(.66*math.sin(2*math.pi*variant*(95*t+3*(1-math.exp(-t/.04))))+.5*low)*math.exp(-t/.048)
        elif style in ('confirm','error'):
            j=0 if t<duration*.31 else 1; tt=t-j*duration*.31; f=([660,880] if style=='confirm' else [350,275])[j]*variant
            v=(math.sin(2*math.pi*f*tt)+.13*math.sin(2*math.pi*f*2*tt))*min(1,tt/.009)*math.exp(-tt/.045)
        elif style in ('sweep','fold'):
            env=math.sin(math.pi*u)**2
            v=(.83*low+.17*high)*env + (.10*math.sin(2*math.pi*(150*t+1000*t*t))*env if style=='fold' else 0)
        else:
            f=variant*(240+850*u); phase+=2*math.pi*f/SR
            env=(math.sin(math.pi*u)**2 if style=='reveal' else u*u*min(1,(1-u)*9))
            v=(.65*math.sin(phase)+.15*math.sin(2*phase)+.22*low)*env
        a.append(v*min(1,i/96,(n-1-i)/384))
    peak=max(abs(x) for x in a); pcm=[round(x/peak*0.65*32767) for x in a]
    # A timing reference, not an inference about visual sync: actual absolute peak.
    return pcm,max(range(n),key=lambda i:abs(pcm[i]))
def main():
    out=Path(sys.argv[1]); out.mkdir(parents=True,exist_ok=False); (out/'audio').mkdir(); entries=[]
    for name,(style,duration,tags) in SPECS.items():
        pcm,impact=render(name,style,duration); p=out/'audio'/f'{name}.wav'
        with wave.open(str(p),'wb') as w:
            w.setparams((1,2,SR,0,'NONE','not compressed')); w.writeframes(struct.pack(f'<{len(pcm)}h',*pcm))
        entries.append(dict(id='starter-'+name,file='audio/'+p.name,character='synthetic',tags=tags,impactSample=impact,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),source=dict(kind='own',title=name,license='CC0-1.0',creator='MotionGraphic Studio original synthesized starter',sourceUrl='https://creativecommons.org/publicdomain/zero/1.0/'),gainDb=-16))
    (out/'catalog.json').write_text(json.dumps(dict(schemaVersion=1,assets=entries),indent=2)+'\n',encoding='utf8')
if __name__=='__main__': main()
