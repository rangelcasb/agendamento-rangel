export const ACCENT = '#f0a825';
export const WHATSAPP_NUMBER = '5582999453211';
export const WHATSAPP_DISPLAY = '82 99945-3211';

export function buildWhatsAppLink(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}
