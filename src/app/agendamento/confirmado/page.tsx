'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Landing/Header';
import { Footer } from '@/components/Landing/Footer';
import { ConfirmacaoAgendamento } from '@/components/Landing/ConfirmacaoAgendamento';
import { ACCENT } from '@/components/Landing/constants';

interface DadosConfirmacao {
  clienteNome: string;
  tipoServico: string;
  dataAgendamento: string;
  horaInicio: string;
  status: string;
  mensagemWhatsApp: string;
}

function ConteudoConfirmacao() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [dados, setDados] = useState<DadosConfirmacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) {
      setErro('Link invalido.');
      setCarregando(false);
      return;
    }

    fetch(`/api/agendamentos/confirmacao/${id}`)
      .then((res) => res.json())
      .then((resultado) => {
        if (resultado.sucesso) {
          setDados(resultado.agendamento);
        } else {
          setErro('Nao encontramos esse agendamento.');
        }
      })
      .catch(() => setErro('Erro ao carregar o agendamento.'))
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <main style={{ padding: '64px 24px', background: '#0b1f3a', minHeight: '70vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '0 0 36px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: ACCENT, textTransform: 'uppercase', marginBottom: 10 }}>
            Agendamento
          </div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.6vw,38px)', margin: 0, color: '#fff' }}>
            Seu pedido
          </h1>
        </div>

        {carregando && <p style={{ textAlign: 'center', color: '#aeb8cb' }}>Carregando...</p>}

        {!carregando && erro && (
          <div style={{ textAlign: 'center', color: '#ffb3b3' }}>
            <p style={{ marginBottom: 16 }}>{erro}</p>
            <Link href="/#agendamento" style={{ color: ACCENT }}>
              Voltar e agendar novamente
            </Link>
          </div>
        )}

        {!carregando && dados && (
          <>
            <ConfirmacaoAgendamento mensagemWhatsApp={dados.mensagemWhatsApp} status={dados.status} />
            <p style={{ textAlign: 'center', marginTop: 24 }}>
              <Link href="/" style={{ color: '#aeb8cb', fontSize: 14 }}>
                ← Voltar para o site
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default function ConfirmadoPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />
      <Suspense fallback={<div style={{ padding: 64, textAlign: 'center' }}>Carregando...</div>}>
        <ConteudoConfirmacao />
      </Suspense>
      <Footer />
    </div>
  );
}
