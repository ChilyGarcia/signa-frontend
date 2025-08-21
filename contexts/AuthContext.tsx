"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login as authLogin, saveToken, removeToken, getToken, isAuthenticated, LoginCredentials, User, isTokenValid, getUserFromToken } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        // Verificar si el token es válido
        if (isTokenValid(token)) {
          // Intentar obtener información del usuario desde el token
          const userFromToken = getUserFromToken(token)
          if (userFromToken) {
            setUser(userFromToken)
          }
          // Si no hay información del usuario en el token, está bien
          // el usuario se establecerá cuando haga login
        } else {
          // Token inválido o expirado
          removeToken()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await authLogin(credentials)
      
      // Guardar el token
      saveToken(response.access_token)
      
      // Usar la información del usuario que viene en la respuesta del backend
      const userData: User = {
        id: response.user_id.toString(),
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        name: `${response.first_name} ${response.last_name}`.trim()
      }
      
      setUser(userData)
      
      // Redirigir al dashboard
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    removeToken()
    setUser(null)
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user || !!getToken(),
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
