import type { Metadata } from "next"
import BioHero from "@/components/bio/BioHero"
import LinkBioStack from "@/components/bio/LinkBioStack"
import LinkBioButton from "@/components/bio/LinkBioButton"
import BioFooter from "@/components/bio/BioFooter"
import Container from "@/components/ui/Container"
import { LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Links",
  description: "Hub oficial Analise Afetiva — ebook, TikTok e YouTube.",
}

function BookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d="M2.5 3A1.5 1.5 0 0 1 4 1.5H8.5v14H4A1.5 1.5 0 0 1 2.5 14V3Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M14.5 3A1.5 1.5 0 0 0 13 1.5H8.5v14H13a1.5 1.5 0 0 0 1.5-1.5V3Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M10.5 1.5h-2v8.5a1.75 1.75 0 1 1-1.5-1.72V6.24A3.75 3.75 0 1 0 10.5 9.75V5.64A5.22 5.22 0 0 0 13 6.5V4.52a3.25 3.25 0 0 1-2.5-3.02Z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 6.2L11 8.5L7 10.8V6.2Z" fill="currentColor" />
    </svg>
  )
}

export default function LinkInBioPage() {
  return (
    <main>
      {/* Hero + Links — bloco principal único em linen */}
      <BioHero />

      <div className="bg-linen pb-20 pt-2 md:pb-28">
        <Container>
          <div className="mx-auto max-w-[360px]">
            <LinkBioStack>
              {/* CTA principal → landing page */}
              <LinkBioButton
                variant="ebook"
                title="Descubra por que você repete os mesmos padrões no amor →"
                href="https://analise-afetiva.vercel.app"
                icon={<BookIcon />}
              />

              {/* Links secundários */}
              <div className="flex flex-col gap-3 pt-3">
                <LinkBioButton
                  variant="tiktok"
                  title="Siga nosso perfil no TikTok para doses diárias de clareza afetiva"
                  href={LINKS.tiktok}
                  icon={<TikTokIcon />}
                />
                <LinkBioButton
                  variant="youtube"
                  title="Aulas curtas no YouTube Shorts sobre o Código da Repetição"
                  href={LINKS.youtube}
                  icon={<YouTubeIcon />}
                />
              </div>
            </LinkBioStack>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <BioFooter />
    </main>
  )
}
