import * as THREE from "three";
import { paintPane } from "./panePaint";

export { TEX_W, TEX_H } from "./panePaint";

export function createPaneTexture(project) {
  const canvas = document.createElement("canvas");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  paintPane(canvas, project, () => {
    texture.needsUpdate = true;
  });
  return texture;
}
