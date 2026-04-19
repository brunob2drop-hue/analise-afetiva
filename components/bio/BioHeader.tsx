import Image from "next/image"
import Container from "@/components/ui/Container"
import { BRAND } from "@/lib/constants"

export default function BioHeader() {
  return (
    <header className="pt-10 pb-4 text-center">
      <Container>
        <div className="flex justify-center mb-4">
          <Image
            src="/logo-circular.png"
            alt="Analise Afetiva"
            width={80}
            height={80}
            className="rounded-full object-cover"
            priority
          />
        </div>

        <p className="font-sans text-sm text-muted tracking-widest uppercase mb-3">
          {BRAND.tagline}
        </p>

        <div className="mx-auto w-20 h-px bg-divider" />
      </Container>
    </header>
  )
}
