import { ImageCard } from '@/components/common'
import { cn } from '@/utils/cn'

interface CategoriesProps {
  className?: string
}

const categories = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYmeLYpuc116a_-IjfslADTJBIBHEskIj9H71xxOl6Afy9KYxSPYmRTWju5my4yWVUcZix0U3bYQb5aB6TJQghdF_NiPDO8OIU7N-LTXOALrsThYq-ZAc8883cxyZ8CEa234xXEf1akUJIiqHwTCWI5Lt2daJoQylnQj-2FofNgn0PHUQxoQFJiF7zovoGfPgLzVLuCPq6hDYzUFGKkpws3j8lI65l7RR39Kcdj1U',
    alt: 'Manguera automotriz curva de goma reforzada negra con corrugación acanalada, textura de goma mate, fondo blanco sin costuras, repuesto automotriz de precisión',
    badge: '+180 Ref',
    title: 'Mangueras Automotrices',
    description: 'Radiador superior, inferior, bypass, calefacción y silicona turbo.',
    linkText: 'Explorar Mangueras',
    linkHref: '/catalogo/mangueras',
    accentColor: 'primary' as const,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnAOChSgwCKJJxxh9SOj1-_5tO76egCYIwSvfRKQytAmm8lEOvrV9TC2a-9ODTLK5ucntnSAr-gB4Y5invU52ow553PgXY3hUVYeTuvpgh16YFcDzc01yBE-JRyin0uu1xwqy8MFDyb1GMf4px3pLey0FWLfBi9J6crFo4_vqFigw3M2WlEwGb3-frupQZ50GkdDDFJMo2LAKXWUiGH8euvtCMDn0RKqqObwwphlY',
    alt: 'Guardapolvo de junta homocinética de goma flexible negra acanalada con pliegues de acordeón, fondo blanco limpio puro, repuesto de suspensión automotriz de alto contraste',
    badge: 'Goma Virgen',
    title: 'Guardapolvos y Fuelles',
    description: 'Tripoides copa y rueda, cremallera de dirección y amortiguador.',
    linkText: 'Ver Guardapolvos',
    linkHref: '/catalogo/guardapolvos',
    accentColor: 'dark' as const,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDwbI5du_i7GnPRFO1byYECS5TuZpYBAgBPVVHW2lxxBVu8rS_AoPWs9BsYJMKzOjM4KZYBv6gC9OHInZLNePIcQmmTS0jKF4XvYmnZgwQp16yKwHKgC9mfek7iu95RArjLZ50VacjSzQinHTKRx1pyZyO1tei6WNyDD0C_EjU2YygQsGp7VDrVCEyEQCAD5IzrEkZhw22f3D2iC5HQXLAGTxDXszjtz8MJ7jiCp4',
    alt: 'Buje de suspensión cilíndrico de goma negra con manga interior metálica, pieza de montaje automotriz de precisión sobre superficie blanca neutra',
    badge: 'Metal-Caucho',
    title: 'Bujes y Soportes',
    description: 'Bujes de meseta, barra estabilizadora y soportes de motor/caja.',
    linkText: 'Ver Bujes',
    linkHref: '/catalogo/bujes',
    accentColor: 'dark' as const,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPGyvmA5CIOrn0s4vOAAu_lt3DKhiEploS4RZG1LJC1cWQjYjmqvZOuQYNPsIRScrKR_cToT88SWqhq3g0FwZo3Lbx2_ccApmp6Vsm7290gmM3qFtpEsPFV6NkZxphYx65tCau0GrX6rTMNwEuarMuDXaE-zN4LNB9t3a2NWP50S-O3Akbm2tKUpxQTXbjVhN-8rs7YZr7d7mP_ojdSFgXzv8VYHm5CoGkP9fLEgI',
    alt: 'O-rings y empaquetaduras circulares de goma negra para líneas hidráulicas de presión automotriz, contraste nítido sobre fondo blanco de estudio puro',
    badge: 'Nitrilo & Vitón',
    title: 'Otros Componentes',
    description: 'O-rings, empacaduras, abrazaderas de presión constante y tapas.',
    linkText: 'Ver Sellos y Kits',
    linkHref: '/catalogo/sellos',
    accentColor: 'success' as const,
  },
]

export function Categories({ className }: CategoriesProps) {
  return (
    <section className={cn('w-full', className)}>
      <div className="container-main py-14">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="flex items-center gap-3 w-full max-w-md justify-center">
            <div className="h-0.5 bg-primary-container flex-1 rounded" aria-hidden />
            <h2 className="font-headline-lg text-headline-lg tracking-tight uppercase text-text-primary shrink-0">
              CATEGORÍAS <span className="text-primary-container">PRINCIPALES</span>
            </h2>
            <div className="h-0.5 bg-primary-container flex-1 rounded" aria-hidden />
          </div>
          <p className="font-body-md text-body-md text-text-muted mt-2 max-w-xl">
            Gomas prensadas, componentes vulcanizados y mangueras con estricta tolerancia a presiones hidráulicas y refrigerantes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <ImageCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}