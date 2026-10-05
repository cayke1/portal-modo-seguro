'use client'

import { useRef, useState, type FormEvent } from 'react'
import type { QuizAnswers, QuizQuestion } from '@/lib/quiz'
import styles from './Quiz.module.css'

type QuizProps = {
  versao: number
  perguntas: QuizQuestion[]
}

export function Quiz({ versao, perguntas }: QuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [submitted, setSubmitted] = useState(false)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const acertos = perguntas.filter((pergunta) => answers[pergunta.id] === pergunta.correta).length

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    requestAnimationFrame(() => resultRef.current?.focus())

    // Registro anônimo. Falha de rede não afeta o resultado mostrado.
    fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ versao, respostas: answers }),
    }).catch(() => {})
  }

  function handleRestart() {
    setAnswers({})
    setSubmitted(false)
    requestAnimationFrame(() => formRef.current?.querySelector('input')?.focus())
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.quiz}>
      {submitted && (
        <div className={styles.result}>
          <h2 ref={resultRef} tabIndex={-1} className={styles.resultTitle}>
            Você acertou {acertos} de {perguntas.length}
          </h2>
          <p>Veja abaixo o comentário de cada pergunta.</p>
        </div>
      )}

      <ol className={styles.list}>
        {perguntas.map((pergunta, index) => {
          const chosen = answers[pergunta.id]
          const isCorrect = chosen === pergunta.correta
          return (
            <li key={pergunta.id}>
              <fieldset className={styles.question} disabled={submitted}>
                <legend className={styles.legend}>
                  <span className={styles.number}>Pergunta {index + 1}</span>
                  {pergunta.enunciado}
                </legend>
                {pergunta.alternativas.map((alternativa, altIndex) => {
                  const optionClass = submitted
                    ? altIndex === pergunta.correta
                      ? styles.correct
                      : altIndex === chosen
                        ? styles.wrong
                        : ''
                    : ''
                  return (
                    <label key={altIndex} className={`${styles.option} ${optionClass}`}>
                      <input
                        type="radio"
                        name={pergunta.id}
                        value={altIndex}
                        checked={chosen === altIndex}
                        required
                        onChange={() => setAnswers({ ...answers, [pergunta.id]: altIndex })}
                      />
                      <span>{alternativa}</span>
                      {submitted && altIndex === pergunta.correta && (
                        <span className={styles.tag}>resposta certa</span>
                      )}
                      {submitted && altIndex === chosen && !isCorrect && (
                        <span className={styles.tag}>sua resposta</span>
                      )}
                    </label>
                  )
                })}
                {submitted && (
                  <div className={styles.comment}>
                    <p className={isCorrect ? styles.verdictOk : styles.verdictWrong}>
                      {isCorrect ? 'Você acertou.' : 'Não foi dessa vez.'}
                    </p>
                    <p>{pergunta.comentario}</p>
                  </div>
                )}
              </fieldset>
            </li>
          )
        })}
      </ol>

      {submitted ? (
        <button type="button" className={styles.button} onClick={handleRestart}>
          Refazer o quiz
        </button>
      ) : (
        <button type="submit" className={styles.button}>
          Ver resultado
        </button>
      )}
    </form>
  )
}
