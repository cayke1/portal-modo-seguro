import checklistData from '@content/checklist.json'
import { listModulos } from './modulos'
import { contentError, isNonEmptyString, isRecord } from './validation'

export type ChecklistItem = { id: string; modulo: string; texto: string; dica?: string }

export type ChecklistGroup = { modulo: string; titulo: string; itens: ChecklistItem[] }

const FILE = 'content/checklist.json'

function parseItem(value: unknown, index: number, moduloSlugs: Set<string>): ChecklistItem {
  const where = `item ${index + 1}`
  if (!isRecord(value)) throw contentError(FILE, `${where} não é um objeto`)

  const { id, modulo, texto, dica } = value
  if (!isNonEmptyString(id)) throw contentError(FILE, `${where}: \`id\` é obrigatório`)
  if (!isNonEmptyString(modulo) || !moduloSlugs.has(modulo)) {
    throw contentError(FILE, `${id}: \`modulo\` deve ser o slug de um módulo existente`)
  }
  if (!isNonEmptyString(texto)) throw contentError(FILE, `${id}: \`texto\` é obrigatório`)
  if (dica !== undefined && !isNonEmptyString(dica)) {
    throw contentError(FILE, `${id}: \`dica\`, se existir, deve ser um texto`)
  }
  return dica === undefined ? { id, modulo, texto } : { id, modulo, texto, dica }
}

/** Itens agrupados na ordem dos módulos. Módulos sem itens ficam de fora. */
function buildGroups(data: unknown): ChecklistGroup[] {
  if (!isRecord(data) || !Array.isArray(data.itens)) {
    throw contentError(FILE, 'o arquivo deve ter a forma { "itens": [...] }')
  }

  const modulos = listModulos()
  const moduloSlugs = new Set(modulos.map((modulo) => modulo.slug))
  const itens = data.itens.map((item, index) => parseItem(item, index, moduloSlugs))

  const ids = new Set<string>()
  for (const { id } of itens) {
    if (ids.has(id)) throw contentError(FILE, `id repetido: ${id}`)
    ids.add(id)
  }

  return modulos
    .map((modulo) => ({
      modulo: modulo.slug,
      titulo: modulo.titulo,
      itens: itens.filter((item) => item.modulo === modulo.slug),
    }))
    .filter((group) => group.itens.length > 0)
}

export const checklistGroups = buildGroups(checklistData)
