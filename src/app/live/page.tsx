import { CalendarDays, Radio } from 'lucide-react'
import type { Metadata } from 'next'
import liveData from '@content/live.json'
import { Container } from '@/components/Container'
import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'
import { VideoEmbed } from '@/components/VideoEmbed'
import { isNonEmptyString } from '@/lib/validation'

export const metadata: Metadata = {
  title: 'Live de encerramento',
  description: 'Gravação da live de encerramento do Modo Seguro.',
}

export default function LivePage() {
  const videoId: unknown = liveData.videoId
  const data: unknown = liveData.data

  return (
    <>
      <PageHeader
        eyebrow={isNonEmptyString(data) ? data : 'Semana 4'}
        eyebrowIcon={Radio}
        title="Live de encerramento"
        lead="Uma conversa ao vivo para revisar os cinco módulos e responder às perguntas da turma. Quem não puder assistir ao vivo encontra a gravação aqui."
      />
      <Container size="narrow">
        {isNonEmptyString(videoId) ? (
          <VideoEmbed id={videoId} titulo="Live de encerramento" />
        ) : (
          <EmptyState icon={CalendarDays} title="A gravação aparece aqui depois da live">
            {isNonEmptyString(data)
              ? `A live acontece em ${data}. Inscritos recebem o link por e-mail.`
              : 'A data sai junto com o último módulo. Inscritos recebem o link por e-mail.'}
          </EmptyState>
        )}
      </Container>
    </>
  )
}
