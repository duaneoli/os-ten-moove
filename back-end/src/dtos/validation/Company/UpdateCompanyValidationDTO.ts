import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import * as Joi from 'joi'
import { CompanySchema } from 'src/schemas/CompanySchema'
import { UpdateCompanyType } from 'src/types/company/UpdateCompanyType'

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateCompanyValidationDTO {
  @JoiSchema(Joi.boolean().default(false).optional())
  soft: boolean

  @JoiSchema(CompanySchema.update)
  data: Array<UpdateCompanyType>
}
