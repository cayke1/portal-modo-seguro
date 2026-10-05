import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  iconStart?: LucideIcon
  iconEnd?: LucideIcon
  download?: boolean
  fullWidth?: boolean
}

/** Link com aparência de botão. Rotas internas usam next/link; externas e downloads, <a>. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  iconStart: IconStart,
  iconEnd: IconEnd,
  download,
  fullWidth,
}: ButtonLinkProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ].join(' ')
  const content = (
    <>
      {IconStart && <IconStart className={styles.icon} aria-hidden="true" />}
      <span>{children}</span>
      {IconEnd && <IconEnd className={`${styles.icon} ${styles.iconEnd}`} aria-hidden="true" />}
    </>
  )

  if (href.startsWith('/') && !download) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={className} download={download}>
      {content}
    </a>
  )
}
