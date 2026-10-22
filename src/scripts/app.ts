// Interações da landing: contagem regressiva, pop-up de lead, triagem e animações.
import { DEADLINES } from '../data';

declare global { interface Window { dataLayer: Record<string, unknown>[] } }

const LEAD_ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT || '';
const MATERIAL_URL = import.meta.env.PUBLIC_MATERIAL_URL || '#';
const KEY = 'palegio_lead_ok';
const SEEN = 'palegio_popup_visto';

const store = {
  get: (s: Storage, k: string) => { try { return s.getItem(k); } catch { return null; } },
  set: (s: Storage, k: string, v: string) => { try { s.setItem(k, v); } catch { /* storage bloqueado */ } },
};
const track = (ev: Record<string, unknown>) => { (window.dataLayer = window.dataLayer || []).push(ev); };
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;

let sent = store.get(localStorage, KEY) === '1';

/* ===== Contagem regressiva ===== */
const target = new Date(DEADLINES.adesao).getTime();
const pad = (n: number) => String(n).padStart(2, '0');
function tick() {
  const d = Math.max(0, target - Date.now());
  const v: Record<string, string> = { d: pad(Math.floor(d / 864e5)), h: pad(Math.floor(d / 36e5) % 24), m: pad(Math.floor(d / 6e4) % 60) };
  document.querySelectorAll<HTMLElement>('[data-cd]').forEach((el) => { el.textContent = v[el.dataset.cd!]; });
}
tick(); setInterval(tick, 30_000);

/* ===== Pop-up ===== */
const modal = $<HTMLDialogElement>('#lead-modal');
function openModal() {
  if (modal.open) return;
  $('#lead-form').hidden = sent; $('#lead-ok').hidden = !sent;
  modal.showModal();
}
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t.closest('[data-open]')) {
    e.preventDefault();
    if (sent) location.hash = '#preco'; else openModal();
    return;
  }
  if (t.closest('[data-close]')) modal.close();
});
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

if (!sent && !store.get(sessionStorage, SEEN)) {
  setTimeout(() => { store.set(sessionStorage, SEEN, '1'); openModal(); }, 1200);
}

/* ===== Formulário ===== */
const form = $<HTMLFormElement>('#lead-form');
const tel = form.elements.namedItem('telefone') as HTMLInputElement;
const err = $('#lead-error');
tel.addEventListener('input', () => {
  const d = tel.value.replace(/\D/g, '').slice(0, 11);
  let o = d;
  if (d.length > 6) o = `(${d.slice(0, 2)}) ${d.length > 10 ? d.slice(2, 7) + '-' + d.slice(7) : d.slice(2, 6) + '-' + d.slice(6)}`;
  else if (d.length > 2) o = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  else if (d.length) o = `(${d}`;
  tel.value = o;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const data: Record<string, string> = {
    nome: String(f.get('nome') || '').trim(),
    email: String(f.get('email') || '').trim(),
    telefone: String(f.get('telefone') || '').trim(),
    regime: String(f.get('regime') || ''),
    origem: 'decisaosimples', pagina: location.href, data: new Date().toISOString(),
  };
  const p = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach((k) => { const v = p.get(k); if (v) data[k] = v; });

  let msg = '';
  if (data.nome.length < 3) msg = 'Informe seu nome.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) msg = 'Informe um e-mail válido.';
  else if (data.telefone.replace(/\D/g, '').length < 10) msg = 'Informe um telefone com DDD.';
  else if (!data.regime) msg = 'Selecione o regime tributário da empresa.';
  err.textContent = msg; err.hidden = !msg;
  if (msg) return;

  const btn = $<HTMLButtonElement>('button[type=submit]', form);
  const label = btn.innerHTML;
  btn.disabled = true; btn.textContent = 'Enviando...';
  track({ event: 'generate_lead', regime: data.regime });

  try {
    if (LEAD_ENDPOINT) {
      const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(String(r.status));
    }
    sent = true; store.set(localStorage, KEY, '1');
    $('#lead-first').textContent = ', ' + data.nome.split(/\s+/)[0];
    form.hidden = true; $('#lead-ok').hidden = false;
    $<HTMLAnchorElement>('#lead-ok a').focus();
    renderTri();
  } catch {
    err.textContent = 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.'; err.hidden = false;
  } finally {
    btn.disabled = false; btn.innerHTML = label;
  }
});

/* ===== Triagem (3 perguntas) ===== */
const QS = [
  { q: 'Para quem sua empresa vende produtos ou presta serviços principalmente?', o: ['Principalmente para outras empresas', 'Principalmente para pessoas físicas', 'Para empresas e pessoas físicas em proporções semelhantes', 'Não sei informar'], pts: [2, 0, 1, 0] },
  { q: 'Quando sua empresa vende para outras empresas, a possibilidade de o cliente aproveitar créditos tributários é importante na negociação?', o: ['Sim', 'Para alguns clientes', 'Não', 'Não sei informar'], pts: [2, 1, 0, 0] },
  { q: 'Uma parte relevante dos gastos da sua empresa é com compras de mercadorias, insumos ou contratação de serviços de outras empresas?', o: ['Sim, representa uma parte relevante dos gastos', 'Sim, mas representa uma parte pequena', 'Não, os gastos estão concentrados principalmente em salários e folha de pagamento', 'Não sei informar'], pts: [2, 1, 0, 0] },
];
const ans: number[] = [];
const box = $('#tri');
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

function renderTri(focus = false) {
  const step = ans.length;
  let h = '';
  if (step < QS.length) {
    const cur = QS[step];
    h += `<div class="tri-top"><p class="tri-step">Pergunta ${step + 1} de ${QS.length}</p><div class="tri-bar" aria-hidden="true"><i style="width:${Math.round((step / QS.length) * 100)}%"></i></div></div>`;
    h += `<h3 class="tri-q" tabindex="-1">${esc(cur.q)}</h3><div class="opts">`;
    cur.o.forEach((l, i) => { h += `<button type="button" class="opt" data-a="${i}">${esc(l)}</button>`; });
    h += '</div>' + (step ? '<button type="button" class="back" data-back>← Voltar</button>' : '');
  } else {
    const score = ans.reduce((t, a, i) => t + QS[i].pts[a], 0);
    const fit = ans[0] !== 1 && ans[0] !== 3 && score >= 4;
    track({ event: 'triagem_resultado', resultado: fit ? 'enquadra' : 'peso_menor' });
    h += `<p class="res-k${fit ? ' fit' : ''}">Resultado da triagem</p>`;
    if (fit) {
      h += '<h3 class="tri-q res-t" tabindex="-1">O perfil tem tudo a ver com essa análise</h3><p class="res-d">Pela resposta, a empresa tem tudo a ver com essa análise. Vamos ao diagnóstico.</p>';
      h += `<div class="res-ctas"><a href="#preco" class="btn" ${sent ? '' : 'data-open'}>Quero meu diagnóstico e plano de ação ${ARROW}</a>`;
    } else {
      h += '<h3 class="tri-q res-t" tabindex="-1">Neste momento, o peso da decisão tende a ser menor para esse perfil</h3><p class="res-d">Pelo perfil, a decisão sobre o regime híbrido tende a ter um peso menor neste momento. Preparamos um material gratuito com o essencial da Reforma para esse caso.</p>';
      h += '<div class="res-ctas">' + (sent
        ? `<a href="${esc(MATERIAL_URL)}" class="btn" target="_blank" rel="noopener">Baixar o material gratuito ${ARROW}</a>`
        : `<button type="button" class="btn" data-open>Baixar o material gratuito ${ARROW}</button>`);
    }
    h += '<button type="button" class="back" data-reset>Refazer a triagem</button></div>';
  }
  box.innerHTML = h;
  if (focus) box.querySelector<HTMLElement>('.tri-q')?.focus({ preventScroll: true });
}
box.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const opt = t.closest<HTMLElement>('[data-a]');
  if (opt) { ans.push(Number(opt.dataset.a)); renderTri(true); return; }
  if (t.closest('[data-back]')) { ans.pop(); renderTri(true); return; }
  if (t.closest('[data-reset]')) { ans.length = 0; renderTri(true); }
});
renderTri();

/* ===== Animação de entrada e barra mobile ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

const mbar = document.querySelector('[data-mbar]');
const hero = document.getElementById('top');
const tri = document.getElementById('triagem');
if (mbar && hero && tri) {
  let pastHero = false, onTri = false;
  const sync = () => mbar.classList.toggle('show', pastHero && !onTri);
  new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting; sync(); }).observe(hero);
  new IntersectionObserver(([en]) => { onTri = en.isIntersecting; sync(); }).observe(tri);
}
