import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * "Para quem é / Para quem NÃO é" — duas colunas contrastantes.
 * É uma seção de qualificação: serve tanto para atrair o público certo
 * quanto para filtrar cliques ruins (honestidade editorial é conversão).
 * Fundo charcoal.
 */

const IS_FOR = [
  "Mulheres que já fizeram terapia e ainda repetem o padrão — e sabem que o problema não é escolha de parceiro.",
  "Profissionais que lideram em todas as áreas da vida, menos na afetiva — e querem um método, não mais uma dica.",
  "Mães que temem o que estão ensinando sem querer — e querem quebrar o ciclo antes que os filhos herdem.",
  "Recém-divorciadas que não querem recomeçar no mesmo filme, só com outro elenco.",
  "Mulheres que preferem linguagem direta, ciência aplicada e exercícios escritos — ao discurso genérico de autoajuda.",
]

const IS_NOT_FOR = [
  "Quem busca afirmações positivas, decretos ou frases de efeito para sentir melhor sem mudar nada.",
  "Quem quer culpar o parceiro, o ex ou a infância — e não está disposta a olhar para a própria parte da equação.",
  "Quem espera um conteúdo raso de 20 páginas que promete transformação instantânea.",
  "Quem não está disposta a fazer 5 exercícios escritos — a leitura passiva não produz mudança.",
]

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8" stroke="#B89070" strokeWidth="1.5" />
      <path
        d="M5.5 9.5 L 8 12 L 12.5 6.5"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8" stroke="#E8DDD0" strokeOpacity="0.4" strokeWidth="1.5" />
      <path
        d="M6 6 L 12 12 M 12 6 L 6 12"
        stroke="#E8DDD0"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ParaQuem() {
  return (
    <Section bg="charcoal">
      <Container>
        <FadeIn>
          <div className="mb-12 text-center md:mb-16">
            <span className="mb-3 block font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Honestidade editorial
            </span>
            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-linen md:text-[44px]">
              Para quem é este ebook.
              <br />
              <span className="italic text-sand/60">E para quem não é.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <FadeIn>
            <div className="flex h-full flex-col gap-6 rounded-lg border border-terracota/20 bg-dark-card p-8">
              <h3 className="font-editorial text-2xl font-medium text-linen">
                É para você se…
              </h3>
              <ul className="flex flex-col gap-4">
                {IS_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="font-body text-sm leading-relaxed text-sand/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col gap-6 rounded-lg border border-sand/10 bg-transparent p-8">
              <h3 className="font-editorial text-2xl font-medium text-sand/70">
                Não é para você se…
              </h3>
              <ul className="flex flex-col gap-4">
                {IS_NOT_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0">
                      <CrossIcon />
                    </span>
                    <span className="font-body text-sm leading-relaxed text-sand/60">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
