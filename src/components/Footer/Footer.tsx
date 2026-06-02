import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} David Pipeline —{" "}
        <a
          href="https://github.com/DavidMarom/mabul-pipeline"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="View David Pipeline on GitHub"
        >
          MIT License
        </a>
      </p>
    </footer>
  );
}
