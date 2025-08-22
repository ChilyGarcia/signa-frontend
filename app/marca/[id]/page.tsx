"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Scale,
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const trademarkData = {
  id: 1,
  marca: "TechCorp Solutions",
  titular: "Corporación TechCorp S.A.",
  estado: "Activo",
  fechaRegistro: "2024-01-15",
  categoria: "Tecnología",
  tipoMarca: "Denominativa",
  descripcion:
    "Marca comercial para servicios de tecnología y consultoría empresarial especializada en transformación digital.",
  documentoIdentidad: "900123456-7",
  tipoTitular: "Persona Jurídica",
  direccion: "Calle 100 #15-20, Bogotá, Colombia",
  telefono: "+57 1 234-5678",
  email: "contacto@techcorp.com",
  fechaVencimiento: "2034-01-15",
  numeroRegistro: "TR-2024-001",
  claseNiza: "42",
  usoComercial: "Servicios de consultoría tecnológica",
  observaciones: "Marca registrada sin observaciones adicionales",
}

const historialActividad = [
  {
    id: 1,
    fecha: "2024-01-15",
    accion: "Registro Creado",
    descripcion: "Marca registrada exitosamente en el sistema",
    usuario: "Admin",
    tipo: "success",
  },
  {
    id: 2,
    fecha: "2024-02-01",
    accion: "Estado Actualizado",
    descripcion: "Estado cambiado a Activo tras verificación",
    usuario: "Supervisor",
    tipo: "info",
  },
  {
    id: 3,
    fecha: "2024-02-15",
    accion: "Información Actualizada",
    descripcion: "Actualización de datos de contacto del titular",
    usuario: "Admin",
    tipo: "info",
  },
]

export default function MarcaDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    router.push(`/marca/${params.id}/editar`)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      alert("Marca eliminada exitosamente")
      router.push("/dashboard")
    }, 1500)
  }

  const handleExport = () => {
    // Simulate export functionality
    alert("Exportando información de la marca...")
  }

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <CheckCircle className="h-5 w-5 text-accent" />
      case "Pendiente":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "En Revisión":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "Inactivo":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getActivityIcon = (tipo: string) => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "info":
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center space-x-3">
                <Scale className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">{trademarkData.marca}</h1>
                  <p className="text-sm text-muted-foreground">Registro #{trademarkData.numeroRegistro}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará permanentemente la marca "{trademarkData.marca}" y
                      todos sus datos asociados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Status Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(trademarkData.estado)}
                  <div>
                    <h3 className="text-lg font-semibold">Estado Actual</h3>
                    <p className="text-muted-foreground">La marca se encuentra {trademarkData.estado.toLowerCase()}</p>
                  </div>
                </div>
                <Badge
                  className={
                    trademarkData.estado === "Activo"
                      ? "bg-accent text-accent-foreground"
                      : trademarkData.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {trademarkData.estado}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="titular">Datos del Titular</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Información de la Marca</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nombre de la Marca</label>
                      <p className="text-lg font-semibold">{trademarkData.marca}</p>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                      <p>{trademarkData.categoria}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tipo de Marca</label>
                      <p>{trademarkData.tipoMarca}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Clase de Niza</label>
                      <p>{trademarkData.claseNiza}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Descripción</label>
                      <p className="text-sm">{trademarkData.descripcion}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Fechas Importantes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Registro</label>
                      <p className="font-semibold">{trademarkData.fechaRegistro}</p>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Vencimiento</label>
                      <p className="font-semibold">{trademarkData.fechaVencimiento}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Número de Registro</label>
                      <p>{trademarkData.numeroRegistro}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Uso Comercial</label>
                      <p className="text-sm">{trademarkData.usoComercial}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="titular" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Información del Titular</span>
                  </CardTitle>
                  <CardDescription>Datos de contacto y información legal del propietario de la marca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nombre/Razón Social</label>
                        <p className="text-lg font-semibold">{trademarkData.titular}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tipo de Titular</label>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <p>{trademarkData.tipoTitular}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Documento de Identidad</label>
                        <p>{trademarkData.documentoIdentidad}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <p className="text-sm">{trademarkData.direccion}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p>{trademarkData.telefono}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Correo Electrónico</label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p>{trademarkData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {trademarkData.observaciones && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Observaciones</label>
                        <p className="text-sm mt-2">{trademarkData.observaciones}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Historial de Actividad</span>
                  </CardTitle>
                  <CardDescription>Registro cronológico de todas las acciones realizadas en esta marca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historialActividad.map((actividad, index) => (
                      <div key={actividad.id} className="flex items-start space-x-4 pb-4">
                        <div className="flex-shrink-0 mt-1">{getActivityIcon(actividad.tipo)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{actividad.accion}</p>
                            <p className="text-xs text-muted-foreground">{actividad.fecha}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{actividad.descripcion}</p>
                          <p className="text-xs text-muted-foreground mt-1">Por: {actividad.usuario}</p>
                        </div>
                        {index < historialActividad.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
