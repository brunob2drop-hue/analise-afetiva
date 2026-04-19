import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import Logo from "@/components/brand/Logo"
import EmailCaptureForm from "./EmailCaptureForm"
import { LINKS, resolveHref, isPlaceholder } from "@/lib/constants"

/**
 * Bottom of the link-in-bio page:
 *  - Editorial copy hook (one sentence, per approved copy)
 *  - Email capture form (client island)
 *  - Social icons row
 *  - Brand symbol + copyright
 */

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}

function TiktokMiniIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 3 C 14 5, 15.5 7, 17.5 7 L 17.5 9.5 C 16 9.5, 14.7 9, 13.7 8 L 13.7 14.5 C 13.7 17, 11.7 19, 9.2 19 C 6.7 19, 4.7 17, 4.7 14.5 C 4.7 12, 6.7 10, 9.2 10 L 9.2 12.5 C 8 12.5, 7 13.5, 7 14.5 C 7 15.7, 8 16.5, 9.2 16.5 C 10.4 16.5, 11.2 15.7, 11.2 14.5 L 11.2 3 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YoutubeMiniIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8 L 14 11 L 9 14 Z" fill="currentColor" />
    </svg>
  )
}

type SocialItem = {
  href: string
  label: string
  icon: React.ReactNode
}

export default function BioFooter() {
  const socials: SocialItem[] = [
    { href: LINKS.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: LINKS.tiktok, label: "TikTok", icon: <TiktokMiniIcon /> },
    { href: LINKS.youtube, label: "YouTube", icon: <YoutubeMiniIcon /> },
  ]

  return (
    <Section as="footer" bg="charcoal">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="max-w-md font-editorial text-xl italic leading-snug text-sand md:text-2xl">
            Um encontro por semana entre você e o que você sente — sem
            algoritmo, sem ruído.
          </p>

          <EmailCaptureForm />

          <div className="flex items-center gap-6 pt-4">
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
                  className="text-sand transition-colors duration-200 hover:text-terracota"
                >
                  {s.icon}
                </a>
              )
            })}
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <Logo size="sm" variant="symbol" />
            <p className="font-body text-xs text-sand/50">
              © 2026 Analise Afetiva. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
