# Foundation + Link in Bio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the Analise Afetiva design system foundation (tokens, base UI components, Logo) and the fully functional `/link-in-bio` page, mobile-first, ready to publish.

**Architecture:** Next.js 16 App Router, server-first with 3 client islands (stagger animation, scroll-snap carousel, email form). Tailwind CSS 4 using `@theme inline` to consume tokens from `next/font` CSS variables. Zero automated tests — verification is `tsc` + `next build` + manual visual smoke in `next dev`.

**Tech Stack:** Next.js 16.2.3 · React 19.2.4 · TypeScript 5 (strict) · Tailwind CSS 4 · Framer Motion (to install) · `next/font/google` (built-in) · clsx + tailwind-merge (to install).

**Spec reference:** `docs/superpowers/specs/2026-04-09-foundation-link-in-bio-design.md`

---

## Plan-Wide Conventions

Every task that writes code follows this adapted TDD flow (tests are swapped for type/build checks because the spec prohibits automated tests for this slice):

1. **Write the file** — complete code shown in the step
2. **Type-check** — `npx tsc --noEmit` (scoped expectation stated)
3. **(Checkpoint tasks only) Build** — `npm run build`
4. **(Final task only) Visual smoke** — `npm run dev` + checklist
5. **Commit** — stage only the files touched by this task, use the shown message

**Windows shell note:** commands below use Unix syntax (`/`, `&&`). Run them from Git Bash or the repo's integrated terminal (already bash). Path separators in file_path use Windows backslashes when talking to the Write/Edit tools, forward slashes for bash commands.

**Intentional placeholders:** several component files contain `[PLACEHOLDER: ...]` strings. These are **user-content placeholders** (the user fills them post-implementation with real copy, URLs, or testimonial names). They are NOT plan placeholders. The implementer writes them literally as shown.

**Commit messages** follow Conventional Commits: `feat:`, `chore:`, `style:`, `docs:`.

---

## File Structure (target state)

```
analise-afetiva/
├── app/
│   ├── layout.tsx                 [EDIT in Task 3]
│   ├── page.tsx                   [EDIT in Task 4 — stub]
│   ├── globals.css                [REWRITE in Task 2]
│   └── link-in-bio/
│       └── page.tsx               [NEW in Task 23]
│
├── components/
│   ├── brand/
│   │   └── Logo.tsx               [NEW in Task 12]
│   ├── ui/
│   │   ├── Container.tsx          [NEW in Task 7]
│   │   ├── Section.tsx            [NEW in Task 8]
│   │   ├── Card.tsx               [NEW in Task 9]
│   │   ├── Button.tsx             [NEW in Task 10]
│   │   └── AnimatedButton.tsx     [NEW in Task 11]
│   └── bio/
│       ├── BioHeader.tsx          [NEW in Task 14]
│       ├── BioHero.tsx            [NEW in Task 15]
│       ├── LinkBioButton.tsx      [NEW in Task 16]
│       ├── LinkBioStack.tsx       [NEW in Task 17]
│       ├── ParaQuemE.tsx          [NEW in Task 18]
│       ├── CincoPilares.tsx       [NEW in Task 19]
│       ├── Depoimentos.tsx        [NEW in Task 20]
│       ├── EmailCaptureForm.tsx   [NEW in Task 21]
│       └── BioFooter.tsx          [NEW in Task 22]
│
├── lib/
│   ├── utils.ts                   [NEW in Task 5]
│   └── constants.ts               [NEW in Task 6]
│
└── package.json                   [EDIT in Task 1]
```

---

## Task 1: Install runtime dependencies

**Files:**
- Modify: `package.json` (via npm)
- Modify: `package-lock.json` (via npm)

- [ ] **Step 1: Install framer-motion, clsx, tailwind-merge**

Run from repo root:

```bash
npm install framer-motion clsx tailwind-merge
```

Expected: npm resolves latest stable majors compatible with React 19.2. No peer-dep errors. `package.json` gains 3 entries in `dependencies`.

- [ ] **Step 2: Verify install**

```bash
npm list framer-motion clsx tailwind-merge
```

Expected output contains all three with concrete version numbers (no `(empty)` or errors).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion, clsx, tailwind-merge"
```

---

## Task 2: Rewrite `app/globals.css` with Analise Afetiva tokens

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Step 1: Replace entire file content**

Write this exact content to `app/globals.css`:

```css
@import "tailwindcss";

/*
 * Analise Afetiva design tokens.
 * Using `@theme inline` so font tokens can reference runtime CSS vars
 * from next/font (see app/layout.tsx). The `inline` keyword keeps
 * `var(--color-*)` references in the generated utilities instead of
 * copying literal values — required for font vars, safe for colors.
 */
@theme inline {
  --color-charcoal:   #1A1410;
  --color-linen:      #F7F3EE;
  --color-terracota:  #B89070;
  --color-sand:       #E8DDD0;
  --color-brown:      #4A3728;
  --color-dark-card:  #2A2018;

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

/* Accessibility: respect users who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Shared keyframes used by decorative elements (e.g., floating badge pulse) */
@keyframes badge-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.05); }
}

.badge-pulse {
  animation: badge-pulse 2s ease-in-out infinite;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(foundation): replace default CSS with Analise Afetiva tokens"
```

---

## Task 3: Update `app/layout.tsx` with Cormorant + DM Sans and brand metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace entire file content**

Write this exact content to `app/layout.tsx`:

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
  title: {
    default: "Analise Afetiva",
    template: "%s · Analise Afetiva",
  },
  description: "Decifrando padrões afetivos. Construindo relações conscientes.",
  authors: [{ name: "Analise Afetiva" }],
  creator: "Analise Afetiva",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="min-h-dvh bg-linen text-brown font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors. If `next/font/google` throws a type error, the install is broken — re-run Task 1.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(foundation): load Cormorant + DM Sans and set brand metadata"
```

---

## Task 4: Stub `app/page.tsx` as minimal placeholder (spec C will replace it)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace entire file content**

Write this exact content to `app/page.tsx`:

```tsx
import Link from "next/link"

/**
 * Home route stub.
 * The full sales landing page is delivered by sub-project C in a later spec.
 * For now this is a minimal placeholder so the root route compiles and
 * the /link-in-bio page is reachable during development.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-linen px-6 text-center">
      <h1 className="font-editorial text-4xl font-semibold text-charcoal md:text-5xl">
        Analise Afetiva
      </h1>
      <p className="max-w-md font-body text-brown/80">
        Landing page de vendas em construção. Enquanto isso, visite o hub:
      </p>
      <Link
        href="/link-in-bio"
        className="inline-block rounded-full bg-terracota px-6 py-3 font-body text-sm font-bold text-charcoal transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
      >
        Ir para o link na bio →
      </Link>
    </main>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors. (The `bg-linen`, `text-charcoal`, etc. classes are validated by Tailwind at build time, not TypeScript — tsc just verifies the JSX and imports.)

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(foundation): stub home route until sales landing spec ships"
```

---

## Task 5: Create `lib/utils.ts` (cn helper)

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Create the file**

Write this exact content to `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose Tailwind class strings with conditional logic and conflict resolution.
 * `clsx` handles the conditional composition (strings, objects, arrays, falsy).
 * `twMerge` resolves Tailwind utility conflicts (e.g. `px-2 px-4` → `px-4`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts
git commit -m "feat(foundation): add cn() class-merge helper"
```

---

## Task 6: Create `lib/constants.ts` (BRAND + LINKS + placeholder helper)

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create the file**

Write this exact content to `lib/constants.ts`:

```ts
/**
 * Single source of truth for brand strings and external links.
 * Links marked as `[PLACEHOLDER: ...]` must be replaced by the user
 * before publishing — `isPlaceholder()` lets components detect them
 * and render with href="#" + data-placeholder="true".
 */

export const BRAND = {
  name: "Analise Afetiva",
  handle: "@analiseafetiva",
  tagline: "Decifrando padrões afetivos. Construindo relações conscientes.",
} as const

export const LINKS = {
  ebook: "[PLACEHOLDER: link Kiwify — preencher após criar produto]",
  whatsapp: "[PLACEHOLDER: link comunidade WhatsApp]",
  tiktok: "https://www.tiktok.com/@analiseafetiva",
  youtube: "https://www.youtube.com/@analiseafetiva",
  instagram: "https://www.instagram.com/analiseafetiva",
} as const

export function isPlaceholder(url: string): boolean {
  return url.startsWith("[PLACEHOLDER")
}

/**
 * Returns a safe href for an anchor: if the configured link is still a
 * placeholder, return "#" so the browser doesn't break on navigation.
 * Components should also set `data-placeholder="true"` in that case.
 */
export function resolveHref(url: string): string {
  return isPlaceholder(url) ? "#" : url
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(foundation): add BRAND + LINKS constants with placeholder helpers"
```

---

## Task 7: Create `components/ui/Container.tsx`

**Files:**
- Create: `components/ui/Container.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/ui/Container.tsx`:

```tsx
import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Centered max-width wrapper with horizontal padding.
 * Every section of the site drops its content inside a Container to
 * maintain a consistent reading rhythm (1200px desktop target).
 */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6", className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Container.tsx
git commit -m "feat(ui): add Container wrapper (max-w 1200px)"
```

---

## Task 8: Create `components/ui/Section.tsx`

**Files:**
- Create: `components/ui/Section.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/ui/Section.tsx`:

```tsx
import { cn } from "@/lib/utils"

type SectionBg = "linen" | "charcoal" | "dark-card"
type SectionAs = "section" | "footer" | "header" | "div"

type SectionProps = {
  children: React.ReactNode
  bg?: SectionBg
  as?: SectionAs
  className?: string
  id?: string
}

/**
 * Semantic section wrapper with vertical padding and background token.
 * Padding is generous on purpose (48px mobile → 80px desktop) — whitespace
 * is a core part of the editorial aesthetic.
 */
const BG_CLASSES: Record<SectionBg, string> = {
  linen: "bg-linen text-brown",
  charcoal: "bg-charcoal text-sand",
  "dark-card": "bg-dark-card text-sand",
}

export default function Section({
  children,
  bg = "linen",
  as: Tag = "section",
  className,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-12 md:py-20", BG_CLASSES[bg], className)}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Section.tsx
git commit -m "feat(ui): add Section wrapper with bg token + semantic tag"
```

---

## Task 9: Create `components/ui/Card.tsx`

**Files:**
- Create: `components/ui/Card.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/ui/Card.tsx`:

```tsx
import { cn } from "@/lib/utils"

type CardVariant = "light" | "dark" | "outlined"

type CardProps = {
  children: React.ReactNode
  variant?: CardVariant
  className?: string
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  light: "bg-linen text-brown shadow-sm",
  dark: "bg-dark-card text-sand shadow-sm",
  outlined: "border border-terracota bg-transparent text-brown",
}

/**
 * Generic rounded card container used by testimonials, trigger cards,
 * and anywhere we need a boxed content block. Keep variants tight —
 * any new visual style should justify its own variant, not a new prop.
 */
export default function Card({
  children,
  variant = "light",
  className,
}: CardProps) {
  return (
    <div className={cn("rounded-lg p-6", VARIANT_CLASSES[variant], className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Card.tsx
git commit -m "feat(ui): add Card component with light/dark/outlined variants"
```

---

## Task 10: Create `components/ui/Button.tsx`

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/ui/Button.tsx`:

```tsx
import { cn } from "@/lib/utils"
import { isPlaceholder } from "@/lib/constants"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

type CommonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  "aria-label"?: string
}

type AsAnchor = CommonProps & {
  href: string
  external?: boolean
  onClick?: never
  type?: never
}

type AsButton = CommonProps & {
  href?: undefined
  external?: undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
}

type ButtonProps = AsAnchor | AsButton

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-bold " +
  "transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-terracota text-charcoal",
  secondary: "border border-terracota bg-transparent text-terracota",
  ghost: "bg-transparent text-brown underline-offset-4 hover:underline",
}

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

/**
 * Foundation Button used as <a> (when `href` is provided) or <button>.
 * Primary CTAs in the sales landing use <AnimatedButton> instead, which
 * wraps this component in a framer-motion pulse.
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
  } = props

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if ("href" in props && props.href !== undefined) {
    const isPH = isPlaceholder(props.href)
    return (
      <a
        href={isPH ? "#" : props.href}
        data-placeholder={isPH ? "true" : undefined}
        target={props.external && !isPH ? "_blank" : undefined}
        rel={props.external && !isPH ? "noopener noreferrer" : undefined}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors. The discriminated union on `href` means TypeScript forces either `{href, external?}` or `{onClick?, type?}` — not both.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat(ui): add Button (primary/secondary/ghost) with placeholder-safe href"
```

---

## Task 11: Create `components/ui/AnimatedButton.tsx`

**Files:**
- Create: `components/ui/AnimatedButton.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/ui/AnimatedButton.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import Button from "./Button"

type AnimatedButtonProps = React.ComponentProps<typeof Button>

/**
 * Wraps Button in a framer-motion pulse used exclusively for primary
 * conversion CTAs. Respects `prefers-reduced-motion` automatically via
 * framer-motion's default handling — users with reduced motion get
 * a static button.
 *
 * Keyframes:
 *   scale   1 → 1.01 → 1
 *   shadow  0 → 8px terracota@15% → 0
 *   2.5s ease-in-out, infinite
 */
export default function AnimatedButton(props: AnimatedButtonProps) {
  return (
    <motion.div
      className="inline-block"
      animate={{
        scale: [1, 1.01, 1],
        boxShadow: [
          "0 0 0 0 rgba(184, 144, 112, 0)",
          "0 0 0 8px rgba(184, 144, 112, 0.15)",
          "0 0 0 0 rgba(184, 144, 112, 0)",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ borderRadius: 9999 }}
    >
      <Button {...props} />
    </motion.div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors. If framer-motion throws React 19 type errors, check `npm list framer-motion` — must be v11 or later.

- [ ] **Step 3: Commit**

```bash
git add components/ui/AnimatedButton.tsx
git commit -m "feat(ui): add AnimatedButton with framer-motion pulse"
```

---

## Task 12: Create `components/brand/Logo.tsx`

**Files:**
- Create: `components/brand/Logo.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/brand/Logo.tsx`:

```tsx
import { cn } from "@/lib/utils"

type LogoSize = "sm" | "md" | "lg"
type LogoVariant = "full" | "symbol"
type LogoTone = "light" | "dark"

type LogoProps = {
  size?: LogoSize
  variant?: LogoVariant
  tone?: LogoTone
  className?: string
}

const SIZE_PX: Record<LogoSize, number> = { sm: 32, md: 48, lg: 64 }
const SIZE_TEXT: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
}

/**
 * Brand logo rendered as inline SVG so we keep full control of colors
 * and stroke via Tailwind utilities. The glyph is a terracota circle
 * with an abstract heart / drop shape carved out in sand.
 *
 * Variants:
 *   - `symbol`: just the round glyph
 *   - `full`:   glyph + wordmark "Analise Afetiva" in Cormorant
 *
 * Tone affects the wordmark color (light tone → dark wordmark on linen,
 * dark tone → light wordmark on charcoal).
 */
export default function Logo({
  size = "md",
  variant = "full",
  tone = "light",
  className,
}: LogoProps) {
  const px = SIZE_PX[size]
  const wordmarkColor = tone === "light" ? "text-charcoal" : "text-linen"

  const symbol = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Analise Afetiva"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" fill="#B89070" />
      {/*
        Abstract heart / tear drop glyph in sand (#E8DDD0).
        Two top curves meeting at the vertical axis, tapering to a point at the bottom.
      */}
      <path
        d="M32 46 C 22 38, 16 30, 22 22 C 26 17, 32 20, 32 25 C 32 20, 38 17, 42 22 C 48 30, 42 38, 32 46 Z"
        fill="#E8DDD0"
      />
    </svg>
  )

  if (variant === "symbol") {
    return <div className={cn("inline-flex", className)}>{symbol}</div>
  }

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {symbol}
      <span
        className={cn(
          "font-editorial font-semibold tracking-tight",
          SIZE_TEXT[size],
          wordmarkColor
        )}
      >
        Analise Afetiva
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/brand/Logo.tsx
git commit -m "feat(brand): add Logo SVG with full/symbol variants"
```

---

## Task 13: Foundation checkpoint — build + visual smoke + commit tag

**Files:** none new; verification-only task.

- [ ] **Step 1: Full type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors across the whole project.

- [ ] **Step 2: Full production build**

```bash
npm run build
```

Expected: build succeeds. Output shows:
- `app/page.tsx` compiled
- `app/layout.tsx` compiled
- No warnings about missing Tailwind classes (Tailwind 4 would emit a console notice if `bg-charcoal` didn't resolve)
- Route size for `/` is small (just the stub)

If `bg-linen`, `bg-charcoal`, `text-brown`, `font-editorial`, etc. fail with "class not found", the `@theme inline` block in `globals.css` is wrong — re-read Task 2.

- [ ] **Step 3: Dev server smoke (optional but recommended)**

```bash
npm run dev
```

Open `http://localhost:3000/` — you should see the stub home page with Cormorant Garamond for the heading and DM Sans for the paragraph, on a linen background with a terracota CTA. Hit `Ctrl+C` when done.

- [ ] **Step 4: Tag the foundation commit**

No new files to stage (previous tasks already committed). This step just marks the milestone in git log:

```bash
git log --oneline | head -15
```

Expected: last ~12 commits are the foundation work, ending with the Logo commit from Task 12. Keep going — no tag command needed, the message trail is the record.

---

## Task 14: Create `components/bio/BioHeader.tsx`

**Files:**
- Create: `components/bio/BioHeader.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/BioHeader.tsx`:

```tsx
import Logo from "@/components/brand/Logo"
import Container from "@/components/ui/Container"
import { BRAND } from "@/lib/constants"

/**
 * Top of the link-in-bio page: centered logo + handle + tagline + divider.
 * The divider is a thin horizontal line (max-w 80px) that announces the
 * editorial rhythm before the hero.
 */
export default function BioHeader() {
  return (
    <header className="bg-linen pt-12 pb-8 md:pt-16 md:pb-10">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <Logo size="md" variant="full" tone="light" />
          <p className="font-body text-sm text-terracota">{BRAND.handle}</p>
          <p className="max-w-sm text-center font-editorial italic text-brown md:text-lg">
            {BRAND.tagline}
          </p>
          <div className="mt-4 h-px w-20 bg-sand" aria-hidden="true" />
        </div>
      </Container>
    </header>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/BioHeader.tsx
git commit -m "feat(bio): add BioHeader (logo + handle + tagline + divider)"
```

---

## Task 15: Create `components/bio/BioHero.tsx`

**Files:**
- Create: `components/bio/BioHero.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/BioHero.tsx`:

```tsx
import Container from "@/components/ui/Container"

/**
 * Editorial hero. Two short beats:
 *   1. Headline in Cormorant (the question that hooks the reader)
 *   2. One-sentence subhead in DM Sans (the promise)
 *
 * Copy length was tuned down one sentence per block after user review,
 * to avoid overload on 375px screens.
 */
export default function BioHero() {
  return (
    <section className="bg-linen pb-10 md:pb-14">
      <Container>
        <div className="mx-auto flex max-w-[32ch] flex-col items-center gap-5 text-center">
          <h1 className="font-editorial text-[32px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
            Você entende o que sente —
            <br />
            mas não entende por que repete.
          </h1>
          <p className="max-w-[30ch] font-body text-base text-brown/80 md:text-lg">
            Quando você decifra o código, o filme para de se repetir.
          </p>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/BioHero.tsx
git commit -m "feat(bio): add BioHero with editorial headline"
```

---

## Task 16: Create `components/bio/LinkBioButton.tsx` (with inline SVG icons)

**Files:**
- Create: `components/bio/LinkBioButton.tsx`

This is the largest single file in the plan — one shared button component with variant-locked styling and all 4 icons inline as SVG.

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/LinkBioButton.tsx`:

```tsx
import { cn } from "@/lib/utils"
import { isPlaceholder } from "@/lib/constants"

type LinkBioVariant = "ebook" | "whatsapp" | "tiktok" | "youtube"

type LinkBioButtonProps = {
  variant: LinkBioVariant
  title: string
  subtitle: string
  href: string
  priceBadge?: string
  floatingBadge?: string
}

/**
 * Visual shell for the 4 hub buttons on /link-in-bio.
 * Styling is variant-locked (not a free-form `bg` prop) so the visual
 * system stays coherent. Each variant owns its background, border,
 * title/subtitle color, left icon, and right icon.
 *
 * Left icons are inline SVG (40x40). Right icons are inline SVG (24x24).
 * No icon library — maximum control of stroke and color.
 */

/* ============================================================
 * Icon primitives — 40x40 left icons
 * ============================================================ */

function EbookIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 8 C 6 7, 7 6, 8 6 L 18 6 C 19 6, 20 7, 20 8 L 20 32 C 20 33, 19 34, 18 34 L 8 34 C 7 34, 6 33, 6 32 Z"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 8 C 20 7, 21 6, 22 6 L 32 6 C 33 6, 34 7, 34 8 L 34 32 C 34 33, 33 34, 32 34 L 22 34 C 21 34, 20 33, 20 32 Z"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="10" y1="12" x2="16" y2="12" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="10" y1="16" x2="16" y2="16" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="10" y1="20" x2="14" y2="20" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="12" x2="30" y2="12" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="16" x2="30" y2="16" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="20" x2="28" y2="20" stroke="#B89070" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="#128C7E" strokeWidth="1.5" />
      <path
        d="M20 28 C 16 28, 13 25, 13 21 C 13 17, 16 14, 20 14 C 24 14, 27 17, 27 21 C 27 22.5, 26.5 23.9, 25.7 25 L 27 29 L 22.8 27.4 C 21.9 27.8, 21 28, 20 28 Z"
        stroke="#128C7E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 12.5 C 18 10, 15 10.5, 15 13 C 15 15, 17 16.5, 20 18 C 23 16.5, 25 15, 25 13 C 25 10.5, 22 10, 20 12.5 Z"
        fill="#B89070"
      />
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25 8 C 25 11, 27 14, 30 14 L 30 18 C 27.5 18, 25.5 17, 24 15.5 L 24 25 C 24 29.4, 20.4 33, 16 33 C 11.6 33, 8 29.4, 8 25 C 8 20.6, 11.6 17, 16 17 L 16 21 C 13.8 21, 12 22.8, 12 25 C 12 27.2, 13.8 29, 16 29 C 18.2 29, 20 27.2, 20 25 L 20 8 Z"
        fill="#B89070"
      />
      <path
        d="M25 8 C 25 11, 27 14, 30 14 L 30 18 C 27.5 18, 25.5 17, 24 15.5"
        fill="#E8DDD0"
      />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" fill="#B89070" />
      <path d="M17 14 L 28 20 L 17 26 Z" fill="#F7F3EE" />
    </svg>
  )
}

/* ============================================================
 * Right icons — 24x24
 * ============================================================ */

function ArrowRightIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12 L 19 12 M 13 6 L 19 12 L 13 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsappRightMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2 C 6.5 2, 2 6.5, 2 12 C 2 13.8, 2.5 15.5, 3.3 17 L 2 22 L 7.2 20.7 C 8.7 21.4, 10.3 21.8, 12 21.8 C 17.5 21.8, 22 17.3, 22 12 C 22 6.5, 17.5 2, 12 2 Z"
        fill="#128C7E"
      />
      <path
        d="M16.5 14.5 C 16.3 14.4, 15.4 14, 15.2 13.9 C 15 13.8, 14.9 13.8, 14.7 14 C 14.6 14.1, 14.2 14.6, 14.1 14.7 C 14 14.8, 13.9 14.8, 13.7 14.7 C 13.5 14.6, 12.8 14.4, 12 13.7 C 11.4 13.2, 11 12.5, 10.9 12.3 C 10.8 12.1, 10.9 12, 11 11.9 C 11.1 11.8, 11.2 11.7, 11.3 11.5 C 11.4 11.4, 11.4 11.3, 11.5 11.1 C 11.5 11, 11.5 10.9, 11.5 10.8 C 11.4 10.7, 11 9.8, 10.9 9.5 C 10.7 9.2, 10.6 9.2, 10.5 9.2 C 10.4 9.2, 10.3 9.2, 10.1 9.2 C 10 9.2, 9.8 9.3, 9.6 9.5 C 9.4 9.7, 8.9 10.2, 8.9 11.1 C 8.9 12.1, 9.6 13, 9.7 13.1 C 9.8 13.2, 11 15.1, 12.9 15.9 C 13.4 16.1, 13.7 16.2, 14 16.3 C 14.4 16.4, 14.8 16.4, 15.1 16.3 C 15.4 16.3, 16.1 15.9, 16.3 15.4 C 16.5 15, 16.5 14.6, 16.4 14.5 C 16.4 14.5, 16.4 14.5, 16.5 14.5 Z"
        fill="#F7F3EE"
      />
    </svg>
  )
}

function YoutubeRightMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="3" fill="#FF0000" />
      <path d="M10 9 L 16 12 L 10 15 Z" fill="#FFFFFF" />
    </svg>
  )
}

/* ============================================================
 * Variant configuration
 * ============================================================ */

type VariantConfig = {
  shell: string
  titleClass: string
  subtitleClass: string
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
}

const VARIANTS: Record<LinkBioVariant, VariantConfig> = {
  ebook: {
    shell:
      "bg-gradient-to-br from-charcoal to-dark-card border border-terracota",
    titleClass: "font-editorial font-semibold text-linen",
    subtitleClass: "font-body text-sand/80",
    leftIcon: <EbookIcon />,
    rightIcon: <ArrowRightIcon color="#B89070" />,
  },
  whatsapp: {
    shell: "bg-linen border border-sand",
    titleClass: "font-editorial font-medium text-charcoal",
    subtitleClass: "font-body text-brown",
    leftIcon: <WhatsappIcon />,
    rightIcon: <WhatsappRightMark />,
  },
  tiktok: {
    shell: "bg-charcoal",
    titleClass: "font-body font-bold text-linen",
    subtitleClass: "font-body text-sand/70",
    leftIcon: <TiktokIcon />,
    rightIcon: <ArrowRightIcon color="#B89070" />,
  },
  youtube: {
    shell: "bg-linen border border-sand",
    titleClass: "font-editorial font-medium text-charcoal",
    subtitleClass: "font-body text-brown",
    leftIcon: <YoutubeIcon />,
    rightIcon: <YoutubeRightMark />,
  },
}

/* ============================================================
 * Component
 * ============================================================ */

export default function LinkBioButton({
  variant,
  title,
  subtitle,
  href,
  priceBadge,
  floatingBadge,
}: LinkBioButtonProps) {
  const config = VARIANTS[variant]
  const isPH = isPlaceholder(href)
  const safeHref = isPH ? "#" : href
  const isExternal = !isPH

  return (
    <div className="relative">
      {floatingBadge && (
        <span className="badge-pulse absolute -top-2 -right-2 z-10 rounded-full bg-terracota px-3 py-1 font-body text-xs font-bold text-charcoal">
          {floatingBadge}
        </span>
      )}
      <a
        href={safeHref}
        data-placeholder={isPH ? "true" : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "flex min-h-[72px] w-full items-center gap-4 rounded-xl p-4",
          "transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg",
          config.shell
        )}
      >
        <div className="shrink-0">{config.leftIcon}</div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn("text-lg leading-tight", config.titleClass)}>
            {title}
          </span>
          <span className={cn("text-xs leading-snug", config.subtitleClass)}>
            {subtitle}
          </span>
        </div>
        {priceBadge && (
          <span className="shrink-0 rounded-md bg-terracota px-3 py-1 font-body text-sm font-bold text-charcoal">
            {priceBadge}
          </span>
        )}
        <div className="shrink-0">{config.rightIcon}</div>
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/LinkBioButton.tsx
git commit -m "feat(bio): add LinkBioButton with 4 variant-locked designs"
```

---

## Task 17: Create `components/bio/LinkBioStack.tsx`

**Files:**
- Create: `components/bio/LinkBioStack.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/LinkBioStack.tsx`:

```tsx
"use client"

import { motion, type Variants } from "framer-motion"
import { Children } from "react"

type LinkBioStackProps = {
  children: React.ReactNode
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

/**
 * Client island that animates the 4 LinkBioButtons on mount with a
 * stagger reveal (opacity + 12px y-translate). Each child is wrapped
 * in motion.div — the children themselves stay as RSC (LinkBioButton
 * is a server component and we only wrap its serialized JSX).
 *
 * framer-motion respects prefers-reduced-motion by default.
 */
export default function LinkBioStack({ children }: LinkBioStackProps) {
  const items = Children.toArray(children)

  return (
    <motion.ul
      className="flex flex-col gap-4 list-none p-0 m-0"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((child, index) => (
        <motion.li key={index} variants={item} className="list-none">
          {child}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/LinkBioStack.tsx
git commit -m "feat(bio): add LinkBioStack client island (stagger reveal)"
```

---

## Task 18: Create `components/bio/ParaQuemE.tsx`

**Files:**
- Create: `components/bio/ParaQuemE.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/ParaQuemE.tsx`:

```tsx
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

/**
 * "Para quem é" — 3 trigger cards explaining who the ebook speaks to.
 * All 3 titles and descriptions are user-content placeholders marked
 * inline, to be filled post-implementation with real emotional triggers.
 *
 * Layout: 1 col mobile, 3 col desktop. Dark background for editorial
 * contrast with the linen hero above it.
 */

type Trigger = { title: string; description: string }

const TRIGGERS: Trigger[] = [
  {
    // TODO: preencher com gatilho real — ex: "Você repete o mesmo filme?"
    title: "[PLACEHOLDER: Gatilho emocional #1 — título]",
    description:
      "[PLACEHOLDER: Descrição do primeiro perfil de leitora — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Gatilho emocional #2 — título]",
    description:
      "[PLACEHOLDER: Descrição do segundo perfil de leitora — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Gatilho emocional #3 — título]",
    description:
      "[PLACEHOLDER: Descrição do terceiro perfil de leitora — 2 a 3 linhas]",
  },
]

function TriggerIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" stroke="#B89070" strokeWidth="1.5" />
      <path
        d="M16 10 L 16 17 M 16 21 L 16 22"
        stroke="#B89070"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ParaQuemE() {
  return (
    <Section bg="charcoal">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-editorial text-[28px] font-semibold text-linen md:text-[40px]">
            Para quem é
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRIGGERS.map((t, idx) => (
            <Card key={idx} variant="dark" className="flex flex-col gap-4">
              <TriggerIcon />
              <h3 className="font-editorial text-xl font-medium text-linen">
                {t.title}
              </h3>
              <p className="font-body text-sm text-sand/80">{t.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/ParaQuemE.tsx
git commit -m "feat(bio): add ParaQuemE section with 3 trigger cards"
```

---

## Task 19: Create `components/bio/CincoPilares.tsx`

**Files:**
- Create: `components/bio/CincoPilares.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/CincoPilares.tsx`:

```tsx
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

/**
 * "Os 5 Pilares do Código da Repetição" — editorial numbered list.
 * Big terracota numbers in Cormorant + serif title + sans description.
 * All 5 titles and descriptions are user-content placeholders.
 */

type Pilar = { title: string; description: string }

const PILARES: Pilar[] = [
  {
    title: "[PLACEHOLDER: Pilar 1 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 1 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 2 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 2 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 3 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 3 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 4 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 4 — 2 a 3 linhas]",
  },
  {
    title: "[PLACEHOLDER: Pilar 5 — título curto]",
    description: "[PLACEHOLDER: Descrição do pilar 5 — 2 a 3 linhas]",
  },
]

export default function CincoPilares() {
  return (
    <Section bg="linen">
      <Container>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-editorial text-[28px] font-semibold text-charcoal md:text-[40px]">
            Os 5 Pilares do Código da Repetição
          </h2>
        </div>
        <ol className="flex flex-col gap-12 md:gap-16">
          {PILARES.map((p, idx) => (
            <li
              key={idx}
              className="mx-auto flex w-full max-w-[60ch] flex-col items-start gap-3 md:flex-row md:items-baseline md:gap-8"
            >
              <span
                className="font-editorial text-[56px] font-semibold leading-none text-terracota md:text-[72px]"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-editorial text-2xl font-medium text-charcoal md:text-3xl">
                  {p.title}
                </h3>
                <p className="font-body text-base text-brown/80">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/CincoPilares.tsx
git commit -m "feat(bio): add CincoPilares numbered editorial list"
```

---

## Task 20: Create `components/bio/Depoimentos.tsx`

**Files:**
- Create: `components/bio/Depoimentos.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/Depoimentos.tsx`:

```tsx
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
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/Depoimentos.tsx
git commit -m "feat(bio): add Depoimentos carousel with scroll-snap + dot indicator"
```

---

## Task 21: Create `components/bio/EmailCaptureForm.tsx`

**Files:**
- Create: `components/bio/EmailCaptureForm.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/EmailCaptureForm.tsx`:

```tsx
"use client"

import { useState, type FormEvent } from "react"

type Status = "idle" | "error" | "success"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Email capture form with local state only.
 * On submit: validates the email, shows a success message, clears input.
 *
 * TODO: connect to an ESP (ConvertKit / Mailchimp / Resend) when the
 * credentials are configured. Until then, the submission is a no-op
 * aside from the success confirmation.
 */
export default function EmailCaptureForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus("error")
      return
    }
    // TODO: POST email to ESP here.
    setStatus("success")
    setEmail("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3"
      noValidate
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          required
          placeholder="seu melhor e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== "idle") setStatus("idle")
          }}
          aria-label="Seu e-mail"
          className="flex-1 rounded-full border border-sand/30 bg-transparent px-5 py-3 font-body text-sm text-linen placeholder:text-sand/50 focus:border-terracota focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-terracota px-6 py-3 font-body text-sm font-bold text-charcoal transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
        >
          Entrar na lista
        </button>
      </div>
      {status === "error" && (
        <p className="font-body text-xs text-terracota" role="alert">
          E-mail inválido. Confere e tenta de novo.
        </p>
      )}
      {status === "success" && (
        <p className="font-body text-xs text-sand/80" role="status">
          Obrigada, você está na lista ✨
        </p>
      )}
    </form>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/EmailCaptureForm.tsx
git commit -m "feat(bio): add EmailCaptureForm with local-state validation"
```

---

## Task 22: Create `components/bio/BioFooter.tsx`

**Files:**
- Create: `components/bio/BioFooter.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `components/bio/BioFooter.tsx`:

```tsx
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import Logo from "@/components/brand/Logo"
import EmailCaptureForm from "./EmailCaptureForm"
import { LINKS, resolveHref, isPlaceholder } from "@/lib/constants"

/**
 * Bottom of the link-in-bio page:
 *  - Editorial copy hook (one sentence, per approved copy)
 *  - Email capture form (client island)
 *  - Social icons row
 *  - Brand symbol + copyright
 */

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}

function TiktokMiniIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 3 C 14 5, 15.5 7, 17.5 7 L 17.5 9.5 C 16 9.5, 14.7 9, 13.7 8 L 13.7 14.5 C 13.7 17, 11.7 19, 9.2 19 C 6.7 19, 4.7 17, 4.7 14.5 C 4.7 12, 6.7 10, 9.2 10 L 9.2 12.5 C 8 12.5, 7 13.5, 7 14.5 C 7 15.7, 8 16.5, 9.2 16.5 C 10.4 16.5, 11.2 15.7, 11.2 14.5 L 11.2 3 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YoutubeMiniIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8 L 14 11 L 9 14 Z" fill="currentColor" />
    </svg>
  )
}

type SocialItem = {
  href: string
  label: string
  icon: React.ReactNode
}

export default function BioFooter() {
  const socials: SocialItem[] = [
    { href: LINKS.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: LINKS.tiktok, label: "TikTok", icon: <TiktokMiniIcon /> },
    { href: LINKS.youtube, label: "YouTube", icon: <YoutubeMiniIcon /> },
  ]

  return (
    <Section as="footer" bg="charcoal">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="max-w-md font-editorial text-xl italic leading-snug text-sand md:text-2xl">
            Um encontro por semana entre você e o que você sente — sem
            algoritmo, sem ruído.
          </p>

          <EmailCaptureForm />

          <div className="flex items-center gap-6 pt-4">
            {socials.map((s) => {
              const ph = isPlaceholder(s.href)
              return (
                <a
                  key={s.label}
                  href={resolveHref(s.href)}
                  data-placeholder={ph ? "true" : undefined}
                  target={ph ? undefined : "_blank"}
                  rel={ph ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="text-sand transition-colors duration-200 hover:text-terracota"
                >
                  {s.icon}
                </a>
              )
            })}
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <Logo size="sm" variant="symbol" />
            <p className="font-body text-xs text-sand/50">
              © 2026 Analise Afetiva. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add components/bio/BioFooter.tsx
git commit -m "feat(bio): add BioFooter with email form, social icons, copyright"
```

---

## Task 23: Create `app/link-in-bio/page.tsx` (assemble everything)

**Files:**
- Create: `app/link-in-bio/page.tsx`

- [ ] **Step 1: Create the file**

Write this exact content to `app/link-in-bio/page.tsx`:

```tsx
import type { Metadata } from "next"
import BioHeader from "@/components/bio/BioHeader"
import BioHero from "@/components/bio/BioHero"
import LinkBioStack from "@/components/bio/LinkBioStack"
import LinkBioButton from "@/components/bio/LinkBioButton"
import ParaQuemE from "@/components/bio/ParaQuemE"
import CincoPilares from "@/components/bio/CincoPilares"
import Depoimentos from "@/components/bio/Depoimentos"
import BioFooter from "@/components/bio/BioFooter"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import { LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Links",
  description:
    "Hub oficial Analise Afetiva — ebook, comunidade, TikTok e YouTube.",
}

/**
 * /link-in-bio — the mobile-first hub linked from Instagram and other
 * bio links. Server-rendered with 3 client islands (LinkBioStack,
 * Depoimentos, EmailCaptureForm inside BioFooter).
 */
export default function LinkInBioPage() {
  return (
    <main>
      <BioHeader />
      <BioHero />

      <Section bg="linen" className="pt-0 pb-10 md:pb-14">
        <Container>
          <div className="mx-auto w-full max-w-md">
            <LinkBioStack>
              <LinkBioButton
                variant="ebook"
                title="O Código da Repetição"
                subtitle="Por que você aceita o amor que acha que merece?"
                href={LINKS.ebook}
                priceBadge="R$ 19,90"
                floatingBadge="🔥 Mais vendido"
              />
              <LinkBioButton
                variant="whatsapp"
                title="Comunidade Analise Afetiva"
                subtitle="Insights e geração de valor — Gratuito"
                href={LINKS.whatsapp}
              />
              <LinkBioButton
                variant="tiktok"
                title="@analiseafetiva"
                subtitle="Conteúdo diário sobre padrões afetivos"
                href={LINKS.tiktok}
              />
              <LinkBioButton
                variant="youtube"
                title="Canal no YouTube"
                subtitle="Vídeos longos sobre relacionamentos"
                href={LINKS.youtube}
              />
            </LinkBioStack>
          </div>
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

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors. If any `@/components/bio/*` import fails, re-check the file names from Tasks 14–22.

- [ ] **Step 3: Commit**

```bash
git add app/link-in-bio/page.tsx
git commit -m "feat(bio): assemble /link-in-bio page"
```

---

## Task 24: Final verification (build + dev smoke + visual checklist + report)

**Files:** none new; verification and report.

- [ ] **Step 1: Full production build**

```bash
npm run build
```

Expected:
- Build succeeds with zero errors.
- Two routes reported: `/` (stub) and `/link-in-bio` (main deliverable).
- `/link-in-bio` route size includes the JS for the 3 client islands (LinkBioStack, Depoimentos, EmailCaptureForm) but the initial HTML is server-rendered.
- Zero warnings about unknown Tailwind classes.

If build fails with an unknown class like `bg-dark-card`, try the arbitrary-value escape: replace it with `bg-[var(--color-dark-card)]` in the offending file. This is a known Tailwind 4 quirk with multi-word token names — `@theme` should convert it but if the util doesn't register, arbitrary values always work.

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Wait for "Ready in Xs" and the local URL (usually `http://localhost:3000`).

- [ ] **Step 3: Visual checklist — mobile (375px)**

Open `http://localhost:3000/link-in-bio` in your browser. Open DevTools, set device emulation to iPhone SE (375×667) or equivalent. Walk through this checklist:

- [ ] No horizontal overflow anywhere (scroll bar at bottom should be absent)
- [ ] BioHeader: Logo centered, handle `@analiseafetiva` in terracota, tagline italic, divider visible below
- [ ] BioHero: headline in Cormorant wraps across two lines as designed, subhead in DM Sans
- [ ] The 4 link buttons appear with stagger animation on first load (opacity + slide-up, ~150ms delay between each)
- [ ] Ebook button (first): charcoal gradient, terracota border, "R$ 19,90" badge visible, "🔥 Mais vendido" floating badge pulsing
- [ ] WhatsApp button: linen bg, sand border, WhatsApp mark on right in #128C7E
- [ ] TikTok button: charcoal bg, arrow on right in terracota
- [ ] YouTube button: linen bg, red YouTube rectangle on right
- [ ] Hover on any button: lifts 2px, adds shadow (may not trigger on touch emulation — try with real mouse)
- [ ] ParaQuemE: dark background, 1 column, 3 cards stacked, placeholder text visible
- [ ] CincoPilares: linen background, 5 numbered items (01–05) with huge terracota numbers
- [ ] Depoimentos: dark background, horizontal scroll of 5 cards, first card visible, dots indicator below
- [ ] Scroll the Depoimentos carousel left/right: active dot shifts accordingly
- [ ] BioFooter: editorial quote, email input + button, 3 social icons in sand → hover terracota, small Logo symbol + copyright

- [ ] **Step 4: Visual checklist — desktop (1440px)**

Switch DevTools emulation to "Responsive" and size to 1440×900:

- [ ] Content stays centered at max 1200px with generous side whitespace
- [ ] ParaQuemE: 3 cards in a row
- [ ] CincoPilares: numbers sit inline with titles (md:flex-row)
- [ ] Depoimentos: multiple cards visible, still snap-able
- [ ] All fonts render as Cormorant Garamond (headings) and DM Sans (body)

- [ ] **Step 5: Form sanity check**

In BioFooter, type an invalid email (`asdf`) and submit: red error appears. Type a valid email (`foo@bar.com`) and submit: success message appears, input clears.

- [ ] **Step 6: External links sanity**

Click "TikTok" button: opens `https://www.tiktok.com/@analiseafetiva` in a new tab. Click YouTube: same thing for YouTube. Click "Ebook" or "WhatsApp": does NOT navigate (href="#"). Inspect the element and confirm `data-placeholder="true"` is set.

- [ ] **Step 7: DevTools accessibility + Lighthouse (quick pass)**

In DevTools → Lighthouse tab → run an audit for `/link-in-bio` with mobile preset. Target scores (this is a smoke test, not a gate — report what you see):
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

If Accessibility is below 90, the most likely culprits are: missing alt text on SVGs (we set `aria-hidden` everywhere, which is intentional for decorative SVGs, but double-check Logo has `aria-label`), missing form labels (the email input has `aria-label="Seu e-mail"`), or contrast ratios (unlikely — our palette is high-contrast).

- [ ] **Step 8: Stop dev server**

`Ctrl+C` in the terminal running `npm run dev`.

- [ ] **Step 9: Final commit (if any dangling files)**

```bash
git status --short
```

Expected: clean tree, or only the user's unrelated CLAUDE.md change. Do not commit CLAUDE.md unless the user asked.

- [ ] **Step 10: Report to user**

Write a brief summary to the user containing:
1. All routes created: `/` (stub) and `/link-in-bio`
2. Full list of `[PLACEHOLDER: ...]` items the user needs to fill:
   - `lib/constants.ts` → `LINKS.ebook`, `LINKS.whatsapp`
   - `components/bio/ParaQuemE.tsx` → 3 trigger titles + descriptions
   - `components/bio/CincoPilares.tsx` → 5 pilar titles + descriptions
   - `components/bio/Depoimentos.tsx` → 5 quote + name pairs
3. Lighthouse scores observed
4. Any build warnings encountered and how they were resolved
5. Command to run locally: `npm run dev` → `http://localhost:3000/link-in-bio`
6. Reminder: the sales landing page (`/`) is a stub. Next spec delivers the full landing.

---

## Appendix: Troubleshooting Cheatsheet

**Tailwind class not applied (e.g., `bg-charcoal` renders as default):**
- Verify `app/globals.css` uses `@theme inline` (not just `@theme`)
- Verify the color token name matches exactly (case + hyphens)
- Fallback: use arbitrary value `bg-[var(--color-charcoal)]`

**`next/font/google` throws at build:**
- Network required at build time for first download (Next caches locally after)
- Re-run `npm install` to ensure `next` package is complete

**`framer-motion` type errors with React 19:**
- `npm list framer-motion` should show v11.0.0 or later
- If older, `npm install framer-motion@latest`

**`@/lib/utils` import not found:**
- Check `tsconfig.json` has `"paths": { "@/*": ["./*"] }` (it does by default in create-next-app)

**Scroll-snap not smooth on Safari:**
- Known Safari quirk with `scroll-snap-type: x mandatory` during programmatic scroll. Manual scroll works fine. Acceptable for this release.

**Build complains about `viewTransition` or `unstable_instant`:**
- We intentionally did not use these. If anything references them, it was an error in implementation — remove.
