import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * FAQ — 6 perguntas em <details> nativos para progressive enhancement.
 * Sem JS extra; zero cost em hidratação. Cada item abre/fecha via
 * estado nativo do browser. Fundo linen.
 */

const FAQS = [
  {
    q: "Por que R$ 19,90 se o valor cheio é R$ 125?",
    a: "Porque o objetivo deste primeiro ciclo é colocar o método na mão do maior número possível de mulheres. Quando um conteúdo funciona, ele se espalha — e a minha aposta é que você vai indicar para uma amiga. O preço baixo é proposital e tem prazo. Depois da janela de lançamento, o valor volta para R$ 125,00.",
  },
  {
    q: "Em quanto tempo eu leio o ebook?",
    a: "Cerca de 3 a 4 horas em ritmo pausado, com os exercícios escritos. Você pode ler em um final de semana ou em blocos de 30 minutos ao longo da semana. A estrutura em 5 capítulos foi pensada para funcionar nos dois formatos.",
  },
  {
    q: "Eu já fiz terapia. Isso vai me ajudar ou vai repetir o que eu já sei?",
    a: "Se você já fez terapia, provavelmente o que falta é estrutura de aplicação — não mais conceito. Este ebook é feito exatamente para quem entende os conceitos e continua repetindo o padrão. Ele funciona como um complemento ao processo terapêutico, não como substituto. Várias leitoras relatam ter levado os exercícios para a sessão seguinte.",
  },
  {
    q: "Como recebo o material depois de comprar?",
    a: "O acesso é imediato. Assim que o pagamento é confirmado (cartão: instantâneo; Pix: em segundos), você recebe um e-mail com o link de download do PDF, que inclui o ebook principal e os dois bônus (Guia de Autorresgate e Mapa do Meu Padrão) no mesmo arquivo.",
  },
  {
    q: "Eu preciso de algum conhecimento prévio em psicologia?",
    a: "Não. O texto foi escrito em linguagem direta, sem jargão. Quando uso um termo técnico (apego ansioso, reforço intermitente, crença nuclear), explico o significado no próprio parágrafo. Leitoras sem qualquer formação em psicologia e leitoras que são psicólogas de formação chegam ao mesmo lugar.",
  },
  {
    q: "E se eu comprar e sentir que não é para mim?",
    a: "Você tem 7 dias corridos para ler, fazer os exercícios e decidir. Se não for para você, basta responder ao e-mail de compra pedindo o reembolso. Devolvo 100% do valor, sem perguntas. O risco é meu.",
  },
]

export default function FaqSales() {
  return (
    <Section bg="linen" id="faq">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-12 flex max-w-[56ch] flex-col items-center gap-4 text-center md:mb-16">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Perguntas frequentes
            </span>
            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
              O que as leitoras
              <br />
              <span className="italic text-terracota">costumam perguntar</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-[760px]">
          <ul className="flex flex-col divide-y divide-brown/15 border-y border-brown/15">
            {FAQS.map((f, i) => (
              <li key={i}>
                <details className="group py-5 md:py-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-editorial text-lg font-medium text-charcoal md:text-xl">
                      {f.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-terracota/70 text-terracota transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M5 1 V 9 M 1 5 H 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[62ch] font-body text-base leading-relaxed text-brown/80">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
