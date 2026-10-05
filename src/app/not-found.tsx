import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ButtonLink'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <>
      <h1>Página não encontrada</h1>
      <p className={styles.intro}>
        Esse endereço não existe ou o módulo ainda não foi liberado. Os módulos abrem um por semana.
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/modulos">Ver os módulos</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Ir para o início
        </ButtonLink>
      </div>
    </>
  )
}
