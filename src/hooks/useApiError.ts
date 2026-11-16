import { useCallback } from 'react'
import { useSnackbar } from '@/components/ui/Snackbar'

export function useApiError() {
  const { showSnackbar } = useSnackbar()

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('API Error:', error)

    let message = customMessage || 'Error inesperado'
    let detail = ''

    if (error && typeof error === 'object' && 'status' in error) {
      const err = error as { status: number; statusText: string; body?: Record<string, string> }
      message = customMessage || `Error ${err.status}: ${err.statusText}`
      detail = err.body?.detail || ''
    } else if (error instanceof Response) {
      message = customMessage || `Error ${error.status}: ${error.statusText}`
    } else if (error instanceof Error) {
      message = customMessage || error.message
    }

    showSnackbar({
      type: 'error',
      message: `${message}${detail ? ` - ${detail}` : ''}`,
      duration: 6000,
    })
  }, [showSnackbar])

  return { handleError }
}