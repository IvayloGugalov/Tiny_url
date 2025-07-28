import type { Context } from 'hono'
import { BaseController } from './BaseController'
import { CreateLinkUseCase } from 'application/use-cases/CreateLinkUseCase'
import { GetAllLinksUseCase } from 'application/use-cases/GetAllLinksUseCase'
import { RedirectToTargetUseCase } from 'application/use-cases/RedirectToTargetUseCase'
import { LinkPresenter } from '../presenters/LinkPresenter'

export class LinkController extends BaseController {
  constructor(
    private createLinkUseCase: CreateLinkUseCase,
    private getAllLinksUseCase: GetAllLinksUseCase,
    private redirectToTargetUseCase: RedirectToTargetUseCase,
    private linkTtlDays: number
  ) {
    super()
  }

  createLink = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const body = await this.parseJsonBody<{ target: string }>(c)
      const baseUrl = this.getBaseUrl(c)

      const result = await this.createLinkUseCase.execute(body, baseUrl)
      return result
    }, 201)
  }

  getAllLinks = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const links = await this.getAllLinksUseCase.execute()
      return LinkPresenter.toResponseList(links)
    })
  }

  redirectToTarget = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const id = c.req.param('id')
      if (!id) {
        throw new Error('Link ID is required')
      }

      const targetUrl = await this.redirectToTargetUseCase.execute(id, this.linkTtlDays)

      return c.redirect(targetUrl, 302)
    })
  }
}
