import { LinkDomain } from 'domain/entities/Link'
import { UrlDomain } from 'domain/value-objects/Url'
import { ShortLinkIdGenerator } from 'domain/services/LinkIdGenerator'
import { ILinkRepository } from 'application/interfaces/ILinkRepository'

export interface CreateLinkRequest {
  target: string
}

export interface CreateLinkResponse {
  id: string
  shortUrl: string
}

export class CreateLinkUseCase {
  constructor(
    private linkRepository: ILinkRepository,
    private linkIdGenerator: ShortLinkIdGenerator
  ) {}

  async execute(request: CreateLinkRequest, baseUrl: string): Promise<CreateLinkResponse> {
    const targetUrl = UrlDomain.create(request.target)

    let linkId = this.linkIdGenerator.generate()
    let attempts = 0
    const maxAttempts = 10

    while (await this.linkRepository.existsById(linkId) && attempts < maxAttempts) {
      linkId = this.linkIdGenerator.generate()
      attempts++
    }

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique link ID')
    }

    const link = LinkDomain.create(linkId, targetUrl)
    await this.linkRepository.save(link)

    const shortUrl = `${baseUrl.replace(/\/api\/links$/, '')}/${linkId}`

    return {
      id: linkId,
      shortUrl
    }
  }
}
