import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconBadge } from './IconBadge'
import styles from './EmptyState.module.css'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  children: ReactNode
  action?: ReactNode
}

/** Estado de "ainda não disponível". Usado onde o conteúdo libera ao longo do curso. */
export function EmptyState({ icon, title, children, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <IconBadge icon={icon} size="lg" />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.text}>{children}</div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
