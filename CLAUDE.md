\# Projeto: Análise Afetiva



\## Objetivo

Criar landing pages de vendas e links na bio para redes sociais, focados em alta conversão e estética de top agências dos EUA (ref: Awwwards, Dribbble), evitando visual genérico de IA.



\## Stack

\- Next.js 15 (App Router)

\- React Server Components

\- TypeScript

\- Tailwind CSS

\- Deploy Vercel



\## Estrutura

\- app/page.tsx → landing page principal

\- app/link-in-bio/page.tsx → página de link na bio

\- app/api/ → APIs

\- components/ → componentes reutilizáveis (Button, Card, Navbar, Footer)

\- sections/ → blocos da landing (Hero, Benefits, Testimonials, Pricing, FAQ)



\## Guidelines de design

\- Referências visuais: Awwwards (sites completos), Dribbble (UI moderna) – evitar estilos óbvios de “template genérico” de IA.

\- Layout mobile-first, depois desktop.

\- Uso de bastante espaço em branco, tipografia forte, contraste alto.

\- Grid consistente (8px / 4px).

\- Microinterações simples, nada brega (hover suave, transições curtas).

\- Evitar sombras pesadas, gradientes exagerados e glassmorphism genérico.



\## Guidelines de código

\- Usar componentes React pequenos, bem nomeados.

\- Usar Tailwind para layout e estilo.

\- Não usar `any` em TypeScript.

\- Criar cada seção da landing em `sections/` e compor em `app/page.tsx`.



\## Tarefas típicas para Claude

\- Criar/editar seções da landing page.

\- Criar página de link na bio com botões e CTA.

\- Refatorar componentes para mobile-first.

\- Ajustar tipografia, spacing e hierarquia visual com base em referências Awwwards/Dribbble.


## Token Optimization
- Use context7 for all library/framework documentation lookups (Next.js, React, Tailwind, TypeScript)
- Use subagents for tasks with 3+ independent steps (ex: criar secao + refatorar + revisar)
- Prefer code-simplifier before adding large files to context
- Avoid re-reading the same file twice in the same session
