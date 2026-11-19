import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto__statement .mask-line > span",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto__statement", start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".manifesto__panel",
        { opacity: 0, scale: 0.94, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto__panel", start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".manifesto__body",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto__body", start: "top 88%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section manifesto container-x" ref={root}>
      <div className="manifesto__grid">
        <div className="manifesto__left">
          <h2 className="manifesto__statement">
            <span className="mask-line">
              <span>I BUILD</span>
            </span>
            <span className="mask-line">
              <span>IDEAS INTO</span>
            </span>
            <span className="mask-line">
              <span className="lime">REALITY.</span>
            </span>
          </h2>
        </div>

        <div className="manifesto__right">
          <figure className="manifesto__panel">
            <img src="/img/ahmad-avatar.jpeg" alt="Ahmad Al-Batayneh" loading="lazy" />
          </figure>
          <p className="manifesto__body">
            {PROFILE.manifesto}
          </p>
        </div>
      </div>
    </section>
  );
}
