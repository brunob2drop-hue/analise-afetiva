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
    title: "[PLACEHOLDER: Pilar 1 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 1 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 2 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 2 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 3 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 3 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 4 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 4 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 5 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 5 — 2 a 3 linhas]",
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
