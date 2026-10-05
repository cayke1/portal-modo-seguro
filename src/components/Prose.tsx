import type { ReactNode } from 'react'
import styles from './Prose.module.css'

/** Tipografia de texto longo (MDX dos módulos e perguntas). */
export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>
}
