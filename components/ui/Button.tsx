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
