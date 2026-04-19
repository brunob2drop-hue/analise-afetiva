import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

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

export default function ParaQuemE() {
  return (
    <Section bg="charcoal">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-editorial text-[28px] font-semibold italic text-linen md:text-[38px]">
            Para quem é
          </h2>
          <ol className="mt-10 flex flex-col divide-y divide-white/[0.06] md:mt-14">
            {TRIGGERS.map((t, idx) => (
              <li key={idx} className="flex gap-5 py-8 md:gap-8 md:py-10">
                <span
                  className="w-6 shrink-0 pt-1 font-editorial text-[36px] font-semibold leading-none text-[#B89070]/30 md:w-9 md:text-[44px]"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-editorial text-[19px] font-medium leading-tight text-linen md:text-[22px]">
                    {t.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.72] text-sand/60">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
