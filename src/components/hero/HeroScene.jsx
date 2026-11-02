import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroProjects } from "../../data";
import { createPaneTexture, TEX_W, TEX_H } from "./paneTexture";

const PANE_W = 3.3;
const PANE_H = PANE_W * (TEX_H / TEX_W);

// Resting layout of the windows: a loose, overlapping stack.
const LAYOUT = [
  { p: [-1.25, 1.0, 0.2], r: [0.02, 0.3, -0.035] }, // lumishot
  { p: [1.45, 1.2, -1.1], r: [0.04, -0.32, 0.03] }, // repoatlas
  { p: [0.25, -0.95, 1.0], r: [-0.04, 0.08, 0.02] }, // skillverse
  { p: [1.7, -0.85, -0.5], r: [-0.02, -0.4, -0.03] }, // tangerine
  { p: [-1.4, -1.2, -0.9], r: [0.03, 0.42, 0.04] }, // vmaas
];

const ease = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

function Pane({ project, index, layout, reduced, onSelect, hovered, setHovered }) {
  const ref = useRef();
  const texture = useMemo(() => createPaneTexture(project), [project]);
  useEffect(() => () => texture.dispose(), [texture]);

  const target = useMemo(() => new THREE.Vector3(...layout.p), [layout]);
  const start = useMemo(
    () => new THREE.Vector3(layout.p[0] * 1.8, layout.p[1] - 3, layout.p[2] - 9),
    [layout]
  );
  const isHovered = hovered === project.id;

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    const k = reduced ? 1 : ease(clamp01((t - 0.15 - index * 0.13) / 1.2));

    m.position.lerpVectors(start, target, k);
    if (!reduced) m.position.y += Math.sin(t * 0.55 + index * 1.7) * 0.06 * k;
    if (isHovered) m.position.z += 0.35;

    m.rotation.set(
      layout.r[0] + (1 - k) * 0.6,
      layout.r[1] + (1 - k) * (index % 2 ? -0.9 : 0.9),
      layout.r[2]
    );
    const s = THREE.MathUtils.lerp(m.scale.x, isHovered ? 1.06 : 1, 0.15);
    m.scale.setScalar(s);
    m.material.opacity = k;
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(project.id);
      }}
      onPointerOut={() => setHovered((h) => (h === project.id ? null : h))}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project.id);
      }}
    >
      <planeGeometry args={[PANE_W, PANE_H]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Rig({ children, reduced, pointer }) {
  const group = useRef();
  const { viewport, size } = useThree();
  const wide = size.width >= 900;
  // Fit the stack to the canvas; on wide screens it sits to the right of the headline.
  const scale = Math.min(1.05, viewport.width / (wide ? 13.8 : 8.6));
  const offsetX = wide ? viewport.width * 0.24 : 0;

  useFrame(() => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.22, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.current.y * 0.12, 0.05);
  });

  return (
    <group ref={group} position={[offsetX, wide ? -0.1 : 0, 0]} scale={scale}>
      {children}
    </group>
  );
}

export default function HeroScene({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    []
  );

  // Track the pointer across the whole page so the stack tilts even over the headline.
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  const label = heroProjects.find((p) => p.id === hovered);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <Rig reduced={reduced} pointer={pointer}>
          {heroProjects.map((project, i) => (
            <Pane
              key={project.id}
              project={project}
              index={i}
              layout={LAYOUT[i % LAYOUT.length]}
              reduced={reduced}
              onSelect={onSelect}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </Rig>
      </Canvas>
      <p className="hero-scene-hint" aria-live="polite">
        {label ? `Open the ${label.name} case study` : "Click a window to open that project"}
      </p>
    </>
  );
}
