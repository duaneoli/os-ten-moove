import { ErrorCode } from 'src/helpers/ErrorCode'

export class RejectedInputDTO {
  identifier: string
  reason: string
  errorCode: ErrorCode

  constructor(identifier: string, reason: string, errorCode: ErrorCode) {
    this.identifier = identifier
    this.reason = reason
    this.errorCode = errorCode
  }
}
