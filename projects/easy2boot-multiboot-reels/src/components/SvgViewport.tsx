import React from 'react';
import {injectSvgTypography, EDITORIAL_FONT_FAMILY} from '../config/typography';
/** Layer SVG tetap independen: font disamakan pada semua preview/render. */
export const SvgViewport = React.forwardRef<HTMLDivElement,{markup:string;fontFamily?:string}>(
  ({markup,fontFamily=EDITORIAL_FONT_FAMILY},ref)=>(
    <div ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',fontFamily}}
      dangerouslySetInnerHTML={{__html:injectSvgTypography(markup,fontFamily)}} />
  )
);
SvgViewport.displayName='SvgViewport';
