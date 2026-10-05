function optionalUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? value : null
  } catch {
    return null
  }
}

// Acesso literal a process.env para o Next embutir as variáveis NEXT_PUBLIC_* no build.
export const forms = {
  inscricao: optionalUrl(process.env.NEXT_PUBLIC_FORM_INSCRICAO_URL),
  final: optionalUrl(process.env.NEXT_PUBLIC_FORM_FINAL_URL),
  duvidas: optionalUrl(process.env.NEXT_PUBLIC_FORM_DUVIDAS_URL),
}

export function getUpstashConfig(): { url: string; token: string } | null {
  const url = optionalUrl(process.env.UPSTASH_REDIS_REST_URL)
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}
