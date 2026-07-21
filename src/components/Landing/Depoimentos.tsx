import React from 'react';
import { ACCENT } from './constants';

const depoimentos = [
  {
    texto:
      '"Chamei pra trocar o chuveiro e resolver uma tomada solta. Chegou no horário, foi rápido e deixou tudo limpinho depois."',
    nome: 'Exemplo ilustrativo',
  },
  {
    texto:
      '"Montou os móveis com capricho e sem sujeira. É bom saber que dá pra confiar."',
    nome: 'Exemplo ilustrativo',
  },
];

const Estrelas: React.FC = () => (
  <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={ACCENT}>
        <path d="M12 2l2.6 6.6L21 10l-5 4.4L17.4 22 12 18l-5.4 4L8 14.4 3 10l6.4-1.4z" />
      </svg>
    ))}
  </div>
);

export const Depoimentos: React.FC = () => {
  return (
    <section id="depoimentos" style={{ padding: '88px 24px', background: '#0e2340' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 560, margin: '0 0 44px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: ACCENT, textTransform: 'uppercase', marginBottom: 10 }}>
            Depoimentos
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.4vw,38px)', margin: '0 0 8px', color: '#fff' }}>
            O que dizem os clientes
          </h2>
          <p style={{ fontSize: 13.5, color: '#8b96ad', margin: 0 }}>
            Exemplos ilustrativos do tipo de atendimento — em breve, depoimentos reais de clientes.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 22, maxWidth: 700 }}>
          {depoimentos.map((d, i) => (
            <div
              key={i}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: '#132c50', border: '1px solid #ffffff14', borderRadius: 16, padding: 26 }}
            >
              <Estrelas />
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#dbe0ec', margin: '0 0 14px' }}>{d.texto}</p>
              <div style={{ fontSize: 12, color: '#8b96ad', fontStyle: 'italic' }}>{d.nome}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
