export type FilterListCompanyType = {
  companyName?: string
  tradingName?: string
  document?: string
  createdStartDate?: string
  createdEndDate?: string
  updatedStartDate?: string
  updatedEndDate?: string
}

export type IncludeListCompanyType = Array<string>

export type SearchListCompanyType = {
  companyName?: string
  tradingName?: string
  document?: string
}

export type SortListCompanyType = {
  id?: 'ASC' | 'DESC'
  companyName?: 'ASC' | 'DESC'
  tradingName?: 'ASC' | 'DESC'
  document?: 'ASC' | 'DESC'
  updatedAt?: 'ASC' | 'DESC'
  createdAt?: 'ASC' | 'DESC'
}
