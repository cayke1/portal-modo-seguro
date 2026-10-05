import { ArrowRight, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import { CrossfadeDeck, type DeckItem } from '@/components/CrossfadeDeck'
import { Eyebrow } from '@/components/Eyebrow'
import { Faq } from '@/components/Faq'
import { ImageCard } from '@/components/ImageCard'
import { Marquee } from '@/components/Marquee'
import { ModuleCard } from '@/components/ModuleCard'
import { SectionHeader } from '@/components/SectionHeader'
import { Timeline } from '@/components/Timeline'
import { forms } from '@/lib/env'
import { listModulos } from '@/lib/modulos'
import styles from './page.module.css'

const LAST_WEEK = 4

const STATS = [
  { value: '5', label: 'módulos' },
  { value: '4', label: 'semanas' },
  { value: 'R$ 0', label: 'gratuito' },
  { value: '100%', label: 'online e aberto' },
]

const MATERIALS: DeckItem[] = [
  {
    href: '/checklist',
    label: 'Prática',
    title: 'Checklist',
    text: 'As proteções de cada módulo em forma de lista para marcar. Dá para imprimir.',
    image: '/materiais/checklist.jpg',
  },
  {
    href: '/quiz',
    label: 'Teste',
    title: 'Quiz',
    text: 'Situações reais para testar o que você aprendeu, com o porquê de cada resposta.',
    image: '/materiais/quiz.jpg',
  },
  {
    href: '/cartilha',
    label: 'PDF',
    title: 'Cartilha',
    text: 'O resumo do curso em PDF, para guardar ou mandar para a família.',
    image: '/materiais/cartilha.jpg',
  },
  {
    href: '/live',
    label: 'Encerramento',
    title: 'Live de encerramento',
    text: 'Uma conversa ao vivo para revisar tudo e tirar dúvidas. Fica gravada.',
    image: '/materiais/live.jpg',
  },
  {
    href: '/perguntas',
    label: 'Comunidade',
    title: 'Perguntas',
    text: 'As dúvidas mais comuns da turma, respondidas pela equipe.',
    image: '/materiais/perguntas.jpg',
  },
  {
    href: '/sobre',
    label: 'Projeto',
    title: 'Sobre o projeto',
    text: 'Quem faz o Modo Seguro e como tratamos a sua privacidade.',
    image: '/materiais/sobre.jpg',
  },
]

const STEPS = [
  {
    title: 'Inscreva-se',
    text: 'Deixe seu e-mail para receber o aviso de cada módulo novo e responder o questionário inicial.',
  },
  {
    title: 'Assista e leia',
    text: 'Cada módulo tem uma microaula de poucos minutos e um texto curto. Dá para fazer no celular.',
  },
  {
    title: 'Coloque em prática',
    text: 'Use o checklist para ativar as proteções nas suas contas, no seu ritmo.',
  },
  {
    title: 'Teste o que aprendeu',
    text: 'Na última semana tem quiz com resposta comentada, live de encerramento e questionário final.',
  },
]

export default function HomePage() {
  const modulos = listModulos()
  const inscricaoHref = forms.inscricao ?? '/modulos'
  const inscricaoLabel = forms.inscricao ? 'Quero me inscrever' : 'Começar agora'

  const weeks = Array.from({ length: LAST_WEEK - 1 }, (_, index) => index + 1).map((semana) => ({
    label: `Semana ${semana}`,
    title: semana === 3 ? 'Recuperação' : semana === 1 ? 'Golpes e senhas' : 'Contas e dados',
    content: (
      <ul>
        {modulos
          .filter((modulo) => modulo.semana === semana)
          .map((modulo) => (
            <li key={modulo.slug}>
              {modulo.publicado ? (
                <Link href={`/modulos/${modulo.slug}`}>{modulo.titulo}</Link>
              ) : (
                modulo.titulo
              )}
            </li>
          ))}
      </ul>
    ),
  }))

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroArt} aria-hidden="true">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 960px) 65vw, 100vw"
            className={styles.heroImage}
          />
        </div>
        <Container>
          <div className={styles.heroContent}>
            <Eyebrow icon={ShieldCheck}>Minicurso gratuito · 4 semanas</Eyebrow>
            <h1 id="hero-title" className={styles.heroTitle}>
              Ative o <span className={styles.highlight}>modo seguro</span> na sua vida digital.
            </h1>
            <p className={styles.heroLead}>
              Aprenda a reconhecer golpes, proteger suas contas e cuidar dos seus dados com
              microaulas curtas e textos diretos. Feito por estudantes, para estudantes.
            </p>
            <div className={styles.heroActions}>
              <ButtonLink href={inscricaoHref} size="lg" iconEnd={ArrowRight}>
                {inscricaoLabel}
              </ButtonLink>
              <ButtonLink href="/modulos" size="lg" variant="secondary">
                Ver os módulos
              </ButtonLink>
            </div>
            <dl className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="aprende">
        <Container>
          <SectionHeader
            id="aprende"
            eyebrow="O que você aprende"
            title="Três hábitos que evitam a maioria dos problemas"
            description="Sem terrorismo e sem tecnicês. Poucas atitudes, explicadas com exemplos do dia a dia: Pix, WhatsApp, Instagram e SMS do “banco”."
          />
          <ul className={styles.grid3}>
            <li>
              <ImageCard
                image="/habitos/reconhecer-golpes.jpg"
                label="Hábito 01"
                title="Reconhecer golpes"
              >
                Identifique mensagens, links e ligações falsas antes de clicar, inclusive os golpes
                de falsa central e de Pix.
              </ImageCard>
            </li>
            <li>
              <ImageCard
                image="/habitos/proteger-contas.jpg"
                label="Hábito 02"
                title="Proteger suas contas"
              >
                Senhas fortes sem precisar decorar todas e verificação em duas etapas nas contas que
                mais importam.
              </ImageCard>
            </li>
            <li>
              <ImageCard
                image="/habitos/cuidar-dos-dados.jpg"
                label="Hábito 03"
                title="Cuidar dos seus dados"
              >
                Entenda o que você expõe sem perceber e saiba exatamente o que fazer se algo der
                errado.
              </ImageCard>
            </li>
          </ul>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="modulos">
        <Container>
          <SectionHeader
            id="modulos"
            eyebrow="Conteúdo"
            title="5 módulos, um passo de cada vez"
            description="Cada módulo tem uma microaula e um texto curto. Eles são liberados ao longo de três semanas."
            action={
              <ButtonLink href="/modulos" variant="secondary" iconEnd={ArrowRight}>
                Todos os módulos
              </ButtonLink>
            }
          />
        </Container>
        <Marquee label="Módulos do curso" duration={modulos.length * 9}>
          {modulos.map((modulo) => (
            <li key={modulo.slug}>
              <ModuleCard modulo={modulo} headingLevel="h3" />
            </li>
          ))}
        </Marquee>
      </section>

      <section className={styles.section} aria-labelledby="como-funciona">
        <Container>
          <SectionHeader
            id="como-funciona"
            eyebrow="Como funciona"
            title="Do primeiro clique ao modo seguro ativado"
          />
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="cronograma">
        <Container>
          <SectionHeader
            id="cronograma"
            eyebrow="Cronograma"
            title="Quatro semanas, no seu ritmo"
            description="Os módulos ficam abertos depois de liberados. Dá para começar a qualquer momento e rever quando quiser."
          />
          <Timeline
            items={[
              ...weeks.map((week, index) => ({ ...week, highlight: index === 0 })),
              {
                label: `Semana ${LAST_WEEK}`,
                title: 'Encerramento',
                content: (
                  <ul>
                    <li>
                      <Link href="/live">Live de encerramento</Link>
                    </li>
                    <li>
                      <Link href="/quiz">Quiz</Link> e questionário final
                    </li>
                  </ul>
                ),
              },
            ]}
          />
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="materiais">
        <Container>
          <div className={styles.split}>
            <SectionHeader
              id="materiais"
              eyebrow="Materiais"
              title="Tudo o que acompanha o curso"
              description="Ferramentas para praticar, revisar e compartilhar com quem você quiser."
            />
            <CrossfadeDeck label="Materiais do curso" items={MATERIALS} />
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="faq">
        <Container>
          <div className={styles.faqLayout}>
            <SectionHeader id="faq" eyebrow="Dúvidas" title="Perguntas frequentes" />
            <Faq
              items={[
                {
                  question: 'Quanto custa?',
                  answer: 'Nada. O minicurso é gratuito e todo o conteúdo fica aberto no site.',
                },
                {
                  question: 'Preciso me cadastrar para assistir?',
                  answer:
                    'Não. A inscrição é opcional: serve para receber o aviso de cada módulo novo e responder os questionários que ajudam a gente a avaliar o projeto.',
                },
                {
                  question: 'Preciso entender de tecnologia?',
                  answer:
                    'Não. O curso foi feito para quem tem a partir de 15 anos e nenhum conhecimento técnico. Todo termo técnico é explicado na primeira vez que aparece.',
                },
                {
                  question: 'Quanto tempo leva cada módulo?',
                  answer:
                    'Pouco. Uma microaula de alguns minutos e um texto de leitura rápida. Dá para fazer no intervalo, pelo celular.',
                },
                {
                  question: 'Quem faz o Modo Seguro?',
                  answer: (
                    <>
                      Estudantes de Ciência da Computação, em um projeto de extensão com orientação
                      docente. <Link href="/sobre">Conheça a equipe</Link>.
                    </>
                  ),
                },
                {
                  question: 'O que vocês fazem com os meus dados?',
                  answer: (
                    <>
                      O site não guarda nenhum dado pessoal. A inscrição fica no Google Forms da
                      equipe e é apagada depois do relatório final.{' '}
                      <Link href="/sobre#privacidade">Veja os detalhes</Link>.
                    </>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="cta-final">
        <Container>
          <div className={styles.ctaBand}>
            <h2 id="cta-final" className={styles.ctaTitle}>
              Pronto para ativar o modo seguro?
            </h2>
            <p className={styles.ctaText}>
              Comece pelo módulo 1. Leva poucos minutos e já muda o jeito que você olha para a
              próxima mensagem suspeita.
            </p>
            <ButtonLink href={inscricaoHref} size="lg" iconEnd={ArrowRight}>
              {inscricaoLabel}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
