import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type EyebrowProps = {
  children: ReactNode
  icon?: LucideIcon
  variant?: 'pill' | 'plain'
}

/** Rótulo curto acima de títulos. Mono, maiúsculo. */
export function Eyebrow({ children, icon: Icon, variant = 'pill' }: EyebrowProps) {
  return (
    <p className={`${styles.eyebrow} ${styles[variant]}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {children}
    </p>
  )
}
