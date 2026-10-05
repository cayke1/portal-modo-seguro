import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from './Container'
import { Eyebrow } from './Eyebrow'
import styles from './PageHeader.module.css'

type PageHeaderProps = {
  eyebrow: string
  eyebrowIcon?: LucideIcon
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}

/** Topo padrão das páginas internas: rótulo, h1, texto de apoio e ações opcionais. */
export function PageHeader({ eyebrow, eyebrowIcon, title, lead, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children && <div className={styles.extra}>{children}</div>}
        </div>
      </Container>
    </header>
  )
}
