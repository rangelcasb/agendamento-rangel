import { Header } from '@/components/Landing/Header';
import { Hero } from '@/components/Landing/Hero';
import { TrustStrip } from '@/components/Landing/TrustStrip';
import { Servicos } from '@/components/Landing/Servicos';
import { Sobre } from '@/components/Landing/Sobre';
import { Depoimentos } from '@/components/Landing/Depoimentos';
import { Faq } from '@/components/Landing/Faq';
import { Preco } from '@/components/Landing/Preco';
import { AgendamentoSection } from '@/components/Landing/AgendamentoSection';
import { Footer } from '@/components/Landing/Footer';
import { WhatsAppFloat } from '@/components/Landing/WhatsAppFloat';

export default function Home() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Header />
      <Hero />
      <TrustStrip />
      <Servicos />
      <Sobre />
      <Depoimentos />
      <Faq />
      <Preco />
      <AgendamentoSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
