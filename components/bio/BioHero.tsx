import Container from "@/components/ui/Container"
import Image from "next/image"
import { BRAND } from "@/lib/constants"

export default function BioHero() {
  return (
    <section className="bg-linen pt-14 pb-8 md:pt-20 md:pb-10">
      <Container>
        <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
          <Image
            src="/logo-circular.png"
            alt="Analise Afetiva"
            width={104}
            height={104}
            priority
          />

          <p className="mt-4 font-editorial text-[22px] font-medium tracking-[0.06em] text-charcoal">
            {BRAND.name}
          </p>

          <p className="mt-1 font-body text-[10px] font-medium uppercase tracking-[0.24em] text-terracota">
            {BRAND.handle}
          </p>

          <h1 className="mt-9 font-editorial text-[26px] font-semibold italic leading-[1.1] tracking-[-0.02em] text-charcoal md:text-[36px]">
            Você entende o que sente —<br />
            mas não entende por que repete.
          </h1>

          <p className="mt-5 max-w-[26ch] font-body text-[15px] leading-[1.75] text-muted">
            Quando você decifra o código, o filme para de se repetir.
          </p>
        </div>
      </Container>
    </section>
  )
}
