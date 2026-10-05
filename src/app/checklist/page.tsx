import { ListChecks } from 'lucide-react'
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/Button'
import { Checklist } from '@/components/Checklist'
import { Container } from '@/components/Container'
import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'
import { checklistGroups } from '@/lib/checklist'

export const metadata: Metadata = {
  title: 'Checklist de segurança',
  description: 'As proteções de cada módulo do Modo Seguro em forma de lista para marcar.',
}

export default function ChecklistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prática"
        eyebrowIcon={ListChecks}
        title="Checklist de segurança"
        lead="As proteções de cada módulo em forma de lista. Marque o que você já fez: fica salvo só neste navegador, nada é enviado para a gente. Dá para imprimir e colar na parede."
      />
      <Container size="narrow">
        {checklistGroups.length > 0 ? (
          <Checklist groups={checklistGroups} />
        ) : (
          <EmptyState
            icon={ListChecks}
            title="O checklist cresce junto com o curso"
            action={
              <ButtonLink href="/modulos" variant="secondary">
                Ver os módulos
              </ButtonLink>
            }
          >
            Cada módulo liberado traz algumas ações práticas para você marcar aqui, como ativar a
            verificação em duas etapas no WhatsApp.
          </EmptyState>
        )}
      </Container>
    </>
  )
}
