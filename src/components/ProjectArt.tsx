import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  GHARBAL — Realistic database stack fed by data sources             */
/* ------------------------------------------------------------------ */
function GharbalArt() {
  return (
    <svg
      viewBox="0 0 600 780"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A realistic database stack fed by API, JSON, CSV, Excel and SQL sources"
      className="project-art-svg"
    >
      <defs>
        <linearGradient id="metal" x1="0" x2="1">
          <stop offset="0" stopColor="#0a0e07" />
          <stop offset=".12" stopColor="#2c2a18" />
          <stop offset=".3" stopColor="#7a4a2a" />
          <stop offset=".42" stopColor="#4a2d1b" />
          <stop offset=".62" stopColor="#1f2214" />
          <stop offset=".86" stopColor="#10150c" />
          <stop offset="1" stopColor="#080b06" />
        </linearGradient>
        <radialGradient id="topg" cx=".42" cy=".38" r=".75">
          <stop offset="0" stopColor="#6a4226" />
          <stop offset=".55" stopColor="#20231a" />
          <stop offset="1" stopColor="#0b0f08" />
        </radialGradient>
        <linearGradient id="spec" x1="0" x2="1">
          <stop offset="0" stopColor="#ffe1be" stopOpacity="0" />
          <stop offset=".5" stopColor="#ffe1be" stopOpacity=".16" />
          <stop offset="1" stopColor="#ffe1be" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rim" x1="0" x2="1">
          <stop offset="0" stopColor="#a6e84a" stopOpacity="0" />
          <stop offset="1" stopColor="#a6e84a" stopOpacity=".38" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" />
          <stop offset="1" stopColor="#fff" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a6e84a" stopOpacity="0" />
          <stop offset="1" stopColor="#a6e84a" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="floor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#050704" stopOpacity=".9" />
          <stop offset="1" stopColor="#050704" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="amb" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#a6e84a" stopOpacity=".15" />
          <stop offset="1" stopColor="#a6e84a" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="bodyClip">
          <path d="M160 300 V660 A140 40 0 0 0 440 660 V300 Z" />
        </clipPath>
      </defs>

      <ellipse cx="300" cy="690" rx="260" ry="60" fill="url(#amb)" />
      <ellipse cx="300" cy="700" rx="200" ry="30" fill="url(#floor)" />
      <path d="M160 300 V660 A140 40 0 0 0 440 660 V300 Z" fill="url(#metal)" stroke="#8a5430" strokeWidth="1.5" />
      <g clipPath="url(#bodyClip)">
        <rect x="190" y="300" width="34" height="420" fill="url(#spec)" />
        <rect x="414" y="300" width="26" height="420" fill="url(#rim)" />
      </g>
      <path d="M160 420 A140 40 0 0 0 440 420" fill="none" stroke="#050704" strokeWidth="7" />
      <path d="M160 427 A140 40 0 0 0 440 427" fill="none" stroke="#c98a55" strokeWidth="1.2" opacity=".45" />
      <path d="M160 540 A140 40 0 0 0 440 540" fill="none" stroke="#050704" strokeWidth="7" />
      <path d="M160 547 A140 40 0 0 0 440 547" fill="none" stroke="#c98a55" strokeWidth="1.2" opacity=".45" />
      <path d="M160 660 A140 40 0 0 0 440 660" fill="none" stroke="#e0a070" strokeWidth="1.5" opacity=".5" />

      {/* Database tier indicators with animated dots */}
      <path d="M185 395 Q300 435 415 395" fill="none" stroke="#050704" strokeWidth="12" strokeLinecap="round" />
      <path d="M185 395 Q300 435 415 395" fill="none" stroke="#3a2416" strokeWidth="1" transform="translate(0 7)" opacity=".7" />
      <circle className="dot" style={{ "--i": 0 } as React.CSSProperties} cx="212.6" cy="403.4" r="3.6" fill="#a6e84a" />
      <circle className="dot" style={{ "--i": 1 } as React.CSSProperties} cx="254.0" cy="411.8" r="3.6" fill="#a6e84a" />
      <circle cx="300.0" cy="415.0" r="2.6" fill="#6d4a33" />
      <circle cx="346.0" cy="411.8" r="2.6" fill="#6d4a33" />
      <circle cx="387.4" cy="403.4" r="2.6" fill="#6d4a33" />

      <path d="M185 515 Q300 555 415 515" fill="none" stroke="#050704" strokeWidth="12" strokeLinecap="round" />
      <path d="M185 515 Q300 555 415 515" fill="none" stroke="#3a2416" strokeWidth="1" transform="translate(0 7)" opacity=".7" />
      <circle className="dot" style={{ "--i": 3 } as React.CSSProperties} cx="212.6" cy="523.4" r="3.6" fill="#a6e84a" />
      <circle className="dot" style={{ "--i": 4 } as React.CSSProperties} cx="254.0" cy="531.8" r="3.6" fill="#a6e84a" />
      <circle cx="300.0" cy="535.0" r="2.6" fill="#6d4a33" />
      <circle cx="346.0" cy="531.8" r="2.6" fill="#6d4a33" />
      <circle cx="387.4" cy="523.4" r="2.6" fill="#6d4a33" />

      <path d="M185 635 Q300 675 415 635" fill="none" stroke="#050704" strokeWidth="12" strokeLinecap="round" />
      <path d="M185 635 Q300 675 415 635" fill="none" stroke="#3a2416" strokeWidth="1" transform="translate(0 7)" opacity=".7" />
      <circle className="dot" style={{ "--i": 6 } as React.CSSProperties} cx="212.6" cy="643.4" r="3.6" fill="#a6e84a" />
      <circle className="dot" style={{ "--i": 7 } as React.CSSProperties} cx="254.0" cy="651.8" r="3.6" fill="#a6e84a" />
      <circle cx="300.0" cy="655.0" r="2.6" fill="#6d4a33" />
      <circle cx="346.0" cy="651.8" r="2.6" fill="#6d4a33" />
      <circle cx="387.4" cy="643.4" r="2.6" fill="#6d4a33" />

      {/* Top rim of cylinder */}
      <ellipse cx="300" cy="300" rx="140" ry="40" fill="url(#topg)" stroke="#d0702f" strokeWidth="3.5" />
      <ellipse cx="300" cy="303" rx="112" ry="29" fill="#080b06" stroke="#2c3a1a" strokeWidth="2" />
      <ellipse cx="300" cy="305" rx="84" ry="19" fill="none" stroke="#2a1a10" />

      {/* Beams connecting sources to cylinder */}
      <line x1="96" y1="104" x2="195" y2="298" stroke="url(#beam)" strokeWidth="1.4" />
      <circle cx="195" cy="298" r="3" fill="#a6e84a" />
      <line x1="272" y1="70" x2="265" y2="298" stroke="url(#beam)" strokeWidth="1.4" />
      <circle cx="265" cy="298" r="3" fill="#a6e84a" />
      <line x1="436" y1="104" x2="340" y2="298" stroke="url(#beam)" strokeWidth="1.4" />
      <circle cx="340" cy="298" r="3" fill="#a6e84a" />
      <line x1="512" y1="194" x2="405" y2="298" stroke="url(#beam)" strokeWidth="1.4" />
      <circle cx="405" cy="298" r="3" fill="#a6e84a" />
      <line x1="106" y1="204" x2="215" y2="298" stroke="url(#beam)" strokeWidth="1.4" />
      <circle cx="215" cy="298" r="3" fill="#a6e84a" />

      {/* Source Nodes: API, JSON, CSV, XLSX, SQL */}
      <g>
        <title>API</title>
        <rect x="72" y="63" width="48" height="48" rx="6" fill="#161712" stroke="#3a3b34" />
        <g transform="translate(84 75) scale(1)" fill="none" stroke="#d6d6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" />
        </g>
      </g>
      <g>
        <title>JSON</title>
        <rect x="248" y="29" width="48" height="48" rx="6" fill="#161712" stroke="#3a3b34" />
        <g transform="translate(260 41) scale(1)" fill="none" stroke="#d6d6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 4C6 4 6 6 6 8v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 2 0 4 3 4M15 4c3 0 3 2 3 4v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 2 0 4-3 4" />
        </g>
      </g>
      <g>
        <title>CSV</title>
        <rect x="412" y="63" width="48" height="48" rx="6" fill="#161712" stroke="#3a3b34" />
        <g transform="translate(424 75) scale(1)" fill="none" stroke="#d6d6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9.5h18M3 14.5h18M9 4v16M15 4v16" />
        </g>
      </g>
      <g>
        <title>XLSX</title>
        <rect x="488" y="153" width="48" height="48" rx="6" fill="#161712" stroke="#3a3b34" />
        <g transform="translate(500 165) scale(1)" fill="none" stroke="#d6d6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 17h8M14 12h2" />
          <path d="M8 7.5l4 4.5m0-4.5L8 12" stroke="#a6e84a" />
        </g>
      </g>
      <g>
        <title>SQL</title>
        <rect x="82" y="163" width="48" height="48" rx="6" fill="#161712" stroke="#3a3b34" />
        <g transform="translate(94 175) scale(1)" fill="none" stroke="#d6d6ce" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  IoT365 — 3D ESP32 IoT Ecosystem (Three.js, auto-rotate only)       */
/* ------------------------------------------------------------------ */
function CircuitArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x0e0f0d, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    const dist = 26;

    // Lighting — clean, crisp
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2010, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(6, 12, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa8f05a, 0.6);
    rim.position.set(-9, 5, -8);
    scene.add(rim);

    const G = new THREE.Group();
    scene.add(G);

    const M = (c: number, r: number, m = 0, e?: number, ei = 1) => {
      const mat = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
      if (e !== undefined) {
        mat.emissive = new THREE.Color(e);
        mat.emissiveIntensity = ei;
      }
      return mat;
    };

    function add(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = G
    ) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }

    // ===== ESP32 Board =====
    const B = new THREE.Group();
    G.add(B);
    const rs = new THREE.Shape();
    const [w, h, rad] = [1.3, 2.5, 0.28];
    rs.moveTo(-w + rad, -h);
    rs.lineTo(w - rad, -h);
    rs.absarc(w - rad, -h + rad, rad, -Math.PI / 2, 0);
    rs.lineTo(w, h - rad);
    rs.absarc(w - rad, h - rad, rad, 0, Math.PI / 2);
    rs.lineTo(-w + rad, h);
    rs.absarc(-w + rad, h - rad, rad, Math.PI / 2, Math.PI);
    rs.lineTo(-w, -h + rad);
    rs.absarc(-w + rad, -h + rad, rad, Math.PI, Math.PI * 1.5);
    const pcb = new THREE.Mesh(
      new THREE.ExtrudeGeometry(rs, {
        depth: 0.14,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2,
        curveSegments: 16,
      }),
      M(0x0a2f1a, 0.4, 0.15)
    );
    pcb.rotation.x = -Math.PI / 2;
    pcb.position.y = -0.07;
    B.add(pcb);

    // mounting holes
    [
      [-1, 2.15],
      [1, 2.15],
      [-1, -2.15],
      [1, -2.15],
    ].forEach((p) =>
      add(new THREE.CylinderGeometry(0.09, 0.09, 0.2, 16), M(0x05070c, 0.8), p[0], 0.02, p[1], B)
    );

    // traces — lime
    const tm = new THREE.MeshBasicMaterial({ color: 0xa8f05a, transparent: true, opacity: 0.6 });
    [
      [-0.55, 0.9, 0.05, 1.3],
      [0.55, 0.9, 0.05, 1.3],
      [0, 1.8, 1.1, 0.05],
      [-0.3, 2.0, 0.05, 0.6],
    ].forEach((a) => add(new THREE.BoxGeometry(a[2], 0.012, a[3]), tm, a[0], 0.075, a[1], B));

    // shield
    add(new THREE.BoxGeometry(1.9, 0.22, 2.3), M(0xc5cfc5, 0.25, 0.95), 0, 0.17, 0.2, B);

    // silkscreen
    const sc = document.createElement("canvas");
    sc.width = 512;
    sc.height = 640;
    const sx = sc.getContext("2d")!;
    sx.fillStyle = "#7a9a7a";
    sx.fillRect(0, 0, 512, 640);
    sx.fillStyle = "#1a2a1a";
    sx.font = "700 62px system-ui,Arial";
    sx.textAlign = "center";
    sx.fillText("ESP32", 256, 250);
    sx.font = "500 34px system-ui,Arial";
    sx.fillText("WROOM-32", 256, 310);
    sx.fillStyle = "#3b5233";
    sx.font = "500 26px system-ui,Arial";
    sx.fillText("2.4 GHz · Wi-Fi · BT", 256, 370);
    sx.strokeStyle = "#4a6a4a";
    sx.lineWidth = 3;
    sx.strokeRect(40, 40, 432, 560);
    const sp = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 2.2),
      new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(sc),
        roughness: 0.3,
        metalness: 0.8,
      })
    );
    sp.rotation.x = -Math.PI / 2;
    sp.position.set(0, 0.285, 0.2);
    B.add(sp);

    // antenna, USB, chips, pins
    add(new THREE.BoxGeometry(1.9, 0.15, 1.0), M(0x0d0f0a, 0.5), 0, 0.02, -1.95, B);
    const gold = M(0xe6c05a, 0.25, 1);
    for (let i = 0; i < 5; i++)
      add(new THREE.BoxGeometry(1.4, 0.02, 0.07), gold, i % 2 ? 0.12 : -0.12, 0.1, -2.3 + i * 0.2, B);
    add(new THREE.BoxGeometry(0.95, 0.3, 0.7), M(0xc4c9d2, 0.25, 0.95), 0, 0.2, 2.35, B);
    add(new THREE.BoxGeometry(0.6, 0.12, 0.04), M(0x05070c, 0.8), 0, 0.2, 2.71, B);
    add(new THREE.BoxGeometry(0.6, 0.12, 0.6), M(0x15170a, 0.4), 0, 0.1, 1.6, B);
    [-0.9, 0.9].forEach((px) => {
      add(new THREE.BoxGeometry(0.32, 0.18, 0.32), M(0x2a2e1a, 0.4), px, 0.12, 2.0, B);
      add(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 16), M(0x888e7b, 0.4, 0.5), px, 0.14, 2.0, B);
    });
    const ledMesh = add(
      new THREE.SphereGeometry(0.07, 16, 12),
      M(0xa8f05a, 0.3, 0, 0xa8f05a, 1.2),
      0.6,
      0.12,
      1.5,
      B
    );
    const pm = M(0xe6c05a, 0.25, 1);
    for (let j = 0; j < 19; j++)
      [-1.15, 1.15].forEach((px) =>
        add(new THREE.BoxGeometry(0.1, 0.36, 0.1), pm, px, 0.04, -2.15 + j * 0.24, B)
      );
    B.position.set(0, -0.3, 0);

    // Wi-Fi rings
    const rings: THREE.Mesh[] = [];
    for (let k = 0; k < 3; k++) {
      const r = new THREE.Mesh(
        new THREE.RingGeometry(0.93, 1, 96),
        new THREE.MeshBasicMaterial({
          color: 0xa8f05a,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      r.rotation.x = -Math.PI / 2;
      r.position.set(0, 0.2, -2.4);
      (r as any).userData.o = k / 3;
      G.add(r);
      rings.push(r);
    }

    // Cloud — crisp luminous ivory matching visual identity
    const cloud = new THREE.Group();
    cloud.position.set(0, 6.8, 0);
    G.add(cloud);
    const cm = M(0xf0f4ec, 0.25, 0.1, 0x243812, 0.2);
    [
      [0, 0, 0, 1.25],
      [1.2, -0.2, 0.1, 0.9],
      [-1.2, -0.2, 0, 0.95],
      [0.55, 0.6, 0, 0.85],
      [-0.55, 0.55, 0.1, 0.8],
      [0, -0.35, 0.3, 1.0],
    ].forEach((a) => {
      const m = add(new THREE.SphereGeometry(a[3], 40, 28), cm, a[0], a[1], a[2], cloud);
      m.scale.y = 0.88;
    });

    // Sensor nodes — styled to match the brand identity (Acid Lime, Ivory, Stealth Obsidian)
    const sensorDefs = [
      { p: [-7.5, 0, -4.5], c: 0x1a2216, em: 0xa8f05a, emI: 0.5, t: "box" },
      { p: [7.5, 0, -4.5], c: 0xa8f05a, em: 0xa8f05a, emI: 0.85, t: "dome" },
      { p: [-7.5, 0, 5], c: 0xf2f0e9, em: 0xa8f05a, emI: 0.25, t: "cyl" },
      { p: [7.5, 0, 5], c: 0x98ea4a, em: 0xa8f05a, emI: 0.6, t: "box" },
    ];
    const packets: Array<{ c: THREE.QuadraticBezierCurve3; t: number; s: number; r: boolean }> = [];
    const nodeGroups: THREE.Group[] = [];
    const nodeRings: THREE.Mesh[] = [];

    function tube(curve: THREE.QuadraticBezierCurve3, col: number, op = 0.5) {
      G.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 64, 0.035, 6, false),
          new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: op,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
    }

    const hub = new THREE.Vector3(0, 0.3, 0);
    sensorDefs.forEach((nd, i) => {
      const g = new THREE.Group();
      g.position.set(nd.p[0], 0, nd.p[2]);
      G.add(g);
      nodeGroups.push(g);
      add(new THREE.CylinderGeometry(1.15, 1.3, 0.25, 48), M(0x10140c, 0.35, 0.3), 0, -1.2, 0, g);
      const rng = add(
        new THREE.TorusGeometry(1.2, 0.04, 10, 64),
        new THREE.MeshBasicMaterial({ color: 0xa8f05a, transparent: true, opacity: 0.95 }),
        0,
        -1.05,
        0,
        g
      ) as THREE.Mesh;
      rng.rotation.x = Math.PI / 2;
      nodeRings.push(rng);
      const geo =
        nd.t === "box"
          ? new THREE.BoxGeometry(1.3, 0.95, 1.3)
          : nd.t === "dome"
          ? new THREE.SphereGeometry(0.7, 36, 22, 0, Math.PI * 2, 0, Math.PI / 2)
          : new THREE.CylinderGeometry(0.5, 0.5, 0.95, 32);
      add(geo, M(nd.c, 0.25, 0.15, nd.em, nd.emI), 0, nd.t === "dome" ? -0.85 : -0.5, 0, g);
      const a = new THREE.Vector3(nd.p[0], -0.3, nd.p[2]);
      const mid = new THREE.Vector3(nd.p[0] * 0.5, 2.2, nd.p[2] * 0.5);
      const cv2 = new THREE.QuadraticBezierCurve3(a, mid, hub);
      tube(cv2, 0xa8f05a, 0.55);
      const out = i === 3;
      packets.push({ c: cv2, t: i * 0.2, s: 0.3, r: out });
      packets.push({ c: cv2, t: i * 0.2 + 0.5, s: 0.3, r: out });
    });

    // Board ↔ Cloud lines — Acid Lime brand colors
    const cp = new THREE.Vector3(0, 5.3, 0);
    [-0.5, 0.5].forEach((dx, idx) => {
      const cv3 = new THREE.QuadraticBezierCurve3(hub, new THREE.Vector3(dx * 3, 2.8, 0), cp);
      tube(cv3, idx ? 0xd4ff88 : 0xa8f05a, 0.5);
      for (let q = 0; q < 3; q++) packets.push({ c: cv3, t: q / 3 + idx * 0.15, s: 0.28, r: idx === 1 });
    });

    // Packet spheres (clean white and acid lime dots)
    const pktGroups = packets.map((_, i) => {
      const g = new THREE.Group();
      g.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 16, 12),
          new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xffffff : 0xa8f05a })
        )
      );
      G.add(g);
      return g;
    });

    // Static view — no rotation, fixed camera angle
    G.rotation.x = 0.45;
    G.rotation.y = 0.6;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0.8, 0);

    const initSize = () => {
      const cw = cv.clientWidth || cv.offsetWidth || 600;
      const ch = cv.clientHeight || cv.offsetHeight || 440;
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
    };
    initSize();

    const ro = new ResizeObserver(initSize);
    ro.observe(cv);

    let animId: number = 0;
    let inView = false;
    function loop(t: number) {
      if (!inView) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(loop);
      const s = t * 0.001;
      const on = Math.sin(s * 7) > 0 ? 1 : 0.25;
      (ledMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = on * 1.2;
      cloud.position.y = 6.8 + Math.sin(s * 1.1) * 0.22;
      rings.forEach((r) => {
        const p = (s * 0.5 + (r as any).userData.o) % 1;
        r.scale.setScalar(0.4 + p * 4);
        (r.material as THREE.MeshBasicMaterial).opacity = 0.85 * (1 - p) * (1 - p);
      });
      packets.forEach((pk, i) => {
        pk.t = (pk.t + pk.s * 0.016) % 1;
        pktGroups[i].position.copy(pk.c.getPoint(pk.r ? 1 - pk.t : pk.t));
        pktGroups[i].scale.setScalar(0.75 + 0.45 * Math.sin(pk.t * Math.PI));
      });
      nodeGroups.forEach((ng, i) => {
        ng.position.y = Math.sin(s * 1.4 + i * 1.3) * 0.12;
      });
      nodeRings.forEach((nr, i) => {
        (nr.material as THREE.MeshBasicMaterial).opacity = 0.55 + 0.45 * Math.sin(s * 2.2 + i);
      });
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !animId) {
        animId = requestAnimationFrame(loop);
      }
    }, { threshold: 0.05 });
    io.observe(cv);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="gaming-canvas"
      aria-label="3D IoT Ecosystem — IoT365"
      style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
    />
  );
}


/* ------------------------------------------------------------------ */
/*  ZENITHGAMES — 3D Gamepad (Three.js)                                */
/* ------------------------------------------------------------------ */
function GamingArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x0e0f0d, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const dist = 13;

    // Lights
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222200, 0.85));
    const d1 = new THREE.DirectionalLight(0xffffff, 1.0);
    d1.position.set(4, 8, 6);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xa8f05a, 0.5);
    d2.position.set(-6, 3, -5);
    scene.add(d2);

    const M = (c: number, r: number, m = 0) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    const shell = M(0x22262e, 0.45, 0.08);
    const dark = M(0x0f1116, 0.6, 0.0);
    const grey = M(0x3e4552, 0.45, 0.12);
    const pad = M(0x282d36, 0.25, 0.15);

    const G = new THREE.Group();
    scene.add(G);

    // Body shape
    const s = new THREE.Shape();
    s.moveTo(-2, 1.3);
    s.bezierCurveTo(-1, 1.6, 1, 1.6, 2, 1.3);
    s.bezierCurveTo(3, 1.1, 3.6, -0.2, 3.5, -1.6);
    s.bezierCurveTo(3.4, -2.8, 2.2, -3, 1.9, -1.9);
    s.bezierCurveTo(1.6, -1, 0.8, -0.8, 0, -0.8);
    s.bezierCurveTo(-0.8, -0.8, -1.6, -1, -1.9, -1.9);
    s.bezierCurveTo(-2.2, -3, -3.4, -2.8, -3.5, -1.6);
    s.bezierCurveTo(-3.6, -0.2, -3, 1.1, -2, 1.3);

    const bg = new THREE.ExtrudeGeometry(s, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.3,
      bevelSegments: 8,
      curveSegments: 48,
    });
    const body = new THREE.Mesh(bg, shell);
    body.rotation.x = -Math.PI / 2;
    body.position.y = -0.85;
    G.add(body);

    function add(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = G
    ) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }

    // Touchpad
    add(new THREE.BoxGeometry(2.3, 0.08, 1.1), pad, 0, 0.03, -0.45);
    // Light bar — acid lime
    add(
      new THREE.BoxGeometry(2.4, 0.05, 0.07),
      new THREE.MeshStandardMaterial({
        color: 0xa8f05a,
        emissive: 0xa8f05a,
        emissiveIntensity: 1.8,
      }),
      0,
      0.03,
      -1.2
    );

    // Analog sticks
    function stick(x: number) {
      const g = new THREE.Group();
      g.position.set(x, 0, 0.8);
      G.add(g);
      add(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 40), dark, 0, 0.02, 0, g);
      add(new THREE.CylinderGeometry(0.2, 0.26, 0.4, 28), grey, 0, 0.22, 0, g);
      add(new THREE.CylinderGeometry(0.46, 0.4, 0.16, 40), grey, 0, 0.48, 0, g);
      const rim = add(new THREE.TorusGeometry(0.44, 0.05, 12, 40), dark, 0, 0.56, 0, g);
      rim.rotation.x = Math.PI / 2;
      add(new THREE.CylinderGeometry(0.34, 0.34, 0.03, 32), dark, 0, 0.57, 0, g);
      return g;
    }
    const sL = stick(-1.15);
    const sR = stick(1.15);

    // D-pad
    const dp = new THREE.Group();
    dp.position.set(-2.35, 0, -0.15);
    G.add(dp);
    add(new THREE.CylinderGeometry(0.85, 0.85, 0.05, 40), dark, 0, 0.02, 0, dp);
    add(new THREE.BoxGeometry(1.35, 0.18, 0.45), grey, 0, 0.1, 0, dp);
    add(new THREE.BoxGeometry(0.45, 0.18, 1.35), grey, 0, 0.1, 0, dp);

    // Face buttons glyphs
    function glyph(type: string, col: string) {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d")!;
      x.strokeStyle = col;
      x.lineWidth = 11;
      x.lineCap = "round";
      x.lineJoin = "round";
      x.beginPath();
      if (type === "o") {
        x.arc(64, 64, 30, 0, 7);
      }
      if (type === "x") {
        x.moveTo(36, 36);
        x.lineTo(92, 92);
        x.moveTo(92, 36);
        x.lineTo(36, 92);
      }
      if (type === "s") {
        x.rect(36, 36, 56, 56);
      }
      if (type === "t") {
        x.moveTo(64, 32);
        x.lineTo(96, 88);
        x.lineTo(32, 88);
        x.closePath();
      }
      x.stroke();
      const t = new THREE.CanvasTexture(c);
      return t;
    }

    const fb = new THREE.Group();
    fb.position.set(2.35, 0, -0.15);
    G.add(fb);
    (
      [
        ["t", 0, -0.62, "#a8f05a"],
        ["o", 0.62, 0, "#ff5b6b"],
        ["x", 0, 0.62, "#5aa2ff"],
        ["s", -0.62, 0, "#ff8fd0"],
      ] as const
    ).forEach(([type, bx, bz, col]) => {
      const g = new THREE.Group();
      g.position.set(bx, 0, bz);
      fb.add(g);
      add(new THREE.CylinderGeometry(0.32, 0.32, 0.16, 36), M(0x242830, 0.3, 0.1), 0, 0.06, 0, g);
      const p = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 32),
        new THREE.MeshBasicMaterial({ map: glyph(type, col), transparent: true })
      );
      p.rotation.x = -Math.PI / 2;
      p.position.y = 0.145;
      g.add(p);
    });

    // Small center buttons
    add(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 20), grey, -1.5, 0.02, -1.0);
    add(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 20), grey, 1.5, 0.02, -1.0);

    // Shoulders & triggers
    [-1, 1].forEach((k) => {
      const sh = add(new THREE.BoxGeometry(1.5, 0.35, 0.5), shell, k * 2.45, -0.12, -1.5);
      sh.rotation.z = -k * 0.12;
      sh.rotation.y = k * 0.18;
      const tr = add(new THREE.BoxGeometry(1.2, 0.4, 0.5), dark, k * 2.55, -0.45, -1.7);
      tr.rotation.y = k * 0.25;
      tr.rotation.x = 0.2;
    });

    // Fixed starting angle — no auto-rotation
    let rx = 0.85;
    let ry = 0.45;
    G.rotation.x = rx;
    G.rotation.y = ry;

    // Camera placement
    const updateCam = () => {
      const d = dist * (camera.aspect < 1 ? 1.5 : 1);
      camera.position.set(0, 0, d);
      camera.lookAt(0, 0, 0);
    };

    const updateSize = () => {
      const w = cv.clientWidth || cv.offsetWidth || 600;
      const h = cv.clientHeight || cv.offsetHeight || 440;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updateCam();
    };
    updateSize();

    // Mouse drag interaction
    let down = false;
    let lx = 0;
    let ly = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      lx = e.clientX;
      ly = e.clientY;
      cv.setPointerCapture(e.pointerId);
      cv.style.cursor = "grabbing";
    };
    const onUp = () => {
      down = false;
      cv.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      ry += (e.clientX - lx) * 0.01;
      rx = Math.max(-0.2, Math.min(1.8, rx + (e.clientY - ly) * 0.01));
      lx = e.clientX;
      ly = e.clientY;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(updateSize);
    ro.observe(cv);

    let animId: number = 0;
    let inView = false;
    function loop(t: number) {
      if (!inView) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(loop);
      // Smoothly interpolate to target rotation (no auto-spin)
      G.rotation.y += (ry - G.rotation.y) * 0.12;
      G.rotation.x += (rx - G.rotation.x) * 0.12;

      updateCam();

      const w = Math.sin(t * 0.0015) * 0.08;
      sL.rotation.z = w;
      sL.rotation.x = w;
      sR.rotation.z = -w;
      sR.rotation.x = w;
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !animId) {
        animId = requestAnimationFrame(loop);
      }
    }, { threshold: 0.05 });
    io.observe(cv);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("wheel", onWheel);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="gaming-canvas"
      aria-label="3D Gamepad — ZENITHGAMES"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "grab",
        touchAction: "none",
      }}
    />
  );
}

const ARTS: Record<Project["art"], React.ReactNode> = {
  gharbal: <GharbalArt />,
  circuit: <CircuitArt />,
  gaming: <GamingArt />,
};

export default function ProjectArt({ kind }: { kind: Project["art"]; title?: string }) {
  return ARTS[kind];
}
