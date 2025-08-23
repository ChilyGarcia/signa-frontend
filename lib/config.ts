// Configuración de la aplicación
export const config = {
  // API Configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
  
  // App Configuration
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Signa',
  
  // API Endpoints
  endpoints: {
    auth: {
      login: process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT || '/auth/login'
    },
    audit: {
      base: '/audit',
      statistics: '/audit/statistics',
      brand: (id: number) => `/audit/brand/${id}`,
      user: (id: number) => `/audit/user/${id}`,
      action: (action: string) => `/audit/action/${action}`,
      dateRange: '/audit/date-range',
      search: '/audit/search'
    },
    brands: {
      base: '/brands/',
      byId: (id: number) => `brands/${id}`,
      status: (id: number, status: string) => `brands/${id}/status?status=${status}`
    }
  }
}

// Función utilitaria para construir URLs de la API
export function buildApiUrl(endpoint: string): string {
  return `${config.apiBaseUrl}${endpoint}`
}

// Función utilitaria para construir URLs de auditoría con parámetros
export function buildAuditUrl(endpoint: string, params?: Record<string, string | number>): string {
  let url = buildApiUrl(endpoint)
  
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString())
    })
    url += `?${searchParams.toString()}`
  }
  
  return url
}
