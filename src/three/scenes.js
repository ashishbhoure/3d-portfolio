import {
  THREE,
  makeStage,
  roundedBox,
  canvasTex,
  imageTex,
  rr2d,
  fontsReady,
  pointer,
  reducedMotion,
  ambient,
  directional,
  point,
} from "./stage";
import { paintPane } from "../components/hero/panePaint";

/** Live texture of a project's app window (screenshot or drawn mock). */
function paneTexture(project) {
  const c = document.createElement("canvas");
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  paintPane(c, project, () => (t.needsUpdate = true));
  return t;
}

// ---------------------------------------------------------------------------
// Hero: desk with monitor, laptop and throwable tech tiles
// ---------------------------------------------------------------------------
export function heroDesk(el, { screens, onScreenClick }) {
  const reduced = reducedMotion();
  const S = makeStage(el, { fov: 35, z: 14 });
  const { scene } = S;
  scene.add(ambient(0x6a72a8, 0.32));
  const key = directional(0xffffff, 0.75);
  key.position.set(3, 4, 7);
  scene.add(key);
  const blue = point(0x4c6bff, 1.1, 20);
  blue.position.set(-4, 2, 3);
  scene.add(blue);
  const violet = point(0x9b5cff, 1, 20);
  violet.position.set(4, -2, 3);
  scene.add(violet);

  const desk = new THREE.Group();
  scene.add(desk);
  const dark = new THREE.MeshStandardMaterial({ color: 0x141833, roughness: 0.5, metalness: 0.45 });

  const mon = new THREE.Mesh(roundedBox(5.0, 3.2, 0.24, 0.22), dark);
  mon.position.set(0.5, 0.65, 0);
  desk.add(mon);
  const shotTex = screens.map(paneTexture);
  const screenMat = new THREE.MeshBasicMaterial({ map: shotTex[0], toneMapped: false, transparent: true });
  // Pane textures include a shadow margin, so scale the plane slightly past the bezel.
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(5.1, 3.45), screenMat);
  screen.position.set(0.5, 0.65, 0.13);
  desk.add(screen);
  const stand = new THREE.Mesh(roundedBox(0.7, 1.3, 0.25, 0.08), dark);
  stand.position.set(0.5, -1.45, -0.15);
  desk.add(stand);
  const base = new THREE.Mesh(roundedBox(2.2, 0.16, 1.1, 0.07), dark);
  base.position.set(0.5, -2.1, 0);
  desk.add(base);

  const lap = new THREE.Group();
  lap.position.set(-2.1, -1.35, 1.5);
  lap.rotation.y = 0.28;
  desk.add(lap);
  const lapScreen = new THREE.Mesh(roundedBox(2.7, 1.75, 0.1, 0.12), dark);
  lapScreen.position.set(0, 0.62, -0.62);
  lapScreen.rotation.x = -0.18;
  lap.add(lapScreen);
  const lumishot = screens.find((s) => s.id === "lumishot") || screens[0];
  const lapImg = new THREE.Mesh(
    new THREE.PlaneGeometry(2.75, 1.86),
    new THREE.MeshBasicMaterial({ map: paneTexture(lumishot), toneMapped: false, transparent: true })
  );
  lapImg.position.set(0, 0, 0.056);
  lapScreen.add(lapImg);
  const lapBase = new THREE.Mesh(roundedBox(2.9, 0.1, 1.7, 0.08), dark);
  lapBase.position.set(0, -0.28, 0.2);
  lap.add(lapBase);

  const orbs = [
    [-3.4, 2.4, 0.4, 0.22, 0xffb01f],
    [3.6, 0.2, 1.2, 0.3, 0x3ddc97],
    [2.9, -2.4, 1.8, 0.18, 0xff5c9a],
    [-0.6, 3.0, -1, 0.2, 0x4c6bff],
  ].map(([x, y, z, r, c]) => {
    const o = new THREE.Mesh(
      new THREE.SphereGeometry(r, 32, 16),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.1 })
    );
    o.position.set(x, y, z);
    o.userData.base = y;
    desk.add(o);
    return o;
  });

  const labels = [
    ["React", "#4c6bff"],
    ["Node.js", "#3ddc97"],
    ["MongoDB", "#2bb673"],
    ["AWS", "#ffb01f"],
    ["TS", "#9b5cff"],
  ];
  const tileGeo = roundedBox(1.15, 1.15, 0.42, 0.26, 0.06);
  const tiles = labels.map(([txt, col], i) => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(tileGeo, new THREE.MeshStandardMaterial({ color: 0x1a1f45, roughness: 0.4, metalness: 0.5 }));
    const tex = canvasTex(256, 256, (ctx, w, h) => {
      ctx.fillStyle = col;
      rr2d(ctx, 26, 26, 30, 30, 8);
      ctx.fill();
      ctx.fillStyle = "#eef0f8";
      ctx.font = `800 ${txt.length > 4 ? 46 : 64}px "Bricolage Grotesque", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(txt, w / 2, h / 2 + 8);
    });
    fontsReady.then(() => tex.redraw());
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 1.1),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })
    );
    face.position.z = 0.215;
    body.userData.tile = i;
    face.userData.tile = i;
    g.add(body, face);
    desk.add(g);
    const ang = (i / labels.length) * Math.PI * 2;
    return {
      g,
      ang,
      pos: new THREE.Vector3(Math.cos(ang) * 4, Math.sin(ang) * 2.6, 1),
      vel: new THREE.Vector3(),
      prev: new THREE.Vector3(),
      spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0),
      drag: false,
    };
  });
  const pickables = tiles.flatMap((t) => t.g.children);

  let dragging = null;
  let target = null;
  let downAt = null;
  let shotIndex = 0;
  let shotT = 0;
  const onDown = (e) => {
    downAt = { x: e.clientX, y: e.clientY };
    const hit = S.pick(e, pickables)[0];
    if (hit) {
      dragging = tiles[hit.object.userData.tile];
      dragging.drag = true;
      target = S.onPlane(e, dragging.pos.z);
      S.canvas.setPointerCapture(e.pointerId);
      el.classList.add("is-grabbing");
    }
  };
  const onMove = (e) => {
    if (dragging) {
      const p = S.onPlane(e, dragging.pos.z);
      if (p) target = p;
      return;
    }
    const tileHit = S.pick(e, pickables).length > 0;
    const screenHit = !tileHit && S.pick(e, [screen]).length > 0;
    S.canvas.style.cursor = tileHit ? "grab" : screenHit ? "pointer" : "";
  };
  const onUp = (e) => {
    if (dragging) {
      dragging.drag = false;
      dragging = null;
      el.classList.remove("is-grabbing");
      return;
    }
    if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < 6 && S.pick(e, [screen]).length) {
      onScreenClick?.(screens[shotIndex].id);
    }
    downAt = null;
  };
  S.canvas.addEventListener("pointerdown", onDown);
  S.canvas.addEventListener("pointermove", onMove);
  S.canvas.addEventListener("pointerup", onUp);
  S.canvas.addEventListener("pointercancel", () => {
    if (dragging) dragging.drag = false;
    dragging = null;
  });

  const anchor = new THREE.Vector3();
  S.loop = (dt, t) => {
    shotT += dt;
    if (shotT > 4) {
      shotT = 0;
      shotIndex = (shotIndex + 1) % shotTex.length;
      screenMat.map = shotTex[shotIndex];
      screenMat.needsUpdate = true;
    }
    key.position.set(pointer.x * 7, -pointer.y * 5 + 3, 7);
    if (!reduced) {
      desk.rotation.y += (pointer.x * 0.16 - desk.rotation.y) * 0.05;
      desk.rotation.x += (pointer.y * 0.08 - desk.rotation.x) * 0.05;
      orbs.forEach((o) => (o.position.y = o.userData.base + Math.sin(t * 1.3 + o.position.x) * 0.15));
    }
    for (const tl of tiles) {
      tl.prev.copy(tl.pos);
      if (!reduced) tl.ang += dt * 0.18;
      anchor.set(Math.cos(tl.ang) * 3.9 + 0.3, Math.sin(tl.ang) * 2.5 + 0.4, 1.1 + Math.sin(tl.ang * 2) * 0.5);
      if (tl.drag && target) {
        tl.pos.lerp(target, 0.45);
        tl.vel.copy(tl.pos).sub(tl.prev).divideScalar(Math.max(dt, 0.001));
      } else {
        tl.vel.addScaledVector(anchor.clone().sub(tl.pos), 5 * dt).multiplyScalar(1 - 1.6 * dt);
        tl.pos.addScaledVector(tl.vel, dt);
        if (Math.abs(tl.pos.x - 0.5) < 3 && Math.abs(tl.pos.y - 0.65) < 2.1 && tl.pos.z < 0.75 && tl.pos.z > -0.6) {
          tl.pos.z = 0.75;
          tl.vel.z = Math.abs(tl.vel.z) * 0.6 + 1;
        }
      }
      tl.g.position.copy(tl.pos);
      tl.spin.x += (tl.vel.y * 0.25 - tl.spin.x) * 0.1;
      tl.spin.y += (tl.vel.x * 0.25 - tl.spin.y) * 0.1;
      if (!tl.drag) {
        tl.g.rotation.x += tl.spin.x * dt;
        tl.g.rotation.y += tl.spin.y * dt;
      }
      tl.g.rotation.x *= 0.985;
      tl.g.rotation.y *= 0.985;
    }
  };
  return () => S.dispose();
}

// ---------------------------------------------------------------------------
// Stack: 3D keyboard, one skill per key
// ---------------------------------------------------------------------------
export function skillKeyboard(el, { skills, onPress }) {
  const reduced = reducedMotion();
  const S = makeStage(el, { fov: 34, z: 13 });
  const { scene, camera } = S;
  camera.position.set(0, 7.2, 6.4);
  camera.lookAt(0, -0.4, 0.5);
  scene.add(ambient(0x6a72a8, 0.35));
  const dl = directional(0xffffff, 0.7);
  dl.position.set(-4, 8, 6);
  scene.add(dl);
  const pl = point(0x4c6bff, 1.2, 16);
  pl.position.set(0, 3, 3);
  scene.add(pl);

  const kb = new THREE.Group();
  scene.add(kb);
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const ks = 0.92;
  const pitch = ks + 0.12;
  const plate = new THREE.Mesh(
    roundedBox(10 * pitch + 0.7, 3 * pitch + 0.7, 0.35, 0.35),
    new THREE.MeshStandardMaterial({ color: 0x151832, roughness: 0.5, metalness: 0.5 })
  );
  plate.rotation.x = -Math.PI / 2;
  plate.position.y = -0.25;
  kb.add(plate);
  const keyGeo = roundedBox(ks, ks, 0.46, 0.18, 0.05);
  const keys = {};
  rows.forEach((row, r) => {
    [...row].forEach((L, i) => {
      const s = skills[L];
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: 0x1c2148,
        roughness: 0.45,
        metalness: 0.4,
        emissive: new THREE.Color(s ? s.c : "#000000"),
        emissiveIntensity: 0,
      });
      const body = new THREE.Mesh(keyGeo, mat);
      body.rotation.x = -Math.PI / 2;
      const tex = canvasTex(256, 256, (ctx) => {
        ctx.fillStyle = "#eef0f8";
        ctx.font = '800 92px "Bricolage Grotesque", sans-serif';
        ctx.textBaseline = "top";
        ctx.fillText(L, 26, 18);
        if (s) {
          ctx.fillStyle = s.c;
          rr2d(ctx, 196, 30, 32, 32, 8);
          ctx.fill();
          ctx.fillStyle = "#c9cfe8";
          ctx.font = `600 ${s.name.length > 9 ? 30 : 36}px "IBM Plex Sans", sans-serif`;
          ctx.textBaseline = "bottom";
          ctx.fillText(s.name, 24, 232);
        }
      });
      fontsReady.then(() => tex.redraw());
      const top = new THREE.Mesh(
        new THREE.PlaneGeometry(ks * 0.92, ks * 0.92),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })
      );
      top.rotation.x = -Math.PI / 2;
      top.position.y = 0.236;
      g.add(body, top);
      g.position.set((i - (row.length - 1) / 2) * pitch + r * 0.18, 0, (r - 1) * pitch);
      body.userData.L = L;
      top.userData.L = L;
      kb.add(g);
      keys[L] = { g, mat, press: 0 };
    });
  });
  const fit = () => kb.scale.setScalar(Math.min(1, el.clientWidth / 760));
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(el);

  const pickables = Object.values(keys).flatMap((k) => k.g.children);
  const press = (L) => {
    const k = keys[L];
    if (!k) return;
    k.press = 1;
    onPress?.(L);
  };
  S.canvas.addEventListener("pointerdown", (e) => {
    const hit = S.pick(e, pickables)[0];
    if (hit) press(hit.object.userData.L);
  });
  S.canvas.addEventListener("pointermove", (e) => {
    S.canvas.style.cursor = S.pick(e, pickables).length ? "pointer" : "";
  });
  S.loop = (dt) => {
    if (!reduced) kb.rotation.y += (pointer.x * 0.12 - kb.rotation.y) * 0.05;
    for (const L in keys) {
      const k = keys[L];
      k.press = Math.max(0, k.press - dt * 2.2);
      k.g.position.y = -0.16 * Math.min(1, k.press * 2);
      k.mat.emissiveIntensity = k.press * 0.9;
    }
  };
  return {
    press,
    dispose() {
      ro.disconnect();
      S.dispose();
    },
  };
}

// ---------------------------------------------------------------------------
// About: dotted globe with arcs from Indore
// ---------------------------------------------------------------------------
const ll = (lat, lon, r) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

export function timezoneGlobe(el, { home, cities }) {
  const reduced = reducedMotion();
  const S = makeStage(el, { fov: 35, z: 8 });
  const { scene } = S;
  const R = 2.3;
  const globe = new THREE.Group();
  scene.add(globe);
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 32), new THREE.MeshBasicMaterial({ color: 0x141836 })));
  const n = 2600;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * Math.PI * (3 - Math.sqrt(5));
    pos.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3);
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  globe.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x4c6bff, size: 0.035, transparent: true, opacity: 0.75 })));
  scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.12, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0x4c6bff, transparent: true, opacity: 0.06, side: THREE.BackSide })
    )
  );
  const homeV = ll(home.lat, home.lon, R);
  const homeDot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 8), new THREE.MeshBasicMaterial({ color: 0xffb01f }));
  homeDot.position.copy(homeV);
  globe.add(homeDot);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.12, 0.16, 32),
    new THREE.MeshBasicMaterial({ color: 0xffb01f, transparent: true, side: THREE.DoubleSide })
  );
  ring.position.copy(homeV.clone().multiplyScalar(1.002));
  ring.lookAt(homeV.clone().multiplyScalar(2));
  globe.add(ring);
  const arcs = cities.map((c) => {
    const v = ll(c.lat, c.lon, R);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), new THREE.MeshBasicMaterial({ color: 0x3ddc97 }));
    dot.position.copy(v);
    globe.add(dot);
    const mid = homeV.clone().add(v).multiplyScalar(0.5);
    mid.setLength(R * (1.25 + (homeV.distanceTo(v) / R) * 0.25));
    const mat = new THREE.MeshBasicMaterial({ color: 0x9b5cff, transparent: true, opacity: 0.35 });
    globe.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(homeV, mid, v), 48, 0.012, 6, false), mat));
    return { c, mat };
  });

  let rotY = -1.4;
  let rotX = 0.35;
  let vel = 0;
  let drag = null;
  let tY = null;
  let tX = 0;
  const focus = (city) => {
    arcs.forEach((a) => {
      a.mat.opacity = a.c === city ? 1 : 0.2;
      a.mat.color.set(a.c === city ? 0xffb01f : 0x9b5cff);
    });
    const v = ll(city.lat, city.lon, 1);
    tY = -Math.atan2(v.x, v.z);
    tX = ((city.lat * Math.PI) / 180) * 0.6;
    vel = 0;
    while (tY - rotY > Math.PI) tY -= Math.PI * 2;
    while (rotY - tY > Math.PI) tY += Math.PI * 2;
  };
  S.canvas.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY };
    tY = null;
    S.canvas.setPointerCapture(e.pointerId);
    el.classList.add("is-grabbing");
  });
  S.canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag = { x: e.clientX, y: e.clientY };
    rotY += dx * 0.008;
    vel = dx * 0.008;
    rotX = Math.max(-1, Math.min(1, rotX + dy * 0.005));
  });
  const up = () => {
    drag = null;
    el.classList.remove("is-grabbing");
  };
  S.canvas.addEventListener("pointerup", up);
  S.canvas.addEventListener("pointercancel", up);
  S.loop = (dt, t) => {
    if (tY !== null) {
      rotY += (tY - rotY) * 0.08;
      rotX += (tX - rotX) * 0.08;
      if (Math.abs(tY - rotY) < 0.001) tY = null;
    } else if (!drag) {
      rotY += vel;
      vel *= 0.95;
      if (!reduced && Math.abs(vel) < 0.0005) rotY += dt * 0.12;
    }
    globe.rotation.set(rotX, rotY, 0);
    ring.scale.setScalar(1 + (t % 2) * 0.8);
    ring.material.opacity = 1 - (t % 2) / 2;
  };
  return { focus, dispose: () => S.dispose() };
}

// ---------------------------------------------------------------------------
// About: ID badge on a lanyard (verlet rope), drag to swing, click to flip
// ---------------------------------------------------------------------------
export function lanyardBadge(el, { portrait, profile }) {
  const reduced = reducedMotion();
  const S = makeStage(el, { fov: 35, z: 11 });
  const { scene } = S;
  scene.add(ambient(0x9aa0d0, 0.5));
  const dl = directional(0xffffff, 0.8);
  dl.position.set(3, 4, 6);
  scene.add(dl);
  const pl = point(0x9b5cff, 2, 15);
  pl.position.set(-3, 1, 4);
  scene.add(pl);

  const SEG = 14;
  const LEN = 0.17;
  const anchor = new THREE.Vector3(0, 3.4, 0);
  const pts = Array.from({ length: SEG + 1 }, (_, i) => ({
    p: new THREE.Vector3(0, anchor.y - i * LEN, 0),
    o: new THREE.Vector3(0, anchor.y - i * LEN, 0),
  }));
  const ropeMat = new THREE.MeshStandardMaterial({ color: 0x4c6bff, roughness: 0.6, emissive: 0x1a2a80, emissiveIntensity: 0.4 });
  let rope = null;

  const img = new Image();
  img.src = portrait;
  const front = canvasTex(512, 740, (ctx, w) => {
    ctx.fillStyle = "#171a2e";
    rr2d(ctx, 0, 0, w, 740, 36);
    ctx.fill();
    const g = ctx.createLinearGradient(0, 0, w, 220);
    g.addColorStop(0, "#4c6bff");
    g.addColorStop(1, "#9b5cff");
    ctx.fillStyle = g;
    rr2d(ctx, 0, 0, w, 240, 36);
    ctx.fill();
    ctx.fillRect(0, 200, w, 40);
    ctx.fillStyle = "#0e1020";
    rr2d(ctx, w / 2 - 50, 26, 100, 22, 11);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = '800 30px "Bricolage Grotesque", sans-serif';
    ctx.fillText("AB", 36, 110);
    ctx.font = '600 20px "IBM Plex Sans", sans-serif';
    ctx.fillText("DEVELOPER PASS", 36, 150);
    ctx.save();
    rr2d(ctx, w / 2 - 110, 150, 220, 260, 28);
    ctx.clip();
    ctx.fillStyle = "#20243d";
    ctx.fillRect(w / 2 - 110, 150, 220, 260);
    if (img.complete && img.naturalWidth) {
      const s = Math.max(220 / img.naturalWidth, 260 / img.naturalHeight);
      ctx.drawImage(img, w / 2 - (img.naturalWidth * s) / 2, 150, img.naturalWidth * s, img.naturalHeight * s);
    }
    ctx.restore();
    ctx.textAlign = "center";
    ctx.fillStyle = "#eef0f8";
    ctx.font = '800 48px "Bricolage Grotesque", sans-serif';
    ctx.fillText(profile.name, w / 2, 480);
    ctx.fillStyle = "#9ba3c0";
    ctx.font = '500 26px "IBM Plex Sans", sans-serif';
    ctx.fillText("Full-stack developer", w / 2, 522);
    ctx.fillText("3Columns · Indore, India", w / 2, 558);
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#3ddc97";
    rr2d(ctx, w / 2 - 150, 600, 300, 50, 12);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#3ddc97";
    ctx.font = '600 22px "IBM Plex Sans", sans-serif';
    ctx.fillText("Open to freelance work", w / 2, 633);
    ctx.fillStyle = "#2c3150";
    for (let i = 0; i < 40; i++) ctx.fillRect(56 + i * 10, 680, ((i * 7) % 3) + 2, 30);
    ctx.textAlign = "left";
  });
  const back = canvasTex(512, 740, (ctx, w) => {
    ctx.fillStyle = "#171a2e";
    rr2d(ctx, 0, 0, w, 740, 36);
    ctx.fill();
    ctx.fillStyle = "#0e1020";
    rr2d(ctx, w / 2 - 50, 26, 100, 22, 11);
    ctx.fill();
    ctx.fillStyle = "#eef0f8";
    ctx.font = '800 56px "Bricolage Grotesque", sans-serif';
    ctx.fillText("Let's talk", 44, 150);
    [
      ["Email", profile.email],
      ["LinkedIn", "in/ashishbhoure"],
      ["GitHub", "github.com/ashishbhoure"],
      ["Based in", profile.location],
    ].forEach(([k, v], i) => {
      ctx.fillStyle = "#9ba3c0";
      ctx.font = '500 22px "IBM Plex Sans", sans-serif';
      ctx.fillText(k, 44, 230 + i * 92);
      ctx.fillStyle = "#eef0f8";
      ctx.font = '600 28px "IBM Plex Sans", sans-serif';
      ctx.fillText(v, 44, 266 + i * 92);
    });
    const g = ctx.createLinearGradient(0, 640, w, 740);
    g.addColorStop(0, "#4c6bff");
    g.addColorStop(1, "#9b5cff");
    ctx.fillStyle = g;
    rr2d(ctx, 44, 620, w - 88, 70, 16);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = '700 28px "IBM Plex Sans", sans-serif';
    ctx.fillText("Start a project", w / 2, 665);
    ctx.textAlign = "left";
  });
  img.onload = () => front.redraw();
  fontsReady.then(() => {
    front.redraw();
    back.redraw();
  });

  const CW = 2.1;
  const CH = 3.04;
  const card = new THREE.Group();
  scene.add(card);
  const pivot = new THREE.Group();
  card.add(pivot);
  const slab = new THREE.Mesh(roundedBox(CW, CH, 0.06, 0.18, 0.02), new THREE.MeshStandardMaterial({ color: 0x20243d, roughness: 0.4, metalness: 0.2 }));
  const fMesh = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH), new THREE.MeshStandardMaterial({ map: front, transparent: true, roughness: 0.35, metalness: 0.05 }));
  fMesh.position.z = 0.032;
  const bMesh = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH), new THREE.MeshStandardMaterial({ map: back, transparent: true, roughness: 0.35, metalness: 0.05 }));
  bMesh.position.z = -0.032;
  bMesh.rotation.y = Math.PI;
  const clip = new THREE.Mesh(roundedBox(0.5, 0.3, 0.12, 0.06, 0.02), new THREE.MeshStandardMaterial({ color: 0xb9c2e8, metalness: 0.9, roughness: 0.25 }));
  clip.position.y = CH / 2 + 0.08;
  pivot.add(slab, fMesh, bMesh, clip);
  pivot.position.y = -(CH / 2 + 0.2);
  const pickables = [slab, fMesh, bMesh, clip];

  let flip = 0;
  let flipT = 0;
  let drag = null;
  S.canvas.addEventListener("pointerdown", (e) => {
    if (S.pick(e, pickables).length) {
      drag = { x: e.clientX, y: e.clientY, moved: false };
      S.canvas.setPointerCapture(e.pointerId);
      el.classList.add("is-grabbing");
    }
  });
  S.canvas.addEventListener("pointermove", (e) => {
    if (!drag) {
      S.canvas.style.cursor = S.pick(e, pickables).length ? "grab" : "";
      return;
    }
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) drag.moved = true;
    const p = S.onPlane(e, 0);
    if (p) drag.target = p.add(new THREE.Vector3(0, 1.4, 0));
  });
  const up = () => {
    if (!drag) return;
    if (!drag.moved) flipT = flipT ? 0 : Math.PI;
    drag = null;
    el.classList.remove("is-grabbing");
  };
  S.canvas.addEventListener("pointerup", up);
  S.canvas.addEventListener("pointercancel", up);

  const G = new THREE.Vector3(0, -14, 0);
  const tmp = new THREE.Vector3();
  let swing = 0;
  if (!reduced) pts[SEG].o.x -= 0.025;
  S.loop = (dt, t) => {
    const h = Math.min(dt, 1 / 30) / 2;
    for (let s = 0; s < 2; s++) {
      for (let i = 1; i <= SEG; i++) {
        const q = pts[i];
        tmp.copy(q.p).sub(q.o).multiplyScalar(0.985);
        q.o.copy(q.p);
        q.p.add(tmp).addScaledVector(G, h * h * (i === SEG ? 1.6 : 1));
      }
      if (drag && drag.target) pts[SEG].p.lerp(drag.target, 0.35);
      for (let k = 0; k < 14; k++) {
        pts[0].p.copy(anchor);
        for (let i = 0; i < SEG; i++) {
          const a = pts[i].p;
          const b = pts[i + 1].p;
          tmp.copy(b).sub(a);
          const d = tmp.length() || 1e-6;
          const diff = (d - LEN) / d;
          if (i === 0) b.addScaledVector(tmp, -diff);
          else {
            a.addScaledVector(tmp, diff * 0.5);
            b.addScaledVector(tmp, -diff * 0.5);
          }
        }
      }
      pts[0].p.copy(anchor);
      for (const q of pts) q.p.z = Math.max(-0.6, Math.min(0.6, q.p.z));
    }
    if (rope) {
      rope.geometry.dispose();
      scene.remove(rope);
    }
    rope = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((q) => q.p)), 48, 0.04, 6, false), ropeMat);
    scene.add(rope);
    const end = pts[SEG].p;
    const prev = pts[SEG - 1].p;
    card.position.copy(end);
    card.rotation.z = Math.atan2(end.x - prev.x, prev.y - end.y);
    swing += ((end.x - pts[SEG].o.x) * 6 - swing) * 0.1;
    flip += (flipT - flip) * 0.12;
    pivot.rotation.y = flip + swing + (reduced ? 0 : Math.sin(t * 0.8) * 0.08);
  };
  return () => S.dispose();
}

export { imageTex };
