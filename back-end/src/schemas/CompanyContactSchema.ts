import * as Joi from 'joi'

export class CompanyContantSchema {
  static prefix = Joi.string()
  static phone = Joi.string()

  static create = {
    prefix: CompanyContantSchema.prefix.required(),
    phone: CompanyContantSchema.phone.required(),
  }
}
