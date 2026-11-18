export interface Category {
  slug: string
  name: string
  icon: string
  /** Foto opcional: si existe se renderiza en el tile en lugar del icono. */
  image?: string
}

export interface Product {
  id: string
  name: string
  icon: string
  /** Foto opcional: si existe se renderiza en la tarjeta en lugar del icono. */
  image?: string
  status: 'por_confirmar'
}

export const categories: Category[] = [
  { slug: 'mangueras', name: 'Mangueras', icon: 'plumbing' },
  { slug: 'suspension', name: 'Suspensión', icon: 'tire_repair' },
  { slug: 'filtros', name: 'Filtros', icon: 'filter_alt' },
  { slug: 'lubricantes', name: 'Lubricantes', icon: 'oil_barrel' },
  { slug: 'encendido', name: 'Encendido', icon: 'electric_bolt' },
  { slug: 'frenos', name: 'Frenos', icon: 'disc_full' },
]

export const products: Product[] = [
  { id: 'manguera-radiador', name: 'Manguera de radiador', icon: 'plumbing', status: 'por_confirmar' },
  { id: 'filtro-aceite', name: 'Filtro de aceite', icon: 'filter_alt', status: 'por_confirmar' },
]

export const WHATSAPP_URL = 'https://wa.me/5841206259521'
