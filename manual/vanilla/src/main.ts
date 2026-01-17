import { MotionRail } from 'motionrail';
import 'motionrail/style.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div>
    <h1>MotionRail Vanilla JS Demo</h1>
    
    <div class="demo-section">
      <h2>Basic Carousel</h2>
      <div id="carousel" data-motionrail>
        <div data-motionrail-scrollable>
          <div data-motionrail-grid>
            ${Array.from({ length: 10 }, (_, i) => `
              <div class="slide">
                <h3>Slide ${i + 1}</h3>
                <p>This is slide number ${i + 1}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>With Arrows Extension</h2>
      <div id="carousel-arrows" data-motionrail>
        <div data-motionrail-scrollable>
          <div data-motionrail-grid>
            ${Array.from({ length: 10 }, (_, i) => `
              <div class="slide">
                <h3>Slide ${i + 1}</h3>
                <p>With navigation arrows</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Initialize basic carousel
const carousel = document.querySelector('#carousel')!;
new MotionRail(carousel, {
  slidesPerView: 3,
  gap: 20,
});

// Initialize carousel with arrows
const carouselArrows = document.querySelector('#carousel-arrows')!;
new MotionRail(carouselArrows, {
  slidesPerView: 3,
  gap: 20,
});
