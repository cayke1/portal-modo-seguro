import {
  ChartNoAxesColumn,
  ClipboardList,
  GraduationCap,
  ListChecks,
  PlayCircle,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { FeatureCard } from '@/components/FeatureCard'
import { PageHeader } from '@/components/PageHeader'
import { SectionHeader } from '@/components/SectionHeader'
import pageStyles from '@/styles/page.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Quem faz o Modo Seguro e como o site trata a sua privacidade.',
}

const DISCENTES = [
  { nome: 'Cayke Daniel Pereira Veras', papel: 'Equipe Portal' },
  { nome: 'Eduardo Lopes de Oliveira Torres' },
  { nome: 'Gabryel Dellanne Santiago Araujo' },
  { nome: 'João Pedro Oliveira Barbosa' },
  { nome: 'Lucas Farias' },
  { nome: 'Lucas Yudi Modesto', papel: 'Equipe Portal' },
  { nome: 'Matheus Henrique Dreher dos Santos' },
]

function initials(nome: string) {
  const parts = nome.split(' ')
  return `${parts[0][0]}${parts[parts.length - 1][0]}`
}

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="O projeto"
        eyebrowIcon={GraduationCap}
        title="Sobre o Modo Seguro"
        lead="Um projeto de extensão da disciplina Prática Extensionista I (2026/2), do curso de Ciência da Computação. A ideia é simples: levar o que aprendemos sobre segurança digital para outros estudantes, de um jeito que dê para entender e aplicar no mesmo dia."
      />
      <Container>
        <div className={styles.sections}>
          <section aria-labelledby="como-medimos">
            <SectionHeader
              id="como-medimos"
              eyebrow="Como avaliamos"
              title="Um curso feito para ser medido"
              description="Como é um projeto de extensão, a gente precisa saber se ele funcionou. Por isso cada parte tem um papel."
            />
            <ul className={pageStyles.grid3}>
              <li>
                <FeatureCard icon={ClipboardList} title="Questionário inicial e final">
                  As mesmas perguntas no começo e no fim mostram o que mudou para quem se inscreveu.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={Trophy} title="Quiz anônimo">
                  A média de acertos mostra se o conteúdo foi bem explicado. Nossa meta é 70% ou
                  mais.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={ChartNoAxesColumn} title="Alcance do portal">
                  Contamos visitas sem cookies e sem identificar ninguém, só para saber quantas
                  pessoas o curso alcançou.
                </FeatureCard>
              </li>
            </ul>
          </section>

          <section aria-labelledby="equipe">
            <SectionHeader
              id="equipe"
              eyebrow="Equipe"
              title="Quem faz"
              description="Sete estudantes de Ciência da Computação, com orientação docente."
            />
            <ul className={styles.team}>
              {DISCENTES.map(({ nome, papel }) => (
                <li key={nome} className={styles.person}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials(nome)}
                  </span>
                  <span className={styles.personText}>
                    <span className={styles.name}>{nome}</span>
                    <span className={styles.role}>{papel ?? 'Discente'}</span>
                  </span>
                </li>
              ))}
              <li className={`${styles.person} ${styles.highlight}`}>
                <span className={styles.avatar} aria-hidden="true">
                  <Users />
                </span>
                <span className={styles.personText}>
                  <span className={styles.name}>Dra. Anna Paula de Sousa Parente Rodrigues</span>
                  <span className={styles.role}>Docente orientadora</span>
                </span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacidade-titulo" id="privacidade">
            <SectionHeader
              id="privacidade-titulo"
              eyebrow="Privacidade"
              title="Este site não guarda dados pessoais"
              description="Não pedimos cadastro para ver o conteúdo. Veja exatamente o que acontece em cada parte."
            />
            <ul className={pageStyles.grid3}>
              <li>
                <FeatureCard icon={Trophy} title="Quiz">
                  Guardamos só as respostas e a pontuação. Sem nome, e-mail, IP ou qualquer coisa
                  que identifique você.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={ListChecks} title="Checklist">
                  O que você marca fica salvo apenas no seu navegador. Nada é enviado para a gente.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={ClipboardList} title="Inscrição e questionários">
                  Ficam no Google Forms da equipe, são usados só para avaliar o curso e são apagados
                  depois da entrega do relatório final.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={PlayCircle} title="Vídeos">
                  O player do YouTube só carrega quando você clica para assistir.
                </FeatureCard>
              </li>
              <li>
                <FeatureCard icon={ShieldCheck} title="Visitas">
                  Contamos acessos sem cookies e sem identificar ninguém.
                </FeatureCard>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  )
}
