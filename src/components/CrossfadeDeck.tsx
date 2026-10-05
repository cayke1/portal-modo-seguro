'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { ImageCard } from './ImageCard'
import styles from './CrossfadeDeck.module.css'

export type DeckItem = {
  href: string
  title: string
  text: string
  image: string
  label: string
}

type CrossfadeDeckProps = {
  items: DeckItem[]
  label: string
  /** Milissegundos que cada cartão fica na frente. */
  interval?: number
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

/**
 * Cartões empilhados que se revezam com fade. Pausa com mouse em cima, foco do teclado
 * ou "reduzir movimento". Os pontos levam direto a um cartão.
 */
export function CrossfadeDeck({ items, label, interval = 3500 }: CrossfadeDeckProps) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )

  const running = !hovered && !focused && !reducedMotion

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [running, interval, items.length])

  return (
    <div className={styles.deck}>
      <div
        className={styles.stage}
        role="group"
        aria-roledescription="carrossel"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
        }}
      >
        {items.map((item, index) => {
          const isActive = index === active
          // Posição na pilha: 0 = frente, 1 e 2 = atrás.
          const depth = (index - active + items.length) % items.length
          return (
            <div
              key={item.href}
              className={styles.slide}
              data-depth={Math.min(depth, 3)}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <ImageCard
                image={item.image}
                label={item.label}
                title={item.title}
                href={item.href}
                sizes="(min-width: 960px) 460px, 90vw"
              >
                {item.text}
              </ImageCard>
            </div>
          )
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {items.map((item, index) => (
            <button
              key={item.href}
              type="button"
              className={styles.dot}
              aria-label={`Mostrar ${item.title}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
