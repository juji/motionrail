'use client';

import { MotionRail } from 'motionrail/react';
import { Dots } from 'motionrail/extensions/dots';
import 'motionrail/style.css';
import 'motionrail/extensions/dots/style.css';
import styles from '../../page.module.css';
import Link from 'next/link';

export default function DotsPage() {
  return (
    <div className={styles.container}>
      <Link href="/">← Back to Home</Link>
      <h1>Dots Extension Test</h1>

      {/* Basic Dots */}
      <section className={styles.section}>
        <h2>Basic Dots</h2>
        <MotionRail
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            extensions: [Dots()],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Dots with Index */}
      <section className={styles.section}>
        <h2>Dots with Index Numbers</h2>
        <MotionRail
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
            ],
            extensions: [Dots({ showIndex: true })],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Custom Dot Size */}
      <section className={styles.section}>
        <h2>Custom Dot Size & Font Size</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Dots({ showIndex: true, dotSize: 48, fontSize: 16 })],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Many Items (scrollable dots) */}
      <section className={styles.section}>
        <h2>Many Items (Scrollable Dots)</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Dots({ showIndex: true })],
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`${styles.item} ${styles[`item${(i % 8) + 1}`]}`}>
              {i + 1}
            </div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
