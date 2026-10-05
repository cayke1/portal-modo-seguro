// Arquivos .mdx: componente como export default e `meta` (validado em src/lib/modulos.ts).
declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types'

  export const meta: unknown
  const MDXComponent: MDXContent
  export default MDXComponent
}
