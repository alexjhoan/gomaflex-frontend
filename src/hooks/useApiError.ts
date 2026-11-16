import { useCallback } from 'react'
import { useSnackbar } from '@/components/ui/Snackbar'
import { ApiErrorResponse } from '@/services/api'

export function useApiError() {
  const { showSnackbar } = useSnackbar()

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('API Error:', error)

    let message = 'Error inesperado'
    let detail = ''

    if (error && typeof error === 'object' && 'status' in error) {
      const err = error as { status: number; statusText: string; body?: Record<string, string> }
      message = `Error ${err.status}: ${err.statusText}`
      detail = err.body?.detail || ''
    } else if (error instanceof Response) {
      message = `Error ${error.status}: ${error.statusText}`
    } else if (error instanceof Error) {
      message = error.message
    }

    showSnackbar({
      type: 'error',
      message: `${message}${detail ? ` - ${detail}` : ''}`,
      duration: 6000,
    })
  }, [showSnackbar])

  return { handleError }
}