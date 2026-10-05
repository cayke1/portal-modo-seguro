import { parseAttempt, quiz, scoreAttempt } from '@/lib/quiz'
import { getRedis } from '@/lib/redis'

export const runtime = 'nodejs'

const noContent = () => new Response(null, { status: 204 })

/** Grava uma tentativa anônima. A pontuação é sempre recalculada aqui, nunca vem do cliente. */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ erro: 'Corpo inválido.' }, { status: 400 })
  }

  const respostas = quiz.perguntas.length > 0 ? parseAttempt(body) : null
  if (!respostas) {
    return Response.json({ erro: 'Tentativa inválida.' }, { status: 400 })
  }

  const redis = getRedis()
  if (!redis) return noContent()

  const { acertos, total, correctIds } = scoreAttempt(respostas)
  const prefix = `quiz:v${quiz.versao}`

  try {
    const pipeline = redis.pipeline()
    pipeline.rpush(`${prefix}:tentativas`, { ts: Date.now(), acertos, total, respostas })
    for (const id of correctIds) pipeline.incr(`${prefix}:acertos:${id}`)
    await pipeline.exec()
  } catch {
    // Sem detalhes da requisição no log: só o fato de que falhou.
    console.error('[api/quiz] falha ao gravar tentativa no Redis')
  }

  return noContent()
}
