import React from 'react';
import { ACCENT, buildWhatsAppLink } from './constants';

const servicos = [
  {
    titulo: 'Troca de tomadas, chuveiro, lâmpadas',
    descricao: 'Instalação e troca de tomadas, interruptores, chuveiros elétricos e pontos de luz.',
    path: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  },
  {
    titulo: 'Vazamentos, torneiras, sifão',
    descricao: 'Reparo de vazamentos, troca de torneiras, sifões e registros.',
    path: <path d="M12 2s6 7 6 12a6 6 0 01-12 0c0-5 6-12 6-12z" />,
  },
  {
    titulo: 'Montagem de móveis',
    descricao: 'Monto guarda-roupa, cama, estante, rack e qualquer móvel que veio na caixa.',
    path: (
      <>
        <rect x="4" y="7" width="16" height="12" rx="1.5" />
        <path d="M4 11h16M9 7V5h6v2" />
      </>
    ),
  },
  {
    titulo: 'Instalações (TV, cortina, suporte)',
    descricao: 'Fixação de TV, suportes, cortinas, prateleiras e quadros.',
    path: (
      <>
        <path d="M14.7 6.3a4 4 0 015.7 5.6l-6.1 6.1a2 2 0 01-2.8 0l-5.7-5.7a2 2 0 010-2.8l6.1-6.1a4 4 0 013.5-1.1" />
        <path d="M9 15l-4 4" />
      </>
    ),
  },
];

export const Servicos: React.FC = () => {
  const waLink = buildWhatsAppLink('Olá! Tenho outro serviço para pedir um orçamento.');

  return (
    <section id="servicos" style={{ padding: '88px 24px', background: '#f7f5f0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 560, margin: '0 0 44px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: '#c98a1e', textTransform: 'uppercase', marginBottom: 10 }}>
            Serviços
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.4vw,38px)', margin: '0 0 12px', color: '#0b1f3a' }}>
            No que posso te ajudar
          </h2>
          <p style={{ fontSize: 16, color: '#5b6377', lineHeight: 1.6, margin: 0 }}>
            Da tomada que não liga até o quadro que não fecha — me manda a demanda que eu resolvo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
          {servicos.map((s) => (
            <div key={s.titulo} style={{ background: '#fff', border: '1px solid #e7e2d8', borderRadius: 16, padding: '26px 22px' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: '#0b1f3a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  {s.path}
                </svg>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0b1f3a', marginBottom: 8 }}>{s.titulo}</div>
              <div style={{ fontSize: 14, color: '#6a7286', lineHeight: 1.55 }}>{s.descricao}</div>
            </div>
          ))}
          <div
            style={{
              background: `${ACCENT}14`,
              border: `1.5px dashed ${ACCENT}77`,
              borderRadius: 16,
              padding: '26px 22px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ width: 46, height: 46, borderRadius: 12, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1200" strokeWidth={2.2} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#0b1f3a', marginBottom: 8 }}>Outro serviço?</div>
            <div style={{ fontSize: 14, color: '#6a7286', lineHeight: 1.55, marginBottom: 14, flex: 1 }}>
              Tem outro perrengue em casa? Me chama e vejo como ajudar.
            </div>
            <a href={waLink} target="_blank" rel="noopener" style={{ fontSize: 13.5, fontWeight: 700, color: '#0b1f3a', textDecoration: 'none' }}>
              Falar no WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
