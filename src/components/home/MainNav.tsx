import { Link, useLocation } from 'react-router-dom';
import { MaterialIcon } from '@/components/common';
import { useFeedback } from '@/context/FeedbackContext';
import { cn } from '@/utils/cn';

interface MainNavProps {
  className?: string;
}

const navLinks = [
  { path: '/', label: 'Inicio', dataPath: 'inicio', icon: 'home' },
  { path: '/nosotros', label: 'Nosotros', dataPath: 'nosotros', icon: 'info' },
  { path: '/contacto', label: 'Contacto', dataPath: 'contacto-&-sede-maracay', icon: 'contact_phone' },
] as const;

const bottomNavItems = [
  { path: '/', label: 'Inicio', icon: 'home', dataPath: 'inicio' },
  { path: '/nosotros', label: 'Nosotros', icon: 'info', dataPath: 'nosotros' },
  { path: '/contacto', label: 'Contacto', icon: 'contact_phone', dataPath: 'contacto-&-sede-maracay' },
] as const;

export function MainNav({ className }: MainNavProps) {
  const location = useLocation();
  const { open: openFeedback } = useFeedback();

  return (
    <>
      {/* Desktop + Mobile Top Bar: Logo + Desktop Nav */}
      <div className={cn('bg-surface-canvas/95 backdrop-blur-md border-b border-surface-border/50', className)}>
        <div className="container-main h-16 flex items-center justify-between gap-space-lg">
          {/* Logo - centered on mobile, left on desktop */}
          <Link
            to="/"
            className="flex items-center shrink-0 mx-auto lg:mr-auto lg:mx-0"
            data-path="inicio"
            aria-label="GOMAFLEX - Inicio"
          >
            <img
              src="/logos/Color-para-superficies-claras.png"
              alt="Soluciones GOMAFLEX"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg font-label-md text-label-md transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary-subtle text-primary-container font-semibold'
                    : 'text-text-primary hover:bg-surface-subtle hover:text-primary-container'
                )}
                data-path={link.dataPath}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                <MaterialIcon
                  name={link.icon}
                  size={18}
                  className={cn(
                    'transition-colors',
                    location.pathname === link.path ? 'text-primary-container' : 'text-text-muted'
                  )}
                  aria-hidden
                />
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={openFeedback}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-border transition-all shadow-sm',
                'bg-surface-subtle hover:bg-primary-subtle text-text-primary hover:text-primary',
                'font-label-md text-label-md'
              )}
            >
              <MaterialIcon name="rate_review" size={18} className="text-primary-container" aria-hidden />
              <span>Sugerencias</span>
            </button>
          </nav>

          {/* Mobile: Hamburger menu would go here if needed, but we use bottom nav */}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-canvas/95 backdrop-blur-md border-t border-surface-border/50" aria-label="Navegación principal móvil">
        <div className="flex justify-around items-center h-16 px-4">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 font-label-sm text-label-sm transition-colors',
                location.pathname === item.path
                  ? 'text-primary-container'
                  : 'text-text-muted hover:text-text-primary'
              )}
              data-path={item.dataPath}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <MaterialIcon
                name={item.icon}
                size={24}
                className={cn(
                  'transition-colors',
                  location.pathname === item.path ? 'text-primary-container' : 'text-text-muted'
                )}
                aria-hidden
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}