import type { Link, UserId } from 'shared'
import type { ILinkRepository } from '@/application/interfaces/ILinkRepository'

export class GetUserLinksUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(userId: UserId): Promise<Link[]> {
    return await this.linkRepository.findByUserId(userId)
  }
}
