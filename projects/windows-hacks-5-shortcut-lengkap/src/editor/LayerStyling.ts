import type React from 'react';
/** Independent CSS transform longhands keep the existing transform:keyframes intact.
 * Layers remain actual DOM/SVG nodes; no screenshot flattening. */
export const layerStyle = (name:string):React.CSSProperties => {
 const key=name.replace(/[^a-zA-Z0-9-]/g,'-').toLowerCase();
 return {
  translate:`var(--l-${key}-translate, 0px 0px)`,
  scale:`var(--l-${key}-scale, 1)`,
  rotate:`var(--l-${key}-rotate, 0deg)`,
  filter:`opacity(var(--l-${key}-alpha, 1)) hue-rotate(var(--l-${key}-hue, 0deg))`,
  zIndex:`var(--l-${key}-z, auto)`,
  visibility:`var(--l-${key}-visibility, visible)` as React.CSSProperties['visibility'],
 };
};
