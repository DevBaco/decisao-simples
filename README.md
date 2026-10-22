# Decisão Simples · Palegio

Landing page de captura da campanha Simples Nacional x Simples Híbrido (2027), em [Astro](https://astro.build).
Gera HTML estático (sem framework JS no cliente), com imagens convertidas para WebP e fonte Manrope auto-hospedada.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ para publicar (Vercel, Netlify, Cloudflare Pages...)
npm run preview  # serve o dist/ localmente
```

## Estrutura

- `src/data.ts` e `src/faq.json`: textos, prazos e listas da página.
- `src/components/`: seções (Hero, Deadline, Reform, Triagem, Offer, Closing, LeadModal).
- `src/styles/global.css`: tokens de cor, tipografia e componentes base.
- `src/scripts/app.ts`: contagem regressiva, pop-up de lead, triagem e animações.

## Configurar o envio dos leads

Copie `.env.example` para `.env`:

- `PUBLIC_LEAD_ENDPOINT`: URL que recebe um POST JSON com `nome`, `email`, `telefone`, `regime`, `origem`, `pagina`, `data` e as UTMs presentes na URL (`utm_*`, `gclid`, `fbclid`). Vazio = os dados não saem do navegador.
- `PUBLIC_MATERIAL_URL`: link do material gratuito mostrado a quem cai no resultado "peso menor" da triagem.
- `PUBLIC_GTM_ID`: opcional, ativa o Google Tag Manager.

Eventos enviados ao `dataLayer`: `generate_lead` e `triagem_resultado`.

## Comportamento

- O pop-up abre ao entrar, uma vez por sessão, e não reaparece depois que o lead é enviado.
- Os botões de compra abrem o pop-up enquanto o lead não foi enviado; depois levam à seção de preço.
- A contagem regressiva vai até 28/10/2026 23:59 (Brasília), definida em `src/data.ts`.
