'use client';

import React, { useState } from 'react';

const perguntas = [
  {
    pergunta: 'Como funciona o agendamento?',
    resposta:
      'Você escolhe o serviço, me chama pelo formulário ou pelo WhatsApp, combinamos o melhor horário e eu vou até você.',
  },
  {
    pergunta: 'Vocês atendem condomínios?',
    resposta:
      'Sim! Trabalho bastante com apartamentos e prédios, sempre respeitando as regras do condomínio e os horários combinados com a portaria.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta: 'Combinamos o valor antes de começar o serviço, sem surpresa. Aceito Pix e dinheiro.',
  },
  {
    pergunta: 'Vocês dão garantia?',
    resposta: 'Sim, todo serviço sai com garantia. Se algo não ficar certo, eu volto para resolver sem custo extra.',
  },
  {
    pergunta: 'Atende fora do horário comercial?',
    resposta: 'Tenho horários flexíveis, incluindo fins de semana — é só combinar pelo WhatsApp.',
  },
];

export const Faq: React.FC = () => {
  const [abertos, setAbertos] = useState<boolean[]>([true, false, false, false, false]);

  const toggle = (i: number) => {
    setAbertos((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <section id="faq" style={{ padding: '88px 24px', background: '#f7f5f0' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '0 0 40px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: '#c98a1e', textTransform: 'uppercase', marginBottom: 10 }}>
            Dúvidas
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.4vw,36px)', margin: 0, color: '#0b1f3a' }}>
            Perguntas frequentes
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {perguntas.map((item, i) => (
            <div key={item.pergunta} style={{ background: '#fff', border: '1px solid #e7e2d8', borderRadius: 14, overflow: 'hidden' }}>
              <div
                onClick={() => toggle(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 22px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 15.5,
                  color: '#0b1f3a',
                }}
              >
                <span>{item.pergunta}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0b1f3a"
                  strokeWidth={2}
                  style={{ transform: abertos[i] ? 'rotate(180deg)' : undefined, transition: 'transform .2s' }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              {abertos[i] && (
                <div style={{ padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.6, color: '#5b6377' }}>{item.resposta}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
