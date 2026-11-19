import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact__title .mask-line > span",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: ".contact__title", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".contact__sub, .contact__cta, .footer__marquee, .footer__bottom",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact", start: "top 75%", once: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const marqueeItems = Array.from({ length: 6 });

  return (
    <div ref={root}>
      <section className="section contact container-x" id="contact">
        <div className="section__head">
          <h2 className="section__title">Contact</h2>
        </div>

        <h2 className="contact__title">
          <span className="mask-line">
            <span>Let&rsquo;s build</span>
          </span>
          <span className="mask-line">
            <span>
              <span className="lime">something.</span>
            </span>
          </span>
        </h2>

        <p className="contact__sub">
          Open to collaborations, ideas and interesting challenges.
        </p>

        <div className="contact__cta">
          <a className="text-cta" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13 13 3M5.5 3H13v7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <div className="contact__socials" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              className="mono link-underline"
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--fg-dim)", fontSize: "0.75rem" }}
            >
              GitHub ↗
            </a>
            <a
              className="mono link-underline"
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--fg-dim)", fontSize: "0.75rem" }}
            >
              LinkedIn ↗
            </a>
            <a
              className="mono link-underline"
              href={PROFILE.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--fg-dim)", fontSize: "0.75rem" }}
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__marquee" aria-hidden="true">
          <div className="footer__marquee-track">
            {[...marqueeItems, ...marqueeItems].map((_, i) => (
              <span key={i}>
                Ahmad Al-Batayneh — <em>Think · Build · Explore</em>
              </span>
            ))}
          </div>
        </div>
        <div className="footer__bottom container-x mono">
          <span>© {PROFILE.year} {PROFILE.name}</span>
          <span>{PROFILE.roles}</span>
          <a className="link-underline" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
