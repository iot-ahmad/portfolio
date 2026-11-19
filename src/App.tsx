import { useEffect, useState } from "react";
import gsap from "gsap";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Hero from "@/sections/Hero";
import Manifesto from "@/sections/Manifesto";
import Works from "@/sections/Works";
import Capabilities from "@/sections/Capabilities";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import { NAV, PROFILE } from "@/lib/data";

function Header() {
  return (
    <header className="site-header">
      <a className="site-header__logo" href="#top" aria-label="Back to top">
        <span>
          A<em>B</em>
        </span>
      </a>

      <nav className="site-header__right" aria-label="Primary">
        <a className="mono link-underline" href={NAV[0].href}>
          {NAV[0].label}
        </a>
        <a className="mono link-underline" href={NAV[1].href}>
          {NAV[1].label}
        </a>
        <a className="mono link-underline" href={NAV[2].label ? NAV[2].href : "#about"}>
          {NAV[2].label}
        </a>
        <a className="mono link-underline" href={NAV[3].label ? NAV[3].href : "#contact"}>
          {NAV[3].label}
        </a>
        <a
          className="mono link-underline"
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
        <a
          className="mono link-underline"
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
      </nav>
    </header>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // keep animations on wall-clock time even on very slow devices
  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <Header />
      <main>
        <Hero start={loaded} />
        <Manifesto />
        <Works />
        <Capabilities />
        <About />
        <Contact />
      </main>
    </>
  );
}
