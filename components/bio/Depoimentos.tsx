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
    quote: "[PLACEHOLDER: Depoimento #1 — 2 a 4 linhas em voz própria]",
    name: "[PLACEHOLDER: Nome real #1]",
  },
  {
    quote: "[PLACEHOLDER: Depoimento #2 — 2 a 4 linhas em voz própria]",
    name: "[PLACEHOLDER: Nome real #2]",
  },
  {
    quote: "[PLACEHOLDER: Depoimento #3 — 2 a 4 linhas em voz própria]",
    name: "[PLACEHOLDER: Nome real #3]",
  },
  {
    quote: "[PLACEHOLDER: Depoimento #4 — 2 a 4 linhas em voz própria]",
    name: "[PLACEHOLDER: Nome real #4]",
  },
  {
    quote: "[PLACEHOLDER: Depoimento #5 — 2 a 4 linhas em voz própria]",
    name: "[PLACEHOLDER: Nome real #5]",
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
          <h2 className="font-editorial text-[28px] font-semibold text-linen md:text-[40px]">
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
              className="w-[85vw] max-w-[340px] shrink-0 snap-center rounded-lg border-l-[3px] border-l-terracota bg-dark-card p-6 md:w-[45vw] md:max-w-[420px] lg:w-[30vw]"
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
