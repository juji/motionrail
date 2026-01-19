'use client';

import { MotionRail } from 'motionrail/react';
import 'motionrail/style.css';
import { useState } from 'react';
import { getGradient } from './get-gradient';

export function DynamicCarousel() {
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
      >
        {items.map((i) => (
          <div
            key={i}
            style={{
              height: '300px',
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