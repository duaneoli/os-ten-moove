import * as Joi from 'joi'

export class GenericSchema {
  static joiArrayObject = (joi: any, min: number = 1, unique: string = 'id') => Joi.array().items(Joi.object(joi).min(min)).min(1).unique(unique, { ignoreUndefined: true }).required()
}
