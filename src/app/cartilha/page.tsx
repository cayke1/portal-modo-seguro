import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ButtonLink'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Cartilha',
}

const PDF_PATH = '/downloads/cartilha.pdf'

export default function CartilhaPage() {
  const available = existsSync(path.join(process.cwd(), 'public', PDF_PATH))

  return (
    <>
      <h1>Cartilha</h1>
      <p className={styles.intro}>
        O resumo do minicurso em PDF: os principais cuidados de cada módulo, para guardar, imprimir
        ou mandar para quem você quiser.
      </p>
      {available ? (
        <ButtonLink href={PDF_PATH} download>
          Baixar a cartilha (PDF)
        </ButtonLink>
      ) : (
        <p className={styles.muted}>A cartilha fica disponível aqui no fim do minicurso.</p>
      )}
    </>
  )
}
