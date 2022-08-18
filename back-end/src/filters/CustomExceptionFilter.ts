import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { Logger } from '../configurations/LoggerConfiguration'
import { ErrorDTO } from '../dtos/ErrorDTO'
import { ExceptionDTO } from '../dtos/ExceptionDTO'
import { ExceptionDTOFilter } from './ExceptionDTOFilter'
import { JoiExceptionFilter } from './JoiExceptionFilter'
import { TypeOrmExceptionFilter } from './TypeOrmExceptionFilter'

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    let exceptionDTO: ExceptionDTO

    if (ExceptionDTOFilter.verifyIsError(exception)) exceptionDTO = ExceptionDTOFilter.buildError(exception)
    else if (JoiExceptionFilter.verifyIsError(exception)) exceptionDTO = JoiExceptionFilter.buildError(exception)
    else if (TypeOrmExceptionFilter.verifyIsError(exception)) exceptionDTO = TypeOrmExceptionFilter.buildError(exception)
    else exceptionDTO = ExceptionDTO.error(exception.name, exception.message)

    if (!exception) {
      Logger.error('HttpException nothing filter and transform to ExceptionDTO')
      process.exit(1)
    }

    response.status(exception.getStatus()).json(new ErrorDTO(exception.getStatus(), exceptionDTO))
  }
}
