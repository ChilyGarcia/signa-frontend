# Configuración de la API

## Variables de Entorno

La aplicación utiliza variables de entorno para configurar las URLs del backend. Crea un archivo `.env.local` en la raíz del proyecto con la siguiente configuración:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_AUTH_ENDPOINT=/auth/login

# App Configuration
NEXT_PUBLIC_APP_NAME=Signa
```

## Configuración Centralizada

Todas las URLs de la API están centralizadas en `lib/config.ts`:

### Endpoints de Auditoría
- **Base**: `/audit`
- **Estadísticas**: `/audit/statistics`
- **Por marca**: `/audit/brand/{id}`
- **Por usuario**: `/audit/user/{id}`
- **Por acción**: `/audit/action/{action}`
- **Por rango de fechas**: `/audit/date-range`
- **Búsqueda**: `/audit/search`

### Endpoints de Marcas
- **Base**: `/brands`
- **Por ID**: `/brands/{id}`
- **Estado**: `/brands/{id}/status?status={status}`

### Endpoints de Autenticación
- **Login**: `/auth/login`

## Funciones Utilitarias

### `buildApiUrl(endpoint: string)`
Construye una URL completa usando la base de la API configurada.

### `buildAuditUrl(endpoint: string, params?: Record<string, string | number>)`
Construye una URL de auditoría con parámetros opcionales.

## Uso en el Código

```typescript
import { buildApiUrl, config } from '@/lib/config'

// Ejemplo de uso
const url = buildApiUrl(config.endpoints.audit.statistics)
const response = await fetch(url, { headers: getAuthHeaders() })
```

## Cambios de Entorno

Para cambiar entre diferentes entornos (desarrollo, staging, producción), simplemente modifica las variables de entorno:

- **Desarrollo**: `http://127.0.0.1:8000`
- **Staging**: `https://api-staging.tudominio.com`
- **Producción**: `https://api.tudominio.com`
