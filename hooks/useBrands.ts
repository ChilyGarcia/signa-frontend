import { useState, useEffect, useCallback } from 'react'
import { Brand, CreateBrandData, UpdateBrandData } from '@/lib/types'
import { getBrands, createBrand, updateBrand, deleteBrand, updateBrandStatus } from '@/lib/brands'

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar marcas
  const loadBrands = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getBrands()
      setBrands(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar las marcas')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Crear marca
  const addBrand = useCallback(async (brandData: CreateBrandData) => {
    try {
      setError(null)
      const newBrand = await createBrand(brandData)
      setBrands(prev => [newBrand, ...prev])
      return newBrand
    } catch (err: any) {
      setError(err.message || 'Error al crear la marca')
      throw err
    }
  }, [])

  // Actualizar marca
  const editBrand = useCallback(async (brandData: UpdateBrandData) => {
    try {
      setError(null)
      const updatedBrand = await updateBrand(brandData)
      setBrands(prev => prev.map(brand => 
        brand.id === brandData.id ? updatedBrand : brand
      ))
      return updatedBrand
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la marca')
      throw err
    }
  }, [])

  // Eliminar marca
  const removeBrand = useCallback(async (id: number) => {
    try {
      setError(null)
      await deleteBrand(id)
      setBrands(prev => prev.filter(brand => brand.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la marca')
      throw err
    }
  }, [])

  // Actualizar estado de marca
  const updateStatus = useCallback(async (brandId: number, status: string) => {
    try {
      setError(null)
      const updatedBrand = await updateBrandStatus(brandId, status)
      setBrands(prev => prev.map(brand => 
        brand.id === brandId ? updatedBrand : brand
      ))
      return updatedBrand
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el estado')
      throw err
    }
  }, [])

  // Cargar marcas al montar el componente
  useEffect(() => {
    loadBrands()
  }, [loadBrands])

  return {
    brands,
    isLoading,
    error,
    loadBrands,
    addBrand,
    editBrand,
    removeBrand,
    updateStatus,
  }
}
