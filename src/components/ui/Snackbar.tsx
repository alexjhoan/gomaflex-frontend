import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { MaterialIcon } from '@/components/common/MaterialIcon'

export interface Snackbar {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface SnackbarContextType {
  showSnackbar: (snackbar: Omit<Snackbar, 'id'>) => void
}

const SnackbarContext = createContext<SnackbarContextType | null>(null)

const ICON_MAP: Record<Snackbar['type'], string> = {
  error: 'error',
  success: 'check_circle',
  warning: 'warning',
  info: 'info',
}

const CLASS_MAP: Record<Snackbar['type'], string> = {
  error: 'bg-destructive/90 text-white',
  success: 'bg-green-600/90 text-white',
  warning: 'bg-yellow-600/90 text-white',
  info: 'bg-blue-600/90 text-white',
}

interface SnackbarContextType {
  showSnackbar: (snackbar: Omit<Snackbar, 'id'>) => void
}

const SnackbarContext = createContext<SnackbarContextType | null>(null)

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbars, setSnackbars] = useState<Array<Snackbar>>([])

  const showSnackbar = useCallback((snackbar: Omit<Snackbar, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9)
    const newSnackbar = { ...snackbar, id }
    setSnackbars(prev => [...prev, { ...snackbar, id }])
    
    setTimeout(() => {
      setSnackbars(prev => prev.filter(s => s.id !== id))
    }, snackbar.duration || 5000)
  }, [])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {snackbars.map(snackbar => (
          <div
            key={snackbar.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl animate-slide-in"
            role="alert"
          >
            <MaterialIcon 
              name={{ 'error': 'error', 'success': 'check_circle', 'warning': 'warning', 'info': 'info' }[snackbar.type]}
              size={20} 
              className="flex-shrink-0"
              aria-hidden
            />
            <span className="font-body-sm text-body-sm">{snackbar.message}</span>
          </div>
        )}
      </div>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const context = useContext(SnackbarContext)
  if (!context) throw new Error('useSnackbar must be used within SnackbarProvider')
  return context
}