import { MaterialIcon, WhatsAppIcon } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useOrder } from '@/context/OrderContext'
import { WHATSAPP_URL } from '@/data/catalog'

function scrollToCatalog() {
  document.getElementById('catalogo')?.scrollIntoView({ block: 'start' })
}

interface OrderDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDrawer({ open, onOpenChange }: OrderDrawerProps) {
  const { items, count, removeItem } = useOrder()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="inset-x-0 bottom-0 top-auto w-full max-w-none translate-x-0 translate-y-0 gap-0 rounded-b-none rounded-t-lg border-surface-border bg-white p-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg">
        <div className="border-b border-surface-border py-3 pl-4 pr-12">
          <DialogTitle className="font-headline-md text-headline-md italic text-text-primary">
            Mi pedido
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Productos que agregaste al pedido. Confirma la disponibilidad por WhatsApp.
        </DialogDescription>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
            <MaterialIcon name="shopping_bag" size={40} className="text-text-muted" />
            <p className="font-body-md text-body-md text-text-muted">Tu pedido está vacío</p>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                scrollToCatalog()
              }}
              className="min-h-[44px] rounded-md bg-primary-container px-5 py-2.5 font-label-md text-label-md font-bold text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          <ul className="max-h-[50vh] divide-y divide-surface-border overflow-y-auto px-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface-subtle">
                  <MaterialIcon name={item.icon} size={22} className="text-text-primary/70" />
                </span>
                <p className="min-w-0 flex-1 font-label-md text-label-md font-bold text-text-primary">
                  {item.name}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Quitar ${item.name} del pedido`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-subtle hover:text-primary-container focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
                >
                  <MaterialIcon name="delete" size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-surface-border px-4 py-3">
          <p className="font-body-sm text-body-sm text-text-muted">
            {count} {count === 1 ? 'producto' : 'productos'} en tu pedido
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-primary-container px-4 py-2.5 font-label-md text-label-md font-bold text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
          >
            <WhatsAppIcon size={18} className="text-white" />
            Confirma por WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
