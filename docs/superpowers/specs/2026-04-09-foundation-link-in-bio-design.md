# Spec: Foundation + Link in Bio

**Data:** 2026-04-09
**Projeto:** Analise Afetiva (analise-afetiva)
**Escopo:** Sub-projeto A (Foundation) + Sub-projeto B (Link in Bio)
**Status:** Aprovada pelo usuário em 2026-04-09, aguardando review do arquivo final

---

## 1. Objetivo

Entregar uma base de design system (tokens, componentes base, utils) e a página `/link-in-bio` pronta pra publicação. Ao final desta spec, o projeto deve ter:

- `app/link-in-bio` renderizando uma página completa, mobile-first, com os 4 botões de hub (Ebook, WhatsApp, TikTok, YouTube) + seções editoriais (Para quem é, 5 Pilares, Depoimentos, Rodapé com captura de e-mail).
- Camada Foundation (tokens CSS, componentes `Button`, `AnimatedButton`, `Card`, `Section`, `Container`, `Logo`, utils) reutilizável pelas specs futuras (landing, produto, checkout, conta).
- Nenhum placeholder oculto: qualquer conteúdo dependente de dados reais do usuário (URLs Kiwify/WhatsApp, depoimentos reais, nomes, 5 Pilares, "Para quem é") fica marcado inline com `[PLACEHOLDER: ...]` no código.

## 2. Contexto e restrições

### Stack real (diferente do que o prompt original assumiu)

- **Next.js 16.2.3** (App Router) — não 15. `AGENTS.md` avisa: "This is NOT the Next.js you know". É obrigação ler os guides relevantes em `node_modules/next/dist/docs/01-app/02-guides/` antes de escrever código que toque fonts, metadata, navigation ou CSS.
- **React 19.2.4** — Server Components e Actions disponíveis.
- **Tailwind CSS 4** — não 3. Configuração via `@theme` no CSS, sem `tailwind.config.js`. `@import "tailwindcss"` no globals.css.
- **TypeScript 5** em modo strict, path alias `@/*` já configurado no `tsconfig.json`.
- **Zero dependências extras instaladas**: sem framer-motion, radix, clsx, ou fontes da marca. Tudo a adicionar nesta spec.
- Git: branch `master`, working tree limpo, 1 commit inicial do create-next-app.

### Fora do escopo explicitamente

- **Kiwify API**: nenhum MCP/credencial configurado nesta sessão. Links do ebook ficam como `[PLACEHOLDER]` em `lib/constants.ts`.
- **Figma API**: sem autenticação nesta sessão. Logo é SVG inline, mockups de produto ficam pra spec futura.
- **Landing page de vendas (`/`)**, **página de produto**, **checkout**, **dashboard da conta**: próximas specs, não esta.
- **Testes automatizados**: zero nesta spec. Verificação manual via dev server + TypeScript + build.
- **Integração ESP (ConvertKit/Mailchimp)**: fora. Form de e-mail usa state local com TODO comment.
- **Pesquisa de referências Awwwards ao vivo**: sem Exa/WebSearch confiável nesta sessão. Aplicamos princípios de landing pages editoriais premium (whitespace generoso, tipografia serif/sans contrastante, ritmo alternado de cor, microinterações sutis, mobile-first) sem copiar layouts específicos.

## 3. Identidade visual (imutável)

```
MARCA:   Analise Afetiva  |  @analiseafetiva
TAG:     Decifrando padrões afetivos. Construindo relações conscientes.
VIBE:    Editorial · Profundo · Acolhedor · Maduro · Íntimo
NÃO É:   dark agressivo · pop colorido · pastel fofo · AI-generated clichê
```

### Paleta (tokens CSS)

| Token              | Hex       | Uso                                    |
|--------------------|-----------|----------------------------------------|
| `--color-charcoal` | `#1A1410` | fundo escuro principal                 |
| `--color-linen`    | `#F7F3EE` | fundo claro principal                  |
| `--color-terracota`| `#B89070` | CTAs, botões, ícones, destaque         |
| `--color-sand`     | `#E8DDD0` | texto em fundos escuros, elementos sec |
| `--color-brown`    | `#4A3728` | texto principal em fundos claros       |
| `--color-dark-card`| `#2A2018` | cards de depoimentos, containers escuros |

### Tipografia

- `--font-editorial`: **Cormorant Garamond** (serif) — títulos, frases de impacto, editorial
- `--font-body`: **DM Sans** (sans) — corpo, botões, labels, UI geral

Importadas via `next/font/google` no `app/layout.tsx`, expostas como CSS variables, consumidas pelo `@theme` do Tailwind 4.

## 4. Arquitetura

### Princípios

1. **Server-first com ilhas cliente**: `page.tsx` e containers estáticos são RSC. `"use client"` só onde há estado, efeito, ou framer-motion.
2. **Tokens via `@theme` do Tailwind 4**: cores, fontes, spacing viram utilitários (`bg-charcoal`, `font-editorial`, `py-section`) sem `tailwind.config.js`.
3. **Zero bibliotecas de ícones**: SVGs inline customizados pra controle total de cor e peso (evita "look" de template).
4. **Zero prop drilling**: `lib/constants.ts` é a única fonte de verdade pra links e textos compartilhados.
5. **Breakpoints**: mobile-first (default = 375px), `md:` = 768px+, `lg:` = 1024px+, target de polish = 1440px desktop.

### Fronteiras RSC vs Client

```
app/link-in-bio/page.tsx          [RSC]   assembla toda a página
├─ BioHeader                      [RSC]   logo + @handle + tagline
├─ BioHero                        [RSC]   headline editorial
├─ LinkBioStack                   [Client] stagger framer-motion dos 4 botões
│  └─ LinkBioButton × 4           [RSC]    variant-driven (visual puro)
├─ ParaQuemE                      [RSC]   3 cards de gatilhos
├─ CincoPilares                   [RSC]   lista numerada editorial
├─ Depoimentos                    [Client] carrossel scroll-snap + indicador
└─ BioFooter                      [RSC]   compõe EmailCaptureForm
   └─ EmailCaptureForm            [Client] form state local
```

Apenas 3 client islands: `LinkBioStack`, `Depoimentos`, `EmailCaptureForm`. Todo o resto é RSC, gera HTML no servidor, mantém o bundle JS pequeno.

## 5. Estrutura de arquivos

```
analise-afetiva/
├── app/
│   ├── layout.tsx                    [edit]     fonts (Cormorant + DM Sans), metadata, body bg
│   ├── page.tsx                      [edit]     stub minimal (spec C substitui)
│   ├── globals.css                   [rewrite]  tokens Analise Afetiva via @theme
│   └── link-in-bio/
│       └── page.tsx                  [new]      RSC, assembla seções B
│
├── components/
│   ├── brand/
│   │   └── Logo.tsx                  [new]      RSC, SVG inline
│   ├── ui/
│   │   ├── Container.tsx             [new]      RSC, max-w wrapper
│   │   ├── Section.tsx               [new]      RSC, padding vertical + bg prop
│   │   ├── Button.tsx                [new]      RSC, variants primary/secondary/ghost
│   │   ├── AnimatedButton.tsx        [new]      "use client", framer-motion pulse
│   │   └── Card.tsx                  [new]      RSC, variants light/dark/outlined
│   └── bio/
│       ├── BioHeader.tsx             [new]      RSC
│       ├── BioHero.tsx               [new]      RSC
│       ├── LinkBioButton.tsx         [new]      RSC, base visual dos 4 botões
│       ├── LinkBioStack.tsx          [new]      "use client", stagger
│       ├── ParaQuemE.tsx             [new]      RSC
│       ├── CincoPilares.tsx          [new]      RSC
│       ├── Depoimentos.tsx           [new]      "use client", scroll-snap
│       ├── BioFooter.tsx             [new]      RSC
│       └── EmailCaptureForm.tsx      [new]      "use client", form state
│
├── lib/
│   ├── constants.ts                  [new]      BRAND, LINKS, SOCIAL
│   └── utils.ts                      [new]      cn() helper
│
├── docs/superpowers/specs/
│   └── 2026-04-09-foundation-link-in-bio-design.md  [this file]
│
├── public/
│   └── (nenhum asset novo — logo é SVG inline)
│
└── package.json                      [edit]     add framer-motion, clsx, tailwind-merge
```

**Total:** 18 arquivos novos + 4 editados + 1 spec. Nenhum arquivo deletado. Ícones SVG ficam inline nos componentes que os usam (sem arquivo `icons.tsx` separado) pra evitar abstração prematura.

## 6. Dependências a adicionar

Instalar com:

```bash
npm install framer-motion clsx tailwind-merge
```

Versões exatas (major) resolvidas pelo registry no momento da instalação, conforme release mais recente compatível com React 19.2. O comando `npm install` sem `@<version>` captura automaticamente a versão major atual e grava no `package.json` + `package-lock.json`. Esperado: `framer-motion` v11+, `clsx` v2+, `tailwind-merge` v2+.

## 7. Tokens CSS (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Cores */
  --color-charcoal:   #1A1410;
  --color-linen:      #F7F3EE;
  --color-terracota:  #B89070;
  --color-sand:       #E8DDD0;
  --color-brown:      #4A3728;
  --color-dark-card:  #2A2018;

  /* Fontes — os --font-cormorant e --font-dm-sans vêm de next/font no layout.tsx */
  --font-editorial:   var(--font-cormorant), ui-serif, Georgia, serif;
  --font-body:        var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
}

html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  background: var(--color-linen);
  color: var(--color-brown);
  font-family: var(--font-body);
}

/* Respeita usuários que preferem menos movimento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

O `@theme` do Tailwind 4 expõe cada `--color-*` automaticamente como utilitários (`bg-charcoal`, `text-linen`, `border-terracota`) e cada `--font-*` como (`font-editorial`, `font-body`). **Nenhum `tailwind.config.js` é criado.**

## 8. Layout root (`app/layout.tsx`) — contrato

```tsx
import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "Analise Afetiva", template: "%s · Analise Afetiva" },
  description: "Decifrando padrões afetivos. Construindo relações conscientes.",
  // openGraph, twitter, etc: a detalhar em spec futura quando /link-in-bio publicar
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh bg-linen text-brown font-body antialiased">{children}</body>
    </html>
  )
}
```

**Verificação obrigatória antes de escrever**: ler `node_modules/next/dist/docs/01-app/02-guides/` relacionados a `fonts` e `metadata` pra validar que a API de `next/font/google` e `Metadata` não mudou no Next 16.

## 9. Camada Foundation — contratos de componentes

### 9.1 `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
```

### 9.2 `lib/constants.ts`

```ts
export const BRAND = {
  name: "Analise Afetiva",
  handle: "@analiseafetiva",
  tagline: "Decifrando padrões afetivos. Construindo relações conscientes.",
} as const

export const LINKS = {
  ebook:    "[PLACEHOLDER: link Kiwify — preencher após criar produto]",
  whatsapp: "[PLACEHOLDER: link comunidade WhatsApp]",
  tiktok:   "https://www.tiktok.com/@analiseafetiva",
  youtube:  "https://www.youtube.com/@analiseafetiva",
} as const

export const isPlaceholder = (url: string): boolean => url.startsWith("[PLACEHOLDER")
```

### 9.3 `components/ui/Button.tsx` (RSC)

```ts
type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md" | "lg"

type ButtonProps = {
  variant?: Variant         // default: "primary"
  size?: Size               // default: "md"
  href?: string             // se presente, renderiza <a>
  external?: boolean        // se true, target="_blank" rel="noopener noreferrer"
  children: React.ReactNode
  className?: string
  "aria-label"?: string
}
```

Classes por variant:
- `primary`: `bg-terracota text-charcoal font-body font-bold`
- `secondary`: `border border-terracota text-terracota bg-transparent`
- `ghost`: `text-brown underline-offset-4 hover:underline`

Classes por size:
- `sm`: `px-4 py-2 text-sm`
- `md`: `px-6 py-3 text-base`
- `lg`: `px-8 py-4 text-lg`

Hover comum: `hover:-translate-y-[1px] hover:opacity-90 transition-all duration-200`.

Se `href` é placeholder (detectado via `isPlaceholder`), renderiza com `href="#"` + `data-placeholder="true"` + comment visível no devtools.

### 9.4 `components/ui/AnimatedButton.tsx` (Client)

```tsx
"use client"
import { motion } from "framer-motion"
import Button from "./Button"

type Props = React.ComponentProps<typeof Button>

// Pulse: scale 1 → 1.01 → 1, shadow 0 → 8px terracota@15% → 0, duration 2.5s, infinite
// Respeita prefers-reduced-motion (framer-motion default)
```

Envelopa `Button` num `motion.div` com keyframes infinitos. Usa apenas `variant="primary"` (falha com outros variants via type narrowing ou runtime warning).

### 9.5 `components/ui/Section.tsx` (RSC)

```ts
type Props = {
  bg?: "linen" | "charcoal" | "dark-card"   // default: "linen"
  as?: "section" | "footer" | "header"       // default: "section"
  children: React.ReactNode
  className?: string
}
```

Classes base: `py-12 md:py-20` + bg token dinâmico. Renderiza com `as` dinâmico.

### 9.6 `components/ui/Container.tsx` (RSC)

```ts
type Props = { children: React.ReactNode; className?: string }
```

Classes: `max-w-[1200px] mx-auto px-6`.

### 9.7 `components/ui/Card.tsx` (RSC)

```ts
type Variant = "light" | "dark" | "outlined"
type Props = { variant?: Variant; children: React.ReactNode; className?: string }
```

- `light`: `bg-linen text-brown`
- `dark`: `bg-dark-card text-sand`
- `outlined`: `border border-terracota bg-transparent text-brown`

Comum: `rounded-lg p-6 shadow-sm`.

### 9.8 `components/brand/Logo.tsx` (RSC)

```ts
type Props = {
  size?: "sm" | "md" | "lg"    // 32 / 48 / 64 px
  variant?: "full" | "symbol"  // símbolo + wordmark, ou só símbolo
  tone?: "light" | "dark"      // controla cor do wordmark
  className?: string
}
```

SVG inline. Símbolo: círculo `fill="#B89070"` + glifo de coração estilizado em `fill="#E8DDD0"` centralizado (duas curvas Bezier formando o topo, triângulo pro V). Wordmark: `font-editorial font-semibold` + cor conforme `tone` (`#1A1410` se light, `#F7F3EE` se dark). `aria-label="Analise Afetiva"`, `role="img"`.

## 10. Camada Link in Bio — contratos e copy

### 10.1 `components/bio/BioHeader.tsx` (RSC)

Logo centralizada (variant `full`, tone `dark` se bg charcoal / light se bg linen) + `@analiseafetiva` em DM Sans 14px `text-terracota` + tagline em Cormorant italic 16px `text-brown` + linha divisória horizontal 1px `border-sand` com max-width 80px centralizada.

Bg: `linen`. Padding: `pt-12 pb-8 md:pt-16 md:pb-10`.

### 10.2 `components/bio/BioHero.tsx` (RSC)

**Copy aprovada (versão enxuta — 1 frase a menos):**

> **Você entende o que sente —**
> **mas não entende por que repete.**
>
> Quando você decifra o código, o filme para de se repetir.

- Headline: `font-editorial font-semibold` 32px mobile / 44px desktop, `text-charcoal`, line-height 1.15, max-w 20ch pra quebra editorial.
- Subhead: `font-body` 16px / 18px desktop, `text-brown/80`, max-w 30ch.
- Alinhamento: centralizado mobile, centralizado desktop.

Bg: `linen`. Padding: `pb-10 md:pb-14`.

### 10.3 `components/bio/LinkBioButton.tsx` (RSC)

```ts
type Variant = "ebook" | "whatsapp" | "tiktok" | "youtube"

type Props = {
  variant: Variant
  title: string
  subtitle: string
  href: string
  leftIcon: React.ReactNode
  rightIcon?: React.ReactNode
  priceBadge?: string                       // "R$ 19,90"
  floatingBadge?: string                    // "🔥 Mais vendido"
}
```

Layout flex: `[ícone 40×40] [título + subtítulo stacked] [seta ou logo]`. Altura mínima 72px, `rounded-xl`, `p-4`, full width. `hover:-translate-y-[2px] hover:shadow-lg transition-all duration-200`.

Classes por variant (visual único):

| Variant     | Background                                     | Border                    | Título (cor/font)                 | Subtítulo (cor)      |
|-------------|------------------------------------------------|---------------------------|-----------------------------------|----------------------|
| `ebook`     | `bg-gradient-to-br from-charcoal to-dark-card` | `border border-terracota` | `text-linen font-editorial`       | `text-sand/80 font-body` |
| `whatsapp`  | `bg-linen`                                     | `border border-sand`      | `text-charcoal font-editorial`    | `text-brown font-body`   |
| `tiktok`    | `bg-charcoal`                                  | `border-none`             | `text-linen font-body font-bold`  | `text-sand/70 font-body` |
| `youtube`   | `bg-linen`                                     | `border border-sand`      | `text-charcoal font-editorial`    | `text-brown font-body`   |

`floatingBadge` (opcional): `absolute -top-2 -right-2 bg-terracota text-charcoal px-3 py-1 rounded-full text-xs font-bold`, com pulse animation sutil (scale 1 ↔ 1.05, 2s infinite) via classe CSS no `globals.css`.

`priceBadge` (opcional): inline no meio-direita, antes do `rightIcon`, `bg-terracota text-charcoal px-3 py-1 rounded-md text-sm font-bold`.

**Tratamento de placeholder:** se `href` começar com `[PLACEHOLDER`, renderiza `<a href="#" data-placeholder="true">` + comentário JSX visível.

### 10.4 `components/bio/LinkBioStack.tsx` (Client)

```tsx
"use client"
import { motion } from "framer-motion"

// Recebe children (os 4 LinkBioButton) e aplica stagger no mount.
// variants: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }
// transition: staggerChildren: 0.15, delayChildren: 0.1
// Cada child wrapped em motion.div com mesmas variants.
```

Os 4 `LinkBioButton` são passados como children RSC (importante: framer-motion faz stagger nos wrappers client, não muda a natureza RSC dos botões).

### 10.5 `components/bio/ParaQuemE.tsx` (RSC)

Seção bg `charcoal`. Título `"Para quem é"` em Cormorant 28px/40px `text-linen`. Grid: 1 col mobile, 3 col desktop. 3 cards (`Card` variant `dark`) com ícone SVG inline terracota + título serif + descrição.

Conteúdo dos 3 cards: `[PLACEHOLDER: título gatilho #1]` / `[PLACEHOLDER: descrição #1]`, repetir 3×. Comentário inline no JSX explica: `{/* TODO: preencher com 3 gatilhos emocionais — ver docs/superpowers/specs/2026-04-09 */}`.

### 10.6 `components/bio/CincoPilares.tsx` (RSC)

Bg `linen`. Título `"Os 5 Pilares do Código da Repetição"` em Cormorant. Lista vertical: número grande Cormorant `text-terracota` (56px mobile / 72px desktop) + título serif `text-charcoal` + descrição DM Sans `text-brown/80`.

Espaçamento vertical generoso entre pilares (`gap-12 md:gap-16`). Cada item max-w 60ch.

Conteúdo: `[PLACEHOLDER: Pilar 1 — título]` / `[PLACEHOLDER: Pilar 1 — descrição]`, repetir 5×.

### 10.7 `components/bio/Depoimentos.tsx` (Client)

Bg `charcoal`. Título `"Elas entenderam o próprio código"` em Cormorant `text-linen`. Carrossel scroll-snap horizontal:

- CSS: `overflow-x-auto scroll-smooth snap-x snap-mandatory`, cada card `snap-center shrink-0 w-[85%] md:w-[45%] lg:w-[30%]`.
- Cards: `Card` variant `dark`, borda left 3px `border-l-terracota`, texto Cormorant italic `text-sand`, nome em DM Sans uppercase tracking-wider `text-terracota`.
- Estado cliente: `useRef` pro container + `useState` do índice visível (detectado via scroll event throttle 100ms). Indicador de posição abaixo (dots ou progress bar fino).

Conteúdo: 5 cards `[PLACEHOLDER: depoimento #1 - texto]` / `[PLACEHOLDER: nome real #1]`, repetir 5×.

### 10.8 `components/bio/BioFooter.tsx` (RSC) + `EmailCaptureForm.tsx` (Client)

Bg `charcoal`. Seção compõe:

**Texto editorial (copy aprovada, 1 frase):**
> Um encontro por semana entre você e o que você sente — sem algoritmo, sem ruído.

**Form (`EmailCaptureForm` client):**
```ts
const [email, setEmail] = useState("")
const [status, setStatus] = useState<"idle" | "error" | "success">("idle")

// onSubmit: valida regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// error: setStatus("error"), mensagem "E-mail inválido" em text-terracota abaixo
// success: setStatus("success"), reset email, mensagem "Obrigada, você está na lista ✨"
// TODO comment: // TODO: conectar a ESP (ConvertKit/Mailchimp) quando configurado
```

Layout: input flex-1 + Button primary. Mobile: stacked. Desktop: inline.

**Bloco redes sociais:** linha de ícones SVG inline (Instagram, TikTok, YouTube) cor `text-sand` hover `text-terracota`, gap 6.

**Copyright:** `text-sand/50 text-xs` centralizado, `"© 2026 Analise Afetiva. Todos os direitos reservados."`

### 10.9 `app/link-in-bio/page.tsx` (RSC)

```tsx
import BioHeader from "@/components/bio/BioHeader"
import BioHero from "@/components/bio/BioHero"
import LinkBioStack from "@/components/bio/LinkBioStack"
import LinkBioButton from "@/components/bio/LinkBioButton"
import ParaQuemE from "@/components/bio/ParaQuemE"
import CincoPilares from "@/components/bio/CincoPilares"
import Depoimentos from "@/components/bio/Depoimentos"
import BioFooter from "@/components/bio/BioFooter"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import { LINKS } from "@/lib/constants"
// Os ícones dos botões (livro, WhatsApp, TikTok, YouTube, setas) ficam inline
// dentro de LinkBioButton.tsx como JSX SVG — sem arquivo icons.tsx separado.

export const metadata = {
  title: "Links",
  description: "Hub oficial Analise Afetiva — ebook, comunidade e conteúdo.",
}

export default function LinkInBioPage() {
  return (
    <main>
      <BioHeader />
      <BioHero />
      <Section bg="linen">
        <Container>
          <LinkBioStack>
            <LinkBioButton variant="ebook"    {...} href={LINKS.ebook}    />
            <LinkBioButton variant="whatsapp" {...} href={LINKS.whatsapp} />
            <LinkBioButton variant="tiktok"   {...} href={LINKS.tiktok}   />
            <LinkBioButton variant="youtube"  {...} href={LINKS.youtube}  />
          </LinkBioStack>
        </Container>
      </Section>
      <ParaQuemE />
      <CincoPilares />
      <Depoimentos />
      <BioFooter />
    </main>
  )
}
```

## 11. Error handling e edge cases

| Caso                            | Tratamento                                                                 |
|---------------------------------|----------------------------------------------------------------------------|
| Link externo                    | `target="_blank" rel="noopener noreferrer"` via prop `external` do Button  |
| URL placeholder                 | `href="#"` + `data-placeholder="true"` + comentário JSX visível no código  |
| E-mail inválido                 | Regex simples no submit, mensagem em `text-terracota` abaixo do input      |
| Mobile 375px overflow           | Todas as medidas testadas no dev, `break-words` em headings longas         |
| prefers-reduced-motion          | CSS global mata animações + framer-motion respeita nativo                  |
| SVG acessibilidade              | `aria-label` + `role="img"` no Logo e ícones decorativos com `aria-hidden` |
| Fonte não carregou              | `display: swap` no next/font + fallback ui-serif / ui-sans-serif           |
| Scroll-snap não suportado       | Graceful degradation — carrossel vira scroll horizontal normal             |

## 12. Verificação (checklist manual pós-implementação)

**Rodar:**
1. `npx tsc --noEmit` → zero erros TypeScript
2. `npm run build` → build passa, zero warnings relevantes
3. `npm run dev` + navegar a `http://localhost:3000/link-in-bio`

**Validar no browser:**
- [ ] Mobile 375px (DevTools): zero overflow horizontal, zero elemento cortado
- [ ] Desktop 1440px: alinhamento editorial, whitespace generoso, ritmo de cor entre seções funcionando
- [ ] Fontes Cormorant Garamond e DM Sans carregando (inspecionar computed styles)
- [ ] Cores da paleta presentes em todas as 6 seções (paleta completa usada)
- [ ] Stagger animation nos 4 botões no primeiro load
- [ ] Hover translate-Y + shadow em cada LinkBioButton
- [ ] Badge flutuante "🔥 Mais vendido" pulsando no botão ebook
- [ ] Carrossel de depoimentos scroll-snap funcionando
- [ ] Form de e-mail: valida inválido, mostra success state, reseta input
- [ ] Links externos (TikTok, YouTube) abrem em nova aba
- [ ] Links placeholder (ebook, whatsapp) têm `data-placeholder="true"` visível no DOM
- [ ] Lighthouse rápido: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90

**Anti-regressão na Foundation:**
- [ ] `components/ui/Button.tsx` renderiza primary/secondary/ghost corretamente
- [ ] `AnimatedButton` pulse anima e respeita reduced motion
- [ ] `Section`, `Container`, `Card` compõem sem vazamentos de estilo
- [ ] `Logo` renderiza full e symbol em ambos os tones

## 13. Entregáveis finais

Ao fim desta spec, o usuário tem:

1. **Arquivos commitados** via git: todos os 17 novos + 4 editados + spec + plan + package-lock.json atualizado.
2. **Comandos pra rodar**: `npm install` (se não rodado) → `npm run dev` → abrir `/link-in-bio`.
3. **Lista explícita de placeholders** pro usuário preencher:
   - `LINKS.ebook` (Kiwify)
   - `LINKS.whatsapp` (comunidade)
   - "Para quem é" — 3 cards (título + descrição cada)
   - "5 Pilares" — 5 itens (título + descrição cada)
   - Depoimentos — 5 cards (texto + nome real cada)
4. **Checklist de verificação** rodado pelo implementador e reportado ao usuário.

## 14. O que NÃO é parte desta spec (próximas specs)

- Landing page de vendas (`/`) — seções Hero, Benefits, HowItWorks, Testimonials, Pricing, FAQ, FinalCTA
- Página de produto (`/produto/analise-afetiva`)
- Checkout UX (`/checkout/analise-afetiva`)
- Dashboard pós-compra (`/conta`)
- Integração Kiwify real
- Figma Design System file e mockups do produto
- Testes automatizados (Playwright/Vitest)
- Integração ESP (ConvertKit/Mailchimp) no form de e-mail
- Metadata OG/Twitter pra social sharing
- Sitemap, robots.txt, analytics

Cada item acima terá sua própria spec quando chegar o momento.
