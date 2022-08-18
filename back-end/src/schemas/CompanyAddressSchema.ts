import * as Joi from 'joi'
export class CompanyAddressSchema {
  static streetName = Joi.string()
  static streetNumber = Joi.string()
  static additional = Joi.string()
  static district = Joi.string()
  static city = Joi.string()
  static state = Joi.string()

  static create = {
    streetName: CompanyAddressSchema.streetName.required(),
    streetNumber: CompanyAddressSchema.streetNumber.required(),
    additional: CompanyAddressSchema.additional.required(),
    district: CompanyAddressSchema.district.required(),
    city: CompanyAddressSchema.city.required(),
    state: CompanyAddressSchema.state.required(),
  }
}
