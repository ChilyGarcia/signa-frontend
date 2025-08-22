"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, X } from "lucide-react"

interface EditFormData {
  marca: string
  descripcion: string
  categoria: string
  tipoMarca: string
  titular: string
  tipoTitular: string
  documentoIdentidad: string
  direccion: string
  telefono: string
  email: string
  usoComercial: string
  observaciones: string
}

const initialData: EditFormData = {
  marca: "TechCorp Solutions",
  descripcion:
    "Marca comercial para servicios de tecnología y consultoría empresarial especializada en transformación digital.",
  categoria: "tecnologia",
  tipoMarca: "denominativa",
  titular: "Corporación TechCorp S.A.",
  tipoTitular: "persona-juridica",
  documentoIdentidad: "900123456-7",
  direccion: "Calle 100 #15-20, Bogotá, Colombia",
  telefono: "+57 1 234-5678",
  email: "contacto@techcorp.com",
  usoComercial: "Servicios de consultoría tecnológica",
  observaciones: "Marca registrada sin observaciones adicionales",
}

export default function EditarMarcaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<EditFormData>(initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
      alert("Cambios guardados exitosamente")
      router.push(`/marca/${params.id}`)
    }, 1500)
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm("¿Estás seguro de que quieres cancelar? Se perderán los cambios no guardados.")) {
        router.push(`/marca/${params.id}`)
      }
    } else {
      router.push(`/marca/${params.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Editar Marca</h1>
                <p className="text-sm text-muted-foreground">Modifica la información de la marca registrada</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Información de la Marca */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Marca</CardTitle>
              <CardDescription>Datos básicos y características de la marca comercial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="marca">Nombre de la Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleInputChange("marca", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="energia">Energía</SelectItem>
                      <SelectItem value="seguridad">Seguridad</SelectItem>
                      <SelectItem value="investigacion">Investigación</SelectItem>
                      <SelectItem value="otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipoMarca">Tipo de Marca *</Label>
                  <Select value={formData.tipoMarca} onValueChange={(value) => handleInputChange("tipoMarca", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="denominativa">Denominativa</SelectItem>
                      <SelectItem value="figurativa">Figurativa</SelectItem>
                      <SelectItem value="mixta">Mixta</SelectItem>
                      <SelectItem value="tridimensional">Tridimensional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="usoComercial">Uso Comercial</Label>
                  <Input
                    id="usoComercial"
                    value={formData.usoComercial}
                    onChange={(e) => handleInputChange("usoComercial", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Titular */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Titular</CardTitle>
              <CardDescription>Datos del propietario de la marca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="titular">Nombre/Razón Social *</Label>
                  <Input
                    id="titular"
                    value={formData.titular}
                    onChange={(e) => handleInputChange("titular", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tipoTitular">Tipo de Titular *</Label>
                  <Select
                    value={formData.tipoTitular}
                    onValueChange={(value) => handleInputChange("tipoTitular", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persona-natural">Persona Natural</SelectItem>
                      <SelectItem value="persona-juridica">Persona Jurídica</SelectItem>
                      <SelectItem value="empresa">Empresa</SelectItem>
                      <SelectItem value="organizacion">Organización</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="documentoIdentidad">Documento de Identidad *</Label>
                  <Input
                    id="documentoIdentidad"
                    value={formData.documentoIdentidad}
                    onChange={(e) => handleInputChange("documentoIdentidad", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Observaciones Adicionales</CardTitle>
              <CardDescription>Información complementaria sobre la marca</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                className="mt-2"
                rows={4}
                placeholder="Ingresa cualquier observación adicional sobre la marca..."
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
