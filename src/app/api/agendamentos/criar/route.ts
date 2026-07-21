import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { enviarEmailNovoAgendamento } from '@/lib/notificarAgendamento';
import {
  AgendamentoFormData,
  StatusAgendamento,
  StatusPagamento,
} from '@/types';

const STATUS_QUE_OCUPAM = [StatusAgendamento.PENDENTE, StatusAgendamento.APROVADO];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AgendamentoFormData;

    if (!body.nome || body.nome.length < 3) {
      return NextResponse.json(
        { sucesso: false, erro: 'Nome invalido (min 3 caracteres)' },
        { status: 400 }
      );
    }

    if (!/^\d{11}$/.test(body.telefone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { sucesso: false, erro: 'Telefone invalido (11 digitos)' },
        { status: 400 }
      );
    }

    if (!body.endereco || body.endereco.length < 10) {
      return NextResponse.json(
        { sucesso: false, erro: 'Endereco incompleto' },
        { status: 400 }
      );
    }

    if (!body.dataAgendamento || !body.horaInicio) {
      return NextResponse.json(
        { sucesso: false, erro: 'Data e horario sao obrigatorios' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const agendamentosRef = db.collection('agendamentos');

    const resultado = await db.runTransaction(async (t) => {
      const conflito = await t.get(
        agendamentosRef
          .where('dataAgendamento', '==', body.dataAgendamento)
          .where('horaInicio', '==', body.horaInicio)
          .where('status', 'in', STATUS_QUE_OCUPAM)
      );

      if (!conflito.empty) {
        return null;
      }

      const agora = new Date().toISOString();
      const novoRef = agendamentosRef.doc();

      const agendamento = {
        cliente: {
          nome: body.nome,
          telefone: body.telefone.replace(/\D/g, ''),
          endereco: body.endereco,
        },
        tipoServico: body.tipoServico,
        descricao: body.descricao,
        dataAgendamento: body.dataAgendamento,
        horaInicio: body.horaInicio,
        horaFim: body.horaInicio,
        duracao: 60,
        ...(body.fotoProblema ? { fotoProblema: body.fotoProblema } : {}),
        status: StatusAgendamento.PENDENTE,
        statusPagamento: StatusPagamento.NAO_PAGO,
        origem: 'website' as const,
        criadoEm: agora,
        atualizadoEm: agora,
      };

      t.set(novoRef, agendamento);
      return { id: novoRef.id, ...agendamento };
    });

    if (!resultado) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: 'Esse horario acabou de ser reservado por outra pessoa. Escolha outro horario.',
        },
        { status: 409 }
      );
    }

    const mensagemWhatsApp = `Ola ${body.nome}! Seu agendamento foi recebido para ${body.dataAgendamento} as ${body.horaInicio} - ${body.tipoServico}. Voce recebera confirmacao em breve. Qualquer duvida, e comigo!`;

    enviarEmailNovoAgendamento(resultado).catch((erro) =>
      console.error('Erro ao enviar email de notificacao:', erro)
    );

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Agendamento recebido com sucesso!',
      agendamento: resultado,
      mensagemWhatsApp,
    });
  } catch (erro) {
    console.error('Erro ao criar agendamento:', erro);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao criar agendamento' },
      { status: 500 }
    );
  }
}
