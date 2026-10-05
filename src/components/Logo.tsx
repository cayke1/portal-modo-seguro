import styles from './Logo.module.css'

type LogoProps = {
  /** `full` = símbolo + nome; `mark` = só o símbolo. */
  variant?: 'full' | 'mark'
}

/** Escudo com cursor de terminal. Arquivos de marca em public/brand/. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path
        className={styles.shield}
        d="M30.8 4.4a4 4 0 0 1 2.4 0l21 6.6A4 4 0 0 1 57 14.8V29c0 14.2-8.4 24.3-23.1 31a4.5 4.5 0 0 1-3.8 0C15.4 53.3 7 43.2 7 29V14.8A4 4 0 0 1 9.8 11Z"
      />
      <path
        className={styles.prompt}
        fill="none"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19 24 9 8-9 8"
      />
      <rect className={styles.cursor} x="33" y="37" width="13" height="5.5" rx="1" />
    </svg>
  )
}

export function Logo({ variant = 'full' }: LogoProps) {
  return (
    <span className={styles.logo}>
      <LogoMark className={styles.mark} />
      {variant === 'full' ? (
        <span className={styles.wordmark}>
          modo <span className={styles.highlight}>seguro</span>
        </span>
      ) : (
        <span className="sr-only">Modo Seguro</span>
      )}
    </span>
  )
}
