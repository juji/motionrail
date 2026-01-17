'use client';

import { MotionRail } from 'motionrail/react';
import type { MotionRailState } from 'motionrail';
import 'motionrail/style.css';
import Nav from './components/Nav';
import { useState } from 'react';

export default function Home() {
  return (
    <div style={{ padding: '40px', background: '#000', color: '#eaeaea', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Nav current="main" />
        <h1 style={{ marginBottom: '10px' }}>MotionRail Test Page</h1>
        <p style={{ marginBottom: '30px', color: '#999', fontSize: '14px' }}>
          Comprehensive test suite for MotionRail React wrapper
        </p>

        {/* Basic Carousel */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>
            Basic Carousel (3 columns on desktop, 2 on tablet, 1 on mobile)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
              onChange: (state: MotionRailState) => console.log('Carousel changed:', state),
            }}
            style={{ height: '300px' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>

        {/* Autoplay Carousel */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Carousel with Autoplay</h2>
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
            style={{ height: '300px' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>

        {/* Variable Columns */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>
            Variable Columns (4 → 3 → 2 → 1)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '12px' },
                { width: 480, columns: 2, gap: '16px' },
                { width: 768, columns: 3, gap: '20px' },
                { width: 1024, columns: 4, gap: '24px' },
              ],
            }}
            style={{ height: '300px' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>

        {/* Dynamic Content */}
        <DynamicCarousel />

        {/* Edge Case: Single Item */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Edge Case: Single Item</h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
              ],
            }}
            style={{ height: '300px' }}
          >
            <div
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                background: `linear-gradient(135deg, ${getGradient(1)})`,
              }}
            >
              1
            </div>
          </MotionRail>
        </section>

        {/* Edge Case: Many Items */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>
            Edge Case: Many Items (20 Items)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 2, gap: '16px' },
                { width: 768, columns: 3, gap: '16px' },
                { width: 1024, columns: 4, gap: '20px' },
              ],
            }}
            style={{ height: '300px' }}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
              <div
                key={i}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: `linear-gradient(135deg, ${getGradient(i)})`,
                }}
              >
                {i}
              </div>
            ))}
          </MotionRail>
        </section>
      </div>
    </div>
  );
}

function DynamicCarousel() {
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <section style={{ marginBottom: '60px' }}>
      <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>
        Dynamic Content (Add/Remove Items)
      </h2>
      <MotionRail
        options={{
          breakpoints: [
            { columns: 1, gap: '16px' },
            { width: 768, columns: 2, gap: '16px' },
          ],
        }}
        style={{ height: '300px' }}
      >
        {items.map((i) => (
          <div
            key={i}
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              background: `linear-gradient(135deg, ${getGradient(i)})`,
            }}
          >
            {i}
          </div>
        ))}
      </MotionRail>
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setItems([...items, items.length + 1])}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            background: '#667eea',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Add Item
        </button>
        <button
          onClick={() => setItems(items.slice(0, -1))}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            background: '#667eea',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
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
