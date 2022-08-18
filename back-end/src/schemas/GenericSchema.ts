import * as Joi from 'joi'
import { JoiCustomValidation } from 'src/dtos/JoiCustomValidation'

type DateJoiType = string | number | Date | Joi.Reference | null

export class GenericSchema {
  static joiArrayObject = (joi: any, min = 1, unique = 'id') => Joi.array().items(Joi.object(joi).min(min)).min(1).unique(unique, { ignoreUndefined: true })

  static joiCustomObject = (joi: any) =>
    Joi.custom((value) => {
      const { object, result } = JoiCustomValidation.objectValidation(value, joi)
      if (result?.error) throw Error(result?.error.details[0].message)
      return object
    })

  static joiCustomIncludes = (...keys: Array<string>) =>
    Joi.custom((value) => {
      const { includes, result } = JoiCustomValidation.includesValidation(value, keys)
      if (result.error) throw Error(result.error.details[0].message)
      return includes
    })

  static JoiDate = (greater?: DateJoiType, less?: DateJoiType, greaterRef?: string, lessRef?: string) => {
    let date = Joi.date()
    if (greater) date = date.greater(greater)
    if (less) date = date.less(less)
    if (greaterRef) date = date.when(greaterRef, { is: Joi.exist(), then: Joi.date().min(Joi.ref(greaterRef)) })
    if (lessRef) date = date.when(lessRef, { is: Joi.exist(), then: Joi.date().max(Joi.ref(lessRef)) })
    return date
  }

  static createdStartDate = GenericSchema.JoiDate(null, Date.now()).optional()
  static createdEndDate = GenericSchema.JoiDate(null, null, 'createdStartDate').optional()
  static updatedStartDate = GenericSchema.JoiDate(null, Date.now()).optional()
  static updatedEndDate = GenericSchema.JoiDate(null, null, 'updatedStartDate').optional()
  static createdDate = { createdStartDate: GenericSchema.createdStartDate, createdEndDate: GenericSchema.createdEndDate }
  static updatedDate = { updatedStartDate: GenericSchema.updatedStartDate, updatedEndDate: GenericSchema.updatedEndDate }

  static page = Joi.number().min(0)
  static pageSize = Joi.number().min(1).max(100)

  static joiSortBy = (...keys: Array<string>) => {
    return Joi.object(
      keys.reduce((acc: { [key in string]: any }, it) => {
        acc[it] = Joi.string().valid('ASC', 'DESC')
        return acc
      }, {}),
    )
  }
}
