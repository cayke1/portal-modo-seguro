import type { Metadata } from 'next'
import { ModuleCard } from '@/components/ModuleCard'
import { listModulos } from '@/lib/modulos'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Módulos',
}

export default function ModulosPage() {
  return (
    <>
      <h1>Módulos</h1>
      <p className={styles.intro}>
        Cinco módulos, cada um com uma microaula e um texto curto. Um módulo novo é liberado a cada
        semana.
      </p>
      <ul className={styles.grid}>
        {listModulos().map((modulo) => (
          <li key={modulo.slug}>
            <ModuleCard modulo={modulo} />
          </li>
        ))}
      </ul>
    </>
  )
}
