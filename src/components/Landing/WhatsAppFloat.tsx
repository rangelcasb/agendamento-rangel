import React from 'react';
import { buildWhatsAppLink } from './constants';

export const WhatsAppFloat: React.FC = () => {
  const waLink = buildWhatsAppLink('Olá! Vi a página e quero agendar um serviço.');

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 60,
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#25d366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 12px 26px -8px #000000aa',
        textDecoration: 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 01-12.3 7.6L4 20l1-4.5A8.5 8.5 0 1121 11.5z" />
        <path d="M8.5 10.5c.3 2 2.2 3.9 4.2 4.2" />
      </svg>
    </a>
  );
};
