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
