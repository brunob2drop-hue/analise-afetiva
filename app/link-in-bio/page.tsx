import type { Metadata } from "next"
import BioHeader from "@/components/bio/BioHeader"
import BioHero from "@/components/bio/BioHero"
import LinkBioStack from "@/components/bio/LinkBioStack"
import LinkBioButton from "@/components/bio/LinkBioButton"
import ParaQuemE from "@/components/bio/ParaQuemE"
import CincoPilares from "@/components/bio/CincoPilares"
import Depoimentos from "@/components/bio/Depoimentos"
import BioFooter from "@/components/bio/BioFooter"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import { LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Links",
  description:
    "Hub oficial Analise Afetiva — ebook, comunidade, TikTok e YouTube.",
}

/**
 * /link-in-bio — the mobile-first hub linked from Instagram and other
 * bio links. Server-rendered with 3 client islands (LinkBioStack,
 * Depoimentos, EmailCaptureForm inside BioFooter).
 */
export default function LinkInBioPage() {
  return (
    <main>
      <BioHeader />
      <BioHero />

      <Section bg="linen" className="pt-0 pb-10 md:pb-14">
        <Container>
          <div className="mx-auto w-full max-w-md">
            <LinkBioStack>
              <LinkBioButton
                variant="ebook"
                title="O Código da Repetição"
                subtitle="Por que você aceita o amor que acha que merece?"
                href={LINKS.ebook}
                priceBadge="R$ 19,90"
                floatingBadge="🔥 Mais vendido"
              />
              <LinkBioButton
                variant="whatsapp"
                title="Comunidade Analise Afetiva"
                subtitle="Insights e geração de valor — Gratuito"
                href={LINKS.whatsapp}
              />
              <LinkBioButton
                variant="tiktok"
                title="@analiseafetiva"
                subtitle="Conteúdo diário sobre padrões afetivos"
                href={LINKS.tiktok}
              />
              <LinkBioButton
                variant="youtube"
                title="Canal no YouTube"
                subtitle="Vídeos longos sobre relacionamentos"
                href={LINKS.youtube}
              />
            </LinkBioStack>
          </div>
        </Container>
      </Section>

      <ParaQuemE />
      <CincoPilares />
      <Depoimentos />
      <BioFooter />
    </main>
  )
}
