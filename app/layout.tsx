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
