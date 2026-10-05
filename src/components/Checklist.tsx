'use client'

import { Check, Printer, RotateCcw } from 'lucide-react'
import { useMemo, useSyncExternalStore } from 'react'
import type { ChecklistGroup } from '@/lib/checklist'
import buttonStyles from './Button.module.css'
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
  const percent = allIds.length ? Math.round((done / allIds.length) * 100) : 0

  function toggle(id: string) {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    writeSnapshot(JSON.stringify([...next]))
  }

  return (
    <div className={styles.checklist}>
      <div className={`${styles.toolbar} no-print`}>
        <div className={styles.progress}>
          <p className={styles.progressText} aria-live="polite">
            <strong>{done}</strong> de {allIds.length} proteções ativadas
          </p>
          <div
            className={styles.bar}
            role="progressbar"
            aria-label="Progresso do checklist"
            aria-valuemin={0}
            aria-valuemax={allIds.length}
            aria-valuenow={done}
          >
            <span className={styles.barFill} style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            onClick={() => window.print()}
          >
            <Printer className={buttonStyles.icon} aria-hidden="true" />
            Imprimir
          </button>
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.ghost}`}
            onClick={() => writeSnapshot(EMPTY)}
            disabled={done === 0}
          >
            <RotateCcw className={buttonStyles.icon} aria-hidden="true" />
            Desmarcar tudo
          </button>
        </div>
      </div>

      {groups.map((group) => {
        const groupDone = group.itens.filter((item) => checked.has(item.id)).length
        return (
          <section
            key={group.modulo}
            className={styles.group}
            aria-labelledby={`grupo-${group.modulo}`}
          >
            <div className={styles.groupHeader}>
              <h2 id={`grupo-${group.modulo}`} className={styles.groupTitle}>
                {group.titulo}
              </h2>
              <span className={styles.groupCount}>
                {groupDone}/{group.itens.length}
              </span>
            </div>
            <ul className={styles.items}>
              {group.itens.map((item) => (
                <li key={item.id}>
                  <label className={styles.item}>
                    <input
                      type="checkbox"
                      className={styles.input}
                      checked={checked.has(item.id)}
                      onChange={() => toggle(item.id)}
                      aria-describedby={item.dica ? `dica-${item.id}` : undefined}
                    />
                    <span className={styles.box} aria-hidden="true">
                      <Check />
                    </span>
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
        )
      })}
    </div>
  )
}
