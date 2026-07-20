import React from 'react';
import { ACCENT } from './constants';

const exemplos = [
  { titulo: 'Trocar chuveiro', tempo: '~1h', valor: 'R$ 80-100' },
  { titulo: 'Montagem de móvel', tempo: '~2-3h', valor: 'R$ 160-300' },
  { titulo: 'Manutenção geral', tempo: '', valor: 'consultamos no local' },
];

export const Preco: React.FC = () => {
  return (
    <section id="preco" style={{ padding: '88px 24px', background: '#f7f5f0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: '#c98a1e', textTransform: 'uppercase', marginBottom: 10 }}>
          Preço
        </div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.4vw,38px)', margin: '0 0 12px', color: '#0b1f3a' }}>
          Quanto custa?
        </h2>
        <p style={{ fontSize: 16, color: '#5b6377', lineHeight: 1.6, margin: '0 0 6px' }}>
          Sem enganação. Sem surpresa.
        </p>
        <p style={{ fontSize: 16, color: '#5b6377', lineHeight: 1.6, margin: '0 0 32px' }}>
          A partir de <strong style={{ color: '#0b1f3a' }}>R$ 80/hora</strong> — você vê o orçamento
          antes de começar.
        </p>

        <div style={{ background: '#fff', border: '1px solid #e7e2d8', borderRadius: 16, padding: '28px 26px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#0b1f3a', marginBottom: 16 }}>
            Exemplos práticos:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {exemplos.map((item) => (
              <div
                key={item.titulo}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 12,
                  paddingBottom: 12,
                  borderBottom: '1px solid #f0ede6',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 14.5, color: '#1a2233' }}>
                  <strong>{item.titulo}</strong>
                  {item.tempo && <span style={{ color: '#8b96a5' }}> — {item.tempo}</span>}
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: '#c98a1e' }}>{item.valor}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 15.5, color: '#0b1f3a', fontWeight: 600, lineHeight: 1.6, margin: '0 0 24px' }}>
          Isso que combinamos é o valor final. Não cobra mais depois.
        </p>

        <div
          style={{
            background: `${ACCENT}14`,
            border: `1.5px dashed ${ACCENT}77`,
            borderRadius: 14,
            padding: '16px 20px',
            fontSize: 14.5,
            fontWeight: 700,
            color: '#0b1f3a',
          }}
        >
          Feriado? Fale comigo — atendo até fim de semana
        </div>
      </div>
    </section>
  );
};
