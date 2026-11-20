export type LayerOffset={x?:number;y?:number;scale?:number;rotation?:number;opacity?:number};
export type DownloadStickmanOptions={downloadFileLabel?:string;downloadPercent?:number;title1?:string;title2?:string;small?:string;showHookText?:boolean;showEndText?:boolean;layerOffsets?:Record<string,LayerOffset>};
export function scene02Svg(frame:number,opts?:DownloadStickmanOptions):string;
