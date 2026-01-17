import { MotionRail } from 'motionrail/solid';
import { Logger } from 'motionrail/extensions/logger';
import 'motionrail/style.css';
import '../app.css';

export default function LoggerComponent() {
  return (
    <div class="container">
      <h1>Logger Extension</h1>

      <nav class="nav">
        <a href="/">← Back to Home</a>
      </nav>

      <section class="section">
        <h2>Logger Extension (Check Console)</h2>
        <p>Open the browser console to see the logger output.</p>
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
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>
    </div>
  );
}
