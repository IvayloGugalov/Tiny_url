import type { Context } from 'hono'
import { DomainError } from 'domain/errors'
import { ApiPresenter } from '../presenters/ApiPresenter'

export abstract class BaseController {
  protected async handleRequest<T>(
    c: Context,
    handler: () => Promise<T>,
    successStatus: number = 200
  ): Promise<Response> {
    try {
      const result = await handler()
      if (successStatus === 201) {
        return c.json(ApiPresenter.success(result), 201)
      } else {
        return c.json(ApiPresenter.success(result), 200)
      }
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
      switch (error.code) {
        case 'INVALID_URL':
        case 'INVALID_EMAIL':
          return c.json(ApiPresenter.error(error.message, error.code), 400)
        case 'LINK_NOT_FOUND':
        case 'USER_NOT_FOUND':
          return c.json(ApiPresenter.error(error.message, error.code), 404)
        case 'DUPLICATE_EMAIL':
          return c.json(ApiPresenter.error(error.message, error.code), 409)
        case 'INVALID_CREDENTIALS':
          return c.json(ApiPresenter.error(error.message, error.code), 401)
        case 'LINK_EXPIRED':
          return c.json(ApiPresenter.error(error.message, error.code), 410)
        default:
          return c.json(ApiPresenter.error(error.message, error.code), 400)
      }
    }

    if (error instanceof Error) {
      return c.json(ApiPresenter.error(error.message), 400)
    }

    return c.json(ApiPresenter.error('Internal server error'), 500)
  }
}
