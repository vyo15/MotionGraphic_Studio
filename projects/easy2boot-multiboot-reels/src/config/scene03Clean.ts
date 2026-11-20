import type {Easy2BootScene03Props} from './props';
/** Non-destructive editorial cleanup: base SVG layer source is never flattened or replaced. */
export const cleanScene03Svg = (source:string,p:Easy2BootScene03Props):string => {
  let cleaned=source;
  // Only decorative metadata and redundant headings requested by the user are removed.
  if (p.scene03CleanLayout) {
    for(const id of ['micro','footer','cTitle','dTitle']) {
      const pattern=new RegExp(String.raw`<g id="${id}"[^>]*>[\s\S]*?<\/g>`,'g');
      cleaned=cleaned.replace(pattern,'');
    }
    // UI action already communicates selection; the diagnostic subtitle competes with the action.
    cleaned=cleaned.replace(/<text x="140" y="1299"[^>]*id="element_108"[^>]*>[^<]*<\/text>/g,'');
  }
  return cleaned;
};
