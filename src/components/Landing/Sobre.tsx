import React from 'react';
import Image from 'next/image';
import { ACCENT } from './constants';

const bullets = [
  'Discreto e confiável',
  'Pontual, sempre',
  'Respeito ao seu espaço',
  'Resposta rápida no WhatsApp',
];

export const Sobre: React.FC = () => {
  return (
    <section id="sobre" style={{ padding: '88px 24px', background: '#0b1f3a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 52, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 260, maxWidth: 400 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              aspectRatio: '945/1680',
              background: 'linear-gradient(160deg,#132c50,#0e2340)',
              boxShadow: '0 24px 50px -18px #00000066',
            }}
          >
            <Image
              src="/images/hero-rangel.png"
              alt="Rangel sorrindo, ambiente residencial"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
        <div style={{ flex: '2 1 420px', minWidth: 300 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: ACCENT, textTransform: 'uppercase', marginBottom: 10 }}>
            Sobre mim
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.2vw,34px)', color: '#fff', margin: '0 0 18px' }}>
            Um pouco sobre o Rangel
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#c7cede', margin: '0 0 16px' }}>
            Confirmo sua solicitação em 30 minutos. Chego em até 24h.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#c7cede', margin: '0 0 16px' }}>
            Moro aqui perto e cuido de consertos e manutenção em apartamentos e casas da região.
            Comecei ajudando vizinhos e hoje atendo condomínios inteiros — sempre com o mesmo
            cuidado de sempre: chegar no horário combinado, ser discreto dentro do seu espaço e
            deixar tudo funcionando (e limpo) antes de ir embora.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#c7cede', margin: '0 0 26px' }}>
            Preço justo (a partir de R$ 80/hora). Você vê antes de começar. Sem surpresa no final.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14 }}>
            {bullets.map((bullet) => (
              <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#e6e9f0', fontWeight: 600 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
