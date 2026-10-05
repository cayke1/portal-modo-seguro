import { MessageCircleQuestion } from 'lucide-react'
import { forms } from '@/lib/env'
import { ButtonLink } from './Button'
import { IconBadge } from './IconBadge'
import styles from './ConviteDuvidas.module.css'

export function ConviteDuvidas() {
  return (
    <section className={`${styles.convite} no-print`} aria-labelledby="convite-duvidas">
      <IconBadge icon={MessageCircleQuestion} size="lg" />
      <div className={styles.text}>
        <h2 id="convite-duvidas" className={styles.title}>
          Ficou com dúvida ou já passou por isso?
        </h2>
        <p>
          Conte para a gente. As dúvidas mais comuns viram respostas na página de perguntas da
          comunidade, sem identificar ninguém.
        </p>
      </div>
      {forms.duvidas ? (
        <ButtonLink href={forms.duvidas} variant="secondary">
          Enviar dúvida ou relato
        </ButtonLink>
      ) : (
        <p className={styles.soon}>O formulário de dúvidas abre em breve.</p>
      )}
    </section>
  )
}
