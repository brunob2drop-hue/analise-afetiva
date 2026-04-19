import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import Card from "@/components/ui/Card"
import FadeIn from "@/components/sales/FadeIn"

/**
 * "O que é" — seção que explica o formato e a proposta do ebook.
 * Três cards curtos com o método (fundamentação, aplicação, método).
 * Fundo dark-card para respirar entre Problema (linen) e 5 Pilares
 * (linen) — cria ritmo de paleta.
 */

const ITENS = [
  {
    kicker: "Fundamentação",
    title: "Ciência aplicada, linguagem direta",
    description:
      "Um recorte rigoroso das principais escolas contemporâneas sobre apego, crença nuclear e condicionamento afetivo — Bowlby, Beck, Young, Porges — escrito sem jargão, para leitura em um final de semana.",
  },
  {
    kicker: "Aplicação",
    title: "5 exercícios guiados",
    description:
      "Cada um dos 5 pilares termina com um exercício escrito, simples e curto, que transforma leitura em intervenção. Você sai do capítulo com uma tarefa concreta feita, não com uma boa intenção.",
  },
  {
    kicker: "Método",
    title: "Do diagnóstico à decisão",
    description:
      "Você começa reconhecendo o roteiro, passa pela gramática do seu apego, encara a química do vício emocional, reescreve a crença nuclear e termina desenhando o novo repertório afetivo.",
  },
]

export default function OQueE() {
  return (
    <Section bg="dark-card">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-12 flex max-w-[56ch] flex-col items-center gap-5 text-center md:mb-16">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              O que é
            </span>
            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-linen md:text-[44px]">
              Não é um livro de autoajuda.
              <br />
              É um <span className="italic text-terracota">protocolo de leitura</span>.
            </h2>
            <p className="font-body text-base text-sand/80 md:text-lg">
              18.000 palavras organizadas em cinco movimentos. Um método
              específico para quebrar a repetição — porque entender por que
              algo acontece é o primeiro passo para parar de acontecer.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ITENS.map((it, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <Card
                variant="dark"
                className="flex h-full flex-col gap-5 border border-terracota/10 p-8"
              >
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-terracota">
                  {it.kicker}
                </span>
                <h3 className="font-editorial text-2xl font-medium leading-tight text-linen">
                  {it.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-sand/75">
                  {it.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
