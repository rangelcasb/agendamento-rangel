import React from 'react';
import Image from 'next/image';
import { ACCENT, buildWhatsAppLink } from './constants';

const checkItems = [
  'Condomínios e residências',
  'Resposta rápida no WhatsApp',
  'Atendimento hoje mesmo',
];

export const Hero: React.FC = () => {
  const waLink = buildWhatsAppLink('Olá! Vi a página e quero agendar um serviço.');

  return (
    <section
      style={{
        background: 'linear-gradient(160deg,#0b1f3a 0%,#132c50 55%,#0e2340 100%)',
        padding: '64px 24px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ flex: '1 1 460px', minWidth: 300, paddingBottom: 56 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#ffffff12',
              border: '1px solid #ffffff22',
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 12.5,
              color: ACCENT,
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M12 2l2.6 6.6L21 10l-5 4.4L17.4 22 12 18l-5.4 4L8 14.4 3 10l6.4-1.4z" />
            </svg>
            Especialista em condomínios e residências
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(38px,5vw,58px)',
              lineHeight: 1.04,
              color: '#fff',
              margin: '0 0 6px',
            }}
          >
            Marido de Aluguel
          </h1>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(20px,2.6vw,28px)',
              lineHeight: 1.35,
              color: ACCENT,
              margin: '0 0 30px',
            }}
          >
            Confirmo em 30 minutos.
            <br />
            Executo em até 24h.
            <br />
            A partir de R$ 80/hora.
          </h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 30 }}>
            <a
              href="#agendamento"
              style={{
                background: ACCENT,
                color: '#1a1200',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 26px',
                borderRadius: 10,
                textDecoration: 'none',
                boxShadow: `0 8px 20px -6px ${ACCENT}88`,
              }}
            >
              Agendar meu horário
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                background: '#ffffff10',
                border: '1.5px solid #3ddc84',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                padding: '13px 24px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ddc84" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.5 8.5 0 01-12.3 7.6L4 20l1-4.5A8.5 8.5 0 1121 11.5z" />
                <path d="M8.5 10.5c.3 2 2.2 3.9 4.2 4.2" />
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {checkItems.map((item) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#aeb8cb' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 340px', minWidth: 280, maxWidth: 440, position: 'relative', paddingBottom: 40 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              aspectRatio: '945/1680',
              background: 'linear-gradient(160deg,#132c50,#0b1f3a)',
              boxShadow: '0 30px 60px -20px #00000066',
            }}
          >
            <Image
              src="/images/hero-rangel.png"
              alt="Rangel, especialista em serviços residenciais"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
