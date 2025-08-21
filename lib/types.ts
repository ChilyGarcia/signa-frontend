// Tipos para las marcas
export interface Brand {
  id: number
  name: string
  description: string
  owner: string
  registration_number: string
  status: 'PENDING' | 'REGISTERED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED'
  created_by: number
  creator: {
    id: number
    first_name: string
    last_name: string
    username: string
    email: string
  }
}

// Tipos para crear/editar marcas
export interface CreateBrandData {
  name: string
  description: string
  owner: string
  registration_number: string
}

export interface UpdateBrandData extends Partial<CreateBrandData> {
  id: number
  status?: 'PENDING' | 'REGISTERED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED'
}

// Tipo para actualizar solo el estado de una marca
export interface UpdateBrandStatusData {
  brand_id: number
  status: 'PENDING' | 'REGISTERED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED'
}
