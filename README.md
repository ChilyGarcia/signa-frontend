# 🏷️ Signa Frontend

Una aplicación web moderna para la gestión integral de marcas comerciales, desarrollada con Next.js 15, TypeScript y Tailwind CSS.

## 📋 Descripción

Signa Frontend es una interfaz de usuario intuitiva y responsive que permite a los usuarios gestionar marcas comerciales de manera eficiente. La aplicación incluye funcionalidades de registro, seguimiento de estados, auditoría completa y un dashboard interactivo.

## ✨ Características Principales

### 🎯 Gestión de Marcas
- **Registro de Marcas**: Crear nuevas marcas con información detallada
- **Estados de Marca**: Seguimiento de estados (Pendiente, Registrado, Rechazado, Expirado, Cancelado)
- **Edición y Actualización**: Modificar información de marcas existentes
- **Búsqueda y Filtrado**: Encontrar marcas rápidamente con búsqueda avanzada

### 🔍 Sistema de Auditoría
- **Logs de Actividad**: Registro completo de todas las acciones realizadas
- **Filtros Avanzados**: Filtrar por usuario, marca, acción y rango de fechas
- **Estadísticas**: Métricas detalladas de actividad del sistema
- **Trazabilidad**: Seguimiento completo de cambios y modificaciones

### 🛡️ Autenticación y Seguridad
- **Sistema de Login**: Autenticación segura de usuarios
- **Rutas Protegidas**: Acceso controlado a funcionalidades sensibles
- **Contexto de Autenticación**: Gestión centralizada del estado de usuario

### 🎨 Interfaz de Usuario
- **Diseño Moderno**: UI/UX basada en componentes de Radix UI
- **Responsive**: Optimizado para dispositivos móviles y desktop
- **Tema Oscuro/Claro**: Soporte para múltiples temas
- **Componentes Reutilizables**: Biblioteca de componentes UI consistente

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de CSS utilitario
- **Radix UI**: Componentes de interfaz accesibles
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas

### Herramientas de Desarrollo
- **pnpm**: Gestor de paquetes rápido y eficiente
- **ESLint**: Linting de código
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad con navegadores

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm
- Backend API de Signa ejecutándose

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd signa-front
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```

4. **Editar configuración**
   Abre `.env.local` y configura las variables necesarias:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   NEXT_PUBLIC_API_AUTH_ENDPOINT=/auth/login
   NEXT_PUBLIC_APP_NAME=Signa
   ```

## 🚀 Ejecución

### Desarrollo
```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción
```bash
# Construir la aplicación
pnpm build

# Ejecutar en producción
pnpm start
```

## 📁 Estructura del Proyecto

```
signa-front/
├── app/                    # App Router de Next.js
│   ├── auditoria/         # Página de auditoría
│   ├── dashboard/         # Dashboard principal
│   ├── marca/            # Gestión de marcas
│   ├── registro/         # Página de registro
│   └── layout.tsx        # Layout principal
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes de interfaz
│   └── ...              # Componentes específicos
├── contexts/            # Contextos de React
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y configuración
├── public/              # Archivos estáticos
└── styles/              # Estilos globales
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base del backend API | `http://127.0.0.1:8000` |
| `NEXT_PUBLIC_API_AUTH_ENDPOINT` | Endpoint de autenticación | `/auth/login` |
| `NEXT_PUBLIC_APP_NAME` | Nombre de la aplicación | `Signa` |

### Configuración del Backend

Asegúrate de que el backend API esté configurado con los siguientes endpoints:

- `POST /auth/login` - Autenticación de usuarios
- `GET /brands/` - Listar marcas
- `POST /brands/` - Crear marca
- `PUT /brands/{id}` - Actualizar marca
- `DELETE /brands/{id}` - Eliminar marca
- `GET /audit/` - Logs de auditoría
- `GET /audit/statistics` - Estadísticas de auditoría

## 📱 Uso de la Aplicación

### 1. Autenticación
- Accede a la aplicación con tus credenciales
- El sistema mantendrá tu sesión activa

### 2. Dashboard
- Vista general de todas las marcas registradas
- Estadísticas y métricas importantes
- Acceso rápido a funcionalidades principales

### 3. Gestión de Marcas
- **Crear Marca**: Completa el formulario con la información requerida
- **Editar Marca**: Modifica información existente
- **Cambiar Estado**: Actualiza el estado de la marca según corresponda
- **Eliminar Marca**: Elimina marcas que ya no son necesarias

### 4. Auditoría
- Revisa todos los cambios realizados en el sistema
- Filtra por diferentes criterios (usuario, marca, acción, fecha)
- Visualiza estadísticas de actividad

## 🧪 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Iniciar servidor de desarrollo

# Construcción
pnpm build        # Construir para producción
pnpm start        # Ejecutar en modo producción

# Linting
pnpm lint         # Ejecutar ESLint
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación del backend
2. Verifica la configuración de variables de entorno
3. Asegúrate de que el backend esté ejecutándose
4. Revisa los logs de la consola del navegador

## 🔮 Roadmap

- [ ] Implementación de notificaciones en tiempo real
- [ ] Exportación de datos a diferentes formatos
- [ ] Dashboard con gráficos avanzados
- [ ] Sistema de roles y permisos
- [ ] Integración con servicios externos
- [ ] Aplicación móvil nativa

---

**Desarrollado con ❤️ para la gestión eficiente de marcas comerciales**
