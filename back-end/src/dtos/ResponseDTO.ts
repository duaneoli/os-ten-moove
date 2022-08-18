import { HttpStatus, Logger } from '@nestjs/common'
import { ControllerResponseDTO } from './ControllerResponseDTO'
import { ServiceResponseDTO } from './ServiceResponseDTO'

export class ResponseDTO<T> {
  public statusCode: HttpStatus
  public message: string
  public data: any
  public rejectedInputs?: Array<any>

  constructor(statusCode: HttpStatus, message: string, response: ServiceResponseDTO<T>, pagingMetadata?: { page?: number; pageSize?: number }) {
    if (statusCode > HttpStatus.AMBIGUOUS) {
      Logger.error('Response must belong to a successful request')
      process.exit(1)
    }

    this.statusCode = statusCode
    this.message = message
    if (response.entities) this.data = new ControllerResponseDTO(response, pagingMetadata)
    if (response.rejectedInputs && response.rejectedInputs.length) this.rejectedInputs = response.rejectedInputs
  }
}
