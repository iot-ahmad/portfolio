import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Lightformer, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LIME = "#a8f05a";

/**
 * Creates the faceted crystal cube inspired by the reference design:
 * Dark metallic/chrome crystal facets with glowing acid-lime light bursting from cuts.
 */
function FacetedCube({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Procedural glow texture for floor reflection
  const floorGlowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(168,240,90,0.7)");
    g.addColorStop(0.2, "rgba(168,240,90,0.35)");
    g.addColorStop(0.5, "rgba(168,240,90,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(c);
  }, []);

  // Procedural facet geometry for the main crystal cube
  const facetGeometries = useMemo(() => {
    // Main body: faceted box
    const mainBox = new THREE.BoxGeometry(1.6, 1.6, 1.6, 2, 2, 2);
    // Displace vertices to create sharp crystal facets
    const pos = mainBox.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Asymmetric beveling
      if (x > 0 && y > 0) {
        pos.setX(i, x * 1.15);
        pos.setY(i, y * 0.85);
      }
      if (x < 0 && z > 0) {
        pos.setZ(i, z * 1.2);
        pos.setX(i, x * 0.9);
      }
    }
    mainBox.computeVertexNormals();

    // Secondary angled slice mesh (top-right crystal wedge)
    const wedge1 = new THREE.ConeGeometry(0.9, 1.4, 4);
    wedge1.rotateZ(Math.PI / 4);

    // Third slice (bottom crevice wedge)
    const wedge2 = new THREE.TetrahedronGeometry(1.0, 0);

    return { mainBox, wedge1, wedge2 };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (!reduced) {
      // Smooth interactive parallax rotation
      const { pointer } = state;
      const targetY = pointer.x * 0.45;
      const targetX = -pointer.y * 0.3;

      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        targetY + 0.3,
        2.5,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        targetX + 0.25,
        2.5,
        delta
      );

      // Slow ambient hover pulse
      if (ringRef.current) {
        ringRef.current.rotation.z += delta * 0.15;
      }
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.2;
      }
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Floating faceted crystal cube */}
      <Float
        speed={reduced ? 0 : 1.5}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.6}
      >
        <group ref={group} rotation={[0.35, 0.45, -0.1]}>
          {/* Main Dark Chrome Faceted Body */}
          <mesh geometry={facetGeometries.mainBox} castShadow receiveShadow>
            <meshStandardMaterial
              color="#1a1c18"
              metalness={0.92}
              roughness={0.16}
              flatShading
              envMapIntensity={1.8}
            />
          </mesh>

          {/* Sliced Angled Wedge 1 (Mirror-finish chrome highlight) */}
          <mesh
            geometry={facetGeometries.wedge1}
            position={[0.55, 0.55, 0.3]}
            rotation={[0.2, -0.4, 0.8]}
          >
            <meshStandardMaterial
              color="#e6e8e2"
              metalness={0.98}
              roughness={0.08}
              flatShading
              envMapIntensity={2.4}
            />
          </mesh>

          {/* Sliced Angled Wedge 2 (Dark graphite with lime edge reflections) */}
          <mesh
            geometry={facetGeometries.wedge2}
            position={[-0.45, -0.5, 0.45]}
            rotation={[0.5, 0.2, -0.3]}
          >
            <meshStandardMaterial
              color="#141512"
              metalness={0.88}
              roughness={0.22}
              flatShading
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Glowing Crevice Core (Neon Acid Lime light bursting from fissures) */}
          <mesh
            ref={coreRef}
            position={[0.08, -0.05, 0.1]}
            scale={[0.7, 0.7, 0.7]}
          >
            <octahedronGeometry args={[0.7, 0]} />
            <meshBasicMaterial color={LIME} />
          </mesh>

          {/* Internal intense neon glow lights */}
          <pointLight position={[0.2, 0.1, 0.4]} intensity={18} color={LIME} distance={5} />
          <pointLight position={[-0.3, -0.2, 0.2]} intensity={12} color={LIME} distance={4} />
          <pointLight position={[0.4, -0.4, -0.2]} intensity={14} color={LIME} distance={4} />

          {/* Fine geometric wireframe edges accentuating crystal facets */}
          <lineSegments>
            <edgesGeometry args={[facetGeometries.mainBox, 28]} />
            <lineBasicMaterial color={LIME} transparent opacity={0.35} />
          </lineSegments>
        </group>
      </Float>

      {/* Orbiting Thin Wireframe Rings (as in reference image) */}
      <group ref={ringRef} rotation={[-0.6, 0.4, 0]}>
        {/* Large orbital wireframe circle */}
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[1.9, 1.912, 128]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Tilted secondary orbital circle */}
        <mesh position={[0, 0, 0]} rotation={[0.5, 0.8, 0]}>
          <ringGeometry args={[2.2, 2.21, 128]} />
          <meshBasicMaterial
            color={LIME}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Floor reflection & neon acid-lime caustic shadow */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 4.2]} />
        <meshBasicMaterial
          map={floorGlowTex ?? undefined}
          color={LIME}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      {/* Dark ground plane with subtle specular reflection */}
      <mesh position={[0, -1.81, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial
          color="#0c0d0b"
          roughness={0.35}
          metalness={0.7}
        />
      </mesh>

      {/* Lighting setup matching the reference studio render */}
      <ambientLight intensity={0.25} />
      {/* Top-left key spotlight */}
      <directionalLight position={[-4, 5, 4]} intensity={1.8} color="#f5f4ee" />
      {/* Back rim light */}
      <directionalLight position={[3, -2, -3]} intensity={1.2} color="#ffffff" />
      {/* Accent neon lime fill light */}
      <pointLight position={[2, -1, 1.5]} intensity={15} color={LIME} distance={8} />
    </group>
  );
}

export default function Cube3D() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  // Pause rendering when offscreen for high performance
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="caps__cube-scene"
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={active && !reduced ? "always" : "demand"}
        camera={{ position: [0, 0.4, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <FacetedCube reduced={reduced} />

        {/* Studio environment for high-spec chrome reflections */}
        <Environment resolution={256}>
          <group>
            {/* Bright top light */}
            <Lightformer
              form="rect"
              intensity={4}
              position={[-2, 4, 3]}
              scale={[6, 3, 1]}
              color="#ffffff"
            />
            {/* Lime neon strip */}
            <Lightformer
              form="rect"
              intensity={5}
              position={[4, -1, 2]}
              rotation={[0, -Math.PI / 3, 0]}
              scale={[5, 1.5, 1]}
              color={LIME}
            />
            {/* Subtle soft white fill */}
            <Lightformer
              form="circle"
              intensity={2.5}
              position={[-4, -1, -2]}
              scale={[4, 4, 1]}
              color="#e6e4dc"
            />
          </group>
        </Environment>
      </Canvas>

      {/* Technical corner crosshair '+' marker (matching reference image) */}
      <span className="caps__crosshair" aria-hidden="true">+</span>
    </div>
  );
}
