import { getAuthHeaders } from './auth'
import { Brand, CreateBrandData, UpdateBrandData } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'

// Función para obtener todas las marcas
export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error al obtener marcas: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}

// Función para obtener una marca específica
export async function getBrand(id: number): Promise<Brand> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error al obtener marca: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching brand:', error)
    throw error
  }
}

// Función para crear una nueva marca
export async function createBrand(brandData: CreateBrandData): Promise<Brand> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(brandData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error al crear marca: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating brand:', error)
    throw error
  }
}

// Función para actualizar una marca
export async function updateBrand(brandData: UpdateBrandData): Promise<Brand> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandData.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(brandData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error al actualizar marca: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating brand:', error)
    throw error
  }
}

// Función para eliminar una marca
export async function deleteBrand(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar marca: ${response.status}`)
    }
  } catch (error) {
    console.error('Error deleting brand:', error)
    throw error
  }
}

// Función para actualizar solo el estado de una marca
export async function updateBrandStatus(brandId: number, status: string): Promise<Brand> {
  try {
    const response = await fetch(`${API_BASE_URL}/brands/${brandId}/status?status=${status}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error al actualizar estado: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating brand status:', error)
    throw error
  }
}
