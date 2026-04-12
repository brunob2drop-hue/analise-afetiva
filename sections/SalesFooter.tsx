import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import Logo from "@/components/brand/Logo"
import { LINKS, resolveHref, isPlaceholder } from "@/lib/constants"

/**
 * Footer institucional da landing de vendas.
 * Mais minimalista que o BioFooter — sem formulário, sem copy grande.
 * Apenas logo, navegação por âncora, sociais e copyright.
 */

const NAV = [
  { href: "#pilares", label: "5 Pilares" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "FAQ" },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}
function TiktokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M14 3 C 14 5, 15.5 7, 17.5 7 L 17.5 9.5 C 16 9.5, 14.7 9, 13.7 8 L 13.7 14.5 C 13.7 17, 11.7 19, 9.2 19 C 6.7 19, 4.7 17, 4.7 14.5 C 4.7 12, 6.7 10, 9.2 10 L 9.2 12.5 C 8 12.5, 7 13.5, 7 14.5 C 7 15.7, 8 16.5, 9.2 16.5 C 10.4 16.5, 11.2 15.7, 11.2 14.5 L 11.2 3 Z"
        fill="currentColor"
      />
    </svg>
  )
}
function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8 L 14 11 L 9 14 Z" fill="currentColor" />
    </svg>
  )
}

export default function SalesFooter() {
  const socials = [
    { href: LINKS.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: LINKS.tiktok, label: "TikTok", icon: <TiktokIcon /> },
    { href: LINKS.youtube, label: "YouTube", icon: <YoutubeIcon /> },
  ]

  return (
    <Section as="footer" bg="dark-card" className="py-10 md:py-12">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Logo size="sm" tone="dark" />
            <p className="max-w-[36ch] font-body text-xs leading-relaxed text-sand/60">
              Decifrando padrões afetivos. Construindo relações conscientes.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-body text-xs uppercase tracking-[0.14em] text-sand/70 transition-colors duration-200 hover:text-terracota"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            {socials.map((s) => {
              const ph = isPlaceholder(s.href)
              return (
                <a
                  key={s.label}
                  href={resolveHref(s.href)}
                  data-placeholder={ph ? "true" : undefined}
                  target={ph ? undefined : "_blank"}
                  rel={ph ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="text-sand/70 transition-colors duration-200 hover:text-terracota"
                >
                  {s.icon}
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-1 border-t border-sand/10 pt-6 text-center">
          <p className="font-body text-xs text-sand/50">
            © 2026 Analise Afetiva. Todos os direitos reservados.
          </p>
          <p className="font-body text-[10px] text-sand/40">
            Este site não garante resultados individuais. Leitura não substitui
            acompanhamento clínico.
          </p>
        </div>
      </Container>
    </Section>
  )
}
