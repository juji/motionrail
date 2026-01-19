import { Title } from '@solidjs/meta';
import { Style } from '@solidjs/meta';
import { clientOnly } from '@solidjs/start';
import { MotionRail as MotionRailClass } from 'motionrail';
import 'motionrail/style.css';
import Nav from '~/components/Nav';
import { createSignal, For } from 'solid-js';


const MotionRail = clientOnly(() => import('motionrail/solid').then(m => ({ default: m.MotionRail })));

// Generate containerName and containerQueries for FOUC prevention (same as React)
const { containerName, containerQueries } = MotionRailClass.getBreakPoints(
  [
    { columns: 1, gap: '16px' },
    { width: 768, columns: 2, gap: '16px' },
    { width: 1024, columns: 3, gap: '20px' },
  ],
  8
);

export default function Home() {
  return (
    <div style={{ padding: '40px', background: '#000', color: '#eaeaea', 'min-height': '100vh' }}>
      <Title>MotionRail Test Page - SolidStart</Title>
      <div style={{ 'max-width': '1200px', margin: '0 auto' }}>
        <Nav current="main" />
        <h1 style={{ 'margin-bottom': '10px' }}>MotionRail Test Page</h1>
        <p style={{ 'margin-bottom': '30px', color: '#999', 'font-size': '14px' }}>
          Comprehensive test suite for MotionRail Solid wrapper
        </p>

        {/* Basic Carousel */}
        <section style={{ 'margin-bottom': '60px' }}>
          <h2 style={{ 'margin-bottom': '15px', 'font-size': '18px' }}>
            Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)
          </h2>
          {/* FOUC prevention: container query style in head, generated dynamically */}
          <Style data-motionrail-style={containerName}>{containerQueries}</Style>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
              containerName,
              onChange: (state: any) => console.log('Carousel changed:', state),
            }}
          >
            <For each={[1, 2, 3, 4, 5, 6, 7, 8]}>
              {(i) => (
                <div
                  style={{
                    height: '300px',
                    'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'font-size': '48px',
                    'font-weight': 'bold',
                    color: 'white',
                    background: `linear-gradient(135deg, ${getGradient(i)})`,
                  }}
                >
                  {i}
                </div>
              )}
            </For>
          </MotionRail>
        </section>

        {/* Autoplay Carousel */}
        <section style={{ 'margin-bottom': '60px' }}>
          <h2 style={{ 'margin-bottom': '15px', 'font-size': '18px' }}>Carousel with Autoplay</h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
              autoplay: true,
              delay: 2500,
            }}
          >
            <For each={[1, 2, 3, 4, 5, 6, 7, 8]}>
              {(i) => (
                <div
                  style={{
                    height: '300px',
                    'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'font-size': '48px',
                    'font-weight': 'bold',
                    color: 'white',
                    background: `linear-gradient(135deg, ${getGradient(i)})`,
                  }}
                >
                  {i}
                </div>
              )}
            </For>
          </MotionRail>
        </section>

        {/* Dynamic Content */}
        <DynamicCarousel />

        {/* Edge Case: Single Item */}
        <section style={{ 'margin-bottom': '60px' }}>
          <h2 style={{ 'margin-bottom': '15px', 'font-size': '18px' }}>Edge Case: Single Item</h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
              ],
            }}
          >
            <div
              style={{
                height: '300px',
                'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'font-size': '48px',
                'font-weight': 'bold',
                color: 'white',
                background: `linear-gradient(135deg, ${getGradient(1)})`,
              }}
            >
              1
            </div>
          </MotionRail>
        </section>
      </div>
    </div>
  );
}

function DynamicCarousel() {
  const [items, setItems] = createSignal([1, 2, 3]);

  return (
    <section style={{ 'margin-bottom': '60px' }}>
      <h2 style={{ 'margin-bottom': '15px', 'font-size': '18px' }}>
        Dynamic Content (Add/Remove Items)
      </h2>
      <MotionRail
        options={{
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
          ],
        }}
      >
        <For each={items()}>
          {(i) => (
            <div
              style={{
                height: '300px',
                'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'font-size': '48px',
                'font-weight': 'bold',
                color: 'white',
                background: `linear-gradient(135deg, ${getGradient(i)})`,
              }}
            >
              {i}
            </div>
          )}
        </For>
      </MotionRail>
      <div style={{ 'margin-top': '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setItems([...items(), items().length + 1])}
          style={{
            padding: '10px 20px',
            border: 'none',
            'border-radius': '6px',
            background: '#667eea',
            color: 'white',
            'font-size': '14px',
            'font-weight': '500',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
        <button
          onClick={() => setItems(items().slice(0, -1))}
          style={{
            padding: '10px 20px',
            border: 'none',
            'border-radius': '6px',
            background: '#667eea',
            color: 'white',
            'font-size': '14px',
            'font-weight': '500',
            cursor: 'pointer',
          }}
        >
          Remove Item
        </button>
      </div>
    </section>
  );
}

function getGradient(index: number): string {
  const gradients = [
    '#667eea 0%, #764ba2 100%',
    '#f093fb 0%, #f5576c 100%',
    '#4facfe 0%, #00f2fe 100%',
    '#43e97b 0%, #38f9d7 100%',
    '#fa709a 0%, #fee140 100%',
    '#30cfd0 0%, #330867 100%',
    '#a8edea 0%, #fed6e3 100%',
    '#ff9a9e 0%, #fecfef 100%',
  ];
  return gradients[(index - 1) % gradients.length];
}
