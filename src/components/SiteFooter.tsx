import Link from 'next/link'
import { footerNav } from '@/lib/navigation'
import { Container } from './Container'
import { Logo } from './Logo'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={`${styles.footer} no-print`}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Modo Seguro, página inicial">
              <Logo />
            </Link>
            <p className={styles.tagline}>
              Minicurso online e gratuito de segurança digital para estudantes. Sem cadastro, sem
              enrolação.
            </p>
          </div>
          <nav aria-label="Rodapé" className={styles.columns}>
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className={styles.columnTitle}>{group.title}</h2>
                <ul className={styles.links}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
