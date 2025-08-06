import { LinkDomain } from '@/domain/entities/Link'
import { LinkIdDomain } from '@/domain/value-objects/LinkId'
import { LinkNotFoundError } from '@/domain/errors'
import { ILinkRepository } from '@/application/interfaces/ILinkRepository'

export class RedirectToTargetUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(id: string, ttlDays: number): Promise<string> {
    const linkId = LinkIdDomain.create(id)
    const link = await this.linkRepository.findById(linkId)

    if (!link) {
      throw new LinkNotFoundError(id)
    }

    LinkDomain.validateNotExpired(link, ttlDays)

    const updatedLink = LinkDomain.incrementClicks(link)
    await this.linkRepository.update(updatedLink)

    return link.target
  }
}
