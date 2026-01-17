import { MotionRail } from 'motionrail/solid';
import { Dots } from 'motionrail/extensions/dots';
import 'motionrail/style.css';
import 'motionrail/extensions/dots/style.css';
import '../app.css';

export default function DotsComponent() {
  return (
    <div class="container">
      <h1>Dots Extension</h1>

      <nav class="nav">
        <a href="/">← Back to Home</a>
      </nav>

      <section class="section">
        <h2>Basic Dots</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Dots()],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Dots with Index</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Dots({ showIndex: true })],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Custom Dot Size</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Dots({ dotSize: 50, showIndex: true, fontSize: 16 })],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Multiple Columns with Dots</h2>
        <MotionRail
          options={{
            breakpoints: [
              { columns: 2, gap: '16px' },
              { width: 768, columns: 3, gap: '20px' },
            ],
            extensions: [Dots({ showIndex: true })],
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div class={`item item${num % 8 || 8}`}>{num}</div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
