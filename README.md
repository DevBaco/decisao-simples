# Decisão Simples · Palegio

Landing page de captura da campanha Simples Nacional x Simples Híbrido (2027).
HTML estático, sem build: basta publicar a pasta (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Configurar o envio dos leads

No final do `index.html`:

```js
window.PALEGIO = { LEAD_ENDPOINT: '', MATERIAL_URL: '#' };
```

- `LEAD_ENDPOINT`: URL que recebe um POST JSON com `nome`, `email`, `telefone`, `regime`, `origem`, `pagina`, `data` e as UTMs presentes na URL (`utm_*`, `gclid`, `fbclid`). Vazio = os dados não saem do navegador.
- `MATERIAL_URL`: link do material gratuito mostrado a quem cai no resultado "peso menor" da triagem.

Eventos enviados ao `dataLayer` (GTM): `generate_lead` e `triagem_resultado`.

## Comportamento

- O pop-up abre ao entrar, uma vez por sessão, e não reaparece depois que o lead é enviado.
- Os botões de compra abrem o pop-up enquanto o lead não foi enviado; depois levam à seção de preço.
- A contagem regressiva vai até 28/10/2026 23:59 (Brasília).
