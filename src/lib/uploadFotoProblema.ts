import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { Foto } from '@/types';

export const TAMANHO_MAXIMO_FOTO = 5 * 1024 * 1024; // 5MB

export async function uploadFotoProblema(arquivo: File): Promise<Foto> {
  const nomeUnico = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${arquivo.name}`;
  const storageRef = ref(storage, `agendamentos/${nomeUnico}`);

  await uploadBytes(storageRef, arquivo, { contentType: arquivo.type });
  const url = await getDownloadURL(storageRef);

  return {
    url,
    tamanho: arquivo.size,
    uploadEm: new Date().toISOString(),
  };
}
