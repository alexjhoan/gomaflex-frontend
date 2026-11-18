import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MaterialIcon } from '@/components/common';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useOrder } from '@/context/OrderContext';
import { cn } from '@/utils/cn';

import { SearchBar } from './SearchBar';

interface MenuItem {
  label: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Ayuda', href: '/contacto' },
];

const DESKTOP_LINKS: MenuItem[] = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

const iconButtonClass =
  'relative flex h-11 w-11 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2';

interface HeaderProps {
  onOpenOrder: () => void;
}

export function Header({ onOpenOrder }: HeaderProps) {
  const { count } = useOrder();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white">
      <div className="container-main">
        <div className="flex h-14 items-center justify-between gap-3 lg:h-20 lg:gap-6">
          {/* Marca + ubicación */}
          <Link
            to="/"
            className="flex shrink-0 flex-col"
            aria-label="Soluciones GOMAFLEX, ir al inicio"
          >
            <img
              src="/logos/Color-para-superficies-claras.png"
              alt="Soluciones GOMAFLEX"
              className="h-9 w-auto"
            />
          </Link>

          {/* Buscador de escritorio */}
          <div className="hidden min-w-0 flex-1 lg:mx-auto lg:block lg:max-w-[560px]">
            <SearchBar variant="header" />
          </div>

          <div className="flex items-center gap-1">
            <nav
              aria-label="Navegación principal"
              className="mr-2 hidden items-center gap-6 lg:flex"
            >
              {DESKTOP_LINKS.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-label-md text-[13px] font-bold text-text-primary transition-colors hover:text-primary-container focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-label-md text-[13px] font-bold text-text-primary transition-colors hover:text-primary-container focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
              className={cn(iconButtonClass, 'lg:hidden')}
            >
              <MaterialIcon name="menu" size={24} />
            </button>

            <button
              type="button"
              onClick={onOpenOrder}
              aria-label={
                count > 0
                  ? `Abrir mi pedido, ${count} ${count === 1 ? 'producto' : 'productos'}`
                  : 'Abrir mi pedido'
              }
              className={iconButtonClass}
            >
              <MaterialIcon name="shopping_cart" size={24} />
              {count > 0 && (
                <span
                  aria-hidden
                  className="absolute right-0.5 top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary-container px-1 text-[10px] font-bold leading-none text-white"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="left-0 top-0 w-full max-w-none translate-x-0 translate-y-0 gap-0 rounded-b-lg rounded-t-none border-0 border-b border-surface-border bg-white p-0 pb-3">
          <DialogTitle className="border-b border-surface-border px-5 py-4 font-headline-sm text-headline-sm text-text-primary">
            Menú
          </DialogTitle>
          <DialogDescription className="sr-only">Enlaces principales del sitio.</DialogDescription>

          <nav aria-label="Navegación del menú móvil">
            <ul className="flex flex-col p-2">
              {MENU_ITEMS.map((item) => {
                const linkClass =
                  'flex min-h-[52px] items-center justify-between gap-2 rounded-md px-3 font-label-md text-[15px] font-bold text-text-primary transition-colors hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2';

                return (
                  <li key={item.label}>
                    {item.href.startsWith('/') ? (
                      <Link to={item.href} className={linkClass} onClick={closeMenu}>
                        {item.label}
                        <MaterialIcon name="chevron_right" size={20} className="text-text-muted" />
                      </Link>
                    ) : (
                      <a href={item.href} className={linkClass} onClick={closeMenu}>
                        {item.label}
                        <MaterialIcon name="chevron_right" size={20} className="text-text-muted" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
