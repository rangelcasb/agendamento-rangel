import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/requireAdmin';
import { StatusAgendamento } from '@/types';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const usuario = requireAdmin(request);
  if (!usuario) {
    return NextResponse.json({ sucesso: false, erro: 'Nao autenticado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as { status: StatusAgendamento };

    if (!Object.values(StatusAgendamento).includes(body.status)) {
      return NextResponse.json({ sucesso: false, erro: 'Status invalido' }, { status: 400 });
    }

    const db = getAdminDb();
    const docRef = db.collection('agendamentos').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ sucesso: false, erro: 'Agendamento nao encontrado' }, { status: 404 });
    }

    await docRef.update({ status: body.status, atualizadoEm: new Date().toISOString() });

    return NextResponse.json({ sucesso: true, agendamento: { id, ...doc.data(), status: body.status } });
  } catch (erro) {
    console.error('Erro ao atualizar agendamento:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}
