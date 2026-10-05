import type { MetadataRoute } from 'next'
import { listPublishedModulos } from '@/lib/modulos'
import { SITE_URL } from '@/lib/site'

const STATIC_ROUTES = [
  '',
  '/modulos',
  '/checklist',
  '/quiz',
  '/cartilha',
  '/live',
  '/perguntas',
  '/sobre',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...listPublishedModulos().map((modulo) => ({ url: `${SITE_URL}/modulos/${modulo.slug}` })),
  ]
}
