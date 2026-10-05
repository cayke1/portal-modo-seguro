import type { RegistroModulo } from '@/lib/modulos'
import GolpesEPhishing, { meta as golpesEPhishing } from './01-golpes-e-phishing.mdx'
import Senhas, { meta as senhas } from './02-senhas.mdx'
import AutenticacaoEmDoisFatores, {
  meta as autenticacaoEmDoisFatores,
} from './03-autenticacao-em-dois-fatores.mdx'
import PrivacidadeEDadosPessoais, {
  meta as privacidadeEDadosPessoais,
} from './04-privacidade-e-dados-pessoais.mdx'
import DepoisDeUmGolpe, { meta as depoisDeUmGolpe } from './05-depois-de-um-golpe.mdx'

// Registro dos módulos. Um módulo novo só aparece no site depois de entrar aqui.
export const registro: RegistroModulo[] = [
  { file: '01-golpes-e-phishing.mdx', meta: golpesEPhishing, Content: GolpesEPhishing },
  { file: '02-senhas.mdx', meta: senhas, Content: Senhas },
  {
    file: '03-autenticacao-em-dois-fatores.mdx',
    meta: autenticacaoEmDoisFatores,
    Content: AutenticacaoEmDoisFatores,
  },
  {
    file: '04-privacidade-e-dados-pessoais.mdx',
    meta: privacidadeEDadosPessoais,
    Content: PrivacidadeEDadosPessoais,
  },
  { file: '05-depois-de-um-golpe.mdx', meta: depoisDeUmGolpe, Content: DepoisDeUmGolpe },
]
