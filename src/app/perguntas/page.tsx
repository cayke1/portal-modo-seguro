import type { Metadata } from 'next'
import Perguntas from '@content/perguntas.mdx'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Perguntas da comunidade',
}

export default function PerguntasPage() {
  return (
    <article className={styles.prose}>
      <h1>Perguntas da comunidade</h1>
      <Perguntas />
    </article>
  )
}
