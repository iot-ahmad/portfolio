import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LIME = "#a8f05a";

/**
 * Bounded scroll progress (0 → 1 across the hero's height) passed down
 * from a plain scroll listener — one value drives camera + sculpture.
 */
export type ProgressRef = React.MutableRefObject<number>;

function Sculpture({
  progress,
  reduced,
}: {
  progress: ProgressRef;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const s1 = useRef<THREE.Mesh>(null);
  const s2 = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const size = useThree((s) => s.size);

  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(168,240,90,0.85)");
    g.addColorStop(0.45, "rgba(168,240,90,0.25)");
    g.addColorStop(1, "rgba(168,240,90,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.current;
    const narrow = size.width < 700;

    // responsive placement
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      narrow ? 0.15 : 0.9,
      2,
      delta
    );
    const sc = narrow ? 0.8 : 1;
    const sNow = THREE.MathUtils.damp(group.current.scale.x, sc, 2, delta);
    group.current.scale.setScalar(sNow);

    // satellites drift outward on narrow screens so they clear the headline
    const sat = (mesh: THREE.Mesh | null, bx: number, by: number, bz: number, m: number) => {
      if (!mesh) return;
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, narrow ? bx * m : bx, 2, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, narrow ? by * m : by, 2, delta);
      mesh.position.z = bz;
    };
    sat(s1.current, -2.5, 1.15, -0.6, 1.5);
    sat(s2.current, -1.7, -1.3, 0.4, 1.7);

    if (!reduced) {
      // mouse-responsive parallax
      const { pointer } = state;
      targetRot.current.y = pointer.x * 0.35;
      targetRot.current.x = -pointer.y * 0.22;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetRot.current.y + p * 1.4,
        2.2,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetRot.current.x + p * 0.35,
        2.2,
        delta
      );
      // slow identity rotation on the knot itself
      if (knot.current) {
        knot.current.rotation.z += delta * 0.12;
        knot.current.rotation.y += delta * 0.05;
      }
      // scroll-driven camera drift
      state.camera.position.z = THREE.MathUtils.lerp(6.4, 4.9, p);
      state.camera.position.y = THREE.MathUtils.lerp(0, 0.55, p);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={group} position={[0.9, 0.1, 0]}>
      {/* crumpled chrome knot */}
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.05, 0.34, 256, 40]} />
        <meshStandardMaterial
          color="#e8e6df"
          metalness={1}
          roughness={0.11}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* glass bubbles */}
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.4}
        floatIntensity={reduced ? 0 : 1.1}
      >
        <mesh ref={s1} position={[-2.5, 1.15, -0.6]}>
          <sphereGeometry args={[0.5, 48, 48]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.9}
            roughness={0.05}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.08}
            color="#ffffff"
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      <Float
        speed={reduced ? 0 : 1.1}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.9}
      >
        <mesh ref={s2} position={[-1.7, -1.3, 0.4]}>
          <sphereGeometry args={[0.3, 48, 48]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.6}
            roughness={0.04}
            ior={1.45}
            clearcoat={1}
            color="#ffffff"
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>

      {/* acid lime under-glow */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.5, 7.5]} />
        <meshBasicMaterial
          map={glowTex ?? undefined}
          color={LIME}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* lighting */}
      <pointLight position={[-4, -3, -2]} intensity={26} color={LIME} distance={16} />
      <pointLight position={[4, 3, 3]} intensity={18} color="#ffffff" distance={20} />
      <directionalLight position={[2, 4, 6]} intensity={1.1} color="#f5f3ec" />
      <ambientLight intensity={0.22} />
    </group>
  );
}

export default function Scene3D() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      progress.current = Math.min(1, Math.max(0, window.scrollY / vh));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // pause rendering when the hero is off-screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hero__scene"
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.9s ease" }}
    >
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active && !reduced ? "always" : "demand"}
        camera={{ position: [0, 0, 6.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <Sculpture progress={progress} reduced={reduced} />
        {/* procedural studio environment — chrome needs something to reflect */}
        <Environment resolution={256}>
          <group>
            <Lightformer
              form="rect"
              intensity={4}
              position={[0, 4, -6]}
              scale={[8, 3, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={2.4}
              position={[-5, 0, 2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[6, 1.4, 1]}
              color="#f2f0e9"
            />
            <Lightformer
              form="rect"
              intensity={3}
              position={[5, -1, 1]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[6, 1, 1]}
              color={LIME}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, -4, 3]}
              scale={[3, 3, 1]}
              color={LIME}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
