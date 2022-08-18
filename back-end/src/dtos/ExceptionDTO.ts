export type ExceptionType = 'ERROR' | 'WARN'

export class ExceptionDTO extends Error {
  public error: string
  public rejectedInputs: Array<any>
  public type: ExceptionType
  public details: string

  private constructor(type: ExceptionType, error: string, message: string, rejectedInputs?: Array<any>) {
    super(message)
    this.error = error
    this.type = type
    this.details = message
    if (rejectedInputs) this.rejectedInputs = rejectedInputs
  }

  static error(error: string, message: string, rejectedInputs?: Array<any>) {
    return new ExceptionDTO('ERROR', error, message, rejectedInputs)
  }

  static warn(error: string, message: string, rejectedInputs?: Array<any>) {
    return new ExceptionDTO('WARN', error, message, rejectedInputs)
  }
}
