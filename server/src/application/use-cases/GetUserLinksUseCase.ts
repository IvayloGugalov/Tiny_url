import type { Link } from 'domain/entities/Link'
import type { UserId } from 'domain/value-objects/UserId'
import { ILinkRepository } from 'application/interfaces/ILinkRepository'

export class GetUserLinksUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(userId: UserId): Promise<Link[]> {
    return await this.linkRepository.findByUserId(userId)
  }
}
