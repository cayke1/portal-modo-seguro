'use client'

import { useMemo, useSyncExternalStore } from 'react'
import type { ChecklistGroup } from '@/lib/checklist'
import styles from './Checklist.module.css'

type ChecklistProps = {
  groups: ChecklistGroup[]
}

// Estado marcado só no navegador do visitante. Se o localStorage falhar, vale só nesta aba.
const STORAGE_KEY = 'modo-seguro:checklist'
const EMPTY = '[]'
const listeners = new Set<() => void>()
let cache: string | null = null

function readSnapshot(): string {
  if (cache === null) {
    try {
      cache = window.localStorage.getItem(STORAGE_KEY) ?? EMPTY
    } catch {
      cache = EMPTY
    }
  }
  return cache
}

function writeSnapshot(value: string) {
  cache = value
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // segue funcionando sem persistir
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cache = event.newValue ?? EMPTY
    listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function parseIds(raw: string): Set<string> {
  try {
    const value: unknown = JSON.parse(raw)
    return new Set(Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [])
  } catch {
    return new Set()
  }
}

export function Checklist({ groups }: ChecklistProps) {
  const raw = useSyncExternalStore(subscribe, readSnapshot, () => EMPTY)
  const checked = useMemo(() => parseIds(raw), [raw])

  const allIds = groups.flatMap((group) => group.itens.map((item) => item.id))
  const done = allIds.filter((id) => checked.has(id)).length

  function toggle(id: string) {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    writeSnapshot(JSON.stringify([...next]))
  }

  return (
    <div className={styles.checklist}>
      <div className={`${styles.toolbar} no-print`}>
        <p className={styles.progress} aria-live="polite">
          {done} de {allIds.length} feitos
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => window.print()}>
            Imprimir
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => writeSnapshot(EMPTY)}
            disabled={done === 0}
          >
            Desmarcar tudo
          </button>
        </div>
      </div>

      {groups.map((group) => (
        <section
          key={group.modulo}
          className={styles.group}
          aria-labelledby={`grupo-${group.modulo}`}
        >
          <h2 id={`grupo-${group.modulo}`} className={styles.groupTitle}>
            {group.titulo}
          </h2>
          <ul className={styles.items}>
            {group.itens.map((item) => (
              <li key={item.id}>
                <label className={styles.item}>
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    aria-describedby={item.dica ? `dica-${item.id}` : undefined}
                  />
                  <span>
                    <span className={styles.text}>{item.texto}</span>
                    {item.dica && (
                      <span id={`dica-${item.id}`} className={styles.hint}>
                        {item.dica}
                      </span>
                    )}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
