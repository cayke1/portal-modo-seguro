import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/Callout'
import { ConviteDuvidas } from '@/components/ConviteDuvidas'
import { VideoEmbed } from '@/components/VideoEmbed'

const components: MDXComponents = {
  Callout,
  ConviteDuvidas,
  VideoEmbed,
}

export function useMDXComponents(): MDXComponents {
  return components
}
