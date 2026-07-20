import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/requireAdmin';
import { ReciboFormData } from '@/types';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const usuario = requireAdmin(request);
  if (!usuario) {
    return NextResponse.json({ sucesso: false, erro: 'Nao autenticado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getAdminDb();
    const doc = await db.collection('recibos').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ sucesso: false, erro: 'Recibo nao encontrado' }, { status: 404 });
    }

    return NextResponse.json({ sucesso: true, recibo: { id: doc.id, ...doc.data() } });
  } catch (erro) {
    console.error('Erro ao buscar recibo:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar recibo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const usuario = requireAdmin(request);
  if (!usuario) {
    return NextResponse.json({ sucesso: false, erro: 'Nao autenticado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as ReciboFormData;

    if (!body.cliente?.nome || !body.itens?.length) {
      return NextResponse.json(
        { sucesso: false, erro: 'Cliente e ao menos um item sao obrigatorios' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const docRef = db.collection('recibos').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ sucesso: false, erro: 'Recibo nao encontrado' }, { status: 404 });
    }

    const total = body.itens.reduce((soma, item) => soma + item.valor, 0);

    const atualizacao = {
      cliente: body.cliente,
      dataEmissao: body.dataEmissao,
      itens: body.itens,
      total,
      formaPagamento: body.formaPagamento,
      status: body.status,
    };

    await docRef.update(atualizacao);

    return NextResponse.json({ sucesso: true, recibo: { id, ...doc.data(), ...atualizacao } });
  } catch (erro) {
    console.error('Erro ao atualizar recibo:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao atualizar recibo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const usuario = requireAdmin(request);
  if (!usuario) {
    return NextResponse.json({ sucesso: false, erro: 'Nao autenticado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getAdminDb();
    await db.collection('recibos').doc(id).delete();

    return NextResponse.json({ sucesso: true });
  } catch (erro) {
    console.error('Erro ao excluir recibo:', erro);
    return NextResponse.json({ sucesso: false, erro: 'Erro ao excluir recibo' }, { status: 500 });
  }
}
