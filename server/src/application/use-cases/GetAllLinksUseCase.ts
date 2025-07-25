import type { Link } from '../../domain/entities/Link'
import { ILinkRepository } from '../interfaces'

export class GetAllLinksUseCase {
  constructor(private linkRepository: ILinkRepository) {}

  async execute(): Promise<Link[]> {
    return await this.linkRepository.findAll()
  }
}
