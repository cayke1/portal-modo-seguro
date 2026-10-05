# Registro de decisões

Decisões curtas e o motivo. Nova decisão = nova entrada no fim, com data. Não apague entradas antigas: marque como substituída.

---

### D1. Site de conteúdo quase todo estático (05/10/2026)
Equipe de 2 devs e ~5 semanas até a apresentação (14/11). Só ganha backend o que não tem alternativa pronta.

### D2. Next.js (App Router) + TypeScript na Vercel (05/10/2026)
Mesma base do quadro de tarefas do projeto, então ninguém precisa aprender ferramenta nova. Preview por PR permite que o time de conteúdo revise sem rodar nada localmente.

### D3. Conteúdo em MDX no repositório, metadados via `export const meta` (05/10/2026)
O time de conteúdo edita pela web do GitHub, o histórico fica versionado e serve de evidência de horas. `@next/mdx` é nativo e dispensa parser de frontmatter.

### D4. Inscrição, diagnóstico, questionário final e dúvidas no Google Forms (05/10/2026)
Coleta de e-mail permite parear pré e pós na planilha. Fazer isso no portal seria a parte mais cara do projeto, sem ganho para a ação.

### D5. E-mails de liberação enviados manualmente (05/10/2026)
~15 inscritos. Infraestrutura de e-mail não compensa.

### D6. Liberação de módulo por flag `publicado` + PR (05/10/2026)
Controle explícito e commit datado como registro da liberação para o relatório. Sem liberação automática por data.

### D7. Quiz com tentativas anônimas no Upstash Redis (05/10/2026)
Necessário para o indicador "média de acertos ≥ 70%". Pontuação recalculada no servidor e nenhum dado pessoal gravado. Se o Redis falhar, o quiz continua funcionando.

### D8. Checklist com estado em `localStorage` (05/10/2026)
É conveniência pessoal do visitante e não precisa de dado agregado.

### D9. Vercel Web Analytics para alcance (05/10/2026)
Mede o "alcance aberto do portal" para o relatório, sem cookies.

### D10. Vídeos no YouTube não listado (05/10/2026)
Hospedagem gratuita, legendas e sem custo de banda na Vercel.

### D11. Domínio (05/10/2026) — substituída pela D14
`*.vercel.app` ou um subdomínio de `caykedev.com` (ex.: `modoseguro.caykedev.com`). Qualquer um serve. Definir antes da divulgação, porque o link vai impresso na cartilha e nas peças.

### D12. Sem testes automatizados além de lint, typecheck e build (05/10/2026)
Não cabe no prazo. Revisão por PR + preview cobre o risco de um site de conteúdo.

### D13. Equipe Portal: Cayke e Lucas Yudi (05/10/2026)
Revisores obrigatórios de mudanças em `src/` e na configuração.

### D14. Domínio: `modoseguro.cayke.dev` (05/10/2026)
Substitui a D11. Usado em `metadataBase`, Open Graph e sitemap (`src/lib/site.ts`). Precisa estar apontado na Vercel antes da divulgação.

### D15. Identidade visual: dark + verde-limão, escudo com cursor (05/10/2026)
Referências de landing pages dark com um único acento. Verde-limão mantém a ideia de "modo seguro"/terminal. Padrão e auditoria em `docs/design-system.md`. Capas, logo e favicon gerados com IA (Codex) e revisados pela equipe.

### D16. Ícones com `lucide-react` (05/10/2026)
Traço consistente, só os ícones usados entram no bundle e funciona em Server Components. Única dependência de UI permitida.

### D17. Header enxuto com gaveta no celular (05/10/2026)
Desktop: Módulos, Checklist, Quiz, Materiais (Cartilha, Live, Perguntas) e botão de inscrição. "Sobre" vai para o rodapé. No celular, tudo numa gaveta em tela cheia.
