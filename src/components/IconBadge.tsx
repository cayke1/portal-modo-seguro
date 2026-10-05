import type { LucideIcon } from 'lucide-react'
import styles from './IconBadge.module.css'

type IconBadgeProps = {
  icon: LucideIcon
  size?: 'md' | 'lg'
}

/** Ícone decorativo dentro de um quadrado com fundo de destaque. */
export function IconBadge({ icon: Icon, size = 'md' }: IconBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[size]}`} aria-hidden="true">
      <Icon className={styles.icon} strokeWidth={1.75} />
    </span>
  )
}
