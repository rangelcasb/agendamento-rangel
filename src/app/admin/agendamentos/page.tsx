'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Agendamento, StatusAgendamento } from '@/types';

const TIPO_SERVICO_LABEL: Record<string, string> = {
  eletrico: 'Elétrico',
  hidraulico: 'Hidráulico',
  pintura: 'Pintura',
  montagem: 'Montagem',
};

const STATUS_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  aprovado: 'Aprovado',
  rejeitado: 'Rejeitado',
  concluido: 'Concluído',
  nao_compareceu: 'Não compareceu',
};

const STATUS_COR: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  aprovado: 'bg-green-100 text-green-700',
  rejeitado: 'bg-red-100 text-red-700',
  concluido: 'bg-blue-100 text-blue-700',
  nao_compareceu: 'bg-gray-200 text-gray-700',
};

export default function AgendamentosPage() {
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch('/api/agendamentos', { credentials: 'include' });
        if (!response.ok) {
          router.push('/admin/login');
          return;
        }
        const resultado = await response.json();
        if (resultado.sucesso) setAgendamentos(resultado.agendamentos);
      } catch {
        router.push('/admin/login');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [router]);

  const handleMudarStatus = async (agendamento: Agendamento, novoStatus: StatusAgendamento) => {
    setAtualizandoId(agendamento.id);
    try {
      const response = await fetch(`/api/agendamentos/${agendamento.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: novoStatus }),
      });
      const resultado = await response.json();
      if (resultado.sucesso) {
        setAgendamentos((prev) =>
          prev.map((a) => (a.id === agendamento.id ? { ...a, status: novoStatus } : a))
        );
      }
    } finally {
      setAtualizandoId(null);
    }
  };

  const filtrados = agendamentos.filter((a) => {
    const passaBusca = a.cliente.nome.toLowerCase().includes(busca.trim().toLowerCase());
    const passaStatus = filtroStatus === 'todos' || a.status === filtroStatus;
    return passaBusca && passaStatus;
  });

  if (carregando) return <div className="p-4">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <Link href="/admin/dashboard" className="text-blue-600 font-semibold hover:underline">
          ← Dashboard
        </Link>
      </nav>

      <div className="container mx-auto p-4">
        <div className="mb-4 flex gap-3 flex-wrap">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome do cliente..."
            className="p-2 border rounded bg-white flex-1 min-w-[220px]"
          />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="todos">Todos os status</option>
            {Object.entries(STATUS_LABEL).map(([valor, label]) => (
              <option key={valor} value={valor}>{label}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          {filtrados.length === 0 ? (
            <p className="p-6 text-gray-600">
              {agendamentos.length === 0 ? 'Nenhum agendamento ainda.' : 'Nenhum agendamento encontrado.'}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-50">
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Serviço</th>
                  <th className="p-3">Data/Hora</th>
                  <th className="p-3">Contato</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Mudar status</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 align-top">
                    <td className="p-3">
                      <div className="font-semibold">{a.cliente.nome}</div>
                      <div className="text-gray-500 text-xs">{a.cliente.endereco}</div>
                    </td>
                    <td className="p-3">
                      <div>{TIPO_SERVICO_LABEL[a.tipoServico] || a.tipoServico}</div>
                      <div className="text-gray-500 text-xs max-w-[220px]">{a.descricao}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {a.dataAgendamento} <br /> {a.horaInicio}
                    </td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/55${a.cliente.telefone}`}
                        target="_blank"
                        rel="noopener"
                        className="text-green-600 hover:underline"
                      >
                        {a.cliente.telefone}
                      </a>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COR[a.status]}`}>
                        {STATUS_LABEL[a.status]}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={a.status}
                        disabled={atualizandoId === a.id}
                        onChange={(e) => handleMudarStatus(a, e.target.value as StatusAgendamento)}
                        className="p-1.5 border rounded text-xs disabled:opacity-50"
                      >
                        {Object.entries(STATUS_LABEL).map(([valor, label]) => (
                          <option key={valor} value={valor}>{label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
