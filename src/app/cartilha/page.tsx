import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { Check, Download, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'
import { listModulos } from '@/lib/modulos'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Cartilha',
  description: 'O resumo do Modo Seguro em PDF, para guardar, imprimir ou compartilhar.',
}

const PDF_PATH = '/downloads/cartilha.pdf'

function pdfSize(): string | null {
  const file = path.join(process.cwd(), 'public', PDF_PATH)
  if (!existsSync(file)) return null
  const megabytes = statSync(file).size / 1024 / 1024
  return `${megabytes.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`
}

export default function CartilhaPage() {
  const size = pdfSize()

  return (
    <>
      <PageHeader
        eyebrow="Material"
        eyebrowIcon={FileText}
        title="Cartilha"
        lead="O resumo do minicurso em PDF: os principais cuidados de cada módulo, para guardar, imprimir ou mandar para quem você quiser."
      />
      <Container>
        <div className={styles.layout}>
          <section className={styles.card} aria-labelledby="conteudo-cartilha">
            <h2 id="conteudo-cartilha" className={styles.cardTitle}>
              O que tem na cartilha
            </h2>
            <ul className={styles.list}>
              {listModulos().map((modulo) => (
                <li key={modulo.slug}>
                  <Check aria-hidden="true" />
                  {modulo.titulo}
                </li>
              ))}
            </ul>
          </section>
          {size ? (
            <div className={styles.download}>
              <FileText className={styles.fileIcon} aria-hidden="true" />
              <p className={styles.fileName}>cartilha-modo-seguro.pdf</p>
              <p className={styles.fileMeta}>PDF · {size}</p>
              <ButtonLink href={PDF_PATH} download iconStart={Download} size="lg" fullWidth>
                Baixar a cartilha
              </ButtonLink>
            </div>
          ) : (
            <EmptyState icon={FileText} title="Disponível no fim do curso">
              A cartilha fica pronta junto com o último módulo. O link aparece aqui.
            </EmptyState>
          )}
        </div>
      </Container>
    </>
  )
}
