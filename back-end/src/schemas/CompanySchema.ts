import * as Joi from 'joi'
import { CompanyAddressSchema } from './CompanyAddressSchema'
import { CompanyContantSchema } from './CompanyContactSchema'
import { GenericSchema } from './GenericSchema'

export class CompanySchema {
  static id = Joi.string().uuid()
  static companyName = Joi.string()
  static tradingName = Joi.string()
  static document = Joi.string()

  static filter = Joi.object({
    companyName: CompanySchema.companyName,
    tradingName: CompanySchema.tradingName,
    document: CompanySchema.document,
    ...GenericSchema.createdDate,
    ...GenericSchema.updatedDate,
  })

  static search = Joi.object({
    companyName: Joi.any(),
    tradingName: Joi.any(),
    document: Joi.any(),
  })

  static sort = GenericSchema.joiSortBy('id', 'companyName', 'tradingName', 'document', 'createdAt', 'updatedAt')

  static searchList = GenericSchema.joiCustomObject(CompanySchema.search)
  static includeList = GenericSchema.joiCustomIncludes('address', 'contact')
  static filterList = GenericSchema.joiCustomObject(CompanySchema.filter)
  static sortList = GenericSchema.joiCustomObject(CompanySchema.sort)

  static created = GenericSchema.joiArrayObject({
    companyName: CompanySchema.companyName.required(),
    tradingName: CompanySchema.tradingName.required(),
    document: CompanySchema.document.required(),
    address: Joi.object(CompanyAddressSchema.create).required(),
    contact: GenericSchema.joiArrayObject(CompanyContantSchema.create).required(),
  })

  static update = GenericSchema.joiArrayObject({
    id: CompanySchema.id.required(),
    companyName: CompanySchema.companyName.optional(),
    tradingName: CompanySchema.tradingName.optional(),
    document: CompanySchema.document.optional(),
  })

  static delete = GenericSchema.joiArrayObject({ id: CompanySchema.id.required() })
}
