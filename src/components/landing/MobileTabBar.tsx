import { Link } from 'react-router-dom'

import { MaterialIcon } from '@/components/common'
import { useOrder } from '@/context/OrderContext'
import { cn } from '@/utils/cn'

const itemClass =
  'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2 font-label-md text-[11px] leading-4 transition-colors focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'

interface MobileTabBarProps {
  onOpenOrder: () => void
}

export function MobileTabBar({ onOpenOrder }: MobileTabBarProps) {
  const { count } = useOrder()

  return (
    <nav
      aria-label="Navegación principal móvil"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex items-stretch">
        <li className="flex flex-1">
          <a href="#inicio" aria-current="page" className={cn(itemClass, 'text-primary-container')}>
            <MaterialIcon name="home" size={22} />
            Inicio
          </a>
        </li>
        <li className="flex flex-1">
          <a href="#catalogo" className={cn(itemClass, 'text-text-muted')}>
            <MaterialIcon name="grid_view" size={22} />
            Catálogo
          </a>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={onOpenOrder} className={cn(itemClass, 'text-text-muted')}>
            <span className="relative">
              <MaterialIcon name="shopping_bag" size={22} />
              {count > 0 && (
                <span
                  aria-hidden
                  className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary-container px-1 text-[10px] font-bold leading-none text-white"
                >
                  {count}
                </span>
              )}
            </span>
            Mi pedido
          </button>
        </li>
        <li className="flex flex-1">
          <Link to="/contacto" className={cn(itemClass, 'text-text-muted')}>
            <MaterialIcon name="help_outline" size={22} />
            Ayuda
          </Link>
        </li>
      </ul>
    </nav>
  )
}
