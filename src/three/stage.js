import * as THREE from "three";

export { THREE };

export { reducedMotion, coarsePointer, hasWebGL } from "./env";

/** Page-wide pointer position in -1..1, shared by every scene. */
export const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.y = (e.clientY / innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

// three r155+ uses physical light units; these helpers keep the prototype's look.
const PI = Math.PI;
export const ambient = (color, i) => new THREE.AmbientLight(color, i * PI);
export const directional = (color, i) => new THREE.DirectionalLight(color, i * PI);
export const point = (color, i, dist) => new THREE.PointLight(color, i * PI, dist, 0);

export function rrShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Box with rounded corners in X/Y and bevelled edges; centred on the origin. */
export function roundedBox(w, h, d, r, b = 0.04) {
  const g = new THREE.ExtrudeGeometry(rrShape(w - 2 * b, h - 2 * b, Math.max(0.01, r - b)), {
    depth: Math.max(0.001, d - 2 * b),
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 3,
    curveSegments: 10,
  });
  g.translate(0, 0, -(d - 2 * b) / 2);
  return g;
}

export function rr2d(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Canvas-backed texture; call tex.redraw() after fonts or images arrive. */
export function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.redraw = () => {
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
    t.needsUpdate = true;
  };
  return t;
}

export function imageTex(src) {
  const t = new THREE.TextureLoader().load(src);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export const fontsReady =
  typeof document !== "undefined" && document.fonts
    ? Promise.all([
        document.fonts.load('800 40px "Bricolage Grotesque"'),
        document.fonts.load('700 40px "Bricolage Grotesque"'),
        document.fonts.load('600 20px "IBM Plex Sans"'),
        document.fonts.load('500 20px "IBM Plex Sans"'),
      ]).catch(() => {})
    : Promise.resolve();

/**
 * Renderer + scene + camera mounted in `el`. Renders only while visible.
 * Returns helpers for picking and plane intersection, and a dispose().
 */
export function makeStage(el, { fov = 35, z = 12 } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  el.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, z);

  const resize = () => {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  let visible = false;
  let alive = true;
  let last = performance.now();
  let loopFn = null;
  const tick = (now) => {
    if (!visible || !alive) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (loopFn) loopFn(dt, now / 1000);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    ([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        requestAnimationFrame(tick);
      }
    },
    { rootMargin: "120px" }
  );
  io.observe(el);

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const setRay = (ev) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
  };

  return {
    renderer,
    scene,
    camera,
    canvas: renderer.domElement,
    set loop(fn) {
      loopFn = fn;
    },
    pick(ev, objects) {
      setRay(ev);
      return ray.intersectObjects(objects, true);
    },
    onPlane(ev, z0 = 0) {
      setRay(ev);
      const out = new THREE.Vector3();
      return ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), -z0), out) ? out : null;
    },
    dispose() {
      alive = false;
      io.disconnect();
      ro.disconnect();
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => {
          m.map?.dispose?.();
          m.dispose?.();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
