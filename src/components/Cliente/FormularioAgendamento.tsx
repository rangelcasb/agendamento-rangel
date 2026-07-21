'use client';

import React, { useState } from 'react';
import { AgendamentoFormData, TipoServico } from '@/types';
import { TAMANHO_MAXIMO_FOTO, uploadFotoProblema } from '@/lib/uploadFotoProblema';

interface FormularioAgendamentoProps {
  dataAgendamento: string;
  horaInicio: string;
  onSubmit: (dados: AgendamentoFormData) => Promise<void>;
  carregando?: boolean;
}

export const FormularioAgendamento: React.FC<FormularioAgendamentoProps> = ({
  dataAgendamento,
  horaInicio,
  onSubmit,
  carregando = false,
}) => {
  const [formData, setFormData] = useState<AgendamentoFormData>({
    nome: '',
    telefone: '',
    endereco: '',
    tipoServico: TipoServico.ELETRICO,
    descricao: '',
    dataAgendamento,
    horaInicio,
  });

  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [erroFoto, setErroFoto] = useState('');
  const [enviandoFoto, setEnviandoFoto] = useState(false);

  const handleSelecionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    setErroFoto('');

    if (!arquivo) {
      setFotoArquivo(null);
      setFotoPreview(null);
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      setErroFoto('Envie um arquivo de imagem (jpg, png, etc.)');
      return;
    }

    if (arquivo.size > TAMANHO_MAXIMO_FOTO) {
      setErroFoto('A imagem precisa ter no máximo 5MB.');
      return;
    }

    setFotoArquivo(arquivo);
    setFotoPreview(URL.createObjectURL(arquivo));
  };

  const removerFoto = () => {
    setFotoArquivo(null);
    setFotoPreview(null);
    setErroFoto('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroFoto('');

    let fotoProblema = formData.fotoProblema;

    if (fotoArquivo) {
      setEnviandoFoto(true);
      try {
        fotoProblema = await uploadFotoProblema(fotoArquivo);
      } catch {
        setErroFoto('Erro ao enviar a foto. Tente novamente ou continue sem foto.');
        setEnviandoFoto(false);
        return;
      }
      setEnviandoFoto(false);
    }

    await onSubmit({ ...formData, fotoProblema });
  };

  const enviando = carregando || enviandoFoto;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Seus dados</h2>
      <p className="text-sm text-gray-600 mb-4">
        Agendamento para {dataAgendamento} as {horaInicio}
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nome *</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Joao Silva"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Telefone *</label>
        <input
          type="tel"
          value={formData.telefone}
          onChange={(e) =>
            setFormData({ ...formData, telefone: e.target.value.replace(/\D/g, '') })
          }
          placeholder="11987654321"
          className="w-full p-2 border rounded"
          maxLength={11}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Endereco *</label>
        <input
          type="text"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          placeholder="Apto 401, Bloco A"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Tipo de Servico *</label>
        <select
          value={formData.tipoServico}
          onChange={(e) =>
            setFormData({ ...formData, tipoServico: e.target.value as TipoServico })
          }
          className="w-full p-2 border rounded"
        >
          <option value={TipoServico.ELETRICO}>Conserto Eletrico</option>
          <option value={TipoServico.HIDRAULICO}>Conserto Hidraulico</option>
          <option value={TipoServico.PINTURA}>Pintura</option>
          <option value={TipoServico.MONTAGEM}>Montagem de Moveis</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Descricao do Problema *</label>
        <textarea
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          placeholder="Descreva o problema..."
          rows={4}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Foto do problema (opcional)</label>
        {fotoPreview ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fotoPreview} alt="Prévia da foto" className="w-20 h-20 object-cover rounded border" />
            <button
              type="button"
              onClick={removerFoto}
              className="text-sm text-red-600 hover:underline"
            >
              Remover foto
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleSelecionarFoto}
            className="w-full p-2 border rounded text-sm"
          />
        )}
        <p className="text-xs text-gray-500 mt-1">Ajuda a entender melhor o problema. Máx. 5MB.</p>
        {erroFoto && <div className="text-xs text-red-600 mt-1">{erroFoto}</div>}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-blue-600 text-white p-2 rounded font-bold transition-transform duration-150 hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
      >
        {enviandoFoto ? 'Enviando foto...' : carregando ? 'Agendando...' : 'Confirmar Agendamento'}
      </button>
    </form>
  );
};
