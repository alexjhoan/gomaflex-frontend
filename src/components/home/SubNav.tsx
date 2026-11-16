import { cn } from '@/utils/cn'

interface SubNavProps {
  className?: string
}

const subNavLinks = [
  { path: '/catalogo/mangueras', label: 'Catálogo de Mangueras', dataPath: 'catalogo-de-mangueras' },
  { path: '/catalogo/guardapolvos', label: 'Guardapolvos y Fuelles', dataPath: 'guardapolvos-y-fuelles' },
  { path: '/catalogo/bujes', label: 'Bujes y Soportes', dataPath: 'bujes-y-soportes' },
  { path: '/catalogo/sellos', label: 'Sellos y O-Rings', dataPath: 'sellos-y-o-rings' },
  { path: '/pedido-rapido', label: 'Pedido Rápido WhatsApp', dataPath: 'pedido-rapido-whatsapp' },
  { path: '/nosotros', label: 'Nosotros', dataPath: 'nosotros' },
  { path: '/contacto', label: 'Contacto & Sede Maracay', dataPath: 'contacto-&-sede-maracay' },
] as const

export function SubNav({ className }: SubNavProps) {
  return (
    <div className={cn('hidden lg:block bg-surface-canvas shadow-[0_1px_4px_rgba(0,0,0,0.03)]', className)}>
      <div className="container-main h-11 flex items-center">
        <nav
          className="flex items-center gap-space-sm overflow-x-auto w-full"
          data-active-classes="bg-primary-container text-on-primary font-bold rounded-lg"
          aria-label="Subnavegación de categorías"
        >
          {subNavLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={cn(
                'text-body-sm font-label-md px-space-md py-1.5 text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap rounded-lg',
              )}
              data-path={link.dataPath}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}