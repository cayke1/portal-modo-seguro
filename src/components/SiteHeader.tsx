import Link from 'next/link'
import styles from './SiteHeader.module.css'

const NAV_LINKS = [
  { href: '/modulos', label: 'Módulos' },
  { href: '/checklist', label: 'Checklist' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/cartilha', label: 'Cartilha' },
  { href: '/live', label: 'Live' },
  { href: '/perguntas', label: 'Perguntas' },
  { href: '/sobre', label: 'Sobre' },
]

export function SiteHeader() {
  return (
    <header className={`${styles.header} no-print`}>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span aria-hidden="true">&gt;_ </span>Modo Seguro
        </Link>
        <nav aria-label="Principal">
          <ul className={styles.list}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
