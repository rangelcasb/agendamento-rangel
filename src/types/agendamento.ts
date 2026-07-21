export enum TipoServico {
  ELETRICO = 'eletrico',
  HIDRAULICO = 'hidraulico',
  PINTURA = 'pintura',
  MONTAGEM = 'montagem',
}

export enum StatusAgendamento {
  PENDENTE = 'pendente',
  APROVADO = 'aprovado',
  REJEITADO = 'rejeitado',
  CONCLUIDO = 'concluido',
  NAO_COMPARECEU = 'nao_compareceu',
}

export enum StatusPagamento {
  NAO_PAGO = 'nao_pago',
  PAGO = 'pago',
}

export enum FormaPagamento {
  PIX = 'pix',
  NFC = 'nfc',
  DINHEIRO = 'dinheiro',
  DEBITO = 'debito',
  CREDITO = 'credito',
}

export interface Cliente {
  nome: string;
  telefone: string;
  endereco: string;
  referencia?: string;
}

export interface Foto {
  url: string;
  uploadEm: string;
  tamanho: number;
}

export interface SlotHorario {
  hora: string;
  horaFim: string;
  disponivel: boolean;
  ocupado: boolean;
}

export interface DiaComSlots {
  data: string;
  diaSemana: string;
  slots: SlotHorario[];
}

export interface Agendamento {
  id: string;
  cliente: Cliente;
  tipoServico: TipoServico;
  descricao: string;
  dataAgendamento: string;
  horaInicio: string;
  horaFim: string;
  duracao: number;
  fotoProblema?: Foto;
  status: StatusAgendamento;
  motivoRejeicao?: string;
  statusPagamento: StatusPagamento;
  valorCobrado?: number;
  formaPagamento?: FormaPagamento;
  dataPagamento?: Date;
  criadoEm: string;
  atualizadoEm: string;
  origem: 'website' | 'whatsapp' | 'presencial';
}

export interface AgendamentoFormData {
  nome: string;
  telefone: string;
  endereco: string;
  tipoServico: TipoServico;
  descricao: string;
  dataAgendamento: string;
  horaInicio: string;
  fotoProblema?: Foto;
}

export interface AgendamentoResponse {
  sucesso: boolean;
  mensagem: string;
  agendamento?: Agendamento;
  erro?: string;
  mensagemWhatsApp?: string;
}
