'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarioMes } from '@/components/Cliente/CalendarioMes';
import { FormularioAgendamento } from '@/components/Cliente/FormularioAgendamento';
import { AgendamentoFormData, SlotHorario } from '@/types';
import { ACCENT } from './constants';

type Etapa = 'calendario' | 'formulario';

export const AgendamentoSection: React.FC = () => {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>('calendario');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [slotSelecionado, setSlotSelecionado] = useState<SlotHorario | null>(null);
  const [carregando, setCarregando] = useState(false);
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
        router.push(`/agendamento/confirmado?id=${resultado.agendamento.id}`);
      } else {
        setErro(resultado.erro || 'Erro ao agendar');
        setCarregando(false);
      }
    } catch {
      setErro('Erro de conexao');
      setCarregando(false);
    }
  };

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
      </div>
    </section>
  );
};
