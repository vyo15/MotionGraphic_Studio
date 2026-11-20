/** Subtitle timings are DRAFT until an actual voice-over is supplied. All frames local to scene. */
export type Cue={from:number;to:number;index:number};
export const SCENE03_CUES:ReadonlyArray<Cue>=[
 {from:12,to:137,index:0},{from:137,to:229,index:1},
 {from:229,to:327,index:2},{from:327,to:422,index:3},
];
export const SCENE04_CUES:ReadonlyArray<Cue>=[
 {from:10,to:143,index:0},{from:143,to:308,index:1},{from:308,to:456,index:2},
];
export const TEXT_VO_STYLE={
 x:540,y:1550,fontSize:43,fontWeight:760,fontFamily:'Inter, Arial, sans-serif',
 fill:'#202628',stroke:'#F7F7F5',strokeWidth:5,enterFrames:7,exitFrames:7,
} as const;
