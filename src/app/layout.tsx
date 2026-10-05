import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import '@/styles/tokens.css'
import '@/styles/globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    default: 'Modo Seguro: minicurso de segurança digital',
    template: '%s · Modo Seguro',
  },
  description:
    'Minicurso online e gratuito de segurança digital para estudantes: golpes, senhas, verificação em duas etapas, privacidade e o que fazer depois de um golpe.',
}

export const viewport: Viewport = {
  themeColor: '#0b0f0c',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className={styles.main}>
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
