import Logo from "@/components/brand/Logo"
import Container from "@/components/ui/Container"
import { BRAND } from "@/lib/constants"

/**
 * Top of the link-in-bio page: centered logo + handle + tagline + divider.
 * The divider is a thin horizontal line (max-w 80px) that announces the
 * editorial rhythm before the hero.
 */
export default function BioHeader() {
  return (
    <header className="bg-linen pt-12 pb-8 md:pt-16 md:pb-10">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <Logo size="md" variant="full" tone="light" />
          <p className="font-body text-sm text-terracota">{BRAND.handle}</p>
          <p className="max-w-sm text-center font-editorial italic text-brown md:text-lg">
            {BRAND.tagline}
          </p>
          <div className="mt-4 h-px w-20 bg-sand" aria-hidden="true" />
        </div>
      </Container>
    </header>
  )
}
