// Conteúdo da landing page. Edite os textos aqui; o layout fica em src/components.

export const DEADLINES = {
  adesao: '2026-10-28T23:59:59-03:00',
};

export const CONTACT = {
  whatsapp: 'https://wa.me/5531982342786?text=Ol%C3%A1%20Palegio%2C%20eu%20gostaria%20de...',
  instagram: 'https://www.instagram.com/palegioconsultoria/',
  linkedin: 'https://www.linkedin.com/company/palegioconsultoria/',
  receita: 'https://www.gov.br/receitafederal',
};

export const HERO_ITEMS = [
  { t: 'Diagnóstico em até 3 dias úteis', d: 'Migrar para o regime regular ou permanecer no Simples tradicional com clareza estratégica.' },
  { t: 'Plano de ação', d: 'Passo a passo completo pronto para executar antes do prazo final.' },
  { t: 'Análise do potencial de crédito', d: 'O dado essencial que define sua competitividade e relação com fornecedores/clientes.' },
];

export const STATS = [
  { v: '+R$ 1 bi', l: 'Recuperado em impostos para empresas' },
  { v: '14 anos', l: 'Dedicados exclusivamente ao tributário' },
  { v: '100%', l: 'Foco na Reforma aplicada na prática' },
];

export const CALENDAR = [
  { date: '15/10', title: 'Ingresso ou retorno ao Simples Nacional', d: 'Prazo final para solicitar o ingresso ou o retorno ao Simples Nacional para o ano-calendário de 2027.', tag: 'Prazo legal · encerrado', state: 'past' },
  { date: '28/10', title: 'Adesão ao diagnóstico Palegio', d: 'Contratar a análise técnica para apoiar a decisão da empresa.', tag: 'Prazo da consultoria', state: 'now' },
  { date: '30/10', title: 'Opção pelo regime regular (IBS e CBS)', d: 'Definir se vai apurar IBS e CBS fora do DAS, no Simples Híbrido.', tag: 'Prazo legal', state: 'legal' },
] as const;

export const FACTORS = [
  { icon: 'users', l: 'Perfil dos clientes' },
  { icon: 'handshake', l: 'Vendas B2B' },
  { icon: 'percent', l: 'Margem' },
  { icon: 'layers', l: 'Estrutura de custos' },
  { icon: 'coins', l: 'Aproveitamento de créditos' },
  { icon: 'store', l: 'Segmento de atuação' },
  { icon: 'scale', l: 'Carga tributária' },
  { icon: 'cog', l: 'Impactos operacionais' },
];

export const DELIVERABLES = [
  { icon: 'chart', t: 'Diagnóstico comparativo', d: 'Análise de viabilidade entre Simples Tradicional e Regime Híbrido, com simulação no caixa.' },
  { icon: 'coins', t: 'Análise de potencial de crédito', d: 'Mapeamento do volume de créditos de IBS e CBS que sua empresa poderá gerar para os clientes, conforme suas operações e a legislação aplicável.' },
  { icon: 'route', t: 'Plano de ação passo a passo', d: 'Roteiro prático para efetuar a opção e a adequação operacional sem surpresas.' },
  { icon: 'calc', t: 'Simulador de precificação exclusivo', d: 'Acesso à ferramenta do portal desenvolvido pela Palegio, voltada à Reforma Tributária, para recalcular o impacto das alíquotas nos seus preços de venda e avaliar os efeitos sobre preço e margem.' },
];

export const PORTAL = [
  { t: 'Atualizações do setor', d: 'suporte e acompanhamento do portal de atualizações até 30/11/2026.' },
  { t: 'Análise e relatório setorial', d: 'impactos da Reforma de acordo com o segmento.' },
  { t: 'Classificação tributária', d: 'cClassTrib, CST, alíquotas e tratamento de IBS/CBS.' },
  { t: 'Acompanhamento', d: 'atualizações relevantes durante o período de acesso.' },
];

export const STEPS = [
  { t: 'Triagem', d: 'Responda às três perguntas no site e descubra na hora se o perfil se enquadra.' },
  { t: 'Aceite e pagamento', d: 'Leia as condições gerais, confirme o aceite e faça o pagamento por PIX, débito ou crédito em até 12x com juros. Rápido e seguro.' },
  { t: 'Envio dos documentos', d: 'Só depois da adesão são enviados alguns documentos por um canal seguro. A equipe guia o processo.' },
  { t: 'Entrega em 3 dias úteis', d: 'A equipe entrega o relatório com o plano de ação, claro e pronto para usar.' },
];

export const INCLUDED = [
  'Diagnóstico comparativo com simulação no caixa',
  'Plano de ação passo a passo',
  'Análise do potencial de crédito',
  'Simulador de precificação exclusivo',
  'Acesso ao portal e atualizações do setor até 30/11/2026',
];
