import { Foto } from '@/types';

export const TAMANHO_MAXIMO_FOTO = 8 * 1024 * 1024; // 8MB no arquivo original, antes de comprimir
const DIMENSAO_MAXIMA = 1000;
const TAMANHO_MAXIMO_COMPRIMIDO = 900 * 1024; // limite seguro para caber no Firestore

export async function comprimirFotoProblema(arquivo: File): Promise<Foto> {
  const bitmap = await createImageBitmap(arquivo);

  const escala = Math.min(1, DIMENSAO_MAXIMA / Math.max(bitmap.width, bitmap.height));
  const largura = Math.round(bitmap.width * escala);
  const altura = Math.round(bitmap.height * escala);

  const canvas = document.createElement('canvas');
  canvas.width = largura;
  canvas.height = altura;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Nao foi possivel processar a imagem');
  ctx.drawImage(bitmap, 0, 0, largura, altura);

  let dataUrl = '';
  for (const qualidade of [0.6, 0.4, 0.25]) {
    dataUrl = canvas.toDataURL('image/jpeg', qualidade);
    const tamanhoBytes = Math.round((dataUrl.length * 3) / 4);
    if (tamanhoBytes <= TAMANHO_MAXIMO_COMPRIMIDO) {
      return { url: dataUrl, tamanho: tamanhoBytes, uploadEm: new Date().toISOString() };
    }
  }

  throw new Error('Imagem muito grande mesmo apos compressao');
}
