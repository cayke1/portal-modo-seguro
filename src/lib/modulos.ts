import { existsSync } from 'node:fs'
import path from 'node:path'
import type { MDXContent } from 'mdx/types'
import { registro } from '@content/modulos'
import { contentError, isNonEmptyString, isPositiveInteger, isRecord } from './validation'

export type ModuloMeta = {
  slug: string
  ordem: number
  semana: number
  titulo: string
  resumo: string
  videoId: string
  duracaoVideo: string
  publicado: boolean
}

/** `capa`: caminho público de public/capas/{slug}.jpg, ou null se a imagem não existir. */
export type Modulo = ModuloMeta & { capa: string | null; Content: MDXContent }

/** Entrada de content/modulos/index.ts. O `meta` é validado aqui. */
export type RegistroModulo = { file: string; meta: unknown; Content: MDXContent }

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function parseMeta(file: string, meta: unknown): ModuloMeta {
  if (!isRecord(meta)) throw contentError(file, 'falta `export const meta = { ... }`')

  const { slug, ordem, semana, titulo, resumo, videoId, duracaoVideo, publicado } = meta
  if (!isNonEmptyString(slug) || !SLUG_PATTERN.test(slug)) {
    throw contentError(file, '`slug` deve ter só letras minúsculas, números e hífens')
  }
  if (!isPositiveInteger(ordem)) throw contentError(file, '`ordem` deve ser um número inteiro')
  if (!isPositiveInteger(semana)) throw contentError(file, '`semana` deve ser um número inteiro')
  if (!isNonEmptyString(titulo)) throw contentError(file, '`titulo` é obrigatório')
  if (!isNonEmptyString(resumo)) throw contentError(file, '`resumo` é obrigatório')
  if (!isNonEmptyString(videoId)) throw contentError(file, '`videoId` é obrigatório')
  if (!isNonEmptyString(duracaoVideo)) throw contentError(file, '`duracaoVideo` é obrigatório')
  if (typeof publicado !== 'boolean') throw contentError(file, '`publicado` deve ser true ou false')

  return { slug, ordem, semana, titulo, resumo, videoId, duracaoVideo, publicado }
}

function findCover(slug: string): string | null {
  const src = `/capas/${slug}.jpg`
  return existsSync(path.join(process.cwd(), 'public', src)) ? src : null
}

function buildModulos(): Modulo[] {
  const modulos = registro
    .map(({ file, meta, Content }) => {
      const parsed = parseMeta(file, meta)
      return { ...parsed, capa: findCover(parsed.slug), Content }
    })
    .sort((a, b) => a.ordem - b.ordem)

  const slugs = new Set<string>()
  const ordens = new Set<number>()
  for (const modulo of modulos) {
    if (slugs.has(modulo.slug))
      throw contentError('content/modulos', `slug repetido: ${modulo.slug}`)
    if (ordens.has(modulo.ordem))
      throw contentError('content/modulos', `ordem repetida: ${modulo.ordem}`)
    slugs.add(modulo.slug)
    ordens.add(modulo.ordem)
  }
  return modulos
}

const modulos = buildModulos()

export function listModulos(): Modulo[] {
  return modulos
}

export function listPublishedModulos(): Modulo[] {
  return modulos.filter((modulo) => modulo.publicado)
}

export function getPublishedModulo(slug: string): Modulo | undefined {
  return modulos.find((modulo) => modulo.slug === slug && modulo.publicado)
}

/** Módulos publicados vizinhos, para a navegação anterior/próximo. */
export function getAdjacentModulos(slug: string): { prev?: Modulo; next?: Modulo } {
  const published = listPublishedModulos()
  const index = published.findIndex((modulo) => modulo.slug === slug)
  return { prev: published[index - 1], next: published[index + 1] }
}
