import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/requireAdmin';

export async function GET(request: NextRequest) {
  const usuario = requireAdmin(request);
  if (!usuario) {
    return NextResponse.json({ sucesso: false, erro: 'Nao autenticado' }, { status: 401 });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db.collection('agendamentos').orderBy('dataAgendamento', 'desc').get();
    const agendamentos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ sucesso: true, agendamentos });
  } catch (erro) {
    console.error('Erro ao listar agendamentos:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao listar agendamentos' }, { status: 500 });
  }
}
