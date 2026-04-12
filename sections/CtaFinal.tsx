import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import AnimatedButton from "@/components/ui/AnimatedButton"
import FadeIn from "@/components/sales/FadeIn"
import { LINKS } from "@/lib/constants"

/**
 * CTA final — último empurrão. Tipografia editorial grande,
 * uma frase direta, um botão pulsante. Fundo charcoal para fechar
 * a página no tom do livro.
 */
export default function CtaFinal() {
  return (
    <Section bg="charcoal">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-[62ch] flex-col items-center gap-8 text-center">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              Última chamada
            </span>

            <h2 className="font-editorial text-[32px] font-semibold leading-[1.05] text-linen md:text-[56px]">
              O próximo capítulo da
              <br />
              sua história afetiva
              <br />
              <span className="italic text-terracota">começa na sua próxima escolha</span>.
            </h2>

            <p className="max-w-[52ch] font-body text-base leading-relaxed text-sand/80 md:text-lg">
              Você pode fechar esta página e seguir com o filme que já conhece.
              Ou pode, por R$ 19,90 e um fim de semana de leitura, começar
              a escrever outro. Eu já escrevi minha parte. A próxima linha é
              sua.
            </p>

            <div className="mt-2 flex flex-col items-center gap-3">
              <AnimatedButton href={LINKS.ebook} external size="lg">
                Quero começar agora — R$ 19,90
              </AnimatedButton>
              <p className="font-body text-xs text-sand/60">
                Acesso imediato · 7 dias de garantia · Pagamento único
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
