import type { LucideIcon } from 'lucide-react'
import { Lightbulb, MessageSquareQuote, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './Callout.module.css'

type CalloutProps = {
  tipo: 'dica' | 'alerta' | 'exemplo'
  children: ReactNode
}

const VARIANTS: Record<CalloutProps['tipo'], { label: string; icon: LucideIcon }> = {
  dica: { label: 'Dica', icon: Lightbulb },
  alerta: { label: 'Atenção', icon: TriangleAlert },
  exemplo: { label: 'Exemplo', icon: MessageSquareQuote },
}

export function Callout({ tipo, children }: CalloutProps) {
  const { label, icon: Icon } = VARIANTS[tipo]
  return (
    <div className={`${styles.callout} ${styles[tipo]}`} role="note">
      <p className={styles.label}>
        <Icon aria-hidden="true" />
        {label}
      </p>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
