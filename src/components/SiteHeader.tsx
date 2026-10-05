import Link from 'next/link'
import { forms } from '@/lib/env'
import { materialsNav, primaryNav } from '@/lib/navigation'
import { Logo } from './Logo'
import { SiteNav } from './SiteNav'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const cta = forms.inscricao
    ? { href: forms.inscricao, label: 'Inscreva-se' }
    : { href: '/modulos', label: 'Começar' }

  return (
    <header className={`${styles.header} no-print`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Modo Seguro, página inicial">
          <Logo />
        </Link>
        <SiteNav primary={primaryNav} materials={materialsNav} cta={cta} />
      </div>
    </header>
  )
}
