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
