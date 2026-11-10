import {Easing, interpolate, spring} from 'remotion';

const easing = Easing.bezier(0.22, 1, 0.36, 1);
export const rise = (seconds: number, start: number, end: number) =>
  interpolate(seconds, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});
export const fadeOut = (seconds: number, start: number, end: number) =>
  1 - rise(seconds, start, end);
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const pop = (frame: number, fps: number, delaySeconds: number) => spring({
  frame: frame - delaySeconds * fps, fps, config: {damping: 22, stiffness: 115, mass: 1.05},
});
export type UserTransform = {x: number; y: number; scale: number; rotation: number; opacity: number};
export const defaultUserTransform: UserTransform = {x: 0, y: 0, scale: 1, rotation: 0, opacity: 1};
/** Wrapper animasi di luar Interactive.Div; edit posisi Studio tidak menimpa keyframe. */
export const animationTransform = (dy: number, scale: number, extraRotate = 0) =>
  `translate3d(0, ${dy}px, 0) scale(${scale}) rotate(${extraRotate}deg)`;
