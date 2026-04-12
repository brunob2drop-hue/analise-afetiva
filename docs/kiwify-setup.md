# Kiwify — Setup do Produto "O Código da Repetição"

Este guia é o passo-a-passo para publicar o ebook na Kiwify e plugar a URL de checkout na landing de vendas.

## Por que não é 100% automático

A **API pública do Kiwify** (`public-api.kiwify.com`) é, na prática, **read-only** para o domínio `products`. Autenticamos com sucesso via `POST /v1/oauth/token` usando `KIWIFY_CLIENT_ID` + `KIWIFY_CLIENT_SECRET`, listamos produtos via `GET /v1/products`, mas **não existe endpoint público para criar produto** — tentativas de `POST /v1/products` retornam 404. A criação é feita uma única vez pelo dashboard web; depois disso, o projeto usa `scripts/kiwify-sync-product.ts` para puxar o `product_id` e atualizar `lib/constants.ts` automaticamente.

---

## 1. Criar o produto no dashboard

1. Entre em <https://dashboard.kiwify.com.br/> com a conta `LDoM58hGpA5ymfV`.
2. **Produtos → Novo produto → Ebook / PDF**.
3. Preencha:

| Campo | Valor |
|---|---|
| Nome | `O Código da Repetição` |
| Subtítulo | `Por que você aceita o amor que acha que merece?` |
| Preço | `R$ 19,90` (pagamento único, à vista) |
| Parcelamento | até 12x (padrão Kiwify) |
| Categoria | Desenvolvimento pessoal |
| Garantia | 7 dias |
| Suporte | e-mail da marca |

4. Faça upload do arquivo do ebook — pode ser o mesmo conteúdo de `docs/ebook.md` convertido para PDF (use por exemplo `pandoc docs/ebook.md -o ebook.pdf` com um template editorial). Os dois bônus (**Guia de Autorresgate Afetivo** e **Mapa do Meu Padrão**) já estão dentro do próprio PDF como Anexo A e Anexo B — **não** precisam ser uploads separados.

## 2. Personalizar o checkout

Na aba **Checkout** do produto recém-criado:

### Visual
- **Logo**: logo da marca (símbolo terracota)
- **Cor primária**: `#B89070` (terracota)
- **Cor de fundo**: `#F7F3EE` (linen)
- **Cor do botão**: `#B89070`
- **Cor do texto do botão**: `#1A1410`

### Capa / banner
Use o SVG de capa incorporado no componente `components/sales/BookMockup.tsx` (fundo charcoal → marrom, com faixa terracota e tipografia Cormorant Garamond "O Código da Repetição"). Exporte como PNG 1080×1350 para uso no checkout.

### Benefícios (5 bullets — colar exatamente)
- Decifrar o roteiro inconsciente que dirige suas relações em 5 pilares aplicados
- Entender a gramática do seu apego e por que você atrai quem atrai
- Protocolo de 7 passos para os momentos de abstinência afetiva (Bônus #1)
- Worksheet guiado de 6 partes para mapear seu padrão completo (Bônus #2)
- 7 dias de garantia incondicional — leitura completa + exercícios sem risco

### Depoimentos (2 — colar exatamente)
1. **Carla M., 38 — Diretora Comercial**
   > "Sempre achei que o problema era a escolha dos parceiros. A Análise Afetiva me mostrou que o código estava na minha permissão, não na sorte. Em 20 minutos, entendi por que aceito menos do que mereço."

2. **Patricia L., 45 — Advogada**
   > "Saí de um casamento longo me sentindo invisível. A Análise Afetiva não focou no ex, focou em por que eu permaneci invisível tanto tempo. Hoje, busco parceria, não salvamento."

### Gatilho de urgência
Ativar o banner do topo com o texto: **"Oferta de lançamento · De R$ 125 por R$ 19,90"**.

### Mobile
Ativar **"Botão fixo no rodapé em mobile"** com texto: **"Quero decifrar meu código — R$ 19,90"**.

### Texto do botão de checkout
`Quero começar agora →`

---

## 3. Capturar o product_id e plugar na landing

Depois de publicar o produto, rode do diretório do projeto:

```bash
# Dry run — só imprime o id e a URL detectados
npx tsx scripts/kiwify-sync-product.ts

# Atualiza lib/constants.ts automaticamente com a URL de checkout
npx tsx scripts/kiwify-sync-product.ts --write
```

O script:
1. Autentica via OAuth.
2. Lista todos os produtos da conta `KIWIFY_ACCOUNT_ID`.
3. Encontra o que casa com `/código da repetição/i`.
4. Usa `checkout_link` da API (se vier) ou monta `https://pay.kiwify.com.br/<id>`.
5. Substitui a linha `ebook: "..."` em `lib/constants.ts` pela URL real.

Depois disso, basta rodar `npx next build` para gerar o build com o link real e publicar na Vercel.

---

## 4. Referências

- [Dashboard Kiwify](https://dashboard.kiwify.com.br/)
- [Docs API pública](https://docs.kiwify.com.br/) (listar produtos, vendas, eventos, webhooks)
- [`scripts/kiwify-sync-product.ts`](../scripts/kiwify-sync-product.ts) — helper de sincronização
- [`lib/constants.ts`](../lib/constants.ts) — onde vive `LINKS.ebook`
