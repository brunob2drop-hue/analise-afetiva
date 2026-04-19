import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

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
    <Section>
      <Container>
        <h2 className="font-serif text-2xl text-center mb-8 leading-tight">
          Os{" "}
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              lineHeight: 1,
            }}
          >
            5
          </span>{" "}
          Pilares do Código da Repetição
        </h2>

        <ol className="space-y-8">
          {PILARES.map((p, idx) => (
            <li key={idx} className="flex gap-4 items-start">
              <span className="font-serif text-4xl leading-none text-terracota shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-lg mb-1">{p.title}</h3>
                <p className="font-sans text-sm text-muted">{p.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}