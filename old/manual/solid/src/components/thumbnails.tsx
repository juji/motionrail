import { MotionRail } from 'motionrail/solid';
import { Thumbnails } from 'motionrail/extensions/thumbnails';
import 'motionrail/style.css';
import 'motionrail/extensions/thumbnails/style.css';
import '../app.css';

export default function ThumbnailsComponent() {
  return (
    <div class="container">
      <h1>Thumbnails Extension</h1>

      <nav class="nav">
        <a href="/">← Back to Home</a>
      </nav>

      <section class="section">
        <h2>Basic Thumbnails</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails()],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Custom Thumbnail Size</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails({ thumbnailWidth: 120, thumbnailHeight: 120 })],
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div class={`item item${num}`}>{num}</div>
          ))}
        </MotionRail>
      </section>

      <section class="section">
        <h2>Small Thumbnails</h2>
        <MotionRail
          options={{
            breakpoints: [{ columns: 1, gap: '16px' }],
            extensions: [Thumbnails({ thumbnailWidth: 60, thumbnailHeight: 60 })],
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
