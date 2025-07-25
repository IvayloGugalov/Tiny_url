import type { Context } from 'hono'
import { BaseController } from './base'
import { LinkService, CreateLinkRequest } from '../services/linkService'
import { logger } from '../services/logger'

export class LinkController extends BaseController {
  constructor(private linkService: LinkService) {
    super()
  }

  createLink = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const body = await this.parseJsonBody<CreateLinkRequest>(c)
      const baseUrl = this.getBaseUrl(c)

      const result = await this.linkService.createLink(body, baseUrl)
      return result
    }, 201)
  }

  getAllLinks = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const links = await this.linkService.getAllLinks()
      return links
    })
  }

  redirectToTarget = async (c: Context): Promise<Response> => {
    try {
      const { id } = c.req.param()

      if (!id) {
        throw new Error('Missing id parameter')
      }

      const targetUrl = await this.linkService.redirectToTarget(id)

      // Return redirect response directly (not wrapped in JSON)
      return c.redirect(targetUrl, 302)
    } catch (error) {
      return this.handleRequest(c, async () => {
        throw error
      })
    }
  }
}
