import Link from "next/link";
import styles from "./Navbar.module.css";
import { GitHubIcon } from "@/components/icons";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <span className={styles.logo}>Mabul pipeline SKILLS</span>
        <nav className={styles.actions}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/skills" className={styles.navLink}>
            Skills
          </Link>
          <a
            href="https://github.com/DavidMarom/mabul-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View Mabul Pipeline on GitHub"
          >
            <GitHubIcon />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
