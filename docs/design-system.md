# Design system

Padrão visual do portal. Toda UI nova segue este documento; a seção **Auditoria** no fim é o checklist de revisão de PR com UI.

Referências: landing pages dark com um único acento vibrante, brilho suave e cartões com borda fina (Pinterest, out/2026). Identidade: "modo de segurança" do computador → escudo + cursor de terminal.

## Princípios

1. **Mobile first.** Escreva o CSS para 360px e acrescente `@media (min-width: …)`. Pontos de quebra: `560`, `640`, `768`, `960`, `1024`.
2. **Um acento só.** Verde-limão (`--accent`) marca ação, estado ativo e destaque. Laranja (`--warning`) e vermelho (`--danger`) só aparecem em alerta e erro.
3. **Calma > barulho.** Fundo quase preto, texto claro, brilho (`--accent-glow`) em no máximo um elemento por tela.
4. **Tokens sempre.** Nenhuma cor, tamanho, raio ou sombra fixo em componente. Tudo vem de `src/styles/tokens.css`.

## Tokens

| Grupo | Tokens | Uso |
|---|---|---|
| Superfícies | `--bg`, `--surface`, `--surface-raised`, `--surface-hover` | página → cartão → elemento dentro do cartão |
| Bordas | `--border`, `--border-strong`, `--accent-border` | divisórias, contornos de controle, destaque |
| Texto | `--text`, `--text-muted`, `--text-subtle` | título/corpo forte, corpo, metadado |
| Acento | `--accent`, `--accent-hover`, `--accent-ink`, `--accent-soft`, `--accent-glow` | ação, fundo de ícone, brilho. `--accent-ink` é o texto sobre `--accent` |
| Semânticas | `--ok`, `--warning`, `--danger`, `--info` (+ `-soft`) | acerto, alerta, erro, exemplo |
| Fonte | `--font-display` (Space Grotesk), `--font-body` (Inter), `--font-mono` (JetBrains Mono) | títulos, texto, rótulos |
| Tamanho | `--text-xs` … `--text-display` (fluidos com `clamp`) | `--text-xs` só em rótulo mono maiúsculo |
| Espaço | `--space-1` (4px) … `--space-9` (96px), `--section-gap`, `--gutter` | escala de 4px |
| Forma | `--radius-sm`, `--radius`, `--radius-lg`, `--radius-pill` | controles, cartões, blocos grandes, botões/pílulas |
| Interação | `--tap-target` (44px), `--focus-ring`, `--duration`, `--ease` | alvo de toque, foco, animação |

## Tipografia

| Elemento | Fonte | Tamanho |
|---|---|---|
| `h1` da página inicial (hero) | display 700 | `--text-display`, `--tracking-tight` |
| `h1` das páginas internas | display 700 | `--text-3xl`, `--tracking-tight` |
| `h2` de seção | display 700 | `--text-2xl` |
| Título de cartão | display 600–700 | `--text-md` / `--text-lg` |
| Corpo | body 400 | `--text-base` (≥ 16px); lead em `--text-md` |
| Rótulo (eyebrow, número, status) | mono 500, MAIÚSCULO | `--text-xs`, `--tracking-label` |

## Componentes

Use os componentes antes de criar estilo novo.

| Componente | Quando usar |
|---|---|
| `Container` | toda faixa de conteúdo. `size="narrow"` para texto longo (68ch) |
| `PageHeader` | topo de toda página interna: eyebrow + `h1` + lead |
| `SectionHeader` | topo de seção: eyebrow + `h2` + descrição + ação opcional |
| `ButtonLink` / `Button.module.css` | ações. `primary` = 1 por bloco; `secondary` e `ghost` para o resto |
| `Eyebrow` | rótulo curto acima de título (`pill` ou `plain`) |
| `IconBadge` | ícone decorativo em quadrado com fundo de acento |
| `FeatureCard` | ícone + título + texto; com `href`, o cartão inteiro vira link |
| `ModuleCard` / `ModuleCover` | módulos (capa, número, status) |
| `EmptyState` | conteúdo que ainda não foi liberado |
| `Prose` | MDX e texto longo |
| `Callout`, `VideoEmbed`, `ConviteDuvidas` | dentro do MDX |
| `Faq`, `Timeline` | perguntas frequentes e cronograma |

Ícones: **lucide-react**, traço padrão, sempre `aria-hidden="true"` quando decorativos. Ícone de módulo em `src/lib/module-visuals.ts`.

## Imagens

- Capas em `public/capas/{slug}.jpg`, 16:10 ou 16:9, ≤ 200 KB, estilo: objeto 3D grafite fosco com borda verde-limão, fundo `#0A0B0A`, sem texto. Sem capa, o card mostra o ícone do módulo.
- Capa e arte do hero são decorativas (`alt=""`): o título sempre aparece ao lado.
- Marca em `public/brand/` (`logo.svg`, `logo-mark.svg`, `icon-512.png`). Favicon em `src/app/icon.svg` e `apple-icon.png`.

## Auditoria (checklist de PR com UI)

- [ ] Funciona em 360px sem rolagem horizontal; testado também em ~768px e ≥ 1280px
- [ ] Só tokens: nenhuma cor hex, `px` de fonte ou sombra fixa no CSS Module
- [ ] Página interna começa com `PageHeader`; seções usam `SectionHeader`
- [ ] Um `h1` por página, títulos em ordem, seções com `aria-labelledby`
- [ ] No máximo um botão `primary` por bloco
- [ ] Alvos de toque ≥ 44px; foco visível (`--focus-ring`) em tudo que é interativo
- [ ] Contraste AA: texto em `--text`/`--text-muted`; `--text-subtle` só em metadado
- [ ] Ícones decorativos com `aria-hidden`; imagens informativas com `alt`
- [ ] Animação respeita `prefers-reduced-motion`; nada pisca por mais de 5 s
- [ ] Estado vazio tratado com `EmptyState`
- [ ] Versão de impressão (`.no-print` no que não faz sentido no papel)
