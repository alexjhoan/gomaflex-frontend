import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

import type { Product } from '@/data/catalog'

interface OrderContextValue {
  items: Product[]
  count: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  // Espejo síncrono del estado: permite decidir si el producto ya existe
  // sin ejecutar efectos secundarios dentro del updater de useState.
  const itemsRef = useRef<Product[]>([])

  const addItem = useCallback((product: Product) => {
    if (itemsRef.current.some((item) => item.id === product.id)) {
      toast('Ya está en tu pedido')
      return
    }
    itemsRef.current = [...itemsRef.current, product]
    setItems(itemsRef.current)
  }, [])

  const removeItem = useCallback((id: string) => {
    itemsRef.current = itemsRef.current.filter((item) => item.id !== id)
    setItems(itemsRef.current)
  }, [])

  const value = useMemo<OrderContextValue>(
    () => ({ items, count: items.length, addItem, removeItem }),
    [items, addItem, removeItem],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder debe usarse dentro de OrderProvider')
  }
  return context
}
