import { ArrowRight, CircleHelp, ClipboardCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import { EmptyState } from '@/components/EmptyState'
import { IconBadge } from '@/components/IconBadge'
import { PageHeader } from '@/components/PageHeader'
import { Quiz } from '@/components/Quiz'
import { forms } from '@/lib/env'
import { quiz } from '@/lib/quiz'
import styles from '@/styles/page.module.css'

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Situações do dia a dia para testar o que você aprendeu no Modo Seguro.',
}

export default function QuizPage() {
  const total = quiz.perguntas.length

  return (
    <>
      <PageHeader
        eyebrow={total > 0 ? `${total} perguntas · anônimo` : 'Semana 4'}
        eyebrowIcon={CircleHelp}
        title="Quiz"
        lead="Situações do dia a dia para testar o que você aprendeu. Cada resposta vem com um comentário explicando o porquê. Não pedimos nome nem e-mail."
      />
      <Container size="narrow">
        <div className={styles.body}>
          {total > 0 ? (
            <Quiz versao={quiz.versao} perguntas={quiz.perguntas} />
          ) : (
            <EmptyState
              icon={CircleHelp}
              title="O quiz abre na semana 4"
              action={
                <ButtonLink href="/checklist" variant="secondary">
                  Abrir o checklist
                </ButtonLink>
              }
            >
              Ele chega junto com a live de encerramento, depois que todos os módulos forem
              liberados. Enquanto isso, que tal começar pelo checklist?
            </EmptyState>
          )}

          {forms.final && (
            <aside className={styles.banner} aria-label="Questionário final">
              <IconBadge icon={ClipboardCheck} size="lg" />
              <div className={styles.bannerText}>
                <p className={styles.bannerTitle}>
                  <strong>Você se inscreveu no curso?</strong>
                </p>
                <p>Responda o questionário final para a gente medir o que mudou.</p>
              </div>
              <ButtonLink href={forms.final} variant="secondary" iconEnd={ArrowRight}>
                Responder
              </ButtonLink>
            </aside>
          )}
        </div>
      </Container>
    </>
  )
}
