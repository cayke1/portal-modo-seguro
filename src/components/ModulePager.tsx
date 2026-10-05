import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Modulo } from '@/lib/modulos'
import { formatOrder } from '@/lib/module-visuals'
import styles from './ModulePager.module.css'

type ModulePagerProps = {
  prev?: Modulo
  next?: Modulo
}

/** Navegação entre módulos publicados. */
export function ModulePager({ prev, next }: ModulePagerProps) {
  return (
    <nav aria-label="Outros módulos" className={`${styles.pager} no-print`}>
      {prev ? (
        <Link href={`/modulos/${prev.slug}`} className={styles.item} rel="prev">
          <span className={styles.label}>
            <ArrowLeft aria-hidden="true" />
            Anterior · Módulo {formatOrder(prev.ordem)}
          </span>
          <span className={styles.title}>{prev.titulo}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link href={`/modulos/${next.slug}`} className={`${styles.item} ${styles.next}`} rel="next">
          <span className={styles.label}>
            Próximo · Módulo {formatOrder(next.ordem)}
            <ArrowRight aria-hidden="true" />
          </span>
          <span className={styles.title}>{next.titulo}</span>
        </Link>
      ) : (
        <Link href="/modulos" className={`${styles.item} ${styles.next}`}>
          <span className={styles.label}>
            Todos os módulos
            <ArrowRight aria-hidden="true" />
          </span>
          <span className={styles.title}>Ver o que vem por aí</span>
        </Link>
      )}
    </nav>
  )
}
