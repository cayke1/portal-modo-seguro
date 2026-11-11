import { ArrowRight, Clock, Lock } from 'lucide-react'
import Link from 'next/link'
import type { Modulo } from '@/lib/modulos'
import { formatOrder } from '@/lib/module-visuals'
import { ModuleCover } from './ModuleCover'
import styles from './ModuleCard.module.css'

type ModuleCardProps = {
  modulo: Omit<Modulo, 'Content'>
  headingLevel?: 'h2' | 'h3'
}

export function ModuleCard({ modulo, headingLevel: Heading = 'h2' }: ModuleCardProps) {
  const { slug, ordem, titulo, resumo, duracaoVideo, publicado, capa } = modulo

  return (
    <article className={`${styles.card} ${publicado ? styles.available : styles.locked}`}>
      <div className={styles.media}>
        <ModuleCover
          slug={slug}
          capa={capa}
          dimmed={!publicado}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
        <span className={styles.number} aria-hidden="true">
          {formatOrder(ordem)}
        </span>
        <span className={`${styles.status} ${publicado ? styles.statusOpen : ''}`}>
          {publicado ? 'Disponível' : 'Em breve'}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>Módulo {formatOrder(ordem)}</p>
        <Heading className={styles.title}>
          {publicado ? (
            <Link href={`/modulos/${slug}`} className={styles.link}>
              {titulo}
            </Link>
          ) : (
            titulo
          )}
        </Heading>
        <p className={styles.resumo}>{resumo}</p>

        <p className={styles.footer}>
          {publicado ? (
            <>
              <span className={styles.meta}>
                <Clock aria-hidden="true" />
                Microaula de {duracaoVideo}
              </span>
              <span className={styles.cta} aria-hidden="true">
                Começar
                <ArrowRight />
              </span>
            </>
          ) : (
            <span className={styles.meta}>
              <Lock aria-hidden="true" />
              Em breve
            </span>
          )}
        </p>
      </div>
    </article>
  )
}
