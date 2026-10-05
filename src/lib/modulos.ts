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

export type Modulo = ModuloMeta & { Content: MDXContent }

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

function buildModulos(): Modulo[] {
  const modulos = registro
    .map(({ file, meta, Content }) => ({ ...parseMeta(file, meta), Content }))
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

export function getModuloTitle(slug: string): string | undefined {
  return modulos.find((modulo) => modulo.slug === slug)?.titulo
}
