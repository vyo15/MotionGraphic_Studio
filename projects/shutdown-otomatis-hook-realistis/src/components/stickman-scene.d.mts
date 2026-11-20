export type LayerOffset={x?:number;y?:number;scale?:number;rotation?:number;opacity?:number};
export type StickmanOptions={filmLabel?:string;hook1?:string;hook2?:string;hookSmall?:string;end1?:string;end2?:string;showHookText?:boolean;showEndText?:boolean;layerOffsets?:Record<string,LayerOffset>};
export function sceneSvg(frame:number,opts?:StickmanOptions):string;
export const stickmanBeats:ReadonlyArray<{start:number;end:number;label:string}>;
