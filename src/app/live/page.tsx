import type { Metadata } from 'next'
import liveData from '@content/live.json'
import { VideoEmbed } from '@/components/VideoEmbed'
import { isNonEmptyString } from '@/lib/validation'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Live de encerramento',
}

export default function LivePage() {
  const videoId: unknown = liveData.videoId
  const data: unknown = liveData.data

  return (
    <>
      <h1>Live de encerramento</h1>
      <p className={styles.intro}>
        Uma conversa ao vivo para revisar os 5 módulos e responder às perguntas da turma.
      </p>
      {isNonEmptyString(videoId) ? (
        <div className={styles.prose}>
          <VideoEmbed id={videoId} titulo="Live de encerramento" />
        </div>
      ) : (
        <p className={styles.muted}>
          {isNonEmptyString(data)
            ? `A live acontece em ${data}. A gravação fica disponível aqui depois.`
            : 'A gravação da live fica disponível aqui na semana 4.'}
        </p>
      )}
    </>
  )
}
