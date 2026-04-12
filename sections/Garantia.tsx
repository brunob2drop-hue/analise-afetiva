import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * Garantia de 7 dias — selo circular + texto curto.
 * Remove o risco do clique de compra. Fundo dark-card para criar
 * sensação de "pactos" (o selo contrasta forte).
 */

function GuaranteeSeal() {
  return (
    <div className="relative h-[180px] w-[180px] md:h-[220px] md:w-[220px]">
      <div className="absolute inset-0 rounded-full bg-terracota/15 blur-2xl" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border-2 border-terracota bg-dark-card text-center">
        <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-terracota">
          Garantia
        </span>
        <span className="font-editorial text-[72px] font-semibold leading-none text-terracota md:text-[92px]">
          7
        </span>
        <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-terracota">
          dias
        </span>
      </div>
    </div>
  )
}

export default function Garantia() {
  return (
    <Section bg="dark-card">
      <Container>
        <FadeIn>
          <div className="mx-auto grid max-w-[900px] items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
            <div className="flex justify-center md:justify-start">
              <GuaranteeSeal />
            </div>
            <div className="flex flex-col items-start gap-5 text-left">
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
                Garantia incondicional
              </span>
              <h2 className="font-editorial text-[28px] font-semibold leading-[1.1] text-linen md:text-[40px]">
                Leia com calma.
                <br />
                <span className="italic text-terracota">
                  Se não for para você, eu devolvo seu dinheiro.
                </span>
              </h2>
              <p className="max-w-[56ch] font-body text-base leading-relaxed text-sand/80">
                Você tem 7 dias corridos, a partir da compra, para ler o ebook
                inteiro, fazer os exercícios e decidir. Se o material não
                entregar o que promete, basta enviar um e-mail pedindo o
                reembolso. Devolvemos 100% do valor — sem perguntas, sem
                justificativas, sem burocracia.
              </p>
              <p className="font-body text-sm text-sand/60">
                O risco é todo meu. O seu é apenas de ficar na repetição.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
