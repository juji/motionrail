'use client';

import { MotionRail } from 'motionrail/react';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import styles from '../../page.module.css';
import { useRef } from 'react';
import Link from 'next/link';
import type { MotionRail as MotionRailClass } from 'motionrail';

export default function ArrowsPage() {
  const carousel1 = useRef<MotionRailClass>(null!);
  const carousel2 = useRef<MotionRailClass>(null!);

  return (
    <div className={styles.container}>
      <Link href="/">← Back to Home</Link>
      <h1>Arrows Extension Test</h1>

      {/* Basic Arrows */}
      <section className={styles.section}>
        <h2>Basic Arrows (loop: true)</h2>
        <MotionRail
          ref={carousel1}
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            extensions: [Arrows({ loop: true })],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Arrows with loop: false */}
      <section className={styles.section}>
        <h2>Arrows with loop: false (disabled at edges)</h2>
        <MotionRail
          ref={carousel2}
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
            extensions: [Arrows({ loop: false })],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Custom Icons */}
      <section className={styles.section}>
        <h2>Custom Arrow Icons</h2>
        <MotionRail
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
            ],
            extensions: [
              Arrows({
                loop: true,
                leftIcon: '←',
                rightIcon: '→',
              }),
            ],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
