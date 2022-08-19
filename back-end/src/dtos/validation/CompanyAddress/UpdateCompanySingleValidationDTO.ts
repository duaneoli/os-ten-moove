import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { CompanyAddressSchema } from 'src/schemas/CompanyAddressSchema'
import { CompanySchema } from 'src/schemas/CompanySchema'

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateCompanyAddressSingleValidationDTO {
  @JoiSchema(CompanyAddressSchema.streetName)
  streetName?: string

  @JoiSchema(CompanyAddressSchema.streetNumber)
  streetNumber?: string

  @JoiSchema(CompanyAddressSchema.additional)
  additional?: string

  @JoiSchema(CompanyAddressSchema.district)
  district?: string

  @JoiSchema(CompanyAddressSchema.city)
  city?: string

  @JoiSchema(CompanyAddressSchema.state)
  state?: string
}
