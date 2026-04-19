import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import Logo from "@/components/brand/Logo"
import EmailCaptureForm from "./EmailCaptureForm"

export default function BioFooter() {
  return (
    <Section className="pt-10 pb-12">
      <Container>
        <p className="font-sans text-sm text-muted text-center mb-8 max-w-xs mx-auto">
          Um encontro por semana entre você e o que você sente — sem algoritmo, sem ruído.
        </p>

        <EmailCaptureForm />

        <div className="mt-10 flex flex-col items-center gap-3">
          <Logo variant="symbol" size="sm" />
          <p className="font-sans text-xs text-faint">
            © 2026 Analise Afetiva. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </Section>
  )
}
