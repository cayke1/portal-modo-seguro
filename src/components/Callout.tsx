import type { ReactNode } from 'react'
import styles from './Callout.module.css'

type CalloutProps = {
  tipo: 'dica' | 'alerta' | 'exemplo'
  children: ReactNode
}

const LABELS: Record<CalloutProps['tipo'], string> = {
  dica: 'Dica',
  alerta: 'Atenção',
  exemplo: 'Exemplo',
}

export function Callout({ tipo, children }: CalloutProps) {
  return (
    <div className={`${styles.callout} ${styles[tipo]}`} role="note">
      <p className={styles.label}>{LABELS[tipo]}</p>
      {children}
    </div>
  )
}
