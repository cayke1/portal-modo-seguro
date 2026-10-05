import { ArrowRight, SearchX } from 'lucide-react'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import styles from './status-page.module.css'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <Container size="narrow">
      <div className={styles.status}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <SearchX className={styles.icon} aria-hidden="true" />
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.text}>
          Esse endereço não existe ou o módulo ainda não foi liberado. Os módulos abrem ao longo das
          semanas do curso.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/modulos" iconEnd={ArrowRight}>
            Ver os módulos
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Ir para o início
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}
