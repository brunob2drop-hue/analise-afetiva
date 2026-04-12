import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * "Sobre a autora" — construção de autoridade editorial.
 * Não há foto real (projeto em estágio editorial), então a coluna
 * esquerda exibe um monograma editorial em Cormorant dentro de um
 * círculo terracota. Fundo linen.
 */

const CREDENCIAIS = [
  "Formação em Psicologia Clínica com foco em Teoria do Apego",
  "Especialização em Terapia Cognitivo-Comportamental",
  "+7 anos de prática clínica com mulheres em padrões afetivos repetitivos",
  "+180 mil mulheres acompanhando o trabalho nas redes sociais",
]

export default function SobreAutora() {
  return (
    <Section bg="linen">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          <FadeIn>
            <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center md:h-[260px] md:w-[260px]">
              <div className="absolute inset-0 rounded-full bg-terracota/15 blur-2xl" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-terracota/40 bg-dark-card">
                <span className="font-editorial text-[108px] font-semibold italic leading-none text-terracota md:text-[128px]">
                  Aa
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col items-start gap-6">
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
                Sobre a autora
              </span>

              <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-charcoal md:text-[40px]">
                Quem escreve não é uma
                <br />
                <span className="italic text-terracota">
                  coach de relacionamento
                </span>
                .
              </h2>

              <p className="font-body text-base leading-relaxed text-brown/80 md:text-lg">
                <strong className="font-bold text-charcoal">
                  Análise Afetiva
                </strong>{" "}
                é um projeto editorial dedicado a decifrar padrões afetivos a
                partir de evidência clínica, não de opinião. Aqui, apego não é
                rótulo, autoestima não é decreto e relacionamento seguro não é
                sorte. É engenharia emocional aplicada.
              </p>

              <p className="font-body text-base leading-relaxed text-brown/80 md:text-lg">
                O que você vai ler foi construído ao longo de anos de clínica,
                de leitura das grandes referências (Bowlby, Ainsworth, Beck,
                Young, Porges) e de escuta atenta das milhares de mulheres que
                chegam aqui repetindo o mesmo filme — e saem decidindo
                escrever outro.
              </p>

              <ul className="mt-2 flex flex-col gap-3 border-l-[3px] border-l-terracota pl-5">
                {CREDENCIAIS.map((c, i) => (
                  <li
                    key={i}
                    className="font-body text-sm text-brown/80 md:text-base"
                  >
                    {c}
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
