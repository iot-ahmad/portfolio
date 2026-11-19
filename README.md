# Ahmad Al-Batayneh — Portfolio

Premium personal portfolio — Editorial × Experimental direction. Dark cinematic aesthetic: obsidian black, ivory, acid lime (`#A8F05A`), oversized typography, custom 3D sculptures and scroll-driven motion.

## Stack

- React + TypeScript + Vite + Tailwind CSS
- Three.js + React Three Fiber + drei — chrome/glass sculpture, procedural studio environment, mouse parallax, scroll-driven camera
- GSAP + ScrollTrigger — kinetic typography, line reveals, SVG ellipse draw, scroll-triggered section animations
- Playwright-verified (console-clean, responsive, interaction integrity)

## Run

```bash
npm install
npm run dev     # dev server
npm run build   # production build → dist/
npm run preview # serve the production build
```

## Structure

- `src/sections/` — Hero, Manifesto, Works, Capabilities, About, Contact
- `src/components/` — Scene3D (WebGL sculpture), Loader, Cursor, ProjectArt (generative SVG thumbnails)
- `src/lib/data.ts` — all content (projects, capabilities, links)
- `public/img/` — photography

## Notes

- Content is wired to real projects: [github.com/iot-ahmad](https://github.com/iot-ahmad)
- Respects `prefers-reduced-motion`; the 3D scene pauses when off-screen and degrades to a static poster
- The three.js chunk is lazy-loaded and split from the main bundle
