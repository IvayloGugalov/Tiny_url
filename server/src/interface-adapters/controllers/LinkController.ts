import type { Context } from 'hono'
import { BaseController } from './BaseController'
import { CreateLinkUseCase } from 'application/use-cases/CreateLinkUseCase'
import { GetUserLinksUseCase } from 'application/use-cases/GetUserLinksUseCase'
import { RedirectToTargetUseCase } from 'application/use-cases/RedirectToTargetUseCase'
import { LinkPresenter } from '../presenters/LinkPresenter'

export class LinkController extends BaseController {
  constructor(
    private createLinkUseCase: CreateLinkUseCase,
    private getUserLinksUseCase: GetUserLinksUseCase,
    private redirectToTargetUseCase: RedirectToTargetUseCase,
    private linkTtlDays: number
  ) {
    super()
  }

  createLink = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const body = await this.parseJsonBody<{ target: string }>(c)
      const baseUrl = this.getBaseUrl(c)

      const auth = c.get('auth')
      const userId = auth?.userId

      const result = await this.createLinkUseCase.execute(body, baseUrl, userId)
      return result
    }, 201)
  }

  getAllLinks = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const auth = c.get('auth')
      if (!auth?.userId) {
        throw new Error('Authentication required')
      }

      const links = await this.getUserLinksUseCase.execute(auth.userId)
      return LinkPresenter.toResponseList(links)
    })
  }

  redirectToTarget = async (c: Context): Promise<Response> => {
    try {
      const id = c.req.param('id')
      if (!id) {
        throw new Error('Link ID is required')
      }

      const targetUrl = await this.redirectToTargetUseCase.execute(id, this.linkTtlDays)

      return c.redirect(targetUrl, 302)
    } catch (error) {
      console.error('❌ Redirect error:', error)
      return this.handleError(c, error)
    }
  }
}
