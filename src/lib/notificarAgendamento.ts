import { Resend } from 'resend';

const TIPO_SERVICO_LABEL: Record<string, string> = {
  eletrico: 'Conserto Elétrico',
  hidraulico: 'Conserto Hidráulico',
  pintura: 'Pintura',
  montagem: 'Montagem de Móveis',
};

interface AgendamentoParaEmail {
  cliente: { nome: string; telefone: string; endereco: string };
  tipoServico: string;
  descricao: string;
  dataAgendamento: string;
  horaInicio: string;
}

export async function enviarEmailNovoAgendamento(agendamento: AgendamentoParaEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.NOTIFICACAO_EMAIL_DESTINO;

  if (!apiKey || !destino) return;

  const resend = new Resend(apiKey);
  const servico = TIPO_SERVICO_LABEL[agendamento.tipoServico] || agendamento.tipoServico;

  await resend.emails.send({
    from: process.env.NOTIFICACAO_EMAIL_ORIGEM || 'onboarding@resend.dev',
    to: destino,
    subject: `Novo agendamento: ${agendamento.cliente.nome} - ${agendamento.dataAgendamento}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px">
        <h2 style="color:#0b1f3a">Novo agendamento recebido</h2>
        <p><strong>Cliente:</strong> ${agendamento.cliente.nome}</p>
        <p><strong>Telefone:</strong> ${agendamento.cliente.telefone}</p>
        <p><strong>Endereço:</strong> ${agendamento.cliente.endereco}</p>
        <p><strong>Serviço:</strong> ${servico}</p>
        <p><strong>Descrição:</strong> ${agendamento.descricao}</p>
        <p><strong>Data:</strong> ${agendamento.dataAgendamento} às ${agendamento.horaInicio}</p>
        <p style="margin-top:24px">
          <a href="https://rangelmaridodealuguel.vercel.app/admin/agendamentos" style="background:#f0a825;color:#1a1200;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">
            Ver no painel
          </a>
        </p>
      </div>
    `,
  });
}
