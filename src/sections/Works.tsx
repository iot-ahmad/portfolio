import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectArt from "@/components/ProjectArt";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function ProjectItemCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;

  return (
    <article className={`project-wrap project-wrap--${project.id}`} data-index={index}>
      {/* Editorial Header */}
      <header className="project-head">
        <div>
          <p className="project-idx mono">{num}</p>
          <h3 className="project-title">{project.name}</h3>
          <p className="project-tag">{project.tagline}</p>
        </div>
      </header>

      {/* Grid: Visual Frame + Information Flow */}
      <div className={`project-grid ${isEven ? "" : "project-grid--reverse"}`}>
        {/* Visual Showcase */}
        <figure className="project-viz">
          <ProjectArt kind={project.art} />
          <a
            className="project-go"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.name} project`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 16L16 4M6 4h10v10" />
            </svg>
          </a>
        </figure>

        {/* Details & Capability Flow */}
        <div className="project-info">
          <p className="project-desc">{project.description}</p>

          <ol className="project-flow">
            {project.items.map((item, i) => (
              <li key={i} className={item.wip ? "wip" : ""}>
                {item.title} {item.note && <small>{item.note}</small>}
              </li>
            ))}
          </ol>

          <p className="project-legend">Filled dot: available. Hollow dot: in progress.</p>

          <a
            className="project-cta"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            View project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 13L13 3M5 3h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Works() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for each project block
      root.current!.querySelectorAll(".project-wrap").forEach((el) => {
        gsap.fromTo(
          el.querySelector(".project-head"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );

        gsap.fromTo(
          el.querySelector(".project-viz"),
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el.querySelector(".project-viz"), start: "top 85%", once: true },
          }
        );

        gsap.fromTo(
          el.querySelector(".project-info"),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el.querySelector(".project-info"), start: "top 82%", once: true },
          }
        );
      });

      // Section head animation
      gsap.fromTo(
        ".works .section__head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".works .section__head", start: "top 88%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section works container-x" id="works" ref={root}>
      <div className="section__head">
        <h2 className="section__title">
          Selected
          <br />
          Works
        </h2>
      </div>

      <div className="works__list">
        {PROJECTS.map((p, i) => (
          <ProjectItemCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
