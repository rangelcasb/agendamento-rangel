import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getAdminDb();
    const doc = await db.collection('agendamentos').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ sucesso: false, erro: 'Agendamento nao encontrado' }, { status: 404 });
    }

    const dado = doc.data()!;

    return NextResponse.json({
      sucesso: true,
      agendamento: {
        clienteNome: dado.cliente?.nome,
        tipoServico: dado.tipoServico,
        dataAgendamento: dado.dataAgendamento,
        horaInicio: dado.horaInicio,
        status: dado.status,
        mensagemWhatsApp: dado.mensagemWhatsApp,
      },
    });
  } catch (erro) {
    console.error('Erro ao buscar confirmacao:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar agendamento' }, { status: 500 });
  }
}
