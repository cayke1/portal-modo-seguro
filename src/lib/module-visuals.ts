import type { LucideIcon } from 'lucide-react'
import { BookOpen, EyeOff, Fish, KeyRound, LifeBuoy, Smartphone } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  'golpes-e-phishing': Fish,
  senhas: KeyRound,
  'autenticacao-em-dois-fatores': Smartphone,
  'privacidade-e-dados-pessoais': EyeOff,
  'depois-de-um-golpe': LifeBuoy,
}

/** Ícone do módulo. Módulo novo sem ícone cadastrado usa um livro. */
export function getModuleIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? BookOpen
}

/** "1" → "01", usado nos rótulos de módulo. */
export function formatOrder(ordem: number): string {
  return String(ordem).padStart(2, '0')
}
