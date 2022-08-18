import { ExceptionDTO } from '../dtos/ExceptionDTO'

export class Logger {
  private static log(level: string, message: string) {
    const messageReplace = message.replace('\n', '')
    console.log(`${new Date().toJSON()} ${level} ${messageReplace}`)
  }

  public static startRoute(message: string) {
    this.log('[---->]', message)
  }

  public static finishRoute(message: string) {
    this.log('[<----]', message)
  }

  public static trace(message: string) {
    this.log('[TRACE]', message)
  }

  public static debug(message: string) {
    this.log('[DEBUG]', message)
  }

  public static info(message: string) {
    this.log('[INFO ]', message)
  }

  public static warn(message: string, error: string) {
    this.log('[WARN ]', `${message}: ${error}`)
  }

  public static error(message: string, error?: any) {
    Logger.log('[ERROR]', `${message}: ${error ? JSON.stringify(error) : 'No error provided'}`)
  }

  public static infer(message: string, error: any) {
    if (error && error instanceof ExceptionDTO) {
      const { type, ...exceptionDTO } = error
      type === 'WARN' ? this.warn(message, exceptionDTO.details) : this.error(message, exceptionDTO)
    } else this.error(message, error)
  }
}
