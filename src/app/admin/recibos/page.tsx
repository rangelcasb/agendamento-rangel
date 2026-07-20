'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Recibo } from '@/types';
import { baixarReciboPdf } from '@/lib/baixarReciboPdf';

export default function RecibosPage() {
  const router = useRouter();
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [baixandoId, setBaixandoId] = useState<string | null>(null);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch('/api/recibos', { credentials: 'include' });
        if (!response.ok) {
          router.push('/admin/login');
          return;
        }
        const resultado = await response.json();
        if (resultado.sucesso) setRecibos(resultado.recibos);
      } catch {
        router.push('/admin/login');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [router]);

  const handleBaixar = async (recibo: Recibo) => {
    setBaixandoId(recibo.id);
    try {
      await baixarReciboPdf(recibo);
    } finally {
      setBaixandoId(null);
    }
  };

  const handleExcluir = async (recibo: Recibo) => {
    const confirmado = window.confirm(
      `Excluir o recibo Nº ${String(recibo.numero).padStart(4, '0')} de ${recibo.cliente.nome}? Essa ação não pode ser desfeita.`
    );
    if (!confirmado) return;

    setExcluindoId(recibo.id);
    try {
      const response = await fetch(`/api/recibos/${recibo.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const resultado = await response.json();
      if (resultado.sucesso) {
        setRecibos((prev) => prev.filter((r) => r.id !== recibo.id));
      }
    } finally {
      setExcluindoId(null);
    }
  };

  const recibosFiltrados = recibos.filter((r) =>
    r.cliente.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  if (carregando) return <div className="p-4">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Recibos</h1>
        <div className="flex gap-4 items-center">
          <Link href="/admin/dashboard" className="text-blue-600 font-semibold hover:underline">
            ← Dashboard
          </Link>
          <Link
            href="/admin/recibos/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
          >
            + Novo recibo
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome do cliente..."
            className="w-full max-w-sm p-2 border rounded bg-white"
          />
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          {recibosFiltrados.length === 0 ? (
            <p className="p-6 text-gray-600">
              {recibos.length === 0 ? 'Nenhum recibo gerado ainda.' : 'Nenhum recibo encontrado para essa busca.'}
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-50">
                  <th className="p-3">Nº</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {recibosFiltrados.map((recibo) => (
                  <tr key={recibo.id} className="border-b last:border-0">
                    <td className="p-3 font-mono">{String(recibo.numero).padStart(4, '0')}</td>
                    <td className="p-3">{recibo.cliente.nome}</td>
                    <td className="p-3">{recibo.dataEmissao}</td>
                    <td className="p-3">
                      {recibo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          recibo.status === 'pago'
                            ? 'text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-bold'
                            : 'text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-bold'
                        }
                      >
                        {recibo.status === 'pago' ? 'Pago' : 'Não pago'}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => handleBaixar(recibo)}
                        disabled={baixandoId === recibo.id}
                        className="text-blue-600 font-semibold hover:underline disabled:opacity-50 mr-4"
                      >
                        {baixandoId === recibo.id ? 'Gerando...' : 'Baixar PDF'}
                      </button>
                      <Link
                        href={`/admin/recibos/${recibo.id}/editar`}
                        className="text-gray-700 font-semibold hover:underline mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleExcluir(recibo)}
                        disabled={excluindoId === recibo.id}
                        className="text-red-600 font-semibold hover:underline disabled:opacity-50"
                      >
                        {excluindoId === recibo.id ? 'Excluindo...' : 'Excluir'}
                      </button>
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
