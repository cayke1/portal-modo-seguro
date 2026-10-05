import type { ReactNode } from 'react'
import styles from './Timeline.module.css'

type TimelineProps = {
  items: { label: string; title: string; content: ReactNode; highlight?: boolean }[]
}

/** Cronograma: vertical no celular, em colunas no desktop. */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li key={item.label} className={`${styles.item} ${item.highlight ? styles.highlight : ''}`}>
          <span className={styles.dot} aria-hidden="true" />
          <p className={styles.label}>{item.label}</p>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.content}>{item.content}</div>
        </li>
      ))}
    </ol>
  )
}
