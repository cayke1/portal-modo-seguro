import Link from 'next/link'
import { ButtonLink } from '@/components/ButtonLink'
import { forms } from '@/lib/env'
import { listModulos } from '@/lib/modulos'
import styles from './page.module.css'

const LAST_WEEK = 4

export default function HomePage() {
  const modulos = listModulos()
  const weeks = Array.from({ length: LAST_WEEK - 1 }, (_, index) => index + 1).map((semana) => ({
    semana,
    modulos: modulos.filter((modulo) => modulo.semana === semana),
  }))

  return (
    <>
      <h1>Modo Seguro</h1>
      <p className={styles.intro}>
        Minicurso online e gratuito de segurança digital para estudantes. Em 4 semanas você aprende
        a reconhecer golpes, proteger suas contas e cuidar dos seus dados, com microaulas curtas e
        textos diretos.
      </p>

      <div className={styles.actions}>
        {forms.inscricao && <ButtonLink href={forms.inscricao}>Quero me inscrever</ButtonLink>}
        <ButtonLink href="/modulos" variant={forms.inscricao ? 'secondary' : 'primary'}>
          Ver os módulos
        </ButtonLink>
      </div>

      <h2>Como funciona</h2>
      <p className={styles.prose}>
        Todo o conteúdo é aberto e não precisa de cadastro. Quem se inscreve recebe um aviso por
        e-mail quando cada módulo for liberado e participa do questionário no começo e no fim do
        curso.
      </p>

      <h2>Cronograma</h2>
      <ol className={styles.timeline}>
        {weeks.map(({ semana, modulos: weekModulos }) => (
          <li key={semana}>
            <h3>Semana {semana}</h3>
            <ul>
              {weekModulos.map((modulo) => (
                <li key={modulo.slug}>
                  {modulo.publicado ? (
                    <Link href={`/modulos/${modulo.slug}`}>{modulo.titulo}</Link>
                  ) : (
                    modulo.titulo
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li>
          <h3>Semana {LAST_WEEK}</h3>
          <ul>
            <li>
              <Link href="/live">Live de encerramento</Link>
            </li>
            <li>
              <Link href="/quiz">Quiz</Link> e questionário final
            </li>
          </ul>
        </li>
      </ol>
    </>
  )
}
