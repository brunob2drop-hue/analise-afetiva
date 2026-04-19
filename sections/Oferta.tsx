import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import AnimatedButton from "@/components/ui/AnimatedButton"
import BookMockup from "@/components/sales/BookMockup"
import FadeIn from "@/components/sales/FadeIn"
import { LINKS } from "@/lib/constants"

/**
 * A seção mais importante da landing: a oferta.
 *
 * Layout mobile-first:
 *  - Card único em linen com borda terracota
 *  - Topo: capa + valor riscado/valor final
 *  - Meio: o que vem incluso (ebook + 2 bônus com breakdown)
 *  - Rodapé: CTA pulsante + nota de segurança
 *
 * Dois bônus são declarados explicitamente, como exige o briefing
 * de vendas: Guia de Autorresgate Afetivo + Mapa do Meu Padrão.
 * Esses bônus existem, de verdade, nos Anexos A e B do ebook.md.
 */

const INCLUSOS = [
  {
    label: "Ebook principal",
    title: "O Código da Repetição",
    description:
      "18 mil palavras em 5 capítulos, com introdução, conclusão e exercício prático em cada pilar. Leitura em um fim de semana.",
    value: "R$ 67,00",
  },
  {
    label: "Bônus #1",
    title: "Guia de Autorresgate Afetivo",
    description:
      "Protocolo de 7 passos para os momentos em que a vontade de voltar, escrever, ceder aparece. Leia nos momentos de abstinência.",
    value: "R$ 29,00",
  },
  {
    label: "Bônus #2",
    title: "Mapa do Meu Padrão",
    description:
      "Worksheet guiado em 6 partes para mapear identidade afetiva, crença central, protocolo pessoal e metas de 90 dias.",
    value: "R$ 29,00",
  },
]

const VALOR_DE = "R$ 125,00"
const VALOR_POR = "R$ 19,90"

export default function Oferta() {
  return (
    <Section bg="linen" id="oferta">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-10 flex max-w-[56ch] flex-col items-center gap-4 text-center md:mb-14">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              A oferta
            </span>
            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
              Tudo que você precisa
              <br />
              <span className="italic text-terracota">em um único lugar</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-[820px] overflow-hidden rounded-2xl border border-terracota/60 bg-linen shadow-[0_40px_80px_-30px_rgba(26,20,16,0.30)]">
            {/* Header do card: capa + preço */}
            <div className="grid gap-8 border-b border-brown/10 p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-12">
              <div className="flex items-center justify-center">
                <BookMockup size="md" />
              </div>
              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-terracota/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-terracota">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracota badge-pulse" />
                  Oferta de lançamento
                </span>

                <div className="flex flex-col gap-2">
                  <span className="font-body text-xs text-brown/50 line-through">
                    De {VALOR_DE}
                  </span>
                  <p className="font-body text-[10px] uppercase tracking-[0.14em] text-brown/60">
                    por apenas
                  </p>
                  <div className="flex items-baseline gap-1 leading-none">
                    <span className="font-editorial text-[20px] font-medium text-charcoal/75">
                      R$
                    </span>
                    <span className="font-editorial text-[56px] font-semibold leading-none text-charcoal md:text-[68px]">
                      19,90
                    </span>
                  </div>
                  <span className="font-body text-xs text-brown/60">
                    Pagamento único · Acesso imediato
                  </span>
                </div>

                <div className="mt-2 w-full">
                  <AnimatedButton
                    href={LINKS.ebook}
                    external
                    size="lg"
                    className="w-full"
                  >
                    Quero decifrar meu código agora →
                  </AnimatedButton>
                </div>
              </div>
            </div>

            {/* Breakdown dos inclusos */}
            <div className="flex flex-col gap-6 p-8 md:p-12">
              <h3 className="font-editorial text-xl font-medium text-charcoal md:text-2xl">
                O que está incluso:
              </h3>
              <ul className="flex flex-col divide-y divide-brown/10">
                {INCLUSOS.map((it, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0 md:flex-row md:items-start md:gap-6"
                  >
                    <div className="flex-1">
                      <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-terracota">
                        {it.label}
                      </span>
                      <h4 className="mt-1 font-editorial text-lg font-medium text-charcoal md:text-xl">
                        {it.title}
                      </h4>
                      <p className="mt-1 max-w-[52ch] font-body text-sm text-brown/75">
                        {it.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="font-body text-xs text-brown/50">
                        valor
                      </span>
                      <div className="font-editorial text-xl font-semibold text-brown/80 line-through">
                        {it.value}
                      </div>
                    </div>
                  </li>
                ))}
                <li className="flex items-center justify-between border-t border-brown/15 pt-6 mt-1">
                  <span className="font-editorial text-lg font-medium text-charcoal md:text-xl">
                    Você paga hoje
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-editorial text-base font-medium text-terracota/80">R$</span>
                    <span className="font-editorial text-2xl font-semibold text-terracota md:text-3xl">19,90</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
