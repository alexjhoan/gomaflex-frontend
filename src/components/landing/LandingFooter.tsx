import { Link } from 'react-router-dom'

const footerLinkClass =
  'rounded transition-colors hover:text-primary-container hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'

export function LandingFooter() {
  return (
    <footer className="mt-10 border-t border-surface-border bg-white py-8">
      <div className="container-main flex flex-col items-center gap-2 text-center">
        <img
          src="/logos/Color-para-superficies-claras.png"
          alt="Soluciones GOMAFLEX"
          className="h-10 w-auto"
        />
        <p className="mt-1 font-label-md text-label-md italic text-text-primary">
          Flexibilidad que conecta.
        </p>
        <p className="font-body-sm text-body-sm text-text-muted">
          Operado por Soluciones GOMAFLEX, C.A.
        </p>

        <nav
          aria-label="Enlaces del pie de página"
          className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body-sm text-body-sm text-text-muted"
        >
          <Link to="/nosotros" className={footerLinkClass}>
            Nosotros
          </Link>
          <span aria-hidden>·</span>
          <Link to="/contacto" className={footerLinkClass}>
            Contacto
          </Link>
          <span aria-hidden>·</span>
          <Link to="/contacto" className={footerLinkClass}>
            Buzón de sugerencias
          </Link>
        </nav>
      </div>
    </footer>
  )
}
