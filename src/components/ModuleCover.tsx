import Image from 'next/image'
import { createElement } from 'react'
import { getModuleIcon } from '@/lib/module-visuals'
import styles from './ModuleCover.module.css'

type ModuleCoverProps = {
  slug: string
  capa: string | null
  priority?: boolean
  sizes: string
  dimmed?: boolean
}

/** Capa decorativa do módulo (alt vazio: o título sempre aparece ao lado). Sem imagem, mostra o ícone. */
export function ModuleCover({ slug, capa, priority, sizes, dimmed }: ModuleCoverProps) {
  return (
    <div className={`${styles.cover} ${dimmed ? styles.dimmed : ''}`}>
      {capa ? (
        <Image src={capa} alt="" fill sizes={sizes} priority={priority} className={styles.image} />
      ) : (
        createElement(getModuleIcon(slug), {
          className: styles.fallbackIcon,
          strokeWidth: 1.25,
          'aria-hidden': true,
        })
      )}
    </div>
  )
}
