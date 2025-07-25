import type { Context } from 'hono'
import { DomainError } from '../../domain/errors'
import { ApiPresenter } from '../presenters'

export abstract class BaseController {
  protected async handleRequest<T>(
    c: Context,
    handler: () => Promise<T>,
    successStatus: number = 200
  ): Promise<Response> {
    try {
      const result = await handler()
      return c.json(ApiPresenter.success(result), successStatus)
    } catch (error) {
      return this.handleError(c, error)
    }
  }

  protected async parseJsonBody<T>(c: Context): Promise<T> {
    try {
      return await c.req.json()
    } catch {
      throw new Error('Invalid request body. Expected JSON.')
    }
  }

  protected getBaseUrl(c: Context): string {
    return c.req.url
  }

  private handleError(c: Context, error: unknown): Response {
    if (error instanceof DomainError) {
      const statusCode = this.getStatusCodeForDomainError(error.code)
      return c.json(ApiPresenter.error(error.message, error.code), statusCode)
    }

    if (error instanceof Error) {
      return c.json(ApiPresenter.error(error.message), 400)
    }

    return c.json(ApiPresenter.error('Internal server error'), 500)
  }

  private getStatusCodeForDomainError(code: string): number {
    switch (code) {
      case 'INVALID_URL':
      case 'INVALID_EMAIL':
        return 400
      case 'LINK_NOT_FOUND':
      case 'USER_NOT_FOUND':
        return 404
      case 'DUPLICATE_EMAIL':
        return 409
      case 'INVALID_CREDENTIALS':
        return 401
      case 'LINK_EXPIRED':
        return 410
      default:
        return 400
    }
  }
}
