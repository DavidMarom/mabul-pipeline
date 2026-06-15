'use client';

import { useEffect, useState } from 'react';
import styles from './TokenCounter.module.css';
import { formatTokenCount } from './TokenCounter.utils';

export function TokenCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/token-count')
      .then((res) => res.json())
      .then((data: { total: number }) => setCount(data.total))
      .catch(() => setError(true));
  }, []);

  const isLoading = count === null && !error;
  const formatted = error ? '--' : count === null ? '---' : formatTokenCount(count);
  const ariaLabel =
    error || count === null
      ? 'Total Claude tokens used: loading'
      : `Total Claude tokens used: ${formatted}`;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`${styles.pill}${isLoading ? ` ${styles.loading}` : ''}`}
    >
      <span className={styles.prefix} aria-hidden="true">T</span>
      <span className={styles.count}>{formatted}</span>
      <span className={styles.label} aria-hidden="true">tokens</span>
    </span>
  );
}
