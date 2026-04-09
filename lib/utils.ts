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
