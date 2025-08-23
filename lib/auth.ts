import { config, buildApiUrl } from './config'

// Tipos para la autenticación
export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user_id: number
  email: string
  first_name: string
  last_name: string
}

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  name?: string
}

// Clase para manejar errores de autenticación
export class AuthError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'AuthError'
  }
}

// Función para verificar si un token JWT es válido
export function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    const payload = JSON.parse(atob(parts[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    
    return payload.exp && payload.exp > currentTime
  } catch (error) {
    return false
  }
}

// Función para obtener información básica del usuario desde el token
export function getUserFromToken(token: string): User | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // El payload del JWT debe contener la información del usuario
    if (payload.sub) {
      return {
        id: payload.sub.toString(),
        email: payload.email || '',
        first_name: payload.first_name || '',
        last_name: payload.last_name || '',
        name: payload.name || `${payload.first_name || ''} ${payload.last_name || ''}`.trim()
      }
    }
    
    return null
  } catch (error) {
    return null
  }
}

// Función para hacer login
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(buildApiUrl(config.endpoints.auth.login), {
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
