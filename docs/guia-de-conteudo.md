# Guia de conteúdo

Para quem escreve módulos, quiz, checklist e perguntas da comunidade. Não precisa saber programar.

## Editando pelo GitHub (sem instalar nada)

1. Abra o arquivo em `content/` no GitHub e clique no lápis (✏️).
2. Edite. Ao salvar, escolha **"Create a new branch"** e use o nome `conteudo/<assunto>` (ex.: `conteudo/modulo-2-senhas`).
3. Abra o Pull Request. Em 1–2 minutos aparece um comentário da Vercel com o **link de preview**. Confira como ficou.
4. Peça revisão no grupo. Depois de aprovado, quem aprovou faz o merge.

## Público e tom

- Estudantes a partir de 15 anos, sem conhecimento técnico prévio.
- Escreva como se explicasse para um colega: frases curtas, voz ativa, "você".
- Explique termo técnico na primeira vez que aparecer (ou evite o termo).
- Use exemplos reais do dia a dia: Pix, WhatsApp, Instagram, SMS do "banco", link de entrega.
- Sem terrorismo. A mensagem é "dá para se proteger com poucos hábitos".
- Toda afirmação técnica precisa ter fonte confiável (Cert.br, ANPD, Febraban, documentação oficial). Liste as fontes no fim do módulo.

## Estrutura de um módulo

Arquivo em `content/modulos/NN-slug.mdx`:

```mdx
export const meta = {
  slug: 'senhas',
  ordem: 2,
  semana: 1,
  titulo: 'Senhas',
  resumo: 'Uma frase dizendo o que a pessoa aprende neste módulo.',
  videoId: 'ID_DO_YOUTUBE',
  duracaoVideo: '5 min',
  publicado: false,
}

<VideoEmbed id={meta.videoId} titulo={meta.titulo} />

## Por que isso importa
2 a 3 parágrafos curtos com uma situação real.

## Como funciona
Explicação do tema.

## O que fazer agora
<Callout tipo="dica">

- Ação concreta 1
- Ação concreta 2

</Callout>

## Fontes
- [Nome da fonte](https://...)

<ConviteDuvidas />
```

Regras:

- Não mexa em `slug` nem em `ordem` depois de publicado (quebra links).
- **Não troque `publicado` para `true` no mesmo PR do texto.** A liberação é um PR separado, no dia certo (`conteudo: libera módulo N`).
- Texto entre 600 e 1.200 palavras por módulo. O vídeo carrega a explicação principal.
- Imagens e infográficos em `public/downloads/`, com nome em minúsculas e hífens (`infografico-2fa.png`), sempre com texto alternativo.

## Componentes disponíveis no MDX

| Componente | Uso |
|---|---|
| `<VideoEmbed id="..." titulo="..." />` | microaula do YouTube |
| `<Callout tipo="dica \| alerta \| exemplo">...</Callout>` | caixa de destaque |
| `<ConviteDuvidas />` | convite padrão para enviar dúvidas e relatos (fim de todo módulo) |

Dentro de `<Callout>`, deixe **uma linha em branco** depois da abertura e antes do fechamento; sem isso, listas e negrito aparecem como texto cru.

Precisa de outro componente? Peça à Equipe Portal. Não cole HTML no MDX.

## Quiz (`content/quiz.json`)

- 2 a 3 perguntas por módulo, 4 alternativas cada, só uma correta.
- Situação prática ("Você recebe..."), não definição decorada.
- `correta` é o índice da alternativa, **começando em 0**.
- `comentario` explica por que a correta está certa e qual o erro comum.
- `id` nunca muda nem é reaproveitado. Mudou pergunta já publicada? Avise a Equipe Portal (precisa subir `versao`).

## Checklist (`content/checklist.json`)

- Itens em forma de ação que a pessoa consegue marcar: "Ativei a verificação em duas etapas no WhatsApp".
- 3 a 6 itens por módulo.

## Perguntas da comunidade (`content/perguntas.mdx`)

- Só entram dúvidas recorrentes ou relevantes, reescritas **sem identificar ninguém**.
- Formato: `### Pergunta` seguido da resposta.

## Antes de pedir revisão

- [ ] Li em voz alta e não tropecei em nenhuma frase
- [ ] Todo termo técnico está explicado
- [ ] Fontes listadas
- [ ] Confiei no preview no celular
- [ ] `publicado` continua `false` (a não ser que o PR seja a liberação)
