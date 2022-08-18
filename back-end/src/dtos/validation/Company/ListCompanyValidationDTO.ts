import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { CompanySchema } from 'src/schemas/CompanySchema'
import { GenericSchema } from 'src/schemas/GenericSchema'
import { FilterListCompanyType, IncludeListCompanyType, SearchListCompanyType, SortListCompanyType } from 'src/types/company/ListCompanyType'

@JoiSchemaOptions({ allowUnknown: false })
export class ListCompanyValidationDTO {
  @JoiSchema(CompanySchema.filterList)
  filters?: FilterListCompanyType

  @JoiSchema(CompanySchema.includeList)
  includes?: IncludeListCompanyType

  @JoiSchema(GenericSchema.page)
  page?: number

  @JoiSchema(GenericSchema.pageSize)
  pageSize?: number

  @JoiSchema(CompanySchema.searchList)
  search?: SearchListCompanyType

  @JoiSchema(CompanySchema.sortList)
  sortBy?: SortListCompanyType
}
