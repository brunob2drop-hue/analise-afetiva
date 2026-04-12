import Container from "@/components/ui/Container"

/**
 * Faixa estreita de prova social logo abaixo do hero.
 *
 * Usa 3 métricas pequenas (seguidoras, leituras, avaliação) e um
 * divisor editorial. Fundo charcoal curto para criar ritmo visual
 * entre o hero claro e a seção de problema também clara.
 */

const METRICS = [
  { value: "+180k", label: "mulheres acompanhando" },
  { value: "4.9", label: "avaliação média das leitoras" },
  { value: "18k", label: "palavras de conteúdo aplicado" },
]

export default function ProvaSocialRapida() {
  return (
    <section className="bg-charcoal py-8 md:py-10">
      <Container>
        <ul className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          {METRICS.map((m, i) => (
            <li
              key={m.label}
              className="flex items-center gap-4"
            >
              <div className="flex flex-col items-start">
                <span className="font-editorial text-2xl font-semibold text-terracota md:text-3xl">
                  {m.value}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.14em] text-sand/70">
                  {m.label}
                </span>
              </div>
              {i < METRICS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden h-10 w-px bg-sand/15 md:block"
                />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
