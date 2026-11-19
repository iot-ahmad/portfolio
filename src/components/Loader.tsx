import { useEffect, useState } from "react";
import gsap from "gsap";

const COLS = 5;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const cols = gsap.utils.toArray<HTMLElement>(".loader__col");
    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });

    tl.to(cols, {
      scaleY: 1,
      duration: 0.28,
      stagger: 0.035,
      ease: "power3.out",
    })
      .fromTo(
        ".loader__center",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        "-=0.15"
      )
      .to({}, { duration: 0.32 }) // quick, elegant hold
      .to(".loader__center", { opacity: 0, y: -8, duration: 0.18 })
      .to(cols, {
        scaleY: 0,
        transformOrigin: "center top",
        duration: 0.35,
        stagger: 0.035,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <>
      <div className="loader" aria-hidden="true">
        {Array.from({ length: COLS }).map((_, i) => (
          <div className="loader__col" key={i} />
        ))}
      </div>
      <div className="loader__center" aria-hidden="true">
        <div className="loader__bars">
          <span /> <span /> <span /> <span />
        </div>
        <div className="loader__brand">
          Ahmad <span className="lime">Al-Batayneh</span>
        </div>
        <div className="loader__count">PORTFOLIO — 2026</div>
      </div>
    </>
  );
}
