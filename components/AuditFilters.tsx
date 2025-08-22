"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Calendar } from "lucide-react"
import { AuditFilters } from "@/hooks/useAudit"

interface AuditFiltersProps {
  onApplyFilters: (filters: AuditFilters) => void
  onClearFilters: () => void
  currentFilters: AuditFilters
  isLoading?: boolean
}

const ACTION_OPTIONS = [
  { value: "CREATE", label: "Registro Creado" },
  { value: "UPDATE", label: "Marca Editada" },
  { value: "DELETE", label: "Marca Eliminada" },
  { value: "STATUS_CHANGE", label: "Estado Cambiado" },
]

export function AuditFiltersComponent({ 
  onApplyFilters, 
  onClearFilters, 
  currentFilters, 
  isLoading = false 
}: AuditFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState<AuditFilters>(currentFilters)

  const handleApplyFilters = () => {
    onApplyFilters(localFilters)
  }

  const handleClearFilters = () => {
    setLocalFilters({})
    onClearFilters()
  }

  const handleFilterChange = (key: keyof AuditFilters, value: string | number | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

     const hasActiveFilters = Object.values(currentFilters).some(value => value !== undefined && value !== '' && value !== 'all')

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-lg font-semibold text-gray-900">Filtros</CardTitle>
                         {hasActiveFilters && (
               <Badge variant="secondary" className="bg-red-100 text-red-700 border border-red-200">
                 {Object.keys(currentFilters).filter(key => currentFilters[key as keyof AuditFilters] && currentFilters[key as keyof AuditFilters] !== 'all').length} activos
               </Badge>
             )}
          </div>
          <div className="flex items-center space-x-2">
                         <Button
               variant={isExpanded ? "outline" : "default"}
               size="sm"
               onClick={() => setIsExpanded(!isExpanded)}
               className={`transition-all duration-200 ${
                 isExpanded 
                   ? "border-red-300 text-red-600 hover:bg-red-50" 
                   : "bg-red-500 hover:bg-red-600 text-white"
               }`}
             >
               <Filter className="h-4 w-4 mr-2" />
               {isExpanded ? "Ocultar" : "Mostrar"} filtros
             </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

             {isExpanded && (
         <CardContent className="pt-0">
                       <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Información sobre filtros</h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Los filtros se aplican de forma <strong>exclusiva</strong>. Si seleccionas múltiples filtros, 
                    se usará el primero en el orden: <strong>ID de Marca</strong> → <strong>ID de Usuario</strong> → <strong>Acción</strong> → <strong>Rango de Fechas</strong> → <strong>Nombre de Marca</strong>.
                  </p>
                </div>
              </div>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {/* Filtro por ID de Marca */}
             <div className="space-y-2">
               <Label htmlFor="brandId" className="text-sm font-medium text-gray-700">
                 ID de Marca
               </Label>
               <Input
                 id="brandId"
                 type="number"
                 placeholder="Ej: 1"
                 value={localFilters.brandId || ''}
                 onChange={(e) => handleFilterChange('brandId', e.target.value ? parseInt(e.target.value) : undefined)}
                 className="border-gray-200 focus:border-red-500 focus:ring-red-500"
               />
             </div>

             {/* Filtro por Nombre de Marca */}
             <div className="space-y-2">
               <Label htmlFor="brandName" className="text-sm font-medium text-gray-700">
                 Nombre de Marca
               </Label>
               <Input
                 id="brandName"
                 type="text"
                 placeholder="Buscar por nombre de marca"
                 value={localFilters.brandName || ''}
                 onChange={(e) => handleFilterChange('brandName', e.target.value || undefined)}
                 className="border-gray-200 focus:border-red-500 focus:ring-red-500"
               />
             </div>

             {/* Filtro por ID de Usuario */}
             <div className="space-y-2">
               <Label htmlFor="userId" className="text-sm font-medium text-gray-700">
                 ID de Usuario
               </Label>
               <Input
                 id="userId"
                 type="number"
                 placeholder="Ej: 2"
                 value={localFilters.userId || ''}
                 onChange={(e) => handleFilterChange('userId', e.target.value ? parseInt(e.target.value) : undefined)}
                 className="border-gray-200 focus:border-red-500 focus:ring-red-500"
               />
             </div>

             {/* Filtro por Acción */}
             <div className="space-y-2">
               <Label htmlFor="action" className="text-sm font-medium text-gray-700">
                 Acción
               </Label>
               <Select
                 value={localFilters.action || 'all'}
                 onValueChange={(value) => handleFilterChange('action', value === 'all' ? undefined : value)}
               >
                 <SelectTrigger className="border-gray-200 focus:border-red-500 focus:ring-red-500">
                   <SelectValue placeholder="Seleccionar acción" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Todas las acciones</SelectItem>
                   {ACTION_OPTIONS.map((option) => (
                     <SelectItem key={option.value} value={option.value}>
                       {option.label}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>

             {/* Filtro por Fecha Desde */}
             <div className="space-y-2">
               <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
                 Fecha Desde
               </Label>
               <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <Input
                   id="dateFrom"
                   type="date"
                   value={localFilters.dateFrom || ''}
                   onChange={(e) => handleFilterChange('dateFrom', e.target.value || undefined)}
                   className="pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                 />
               </div>
             </div>

             {/* Filtro por Fecha Hasta */}
             <div className="space-y-2">
               <Label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
                 Fecha Hasta
               </Label>
               <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <Input
                   id="dateTo"
                   type="date"
                   value={localFilters.dateTo || ''}
                   onChange={(e) => handleFilterChange('dateTo', e.target.value || undefined)}
                   className="pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                 />
               </div>
             </div>
           </div>

                     {/* Botones de acción */}
           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
             <div className="text-sm text-gray-500">
               {Object.keys(localFilters).filter(key => localFilters[key as keyof AuditFilters]).length > 0 && (
                 <span className="flex items-center space-x-1">
                   <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                   <span>Filtros configurados: {Object.keys(localFilters).filter(key => localFilters[key as keyof AuditFilters]).length}</span>
                 </span>
               )}
             </div>
             <div className="flex items-center space-x-3">
               <Button
                 variant="outline"
                 onClick={handleClearFilters}
                 disabled={isLoading}
                 className="border-gray-200 hover:bg-gray-50 text-gray-600"
               >
                 <X className="h-4 w-4 mr-2" />
                 Limpiar
               </Button>
               <Button
                 onClick={handleApplyFilters}
                 disabled={isLoading}
                 className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
               >
                 <Filter className="h-4 w-4 mr-2" />
                 Aplicar Filtros
               </Button>
             </div>
           </div>
        </CardContent>
      )}
    </Card>
  )
}
