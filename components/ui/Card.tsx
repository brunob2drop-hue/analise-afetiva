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
