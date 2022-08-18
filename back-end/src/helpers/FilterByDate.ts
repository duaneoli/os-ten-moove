import { ExceptionDTO } from 'src/dtos/ExceptionDTO'
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'

type FiltersValidation = any
type SearchValidation = any
type SortByValidation = any

export function parseFilters(filters: FiltersValidation): Record<string, any> {
  if (!filters) return new Object()

  const { createdEndDate, createdStartDate, updatedEndDate, updatedStartDate, ...whereFilters }: any = { ...filters }
  if (createdStartDate && !createdEndDate) whereFilters.createdAt = MoreThanOrEqual(filters.createdStartDate)
  else if (!createdStartDate && createdEndDate) whereFilters.createdAt = LessThanOrEqual(filters.createdEndDate)
  else if (createdStartDate && createdEndDate) whereFilters.createdAt = Between(filters.createdStartDate, filters.createdEndDate)

  if (updatedStartDate && !updatedEndDate) whereFilters.updatedAt = MoreThanOrEqual(filters.updatedStartDate)
  else if (!updatedStartDate && updatedEndDate) whereFilters.updatedAt = LessThanOrEqual(filters.updatedEndDate)
  else if (updatedStartDate && updatedEndDate) whereFilters.updatedAt = Between(filters.updatedStartDate, filters.updatedEndDate)

  return whereFilters
}

export function parseSearch(search: SearchValidation): { [key in string]: any } {
  const where: { [key in string]: any } = {}
  if (search && Object.keys(search).length > 0) {
    const keysSearch = Object.keys(search)
    keysSearch.forEach((it) => (where[it] = ILike(`%${search[it]}%`)))
  }
  return where
}

export function parseSortBy(sortBy: SortByValidation, primaryColumn = 'id'): { [key in string]: any } {
  const returnSort: { [key in string]: any } = new Object()
  if (!sortBy) returnSort[primaryColumn] = 'ASC'
  return sortBy ? sortBy : returnSort
}

export function parseWhere(filter: FiltersValidation, search: SearchValidation, lock?: { [key in string]: any }): Array<{ [key in string]: any }> | undefined {
  if (filter && search) {
    const overlappingValues = Object.keys(filter).reduce((acc, it) => {
      if (Object.keys(search).includes(it)) acc.push(it)
      return acc
    }, Array<string>())
    if (overlappingValues.length > 0) throw ExceptionDTO.warn('Duplicate keys', `Keys ${overlappingValues.toString()} overlap both in filters and search`)
  }

  const filters = { ...parseFilters(filter), ...lock }
  if (!search || Object.keys(search).length === 0) return Object.keys(filters).length > 0 ? [filters] : undefined

  const searchs = parseSearch(search)
  const arrayFilters = new Array<any>()
  Object.keys(search).forEach((it) => {
    const object = { ...filters }
    if (!it.includes('.')) object[it] = searchs[it]
    if (Object.keys(object).length) arrayFilters.push(object)
  })
  return arrayFilters
}
