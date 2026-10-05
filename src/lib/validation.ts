export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0
}

/** Erro de conteúdo inválido: quebra o build com uma mensagem que diz onde corrigir. */
export function contentError(file: string, message: string): Error {
  return new Error(`[${file}] ${message}`)
}
