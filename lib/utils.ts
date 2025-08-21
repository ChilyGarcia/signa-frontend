import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para mapear estados de marcas
export function getBrandStatusInfo(status: string) {
  switch (status) {
    case 'PENDING':
      return {
        label: 'Pendiente',
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      }
    case 'REGISTERED':
      return {
        label: 'Registrado',
        className: 'bg-green-50 text-green-700 border-green-200'
      }
    case 'REJECTED':
      return {
        label: 'Rechazado',
        className: 'bg-red-50 text-red-700 border-red-200'
      }
    case 'EXPIRED':
      return {
        label: 'Expirado',
        className: 'bg-gray-50 text-gray-700 border-gray-200'
      }
    case 'CANCELLED':
      return {
        label: 'Cancelado',
        className: 'bg-red-50 text-red-700 border-red-200'
      }
    default:
      return {
        label: status,
        className: 'bg-gray-50 text-gray-700 border-gray-200'
      }
  }
}
