import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { Home } from '@/pages/Home'

const sonnerMock = vi.hoisted(() => ({
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

vi.mock('sonner', () => sonnerMock)

vi.mock('react-cookie', () => ({
  Cookies: class {
    get() {
      return undefined
    }
    set() {
      return undefined
    }
    remove() {
      return undefined
    }
  },
}))

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home (landing)', () => {
  it('muestra un solo h1 con el mensaje del hero', () => {
    renderHome()

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(/Encuentra lo que tu vehículo necesita/i)
  })

  it('muestra las 6 categorías del catálogo', () => {
    renderHome()

    const tiles = screen.getAllByRole('link', { name: /^Ver categoría/i })
    expect(tiles.map((tile) => tile.getAttribute('aria-label'))).toEqual([
      'Ver categoría Mangueras',
      'Ver categoría Suspensión',
      'Ver categoría Filtros',
      'Ver categoría Lubricantes',
      'Ver categoría Encendido',
      'Ver categoría Frenos',
    ])
  })

  it('muestra los productos a pedir con su estado por confirmar', () => {
    renderHome()

    expect(screen.getByRole('heading', { level: 3, name: 'Manguera de radiador' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Filtro de aceite' })).toBeInTheDocument()
    expect(screen.getAllByText('Por confirmar')).toHaveLength(2)
  })

  it('agrega un producto al pedido y deshabilita el botón', async () => {
    const user = userEvent.setup()
    renderHome()

    const addButtons = screen.getAllByRole('button', { name: 'Agregar al pedido' })
    expect(addButtons).toHaveLength(2)

    await user.click(addButtons[0] as HTMLElement)

    const done = screen.getByRole('button', { name: 'En tu pedido' })
    expect(done).toBeDisabled()
    expect(sonnerMock.toast.success).toHaveBeenCalledWith('Agregado a tu pedido')
  })

  it('expone los accesos principales en el tab bar móvil', () => {
    renderHome()

    const tabBar = screen.getByRole('navigation', { name: 'Navegación principal móvil' })
    expect(tabBar).toBeInTheDocument()
    expect(within(tabBar).getByRole('link', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page')
    expect(within(tabBar).getByRole('link', { name: 'Catálogo' })).toHaveAttribute('href', '#catalogo')
    expect(within(tabBar).getByRole('link', { name: 'Ayuda' })).toHaveAttribute('href', '/contacto')
  })

  it('abre el panel del pedido desde el tab bar', async () => {
    const user = userEvent.setup()
    renderHome()

    const tabBar = screen.getByRole('navigation', { name: 'Navegación principal móvil' })
    await user.click(within(tabBar).getByRole('button', { name: 'Mi pedido' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Tu pedido está vacío')).toBeInTheDocument()
  })
})
