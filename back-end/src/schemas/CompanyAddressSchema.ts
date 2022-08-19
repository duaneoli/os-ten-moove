import * as Joi from 'joi'
import { GenericSchema } from './GenericSchema'
export class CompanyAddressSchema {
  static streetName = Joi.string()
  static streetNumber = Joi.string()
  static additional = Joi.string()
  static district = Joi.string()
  static city = Joi.string()
  static state = Joi.string()

  static filter = Joi.object({
    streetName: CompanyAddressSchema.streetName,
    streetNumber: CompanyAddressSchema.streetNumber,
    additional: CompanyAddressSchema.additional,
    district: CompanyAddressSchema.district,
    city: CompanyAddressSchema.city,
    state: CompanyAddressSchema.state,
    ...GenericSchema.createdDate,
    ...GenericSchema.updatedDate,
  })

  static search = Joi.object({
    streetName: Joi.any(),
    streetNumber: Joi.any(),
    additional: Joi.any(),
    district: Joi.any(),
    city: Joi.any(),
    state: Joi.any(),
  })

  static sort = GenericSchema.joiSortBy('id', 'streetName', 'streetNumber', 'additional', 'district', 'city', 'state', 'createdAt', 'updatedAt')

  static searchList = GenericSchema.joiCustomObject(CompanyAddressSchema.search)
  static includeList = GenericSchema.joiCustomIncludes('company', 'company.contact')
  static filterList = GenericSchema.joiCustomObject(CompanyAddressSchema.filter)
  static sortList = GenericSchema.joiCustomObject(CompanyAddressSchema.sort)

  static create = {
    streetName: CompanyAddressSchema.streetName.required(),
    streetNumber: CompanyAddressSchema.streetNumber.required(),
    additional: CompanyAddressSchema.additional.required(),
    district: CompanyAddressSchema.district.required(),
    city: CompanyAddressSchema.city.required(),
    state: CompanyAddressSchema.state.required(),
  }
}
