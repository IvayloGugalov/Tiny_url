import { LinkRepository, type CreateLinkData, type LinkData } from '../repositories/linkRepository'
import { validateUrl } from '../utils/validation'
import { generateShortId } from '../utils/shortId'
import { NotFoundError } from '../utils/errors'
import { logger } from './logger'
import { config } from '../config'

export interface CreateLinkRequest {
  target: string
}

export interface CreateLinkResponse {
  id: string
  shortUrl: string
}

export class LinkService {
  constructor(private linkRepository: LinkRepository) {}

  async createLink(request: CreateLinkRequest, baseUrl: string): Promise<CreateLinkResponse> {
    validateUrl(request.target)

    // Generate unique short ID
    let id: string
    let attempts = 0
    const maxAttempts = 10

    do {
      if (attempts >= maxAttempts) {
        throw new Error('Failed to generate unique short ID after maximum attempts')
      }

      id = generateShortId()
      const exists = await this.linkRepository.existsById(id)

      if (!exists) {
        break
      }

      attempts++
    } while (true)

    const linkData: CreateLinkData = {
      id,
      target: request.target,
    }

    const link = await this.linkRepository.create(linkData)

    const shortUrl = `${baseUrl.replace(/\/api\/links$/, '')}/${id}`

    logger.info('Short link created successfully', {
      id: link.id,
      target: link.target,
      shortUrl
    })

    return {
      id: link.id,
      shortUrl,
    }
  }

  async getAllLinks(): Promise<LinkData[]> {
    return await this.linkRepository.findAll()
  }

  async redirectToTarget(id: string): Promise<string> {
    const link = await this.linkRepository.findById(id)

    if (!link) {
      throw new NotFoundError('Link')
    }

    // Increment click count
    await this.linkRepository.incrementClicks(id)

    logger.debug('Link accessed', {
      id,
      target: link.target,
      newClickCount: link.clicks + 1
    })

    return link.target
  }

  async cleanupExpiredLinks(): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - config.links.ttlDays)

    const deletedCount = await this.linkRepository.deleteExpired(cutoffDate)

    logger.info('Expired links cleanup completed', {
      deletedCount,
      cutoffDate,
      ttlDays: config.links.ttlDays
    })

    return deletedCount
  }
}
