import { HttpException } from '@nestjs/common'
import { Logger } from '../configurations/LoggerConfiguration'
import { ExceptionDTO } from '../dtos/ExceptionDTO'

export class ExceptionDTOFilter {
  static verifyIsError(exception: HttpException): boolean {
    return exception.getResponse() instanceof ExceptionDTO
  }

  static buildError(exception: HttpException): ExceptionDTO {
    const { message, error } = exception.getResponse() as { message: any; error: any }
    Logger.infer(message, error)

    return exception.getResponse() as ExceptionDTO
  }
}
