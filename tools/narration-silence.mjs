/** Shared semantics for a silent narration beat, not a spoken line. */
export const isSilentNarration = text => !String(text ?? '').trim() || /^\s*\([^)]*(?:tidak ada vo|tanpa vo|visual hold|silent cover)[^)]*\)\s*$/i.test(String(text));
