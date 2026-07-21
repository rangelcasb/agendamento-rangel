import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Recibo } from '@/types';

const ACCENT = '#f0a825';
const NAVY = '#0b1f3a';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#1a2233', fontFamily: 'Helvetica' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoNome: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: NAVY },
  logoSub: { fontSize: 8, color: ACCENT, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  reciboTitulo: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: NAVY, textAlign: 'right' },
  reciboNumero: { fontSize: 10, color: ACCENT, textAlign: 'right', marginTop: 2 },
  divisor: { borderBottomWidth: 3, borderBottomColor: NAVY, marginTop: 14, marginBottom: 18 },
  colunas: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: NAVY, marginBottom: 4 },
  textoCinza: { color: '#5b6377', lineHeight: 1.5 },
  caixaCliente: { backgroundColor: '#f7f5f0', borderRadius: 6, padding: 14, marginBottom: 18 },
  labelPequeno: { fontSize: 8, color: '#c98a1e', fontFamily: 'Helvetica-Bold', letterSpacing: 1, marginBottom: 4 },
  nomeCliente: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: NAVY, marginBottom: 6 },
  tabelaHeader: { flexDirection: 'row', backgroundColor: NAVY, padding: 8, borderRadius: 3 },
  tabelaHeaderTexto: { color: '#fff', fontFamily: 'Helvetica-Bold', fontSize: 9 },
  linhaItem: { flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderBottomColor: '#e7e2d8' },
  totalLinha: { flexDirection: 'row', padding: 8, marginTop: 4 },
  totalLabel: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: NAVY },
  totalValor: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: NAVY },
  rodapeColunas: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 24 },
  declaracao: { color: '#5b6377', lineHeight: 1.6, marginBottom: 50 },
  assinaturas: { flexDirection: 'row', justifyContent: 'space-between' },
  assinaturaBloco: { width: '42%', borderTopWidth: 1, borderTopColor: '#999', paddingTop: 6, textAlign: 'center', color: '#5b6377' },
});

const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatarData = (iso: string) => {
  const [ano, mes, dia] = iso.split('-');
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${Number(dia)} de ${meses[Number(mes) - 1]} de ${ano}`;
};

const FORMA_PAGAMENTO_LABEL: Record<string, string> = {
  pix: 'Pix',
  nfc: 'Aproximação (NFC)',
  dinheiro: 'Dinheiro',
  debito: 'Débito',
  credito: 'Crédito',
};

const STATUS_LABEL: Record<string, string> = {
  pago: 'Pago',
  nao_pago: 'Não pago',
};

const formatarTelefone = (telefone: string) => {
  const digitos = telefone.replace(/\D/g, '');
  if (digitos.length === 11) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }
  if (digitos.length === 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return telefone;
};

interface ReciboPDFProps {
  recibo: Recibo;
}

export const ReciboPDF: React.FC<ReciboPDFProps> = ({ recibo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerRow}>
        <View style={styles.logoRow}>
          <View>
            <Text style={styles.logoNome}>rangel</Text>
            <Text style={styles.logoSub}>MARIDO DE ALUGUEL</Text>
          </View>
        </View>
        <View>
          <Text style={styles.reciboTitulo}>RECIBO</Text>
          <Text style={styles.reciboNumero}>Nº {String(recibo.numero).padStart(4, '0')}</Text>
        </View>
      </View>

      <View style={styles.divisor} />

      <View style={styles.colunas}>
        <View>
          <Text style={styles.label}>Prestador</Text>
          <Text style={styles.textoCinza}>Rangel — Marido de Aluguel</Text>
          <Text style={styles.textoCinza}>WhatsApp: (82) 99945-3211</Text>
          <Text style={styles.textoCinza}>Maceió, AL</Text>
        </View>
        <View>
          <Text style={styles.label}>Data de emissão</Text>
          <Text style={styles.textoCinza}>{formatarData(recibo.dataEmissao)}</Text>
        </View>
      </View>

      <View style={styles.caixaCliente}>
        <Text style={styles.labelPequeno}>RECEBIDO DE</Text>
        <Text style={styles.nomeCliente}>{recibo.cliente.nome}</Text>
        {(recibo.cliente.endereco || recibo.cliente.telefone) && (
          <Text style={styles.textoCinza}>
            {recibo.cliente.endereco ? `Endereço: ${recibo.cliente.endereco}` : ''}
            {recibo.cliente.endereco && recibo.cliente.telefone ? '    ' : ''}
            {recibo.cliente.telefone ? `Telefone: ${formatarTelefone(recibo.cliente.telefone)}` : ''}
          </Text>
        )}
      </View>

      <View style={styles.tabelaHeader}>
        <Text style={[styles.tabelaHeaderTexto, { flex: 1 }]}>Descrição do serviço</Text>
        <Text style={[styles.tabelaHeaderTexto, { width: 90, textAlign: 'right' }]}>Valor</Text>
      </View>
      {recibo.itens.map((item, i) => (
        <View key={i} style={styles.linhaItem}>
          <Text style={{ flex: 1 }}>{item.descricao}</Text>
          <Text style={{ width: 90, textAlign: 'right' }}>{formatarMoeda(item.valor)}</Text>
        </View>
      ))}
      <View style={styles.totalLinha}>
        <Text style={[styles.totalLabel, { flex: 1 }]}>Total</Text>
        <Text style={[styles.totalValor, { width: 90, textAlign: 'right' }]}>{formatarMoeda(recibo.total)}</Text>
      </View>

      <View style={styles.rodapeColunas}>
        <View>
          <Text style={styles.labelPequeno}>FORMA DE PAGAMENTO</Text>
          <Text>{FORMA_PAGAMENTO_LABEL[recibo.formaPagamento] || recibo.formaPagamento}</Text>
        </View>
        <View>
          <Text style={styles.labelPequeno}>STATUS</Text>
          <Text>{STATUS_LABEL[recibo.status] || recibo.status}</Text>
        </View>
      </View>

      <Text style={styles.declaracao}>
        Declaro, para os devidos fins, ter recebido do(a) cliente acima identificado(a) o valor
        total referente aos serviços descritos, dando plena quitação.
      </Text>

      <View style={styles.assinaturas}>
        <Text style={styles.assinaturaBloco}>Rangel — Marido de Aluguel</Text>
        <Text style={styles.assinaturaBloco}>Assinatura do cliente</Text>
      </View>
    </Page>
  </Document>
);
