import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { CompanyAddressSchema } from 'src/schemas/CompanyAddressSchema'
import { GenericSchema } from 'src/schemas/GenericSchema'
import { FilterListCompanyAddressType, IncludeListCompanyAddressType, SearchListCompanyAddressType, SortListCompanyAddressType } from 'src/types/companyAddres/ListCompanyAddressType'

@JoiSchemaOptions({ allowUnknown: false })
export class ListCompanyAddressValidationDTO {
  @JoiSchema(CompanyAddressSchema.filterList)
  filters?: FilterListCompanyAddressType

  @JoiSchema(CompanyAddressSchema.includeList)
  includes?: IncludeListCompanyAddressType

  @JoiSchema(GenericSchema.page)
  page?: number

  @JoiSchema(GenericSchema.pageSize)
  pageSize?: number

  @JoiSchema(CompanyAddressSchema.searchList)
  search?: SearchListCompanyAddressType

  @JoiSchema(CompanyAddressSchema.sortList)
  sortBy?: SortListCompanyAddressType
}
