'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ReciboForm } from '@/components/Admin/ReciboForm';
import { Recibo, ReciboFormData } from '@/types';
import { baixarReciboPdf } from '@/lib/baixarReciboPdf';

export default function EditarReciboPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recibo, setRecibo] = useState<Recibo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(`/api/recibos/${id}`, { credentials: 'include' });
        if (!response.ok) {
          if (response.status === 401) router.push('/admin/login');
          else setErro('Recibo não encontrado');
          return;
        }
        const resultado = await response.json();
        if (resultado.sucesso) setRecibo(resultado.recibo);
      } catch {
        setErro('Erro ao carregar recibo');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [id, router]);

  const handleSalvar = async (dados: ReciboFormData) => {
    const response = await fetch(`/api/recibos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!resultado.sucesso) {
      throw new Error(resultado.erro || 'Erro ao atualizar recibo');
    }

    await baixarReciboPdf(resultado.recibo);
    router.push('/admin/recibos');
  };

  if (carregando) return <div className="p-4">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Editar Recibo {recibo && `Nº ${String(recibo.numero).padStart(4, '0')}`}
        </h1>
        <button
          onClick={() => router.push('/admin/recibos')}
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Voltar
        </button>
      </nav>

      <div className="container mx-auto p-4 max-w-2xl">
        {erro && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{erro}</div>}
        {recibo && (
          <ReciboForm
            valoresIniciais={{
              cliente: recibo.cliente,
              dataEmissao: recibo.dataEmissao,
              itens: recibo.itens,
              formaPagamento: recibo.formaPagamento,
              status: recibo.status,
            }}
            onSalvar={handleSalvar}
            textoBotao="Salvar alterações e baixar PDF"
            textoBotaoSalvando="Salvando..."
          />
        )}
      </div>
    </main>
  );
}
