import React from 'react';
import { ACCENT } from './constants';

const items = [
  {
    title: 'Serviço de confiança',
    subtitle: 'Você pode confiar',
    path: <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />,
  },
  {
    title: 'Rápido e pontual',
    subtitle: 'Seu tempo importa',
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    title: 'Limpo e organizado',
    subtitle: 'Respeito pelo seu espaço',
    path: <path d="M5 12l4 4 10-10" />,
  },
  {
    title: 'Garantia do serviço',
    subtitle: 'Trabalho bem feito',
    path: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5" />
      </>
    ),
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <section style={{ background: '#0b1f3a', borderTop: '1px solid #ffffff14', padding: '0 24px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '26px 18px',
              borderRight: i < items.length - 1 ? '1px solid #ffffff10' : undefined,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
              {item.path}
            </svg>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: '#9aa5bb' }}>{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
