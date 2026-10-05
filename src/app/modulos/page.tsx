import { ArrowRight, BellRing, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import { IconBadge } from '@/components/IconBadge'
import { ModuleCard } from '@/components/ModuleCard'
import { PageHeader } from '@/components/PageHeader'
import { forms } from '@/lib/env'
import { listModulos } from '@/lib/modulos'
import styles from '@/styles/page.module.css'

export const metadata: Metadata = {
  title: 'Módulos',
  description: 'Os 5 módulos do Modo Seguro: microaula curta e texto direto em cada um.',
}

export default function ModulosPage() {
  const modulos = listModulos()
  const publicados = modulos.filter((modulo) => modulo.publicado).length

  return (
    <>
      <PageHeader
        eyebrow={`${publicados} de ${modulos.length} disponíveis`}
        eyebrowIcon={BookOpen}
        title="Módulos"
        lead="Cinco módulos curtos, cada um com uma microaula e um texto direto ao ponto. Eles são liberados ao longo de três semanas e continuam abertos depois."
      />
      <Container>
        <div className={styles.body}>
          <ul className={styles.grid3}>
            {modulos.map((modulo) => (
              <li key={modulo.slug}>
                <ModuleCard modulo={modulo} />
              </li>
            ))}
          </ul>

          {forms.inscricao && (
            <aside className={styles.banner} aria-label="Aviso de novos módulos">
              <IconBadge icon={BellRing} size="lg" />
              <div className={styles.bannerText}>
                <p className={styles.bannerTitle}>
                  <strong>Quer saber quando sai o próximo módulo?</strong>
                </p>
                <p>Inscritos recebem um e-mail no dia de cada liberação.</p>
              </div>
              <ButtonLink href={forms.inscricao} iconEnd={ArrowRight}>
                Quero receber
              </ButtonLink>
            </aside>
          )}
        </div>
      </Container>
    </>
  )
}
