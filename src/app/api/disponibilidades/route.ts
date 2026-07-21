import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { DiaComSlots, StatusAgendamento } from '@/types';

const STATUS_QUE_OCUPAM = [StatusAgendamento.PENDENTE, StatusAgendamento.APROVADO];

export async function GET(request: NextRequest) {
  try {
    const mes = request.nextUrl.searchParams.get('mes') || new Date().toISOString().slice(0, 7);
    const ocupados = await buscarHorariosOcupados(mes);
    const slots = gerarSlotsDoMes(mes, ocupados);

    return NextResponse.json({
      sucesso: true,
      disponibilidades: slots,
      total: slots.length,
    });
  } catch (erro) {
    console.error('Erro ao buscar disponibilidades:', erro);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao buscar disponibilidades' },
      { status: 500 }
    );
  }
}

async function buscarHorariosOcupados(mes: string): Promise<Set<string>> {
  const db = getAdminDb();
  const snapshot = await db
    .collection('agendamentos')
    .where('dataAgendamento', '>=', `${mes}-01`)
    .where('dataAgendamento', '<=', `${mes}-31`)
    .get();

  const ocupados = new Set<string>();
  snapshot.forEach((doc) => {
    const dado = doc.data();
    if (STATUS_QUE_OCUPAM.includes(dado.status)) {
      ocupados.add(`${dado.dataAgendamento}|${dado.horaInicio}`);
    }
  });
  return ocupados;
}

const HORARIOS_PADRAO = [
  { hora: '06:00', horaFim: '07:00' },
  { hora: '07:00', horaFim: '08:00' },
  { hora: '16:00', horaFim: '17:00' },
  { hora: '17:00', horaFim: '18:00' },
  { hora: '18:00', horaFim: '19:00' },
];

function gerarSlotsDoMes(mes: string, ocupados: Set<string>): DiaComSlots[] {
  const [ano, mesNumero] = mes.split('-').map(Number);
  const diasNoMes = new Date(ano, mesNumero, 0).getDate();
  const nomesDiaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const horaAtual = agora.getHours() * 60 + agora.getMinutes();

  const dias: DiaComSlots[] = [];

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(ano, mesNumero - 1, dia);
    const diaSemana = nomesDiaSemana[data.getDay()];

    if (diaSemana === 'dom' || diaSemana === 'sab') continue;
    if (data < hoje) continue;

    const ehHoje = data.getTime() === hoje.getTime();
    const dataStr = data.toISOString().slice(0, 10);

    const slots = HORARIOS_PADRAO.filter((h) => {
      if (!ehHoje) return true;
      const [horaSlot, minutoSlot] = h.hora.split(':').map(Number);
      return horaSlot * 60 + minutoSlot > horaAtual;
    }).map((h) => {
      const ocupado = ocupados.has(`${dataStr}|${h.hora}`);
      return {
        hora: h.hora,
        horaFim: h.horaFim,
        disponivel: !ocupado,
        ocupado,
      };
    });

    if (!slots.length) continue;

    dias.push({
      data: dataStr,
      diaSemana,
      slots,
    });
  }

  return dias;
}
