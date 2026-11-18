import { MaterialIcon } from '@/components/common'
import { categories } from '@/data/catalog'

const tileClass =
  'group flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-transparent bg-surface-subtle px-1 text-center transition-[transform,border-color] duration-200 hover:border-primary-container/40 motion-safe:hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'

export function CatalogGrid() {
  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-title"
      className="container-main mt-8 scroll-mt-16 lg:scroll-mt-24"
    >
      <h2
        id="catalogo-title"
        className="font-headline-lg text-headline-lg font-bold italic text-text-primary"
      >
        Explora el catálogo
      </h2>
      <div aria-hidden className="mt-2 h-1 w-14 rounded-full bg-primary-container" />

      <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <a
              href="#arma-tu-pedido"
              aria-label={`Ver categoría ${category.name}`}
              className={tileClass}
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt=""
                  className="h-14 w-14 rounded object-cover sm:h-16 sm:w-16"
                  loading="lazy"
                />
              ) : (
                <>
                  <MaterialIcon
                    name={category.icon}
                    size={64}
                    className="text-text-primary/70 lg:hidden"
                  />
                  <MaterialIcon
                    name={category.icon}
                    size={72}
                    className="hidden text-text-primary/70 lg:block"
                  />
                </>
              )}
              <span className="font-label-md text-[13px] font-bold leading-tight text-text-primary sm:text-[15px]">
                {category.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
