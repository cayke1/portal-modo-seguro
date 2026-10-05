import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'

export const alt = 'Modo Seguro: minicurso gratuito de segurança digital'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Imagem de compartilhamento: arte do hero + título por cima. */
export default async function OpengraphImage() {
  const hero = await readFile(path.join(process.cwd(), 'public', 'hero.jpg'))
  const heroSrc = `data:image/jpeg;base64,${hero.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#0a0b0a',
      }}
    >
      <img
        src={heroSrc}
        alt=""
        width={1200}
        height={630}
        style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          padding: '0 72px',
          width: 720,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#c6ff3d',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Minicurso gratuito
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            color: '#f2f4f0',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Ative o&nbsp;<span style={{ color: '#c6ff3d' }}>modo seguro</span>&nbsp;na sua vida
          digital.
        </div>
        <div style={{ display: 'flex', color: '#a3a99f', fontSize: 30 }}>
          {SITE_NAME} · 5 módulos · 4 semanas
        </div>
      </div>
    </div>,
    size,
  )
}
