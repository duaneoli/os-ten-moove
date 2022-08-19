export type FilterListCompanyAddressType = {
  streetName?: string
  streetNumber?: string
  additional?: string
  district?: string
  city?: string
  state?: string
}

export type IncludeListCompanyAddressType = Array<string>

export type SearchListCompanyAddressType = {
  streetName?: string
  streetNumber?: string
  additional?: string
  district?: string
  city?: string
  state?: string
}

export type SortListCompanyAddressType = {
  id?: 'ASC' | 'DESC'
  streetName?: 'ASC' | 'DESC'
  streetNumber?: 'ASC' | 'DESC'
  additional?: 'ASC' | 'DESC'
  district?: 'ASC' | 'DESC'
  city?: 'ASC' | 'DESC'
  state?: 'ASC' | 'DESC'
  updatedAt?: 'ASC' | 'DESC'
  createdAt?: 'ASC' | 'DESC'
}
