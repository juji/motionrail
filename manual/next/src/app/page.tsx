'use client';

import { MotionRail } from 'motionrail/react';
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/dots/style.css';
import 'motionrail/extensions/thumbnails/style.css';
import styles from './page.module.css';
import { useRef } from 'react';
import Link from 'next/link';
import type { MotionRail as MotionRailClass } from 'motionrail';

export default function Home() {
  const carousel1 = useRef<MotionRailClass>(null!);
  const carousel2 = useRef<MotionRailClass>(null!);
  const carousel3 = useRef<MotionRailClass>(null!);

  return (
    <div className={styles.container}>
      <h1>MotionRail React Test</h1>

      <nav className={styles.nav}>
        <h3>Extension Pages:</h3>
        <ul>
          <li><Link href="/extensions/arrows">Arrows Extension</Link></li>
          <li><Link href="/extensions/dots">Dots Extension</Link></li>
          <li><Link href="/extensions/thumbnails">Thumbnails Extension</Link></li>
          <li><Link href="/extensions/logger">Logger Extension</Link></li>
        </ul>
      </nav>

      {/* Basic Carousel */}
      <section className={styles.section}>
        <h2>Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)</h2>
        <div className={styles.carousel}>
          <MotionRail
            ref={carousel1}
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
              onChange: (state) => console.log('Carousel 1 Changed:', state),
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
                {num}
              </div>
            ))}
          </MotionRail>
        </div>
        <div className={styles.controls}>
          <button onClick={() => carousel1.current?.prev()}>Previous</button>
          <button onClick={() => carousel1.current?.next()}>Next</button>
        </div>
      </section>

      {/* Carousel with Autoplay */}
      <section className={styles.section}>
        <h2>Carousel with Autoplay</h2>
        <div className={styles.carousel}>
          <MotionRail
            ref={carousel2}
            options={{
              autoplay: true,
              delay: 2500,
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
                {num}
              </div>
            ))}
          </MotionRail>
        </div>
        <div className={styles.controls}>
          <button onClick={() => carousel2.current?.prev()}>Previous</button>
          <button onClick={() => carousel2.current?.next()}>Next</button>
          <button onClick={() => carousel2.current?.play()}>Play</button>
          <button onClick={() => carousel2.current?.pause()}>Pause</button>
        </div>
      </section>

      {/* Carousel with Extensions */}
      <section className={styles.section}>
        <h2>Carousel with Arrows, Dots & Thumbnails Extensions</h2>
        <div className={styles.carousel}>
          <MotionRail
            ref={carousel3}
            options={{
              breakpoints: [{ columns: 1, gap: '16px' }],
              extensions: [Arrows({ loop: true }), Dots({ showIndex: true }), Thumbnails()],
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
                {num}
              </div>
            ))}
          </MotionRail>
        </div>
      </section>

      {/* RTL Carousel */}
      <section className={styles.section} dir="rtl">
        <h2>RTL Carousel</h2>
        <div className={styles.carousel}>
          <MotionRail
            options={{
              rtl: true,
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
                {num}
              </div>
            ))}
          </MotionRail>
        </div>
      </section>

      {/* Variable Columns */}
      <section className={styles.section}>
        <h2>Variable Columns (4 → 3 → 2 → 1)</h2>
        <div className={styles.carousel}>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '12px' },
                { width: 480, columns: 2, gap: '16px' },
                { width: 768, columns: 3, gap: '20px' },
                { width: 1024, columns: 4, gap: '24px' },
              ],
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className={`${styles.item} ${styles[`item${num}`]}`}>
                {num}
              </div>
            ))}
          </MotionRail>
        </div>
      </section>
    </div>
  );
}

