'use client';

import React from 'react';
import { ACCENT } from './constants';
import { Logo } from './Logo';

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'Dúvidas' },
];

export const Header: React.FC = () => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#0b1f3aee',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #ffffff14',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Logo variant="header" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: 14, color: '#d9dee8', textDecoration: 'none', fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendamento"
            style={{
              background: ACCENT,
              color: '#1a1200',
              fontWeight: 700,
              fontSize: 13.5,
              padding: '9px 18px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Agendar agora
          </a>
        </nav>
      </div>
    </header>
  );
};
