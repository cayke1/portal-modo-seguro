import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './ButtonLink.module.css'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  download?: boolean
}

/** Link com cara de botão. Links externos (Google Forms) usam <a> comum. */
export function ButtonLink({ href, children, variant = 'primary', download }: ButtonLinkProps) {
  const className = `${styles.button} ${styles[variant]}`
  if (href.startsWith('/') && !download) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} download={download}>
      {children}
    </a>
  )
}
