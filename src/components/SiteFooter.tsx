import Link from 'next/link'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={styles.inner}>
        <p>Modo Seguro · Projeto de extensão de Ciência da Computação · 2026/2</p>
        <p>
          Este site não guarda dados pessoais. <Link href="/sobre#privacidade">Saiba mais</Link>.
        </p>
      </div>
    </footer>
  )
}
