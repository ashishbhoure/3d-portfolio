// Tiny environment checks with no three.js import, so pages can use them
// without pulling the 3D bundle into the main chunk.
export const reducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const coarsePointer = () =>
  typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
