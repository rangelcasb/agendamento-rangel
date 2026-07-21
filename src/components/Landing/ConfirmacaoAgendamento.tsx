import React from 'react';
import { ACCENT, WHATSAPP_DISPLAY, buildWhatsAppLink } from './constants';

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Aguardando confirmação',
  aprovado: 'Aprovado',
  rejeitado: 'Não foi possível confirmar',
  concluido: 'Concluído',
  nao_compareceu: 'Não compareceu',
};

interface ConfirmacaoAgendamentoProps {
  mensagemWhatsApp: string;
  status?: string;
}

export const ConfirmacaoAgendamento: React.FC<ConfirmacaoAgendamentoProps> = ({
  mensagemWhatsApp,
  status,
}) => {
  const waLink = buildWhatsAppLink(mensagemWhatsApp || 'Olá! Vi a página e quero agendar um serviço.');

  return (
    <div
      style={{
        background: '#132c50',
        border: `1px solid ${ACCENT}55`,
        borderRadius: 18,
        padding: '44px 32px',
        textAlign: 'center',
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      <div
        className="animate-check"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: ACCENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a1200" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 10 }}>
        Pedido recebido!
      </div>
      {status && (
        <div
          style={{
            display: 'inline-block',
            fontSize: 12.5,
            fontWeight: 700,
            color: ACCENT,
            background: '#0e2340',
            padding: '5px 12px',
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          {STATUS_LABEL[status] || status}
        </div>
      )}
      <p style={{ fontSize: 14.5, color: '#c7cede', lineHeight: 1.6, margin: '0 0 22px' }}>
        Copie a mensagem abaixo e me chame no WhatsApp ({WHATSAPP_DISPLAY}) pra confirmar.
      </p>
      <div style={{ background: '#0e2340', borderRadius: 10, padding: '14px 16px', fontSize: 13.5, color: '#dbe0ec', marginBottom: 22, textAlign: 'left' }}>
        {mensagemWhatsApp}
      </div>
      <a
        href={waLink}
        target="_blank"
        rel="noopener"
        className="transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          background: '#25d366',
          color: '#0b1f3a',
          fontWeight: 700,
          fontSize: 14.5,
          padding: '12px 22px',
          borderRadius: 10,
          textDecoration: 'none',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 01-12.3 7.6L4 20l1-4.5A8.5 8.5 0 1121 11.5z" />
        </svg>
        Adiantar pelo WhatsApp
      </a>
    </div>
  );
};
