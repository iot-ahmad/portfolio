import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPABILITIES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Technology items from user's template
const G = 'fill="none" stroke="#b6f23a" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const T = 'text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" fill="#fff"';
const HEX = "M16 2l12.5 7v14L16 30 3.5 23V9z";

const TECH_ITEMS = [
  {
    name: "HTML",
    svg: '<svg viewBox="0 0 32 32"><path fill="#e44d26" d="M5 3h22l-2 22-9 4-9-4z"/><path fill="#f16529" d="M16 5v22.6l7.3-3 1.7-19.6z"/><path fill="#fff" d="M10 9h12l-.3 3H13.2l.3 3h7.8l-.7 7.5-4.6 1.5-4.6-1.5-.3-3.5h3l.2 1.8 1.7.5 1.7-.5.2-2.3H10.4z"/></svg>',
  },
  {
    name: "CSS",
    svg: '<svg viewBox="0 0 32 32"><path fill="#1572b6" d="M5 3h22l-2 22-9 4-9-4z"/><path fill="#33a9dc" d="M16 5v22.6l7.3-3 1.7-19.6z"/><path fill="#fff" d="M22 9H10l.3 3h11.4l-.3 3H10.8l.3 3h9.5l-.4 4.5-4.2 1.4-4.2-1.4-.2-2.5h3l.1 1.2 1.3.4 1.3-.4.2-2H11z"/></svg>',
  },
  {
    name: "JavaScript",
    svg: '<svg viewBox="0 0 32 32"><rect x="3" y="3" width="26" height="26" rx="2" fill="#f7df1e"/><text x="27" y="27" text-anchor="end" font-family="Arial,sans-serif" font-weight="800" font-size="12" fill="#111">JS</text></svg>',
  },
  {
    name: "C",
    svg: `<svg viewBox="0 0 32 32"><path fill="#5c6bc0" d="${HEX}"/><text x="16" y="21.5" font-size="15" ${T}>C</text></svg>`,
  },
  {
    name: "C++",
    svg: `<svg viewBox="0 0 32 32"><path fill="#00599c" d="${HEX}"/><text x="16" y="20.5" font-size="11" ${T}>C++</text></svg>`,
  },
  {
    name: "Java",
    svg: '<svg viewBox="0 0 32 32"><path fill="none" stroke="#e76f00" stroke-width="1.8" stroke-linecap="round" d="M14 3c3 3-3 4 0 7M19 4c2 2-2 3 0 5"/><path fill="#5382a1" d="M6 15h17v4c0 4-3 7-8 7s-9-3-9-7z"/><path fill="none" stroke="#5382a1" stroke-width="2" d="M23 16h2.5a2.5 2.5 0 010 5H22"/><path d="M8 29h15" stroke="#e76f00" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    name: "Database",
    svg: `<svg viewBox="0 0 24 24" ${G}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`,
  },
  {
    name: "SQL",
    svg: `<svg viewBox="0 0 32 32"><rect x="3" y="6" width="26" height="20" rx="4" fill="#0b6f8a"/><text x="16" y="20.5" font-size="10.5" ${T}>SQL</text></svg>`,
  },
  {
    name: "Node.js",
    svg: `<svg viewBox="0 0 32 32"><path fill="#5fa04e" d="${HEX}"/><text x="16" y="19" font-size="7.5" ${T}>node</text></svg>`,
  },
  {
    name: "Network",
    svg: `<svg viewBox="0 0 24 24" ${G}><circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M11 7l-5 9M13 7l5 9M7.2 18h9.6"/></svg>`,
  },
  {
    name: "IoT",
    svg: `<svg viewBox="0 0 24 24" ${G}><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/></svg>`,
  },
];

function TechOrbitStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Create the glass tiles
    const tiles: HTMLDivElement[] = TECH_ITEMS.map((it, i) => {
      const t = document.createElement("div");
      t.className = "cap-tile";
      t.title = it.name;
      t.setAttribute("role", "img");
      t.setAttribute("aria-label", it.name);
      t.innerHTML = `<i>${it.svg}</i>`;
      t.dataset.tilt = String((i * 37) % 9 - 4);
      stage.appendChild(t);
      return t;
    });

    let W = stage.clientWidth;
    let H = stage.clientHeight;
    let Ry = Math.min(H * 0.42, 320);
    let Rx = Math.min(Ry * 0.44, W * 0.32);
    let angle = 0;

    function resize() {
      if (!stage) return;
      W = stage.clientWidth;
      H = stage.clientHeight;
      Ry = Math.min(H * 0.42, 320);
      Rx = Math.min(Ry * 0.44, W * 0.32);
      draw(angle);
    }

    function draw(a: number) {
      const n = tiles.length;
      const ph = -0.2;
      const cp = Math.cos(ph);
      const sp = Math.sin(ph);

      for (let i = 0; i < n; i++) {
        const th = a + (i * Math.PI * 2) / n;
        const z = Math.cos(th);
        const d = (z + 1) / 2;
        const t = tiles[i];
        const x0 = Rx * z;
        const y0 = Ry * Math.sin(th);
        const x = x0 * cp - y0 * sp;
        const y = x0 * sp + y0 * cp;
        const sc = 0.64 + 0.46 * d;

        t.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${sc.toFixed(3)})`;
        t.style.opacity = (0.28 + 0.72 * d).toFixed(3);
        t.style.zIndex = String(Math.round(d * 100));
        t.style.filter = `grayscale(${((1 - d) * 0.85).toFixed(2)}) brightness(${(0.6 + 0.4 * d).toFixed(2)})`;
      }
    }

    let last = performance.now();
    let animId: number = 0;
    let isVisible = false;

    function frame(now: number) {
      if (!isVisible) {
        animId = 0;
        return;
      }
      const dt = Math.min(now - last, 50);
      last = now;
      angle += dt * 0.00014 * Math.PI * 2;
      draw(angle);
      animId = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        last = performance.now();
        animId = requestAnimationFrame(frame);
      }
    }, { threshold: 0.05 });
    io.observe(stage);

    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      tiles.forEach((t) => t.remove());
    };
  }, []);

  return (
    <div className="cap-stage" ref={stageRef} aria-label="Languages and technologies">
      <div className="cap-floor" />
    </div>
  );
}

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-head",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cap-head", start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        ".cap-list li",
        { opacity: 0, x: -24, y: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cap-list", start: "top 85%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section caps cap-wrap container-x" id="capabilities" ref={root}>
      {/* Left Column: Heading + 4 Technical Capabilities */}
      <div className="cap-left">
        <div className="cap-head">
          <div className="cap-head__brand">
            <span className="cap-ring" aria-hidden="true" />
            <h2 className="cap-title">CAPABILITIES</h2>
          </div>
        </div>

        <ol className="cap-list">
          {CAPABILITIES.map((c, i) => (
            <li key={c.title}>
              <div className="cap-item__main">
                <span className="cap-n">0{i + 1}</span>
                <span className="cap-name">{c.title}</span>
              </div>
              <p className="cap-desc">{c.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Right Column: 3D Orbiting Glass Tech Tiles */}
      <div className="cap-right">
        <TechOrbitStage />
      </div>
    </section>
  );
}
