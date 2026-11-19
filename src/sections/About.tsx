import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE, STATS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about__statement .mask-line > span",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about__statement", start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".about__photo img",
        { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about__photo", start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".about__bio, .about__stats",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about__grid", start: "top 82%", once: true },
        }
      );
      document.querySelectorAll<HTMLElement>(".about__stat-value").forEach((el) => {
        const final = el.textContent ?? "0";
        const num = parseInt(final.replace(/\D/g, ""), 10);
        if (Number.isNaN(num)) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: num,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            const suffix = el.querySelector("em")?.textContent ?? "";
            el.innerHTML = `${String(Math.round(obj.v)).padStart(2, "0")}<em>${suffix}</em>`;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about container-x" id="about" ref={root}>
      <div className="section__head">
        <h2 className="section__title">About</h2>
      </div>

      <h3 className="about__statement">
        <span className="mask-line">
          <span>Curious by</span>
        </span>
        <span className="mask-line">
          <span>nature. Builder</span>
        </span>
        <span className="mask-line">
          <span>
            by <span className="lime">choice.</span>
          </span>
        </span>
      </h3>

      <div className="about__grid">
        <figure className="about__photo">
          <img src="/img/ahmad-portrait.jpeg" alt="Ahmad Al-Batayneh standing in a park" loading="lazy" />
        </figure>

        <div>
          {PROFILE.bio.map((p, i) => (
            <p className="about__bio" key={i} style={{ marginBottom: "1.25rem" }}>
              {i === 0 ? (
                <>
                  I'm <strong>Ahmad Al-Batayneh</strong>, a technology enthusiast who loves turning
                  complex ideas into simple solutions. I'm always exploring, learning, and building
                  something new.
                </>
              ) : (
                p
              )}
            </p>
          ))}

          <div className="about__stats">
            {STATS.map((s) => (
              <div className="about__stat" key={s.label}>
                <div className="about__stat-value">
                  {s.value}
                  <em>{s.suffix}</em>
                </div>
                <div className="mono about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
