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
