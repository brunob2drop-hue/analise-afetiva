import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

/**
 * "Para quem é" — 3 trigger cards explaining who the ebook speaks to.
 * All 3 titles and descriptions are user-content placeholders marked
 * inline, to be filled post-implementation with real emotional triggers.
 *
 * Layout: 1 col mobile, 3 col desktop. Dark background for editorial
 * contrast with the linen hero above it.
 */

type Trigger = { title: string; description: string }

const TRIGGERS: Trigger[] = [
  {
    title: "Você resolve tudo — menos isso.",
    description:
      "Você lidera times, fecha contratos, carrega uma casa. Mas, quando olha para seus relacionamentos, encontra o mesmo roteiro repetido. A dor não é falta de inteligência. É um código que ninguém te ensinou a ler.",
  },
  {
    title: "Você atrai exatamente quem não pode ficar.",
    description:
      "Os homens mudam, as histórias se parecem. Indisponíveis, ocupados, ambíguos. Você já desconfiou que o problema não são eles — é o sinal silencioso que você emite sem perceber. Esse sinal tem origem, e tem tradução.",
  },
  {
    title: "Você tem medo do que está ensinando sem querer.",
    description:
      "Seja para seus filhos, para você mesma ou para a mulher que você quer voltar a ser, existe um ciclo que começa antes de você e continua depois. Quebrar esse ciclo é o trabalho mais íntimo — e mais definitivo — que existe.",
  },
]

function TriggerIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#B89070" strokeWidth="1.5" />
      <path
        d="M16 10 L 16 17 M 16 21 L 16 22"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ParaQuemE() {
  return (
    <Section bg="charcoal">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-editorial text-[28px] font-semibold text-linen md:text-[40px]">
            Para quem é
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRIGGERS.map((t, idx) => (
            <Card key={idx} variant="dark" className="flex flex-col gap-4">
              <TriggerIcon />
              <h3 className="font-editorial text-xl font-medium text-linen">
                {t.title}
              </h3>
              <p className="font-body text-sm text-sand/80">{t.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
