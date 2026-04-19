"use client"
import { useRef, useState } from "react"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

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
    const firstCard = el.querySelector<HTMLElement>("[data-dep-card]")
    if (!firstCard) return
    const cardWidth = firstCard.offsetWidth + 16
    const idx = Math.round(el.scrollLeft / cardWidth)
    if (idx !== active && idx >= 0 && idx < DEPOIMENTOS.length) {
      setActive(idx)
    }
  }

  return (
    <Section>
      <Container>
        <h2 className="font-serif text-2xl text-center mb-8">
          Elas entenderam o próprio código
        </h2>
      </Container>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {DEPOIMENTOS.map((d, idx) => (
          <li
            key={idx}
            data-dep-card
            className="list-none snap-center shrink-0 w-[min(320px,80vw)] bg-surface rounded-xl p-6 flex flex-col gap-4"
          >
            <p className="font-sans text-sm text-muted leading-relaxed">{d.quote}</p>
            <p className="font-sans text-xs text-faint">{d.name}</p>
          </li>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {DEPOIMENTOS.map((_, idx) => (
          <span
            key={idx}
            className={`block w-1.5 h-1.5 rounded-full transition-colors ${
              idx === active ? "bg-terracota" : "bg-divider"
            }`}
          />
        ))}
      </div>
    </Section>
  )
}
