import { toast } from 'sonner'

import { MaterialIcon } from '@/components/common'
import { useOrder } from '@/context/OrderContext'
import { products, type Product } from '@/data/catalog'

const productImageClass = 'text-text-primary/70'

function ProductCard({ product }: { product: Product }) {
  const { items, addItem } = useOrder()
  const inOrder = items.some((item) => item.id === product.id)

  function handleAdd() {
    if (inOrder) return
    addItem(product)
    toast.success('Agregado a tu pedido')
  }

  return (
    <article className="flex flex-col rounded-lg border border-surface-border bg-white p-3">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-surface-subtle">
        {product.image ? (
          <img src={product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <MaterialIcon name={product.icon} size={44} className={productImageClass} />
        )}
      </div>

      <h3 className="mt-2 min-h-[2rem] font-label-md text-label-md font-bold leading-tight text-text-primary line-clamp-2">
        {product.name}
      </h3>

      <span className="mt-1.5 inline-flex items-center gap-1.5 self-start rounded-full bg-primary-subtle px-2 py-0.5 text-[11px] font-bold leading-4 text-primary-container">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary-container" />
        Por confirmar
      </span>

      <button
        type="button"
        onClick={handleAdd}
        disabled={inOrder}
        className={
          inOrder
            ? 'mt-2.5 min-h-[44px] w-full rounded-md border border-primary-container bg-white py-2.5 font-label-md text-label-md font-bold text-primary-container focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'
            : 'mt-2.5 min-h-[44px] w-full rounded-md border border-transparent bg-primary-container py-2.5 font-label-md text-label-md font-bold text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'
        }
      >
        {inOrder ? 'En tu pedido' : 'Agregar al pedido'}
      </button>
    </article>
  )
}

export function OrderBuilder() {
  return (
    <section
      id="arma-tu-pedido"
      aria-labelledby="pedido-title"
      className="container-main mt-8 scroll-mt-16 lg:scroll-mt-24"
    >
      <h2
        id="pedido-title"
        className="font-headline-lg text-headline-lg font-bold italic text-text-primary"
      >
        Arma tu pedido
      </h2>
      <div aria-hidden className="mt-2 h-1 w-14 rounded-full bg-primary-container" />

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
