'use client';

import React, { useState } from 'react';
import { CalendarioMes } from '@/components/Cliente/CalendarioMes';
import { FormularioAgendamento } from '@/components/Cliente/FormularioAgendamento';
import { AgendamentoFormData, SlotHorario } from '@/types';
import { ACCENT, WHATSAPP_DISPLAY, buildWhatsAppLink } from './constants';

type Etapa = 'calendario' | 'formulario' | 'confirmacao';

export const AgendamentoSection: React.FC = () => {
  const [etapa, setEtapa] = useState<Etapa>('calendario');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [slotSelecionado, setSlotSelecionado] = useState<SlotHorario | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemWhatsApp, setMensagemWhatsApp] = useState('');
  const [erro, setErro] = useState('');

  const handleSelecionarSlot = (data: string, slot: SlotHorario) => {
    setDataSelecionada(data);
    setSlotSelecionado(slot);
    setEtapa('formulario');
  };

  const handleSubmitAgendamento = async (dados: AgendamentoFormData) => {
    setCarregando(true);
    setErro('');

    try {
      const response = await fetch('/api/agendamentos/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (resultado.sucesso) {
        setMensagemWhatsApp(resultado.mensagemWhatsApp);
        setEtapa('confirmacao');
      } else {
        setErro(resultado.erro || 'Erro ao agendar');
      }
    } catch {
      setErro('Erro de conexao');
    } finally {
      setCarregando(false);
    }
  };

  const waLink = buildWhatsAppLink(mensagemWhatsApp || 'Olá! Vi a página e quero agendar um serviço.');

  return (
    <section id="agendamento" style={{ padding: '88px 24px', background: '#0b1f3a', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '0 0 36px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: ACCENT, textTransform: 'uppercase', marginBottom: 10 }}>
            Agendamento
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.6vw,38px)', margin: '0 0 12px', color: '#fff' }}>
            Vamos agendar?
          </h2>
          <p style={{ fontSize: 15.5, color: '#aeb8cb', maxWidth: 520, margin: '0 auto' }}>
            Escolha um horário disponível e me conte o que precisa — confirmo rapidinho pelo
            WhatsApp.
          </p>
        </div>

        {etapa === 'confirmacao' ? (
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
        ) : (
          <>
            {erro && (
              <div style={{ background: '#ff8a8a22', color: '#ffb3b3', padding: '10px 14px', borderRadius: 8, marginBottom: 18, fontSize: 14, maxWidth: 640, margin: '0 auto 18px' }}>
                {erro}
              </div>
            )}
            {etapa === 'calendario' && <CalendarioMes onSelecionarSlot={handleSelecionarSlot} />}
            {etapa === 'formulario' && slotSelecionado && (
              <FormularioAgendamento
                dataAgendamento={dataSelecionada}
                horaInicio={slotSelecionado.hora}
                onSubmit={handleSubmitAgendamento}
                carregando={carregando}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
