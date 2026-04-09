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
