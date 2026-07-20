import React from 'react';
import { WHATSAPP_DISPLAY, buildWhatsAppLink } from './constants';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const waLink = buildWhatsAppLink('Olá! Vi a página e quero agendar um serviço.');

  return (
    <footer style={{ background: '#08182f', padding: '48px 24px 28px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          borderBottom: '1px solid #ffffff14',
          paddingBottom: 32,
          marginBottom: 22,
        }}
      >
        <div style={{ maxWidth: 340 }}>
          <div style={{ marginBottom: 12 }}>
            <Logo variant="footer" />
          </div>
          <p style={{ fontSize: 13.5, color: '#8b96ad', lineHeight: 1.6, margin: 0 }}>
            Soluções práticas para o seu dia a dia. Você pede, eu resolvo.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Contato</div>
          <div style={{ fontSize: 13.5, color: '#8b96ad', lineHeight: 2 }}>
            <div>
              <a href={waLink} target="_blank" rel="noopener" style={{ color: '#8b96ad', textDecoration: 'none' }}>
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </div>
            <div>Atendemos condomínios e residências</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Navegação</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: '#8b96ad' }}>
            <a href="#servicos" style={{ color: '#8b96ad', textDecoration: 'none' }}>Serviços</a>
            <a href="#sobre" style={{ color: '#8b96ad', textDecoration: 'none' }}>Sobre</a>
            <a href="#depoimentos" style={{ color: '#8b96ad', textDecoration: 'none' }}>Depoimentos</a>
            <a href="#preco" style={{ color: '#8b96ad', textDecoration: 'none' }}>Preço</a>
            <a href="#agendamento" style={{ color: '#8b96ad', textDecoration: 'none' }}>Agendar</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 12, color: '#5f6a82' }}>
        © 2026 Rangel Serviços Residenciais. Todos os direitos reservados.
      </div>
    </footer>
  );
};
