import Container from "@/components/ui/Container"

/**
 * Editorial hero. Two short beats:
 *   1. Headline in Cormorant (the question that hooks the reader)
 *   2. One-sentence subhead in DM Sans (the promise)
 *
 * Copy length was tuned down one sentence per block after user review,
 * to avoid overload on 375px screens.
 */
export default function BioHero() {
  return (
    <section className="bg-linen pb-10 md:pb-14">
      <Container>
        <div className="mx-auto flex max-w-[32ch] flex-col items-center gap-5 text-center">
          <h1 className="font-editorial text-[32px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
            Você entende o que sente —
            <br />
            mas não entende por que repete.
          </h1>
          <p className="max-w-[30ch] font-body text-base text-brown/80 md:text-lg">
            Quando você decifra o código, o filme para de se repetir.
          </p>
        </div>
      </Container>
    </section>
  )
}
