import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedModulo, listPublishedModulos } from '@/lib/modulos'
import styles from '../../page.module.css'

type ModuloPageProps = {
  params: Promise<{ slug: string }>
}

// Módulo não publicado não tem página: qualquer slug fora da lista vira 404.
export const dynamicParams = false

export function generateStaticParams() {
  return listPublishedModulos().map((modulo) => ({ slug: modulo.slug }))
}

export async function generateMetadata({ params }: ModuloPageProps): Promise<Metadata> {
  const modulo = getPublishedModulo((await params).slug)
  return modulo ? { title: modulo.titulo, description: modulo.resumo } : {}
}

export default async function ModuloPage({ params }: ModuloPageProps) {
  const modulo = getPublishedModulo((await params).slug)
  if (!modulo) notFound()

  const { Content } = modulo
  return (
    <article className={styles.prose}>
      <p className={styles.eyebrow}>
        Módulo {modulo.ordem} · Semana {modulo.semana}
      </p>
      <h1>{modulo.titulo}</h1>
      <p className={styles.intro}>{modulo.resumo}</p>
      <Content />
      <p>
        <Link href="/modulos" className={styles.backLink}>
          ← Todos os módulos
        </Link>
      </p>
    </article>
  )
}
