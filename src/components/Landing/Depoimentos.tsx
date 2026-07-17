import React from 'react';
import { ACCENT } from './constants';

const depoimentos = [
  {
    texto:
      '"Chamei pra trocar o chuveiro e resolver uma tomada solta. Chegou no horário, foi rápido e deixou tudo limpinho depois."',
    nome: 'Camila R.',
    papel: 'Moradora, Ed. Vista Verde',
  },
  {
    texto:
      '"Contratamos pra fazer manutenção geral no condomínio. Muito discreto, avisou a portaria certinho e resolveu tudo em um dia só."',
    nome: 'Marcos T.',
    papel: 'Síndico, Cond. Alto da Serra',
  },
  {
    texto:
      '"Montou três móveis num sábado à tarde, com capricho e sem sujeira. Já virou o marido de aluguel oficial daqui de casa."',
    nome: 'Juliana P.',
    papel: 'Moradora, Bairro Jatiúca',
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

const Avatar: React.FC<{ nome: string }> = ({ nome }) => (
  <div
    style={{
      width: 38,
      height: 38,
      borderRadius: '50%',
      background: '#0e2340',
      border: `1px solid ${ACCENT}55`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      color: ACCENT,
      flex: 'none',
    }}
  >
    {nome.charAt(0)}
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
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.4vw,38px)', margin: '0 0 12px', color: '#fff' }}>
            O que dizem os clientes
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 22 }}>
          {depoimentos.map((d) => (
            <div key={d.nome} style={{ background: '#132c50', border: '1px solid #ffffff14', borderRadius: 16, padding: 26 }}>
              <Estrelas />
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#dbe0ec', margin: '0 0 18px' }}>{d.texto}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar nome={d.nome} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>{d.nome}</div>
                  <div style={{ fontSize: 12, color: '#8b96ad' }}>{d.papel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
