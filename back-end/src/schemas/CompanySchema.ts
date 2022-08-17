import * as Joi from 'joi'
import { GenericSchema } from './GenericSchema'
export class CompanySchema {
  static id = Joi.string().uuid()
  static companyName = Joi.string()
  static tradingName = Joi.string()
  static document = Joi.string()

  static created = GenericSchema.joiArrayObject({ id: CompanySchema.id })
}
