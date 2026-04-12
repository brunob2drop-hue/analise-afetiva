import Container from "@/components/ui/Container"
import AnimatedButton from "@/components/ui/AnimatedButton"
import BookMockup from "@/components/sales/BookMockup"
import FadeIn from "@/components/sales/FadeIn"
import { LINKS } from "@/lib/constants"

/**
 * Hero da landing de vendas.
 *
 * Layout: grid 1 coluna mobile → 2 colunas desktop. Lado esquerdo:
 * eyebrow, headline editorial forte, subhead, CTA pulsante + micro
 * selos de confiança. Lado direito: mockup 3D do ebook.
 *
 * Cor: fundo linen, tipografia charcoal, acento terracota.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linen pb-16 pt-16 md:pb-28 md:pt-24">
      {/* Ornamento editorial de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-terracota/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-terracota/5 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          {/* Coluna esquerda: texto */}
          <FadeIn>
            <div className="flex flex-col items-start gap-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-terracota/50 bg-terracota/5 px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-terracota">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracota" />
                Ebook · Edição digital
              </span>

              <h1 className="font-editorial text-[40px] font-semibold leading-[1.02] text-charcoal md:text-[64px] lg:text-[72px]">
                Você não atrai
                <br />
                o errado.
                <br />
                <span className="italic text-terracota">Você permite.</span>
              </h1>

              <p className="max-w-[48ch] font-body text-base text-brown/80 md:text-lg">
                Um ensaio direto para mulheres que já entenderam o que sentem
                — mas continuam repetindo o mesmo filme. Em cinco pilares,
                você decifra o código que dirige sua vida afetiva e aprende a
                reescrever a frase que dirige tudo.
              </p>

              <div className="flex flex-col items-start gap-3">
                <AnimatedButton href={LINKS.ebook} external size="lg">
                  Quero decifrar meu código — R$ 19,90
                </AnimatedButton>
                <p className="font-body text-xs text-brown/60">
                  Acesso imediato · 7 dias de garantia · Pagamento único
                </p>
              </div>

              {/* Selos de confiança */}
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-brown/10 pt-6">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="font-editorial text-2xl font-semibold text-terracota"
                  >
                    5
                  </span>
                  <span className="font-body text-xs leading-tight text-brown/70">
                    Pilares
                    <br />
                    aplicados
                  </span>
                </div>
                <span className="h-8 w-px bg-brown/15" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="font-editorial text-2xl font-semibold text-terracota"
                  >
                    2
                  </span>
                  <span className="font-body text-xs leading-tight text-brown/70">
                    Bônus
                    <br />
                    inclusos
                  </span>
                </div>
                <span className="h-8 w-px bg-brown/15" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="font-editorial text-2xl font-semibold text-terracota"
                  >
                    7
                  </span>
                  <span className="font-body text-xs leading-tight text-brown/70">
                    Dias de
                    <br />
                    garantia
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Coluna direita: mockup */}
          <FadeIn delay={0.15}>
            <div className="flex items-center justify-center md:justify-end">
              <BookMockup size="lg" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
