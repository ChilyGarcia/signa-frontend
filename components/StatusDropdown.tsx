"use client"

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { getBrandStatusInfo } from '@/lib/utils'

interface StatusDropdownProps {
  currentStatus: string
  brandId: number
  brandName: string
  onStatusChange: (brandId: number, newStatus: string) => Promise<void>
}

const BRAND_STATUSES = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'REGISTERED', label: 'Registrado' },
  { value: 'REJECTED', label: 'Rechazado' },
  { value: 'EXPIRED', label: 'Expirado' },
  { value: 'CANCELLED', label: 'Cancelado' },
]

export function StatusDropdown({ currentStatus, brandId, brandName, onStatusChange }: StatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const statusInfo = getBrandStatusInfo(currentStatus)

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)
    try {
      await onStatusChange(brandId, newStatus)
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 ${statusInfo.className} ${isUpdating ? 'opacity-50' : ''}`}
          title="Haz clic para cambiar el estado"
        >
          {isUpdating ? 'Actualizando...' : statusInfo.label}
          <ChevronDown className="h-3 w-3" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-xs text-gray-500 border-b">
          Cambiar estado de "{brandName}"
        </div>
        {BRAND_STATUSES.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            disabled={status.value === currentStatus || isUpdating}
            className={`cursor-pointer ${status.value === currentStatus ? 'bg-gray-50 text-gray-400' : ''}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getBrandStatusInfo(status.value).className.replace('bg-', 'bg-').replace(' text-', '')}`} />
              {status.label}
              {status.value === currentStatus && <span className="text-xs text-gray-400">(Actual)</span>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
