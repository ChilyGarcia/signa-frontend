# TradeMark Pro - Sistema de Registro de Marcas

Sistema profesional para el registro y gestión de marcas comerciales desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Autenticación segura** con JWT tokens
- **Dashboard interactivo** con estadísticas en tiempo real
- **Gestión completa de marcas** (crear, editar, eliminar, ver)
- **Sistema de auditoría** para seguimiento de cambios
- **Interfaz moderna y responsiva** con diseño profesional
- **Protección de rutas** para usuarios autenticados

## 📋 Requisitos Previos

- Node.js 18+ 
- pnpm (recomendado) o npm
- Backend API corriendo en `http://127.0.0.1:8000`

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd signa-front
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   # Backend API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   NEXT_PUBLIC_API_AUTH_ENDPOINT=/auth/login
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME=TradeMark Pro
   ```

4. **Ejecutar el proyecto**
   ```bash
   pnpm dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🔧 Configuración del Backend

El frontend espera que tu backend tenga el siguiente endpoint de autenticación:

### Endpoint de Login
- **URL**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "user_id": 2,
    "email": "prueba@gmail.com",
    "first_name": "string",
    "last_name": "string"
  }
  ```

## 🏗️ Estructura del Proyecto

```
signa-front/
├── app/                    # Páginas de Next.js 14 (App Router)
│   ├── dashboard/         # Dashboard principal
│   ├── auditoria/         # Página de auditoría
│   ├── marca/            # Gestión de marcas
│   └── layout.tsx        # Layout principal
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes de UI base
│   └── ProtectedRoute.tsx # Protección de rutas
├── contexts/            # Contextos de React
│   └── AuthContext.tsx  # Contexto de autenticación
├── lib/                 # Utilidades y servicios
│   └── auth.ts         # Servicio de autenticación
└── hooks/              # Hooks personalizados
```

## 🔐 Autenticación

El sistema implementa autenticación JWT con las siguientes características:

- **Login seguro** con validación de credenciales
- **Almacenamiento de tokens** en localStorage
- **Protección de rutas** automática
- **Logout** con limpieza de datos
- **Manejo de errores** de autenticación

### Flujo de Autenticación

1. Usuario ingresa credenciales en `/`
2. Se valida con el backend en `/auth/login`
3. Se almacena el token JWT
4. Se redirige al dashboard
5. Las rutas protegidas verifican el token automáticamente

## 🎨 Componentes UI

El proyecto utiliza una biblioteca de componentes personalizada basada en:
- **shadcn/ui** para componentes base
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Radix UI** para accesibilidad

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (< 768px)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Ejecutar build de producción
pnpm start

# Linting
pnpm lint

# Type checking
pnpm type-check
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push

### Otros proveedores
El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación del backend
2. Verifica que las variables de entorno estén configuradas correctamente
3. Asegúrate de que el backend esté corriendo en el puerto correcto
4. Revisa la consola del navegador para errores

## 🔄 Actualizaciones

Para mantener el proyecto actualizado:

```bash
# Actualizar dependencias
pnpm update

# Verificar vulnerabilidades
pnpm audit

# Corregir vulnerabilidades automáticamente
pnpm audit --fix
```
