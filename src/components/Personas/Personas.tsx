import Image from "next/image";
import type { Persona } from "./Personas.types";
import styles from "./Personas.module.css";

const PERSONAS: Persona[] = [
  {
    id: "noah",
    name: "Noah",
    role: "Product",
    image: "/personas/Noah.png",
    description:
      "Professional product manager with deep experience in software delivery. Translates user needs into clear, actionable tasks and owns every feature from brief to completion - coordinating the team without losing information between handoffs.",
  },
  {
    id: "naamah",
    name: "Naamah",
    role: "Designer",
    image: "/personas/Naama.png",
    description:
      "UI/UX designer with deep expertise in design systems, interaction design, and CSS. Translates product requirements into precise, implementable design definitions - always mobile-first, always traceable to a real user need.",
  },
  {
    id: "shem",
    name: "Shem",
    role: "Developer",
    image: "/personas/Shem.png",
    description:
      "Senior full-stack developer with 15+ years of experience. Builds production-ready Next.js components using CSS Modules - clean, maintainable code that human engineers can own for years.",
  },
  {
    id: "nehemiah",
    name: "Nehemiah",
    role: "Security",
    image: "/personas/Nehemiah.png",
    description:
      "Professional application security engineer. Audits codebases for vulnerabilities across 24 vulnerability classes, writes precise remediation reports with exact file citations, and hands findings to the team so they get fixed.",
  },
];

export function Personas() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Meet your team</p>
        <div className={styles.grid}>
          {PERSONAS.map((persona) => (
            <article key={persona.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={persona.image}
                  alt={persona.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{persona.name}</h3>
                  <span className={styles.role}>{persona.role}</span>
                </div>
                <p className={styles.description}>{persona.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
