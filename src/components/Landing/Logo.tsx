import React from 'react';
import { ACCENT } from './constants';

interface LogoProps {
  variant?: 'header' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'header' }) => {
  const size = variant === 'header' ? 38 : 32;
  const gradientId = `logo-gradiente-${variant}`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity=".25" />
            <stop offset="100%" stopColor={ACCENT} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="none" stroke={`url(#${gradientId})`} strokeWidth={11} strokeLinecap="round" strokeDasharray="222 15" />
        <path d="M65 12 Q80 10 88 20 Q90 26 82 30 Q73 32 66 24 Q62 18 65 12Z" fill={ACCENT} />
        <circle cx="83" cy="19" r="1.6" fill="#0b1f3a" />
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
            MARIDO DE ALUGUEL
          </div>
        </div>
      ) : (
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff' }}>
          rangel <span style={{ fontWeight: 600, color: '#8b96ad', fontSize: 12 }}>— MARIDO DE ALUGUEL</span>
        </div>
      )}
    </div>
  );
};
