'use client'

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import type { NavLink } from '@/lib/navigation'
import buttonStyles from './Button.module.css'
import styles from './SiteNav.module.css'

type SiteNavProps = {
  primary: NavLink[]
  materials: NavLink[]
  cta: { href: string; label: string }
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Navegação do header.
 * Desktop: links + dropdown "Materiais" + botão. Mobile: botão que abre uma gaveta com tudo.
 */
export function SiteNav({ primary, materials, cta }: SiteNavProps) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [materialsOpen, setMaterialsOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerId = useId()
  const dropdownId = useId()

  const materialsActive = materials.some((link) => isActive(pathname, link.href))
  const ctaIsInternal = cta.href.startsWith('/')

  // Gaveta aberta: trava a rolagem da página e fecha com Esc.
  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setDrawerOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  // Dropdown aberto: fecha com Esc ou clique fora.
  useEffect(() => {
    if (!materialsOpen) return
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setMaterialsOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMaterialsOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [materialsOpen])

  const closeAll = () => {
    setDrawerOpen(false)
    setMaterialsOpen(false)
  }

  const ctaClassName = `${buttonStyles.button} ${buttonStyles.primary}`

  return (
    <>
      <nav aria-label="Principal" className={styles.desktop}>
        <ul className={styles.list}>
          {primary.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.link}
                aria-current={isActive(pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            ref={dropdownRef}
            className={styles.dropdown}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMaterialsOpen(false)
            }}
          >
            <button
              type="button"
              className={`${styles.link} ${materialsActive ? styles.activeGroup : ''}`}
              aria-expanded={materialsOpen}
              aria-controls={dropdownId}
              onClick={() => setMaterialsOpen((open) => !open)}
            >
              Materiais
              <ChevronDown
                className={`${styles.chevron} ${materialsOpen ? styles.chevronOpen : ''}`}
                aria-hidden="true"
              />
            </button>
            <ul id={dropdownId} className={styles.panel} hidden={!materialsOpen}>
              {materials.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.panelLink}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    onClick={closeAll}
                  >
                    <span className={styles.panelLabel}>{link.label}</span>
                    {link.description && (
                      <span className={styles.panelDescription}>{link.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        {ctaIsInternal ? (
          <Link href={cta.href} className={ctaClassName}>
            {cta.label}
          </Link>
        ) : (
          <a href={cta.href} className={ctaClassName}>
            {cta.label}
          </a>
        )}
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={drawerOpen}
        aria-controls={drawerId}
        onClick={() => setDrawerOpen((open) => !open)}
      >
        {drawerOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{drawerOpen ? 'Fechar menu' : 'Abrir menu'}</span>
      </button>

      <nav
        id={drawerId}
        aria-label="Menu"
        className={styles.drawer}
        hidden={!drawerOpen}
        data-open={drawerOpen}
      >
        <ul className={styles.drawerList}>
          {[...primary, ...materials].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.drawerLink}
                aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                onClick={closeAll}
              >
                {link.label}
                <ArrowRight className={styles.drawerArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/sobre"
              className={styles.drawerLink}
              aria-current={isActive(pathname, '/sobre') ? 'page' : undefined}
              onClick={closeAll}
            >
              Sobre
              <ArrowRight className={styles.drawerArrow} aria-hidden="true" />
            </Link>
          </li>
        </ul>
        {ctaIsInternal ? (
          <Link
            href={cta.href}
            className={`${ctaClassName} ${buttonStyles.lg} ${buttonStyles.fullWidth}`}
            onClick={closeAll}
          >
            {cta.label}
          </Link>
        ) : (
          <a
            href={cta.href}
            className={`${ctaClassName} ${buttonStyles.lg} ${buttonStyles.fullWidth}`}
          >
            {cta.label}
          </a>
        )}
      </nav>
    </>
  )
}
