# AGENTS.md

Contexto e regras para assistentes de código (Claude Code, Copilot, etc.) neste repositório.

## O projeto

Portal do **Modo Seguro**, minicurso online de segurança digital para estudantes (15+ anos, leigos). Projeto de extensão universitária com prazo fixo: apresentação em 14/11/2026. Simplicidade vence elegância.

Leia antes de mudar algo estrutural:
- `docs/arquitetura.md`: stack, rotas, formato do conteúdo, API do quiz
- `docs/decisoes.md`: o que já foi decidido e por quê
- `CONTRIBUTING.md`: padrões de código, commits e PR

## Comandos

```bash
npm run dev         # desenvolvimento
npm run lint
npm run typecheck
npm run build       # rode antes de considerar uma tarefa concluída
```

## Regras

- Next.js App Router + TypeScript strict. **Server Components por padrão**, `"use client"` só para interação (quiz, checklist, embed de vídeo).
- Estilo apenas com CSS Modules + tokens de `src/styles/tokens.css`. Não adicionar Tailwind, biblioteca de UI ou de estado.
- **Não adicionar dependências** sem pedido explícito.
- Identificadores em inglês. Texto de UI, rotas e conteúdo em pt-BR, linguagem simples e direta.
- Conteúdo fica em `content/`. Não escreva texto de módulo dentro de componentes.
- Não troque `publicado` de nenhum módulo, a menos que a tarefa peça isso explicitamente.
- `content/quiz.json`: nunca mude ou reutilize `id` de pergunta. Se mudar enunciado ou gabarito já publicado, incremente `versao`.
- **Nenhum dado pessoal** em código, logs, Redis ou analytics. O quiz grava só respostas e pontuação.
- `/api/quiz` recalcula a pontuação no servidor e deve degradar sem erro (204) se o Redis não estiver configurado.
- Toda UI precisa atender o checklist de acessibilidade do `CONTRIBUTING.md` (AA, teclado, 360px, `alt`, legenda).
- Formulários (inscrição, questionário final, dúvidas) são Google Forms externos acessados por `NEXT_PUBLIC_FORM_*`. Não implementar formulários próprios.

## Commits e PRs

Conventional Commits em português (`feat:`, `fix:`, `conteudo:`, `chore:`, `docs:`, `style:`, `refactor:`). Um assunto por PR, usando o template de `.github/pull_request_template.md`.
