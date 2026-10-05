import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ButtonLink'
import { Quiz } from '@/components/Quiz'
import { forms } from '@/lib/env'
import { quiz } from '@/lib/quiz'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Quiz',
}

export default function QuizPage() {
  return (
    <>
      <h1>Quiz</h1>
      <p className={styles.intro}>
        Situações do dia a dia para testar o que você aprendeu. Cada resposta vem com um comentário
        explicando o porquê. Não pedimos nome nem e-mail.
      </p>

      {quiz.perguntas.length > 0 ? (
        <Quiz versao={quiz.versao} perguntas={quiz.perguntas} />
      ) : (
        <p className={styles.muted}>O quiz abre na semana 4, junto com a live de encerramento.</p>
      )}

      {forms.final && (
        <>
          <h2>Questionário final</h2>
          <p className={styles.prose}>
            Fez o minicurso inscrito? Responda o questionário final para a gente medir o que mudou.
          </p>
          <ButtonLink href={forms.final} variant="secondary">
            Responder o questionário final
          </ButtonLink>
        </>
      )}
    </>
  )
}
