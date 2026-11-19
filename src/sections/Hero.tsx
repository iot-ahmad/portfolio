import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export default function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    let ctx: gsap.Context | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const execute = () => {
      if (!root.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".hero .hero__banner",
          { y: 52, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, stagger: 0.15 }
        )
          .fromTo(
            "[data-reveal='subtitle']",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.5"
          )
          .fromTo(
            "[data-reveal='meta']",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.4"
          );
      }, root);
    };

    if (start) {
      execute();
    } else {
      timer = setTimeout(execute, 900);
    }

    return () => {
      if (timer) clearTimeout(timer);
      ctx?.revert();
    };
  }, [start]);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__poster" aria-hidden="true" />
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <div className="hero__content container-x">
        <h1 className="hero__title hero__title--banner" aria-label="Ahmad Al-Batayneh">
          <div className="hero__banner-wrap">
            <span className="hero__banner hero__banner--first">
              AHMAD
            </span>
          </div>
          <div className="hero__banner-wrap">
            <span className="hero__banner hero__banner--second">
              <span>AL-BATAYNEH.</span>
            </span>
          </div>
        </h1>

        <p className="hero__subtitle hero__subtitle--lime" data-reveal="subtitle">
          Think. Build. Explore.
        </p>

        <div className="hero__meta" data-reveal="meta">
          <a className="hero__scroll mono" href="#works">
            Scroll down
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M6 1v11M1.5 8.5 6 13l4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
