import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import AnimatedButton from "@/components/ui/AnimatedButton"
import { LINKS } from "@/lib/constants"

export default function ProdutoSection() {
  return (
    <Section bg="linen">
      <Container>
        <div className="mx-auto flex max-w-[480px] flex-col items-center gap-6 text-center">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-terracota">
            O Ebook
          </span>

          <h2 className="font-editorial text-[34px] font-semibold leading-[1.06] text-charcoal md:text-[48px]">
            O Código da
            <br />
            <span className="italic text-terracota">Repetição</span>
          </h2>

          <p className="max-w-[34ch] font-body text-[15px] leading-[1.72] text-muted">
            Cinco pilares para decifrar o padrão que você repete no amor — e
            aprender a reescrever a frase que dirige tudo.
          </p>

          <div className="mt-2 flex flex-col items-center gap-2">
            <AnimatedButton href={LINKS.ebook} external size="lg">
              Quero decifrar meu código
            </AnimatedButton>
            <p className="font-body text-xs tracking-[0.03em] text-brown/55">
              Acesso imediato · 7 dias de garantia · R$ 19,90
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
