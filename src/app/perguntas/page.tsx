import { MessageCircleQuestion } from 'lucide-react'
import type { Metadata } from 'next'
import Perguntas from '@content/perguntas.mdx'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Prose } from '@/components/Prose'

export const metadata: Metadata = {
  title: 'Perguntas da comunidade',
  description: 'As dúvidas mais comuns da turma do Modo Seguro, respondidas pela equipe.',
}

export default function PerguntasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comunidade"
        eyebrowIcon={MessageCircleQuestion}
        title="Perguntas da comunidade"
        lead="As dúvidas mais comuns enviadas durante o curso, reescritas sem identificar ninguém e respondidas pela equipe."
      />
      <Container size="narrow">
        <Prose>
          <Perguntas />
        </Prose>
      </Container>
    </>
  )
}
