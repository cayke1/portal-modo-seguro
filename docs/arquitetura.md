# Arquitetura

## Princípio

O portal é um **site de conteúdo quase todo estático**. Só ganha backend o que não tem alternativa pronta. Formulários, e-mail e análise de questionários ficam em ferramentas externas (Google Forms e planilhas).

Prazo e tamanho da equipe (2 devs, ~5 semanas) mandam em toda decisão. Na dúvida, escolha a opção com menos código.

## Visão geral

```
                 ┌──────────────────────────── Vercel ───────────────────────────┐
 Visitante ───▶  │  Next.js (App Router)                                         │
                 │   páginas estáticas geradas a partir de content/ (MDX + JSON) │
                 │   POST /api/quiz  ───────────────▶  Upstash Redis (anônimo)   │
                 │   Vercel Web Analytics (sem cookies)                          │
                 └───────────────────────────────────────────────────────────────┘
        │
        ├──▶ YouTube (não listado): microaulas e gravação da live
        └──▶ Google Forms: inscrição + diagnóstico, questionário final, dúvidas
```

## Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router) + TypeScript (strict) |
| Conteúdo | MDX via `@next/mdx`, metadados exportados como `meta` (sem frontmatter) |
| Estilo | CSS Modules + tokens em variáveis CSS (`src/styles/tokens.css`), ver [design-system.md](design-system.md) |
| Ícones | `lucide-react` |
| Fontes | Space Grotesk, Inter e JetBrains Mono via `next/font` |
| Persistência | Upstash Redis (`@upstash/redis`), só para o quiz |
| Hospedagem | Vercel (preview por PR, produção na `main`) |
| Métricas | Vercel Web Analytics |
| Vídeo | YouTube não listado, embed com carregamento sob clique |
| Formulários | Google Forms (fora do repo) |
| Qualidade | ESLint, Prettier, `tsc`, build no GitHub Actions |

Não usar: banco relacional, ORM, autenticação, biblioteca de UI, gerenciador de estado, CMS.

## Estrutura de pastas

```
content/
  modulos/
    01-golpes-e-phishing.mdx
    02-senhas.mdx
    03-autenticacao-em-dois-fatores.mdx
    04-privacidade-e-dados-pessoais.mdx
    05-depois-de-um-golpe.mdx
    index.ts            # registro tipado: importa meta + componente de cada módulo
  quiz.json
  checklist.json
  perguntas.mdx
src/
  app/
    page.tsx            # /
    modulos/page.tsx    # /modulos
    modulos/[slug]/page.tsx
    checklist/page.tsx
    quiz/page.tsx
    cartilha/page.tsx
    live/page.tsx
    perguntas/page.tsx
    sobre/page.tsx
    api/quiz/route.ts
    layout.tsx
    not-found.tsx
  components/           # VideoEmbed, Quiz, Checklist, Callout, ModuleCard, ...
  lib/
    modulos.ts          # helpers: listar, buscar por slug, filtrar publicados
    redis.ts            # cliente Upstash (null se env ausente)
    env.ts              # leitura e validação das variáveis
  styles/
    tokens.css
    globals.css
    page.module.css     # blocos de layout das páginas internas
public/
  downloads/            # cartilha.pdf, infográficos
  capas/                # capa de cada módulo: {slug}.jpg
  brand/                # logo e símbolo
  hero.jpg              # arte do topo da página inicial (base da imagem de compartilhamento)
mdx-components.tsx      # mapeamento global de componentes MDX
```

## Rotas

| Rota | Conteúdo | Renderização |
|---|---|---|
| `/` | apresentação, cronograma das 4 semanas, botão de inscrição | estática |
| `/modulos` | lista dos 5 módulos, com estado "libera na semana X" | estática |
| `/modulos/[slug]` | microaula + texto + convite para dúvidas | estática (`generateStaticParams`) |
| `/checklist` | checklist interativo e imprimível | estática + componente cliente |
| `/quiz` | quiz com resposta comentada | estática + componente cliente |
| `/cartilha` | download do PDF | estática |
| `/live` | gravação da live de encerramento | estática |
| `/perguntas` | perguntas da comunidade | estática |
| `/sobre` | equipe, disciplina, aviso de privacidade | estática |
| `POST /api/quiz` | grava tentativa anônima | Route Handler (Node) |

## Conteúdo

### Módulos

Cada módulo é um `.mdx` que exporta seus metadados:

```mdx
export const meta = {
  slug: 'golpes-e-phishing',
  ordem: 1,
  semana: 1,
  titulo: 'Golpes e phishing',
  resumo: 'Como reconhecer mensagens, links e ligações falsas antes de cair.',
  videoId: 'XXXXXXXXXXX',
  duracaoVideo: '6 min',
  publicado: false,
}

<VideoEmbed id={meta.videoId} titulo={meta.titulo} />

## O que é phishing
...
```

`content/modulos/index.ts` importa todos e exporta um array tipado (`Modulo[]`) ordenado por `ordem`. O tipo `ModuloMeta` fica em `src/lib/modulos.ts`. Um módulo novo só existe depois de entrar nesse registro.

### Liberação progressiva

- `publicado: false` → o módulo aparece em `/modulos` como bloqueado ("libera na semana X") e `/modulos/[slug]` retorna 404.
- Liberar = PR que troca para `true`, com título `conteudo: libera módulo N`.
- O commit de merge serve de **registro datado da liberação** para o relatório e o log de horas. Não liberar por data automática.

### Quiz (`content/quiz.json`)

```json
{
  "versao": 1,
  "perguntas": [
    {
      "id": "q1",
      "modulo": "golpes-e-phishing",
      "enunciado": "Você recebe um SMS do banco pedindo para atualizar dados por um link...",
      "alternativas": ["...", "...", "...", "..."],
      "correta": 2,
      "comentario": "Bancos não pedem atualização por link em SMS..."
    }
  ]
}
```

- `id` é estável. Nunca reaproveite um `id` para outra pergunta.
- Mudou pergunta ou gabarito depois de publicado? Incremente `versao` para não misturar tentativas.

### Checklist (`content/checklist.json`)

Lista de itens agrupados por módulo (`{ id, modulo, texto, dica? }`). O estado marcado fica em `localStorage` (try/catch, a página funciona sem). Tem versão para impressão via `@media print`.

## Quiz: gravação de tentativas

`POST /api/quiz` recebe:

```json
{ "versao": 1, "respostas": { "q1": 2, "q2": 0 } }
```

O servidor **recalcula a pontuação** a partir de `content/quiz.json`, sem confiar no cliente, e grava em Redis:

- `quiz:v{versao}:tentativas` → lista de `{ ts, acertos, total, respostas }`
- `quiz:v{versao}:acertos:{id}` → contador de acertos por pergunta

Regras:

- Nenhum dado pessoal: sem nome, e-mail, IP ou user agent.
- Validar o corpo (ids conhecidos, índices dentro do intervalo). Responder 400 se inválido.
- Se o Redis não estiver configurado ou falhar, responder 204 e o quiz segue funcionando. O resultado comentado é mostrado no cliente de qualquer forma.
- Exportação para o relatório: `scripts/exportar-quiz.ts` (lê o Redis e gera CSV), rodado localmente.

## Fora do código

| O quê | Onde |
|---|---|
| Inscrição + questionário diagnóstico | Google Forms, com coleta de e-mail |
| Questionário final (pós) | Google Forms, mesmas questões de conhecimento do diagnóstico + percepção |
| Dúvidas e relatos | Google Forms |
| E-mails de liberação | envio manual em cópia oculta pela conta da equipe |
| Análise pré/pós | planilhas dos Forms, pareadas por e-mail |

O portal só aponta para esses formulários via `NEXT_PUBLIC_FORM_*`.

## Identidade visual

Dark com um único acento verde-limão (`#C6FF3D`), títulos em Space Grotesk, corpo em Inter e rótulos em JetBrains Mono (via `next/font`). Marca: escudo com cursor de terminal (`>_`), referência ao "modo de segurança" do computador. Tudo vem de `tokens.css`; nenhuma cor ou tamanho fixo nos componentes.

Tokens, componentes, regras de uso e o checklist de auditoria de UI estão em [design-system.md](design-system.md).

## Acessibilidade e desempenho

- Contraste WCAG AA, corpo de texto ≥ 16px, alvo de toque ≥ 44px.
- HTML semântico (`main`, `nav`, `article`, um `h1` por página), foco visível, tudo operável por teclado.
- Vídeos com legenda. Imagens com `alt` (infográficos com descrição textual equivalente).
- Funcionar bem em 360px de largura.
- Embed do YouTube só carrega o iframe depois do clique.
- Imagens via `next/image`.

## Privacidade

O portal não guarda nenhum dado pessoal. Os dados de inscrição vivem só no Google Forms da equipe e são descartados após a entrega do relatório final, conforme o plano de trabalho. A página `/sobre` explica isso em linguagem simples.
