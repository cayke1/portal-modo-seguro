import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  id: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'start' | 'center'
  action?: ReactNode
}

/** Cabeçalho de seção: rótulo + h2 + descrição. O `id` liga o h2 à <section>. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = 'start',
  action,
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]}`}>
      <div className={styles.text}>
        {eyebrow && <Eyebrow variant="plain">{eyebrow}</Eyebrow>}
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
