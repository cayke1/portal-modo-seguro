import { forms } from '@/lib/env'
import { ButtonLink } from './ButtonLink'
import styles from './ConviteDuvidas.module.css'

export function ConviteDuvidas() {
  return (
    <section className={`${styles.convite} no-print`} aria-labelledby="convite-duvidas">
      <h2 id="convite-duvidas" className={styles.title}>
        Ficou com dúvida ou já passou por isso?
      </h2>
      <p>
        Conte para a gente. As perguntas mais comuns são respondidas na página de perguntas da
        comunidade, sem identificar ninguém.
      </p>
      {forms.duvidas ? (
        <ButtonLink href={forms.duvidas} variant="secondary">
          Enviar dúvida ou relato
        </ButtonLink>
      ) : (
        <p className={styles.muted}>O formulário de dúvidas abre em breve.</p>
      )}
    </section>
  )
}
