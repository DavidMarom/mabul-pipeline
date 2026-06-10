import Link from "next/link";
import styles from "./Hero.module.css";
import { CodeBlock } from "@/components/CodeBlock/CodeBlock";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.byline}>Built by{" "}<a href="https://www.linkedin.com/in/maromdavid/" target="_blank" rel="noopener noreferrer">David Marom</a></p>
        <h1 className={styles.headline}>Mabul Pipeline</h1>


        <CodeBlock />

        <div className={styles.ctaGroup}>
          <a href="https://github.com/DavidMarom/mabul-pipeline" target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>
            Get Started
          </a>
          <Link href="/skills" className={styles.secondaryCta}>
            Explore Skills →
          </Link>
        </div>
        {/* <p className={styles.eyebrow}>Start with /product</p> */}

      </div>
    </section>
  );
}
