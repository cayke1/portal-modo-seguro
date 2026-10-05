import { Redis } from '@upstash/redis'
import { getUpstashConfig } from './env'

let client: Redis | null | undefined

/** Retorna null quando o Upstash não está configurado. */
export function getRedis(): Redis | null {
  if (client === undefined) {
    const config = getUpstashConfig()
    client = config ? new Redis(config) : null
  }
  return client
}
