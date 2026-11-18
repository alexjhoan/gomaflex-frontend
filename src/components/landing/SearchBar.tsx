import { useId, useState, type FormEvent } from 'react'

import { MaterialIcon } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { api } from '@/services/api'
import { cn } from '@/utils/cn'

const VEHICLE_BRANDS = ['Chevrolet', 'Ford', 'Hyundai', 'Mitsubishi', 'Nissan', 'Toyota']
const VEHICLE_MODELS = ['Aveo', 'Spark', 'Corolla', 'Hilux', 'Ranger', 'Accent']
const VEHICLE_YEARS = Array.from({ length: 21 }, (_, index) => String(2025 - index))

const fieldClass =
  'h-11 w-full rounded-lg border border-surface-border bg-white px-3 font-body-md text-body-md text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2'

function scrollToCatalog() {
  document.getElementById('catalogo')?.scrollIntoView({ block: 'start' })
}

interface SearchBarProps {
  /** `header` se usa en la barra superior de escritorio; `page`, en mobile/tablet. */
  variant?: 'page' | 'header'
}

export function SearchBar({ variant = 'page' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [vehicleOpen, setVehicleOpen] = useState(false)
  const inputId = useId()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const mensaje = query.trim()

    if (mensaje) {
      try {
        await api.post('/sugerencias', { tipo: 'repuesto', mensaje, contacto: '' })
      } catch {
        // Silencioso a propósito: el endpoint está en mantenimiento.
      }
    }

    scrollToCatalog()
  }

  function handleVehicleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setVehicleOpen(false)
    scrollToCatalog()
  }

  return (
    <div className="w-full">
      <form role="search" aria-label="Buscar en el catálogo" onSubmit={handleSubmit}>
        <div className="flex w-full items-stretch">
          <div className="relative flex-1">
            <label className="sr-only" htmlFor={inputId}>
              Pieza, código o vehículo
            </label>
            <MaterialIcon
              name="search"
              size={20}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pieza, código o vehículo"
              className="h-11 w-full rounded-l-lg border border-r-0 border-surface-border bg-white pl-10 pr-3 font-body-md text-body-md text-text-primary placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-0"
            />
          </div>
          <button
            type="submit"
            aria-label="Buscar"
            className={cn(
              'flex h-11 items-center justify-center gap-2 rounded-r-lg bg-primary-container px-3 text-white transition-colors hover:bg-primary-hover',
              'focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2',
              variant === 'header' && 'px-5',
            )}
          >
            <MaterialIcon name="search" size={20} />
            {variant === 'header' && (
              <span className="font-label-md text-label-md font-bold">Buscar</span>
            )}
          </button>
        </div>
      </form>

      {variant === 'page' && (
        <>
          <button
            type="button"
            onClick={() => setVehicleOpen(true)}
            className="mt-2 inline-flex min-h-[32px] items-center gap-1.5 font-label-md text-label-md font-bold text-text-primary underline decoration-primary-container decoration-2 underline-offset-4 transition-colors hover:text-primary-container focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
          >
            <MaterialIcon name="directions_car" size={18} className="text-primary-container" />
            Buscar por vehículo
          </button>

          <Dialog open={vehicleOpen} onOpenChange={setVehicleOpen}>
            <DialogContent className="max-w-sm gap-4 rounded-lg border-surface-border bg-white">
              <DialogTitle className="font-headline-md text-headline-md italic text-text-primary">
                Buscar por vehículo
              </DialogTitle>
              <DialogDescription className="sr-only">
                Selecciona la marca, el modelo y el año de tu vehículo para filtrar el catálogo.
              </DialogDescription>

              <form className="flex flex-col gap-3" onSubmit={handleVehicleSearch}>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-text-muted" htmlFor={`${inputId}-marca`}>
                    Marca
                  </label>
                  <select id={`${inputId}-marca`} className={fieldClass} defaultValue="Chevrolet">
                    {VEHICLE_BRANDS.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-text-muted" htmlFor={`${inputId}-modelo`}>
                    Modelo
                  </label>
                  <select id={`${inputId}-modelo`} className={fieldClass} defaultValue="Aveo">
                    {VEHICLE_MODELS.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-text-muted" htmlFor={`${inputId}-anio`}>
                    Año
                  </label>
                  <select id={`${inputId}-anio`} className={fieldClass} defaultValue="2015">
                    {VEHICLE_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-1 min-h-[44px] w-full rounded-md bg-primary-container py-2.5 font-label-md text-label-md font-bold text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
                >
                  Buscar
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
