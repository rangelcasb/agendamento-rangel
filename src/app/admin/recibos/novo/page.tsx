'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReciboForm } from '@/components/Admin/ReciboForm';
import { ReciboFormData } from '@/types';
import { baixarReciboPdf } from '@/lib/baixarReciboPdf';

export default function NovoReciboPage() {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    fetch('/api/auth/usuario-atual', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) router.push('/admin/login');
        else setVerificando(false);
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  const handleSalvar = async (dados: ReciboFormData) => {
    const response = await fetch('/api/recibos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!resultado.sucesso) {
      throw new Error(resultado.erro || 'Erro ao gerar recibo');
    }

    await baixarReciboPdf(resultado.recibo);
    router.push('/admin/recibos');
  };

  if (verificando) return <div className="p-4">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Novo Recibo</h1>
        <button
          onClick={() => router.push('/admin/recibos')}
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Voltar
        </button>
      </nav>

      <div className="container mx-auto p-4 max-w-2xl">
        <ReciboForm
          onSalvar={handleSalvar}
          textoBotao="Gerar recibo em PDF"
          textoBotaoSalvando="Gerando..."
        />
      </div>
    </main>
  );
}
