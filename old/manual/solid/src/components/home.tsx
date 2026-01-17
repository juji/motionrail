

import { MotionRail } from 'motionrail/solid';
import type { MotionRail as MotionRailClass } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import { Dots } from 'motionrail/extensions/dots';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import 'motionrail/extensions/dots/style.css';
import 'motionrail/extensions/thumbnails/style.css';
import '../app.css';




export default function Home() {
  let carousel1: MotionRailClass | undefined;
  let carousel2: MotionRailClass | undefined;
  let carousel3: MotionRailClass | undefined;

  return (
    <div class="container">
      <h1>MotionRail - SolidJS Test</h1>

      <nav class="nav">
        <h3>Extension Examples:</h3>
        <ul>
          <li>
            <a href="/extensions/arrows">Arrows Extension</a>
          </li>
          <li>
            <a href="/extensions/dots">Dots Extension</a>
          </li>
          <li>
            <a href="/extensions/thumbnails">Thumbnails Extension</a>
          </li>
          <li>
            <a href="/extensions/logger">Logger Extension</a>
          </li>
        </ul>
      </nav>

      <section class="section">
        <h2>Basic Carousel</h2>
        <MotionRail
          ref={(instance) => (carousel1 = instance)}
          options={{
            breakpoints: [
              { columns: 1, gap: '16px' },
              { width: 768, columns: 2, gap: '16px' },
              { width: 1024, columns: 3, gap: '20px' },
            ],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
        <div class="controls">
          <button onClick={() => carousel1?.prev()}>Previous</button>
          <button onClick={() => carousel1?.next()}>Next</button>
        </div>
      </section>

      <section class="section">
        <h2>Carousel with Autoplay</h2>
        <MotionRail
          ref={(instance) => (carousel2 = instance)}
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
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Carousel with Arrows, Dots & Thumbnails Extensions</h2>
        <MotionRail
          ref={(instance) => (carousel3 = instance)}
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Arrows({ loop: true }), Dots({ showIndex: true }), Thumbnails()],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section" dir="rtl">
        <h2>RTL Carousel</h2>
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
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Variable Columns (4 → 3 → 2 → 1)</h2>
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
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
