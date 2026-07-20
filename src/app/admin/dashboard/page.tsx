'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Recibo, UsuarioAdmin } from '@/types';

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioAdmin | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [recibos, setRecibos] = useState<Recibo[]>([]);

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
  }, []);

  const mesAtual = new Date().toISOString().slice(0, 7);
  const faturamentoMensal = recibos
    .filter((r) => r.status === 'pago' && r.dataEmissao.startsWith(mesAtual))
    .reduce((soma, r) => soma + r.total, 0);
  const faturamentoTotal = recibos
    .filter((r) => r.status === 'pago')
    .reduce((soma, r) => soma + r.total, 0);
  const pendentes = recibos.filter((r) => r.status !== 'pago').length;

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
            <p className="text-3xl font-bold">0</p>
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
            <p className="text-3xl font-bold">{pendentes}</p>
          </div>
        </div>

        <div className="bg-white mt-6 p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Agendamentos Recentes</h2>
          <p className="text-gray-600">Nenhum agendamento ainda</p>
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
