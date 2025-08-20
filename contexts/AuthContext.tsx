"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login as authLogin, saveToken, removeToken, getToken, isAuthenticated, LoginCredentials, User } from '@/lib/auth'

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
    const checkAuth = () => {
      const token = getToken()
      if (token) {
        // Aquí podrías validar el token con el backend si es necesario
        // Por ahora, asumimos que si hay token, el usuario está autenticado
        setUser({ id: '1', email: 'usuario@ejemplo.com' }) // Esto debería venir del backend
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
      
      // Aquí podrías obtener la información del usuario del backend
      // Por ahora, usamos datos de ejemplo
      const userData: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0]
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
    isAuthenticated: !!user,
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
