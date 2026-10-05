import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { IconBadge } from './IconBadge'
import styles from './FeatureCard.module.css'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  children: ReactNode
  href?: string
  headingLevel?: 'h2' | 'h3'
}

/** Cartão com ícone, título e texto. Com `href`, o cartão inteiro vira link. */
export function FeatureCard({
  icon,
  title,
  children,
  href,
  headingLevel: Heading = 'h3',
}: FeatureCardProps) {
  return (
    <article className={`${styles.card} ${href ? styles.interactive : ''}`}>
      <div className={styles.top}>
        <IconBadge icon={icon} />
        {href && <ArrowUpRight className={styles.arrow} aria-hidden="true" />}
      </div>
      <Heading className={styles.title}>
        {href ? (
          <Link href={href} className={styles.link}>
            {title}
          </Link>
        ) : (
          title
        )}
      </Heading>
      <div className={styles.text}>{children}</div>
    </article>
  )
}
