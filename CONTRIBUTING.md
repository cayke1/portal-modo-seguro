# Como contribuir

Vale para todo mundo, código ou conteúdo. Quem só escreve conteúdo: leia também o [guia de conteúdo](docs/guia-de-conteudo.md). Dá para fazer tudo pela interface web do GitHub, sem instalar nada.

## Fluxo

1. Toda mudança entra por **Pull Request** na `main`. Ninguém dá push direto.
2. Cada PR gera uma **URL de preview** na Vercel. Revise a mudança nela antes de aprovar.
3. **1 aprovação** é obrigatória. PRs que mexem em `src/` ou configuração precisam da aprovação da Equipe Portal (ver `.github/CODEOWNERS`).
4. Merge por **squash**. Merge na `main` publica em produção.

## Branches

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat/` | funcionalidade nova | `feat/quiz-comentado` |
| `fix/` | correção | `fix/checklist-impressao` |
| `conteudo/` | texto, módulos, quiz, checklist, perguntas | `conteudo/modulo-2-senhas` |
| `chore/` | configuração, dependências, CI | `chore/eslint` |
| `docs/` | documentação do repo | `docs/guia-conteudo` |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português, no imperativo, com até ~72 caracteres:

```
feat: adiciona quiz com resposta comentada
fix: corrige contraste do botão no tema escuro
conteudo: libera módulo 3
conteudo: revisa texto do módulo 2
chore: configura CI com typecheck
docs: documenta liberação de módulos
```

Tipos aceitos: `feat`, `fix`, `conteudo`, `style`, `refactor`, `chore`, `docs`.

## Pull Requests

- Título no mesmo padrão dos commits.
- Preencha o template: o que mudou, link do preview e checklist.
- PR pequeno e focado. Um módulo ou uma funcionalidade por PR.
- Mudança visual: inclua print no celular (360px) e no desktop.

## Padrões de código

- **Identificadores em inglês.** Textos de interface, rotas e conteúdo em **pt-BR**. Termos do domínio podem ficar em português quando o tipo representa conteúdo (`ModuloMeta`, `content/modulos`), para bater com o que o time de conteúdo vê.
- TypeScript `strict`, sem `any`. Componentes em `PascalCase.tsx`, um por arquivo, com CSS Module ao lado (`Quiz.tsx` + `Quiz.module.css`).
- **Server Components por padrão.** `"use client"` só onde há interação (quiz, checklist, embed de vídeo).
- Estilo só com CSS Modules e tokens de `src/styles/tokens.css`. Nada de cor ou tamanho fixo.
- Nenhuma dependência nova sem combinar com a Equipe Portal.
- Nada de dado pessoal no código, nos logs ou no Redis.
- `npm run lint`, `npm run typecheck` e `npm run build` precisam passar (o CI confere).

## Checklist de acessibilidade (todo PR com UI)

- [ ] Contraste AA (confira no DevTools)
- [ ] Texto do corpo ≥ 16px, alvos de toque ≥ 44px
- [ ] Navegável só com teclado, com foco visível
- [ ] Imagens com `alt`, vídeos com legenda
- [ ] Sem rolagem horizontal em 360px
- [ ] Um `h1` por página, títulos em ordem

## Registro de horas

Commits e PRs são evidência para o log de horas da disciplina. Use o link do PR ou do commit na coluna de evidência.
