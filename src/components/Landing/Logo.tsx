import React from 'react';
import { ACCENT } from './constants';

interface LogoProps {
  variant?: 'header' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header' }) => {
  const size = variant === 'header' ? 34 : 28;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="21" fill="none" stroke={ACCENT} strokeWidth={7} />
        <circle cx="43" cy="14" r="6" fill={ACCENT} />
      </svg>
      {variant === 'header' ? (
        <div style={{ lineHeight: 1.1 }}>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: '#fff',
              letterSpacing: -0.4,
            }}
          >
            rangel
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 1.5,
              color: ACCENT,
              fontWeight: 700,
              marginTop: 2,
            }}
          >
            SERVIÇOS RESIDENCIAIS
          </div>
        </div>
      ) : (
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff' }}>
          rangel <span style={{ fontWeight: 600, color: '#8b96ad', fontSize: 12 }}>— SERVIÇOS RESIDENCIAIS</span>
        </div>
      )}
    </div>
  );
};
