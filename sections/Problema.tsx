import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"
import FadeIn from "@/components/sales/FadeIn"

/**
 * Seção "Problema" — usa um bloco editorial com aspas grandes e
 * 4 bullets de dor afetiva. Fundo linen para manter contraste com
 * a faixa charcoal acima.
 */

const BULLETS = [
  "Você reconhece os sinais antes do terceiro encontro — e mesmo assim entra.",
  "Você se pega explicando para amigas o inexplicável dele — de novo.",
  "Você sente que o problema deveria estar resolvido depois de tanta terapia, leitura, autoconhecimento. E não está.",
  "Você tem medo do dia em que vai olhar para trás e contar quantos anos doeu.",
]

export default function Problema() {
  return (
    <Section bg="linen">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-[62ch] flex-col items-start gap-8">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
              O que ninguém te disse
            </span>

            <h2 className="font-editorial text-[30px] font-semibold leading-[1.1] text-charcoal md:text-[44px]">
              Você já sabe diagnosticar o problema.
              <br />
              O que te falta é <span className="italic text-terracota">entender o mecanismo</span>.
            </h2>

            <p className="font-body text-base text-brown/80 md:text-lg">
              Autoconhecimento vira armadilha quando ele te faz especialista no
              seu próprio sofrimento — sem tirar você dele. A diferença entre
              nomear um padrão e quebrar um padrão é técnica. É aprendizado
              estrutural, não força de vontade.
            </p>

            <ul className="mt-2 flex flex-col gap-4 border-l-[3px] border-l-terracota pl-6">
              {BULLETS.map((b, i) => (
                <li
                  key={i}
                  className="font-editorial text-lg italic leading-snug text-charcoal/85 md:text-xl"
                >
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-4 font-body text-base text-brown/80 md:text-lg">
              O Código da Repetição foi escrito para mulheres que já
              entenderam <em>o quê</em> — e agora precisam entender{" "}
              <em>o porquê</em>. E depois, o <em>como sair</em>.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
