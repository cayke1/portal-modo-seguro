'use client'

import { Check, RotateCcw, Trophy, X } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import type { QuizAnswers, QuizQuestion } from '@/lib/quiz'
import buttonStyles from './Button.module.css'
import styles from './Quiz.module.css'

type QuizProps = {
  versao: number
  perguntas: QuizQuestion[]
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function Quiz({ versao, perguntas }: QuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [submitted, setSubmitted] = useState(false)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const answered = perguntas.filter((pergunta) => answers[pergunta.id] !== undefined).length
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
      {submitted ? (
        <div className={styles.result}>
          <Trophy className={styles.resultIcon} aria-hidden="true" />
          <h2 ref={resultRef} tabIndex={-1} className={styles.resultTitle}>
            Você acertou {acertos} de {perguntas.length}
          </h2>
          <p className={styles.resultText}>
            Confira abaixo o comentário de cada pergunta. Errar aqui é bem melhor do que errar numa
            mensagem de golpe.
          </p>
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            onClick={handleRestart}
          >
            <RotateCcw className={buttonStyles.icon} aria-hidden="true" />
            Refazer o quiz
          </button>
        </div>
      ) : (
        <div className={styles.progress} aria-live="polite">
          <span>
            {answered} de {perguntas.length} respondidas
          </span>
          <span className={styles.bar} aria-hidden="true">
            <span
              className={styles.barFill}
              style={{ width: `${(answered / perguntas.length) * 100}%` }}
            />
          </span>
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
                  <span className={styles.number}>
                    Pergunta {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.enunciado}>{pergunta.enunciado}</span>
                </legend>
                <div className={styles.options}>
                  {pergunta.alternativas.map((alternativa, altIndex) => {
                    const state = !submitted
                      ? ''
                      : altIndex === pergunta.correta
                        ? styles.correct
                        : altIndex === chosen
                          ? styles.wrong
                          : styles.faded
                    return (
                      <label key={altIndex} className={`${styles.option} ${state}`}>
                        <input
                          type="radio"
                          className={styles.input}
                          name={pergunta.id}
                          value={altIndex}
                          checked={chosen === altIndex}
                          required
                          onChange={() => setAnswers({ ...answers, [pergunta.id]: altIndex })}
                        />
                        <span className={styles.letter} aria-hidden="true">
                          {submitted && altIndex === pergunta.correta ? (
                            <Check />
                          ) : submitted && altIndex === chosen ? (
                            <X />
                          ) : (
                            LETTERS[altIndex]
                          )}
                        </span>
                        <span className={styles.optionText}>{alternativa}</span>
                        {submitted && altIndex === pergunta.correta && (
                          <span className="sr-only">(resposta certa)</span>
                        )}
                        {submitted && altIndex === chosen && !isCorrect && (
                          <span className="sr-only">(sua resposta)</span>
                        )}
                      </label>
                    )
                  })}
                </div>
                {submitted && (
                  <div className={`${styles.comment} ${isCorrect ? styles.commentOk : ''}`}>
                    <p className={styles.verdict}>
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

      {!submitted && (
        <button
          type="submit"
          className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.lg}`}
        >
          Ver meu resultado
        </button>
      )}
    </form>
  )
}
