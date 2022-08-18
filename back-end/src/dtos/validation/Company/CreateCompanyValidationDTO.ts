import * as Joi from 'joi'
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { CompanySchema } from 'src/schemas/CompanySchema'
import { CreateCompanyType } from 'src/types/company/CreateCompanyType'

@JoiSchemaOptions({ allowUnknown: false })
export class CreateCompanyValidationDTO {
  @JoiSchema(Joi.boolean().default(false).optional())
  soft: boolean

  @JoiSchema(CompanySchema.created.required())
  data: Array<CreateCompanyType>
}
