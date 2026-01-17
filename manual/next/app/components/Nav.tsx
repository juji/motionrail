'use client';

import Link from 'next/link';

interface NavProps {
  current: 'main' | 'arrows' | 'dots' | 'logger' | 'thumbnails';
}

export default function Nav({ current }: NavProps) {
  const links = [
    { href: '/', label: 'Main Tests', key: 'main' },
    { href: '/arrows', label: 'Arrows', key: 'arrows' },
    { href: '/dots', label: 'Dots', key: 'dots' },
    { href: '/logger', label: 'Logger', key: 'logger' },
    { href: '/thumbnails', label: 'Thumbnails', key: 'thumbnails' },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        marginBottom: '30px',
        padding: '15px',
        background: '#1a1a1a',
        borderRadius: '8px',
      }}
    >
      <span style={{ color: 'white', fontWeight: '600', fontSize: '16px', marginRight: '20px' }}>Next.js</span>
      <strong style={{ color: '#667eea', marginRight: '20px' }}>Tests:</strong>
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          style={{
            color: current === link.key ? '#fff' : '#999',
            marginRight: '15px',
            textDecoration: current === link.key ? 'underline' : 'none',
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
