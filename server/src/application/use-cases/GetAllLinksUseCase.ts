import type { Link } from 'shared'
import type { ILinkRepository } from '@/application/interfaces/ILinkRepository'

export class GetAllLinksUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(): Promise<Link[]> {
    return await this.linkRepository.findAll()
  }
}
