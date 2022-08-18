import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { CompanySchema } from 'src/schemas/CompanySchema'

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateCompanySingleValidationDTO {
  @JoiSchema(CompanySchema.companyName)
  companyName: string

  @JoiSchema(CompanySchema.tradingName)
  tradingName: string

  @JoiSchema(CompanySchema.document)
  document: string
}
