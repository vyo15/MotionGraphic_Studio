/** Satu standar font untuk seluruh scene dan frame cover. */
export const EDITORIAL_FONT_FAMILY = 'Inter, Arial, sans-serif';
const cleanFamily = (fontFamily) => fontFamily.replace(/[{}<>;\n\r]/g, '').trim() || EDITORIAL_FONT_FAMILY;
/**
 * Suntik stylesheet di DALAM SVG, bukan CSS halaman browser.
 * Ini mencegah font serif bawaan saat Remotion merender markup via innerHTML.
 */
export const injectSvgTypography = (svg, fontFamily = EDITORIAL_FONT_FAMILY) => {
    const font = cleanFamily(fontFamily);
    const style = `<style id="editorial-typography">
svg text {font-family:${font} !important; font-kerning:normal;}
svg .heavy {font-weight:850; letter-spacing:-3px;}
svg .med {font-weight:740; letter-spacing:-1.2px;}
svg .ui {font-weight:700; letter-spacing:-.6px;}
</style>`;
    return svg.replace(/(<svg\b[^>]*>)/i, `$1${style}`);
};
