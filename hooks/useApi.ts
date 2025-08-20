import { useState, useCallback } from 'react'
import { getAuthHeaders, removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi(options: UseApiOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const request = useCallback(async (
    url: string,
    options: RequestInit = {}
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const headers = getAuthHeaders()
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      })

      // Si el token es inválido, redirigir al login
      if (response.status === 401) {
        removeToken()
        router.push('/')
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      options.onSuccess?.(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Error en la petición'
      setError(errorMessage)
      options.onError?.(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [options, router])

  const get = useCallback((url: string, options?: RequestInit) => {
    return request(url, { ...options, method: 'GET' })
  }, [request])

  const post = useCallback((url: string, body: any, options?: RequestInit) => {
    return request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }, [request])

  const put = useCallback((url: string, body: any, options?: RequestInit) => {
    return request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }, [request])

  const del = useCallback((url: string, options?: RequestInit) => {
    return request(url, { ...options, method: 'DELETE' })
  }, [request])

  return {
    isLoading,
    error,
    request,
    get,
    post,
    put,
    delete: del,
  }
}
