import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * Versão "sales" dos 5 Pilares. Difere da versão link-in-bio:
 * números ainda maiores, prefixo "CAPÍTULO" acima de cada título e
 * espaçamento generoso para leitura pausada. Fundo linen.
 */

type Pilar = { title: string; description: string }

const PILARES: Pilar[] = [
  {
    title: "O filme que você não sabe que está passando",
    description:
      "Todo padrão afetivo começa como roteiro inconsciente escrito na infância. Antes de mudar a cena, você precisa ver o filme rodando. A primeira intervenção é sempre narrativa.",
  },
  {
    title: "A gramática do apego",
    description:
      "Ansioso, evitativo, seguro, desorganizado. Seu estilo não é um defeito — é uma linguagem aprendida. E toda linguagem atrai um interlocutor específico. Você vai identificar o seu e o dele.",
  },
  {
    title: "O vício emocional",
    description:
      "Relações tóxicas viciam mais que as saudáveis por uma razão química — reforço intermitente. Você vai entender a dopamina do silêncio dele, o papel do cortisol e por que você sente abstinência.",
  },
  {
    title: "A crença que dirige tudo",
    description:
      "Por baixo do padrão existe uma frase: “eu aceito o amor que acho que mereço”. Identificar a sua é difícil. Reescrevê-la é possível — e é o ponto de virada de todo o processo.",
  },
  {
    title: "Quebrando o código",
    description:
      "O que é, na prática, um relacionamento seguro? Um novo repertório afetivo é construído em decisões pequenas, repetidas, conscientes. Esse capítulo mostra quais e por onde começar.",
  },
]

export default function CincoPilaresSales() {
  return (
    <Section bg="linen" id="pilares">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-14 flex max-w-[56ch] flex-col items-center gap-4 text-center md:mb-20">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              O conteúdo
            </span>
            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
              Os 5 Pilares do
              <br />
              <span className="italic text-terracota">Código da Repetição</span>
            </h2>
          </div>
        </FadeIn>

        <ol className="flex flex-col gap-14 md:gap-20">
          {PILARES.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <li className="mx-auto grid w-full max-w-[62ch] grid-cols-[auto_1fr] items-baseline gap-5 md:gap-10">
                <div className="flex flex-col items-start">
                  <span
                    aria-hidden="true"
                    className="font-editorial text-[64px] font-semibold leading-none text-terracota md:text-[96px]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 font-body text-[9px] font-bold uppercase tracking-[0.22em] text-terracota/80">
                    Capítulo {idx + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <h3 className="font-editorial text-2xl font-medium leading-tight text-charcoal md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-brown/80">
                    {p.description}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
