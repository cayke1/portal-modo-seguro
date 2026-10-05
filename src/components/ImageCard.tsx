import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './ImageCard.module.css'

type ImageCardProps = {
  image: string
  title: string
  label?: string
  children: ReactNode
  headingLevel?: 'h2' | 'h3'
  /** Com href, o cartão inteiro vira link. */
  href?: string
  sizes?: string
}

/** Cartão com imagem ocupando o cartão inteiro e texto sobre degradê. Imagem decorativa. */
export function ImageCard({
  image,
  title,
  label,
  children,
  headingLevel: Heading = 'h3',
  href,
  sizes = '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw',
}: ImageCardProps) {
  return (
    <article className={`${styles.card} ${href ? styles.interactive : ''}`}>
      <Image src={image} alt="" fill sizes={sizes} className={styles.image} />
      <div className={styles.content}>
        {label && <p className={styles.label}>{label}</p>}
        <Heading className={styles.title}>
          {href ? (
            <Link href={href} className={styles.link}>
              {title}
              <ArrowUpRight className={styles.arrow} aria-hidden="true" />
            </Link>
          ) : (
            title
          )}
        </Heading>
        <div className={styles.text}>{children}</div>
      </div>
    </article>
  )
}
