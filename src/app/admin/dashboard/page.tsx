'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Agendamento, Recibo, UsuarioAdmin } from '@/types';

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const TIPO_SERVICO_LABEL: Record<string, string> = {
  eletrico: 'Elétrico',
  hidraulico: 'Hidráulico',
  pintura: 'Pintura',
  montagem: 'Montagem',
};

const STATUS_COR: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  aprovado: 'bg-green-100 text-green-700',
  rejeitado: 'bg-red-100 text-red-700',
  concluido: 'bg-blue-100 text-blue-700',
  nao_compareceu: 'bg-gray-200 text-gray-700',
};

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const response = await fetch('/api/auth/usuario-atual', {
          credentials: 'include',
        });

        if (response.ok) {
          const { usuario } = await response.json();
          setUsuario(usuario);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setCarregando(false);
      }
    };

    verificarAutenticacao();
  }, [router]);

  useEffect(() => {
    fetch('/api/recibos', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((resultado) => {
        if (resultado?.sucesso) setRecibos(resultado.recibos);
      })
      .catch(() => {});

    fetch('/api/agendamentos', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((resultado) => {
        if (resultado?.sucesso) setAgendamentos(resultado.agendamentos);
      })
      .catch(() => {});
  }, []);

  const mesAtual = new Date().toISOString().slice(0, 7);
  const hoje = new Date().toISOString().slice(0, 10);

  const faturamentoMensal = recibos
    .filter((r) => r.status === 'pago' && r.dataEmissao.startsWith(mesAtual))
    .reduce((soma, r) => soma + r.total, 0);
  const faturamentoTotal = recibos
    .filter((r) => r.status === 'pago')
    .reduce((soma, r) => soma + r.total, 0);
  const recibosPendentes = recibos.filter((r) => r.status !== 'pago').length;

  const agendamentosHoje = agendamentos.filter((a) => a.dataAgendamento === hoje).length;
  const agendamentosRecentes = [...agendamentos]
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))
    .slice(0, 5);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/admin/login');
  };

  if (carregando) return <div className="p-4">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div>
          <span className="mr-4">Ola, {usuario?.nome}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Agendamentos Hoje</h2>
            <p className="text-3xl font-bold">{agendamentosHoje}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Faturamento Mensal</h2>
            <p className="text-3xl font-bold">{formatarMoeda(faturamentoMensal)}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Faturamento Total</h2>
            <p className="text-3xl font-bold">{formatarMoeda(faturamentoTotal)}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Recibos Pendentes</h2>
            <p className="text-3xl font-bold">{recibosPendentes}</p>
          </div>
        </div>

        <div className="bg-white mt-6 p-6 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Agendamentos Recentes</h2>
            <Link href="/admin/agendamentos" className="text-blue-600 font-semibold hover:underline text-sm">
              Ver todos →
            </Link>
          </div>
          {agendamentosRecentes.length === 0 ? (
            <p className="text-gray-600">Nenhum agendamento ainda</p>
          ) : (
            <div className="flex flex-col gap-3">
              {agendamentosRecentes.map((a) => (
                <div key={a.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0 flex-wrap gap-2">
                  <div>
                    <div className="font-semibold">{a.cliente.nome}</div>
                    <div className="text-gray-500 text-sm">
                      {TIPO_SERVICO_LABEL[a.tipoServico] || a.tipoServico} — {a.dataAgendamento} às {a.horaInicio}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COR[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white mt-6 p-6 rounded shadow flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Agendamentos</h2>
            <p className="text-gray-600">Veja e gerencie os pedidos de agendamento</p>
          </div>
          <Link
            href="/admin/agendamentos"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
          >
            Abrir Agendamentos
          </Link>
        </div>

        <div className="bg-white mt-6 p-6 rounded shadow flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Recibos</h2>
            <p className="text-gray-600">Gere e consulte recibos de pagamento em PDF</p>
          </div>
          <Link
            href="/admin/recibos"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
          >
            Abrir Recibos
          </Link>
        </div>
      </div>
    </main>
  );
}
