"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import {
  Scale,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Search,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react"

// Mock data for trademarks
const trademarks = [
  {
    id: 1,
    marca: "TechCorp Solutions",
    titular: "Corporación TechCorp S.A.",
    estado: "Activo",
    fechaRegistro: "2024-01-15",
    categoria: "Tecnología",
  },
  {
    id: 2,
    marca: "InnovateLab",
    titular: "Laboratorios de Innovación Ltda.",
    estado: "Pendiente",
    fechaRegistro: "2024-02-20",
    categoria: "Investigación",
  },
  {
    id: 3,
    marca: "GreenEnergy Pro",
    titular: "Energías Renovables del Futuro",
    estado: "Activo",
    fechaRegistro: "2024-01-08",
    categoria: "Energía",
  },
  {
    id: 4,
    marca: "DataSecure",
    titular: "Seguridad Digital Avanzada S.A.",
    estado: "En Revisión",
    fechaRegistro: "2024-03-01",
    categoria: "Seguridad",
  },
  {
    id: 5,
    marca: "HealthTech Plus",
    titular: "Medicina Digital S.A.",
    estado: "Activo",
    fechaRegistro: "2024-01-22",
    categoria: "Salud",
  },
  {
    id: 6,
    marca: "EduSmart",
    titular: "Educación Inteligente Ltda.",
    estado: "Pendiente",
    fechaRegistro: "2024-03-10",
    categoria: "Educación",
  },
  {
    id: 7,
    marca: "CloudTech Systems",
    titular: "Sistemas en la Nube S.A.",
    estado: "Activo",
    fechaRegistro: "2024-02-15",
    categoria: "Tecnología",
  },
  {
    id: 8,
    marca: "BioMed Research",
    titular: "Investigación Biomédica Ltda.",
    estado: "En Revisión",
    fechaRegistro: "2024-03-05",
    categoria: "Medicina",
  },
  {
    id: 9,
    marca: "SmartHome Pro",
    titular: "Hogares Inteligentes del Futuro",
    estado: "Activo",
    fechaRegistro: "2024-01-30",
    categoria: "Domótica",
  },
  {
    id: 10,
    marca: "EcoFriendly Solutions",
    titular: "Soluciones Ecológicas S.A.",
    estado: "Pendiente",
    fechaRegistro: "2024-03-12",
    categoria: "Medio Ambiente",
  },
]

export default function Dashboard() {
  const { logout, user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    registration_number: "",
    status: "Pendiente",
  })
  const itemsPerPage = 5

  const handleNewRegistration = () => {
    setIsModalOpen(true)
  }

  const handleAudit = () => {
    window.location.href = "/auditoria"
  }

  const handleLogout = () => {
    logout()
  }

  const handleViewDetails = (id: number) => {
    window.location.href = `/marca/${id}`
  }

  const handleEdit = (id: number) => {
    window.location.href = `/marca/${id}/editar`
  }

  const handleDelete = (id: number, marca: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la marca "${marca}"?`)) {
      alert("Marca eliminada exitosamente")
      // Here you would typically make an API call to delete the trademark
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.name.trim() || !formData.owner.trim()) {
      alert("Por favor, completa los campos obligatorios (Nombre de la marca y Propietario)")
      return
    }

    // Aquí harías la llamada a la API para crear el registro
    console.log("Nuevo registro de marca:", formData)
    alert("Marca registrada exitosamente")

    // Resetear formulario y cerrar modal
    setFormData({
      name: "",
      description: "",
      owner: "",
      registration_number: "",
      status: "Pendiente",
    })
    setIsModalOpen(false)
  }

  const filteredTrademarks = trademarks.filter(
    (trademark) =>
      trademark.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trademark.titular.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredTrademarks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTrademarks = filteredTrademarks.slice(startIndex, endIndex)

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

  return (
    <ProtectedRoute>
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
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg hover:bg-red-50 transition-colors duration-150 group">
              <div className="p-1.5 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors">
                <FileText className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">Registro de Marca</span>
            </button>
            <button
              onClick={handleAudit}
              className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg hover:bg-red-50 transition-colors duration-150 group"
            >
              <div className="p-1.5 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">Auditoría</span>
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
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-600">Bienvenido de vuelta, {user?.name || 'Usuario'}</p>
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
                <span className="text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Marcas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3,356</p>
                    <p className="text-xs text-gray-500 mt-1">Total Registros</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nuevas Marcas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">394</p>
                    <p className="text-xs text-gray-500 mt-1">Este mes</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Plus className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Costo Total</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">52,536</p>
                    <p className="text-xs text-gray-500 mt-1">En registros</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Disponibles</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">39</p>
                    <p className="text-xs text-gray-500 mt-1">Para registro</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-50 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Registro de Marcas</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Gestiona todas las marcas registradas</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar marcas..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-10 w-64 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-lg h-10"
                    />
                  </div>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleNewRegistration}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                          Crear Nuevo Registro de Marca
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre de la Marca *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Ingresa el nombre de la marca"
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            maxLength={100}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Descripción
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Describe la marca (opcional)"
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500 min-h-[80px]"
                            maxLength={255}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="owner" className="text-sm font-medium text-gray-700">
                            Propietario *
                          </Label>
                          <Input
                            id="owner"
                            value={formData.owner}
                            onChange={(e) => handleInputChange("owner", e.target.value)}
                            placeholder="Nombre del propietario de la marca"
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            maxLength={100}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="registration_number" className="text-sm font-medium text-gray-700">
                            Número de Registro
                          </Label>
                          <Input
                            id="registration_number"
                            value={formData.registration_number}
                            onChange={(e) => handleInputChange("registration_number", e.target.value)}
                            placeholder="Número de registro (opcional)"
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            maxLength={100}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                            Estado *
                          </Label>
                          <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                            <SelectTrigger className="border-gray-200 focus:border-red-500 focus:ring-red-500">
                              <SelectValue placeholder="Selecciona el estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pendiente">Pendiente</SelectItem>
                              <SelectItem value="En Revisión">En Revisión</SelectItem>
                              <SelectItem value="Activo">Activo</SelectItem>
                              <SelectItem value="Rechazado">Rechazado</SelectItem>
                              <SelectItem value="Expirado">Expirado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border-gray-200 hover:bg-gray-50"
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2"
                          >
                            Crear Registro
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-25 border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700 py-4 px-6">Marca</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Titular</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Estado</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Fecha</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 text-right pr-6">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTrademarks.map((trademark, index) => (
                      <TableRow
                        key={trademark.id}
                        className={`hover:bg-red-25 transition-colors duration-150 border-b border-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <TableCell className="font-medium text-gray-900 py-4 px-6">{trademark.marca}</TableCell>
                        <TableCell className="text-gray-600 py-4">{trademark.titular}</TableCell>
                        <TableCell className="py-4">
                          <Badge
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              trademark.estado === "Activo"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : trademark.estado === "Pendiente"
                                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                  : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {trademark.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 py-4 text-sm">{trademark.fechaRegistro}</TableCell>
                        <TableCell className="text-right py-4 pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 rounded-lg">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 shadow-lg border-0 rounded-lg">
                              <DropdownMenuItem
                                onClick={() => handleViewDetails(trademark.id)}
                                className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md m-1"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(trademark.id)}
                                className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md m-1"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer focus:text-red-600 py-2 px-3 hover:bg-red-50 rounded-md m-1"
                                onClick={() => handleDelete(trademark.id, trademark.marca)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredTrademarks.length)} de{" "}
                  {filteredTrademarks.length} resultados
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
    </ProtectedRoute>
  )
}
