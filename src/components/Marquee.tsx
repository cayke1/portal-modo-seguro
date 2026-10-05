import type { CSSProperties, ReactNode } from 'react'
import styles from './Marquee.module.css'

type MarqueeProps = {
  /** Itens já envolvidos em <li>. */
  children: ReactNode
  label: string
  /** Segundos para uma volta completa. */
  duration: number
}

/**
 * Carrossel infinito. Pausa com o mouse em cima ou com foco do teclado e volta ao sair.
 * Com "reduzir movimento", vira rolagem manual.
 */
export function Marquee({ children, label, duration }: MarqueeProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.marquee}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className={styles.track}>
          <ul className={styles.group} aria-label={label}>
            {children}
          </ul>
          {/* Cópias só visuais, para o loop não ter emenda nem em telas largas. */}
          {[1, 2].map((copy) => (
            <ul key={copy} className={`${styles.group} ${styles.clone}`} aria-hidden="true" inert>
              {children}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
