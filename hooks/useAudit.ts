import { useState, useEffect } from 'react'
import { getAuthHeaders } from '@/lib/auth'

export interface AuditLog {
  id: number
  brand_id: number
  brand_name: string
  action: string
  user_id: number
  user_email: string
  old_values: string | null
  new_values: string | null
  changes_summary: string
  ip_address: string
  user_agent: string
  timestamp: string
}

export interface AuditStatistics {
  total_audits: number
  creations: number
  updates: number
  deletions: number
  status_changes: number
}

export interface AuditFilters {
  brandId?: number
  userId?: number
  action?: string
  dateFrom?: string
  dateTo?: string
  brandName?: string
}

interface UseAuditReturn {
  auditLogs: AuditLog[]
  statistics: AuditStatistics | null
  isLoading: boolean
  error: string | null
  refetch: () => void
  applyFilters: (filters: AuditFilters) => void
  clearFilters: () => void
  currentFilters: AuditFilters
}

export function useAudit(skip: number = 0, limit: number = 100): UseAuditReturn {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [statistics, setStatistics] = useState<AuditStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentFilters, setCurrentFilters] = useState<AuditFilters>({})

  const buildUrl = (filters: AuditFilters, skip: number, limit: number): string => {
    let baseUrl = 'http://127.0.0.1:8000/audit'
    
    // Si hay filtro por marca específica (ID)
    if (filters.brandId) {
      baseUrl += `/brand/${filters.brandId}`
    }
    // Si hay filtro por usuario específico
    else if (filters.userId) {
      baseUrl += `/user/${filters.userId}`
    }
    // Si hay filtro por acción específica
    else if (filters.action) {
      baseUrl += `/action/${filters.action}`
    }
    // Si hay filtro por rango de fechas
    else if (filters.dateFrom || filters.dateTo) {
      baseUrl += '/date-range'
    }
    // Si hay filtro por nombre de marca
    else if (filters.brandName) {
      baseUrl += '/search'
    }
    
    // Agregar parámetros de paginación
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString()
    })
    
    // Agregar filtros adicionales como query parameters
    if (filters.dateFrom) {
      params.append('date_from', filters.dateFrom)
    }
    if (filters.dateTo) {
      params.append('date_to', filters.dateTo)
    }
    if (filters.brandName) {
      params.append('brand_name', filters.brandName)
    }
    
    return `${baseUrl}?${params.toString()}`
  }

  const fetchStatistics = async () => {
    try {
      const headers = getAuthHeaders()
      const response = await fetch('http://127.0.0.1:8000/audit/statistics', {
        headers
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, inicia sesión nuevamente.')
        }
        throw new Error(`Error al obtener estadísticas: ${response.status}`)
      }
      
      const data: AuditStatistics = await response.json()
      setStatistics(data)
    } catch (err) {
      console.error('Error fetching statistics:', err)
      // No establecemos error aquí para no afectar la carga principal
    }
  }

  const fetchAuditLogs = async (filters: AuditFilters = currentFilters) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const headers = getAuthHeaders()
      const url = buildUrl(filters, skip, limit)
      
      const response = await fetch(url, {
        headers
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('No autorizado. Por favor, inicia sesión nuevamente.')
        }
        throw new Error(`Error al obtener logs de auditoría: ${response.status}`)
      }
      
      const data: AuditLog[] = await response.json()
      setAuditLogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error fetching audit logs:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAuditLogs()
    fetchStatistics()
  }, [skip, limit, currentFilters])

  const applyFilters = (filters: AuditFilters) => {
    setCurrentFilters(filters)
  }

  const clearFilters = () => {
    setCurrentFilters({})
  }

  const refetch = () => {
    fetchAuditLogs()
    fetchStatistics()
  }

  return {
    auditLogs,
    statistics,
    isLoading,
    error,
    refetch,
    applyFilters,
    clearFilters,
    currentFilters
  }
}
