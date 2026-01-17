'use client';

import { MotionRail } from 'motionrail/react';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/thumbnails/style.css';
import styles from '../../page.module.css';
import Link from 'next/link';

export default function ThumbnailsPage() {
  return (
    <div className={styles.container}>
      <Link href="/">← Back to Home</Link>
      <h1>Thumbnails Extension Test</h1>

      {/* Basic Thumbnails */}
      <section className={styles.section}>
        <h2>Basic Thumbnails</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails()],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Custom Thumbnail Size */}
      <section className={styles.section}>
        <h2>Custom Thumbnail Size (120x120)</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails({ thumbnailWidth: 120, thumbnailHeight: 120 })],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
              {num}
            </div>
          ))}
        </MotionRail>
      </section>

      {/* Small Thumbnails */}
      <section className={styles.section}>
        <h2>Small Thumbnails (60x60)</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails({ thumbnailWidth: 60, thumbnailHeight: 60 })],
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
