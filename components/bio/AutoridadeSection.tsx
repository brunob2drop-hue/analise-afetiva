import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

const TRIGGERS = [
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
]

const PULL_QUOTE = {
  text: "Já li dezenas de livros sobre apego. O diferencial aqui foi a cirurgia nos 5 Pilares. Finalmente dei nome ao que eu sentia mas não conseguia verbalizar na sessão. Li o material três vezes seguidas. É denso e direto.",
  author: "Renata S., 42 — Psicóloga",
}

export default function AutoridadeSection() {
  return (
    <Section bg="charcoal">
      <Container>
        <div className="mx-auto max-w-[560px]">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-terracota">
            Para quem é
          </span>

          <ol className="mt-8 flex flex-col divide-y divide-white/[0.06]">
            {TRIGGERS.map((t, idx) => (
              <li key={idx} className="flex gap-5 py-7 md:gap-8 md:py-9">
                <span
                  className="w-7 shrink-0 pt-0.5 font-editorial text-[38px] font-semibold leading-none text-terracota/20 md:text-[46px]"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-editorial text-[19px] font-medium leading-tight text-linen md:text-[22px]">
                    {t.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.75] text-sand/60">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-t border-white/[0.07] pt-10">
            <blockquote>
              <p className="font-editorial text-[20px] italic leading-[1.5] text-sand/90 md:text-[22px]">
                &ldquo;{PULL_QUOTE.text}&rdquo;
              </p>
              <footer className="mt-4 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-terracota">
                {PULL_QUOTE.author}
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </Section>
  )
}
