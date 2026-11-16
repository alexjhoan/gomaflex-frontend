import { Link } from 'react-router-dom'
import { MaterialIcon } from '@/components/common'
import { useFeedback } from '@/context/FeedbackContext'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { open: openFeedback } = useFeedback()

  return (
    <footer className="w-full bg-text-primary text-surface-dim pt-space-2xl pb-space-xl" role="contentinfo">
      <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-2xl">
        {/* Brand & Social */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center mb-1">
            <img
              src="/logos/Color-para-superficies-claras.png"
              alt="Soluciones GOMAFLEX"
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="font-body-sm text-body-sm text-secondary-fixed-dim leading-relaxed">
            Especialistas en mangueras de alta y baja presión, bujes, soportes y componentes de caucho de precisión automotriz e industrial en el centro del país.
          </p>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <span className="text-[11px] font-label-md text-surface-subtle bg-inverse-surface px-space-sm py-1 rounded">
              RIF: J-50392811-0
            </span>
            <span className="text-[11px] font-label-md text-fitment-success bg-inverse-surface px-space-sm py-1 rounded flex items-center gap-1">
              <MaterialIcon name="verified" size={12} aria-hidden />
              Tienda Física
            </span>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="https://instagram.com/gomaflex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-surface-subtle hover:text-surface-bright text-body-sm transition-colors"
            >
              <svg className="w-4 h-4 text-primary-container fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram: <span className="text-primary-container font-bold hover:underline">@gomaflex</span></span>
            </Link>
            <div className="flex items-center gap-3 pt-1 text-[12px] font-label-md">
              <Link to="/nosotros" data-path="nosotros" className="text-secondary-fixed hover:text-surface-bright transition-colors">
                Nosotros
              </Link>
              <span className="text-secondary" aria-hidden>•</span>
              <Link to="/contacto" data-path="contacto-&-sede-maracay" className="text-secondary-fixed hover:text-surface-bright transition-colors">
                Contacto & Sede
              </Link>
              <span className="text-secondary" aria-hidden>•</span>
              <button
                type="button"
                onClick={openFeedback}
                className="text-secondary-fixed hover:text-primary-container transition-colors inline-flex items-center gap-1 bg-transparent border-none p-0 font-inherit cursor-pointer"
              >
                <MaterialIcon name="rate_review" size={14} aria-hidden />
                Buzón de Sugerencias
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-space-md">
          <h3 className="font-headline-sm text-headline-sm text-surface-bright uppercase tracking-wide">
            Categorías Principales
          </h3>
          <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-secondary-fixed-dim">
            <li className="hover:text-surface-bright transition-colors">
              <Link to="/catalogo/mangueras" data-path="catalogo-de-mangueras" className="hover:underline">
                Mangueras Radiador & Calefacción
              </Link>
            </li>
            <li className="hover:text-surface-bright transition-colors">
              <Link to="/catalogo/guardapolvos" data-path="guardapolvos-y-fuelles" className="hover:underline">
                Guardapolvos de Tripoides y Dirección
              </Link>
            </li>
            <li className="hover:text-surface-bright transition-colors">
              <Link to="/catalogo/bujes" data-path="bujes-y-soportes" className="hover:underline">
                Soportes de Motor y Caja
              </Link>
            </li>
            <li className="hover:text-surface-bright transition-colors">
              <Link to="/catalogo/bujes" data-path="bujes-y-soportes" className="hover:underline">
                Bujes de Suspensión y Muñones
              </Link>
            </li>
            <li className="hover:text-surface-bright transition-colors">
              <Link to="/catalogo/sellos" data-path="sellos-y-o-rings" className="hover:underline">
                Sellos Hidráulicos & O-Rings NBR
              </Link>
            </li>
          </ul>
        </div>

        {/* Shipping */}
        <div className="flex flex-col gap-space-md">
          <h3 className="font-headline-sm text-headline-sm text-surface-bright uppercase tracking-wide">
            Envíos Nacionales
          </h3>
          <p className="font-body-sm text-body-sm text-secondary-fixed-dim">
            Despachos diarios y asegurados a todo el territorio nacional vía:
          </p>
          <div className="grid grid-cols-2 gap-space-xs font-label-md text-label-md">
            <div className="bg-inverse-surface px-space-md py-2 rounded text-surface-bright text-center">
              ZOOM
            </div>
            <div className="bg-inverse-surface px-space-md py-2 rounded text-surface-bright text-center">
              TEALCA
            </div>
            <div className="bg-inverse-surface px-space-md py-2 rounded text-surface-bright text-center">
              MRW
            </div>
            <div className="bg-inverse-surface px-space-md py-2 rounded text-fitment-success text-center flex items-center justify-center gap-1">
              <MaterialIcon name="moped" size={14} aria-hidden />
              Delivery Mcy
            </div>
          </div>
        </div>

        {/* Physical Location */}
        <div className="flex flex-col gap-space-md">
          <h3 className="font-headline-sm text-headline-sm text-surface-bright uppercase tracking-wide">
            Retiro en Sede Maracay
          </h3>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-secondary-fixed-dim">
            <div className="flex items-start gap-space-xs">
              <MaterialIcon name="location_on" size={18} className="text-primary-container shrink-0 mt-0.5" aria-hidden />
              <span>Av. Los Cedros c/c calle Mariño, Local GOMAFLEX, Maracay, Edo. Aragua.</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <MaterialIcon name="schedule" size={18} className="text-primary-container shrink-0" aria-hidden />
              <span>Lunes a Viernes: 8:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <MaterialIcon name="phone_in_talk" size={18} className="text-primary-container shrink-0" aria-hidden />
              <span>Master Maracay: (0243) 232-4411</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-main pt-space-lg flex flex-col md:flex-row items-center justify-between text-body-sm text-secondary gap-space-sm">
        <p>© {currentYear} Soluciones GOMAFLEX C.A. RIF J-50392811-0. Todos los derechos reservados.</p>
        <p className="font-body-sm text-[12px] text-tertiary-fixed-dim">
          Especialistas en Caucho y Mangueras Automotrices • Maracay, Venezuela
        </p>
      </div>
    </footer>
  )
}