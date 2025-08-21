"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Brand, UpdateBrandData } from '@/lib/types'
import { getBrandStatusInfo } from '@/lib/utils'

interface EditBrandModalProps {
  brand: Brand | null
  isOpen: boolean
  onClose: () => void
  onSave: (brandData: UpdateBrandData) => Promise<void>
}

const BRAND_STATUSES = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'REGISTERED', label: 'Registrado' },
  { value: 'REJECTED', label: 'Rechazado' },
  { value: 'EXPIRED', label: 'Expirado' },
  { value: 'CANCELLED', label: 'Cancelado' },
]

export function EditBrandModal({ brand, isOpen, onClose, onSave }: EditBrandModalProps) {
  const [formData, setFormData] = useState<UpdateBrandData>({
    id: 0,
    name: '',
    description: '',
    owner: '',
    registration_number: '',
    status: 'PENDING'
  })
  const [isLoading, setIsLoading] = useState(false)

  // Cargar datos de la marca cuando se abre el modal
  useEffect(() => {
    if (brand) {
      setFormData({
        id: brand.id,
        name: brand.name,
        description: brand.description,
        owner: brand.owner,
        registration_number: brand.registration_number,
        status: brand.status
      })
    }
  }, [brand])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.owner.trim() || !formData.registration_number.trim()) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    setIsLoading(true)
    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Error al actualizar marca:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  if (!brand) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Editar Marca: {brand.name}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
              Nombre de la Marca *
            </Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ingresa el nombre de la marca"
              className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
              Descripción
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe la marca (opcional)"
              className="border-gray-200 focus:border-red-500 focus:ring-red-500 min-h-[80px]"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-owner" className="text-sm font-medium text-gray-700">
              Propietario *
            </Label>
            <Input
              id="edit-owner"
              value={formData.owner}
              onChange={(e) => handleInputChange("owner", e.target.value)}
              placeholder="Ingresa el nombre del propietario"
              className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-registration" className="text-sm font-medium text-gray-700">
              Número de Registro *
            </Label>
            <Input
              id="edit-registration"
              value={formData.registration_number}
              onChange={(e) => handleInputChange("registration_number", e.target.value)}
              placeholder="Ingresa el número de registro"
              className="border-gray-200 focus:border-red-500 focus:ring-red-500"
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status" className="text-sm font-medium text-gray-700">
              Estado
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger className="border-gray-200 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {BRAND_STATUSES.map((status) => {
                  const statusInfo = getBrandStatusInfo(status.value)
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusInfo.className.replace('bg-', 'bg-').replace(' text-', '')}`} />
                        {status.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
