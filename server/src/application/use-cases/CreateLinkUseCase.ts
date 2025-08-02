import { LinkDomain } from 'domain/entities/Link'
import { UrlDomain } from 'domain/value-objects/Url'
import { ShortLinkIdGenerator } from 'domain/services/LinkIdGenerator'
import { ILinkRepository } from 'application/interfaces/ILinkRepository'
import type { Link } from 'shared'

export class CreateLinkUseCase {
  constructor(
    private linkRepository: ILinkRepository,
    private linkIdGenerator: ShortLinkIdGenerator,
  ) {}

  async execute(target: string, userId?: string): Promise<Link> {
    const targetUrl = UrlDomain.create(target)

    let linkId = this.linkIdGenerator.generate()
    let attempts = 0
    const maxAttempts = 10

    while (
      (await this.linkRepository.findById(linkId)) &&
      attempts < maxAttempts
    ) {
      linkId = this.linkIdGenerator.generate()
      attempts++
    }

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique link ID')
    }

    const link = LinkDomain.create(linkId, targetUrl, userId)
    return await this.linkRepository.create(link)
  }
}
