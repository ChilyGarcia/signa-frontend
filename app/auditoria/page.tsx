"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

// Mock data for audit logs
const auditLogs = [
  {
    id: 1,
    usuario: "Admin User",
    accion: "Registro Creado",
    marca: "TechCorp Solutions",
    fecha: "2024-03-15 14:30:25",
    ip: "192.168.1.100",
    detalles: "Nueva marca registrada por el usuario",
  },
  {
    id: 2,
    usuario: "Maria Rodriguez",
    accion: "Marca Editada",
    marca: "InnovateLab",
    fecha: "2024-03-15 13:45:12",
    ip: "192.168.1.101",
    detalles: "Información del titular actualizada",
  },
  {
    id: 3,
    usuario: "Carlos Martinez",
    accion: "Estado Cambiado",
    marca: "GreenEnergy Pro",
    fecha: "2024-03-15 12:20:08",
    ip: "192.168.1.102",
    detalles: "Estado cambiado de Pendiente a Activo",
  },
  {
    id: 4,
    usuario: "Admin User",
    accion: "Marca Eliminada",
    marca: "OldBrand Corp",
    fecha: "2024-03-15 11:15:33",
    ip: "192.168.1.100",
    detalles: "Marca eliminada del sistema",
  },
  {
    id: 5,
    usuario: "Ana Garcia",
    accion: "Registro Creado",
    marca: "DataSecure",
    fecha: "2024-03-15 10:30:45",
    ip: "192.168.1.103",
    detalles: "Nueva marca registrada por el usuario",
  },
  {
    id: 6,
    usuario: "Luis Fernandez",
    accion: "Marca Editada",
    marca: "HealthTech Plus",
    fecha: "2024-03-15 09:45:22",
    ip: "192.168.1.104",
    detalles: "Categoría actualizada",
  },
  {
    id: 7,
    usuario: "Sofia Lopez",
    accion: "Estado Cambiado",
    marca: "EduSmart",
    fecha: "2024-03-15 08:20:15",
    ip: "192.168.1.105",
    detalles: "Estado cambiado de En Revisión a Pendiente",
  },
  {
    id: 8,
    usuario: "Admin User",
    accion: "Registro Creado",
    marca: "CloudTech Systems",
    fecha: "2024-03-14 16:30:40",
    ip: "192.168.1.100",
    detalles: "Nueva marca registrada por el usuario",
  },
]

export default function Auditoria() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.accion.toLowerCase().includes(searchTerm.toLowerCase()),
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
    switch (action) {
      case "Registro Creado":
        return "bg-green-50 text-green-700 border border-green-200"
      case "Marca Editada":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "Estado Cambiado":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200"
      case "Marca Eliminada":
        return "bg-red-50 text-red-700 border border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
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
              <h1 className="text-lg font-bold text-gray-900">TradeMark Pro</h1>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar..."
                  className="pl-10 w-64 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-lg h-10"
                />
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
                    <p className="text-xs text-gray-500 mt-1">Este mes</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Activity className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                    <p className="text-xs text-gray-500 mt-1">Últimos 7 días</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <User className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Actividades Hoy</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">47</p>
                    <p className="text-xs text-gray-500 mt-1">Registros nuevos</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-50 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Registro de Auditoría</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Historial completo de actividades del sistema</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar actividades..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 w-64 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-lg h-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
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
                    {currentLogs.map((log, index) => (
                      <TableRow
                        key={log.id}
                        className={`hover:bg-red-25 transition-colors duration-150 border-b border-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <TableCell className="font-medium text-gray-900 py-4 px-6">{log.usuario}</TableCell>
                        <TableCell className="py-4">
                          <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.accion)}`}>
                            {log.accion}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 py-4">{log.marca}</TableCell>
                        <TableCell className="text-gray-600 py-4 text-sm">{log.fecha}</TableCell>
                        <TableCell className="text-gray-500 py-4 text-sm font-mono">{log.ip}</TableCell>
                        <TableCell className="text-gray-600 py-4 text-sm">{log.detalles}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
