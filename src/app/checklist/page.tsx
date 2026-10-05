import type { Metadata } from 'next'
import { Checklist } from '@/components/Checklist'
import { checklistGroups } from '@/lib/checklist'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Checklist de segurança',
}

export default function ChecklistPage() {
  return (
    <>
      <h1>Checklist de segurança</h1>
      <p className={styles.intro}>
        Marque o que você já fez. As marcações ficam salvas só neste navegador. Dá para imprimir e
        colar na parede.
      </p>
      {checklistGroups.length > 0 ? (
        <Checklist groups={checklistGroups} />
      ) : (
        <p className={styles.muted}>Os itens do checklist aparecem aqui junto com os módulos.</p>
      )}
    </>
  )
}
