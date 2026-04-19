"use client"

import { useRef, useState } from "react"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

/**
 * Testimonials carousel.
 *
 * Horizontal scroll-snap (CSS-only animation) + client-side tracking
 * of the active index for a dot indicator. Client island because we
 * read scroll position; the cards themselves are static markup.
 *
 * All quotes and names are user-content placeholders, to be filled
 * with real followers of @analiseafetiva post-implementation.
 */

type Depoimento = { quote: string; name: string }

const DEPOIMENTOS: Depoimento[] = [
  {
    quote:
      "Sempre achei que o problema era a escolha dos parceiros. A Análise Afetiva me mostrou que o código estava na minha permissão, não na sorte. Em 20 minutos, entendi por que aceito menos do que mereço. Foi o investimento de R$ 19,90 com maior ROI emocional da minha vida.",
    name: "Carla M., 38 — Diretora Comercial",
  },
  {
    quote:
      "Já li dezenas de livros sobre apego. O diferencial aqui foi a cirurgia nos 5 Pilares. Finalmente dei nome ao que eu sentia mas não conseguia verbalizar na sessão. Li o material três vezes seguidas. É denso e direto.",
    name: "Renata S., 42 — Psicóloga",
  },
  {
    quote:
      "Meu maior medo era meus filhos aprenderem com meu exemplo o que é amor. Decifrar a repetição não foi só sobre mim, foi sobre quebrar um ciclo geracional. A clareza do método me deu a segurança que eu precisava para estabelecer novos limites.",
    name: "Fernanda O., 35 — Empresária",
  },
  {
    quote:
      "Eu atraía quem não podia ficar. O material explicou exatamente onde eu estava sinalizando disponibilidade excessiva. Mudar essa chave mental foi libertador. Não é mágica, é engenharia emocional aplicada.",
    name: "Juliana T., 33 — Arquiteta",
  },
  {
    quote:
      "Saí de um casamento longo me sentindo invisível. A Análise Afetiva não focou no ex, focou em por que eu permaneci invisível tanto tempo. A reconstrução começou ao entender que eu aceitava o amor que achava que merecia. Hoje, busco parceria, não salvamento.",
    name: "Patricia L., 45 — Advogada",
  },
]

export default function Depoimentos() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function handleScroll() {
    const el = scrollerRef.current
    if (!el) return
    // Each card has the same width (snap-center), so:
    // active index ≈ round(scrollLeft / cardWidth)
    const firstCard = el.querySelector<HTMLElement>("[data-dep-card]")
    if (!firstCard) return
    const cardWidth = firstCard.offsetWidth + 16 // + gap-4
    const idx = Math.round(el.scrollLeft / cardWidth)
    if (idx !== active && idx >= 0 && idx < DEPOIMENTOS.length) {
      setActive(idx)
    }
  }

  return (
    <Section bg="charcoal">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-editorial text-[28px] font-semibold italic text-linen md:text-[40px]">
            Elas entenderam o próprio código
          </h2>
        </div>
      </Container>

      {/* Scroller spans full width so cards can scroll past the container edge */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4"
      >
        <ul className="flex w-max gap-4 px-6 md:px-10">
          {DEPOIMENTOS.map((d, idx) => (
            <li
              key={idx}
              data-dep-card
              className="w-[85vw] max-w-[340px] shrink-0 snap-center rounded-[3px] border-l-[3px] border-l-terracota bg-dark-card p-6 md:w-[45vw] md:max-w-[420px] lg:w-[30vw]"
            >
              <p className="font-editorial text-lg italic leading-relaxed text-sand">
                {d.quote}
              </p>
              <p className="mt-4 font-body text-xs font-bold uppercase tracking-[0.15em] text-terracota">
                {d.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Position indicator */}
      <Container>
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {DEPOIMENTOS.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                idx === active ? "w-6 bg-terracota" : "w-1.5 bg-sand/40"
              }`}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
