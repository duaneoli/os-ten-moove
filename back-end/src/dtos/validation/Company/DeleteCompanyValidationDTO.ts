import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import * as Joi from 'joi'
import { DeleteCompanyType } from 'src/types/company/DeleteCompanyType'
import { CompanySchema } from 'src/schemas/CompanySchema'

@JoiSchemaOptions({ allowUnknown: false })
export class DeleteCompanyValidationDTO {
  @JoiSchema(Joi.boolean().default(false).optional())
  soft: boolean

  @JoiSchema(CompanySchema.delete)
  data: Array<DeleteCompanyType>
}
