import { MaterialIcon } from '@/components/common'

export function TrustNote() {
  return (
    <section aria-label="Condiciones del pedido" className="container-main mt-4">
      <div className="flex items-start gap-3 border-y border-surface-border py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary-container/40">
          <MaterialIcon name="inventory_2" size={18} className="text-primary-container" />
        </span>
        <p className="font-body-sm text-body-sm font-medium text-text-primary sm:font-body-md sm:text-body-md">
          Agrega tus productos. Confirmamos disponibilidad y envío antes de que pagues.
        </p>
      </div>
    </section>
  )
}
