import { MotionRail } from 'motionrail/preact';
import { Arrows } from 'motionrail/extensions/arrows';
import 'motionrail/style.css';
import 'motionrail/extensions/arrows/style.css';
import Nav from '../components/Nav';

export default function ArrowsPage({ path }: { path?: string }) {
  return (
    <div style={{ padding: '40px', background: '#000', color: '#eaeaea', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Nav current="arrows" />
        <h1 style={{ marginBottom: '10px' }}>Arrows Extension Test Page</h1>
        <p style={{ marginBottom: '30px', color: '#999', fontSize: '14px' }}>
          Test suite for the Arrows extension (navigation arrows)
        </p>

        {/* Basic Arrows */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Basic Arrows</h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
                { width: 1024, columns: 3, gap: '20px' },
              ],
              extensions: [Arrows()],
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
        </section>

        {/* Auto-hide Arrows */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>
            Auto-hide Arrows (when at start/end)
          </h2>
          <MotionRail
            options={{
              breakpoints: [
                { columns: 1, gap: '16px' },
                { width: 768, columns: 2, gap: '16px' },
              ],
              extensions: [Arrows({ loop: false })],
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        </section>
      </div>
    </div>
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
