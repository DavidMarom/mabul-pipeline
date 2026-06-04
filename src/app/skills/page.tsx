import { Navbar, Footer, PageHeader, SkillCard, PipelineFlow } from "@/components";
import { SKILLS_DATA } from "./constants";
import styles from "./skills.module.css";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <PageHeader
          eyebrow="The Pipeline Team"
          title="Skills"
          tagline="Three AI personas that work together to take your idea from brief to shipped code."
        />
        <section className={styles.grid} aria-label="Skills overview">
          {SKILLS_DATA.map((skill) => (
            <SkillCard key={skill.command} {...skill} />
          ))}
        </section>
        <PipelineFlow />
      </main>
      <Footer />
    </>
  );
}
