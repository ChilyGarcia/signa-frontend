"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useAudit, type AuditLog, type AuditFilters } from "@/hooks/useAudit"
import { AuditFiltersComponent } from "@/components/AuditFilters"
import {
  Scale,
  LogOut,
  Search,
  FileText,
  Shield,
  Bell,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Calendar,
  Activity,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react"

export default function Auditoria() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Obtener datos de auditoría desde la API
  const { 
    auditLogs, 
    statistics,
    isLoading, 
    error, 
    refetch, 
    applyFilters, 
    clearFilters, 
    currentFilters 
  } = useAudit(0, 100)

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleApplyFilters = (filters: AuditFilters) => {
    applyFilters(filters)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  // Filtrar logs basado en el término de búsqueda
  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.changes_summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = filteredLogs.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE":
        return "bg-green-50 text-green-700 border border-green-200"
      case "UPDATE":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "DELETE":
        return "bg-red-50 text-red-700 border border-red-200"
      case "STATUS_CHANGE":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
  }

  const formatAction = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE":
        return "Registro Creado"
      case "UPDATE":
        return "Marca Editada"
      case "DELETE":
        return "Marca Eliminada"
      case "STATUS_CHANGE":
        return "Estado Cambiado"
      default:
        return action
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-100 flex flex-col z-10">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Signa</h1>
              <p className="text-xs text-gray-500">Sistema de Registro</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          <div className="px-3 space-y-2">
            <button
              onClick={handleBack}
              className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg hover:bg-red-50 transition-colors duration-150 group"
            >
              <div className="p-1.5 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors">
                <FileText className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">Registro de Marca</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg bg-red-50 border-l-4 border-red-500">
              <div className="p-1.5 rounded-md bg-red-200">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-700">Auditoría</span>
            </button>
          </div>
        </nav>

        <div className="p-3 border-t border-gray-50">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-150 px-3 py-2.5 h-auto"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </Button>
        </div>
      </aside>

      <main className="ml-64 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBack} variant="ghost" size="sm" className="p-2 hover:bg-red-50 rounded-lg">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Auditoría del Sistema</h2>
                <p className="text-sm text-gray-600">Registro de actividades y cambios</p>
              </div>
            </div>
                                                   <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-2 hover:bg-red-50"
                >
                  <RefreshCw className={`h-5 w-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-red-50">
                  <Bell className="h-5 w-5 text-gray-600" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-semibold">A</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-6">
                                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Auditorías</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {statistics ? statistics.total_audits : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Registros totales</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Activity className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Creaciones</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {statistics ? statistics.creations : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Marcas creadas</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Actualizaciones</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {statistics ? statistics.updates : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Marcas editadas</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Eliminaciones</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        {statistics ? statistics.deletions : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Marcas eliminadas</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cambios Estado</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {statistics ? statistics.status_changes : '-'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Estados modificados</p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <FileText className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
                       </div>

                       {/* Información sobre filtros */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Search className="h-5 w-5 text-blue-600 mt-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-1">¿Cómo buscar en la auditoría?</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Búsqueda local (tabla):</strong> Busca en usuarios, marcas, acciones y detalles de los registros mostrados.</p>
                    <p><strong>Filtros avanzados:</strong> Usa los filtros de abajo para consultas específicas a la API (por ID, fechas, etc.).</p>
                  </div>
                </div>
              </div>
            </div>

           {/* Componente de Filtros */}
           <AuditFiltersComponent
             onApplyFilters={handleApplyFilters}
             onClearFilters={handleClearFilters}
             currentFilters={currentFilters}
             isLoading={isLoading}
           />

           <Card className="border-0 shadow-sm bg-white">
                         <CardHeader className="border-b border-gray-50 px-6 py-5">
               <div className="flex items-center justify-between">
                                    <div>
                     <CardTitle className="text-lg font-semibold text-gray-900">Registro de Auditoría</CardTitle>
                     <p className="text-sm text-gray-600 mt-1">
                       {isLoading ? 'Cargando datos...' : (
                         <>
                           Mostrando {filteredLogs.length} registros
                           {Object.keys(currentFilters).filter(key => currentFilters[key as keyof AuditFilters]).length > 0 && (
                             <span className="text-red-600 ml-2">
                               (con filtros aplicados)
                             </span>
                           )}
                         </>
                       )}
                     </p>
                   </div>
                                   <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar en usuarios, marcas, acciones..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 w-80 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-lg h-10"
                      />
                    </div>
                    {searchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchTerm("")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
               </div>
             </CardHeader>
            <CardContent className="p-0">
                             <div className="overflow-x-auto">
                 {error && (
                   <div className="flex items-center justify-center p-8">
                     <div className="text-center">
                       <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos</h3>
                       <p className="text-gray-600 mb-4">{error}</p>
                       <Button onClick={handleRefresh} variant="outline">
                         <RefreshCw className="h-4 w-4 mr-2" />
                         Reintentar
                       </Button>
                     </div>
                   </div>
                 )}
                 
                 {isLoading && !error && (
                   <div className="flex items-center justify-center p-8">
                     <div className="text-center">
                       <RefreshCw className="h-8 w-8 text-red-500 mx-auto mb-4 animate-spin" />
                       <p className="text-gray-600">Cargando registros de auditoría...</p>
                     </div>
                   </div>
                 )}
                 
                 {!isLoading && !error && (
                   <>
                     <Table>
                       <TableHeader>
                         <TableRow className="bg-gray-25 border-b border-gray-100">
                           <TableHead className="font-semibold text-gray-700 py-4 px-6">Usuario</TableHead>
                           <TableHead className="font-semibold text-gray-700 py-4">Acción</TableHead>
                           <TableHead className="font-semibold text-gray-700 py-4">Marca</TableHead>
                           <TableHead className="font-semibold text-gray-700 py-4">Fecha y Hora</TableHead>
                           <TableHead className="font-semibold text-gray-700 py-4">IP</TableHead>
                           <TableHead className="font-semibold text-gray-700 py-4">Detalles</TableHead>
                         </TableRow>
                       </TableHeader>
                       <TableBody>
                         {currentLogs.length === 0 ? (
                           <TableRow>
                             <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                               No se encontraron registros de auditoría
                             </TableCell>
                           </TableRow>
                         ) : (
                           currentLogs.map((log, index) => (
                             <TableRow
                               key={log.id}
                               className={`hover:bg-red-25 transition-colors duration-150 border-b border-gray-50 ${
                                 index % 2 === 0 ? "bg-white" : "bg-gray-25"
                               }`}
                             >
                               <TableCell className="font-medium text-gray-900 py-4 px-6">{log.user_email}</TableCell>
                               <TableCell className="py-4">
                                 <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                   {formatAction(log.action)}
                                 </Badge>
                               </TableCell>
                               <TableCell className="text-gray-600 py-4">{log.brand_name}</TableCell>
                               <TableCell className="text-gray-600 py-4 text-sm">{formatDate(log.timestamp)}</TableCell>
                               <TableCell className="text-gray-500 py-4 text-sm font-mono">{log.ip_address}</TableCell>
                               <TableCell className="text-gray-600 py-4 text-sm">{log.changes_summary}</TableCell>
                             </TableRow>
                           ))
                         )}
                       </TableBody>
                     </Table>
                   </>
                 )}
               </div>
                             {!isLoading && !error && filteredLogs.length > 0 && (
                 <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                   <div className="text-sm text-gray-600">
                     Mostrando {startIndex + 1} a {Math.min(endIndex, filteredLogs.length)} de {filteredLogs.length}{" "}
                     registros
                   </div>
                   <div className="flex items-center space-x-2">
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={handlePreviousPage}
                       disabled={currentPage === 1}
                       className="h-8 px-3 border-gray-200 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                     >
                       <ChevronLeft className="h-4 w-4 mr-1" />
                       Anterior
                     </Button>
                     <div className="flex items-center space-x-1">
                       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                         <Button
                           key={page}
                           variant={currentPage === page ? "default" : "outline"}
                           size="sm"
                           onClick={() => setCurrentPage(page)}
                           className={`h-8 w-8 p-0 ${
                             currentPage === page
                               ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                               : "border-gray-200 hover:bg-red-50 hover:border-red-300"
                           }`}
                         >
                           {page}
                         </Button>
                       ))}
                     </div>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={handleNextPage}
                       disabled={currentPage === totalPages}
                       className="h-8 px-3 border-gray-200 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                     >
                       Siguiente
                       <ChevronRight className="h-4 w-4 ml-1" />
                     </Button>
                   </div>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
