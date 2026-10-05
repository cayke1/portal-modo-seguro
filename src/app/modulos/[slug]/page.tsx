import { ArrowLeft, CalendarDays, FileText, PlayCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { ModuleCover } from '@/components/ModuleCover'
import { ModulePager } from '@/components/ModulePager'
import { Prose } from '@/components/Prose'
import { formatOrder } from '@/lib/module-visuals'
import { getAdjacentModulos, getPublishedModulo, listPublishedModulos } from '@/lib/modulos'
import styles from './page.module.css'

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
  if (!modulo) return {}
  return {
    title: modulo.titulo,
    description: modulo.resumo,
    openGraph: modulo.capa ? { images: [modulo.capa] } : undefined,
  }
}

export default async function ModuloPage({ params }: ModuloPageProps) {
  const modulo = getPublishedModulo((await params).slug)
  if (!modulo) notFound()

  const { Content } = modulo
  const { prev, next } = getAdjacentModulos(modulo.slug)

  return (
    <article>
      <header className={styles.hero}>
        <Container>
          <Link href="/modulos" className={`${styles.back} no-print`}>
            <ArrowLeft aria-hidden="true" />
            Todos os módulos
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>Módulo {formatOrder(modulo.ordem)}</p>
              <h1 className={styles.title}>{modulo.titulo}</h1>
              <p className={styles.lead}>{modulo.resumo}</p>
              <ul className={styles.meta} aria-label="Sobre este módulo">
                <li>
                  <PlayCircle aria-hidden="true" />
                  Microaula de {modulo.duracaoVideo}
                </li>
                <li>
                  <FileText aria-hidden="true" />
                  Texto de leitura rápida
                </li>
                <li>
                  <CalendarDays aria-hidden="true" />
                  Semana {modulo.semana}
                </li>
              </ul>
            </div>
            <div className={`${styles.cover} no-print`}>
              <ModuleCover
                slug={modulo.slug}
                capa={modulo.capa}
                priority
                sizes="(min-width: 960px) 520px, 100vw"
              />
            </div>
          </div>
        </Container>
      </header>

      <Container size="narrow">
        <Prose>
          <Content />
        </Prose>
        <ModulePager prev={prev} next={next} />
      </Container>
    </article>
  )
}
