// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'
const AUTH_ENDPOINT = process.env.NEXT_PUBLIC_API_AUTH_ENDPOINT || '/auth/login'

// Tipos para la autenticación
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface User {
  id: string
  email: string
  name?: string
}

// Clase para manejar errores de autenticación
export class AuthError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'AuthError'
  }
}

// Función para hacer login
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new AuthError(
        errorData.detail || 'Error al iniciar sesión',
        response.status
      )
    }

    const data: AuthResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Error de conexión. Verifica tu conexión a internet.')
  }
}

// Función para guardar el token en localStorage
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

// Función para obtener el token del localStorage
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Función para eliminar el token
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  return getToken() !== null
}

// Función para crear headers con token de autorización
export function getAuthHeaders(): Record<string, string> {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}
