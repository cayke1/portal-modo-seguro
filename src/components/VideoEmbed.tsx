'use client'

import { useState } from 'react'
import styles from './VideoEmbed.module.css'

type VideoEmbedProps = {
  id: string
  titulo: string
}

/** Só carrega o player do YouTube depois do clique. Legendas ligadas por padrão. */
export function VideoEmbed({ id, titulo }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    const params = new URLSearchParams({
      autoplay: '1',
      cc_load_policy: '1',
      cc_lang_pref: 'pt',
      hl: 'pt-BR',
      rel: '0',
    })
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}`}
          title={`Microaula: ${titulo}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className={`${styles.frame} no-print`}>
      <button type="button" className={styles.placeholder} onClick={() => setLoaded(true)}>
        <span className={styles.play} aria-hidden="true">
          ▶
        </span>
        <span>
          Assistir à microaula<span className="sr-only">: {titulo}</span>
        </span>
        <span className={styles.note}>O vídeo abre do YouTube, com legendas.</span>
      </button>
    </div>
  )
}
