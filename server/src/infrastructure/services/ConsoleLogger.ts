export interface ILogger {
  info(message: string, meta?: unknown): void
  error(message: string, error?: unknown): void
  warn(message: string, meta?: unknown): void
  debug(message: string, meta?: unknown): void
}

export class ConsoleLogger implements ILogger {
  private formatMessage(
    level: string,
    message: string,
    meta?: unknown,
  ): string {
    const timestamp = new Date().toISOString()
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : ''
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`
  }

  info(message: string, meta?: unknown): void {
    console.log(this.formatMessage('info', message, meta))
  }

  error(message: string, error?: unknown): void {
    console.error(this.formatMessage('error', message, error))
  }

  warn(message: string, meta?: unknown): void {
    console.warn(this.formatMessage('warn', message, meta))
  }

  debug(message: string, meta?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message, meta))
    }
  }
}
