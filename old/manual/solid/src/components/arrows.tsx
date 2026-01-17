import { MotionRail } from 'motionrail/solid';
import type { MotionRail as MotionRailClass } from 'motionrail';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import '../app.css';

export default function ArrowsComponent() {
  let carousel1: MotionRailClass | undefined;
  let carousel2: MotionRailClass | undefined;
  let carousel3: MotionRailClass | undefined;

  return (
    <div class="container">
      <h1>Arrows Extension</h1>

      <nav class="nav">
        <a href="/">← Back to Home</a>
      </nav>

      <section class="section">
        <h2>Basic Arrows</h2>
        <MotionRail
          ref={(instance) => (carousel1 = instance)}
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Arrows()],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Arrows with Loop</h2>
        <MotionRail
          ref={(instance) => (carousel2 = instance)}
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Arrows({ loop: true })],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Custom Arrow Icons</h2>
        <MotionRail
          ref={(instance) => (carousel3 = instance)}
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
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
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
