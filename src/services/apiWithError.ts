import { api } from './api'
import { useApiError } from '@/hooks/useApiError'

export function useApiWithError() {
  const { handleError } = useApiError()

  const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    customMessage?: string
  ): Promise<T | null> => {
    try {
      return await apiCall()
    } catch (error) {
      handleError(error, customMessage)
      return null
    }
  }

  return { withErrorHandling }
}