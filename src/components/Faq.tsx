import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './Faq.module.css'

type FaqProps = {
  items: { question: string; answer: ReactNode }[]
}

/** Perguntas frequentes com <details>: abre e fecha sem JavaScript. */
export function Faq({ items }: FaqProps) {
  return (
    <div className={styles.faq}>
      {items.map(({ question, answer }) => (
        <details key={question} className={styles.item}>
          <summary className={styles.question}>
            <span>{question}</span>
            <Plus className={styles.icon} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>{answer}</div>
        </details>
      ))}
    </div>
  )
}
