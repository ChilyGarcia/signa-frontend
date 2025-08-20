"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  User,
  ClipboardCheck,
  Home,
  BarChart3,
  Settings,
} from "lucide-react"

interface FormData {
  // Paso 1: Información de la Marca
  marcaRegistrar: string
  descripcionMarca: string
  categoriaMarca: string
  tipoMarca: string

  // Paso 2: Información del Titular
  titularMarca: string
  tipoTitular: string
  documentoIdentidad: string
  direccion: string
  telefono: string
  email: string

  // Paso 3: Información Adicional
  usoComercial: string
  fechaUso: string
  observaciones: string
}

const initialFormData: FormData = {
  marcaRegistrar: "",
  descripcionMarca: "",
  categoriaMarca: "",
  tipoMarca: "",
  titularMarca: "",
  tipoTitular: "",
  documentoIdentidad: "",
  direccion: "",
  telefono: "",
  email: "",
  usoComercial: "",
  fechaUso: "",
  observaciones: "",
}

export default function RegistroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const sidebarItems = [
    { id: "dashboard", label: "Panel Principal", icon: Home },
    { id: "registro", label: "Registro de Marca", icon: FileText, active: true },
    { id: "reportes", label: "Reportes", icon: BarChart3 },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Marca registrada exitosamente!")
      window.location.href = "/dashboard"
    }, 2000)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.marcaRegistrar && formData.categoriaMarca && formData.tipoMarca
      case 2:
        return formData.titularMarca && formData.tipoTitular && formData.documentoIdentidad && formData.email
      case 3:
        return true
      default:
        return false
    }
  }

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="h-4 w-4" />
    if (step === currentStep) return step
    return step
  }

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed"
    if (step === currentStep) return "current"
    return "upcoming"
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border shadow-lg">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <Scale className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">TradeMark Pro</h1>
              <p className="text-sm text-sidebar-foreground/70">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b shadow-sm sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground">Crear Registro</h2>
                <p className="text-muted-foreground mt-1">Registra una nueva marca comercial en el sistema</p>
              </div>
              <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>Servicios/Registro de Marca</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Paso {currentStep} de {totalSteps}
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-8">
                  {[1, 2, 3].map((step) => {
                    const status = getStepStatus(step)
                    return (
                      <div key={step} className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                            status === "completed"
                              ? "bg-accent text-accent-foreground"
                              : status === "current"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {getStepIcon(step)}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {step === 1 && "Información de la Marca"}
                            {step === 2 && "Información del Titular"}
                            {step === 3 && "Resumen"}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Form Content */}
            <Card>
              <CardContent className="p-8">
                {/* Step 1: Información de la Marca */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">Información de la Marca</h3>
                      <p className="text-muted-foreground">Proporciona los detalles básicos de la marca a registrar</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="marcaRegistrar">Marca a Registrar *</Label>
                        <Input
                          id="marcaRegistrar"
                          placeholder="Ingresa el nombre de la marca"
                          value={formData.marcaRegistrar}
                          onChange={(e) => handleInputChange("marcaRegistrar", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="descripcionMarca">Descripción de la Marca</Label>
                        <Textarea
                          id="descripcionMarca"
                          placeholder="Describe brevemente la marca y sus características"
                          value={formData.descripcionMarca}
                          onChange={(e) => handleInputChange("descripcionMarca", e.target.value)}
                          className="mt-2"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="categoriaMarca">Categoría de la Marca *</Label>
                        <Select
                          value={formData.categoriaMarca}
                          onValueChange={(value) => handleInputChange("categoriaMarca", value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona una categoría" />
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
                        <Select
                          value={formData.tipoMarca}
                          onValueChange={(value) => handleInputChange("tipoMarca", value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="denominativa">Denominativa</SelectItem>
                            <SelectItem value="figurativa">Figurativa</SelectItem>
                            <SelectItem value="mixta">Mixta</SelectItem>
                            <SelectItem value="tridimensional">Tridimensional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Información del Titular */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <User className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">Información del Titular</h3>
                      <p className="text-muted-foreground">Datos del propietario de la marca</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="titularMarca">Titular de la Marca *</Label>
                        <Input
                          id="titularMarca"
                          placeholder="Nombre completo o razón social"
                          value={formData.titularMarca}
                          onChange={(e) => handleInputChange("titularMarca", e.target.value)}
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
                            <SelectValue placeholder="Selecciona el tipo" />
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
                          placeholder="Número de documento"
                          value={formData.documentoIdentidad}
                          onChange={(e) => handleInputChange("documentoIdentidad", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                          id="direccion"
                          placeholder="Dirección completa"
                          value={formData.direccion}
                          onChange={(e) => handleInputChange("direccion", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          placeholder="Número de teléfono"
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
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Resumen */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <ClipboardCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">Resumen</h3>
                      <p className="text-muted-foreground">Revisa la información antes de crear el registro</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Información de la Marca</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Marca a Registrar</Label>
                            <p className="text-lg font-semibold">{formData.marcaRegistrar}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Categoría</Label>
                            <Badge variant="outline" className="ml-2">
                              {formData.categoriaMarca}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Tipo de Marca</Label>
                            <p>{formData.tipoMarca}</p>
                          </div>
                          {formData.descripcionMarca && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Descripción</Label>
                              <p className="text-sm">{formData.descripcionMarca}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Información del Titular</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Titular de la Marca</Label>
                            <p className="text-lg font-semibold">{formData.titularMarca}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Tipo de Titular</Label>
                            <p>{formData.tipoTitular}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Documento</Label>
                            <p>{formData.documentoIdentidad}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <p>{formData.email}</p>
                          </div>
                          {formData.telefono && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
                              <p>{formData.telefono}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center space-x-2">
                      <span>Continuar</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 bg-accent hover:bg-accent/90"
                    >
                      {isSubmitting ? "Creando..." : "Crear"}
                      {!isSubmitting && <Check className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
