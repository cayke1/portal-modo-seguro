# Modo Seguro

Minicurso online e gratuito de segurança digital para estudantes. Projeto de extensão da disciplina **Prática Extensionista I (2026/2)**, curso de Ciência da Computação.

O portal reúne os 5 módulos do minicurso (microaula + texto), o checklist de segurança, o quiz de fechamento, a cartilha em PDF, a gravação da live de encerramento e as perguntas da comunidade. Todo o conteúdo é público e não exige cadastro.

- **Produção:** https://modoseguro.cayke.dev
- **Design system:** [docs/design-system.md](docs/design-system.md)
- **Arquitetura:** [docs/arquitetura.md](docs/arquitetura.md)
- **Como contribuir:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Guia para quem escreve conteúdo:** [docs/guia-de-conteudo.md](docs/guia-de-conteudo.md)

## Módulos

| # | Módulo | Semana |
|---|---|---|
| 1 | Golpes e phishing | 1 |
| 2 | Senhas | 1 |
| 3 | Autenticação em dois fatores | 2 |
| 4 | Privacidade e dados pessoais | 2 |
| 5 | O que fazer depois de um golpe | 3 |

Semana 4: live de encerramento, quiz e questionário final.

## Rodando localmente

Requisitos: Node.js LTS (20+) e npm.

```bash
npm install
cp .env.example .env.local   # preencha as variáveis do Upstash (só necessárias para o quiz)
npm run dev
```

Abra http://localhost:3000.

| Script | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção (o CI roda este) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `UPSTASH_REDIS_REST_URL` | gravação anônima das tentativas do quiz |
| `UPSTASH_REDIS_REST_TOKEN` | idem |
| `NEXT_PUBLIC_FORM_INSCRICAO_URL` | link do Google Forms de inscrição + diagnóstico |
| `NEXT_PUBLIC_FORM_FINAL_URL` | link do Google Forms do questionário final |
| `NEXT_PUBLIC_FORM_DUVIDAS_URL` | link do formulário de dúvidas e relatos |

Sem as variáveis do Upstash o site funciona normalmente. O quiz só não registra a tentativa.

## Equipe

Discentes: Cayke Daniel Pereira Veras, Eduardo Lopes de Oliveira Torres, Gabryel Dellanne Santiago Araujo, João Pedro Oliveira Barbosa, Lucas Farias, Lucas Yudi Modesto e Matheus Henrique Dreher dos Santos.

Docente: Dra. Anna Paula de Sousa Parente Rodrigues.

Equipe Portal: Cayke e Lucas Yudi.
