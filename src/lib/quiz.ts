import quizData from '@content/quiz.json'
import { listModulos } from './modulos'
import { contentError, isNonEmptyString, isPositiveInteger, isRecord } from './validation'

export type QuizQuestion = {
  id: string
  modulo: string
  enunciado: string
  alternativas: string[]
  correta: number
  comentario: string
}

export type QuizData = { versao: number; perguntas: QuizQuestion[] }

/** Índice da alternativa escolhida, por id de pergunta. */
export type QuizAnswers = Record<string, number>

const FILE = 'content/quiz.json'

function parseQuestion(value: unknown, index: number, moduloSlugs: Set<string>): QuizQuestion {
  const where = `pergunta ${index + 1}`
  if (!isRecord(value)) throw contentError(FILE, `${where} não é um objeto`)

  const { id, modulo, enunciado, alternativas, correta, comentario } = value
  if (!isNonEmptyString(id)) throw contentError(FILE, `${where}: \`id\` é obrigatório`)
  if (!isNonEmptyString(modulo) || !moduloSlugs.has(modulo)) {
    throw contentError(FILE, `${id}: \`modulo\` deve ser o slug de um módulo existente`)
  }
  if (!isNonEmptyString(enunciado)) throw contentError(FILE, `${id}: \`enunciado\` é obrigatório`)
  if (
    !Array.isArray(alternativas) ||
    alternativas.length < 2 ||
    !alternativas.every(isNonEmptyString)
  ) {
    throw contentError(FILE, `${id}: \`alternativas\` deve ter pelo menos 2 textos`)
  }
  if (
    typeof correta !== 'number' ||
    !Number.isInteger(correta) ||
    correta < 0 ||
    correta >= alternativas.length
  ) {
    throw contentError(FILE, `${id}: \`correta\` deve ser um índice de alternativa (começa em 0)`)
  }
  if (!isNonEmptyString(comentario)) throw contentError(FILE, `${id}: \`comentario\` é obrigatório`)

  return { id, modulo, enunciado, alternativas, correta, comentario }
}

function parseQuiz(data: unknown): QuizData {
  if (!isRecord(data)) throw contentError(FILE, 'o arquivo deve ser um objeto')
  const { versao, perguntas } = data
  if (!isPositiveInteger(versao)) throw contentError(FILE, '`versao` deve ser um número inteiro')
  if (!Array.isArray(perguntas)) throw contentError(FILE, '`perguntas` deve ser uma lista')

  const moduloSlugs = new Set(listModulos().map((modulo) => modulo.slug))
  const parsed = perguntas.map((pergunta, index) => parseQuestion(pergunta, index, moduloSlugs))

  const ids = new Set<string>()
  for (const { id } of parsed) {
    if (ids.has(id)) throw contentError(FILE, `id repetido: ${id}`)
    ids.add(id)
  }
  return { versao, perguntas: parsed }
}

export const quiz = parseQuiz(quizData)

/**
 * Valida o corpo de POST /api/quiz contra a versão atual do quiz.
 * Exige resposta para todas as perguntas, com índices dentro do intervalo.
 */
export function parseAttempt(body: unknown): QuizAnswers | null {
  if (!isRecord(body) || body.versao !== quiz.versao || !isRecord(body.respostas)) return null

  const respostas = body.respostas
  if (Object.keys(respostas).length !== quiz.perguntas.length) return null

  const answers: QuizAnswers = {}
  for (const pergunta of quiz.perguntas) {
    const answer = respostas[pergunta.id]
    if (!Number.isInteger(answer)) return null
    const index = answer as number
    if (index < 0 || index >= pergunta.alternativas.length) return null
    answers[pergunta.id] = index
  }
  return answers
}

export function scoreAttempt(answers: QuizAnswers): {
  acertos: number
  total: number
  correctIds: string[]
} {
  const correctIds = quiz.perguntas
    .filter((pergunta) => answers[pergunta.id] === pergunta.correta)
    .map((pergunta) => pergunta.id)
  return { acertos: correctIds.length, total: quiz.perguntas.length, correctIds }
}
