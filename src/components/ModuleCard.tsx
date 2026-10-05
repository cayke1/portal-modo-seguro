import Link from 'next/link'
import type { ModuloMeta } from '@/lib/modulos'
import styles from './ModuleCard.module.css'

type ModuleCardProps = {
  modulo: ModuloMeta
}

export function ModuleCard({ modulo }: ModuleCardProps) {
  const { slug, ordem, semana, titulo, resumo, duracaoVideo, publicado } = modulo

  return (
    <article className={`${styles.card} ${publicado ? '' : styles.locked}`}>
      <p className={styles.eyebrow}>
        Módulo {ordem} · Semana {semana}
      </p>
      <h2 className={styles.title}>
        {publicado ? (
          <Link href={`/modulos/${slug}`} className={styles.link}>
            {titulo}
          </Link>
        ) : (
          titulo
        )}
      </h2>
      <p>{resumo}</p>
      <p className={styles.status}>
        {publicado ? `Microaula de ${duracaoVideo} + texto` : `Libera na semana ${semana}`}
      </p>
    </article>
  )
}
