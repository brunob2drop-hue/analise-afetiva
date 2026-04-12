import type { Metadata } from "next"
import Hero from "@/sections/Hero"
import ProvaSocialRapida from "@/sections/ProvaSocialRapida"
import Problema from "@/sections/Problema"
import OQueE from "@/sections/OQueE"
import CincoPilaresSales from "@/sections/CincoPilaresSales"
import ParaQuem from "@/sections/ParaQuem"
import SobreAutora from "@/sections/SobreAutora"
import DepoimentosSales from "@/sections/DepoimentosSales"
import Oferta from "@/sections/Oferta"
import Garantia from "@/sections/Garantia"
import FaqSales from "@/sections/FaqSales"
import CtaFinal from "@/sections/CtaFinal"
import SalesFooter from "@/sections/SalesFooter"

/**
 * Landing page de vendas — "O Código da Repetição".
 *
 * Composição em 13 blocos:
 *   1. Hero                — acima da dobra, headline + CTA + mockup
 *   2. ProvaSocialRapida   — faixa de métricas (charcoal estreito)
 *   3. Problema            — diagnóstico editorial (linen)
 *   4. OQueE               — 3 cards de método (dark-card)
 *   5. CincoPilaresSales   — lista numerada editorial (linen)
 *   6. ParaQuem            — qualificação é/não é (charcoal)
 *   7. SobreAutora         — autoridade editorial (linen)
 *   8. DepoimentosSales    — carrossel scroll-snap (charcoal)
 *   9. Oferta              — bloco principal com os 2 bônus (linen)
 *  10. Garantia            — selo 7 dias (dark-card)
 *  11. FaqSales            — 6 perguntas (linen)
 *  12. CtaFinal            — último empurrão (charcoal)
 *  13. SalesFooter         — rodapé institucional (dark-card)
 *
 * Alternância de paleta linen / charcoal / dark-card produz um ritmo
 * de leitura editorial. Todas as seções são RSCs por padrão; apenas
 * DepoimentosSales, AnimatedButton e FadeIn são client islands.
 */

export const metadata: Metadata = {
  title: "O Código da Repetição — por que você aceita o amor que acha que merece?",
  description:
    "Ebook em 5 pilares sobre padrões afetivos, apego e crença nuclear. Para mulheres que já entenderam o que sentem e ainda assim repetem o filme. R$ 19,90 com acesso imediato e 7 dias de garantia.",
  openGraph: {
    title: "O Código da Repetição",
    description:
      "Decifre o código que dirige sua vida afetiva. Um ensaio em 5 pilares, escrito para mulheres que já estão cansadas de repetir o mesmo filme.",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProvaSocialRapida />
      <Problema />
      <OQueE />
      <CincoPilaresSales />
      <ParaQuem />
      <SobreAutora />
      <DepoimentosSales />
      <Oferta />
      <Garantia />
      <FaqSales />
      <CtaFinal />
      <SalesFooter />
    </main>
  )
}
