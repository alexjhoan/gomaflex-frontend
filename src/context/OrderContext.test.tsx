import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import type { Product } from '@/data/catalog'

import { OrderProvider, useOrder } from './OrderContext'

const sonnerMock = vi.hoisted(() => ({
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}))

vi.mock('sonner', () => sonnerMock)

const product: Product = {
  id: 'manguera-radiador',
  name: 'Manguera de radiador',
  icon: 'plumbing',
  status: 'por_confirmar',
}

const otherProduct: Product = {
  id: 'filtro-aceite',
  name: 'Filtro de aceite',
  icon: 'filter_alt',
  status: 'por_confirmar',
}

function Wrapper({ children }: { children: ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>
}

describe('OrderContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('arranca con el pedido vacío', () => {
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper })

    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
  })

  it('agrega un producto y actualiza el contador', () => {
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper })

    act(() => result.current.addItem(product))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.count).toBe(1)
  })

  it('no duplica el mismo producto y avisa con un toast', () => {
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper })

    act(() => result.current.addItem(product))
    act(() => result.current.addItem(product))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.count).toBe(1)
    expect(sonnerMock.toast).toHaveBeenCalledWith('Ya está en tu pedido')
  })

  it('permite agregar productos distintos', () => {
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper })

    act(() => result.current.addItem(product))
    act(() => result.current.addItem(otherProduct))

    expect(result.current.count).toBe(2)
  })

  it('quita un producto del pedido', () => {
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper })

    act(() => result.current.addItem(product))
    act(() => result.current.addItem(otherProduct))
    act(() => result.current.removeItem(product.id))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]?.id).toBe(otherProduct.id)
  })

  it('falla si se usa fuera del provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useOrder())).toThrow('useOrder debe usarse dentro de OrderProvider')

    spy.mockRestore()
  })
})
