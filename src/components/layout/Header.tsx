import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function Header() {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/login', label: 'Login' },
    { path: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold" aria-label="gomaflex Home">
          gomaflex
        </Link>
        <nav className="flex items-center gap-4" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}