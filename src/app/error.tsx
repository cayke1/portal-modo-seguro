'use client'

import { RotateCcw, TriangleAlert } from 'lucide-react'
import buttonStyles from '@/components/Button.module.css'
import { Container } from '@/components/Container'
import styles from './status-page.module.css'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container size="narrow">
      <div className={styles.status}>
        <TriangleAlert className={styles.icon} aria-hidden="true" />
        <h1 className={styles.title}>Algo deu errado</h1>
        <p className={styles.text}>
          Não foi culpa sua. Tente de novo; se continuar, volte mais tarde.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
            onClick={reset}
          >
            <RotateCcw className={buttonStyles.icon} aria-hidden="true" />
            Tentar de novo
          </button>
        </div>
      </div>
    </Container>
  )
}
