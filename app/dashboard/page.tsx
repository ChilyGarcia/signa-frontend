"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { useBrands } from "@/hooks/useBrands"

import { CreateBrandData, UpdateBrandData, Brand } from "@/lib/types"

import { EditBrandModal } from "@/components/EditBrandModal"
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
  AlertCircle,
} from "lucide-react"

// Estados disponibles para las marcas
const BRAND_STATUSES = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'REGISTERED', label: 'Registrado' },
  { value: 'REJECTED', label: 'Rechazado' },
  { value: 'EXPIRED', label: 'Expirado' },
  { value: 'CANCELLED', label: 'Cancelado' },
]

export default function Dashboard() {
  const router = useRouter()
  const { logout, user } = useAuth()
  const { brands, isLoading: brandsLoading, error: brandsError, addBrand, removeBrand, updateStatus, editBrand } = useBrands()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [formData, setFormData] = useState<CreateBrandData>({
    name: "",
    description: "",
    owner: "",
    registration_number: "",
  })
  const itemsPerPage = 5

  const handleNewRegistration = () => {
    setIsModalOpen(true)
  }

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addBrand(formData)
      
      // Resetear formulario y cerrar modal
      setFormData({
        name: "",
        description: "",
        owner: "",
        registration_number: "",
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error al crear marca:', error)
    }
  }

  const handleAudit = () => {
    router.push("/auditoria")
  }

  const handleLogout = () => {
    logout()
  }

  const handleViewDetails = (id: number) => {
    router.push(`/marca/${id}`)
  }

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand)
    setIsEditModalOpen(true)
  }

  const handleEditSave = async (brandData: UpdateBrandData) => {
    try {
      await editBrand(brandData)
      setIsEditModalOpen(false)
      setSelectedBrand(null)
    } catch (error) {
      console.error('Error al actualizar marca:', error)
      alert('Error al actualizar la marca')
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la marca "${name}"?`)) {
      try {
        await removeBrand(id)
      } catch (error) {
        console.error('Error al eliminar marca:', error)
      }
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
    if (!formData.name.trim() || !formData.owner.trim() || !formData.registration_number.trim()) {
      alert("Por favor, completa todos los campos obligatorios")
      return
    }

    handleCreateBrand(e)
  }

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.registration_number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBrands = filteredBrands.slice(startIndex, endIndex)

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
              <h1 className="text-lg font-bold text-gray-900">Signa</h1>
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
                <p className="text-sm text-gray-600">Bienvenido de vuelta, {user?.first_name || user?.name || 'Usuario'}</p>
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
                  <span className="text-white text-sm font-semibold">
                    {user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.first_name || user?.name || 'Usuario'}</span>
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
                    <p className="text-3xl font-bold text-gray-900 mt-2">{brands.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Marcas Pendientes</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {brands.filter(brand => brand.status === 'PENDING').length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">En espera</p>
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
                    <p className="text-sm font-medium text-gray-600">Marcas Registradas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {brands.filter(brand => brand.status === 'REGISTERED').length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Aprobadas</p>
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
                    <p className="text-sm font-medium text-gray-600">Rechazadas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {brands.filter(brand => brand.status === 'REJECTED').length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">No aprobadas</p>
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
                          Crear Nueva Marca
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
                            Número de Registro *
                          </Label>
                          <Input
                            id="registration_number"
                            value={formData.registration_number}
                            onChange={(e) => handleInputChange("registration_number", e.target.value)}
                            placeholder="Número de registro"
                            className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                            maxLength={100}
                            required
                          />
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
                            Crear Marca
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
                      <TableHead className="font-semibold text-gray-700 py-4">Propietario</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Número de Registro</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Creado por</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 text-right pr-6">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brandsLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                            <span className="ml-2 text-gray-600">Cargando marcas...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : brandsError ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="text-red-600">
                            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                            <p>Error al cargar las marcas: {brandsError}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : currentBrands.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="text-gray-500">
                            <FileText className="h-8 w-8 mx-auto mb-2" />
                            <p>No se encontraron marcas</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentBrands.map((brand, index) => {
                        return (
                          <TableRow
                            key={brand.id}
                            className={`hover:bg-red-25 transition-colors duration-150 border-b border-gray-50 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-25"
                            }`}
                          >
                            <TableCell className="font-medium text-gray-900 py-4 px-6">
                              <div>
                                <div className="font-semibold">{brand.name}</div>
                                {brand.description && (
                                  <div className="text-sm text-gray-500 mt-1">{brand.description}</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600 py-4">{brand.owner}</TableCell>
                            <TableCell className="text-gray-600 py-4">{brand.registration_number}</TableCell>
                            <TableCell className="text-gray-600 py-4 text-sm">
                              {brand.creator.first_name} {brand.creator.last_name}
                            </TableCell>
                            <TableCell className="text-right py-4 pr-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 rounded-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 shadow-lg border-0 rounded-lg">
                                  <DropdownMenuItem
                                    onClick={() => handleViewDetails(brand.id)}
                                    className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md m-1"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(brand)}
                                    className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md m-1"
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 cursor-pointer focus:text-red-600 py-2 px-3 hover:bg-red-50 rounded-md m-1"
                                    onClick={() => handleDelete(brand.id, brand.name)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredBrands.length)} de{" "}
                  {filteredBrands.length} resultados
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

      {/* Modal de Edición */}
      <EditBrandModal
        brand={selectedBrand}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedBrand(null)
        }}
        onSave={handleEditSave}
      />
    </div>
    </ProtectedRoute>
  )
}
