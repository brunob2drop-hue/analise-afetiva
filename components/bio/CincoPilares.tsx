import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

/**
 * "Os 5 Pilares do Código da Repetição" — editorial numbered list.
 * Big terracota numbers in Cormorant + serif title + sans description.
 * All 5 titles and descriptions are user-content placeholders.
 */

type Pilar = { title: string; description: string }

const PILARES: Pilar[] = [
  {
    title: "O filme que você não sabe que está passando",
    description:
      "Todo padrão afetivo começa como roteiro inconsciente escrito na infância. Você aprende a nomear a cena antes de conseguir mudá-la.",
  },
  {
    title: "A gramática do apego",
    description:
      "Ansioso, evitativo, seguro, desorganizado. Seu estilo não é um defeito — é uma linguagem. E toda linguagem atrai um interlocutor específico.",
  },
  {
    title: "O vício emocional",
    description:
      "Relações tóxicas viciam mais que as saudáveis por uma razão química. Você vai entender a dopamina do silêncio dele — e como sair dela.",
  },
  {
    title: "A crença que dirige tudo",
    description:
      "Por baixo do padrão existe uma frase: “eu aceito o amor que acho que mereço”. Identificar e reescrever essa frase é o ponto de virada.",
  },
  {
    title: "Quebrando o código",
    description:
      "O que é, na prática, um relacionamento seguro? Um novo repertório afetivo é construído em decisões pequenas, repetidas, conscientes.",
  },
]

export default function CincoPilares() {
  return (
    <Section bg="linen">
      <Container>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-editorial text-[28px] font-semibold text-charcoal md:text-[40px]">
            Os 5 Pilares do Código da Repetição
          </h2>
        </div>
        <ol className="flex flex-col gap-12 md:gap-16">
          {PILARES.map((p, idx) => (
            <li
              key={idx}
              className="mx-auto flex w-full max-w-[60ch] flex-col items-start gap-3 md:flex-row md:items-baseline md:gap-8"
            >
              <span
                className="font-editorial text-[56px] font-semibold leading-none text-terracota md:text-[72px]"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-editorial text-2xl font-medium text-charcoal md:text-3xl">
                  {p.title}
                </h3>
                <p className="font-body text-base text-brown/80">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
