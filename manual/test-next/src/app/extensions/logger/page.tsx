'use client';

import { MotionRail } from 'motionrail/react';
import { Logger } from 'motionrail/extensions/logger';
import 'motionrail/style.css';
import styles from '../../page.module.css';
import Link from 'next/link';

export default function LoggerPage() {
  return (
    <div className={styles.container}>
      <Link href="/">← Back to Home</Link>
      <h1>Logger Extension Test</h1>
      <p>Open your browser console to see the logger output.</p>

      {/* Basic Logger */}
      <section className={styles.section}>
        <h2>Carousel with Logger Extension</h2>
        <MotionRail
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            extensions: [Logger()],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
